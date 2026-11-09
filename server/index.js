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