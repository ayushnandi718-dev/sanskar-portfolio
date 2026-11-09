/**
 * POST /api/contact
 *
 * Vercel Node.js function used by the portfolio contact form.
 *
 * Email delivery supports either provider:
 *  - Resend  -> set RESEND_API_KEY
 *  - SMTP    -> set SMTP_HOST, SMTP_USER, SMTP_PASS (Nodemailer)
 *
 * Recipient: CONTACT_TO (defaults to pyc0453@gmail.com)
 * Sender:    CONTACT_FROM (falls back to SMTP_USER / Resend test sender)
 */
import nodemailer from "nodemailer";

const CONTACT_TO = process.env.CONTACT_TO || "pyc0453@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 120, email: 254, project: 120, message: 4000 };
const MAX_BODY_BYTES = 100_000;

const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map();

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (
    (first && String(first).split(",")[0].trim()) ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.start > RATE_WINDOW) {
    attempts.set(ip, { start: now, count: 1 });
    if (attempts.size > 5000) {
      for (const [key, value] of attempts) {
        if (now - value.start > RATE_WINDOW) attempts.delete(key);
      }
    }
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT;
}

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(payload) {
  const errors = {};
  if (clean(payload.name, LIMITS.name).length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_RE.test(clean(payload.email, LIMITS.email))) {
    errors.email = "Enter a valid email address.";
  }
  if (clean(payload.message, LIMITS.message).length < 10) {
    errors.message = "Tell me a little more (at least 10 characters).";
  }
  return errors;
}

async function readBody(req) {
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString("utf8"));
    } catch {
      return null;
    }
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  if (req.body && typeof req.body === "object") return req.body;

  let raw = "";
  try {
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > MAX_BODY_BYTES) return null;
    }
  } catch {
    return null;
  }
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function buildMessage({ name, email, project, message }) {
  const service = project || "Not specified";
  const text = [
    "New project enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    "",
    "Message:",
    message,
    "",
    "Sent from sanskar-pandey.vercel.app",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#101318">
      <h2 style="margin:0 0 16px;font-size:20px">New project enquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#6b7280;width:90px">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Service</td><td style="padding:6px 0">${escapeHtml(service)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0" />
      <p style="margin:0 0 6px;color:#6b7280;font-size:13px">Message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.65;font-size:14px">${escapeHtml(message)}</p>
      <p style="margin:24px 0 0;color:#9ca3af;font-size:12px">Sent from sanskar-pandey.vercel.app</p>
    </div>
  `;

  return { text, html, subject: `New project enquiry from ${name}` };
}

async function sendWithResend(payload) {
  const { text, html, subject } = buildMessage(payload);
  const from =
    process.env.CONTACT_FROM ||
    process.env.RESEND_FROM ||
    "Sanskar Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_TO],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 300)}`);
  }
}

async function sendWithSmtp(payload) {
  const { text, html, subject } = buildMessage(payload);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM || process.env.SMTP_USER,
    to: CONTACT_TO,
    replyTo: payload.email,
    subject,
    text,
    html,
  });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { message: "Method not allowed." });
  }

  if (isRateLimited(clientIp(req))) {
    return send(res, 429, {
      message: "Too many messages from this address. Please try again in a few minutes.",
    });
  }

  const body = await readBody(req);
  if (!body) {
    return send(res, 400, { message: "Invalid request." });
  }

  // Honeypot: real people never see this field, bots fill it in.
  if (clean(body.website, 200)) {
    return send(res, 200, { ok: true, message: "Message sent." });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return send(res, 400, {
      message: "Please check the highlighted fields.",
      errors,
    });
  }

  const payload = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    project: clean(body.project, LIMITS.project),
    message: clean(body.message, LIMITS.message),
  };

  const resendReady = Boolean(process.env.RESEND_API_KEY);
  const smtpReady = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );

  if (!resendReady && !smtpReady) {
    return send(res, 503, {
      message: `The contact form isn't configured yet. Please email ${CONTACT_TO} directly.`,
    });
  }

  try {
    if (resendReady) await sendWithResend(payload);
    else await sendWithSmtp(payload);

    return send(res, 200, { ok: true, message: "Message sent." });
  } catch (error) {
    console.error("Contact form error:", error);
    return send(res, 502, {
      message: `Couldn't send your message right now. Please email ${CONTACT_TO} directly.`,
    });
  }
}
