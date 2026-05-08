#!/usr/bin/env node
// scripts/sync-apple-docs.js
// Synchronizes docs and images from meshtastic/Meshtastic-Apple into this repo.
//
// Usage:  node scripts/sync-apple-docs.js <path-to-cloned-apple-repo> [--convert-webp]
//
// --convert-webp  Convert PNG/JPG/JPEG/GIF images to WebP via cwebp and rewrite
//                 all image references in Markdown to use the .webp extension.
//                 SVGs are always kept as-is.  Requires cwebp to be on PATH.

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ── Configuration ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const APPLE_REPO_PATH = args.find((a) => !a.startsWith("--"));
const CONVERT_WEBP = args.includes("--convert-webp");

if (!APPLE_REPO_PATH) {
  console.error("Usage: node scripts/sync-apple-docs.js <apple-repo-path> [--convert-webp]");
  process.exit(1);
}

// Extensions that will be converted to WebP when --convert-webp is set.
const WEBP_CONVERTIBLE = new Set([".png", ".jpg", ".jpeg", ".gif"]);

const REPO_ROOT = path.resolve(__dirname, "..");

const SRC_DOCS_DIR = path.join(APPLE_REPO_PATH, "docs");
const DEST_DOCS_DIR = path.join(REPO_ROOT, "docs", "software", "apple");
const DEST_IMAGES_DIR = path.join(REPO_ROOT, "static", "img", "apple");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]);
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
 * When CONVERT_WEBP is enabled, convertible extensions are changed to .webp.
 */
function rewriteImagePaths(content) {
  function destBasename(imgPath) {
    const base = path.basename(imgPath);
    const ext = path.extname(base).toLowerCase();
    if (CONVERT_WEBP && WEBP_CONVERTIBLE.has(ext)) {
      return base.slice(0, -ext.length) + ".webp";
    }
    return base;
  }

  // Match Markdown image syntax: ![alt](path)
  // and HTML img tags: <img src="path" …>
  // Only rewrite paths that are NOT already absolute URLs or /img/… paths.
  return content
    .replace(
      /!\[([^\]]*)\]\((?!https?:\/\/)(?!\/img\/)([^)]+)\)/g,
      (match, alt, imgPath) => {
        const ext = path.extname(path.basename(imgPath)).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) return match;
        return `![${alt}](/img/apple/${destBasename(imgPath)})`;
      },
    )
    .replace(
      /<img\s+([^>]*?)src=["'](?!https?:\/\/)(?!\/img\/)([^"']+)["']([^>]*)>/gi,
      (match, before, imgPath, after) => {
        const ext = path.extname(path.basename(imgPath)).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) return match;
        return `<img ${before}src="/img/apple/${destBasename(imgPath)}"${after}>`;
      },
    )
    .replace(
      /<source\s+([^>]*?)srcset=["'](?!https?:\/\/)(?!\/img\/)([^"']+)["']([^>]*)>/gi,
      (match, before, imgPath, after) => {
        const ext = path.extname(path.basename(imgPath)).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) return match;
        return `<source ${before}srcset="/img/apple/${destBasename(imgPath)}"${after}>`;
      },
    );
}

/**
 * Convert Jekyll/kramdown-specific syntax to Docusaurus-compatible equivalents.
 *
 * Handles:
 * - `{: .tip }` class markers followed by blockquotes → Docusaurus `:::tip` admonitions
 * - Unescaped `<` characters in table cells (e.g. `<1013 hPa`, `< ⅓ mile`)
 *   that would be misread as JSX tags by the MDX parser
 */
