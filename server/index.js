import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const dataDir = path.join(root, "data");
const messagesFile = path.join(dataDir, "messages.json");

const PORT = Number(process.env.PORT) || 8787;
const CONTACT_TO = process.env.CONTACT_TO || "pyc0453@gmail.com";
const FROM = process.env.CONTACT_FROM || process.env.SMTP_USER || "portfolio@localhost";

const smtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json({ limit: "32kb" }));

/* --------------------------------------------------------------------------
   Simple in-memory rate limiter: 5 submissions / 10 minutes per IP
   -------------------------------------------------------------------------- */
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.start > RATE_WINDOW) {
    attempts.set(ip, { start: now, count: 1 });
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of attempts.entries()) {
    if (now - record.start > RATE_WINDOW) attempts.delete(ip);
  }
}, RATE_WINDOW).unref();

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validate(payload) {
  const errors = {};
  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160);
  const project = clean(payload.project, 60);
  const message = clean(payload.message, 4000);

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Tell me a little more (at least 10 characters).";
  }

  return { values: { name, email, project, message }, errors };
}

async function saveMessage(entry) {
  await fs.mkdir(dataDir, { recursive: true });

  let messages = [];
  try {
    const raw = await fs.readFile(messagesFile, "utf8");
    messages = JSON.parse(raw);
    if (!Array.isArray(messages)) messages = [];
  } catch (error) {
    if (error.code !== "ENOENT") console.warn("[contact] Could not read messages file:", error.message);
  }

  messages.push(entry);
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), "utf8");
}

async function sendEmail({ name, email, project, message }) {
  if (!transporter) return false;

  await transporter.sendMail({
    from: `Portfolio <${FROM}>`,
    to: CONTACT_TO,
    replyTo: email,
    subject: `Portfolio enquiry - ${name}${project ? ` (${project})` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nProject: ${project || "Not specified"}\n\n${message}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #111827">
        <h2 style="margin: 0 0 16px">New portfolio enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project:</strong> ${escapeHtml(project || "Not specified")}</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0" />
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      </div>
    `,
  });

  return true;
}

/* --------------------------------------------------------------------------
   API
   -------------------------------------------------------------------------- */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "sanskar-portfolio",
    email: smtpConfigured ? "smtp" : "stored",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/contact", async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      message: "Too many messages. Please try again in a few minutes.",
    });
  }

  // Honeypot: real users never fill this hidden field.
  if (clean(req.body?.website, 200)) {
    return res.status(200).json({ ok: true, message: "Message received." });
  }

  const { values, errors } = validate(req.body || {});

  if (Object.keys(errors).length) {
    return res.status(400).json({
      ok: false,
      message: "Please check the highlighted fields.",
      errors,
    });
  }

  const entry = {
    id: crypto.randomUUID(),
    ...values,
    createdAt: new Date().toISOString(),
    ip,
    userAgent: clean(req.headers["user-agent"], 300),
  };

  let stored = false;
  let mailed = false;

  try {
    await saveMessage(entry);
    stored = true;
  } catch (error) {
    console.error("[contact] Failed to store message:", error);
  }

  try {
    mailed = await sendEmail(values);
  } catch (error) {
    console.error("[contact] Failed to send email:", error.message);
  }

  if (!stored && !mailed) {
    return res.status(500).json({
      ok: false,
      message: "The message could not be sent right now. Please email me directly.",
    });
  }

  console.log(`[contact] New message from ${values.name} <${values.email}> (${values.project || "no project"})`);

  return res.status(201).json({
    ok: true,
    message: "Thanks! Your message has been received.",
  });
});

/* --------------------------------------------------------------------------
   Static client
   -------------------------------------------------------------------------- */
app.use(
  express.static(distDir, {
    index: false,
    maxAge: "1h",
    setHeaders(res, filePath) {
      if (filePath.endsWith("index.html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  })
);

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  res.sendFile(path.join(distDir, "index.html"), (error) => {
    if (error) {
      res
        .status(503)
        .type("text/plain")
        .send("Client build not found. Run `npm run build` first, or use `npm run dev`.");
    }
  });
});

app.use((error, req, res, next) => {
  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, message: "Invalid request body." });
  }
  console.error("[server]", error);
  res.status(500).json({ ok: false, message: "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`\n  Portfolio API running at http://localhost:${PORT}`);
  console.log(`  Contact email mode: ${smtpConfigured ? "SMTP" : "saved to data/messages.json"}\n`);
});
