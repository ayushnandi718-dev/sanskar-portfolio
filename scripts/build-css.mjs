/**
 * Tailwind CSS compiler for this project.
 *
 * The official `@tailwindcss/vite` plugin relies on the Oxide native scanner,
 * which hangs on this machine when the Node process loads the .node binding.
 * The compiler itself works, so we run it directly and scan the source files
 * with a small tokenizer here. The output is a plain CSS file that Vite imports
 * like any other stylesheet.
 *
 * Usage:
 *   node scripts/build-css.mjs          # one-off build
 *   node scripts/build-css.mjs --watch  # rebuild when sources change
 */
import { compile } from "@tailwindcss/node";
import { promises as fs, watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputFile = path.join(root, "src", "index.css");
const outputFile = path.join(root, "src", "generated.css");
const watchMode = process.argv.includes("--watch");

const SOURCE_DIRS = ["src"];
const SOURCE_FILES = ["index.html"];
const SOURCE_EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".html"]);

/* Extract every token that could possibly be a Tailwind candidate. Unknown
   candidates are ignored by the compiler, so false positives are harmless. */
const TOKEN_RE = /[A-Za-z0-9_\-:/.[\]()%#,!.+*&>~=@?]+/g;

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (SOURCE_EXT.has(path.extname(entry.name))) files.push(full);
  }

  return files;
}

async function collectCandidates(files) {
  const candidates = new Set();

  for (const file of files) {
    const text = await fs.readFile(file, "utf8");

    for (const [token] of text.matchAll(TOKEN_RE)) {
      if (token.length < 2 || token.length > 220) continue;
      if (/^[\d.]+$/.test(token)) continue;
      candidates.add(token);
    }
  }

  return [...candidates];
}

async function build() {
  const started = Date.now();
  const files = [];

  for (const dir of SOURCE_DIRS) {
    try {
      await walk(path.join(root, dir), files);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  for (const file of SOURCE_FILES) {
    files.push(path.join(root, file));
  }

  const input = await fs.readFile(inputFile, "utf8");
  const candidates = await collectCandidates(files);

  const compiler = await compile(input, {
    base: root,
    onDependency() {},
  });

  const css = compiler.build(candidates);
  await fs.writeFile(outputFile, css, "utf8");

  const kb = (Buffer.byteLength(css) / 1024).toFixed(1);
  console.log(
    `[css] ${files.length} files, ${candidates.length} candidates -> ${path.relative(
      root,
      outputFile
    )} (${kb} kB, ${Date.now() - started}ms)`
  );
}

await build();

if (watchMode) {
  let timer = null;

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      build().catch((error) => console.error("[css]", error.message));
    }, 120);
  }

  for (const dir of SOURCE_DIRS) {
    try {
      watch(path.join(root, dir), { recursive: true }, (event, filename) => {
        if (!filename) return;
        if (filename.includes("generated.css")) return;
        schedule();
      });
    } catch (error) {
      console.warn("[css] watch unavailable:", error.message);
    }
  }

  for (const file of SOURCE_FILES) {
    try {
      watch(path.join(root, file), schedule);
    } catch {
      /* ignore */
    }
  }

  console.log("[css] watching for changes...");
}