function sanitizeForDocusaurus(content) {
  // Convert Jekyll-style {: .tip } + blockquote to Docusaurus admonitions.
  // Pattern: a standalone `{: .<type> }` line followed by a blockquote
  // whose first line is `> **Tip/Note/Warning — Title**`.
  content = content.replace(
    /^\{: \.(\w+) \}\n((?:^>.*\n?)+)/gm,
    (match, type, blockquote) => {
      // Map Jekyll class names to Docusaurus admonition types.
      const typeMap = {
        tip: "tip",
        note: "note",
        warning: "warning",
        warn: "warning",
        danger: "danger",
        info: "info",
      };
      const admonitionType = typeMap[type.toLowerCase()] || "note";

      // Strip the leading `> ` from each blockquote line.
      const lines = blockquote
        .split("\n")
        .filter((l) => l.trim() !== "")
        .map((l) => l.replace(/^>\s?/, ""));

      // If the first line matches `**Tip — Title**` or `**Type — Title**`,
      // extract the title and use it as the admonition title.
      // Handles em dash (—), en dash (–), and hyphen (-) separators.
      const titleMatch = lines[0] && lines[0].match(/^\*\*[^—–\-*]+[—–-]\s*(.+?)\*\*$/);
      const title = titleMatch ? titleMatch[1].trim() : null;
      const bodyLines = title ? lines.slice(1) : lines;
      const body = bodyLines.join("\n").trim();

      if (title) {
        return `:::${admonitionType} ${title}\n${body}\n:::\n`;
      }
      return `:::${admonitionType}\n${body}\n:::\n`;
    },
  );

  // Self-close void HTML elements (img, source) so MDX doesn't complain about
  // mismatched tags. e.g. <img src="…"> → <img src="…" />
  // Split on fenced and inline code spans to leave their content untouched.
  content = content
    .split(/(```[\s\S]*?```|`[^`]+`)/)
    .map((seg, i) => {
      if (i % 2 === 1) return seg; // inside a code span/block — leave as-is
      return seg.replace(/<(img|source)(\s[^>]*?)?\s*>/gi, (match, tag, attrs = "") => {
        if (match.endsWith("/>")) return match; // already self-closing
        return `<${tag}${attrs} />`;
      });
    })
    .join("");

  // Escape bare `<` characters outside code blocks that are clearly comparison
  // operators (followed by a digit, whitespace, or vulgar-fraction Unicode chars)
  // to prevent MDX from misinterpreting them as JSX element starts.
  // Split on fenced and inline code spans so their content is left untouched.
  const segments = content.split(/(```[\s\S]*?```|`[^`]+`)/);
  content = segments
    .map((seg, i) => {
      if (i % 2 === 1) return seg; // inside a code span/block — leave as-is
      return seg.replace(
        /<(?=[0-9\s\u00BC-\u00BE\u2150-\u215F])/g,
        "&lt;",
      );
    })
    .join("");

  return content;
}

/**
 * Rewrite internal doc links so they resolve correctly after files are placed
 * into `user/` or `developer/` subdirectories.
 *
 * Docusaurus resolves relative links relative to the **page URL**, not the file
 * path on disk.  A file at `developer/architecture.md` has the page URL
 * `/docs/software/apple/developer/architecture/`.  From there:
 *
 *   - A bare link `deep-links`      resolves to …/architecture/deep-links/  ✗
 *     It should be                               …/developer/deep-links/
 *     Fix: prepend `../`
 *
 *   - A link `../user/carplay`      resolves to …/developer/user/carplay/   ✗
 *     It should be                               …/user/carplay/
 *     Fix: prepend another `../`  →  `../../user/carplay`
 *
 *   - A link `../codebase.md` from `developer/adding-features.md` where
 *     `developer/codebase.md` exists: source wrote the link relative to an old
 *     flat layout, but the file is a sibling after sync.
 *     Fix: strip the `../`  →  `codebase.md`
 *
 * For the category landing pages (user/index.md, developer/index.md):
 *   - A link `user/signal-meter`    resolves to …/user/user/signal-meter/   ✗
 *     Fix: strip the same-subdir prefix  →  `signal-meter`
 *
 * @param {string} content           Markdown source.
 * @param {string} dRelPath          Dest-relative path, e.g. "user/carplay.md" or
 *                                   "developer/index.md".  Uses forward slashes.
 * @param {Set<string>} knownDestMdPaths  All dest-relative .md paths; used to detect
 *                                       sibling `../foo.md` links.
 */
