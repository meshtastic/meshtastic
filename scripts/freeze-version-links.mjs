#!/usr/bin/env node
/**
 * Repoint links inside a frozen documentation version at that version.
 *
 * Run once, immediately after `pnpm docusaurus docs:version <version>`:
 *
 *   node scripts/freeze-version-links.mjs 2.7
 *
 * `docs:version` copies docs/ verbatim, so the snapshot inherits every
 * root-absolute `/docs/...` link. Those still resolve -- to the *live* version --
 * so an archived page silently walks readers into current docs. Docusaurus
 * cannot warn about it either: the route exists, so `onBrokenLinks` stays quiet.
 *
 * Relative links need no help; Docusaurus resolves them per-version.
 *
 * Safe to re-run: every pattern skips paths already pointing at this version.
 */

import fs from "node:fs";
import path from "node:path";

const version = process.argv[2];
if (!version) {
  console.error("usage: node scripts/freeze-version-links.mjs <version>");
  process.exit(1);
}

const root = path.join("versioned_docs", `version-${version}`);
if (!fs.existsSync(root)) {
  console.error(`no such directory: ${root}`);
  console.error(`run \`pnpm docusaurus docs:version ${version}\` first`);
  process.exit(1);
}

const prefix = `/docs/${version}/`;
// Guard every pattern so re-running cannot double-prefix a path that already
// points at this version (/docs/2.7/ -> /docs/2.7/2.7/).
const done = `(?!${version.replace(/\./g, "\\.")}/)`;

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.mdx?$/.test(e.name)) files.push(p);
  }
})(root);

const counts = {};
const bump = (k, n = 1) => (counts[k] = (counts[k] ?? 0) + n);

// Pass 1: links that name a source file, either root-absolute
// (`/docs/foo/bar.mdx`) or siteDir-relative (`docs/foo/bar.mdx`).
//
// Docusaurus resolves both by stripping routeBasePath / walking from siteDir,
// which lands on the *current* version. `/docs/2.7/foo/bar.mdx` is not a route
// at all and hard-fails the build. Rewriting them as relative file links lets
// Docusaurus resolve each to the right route, honouring `slug:` overrides.
const fileLink = new RegExp(
  String.raw`(\]\(|^\[[^\]]+\]:[ \t]*)/?docs/${done}([^)\s#]*\.mdx?)(#[^)\s]*)?`,
  "gm",
);

// Pass 2: everything else absolute simply gains the version segment.
const absolute = [
  ["markdown-inline", String.raw`\]\(/docs/${done}`, `](${prefix}`],
  ["markdown-noslash", String.raw`\]\(docs/${done}`, `](${prefix}`],
  [
    "markdown-refdef",
    String.raw`^(\[[^\]]+\]:[ \t]*)/docs/${done}`,
    `$1${prefix}`,
  ],
  ["jsx-attr", String.raw`\b(to|href)="/docs/${done}`, `$1="${prefix}`],
  [
    "jsx-expr",
    String.raw`\b(to|href)=\{(["'\x60])/docs/${done}`,
    `$1={$2${prefix}`,
  ],
  [
    "absolute-url",
    String.raw`https://meshtastic\.org/docs/${done}`,
    `https://meshtastic.org${prefix}`,
  ],
].map(([name, src, rep]) => [name, new RegExp(src, "gm"), rep]);

for (const file of files) {
  const dir = path.dirname(file);
  let text = fs.readFileSync(file, "utf8");
  const before = text;

  text = text.replace(fileLink, (match, open, target, anchor = "") => {
    const abs = path.join(root, target);
    if (!fs.existsSync(abs)) {
      bump("unresolved-file-link");
      console.warn(`  ! ${file}: no such target ${target}`);
      return match;
    }
    let rel = path.relative(dir, abs);
    if (!rel.startsWith(".")) rel = `./${rel}`;
    bump("file-link-to-relative");
    return `${open}${rel}${anchor}`;
  });

  for (const [name, re, replacement] of absolute) {
    const hits = text.match(re);
    if (hits) bump(name, hits.length);
    text = text.replace(re, replacement);
  }

  // Shared MDX partials are imported by site-absolute alias. Left alone, a
  // frozen page renders the live partial -- which defeats the freeze.
  const partials = text.match(/@site\/docs\//g);
  if (partials) bump("site-alias-import", partials.length);
  text = text.replaceAll(
    "@site/docs/",
    `@site/versioned_docs/version-${version}/`,
  );

  if (text !== before) fs.writeFileSync(file, text);
}

console.log(`frozen version ${version}: ${files.length} files scanned`);
for (const [k, v] of Object.entries(counts).sort()) {
  console.log(`  ${k.padEnd(26)} ${v}`);
}

// Fail loudly rather than shipping a snapshot that leaks into current docs.
const leakRe = new RegExp(
  String.raw`(\]\(|\b(?:to|href)=\{?["'\x60]?|^\[[^\]]+\]:[ \t]*)/?docs/${done}`,
  "gm",
);
const leaks = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.match(leakRe) ?? []) leaks.push(`${file}: ${m.trim()}`);
  if (text.includes("@site/docs/")) leaks.push(`${file}: @site/docs/`);
}

if (leaks.length) {
  console.error(
    `\n${leaks.length} link(s) still point outside version ${version}:`,
  );
  for (const l of leaks.slice(0, 20)) console.error(`  ${l}`);
  process.exit(1);
}
console.log(`\nno links escape /docs/${version}/`);
