#!/usr/bin/env node
// scripts/sync-apple-docs.js
// Synchronizes docs and images from meshtastic/Meshtastic-Apple into this repo.
//
// Usage:  node scripts/sync-apple-docs.js <path-to-cloned-apple-repo>

"use strict";

const fs = require("fs-extra");
const path = require("path");

// ── Configuration ────────────────────────────────────────────────────────────

const APPLE_REPO_PATH = process.argv[2];

if (!APPLE_REPO_PATH) {
  console.error("Usage: node scripts/sync-apple-docs.js <apple-repo-path>");
  process.exit(1);
}

const REPO_ROOT = path.resolve(__dirname, "..");

const SRC_DOCS_DIR = path.join(APPLE_REPO_PATH, "docs");
const DEST_DOCS_DIR = path.join(REPO_ROOT, "docs", "software", "apple");
const DEST_IMAGES_DIR = path.join(REPO_ROOT, "static", "img", "apple");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg"]);
const MD_EXTENSIONS = new Set([".md"]);

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Recursively collect all files under a directory, returning relative paths. */
function collectFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  function walk(current) {
    for (const entry of fs.readdirSync(current)) {
      const full = path.join(current, entry);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else {
        results.push(path.relative(dir, full));
      }
    }
  }
  walk(dir);
  return results;
}

/**
 * Rewrite image references inside a Markdown string so that bare filenames
 * (or relative paths) point to the Docusaurus static path `/img/apple/<file>`.
 */
function rewriteImagePaths(content) {
  // Match Markdown image syntax: ![alt](path)
  // and HTML img tags: <img src="path" …>
  // Only rewrite paths that are NOT already absolute URLs or /img/… paths.
  return content
    .replace(
      /!\[([^\]]*)\]\((?!https?:\/\/)(?!\/img\/)([^)]+)\)/g,
      (match, alt, imgPath) => {
        const basename = path.basename(imgPath);
        const ext = path.extname(basename).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) return match;
        return `![${alt}](/img/apple/${basename})`;
      },
    )
    .replace(
      /<img\s+([^>]*?)src=["'](?!https?:\/\/)(?!\/img\/)([^"']+)["']([^>]*)>/gi,
      (match, before, imgPath, after) => {
        const basename = path.basename(imgPath);
        const ext = path.extname(basename).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) return match;
        return `<img ${before}src="/img/apple/${basename}"${after}>`;
      },
    );
}

/**
 * Ensure Jekyll / generic frontmatter is Docusaurus-compatible.
 * - If there is no `title` field, derive one from the filename.
 * - `layout` is harmless in Docusaurus but we leave it; callers can strip it
 *   by adjusting this function if desired.
 */
function ensureFrontmatter(content, filename) {
  const frontmatterRe = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRe);

  if (!match) {
    // No frontmatter at all — add a minimal one derived from the filename.
    const title = path
      .basename(filename, path.extname(filename))
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return `---\ntitle: ${title}\n---\n\n${content}`;
  }

  const block = match[1];
  if (!/^title\s*:/m.test(block)) {
    const title = path
      .basename(filename, path.extname(filename))
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const updated = content.replace(
      frontmatterRe,
      `---\ntitle: ${title}\n${block}\n---`,
    );
    return updated;
  }

  return content;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(SRC_DOCS_DIR)) {
    console.error(
      `Source docs directory not found: ${SRC_DOCS_DIR}\n` +
        "Make sure the Apple repo was cloned and contains a /docs directory.",
    );
    process.exit(1);
  }

  fs.ensureDirSync(DEST_DOCS_DIR);
  fs.ensureDirSync(DEST_IMAGES_DIR);

  const sourceFiles = collectFiles(SRC_DOCS_DIR);

  // Split source files by type.
  const sourceMdFiles = sourceFiles.filter((f) =>
    MD_EXTENSIONS.has(path.extname(f).toLowerCase()),
  );
  const sourceImageFiles = sourceFiles.filter((f) =>
    IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  );

  // Warn about basename collisions (files in different subdirs with the same name).
  function warnCollisions(files, label) {
    const seen = new Map();
    for (const f of files) {
      const base = path.basename(f);
      if (seen.has(base)) {
        console.warn(
          `[WARN] ${label} basename collision: "${f}" vs "${seen.get(base)}" — only the last one will be kept.`,
        );
      }
      seen.set(base, f);
    }
  }
  warnCollisions(sourceMdFiles, "docs");
  warnCollisions(sourceImageFiles, "img");

  const sourceImageBasenames = new Set(
    sourceImageFiles.map((f) => path.basename(f)),
  );
  const sourceMdBasenames = new Set(sourceMdFiles.map((f) => path.basename(f)));

  // ── Sync Markdown files ───────────────────────────────────────────────────

  for (const relPath of sourceMdFiles) {
    const srcFile = path.join(SRC_DOCS_DIR, relPath);
    const destFile = path.join(DEST_DOCS_DIR, path.basename(relPath));

    let content = fs.readFileSync(srcFile, "utf8");
    content = ensureFrontmatter(content, relPath);
    content = rewriteImagePaths(content);

    const exists = fs.existsSync(destFile);
    const existingContent = exists ? fs.readFileSync(destFile, "utf8") : null;

    if (!exists) {
      fs.outputFileSync(destFile, content);
      console.log(`[ADD]    docs: ${path.basename(relPath)}`);
    } else if (existingContent !== content) {
      fs.outputFileSync(destFile, content);
      console.log(`[UPDATE] docs: ${path.basename(relPath)}`);
    } else {
      console.log(`[SKIP]   docs: ${path.basename(relPath)} (unchanged)`);
    }
  }

  // ── Sync image files ──────────────────────────────────────────────────────

  for (const relPath of sourceImageFiles) {
    const srcFile = path.join(SRC_DOCS_DIR, relPath);
    const destFile = path.join(DEST_IMAGES_DIR, path.basename(relPath));

    const exists = fs.existsSync(destFile);
    if (!exists) {
      fs.copySync(srcFile, destFile);
      console.log(`[ADD]    img: ${path.basename(relPath)}`);
    } else {
      const srcBuf = fs.readFileSync(srcFile);
      const destBuf = fs.readFileSync(destFile);
      if (!srcBuf.equals(destBuf)) {
        fs.copySync(srcFile, destFile);
        console.log(`[UPDATE] img: ${path.basename(relPath)}`);
      } else {
        console.log(`[SKIP]   img: ${path.basename(relPath)} (unchanged)`);
      }
    }
  }

  // ── Cleanup: remove files no longer in source ─────────────────────────────

  // Markdown — walk the full destination tree so subdirectories are covered.
  const existingMdFiles = collectFiles(DEST_DOCS_DIR).filter((f) =>
    MD_EXTENSIONS.has(path.extname(f).toLowerCase()),
  );

  for (const file of existingMdFiles) {
    const basename = path.basename(file);
    if (!sourceMdBasenames.has(basename)) {
      fs.removeSync(path.join(DEST_DOCS_DIR, file));
      console.log(`[REMOVE] docs: ${basename}`);
    }
  }

  // Images — walk the full destination tree so subdirectories are covered.
  const existingImageFiles = collectFiles(DEST_IMAGES_DIR).filter((f) =>
    IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  );

  for (const file of existingImageFiles) {
    const basename = path.basename(file);
    if (!sourceImageBasenames.has(basename)) {
      fs.removeSync(path.join(DEST_IMAGES_DIR, file));
      console.log(`[REMOVE] img: ${basename}`);
    }
  }

  console.log("\nSync complete.");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