function rewriteInternalDocLinks(content, dRelPath, knownDestMdPaths) {
  const normalised = dRelPath.split(path.sep).join("/");
  const parts = normalised.split("/");
  const subdir = parts.length >= 2 ? parts[0] : null; // "user" | "developer" | null
  const isLandingPage = parts.length === 2 && parts[1] === "index.md";
  const isSubdirFile = subdir === "user" || subdir === "developer";

  if (!isSubdirFile) return content; // root-level files need no adjustment

  /**
   * Rewrite a single link target extracted from Markdown or HTML.
   * Only touches relative links (not starting with `/`, `http`, `#`, or `mailto`).
   */
  function fixLink(target) {
    if (!target) return target;
    // Leave absolute URLs, absolute paths, fragment-only, and mailto links.
    if (/^(https?:|mailto:|\/|#)/.test(target)) return target;

    // ── Landing page rules ────────────────────────────────────────────────
    if (isLandingPage) {
      // Strip same-subdir prefix: "user/foo" → "foo", "developer/foo" → "foo"
      if (target.startsWith(`${subdir}/`)) {
        return target.slice(subdir.length + 1);
      }
      return target;
    }

    // ── Non-landing subdir file rules ─────────────────────────────────────

    // Cross-subdir links written as "../user/…" or "../developer/…":
    // The relative path relationship is preserved in the destination layout
    // (both user/ and developer/ live under docs/software/apple/), so these
    // links resolve correctly as-is.  Just ensure .md extension is present.
    if (/^\.\.\/(user|developer)\//.test(target)) {
      if (!target.endsWith(".md")) {
        const hashIdx = target.indexOf("#");
        if (hashIdx !== -1) {
          return target.slice(0, hashIdx) + ".md" + target.slice(hashIdx);
        }
        return `${target}.md`;
      }
      return target;
    }

    // Bare relative links (no leading "../", "./", or "/"):
    // In the source repo these are sibling links within the same subdir.
    // Docusaurus resolves them relative to the page URL rather than the file
    // path, so a bare `codebase` from `developer/adding-features` would resolve
    // to …/adding-features/codebase/ — wrong.  We need `../codebase`.
    // EXCEPTION: if the bare target resolves to a known sibling file in the
    // same subdir, the Docusaurus URL-relative resolution already works correctly
    // and we should NOT prepend `../`.
    if (!/^(\.\.\/|\.\/)/.test(target)) {
      const withMd = target.endsWith(".md") ? target : `${target}.md`;
      // Strip any fragment for the lookup
      const targetFile = withMd.split("#")[0];
      if (knownDestMdPaths && knownDestMdPaths.has(`${subdir}/${targetFile}`)) {
        // Known sibling.  Docusaurus only resolves links with a .md extension
        // relative to the *file* path; extension-less links are resolved
        // relative to the *page URL* and break.  Ensure .md is present.
        if (!target.endsWith(".md")) {
          // Preserve any fragment: "deep-links#foo" → "./deep-links.md#foo"
          const hashIdx = target.indexOf("#");
          if (hashIdx !== -1) {
            return "./" + target.slice(0, hashIdx) + ".md" + target.slice(hashIdx);
          }
          return `./${target}.md`;
        }
        return target;
      }
      return `../${target}`;
    }

    // `../foo.md` (or `../foo`) that doesn't match the cross-subdir pattern above:
    // check if the target is actually a sibling (source used old flat-layout paths).
    if (/^\.\.\//.test(target)) {
      const withoutParent = target.slice(3);
      const withMd = withoutParent.endsWith(".md") ? withoutParent : `${withoutParent}.md`;
      const targetFile = withMd.split("#")[0];
      if (knownDestMdPaths && knownDestMdPaths.has(`${subdir}/${targetFile}`)) {
        return withoutParent;
      }
    }

    return target;
  }

  // Rewrite Markdown links: [text](target) and [text](target "title")
  content = content.replace(
    /\[([^\]]*)\]\(([^)]+)\)/g,
    (match, text, raw) => {
      // Split off optional title: "path" or "path \"title\""
      const titleMatch = raw.match(/^(.*?)\s+"([^"]*)"$/);
      if (titleMatch) {
        const fixed = fixLink(titleMatch[1].trim());
        return `[${text}](${fixed} "${titleMatch[2]}")`;
      }
      return `[${text}](${fixLink(raw.trim())})`;
    },
  );

  return content;
}

