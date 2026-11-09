/**
 * Local development / self-hosted production server.
 *
 * Vercel deploys the frontend statically and `api/contact.js` as a
 * serverless function. This Express server mirrors that behaviour locally
 * (Vite proxies /api here during `npm run dev`) and can also serve the
 * built `dist` folder with `npm start`.
 */
import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import contactHandler from "../api/contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const PORT = Number(process.env.PORT) || 8787;

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

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.all("/api/contact", contactHandler);

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "Not found." });
});

/* --------------------------------------------------------------------------
   Static client (production build)
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
    if (error) next(error);
  });
});

app.use((error, _req, res, _next) => {
  console.error("Server error:", error);
  res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`API + site listening on http://localhost:${PORT}`);
});