/**
 * Ensure Jekyll / generic frontmatter is Docusaurus-compatible.
 * - If there is no `title` field, derive one from the filename.
 * - Converts `nav_order` → `sidebar_position` (Docusaurus uses the latter).
 * - Strips Jekyll-only fields: `has_children`, `layout`.
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

  let block = match[1];

  // Ensure title is present.
  if (!/^title\s*:/m.test(block)) {
    const title = path
      .basename(filename, path.extname(filename))
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    block = `title: ${title}\n${block}`;
  }

  // Convert Jekyll nav_order → Docusaurus sidebar_position.
  if (/^nav_order\s*:/m.test(block) && !/^sidebar_position\s*:/m.test(block)) {
    block = block.replace(/^nav_order(\s*:\s*\d+\s*)$/m, "sidebar_position$1");
  }

  // Remove Jekyll-only fields that are meaningless or cause noise in Docusaurus.
  block = block.replace(/^has_children\s*:.*\n?/m, "");
  block = block.replace(/^layout\s*:.*\n?/m, "");

  // Rebuild frontmatter (trim trailing whitespace that removal may leave).
  content = content.replace(frontmatterRe, `---\n${block.trimEnd()}\n---`);

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

  fs.mkdirSync(DEST_DOCS_DIR, { recursive: true });
  fs.mkdirSync(DEST_IMAGES_DIR, { recursive: true });

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

  // When converting to WebP, the dest basename differs from the source basename
  // for convertible extensions.  Build a map: src basename → dest basename.
  function toDestBasename(srcBasename) {
    const ext = path.extname(srcBasename).toLowerCase();
    if (CONVERT_WEBP && WEBP_CONVERTIBLE.has(ext)) {
      return srcBasename.slice(0, -ext.length) + ".webp";
    }
    return srcBasename;
  }

  const sourceImageBasenames = new Set(
    sourceImageFiles.map((f) => toDestBasename(path.basename(f))),
  );

  // Landing pages from the Apple repo root are remapped to become the Docusaurus
  // index page for their respective category subdirectory.  Docusaurus treats
  // <dir>/index.md as the category landing page automatically.
  const LANDING_PAGE_MAP = {
    "user.md": path.join("user", "index.md"),
    "developer.md": path.join("developer", "index.md"),
  };

  /**
   * Given a source-relative path, return the dest-relative path that should be
   * used inside DEST_DOCS_DIR.  Landing pages at the source root are remapped
   * into their subdirectory as index.md; everything else keeps its relative path.
   */
  function destRelPath(relPath) {
    const basename = path.basename(relPath);
    if (path.dirname(relPath) === "." && LANDING_PAGE_MAP[basename]) {
      return LANDING_PAGE_MAP[basename];
    }
    return relPath;
  }

  // Build the set of expected dest-relative paths for cleanup later.
  const expectedDestMdPaths = new Set(sourceMdFiles.map(destRelPath));

  // ── Sync Markdown files ───────────────────────────────────────────────────

  for (const relPath of sourceMdFiles) {
    const srcFile = path.join(SRC_DOCS_DIR, relPath);
    const dRelPath = destRelPath(relPath);
    const destFile = path.join(DEST_DOCS_DIR, dRelPath);

    let content = fs.readFileSync(srcFile, "utf8");
    content = ensureFrontmatter(content, relPath);
    content = rewriteImagePaths(content);
    content = sanitizeForDocusaurus(content);
    content = rewriteInternalDocLinks(content, dRelPath.split(path.sep).join("/"), expectedDestMdPaths);

    const exists = fs.existsSync(destFile);
    const existingContent = exists ? fs.readFileSync(destFile, "utf8") : null;

    if (!exists) {
      fs.mkdirSync(path.dirname(destFile), { recursive: true });
      fs.writeFileSync(destFile, content);
      console.log(`[ADD]    docs: ${dRelPath}`);
    } else if (existingContent !== content) {
      fs.mkdirSync(path.dirname(destFile), { recursive: true });
      fs.writeFileSync(destFile, content);
      console.log(`[UPDATE] docs: ${dRelPath}`);
    } else {
      console.log(`[SKIP]   docs: ${dRelPath} (unchanged)`);
    }
  }

  // ── Sync image files ──────────────────────────────────────────────────────

  for (const relPath of sourceImageFiles) {
    const srcFile = path.join(SRC_DOCS_DIR, relPath);
    const srcBasename = path.basename(relPath);
    const destBasename = toDestBasename(srcBasename);
    const destFile = path.join(DEST_IMAGES_DIR, destBasename);
    const srcExt = path.extname(srcBasename).toLowerCase();
    const shouldConvert = CONVERT_WEBP && WEBP_CONVERTIBLE.has(srcExt);

    const exists = fs.existsSync(destFile);
    if (!exists) {
      fs.mkdirSync(path.dirname(destFile), { recursive: true });
      if (shouldConvert) {
        execSync(`cwebp -quiet "${srcFile}" -o "${destFile}"`);
      } else {
        fs.copyFileSync(srcFile, destFile);
      }
      console.log(`[ADD]    img: ${destBasename}`);
    } else {
      // For converted images, compare source mtime to dest mtime to detect changes;
      // for copied images, do a byte-level comparison.
      let changed = false;
      if (shouldConvert) {
        const srcMtime = fs.statSync(srcFile).mtimeMs;
        const destMtime = fs.statSync(destFile).mtimeMs;
        changed = srcMtime > destMtime;
      } else {
        changed = !fs.readFileSync(srcFile).equals(fs.readFileSync(destFile));
      }
      if (changed) {
        if (shouldConvert) {
          execSync(`cwebp -quiet "${srcFile}" -o "${destFile}"`);
        } else {
          fs.copyFileSync(srcFile, destFile);
        }
        console.log(`[UPDATE] img: ${destBasename}`);
      } else {
        console.log(`[SKIP]   img: ${destBasename} (unchanged)`);
      }
    }
  }

  // ── Cleanup: remove files no longer in source ─────────────────────────────

  // Markdown — walk the full destination tree so subdirectories are covered.
  // Compare against the full dest-relative paths (not just basenames) so that
  // files that moved from the flat layout into subdirectories are cleaned up.
  const existingMdFiles = collectFiles(DEST_DOCS_DIR).filter((f) =>
    MD_EXTENSIONS.has(path.extname(f).toLowerCase()),
  );

  for (const file of existingMdFiles) {
    // Normalize separators for cross-platform safety.
    const normalised = file.split(path.sep).join("/");
    if (!expectedDestMdPaths.has(normalised)) {
      fs.unlinkSync(path.join(DEST_DOCS_DIR, file));
      console.log(`[REMOVE] docs: ${normalised}`);
    }
  }

  // Images — walk the full destination tree so subdirectories are covered.
  const existingImageFiles = collectFiles(DEST_IMAGES_DIR).filter((f) =>
    IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  );

  for (const file of existingImageFiles) {
    const basename = path.basename(file);
    if (!sourceImageBasenames.has(basename)) {
      fs.unlinkSync(path.join(DEST_IMAGES_DIR, file));
      console.log(`[REMOVE] img: ${basename}`);
    }
  }

  console.log("\nSync complete.");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
