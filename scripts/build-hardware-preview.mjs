#!/usr/bin/env node
/**
 * Build the social preview card for the hardware section.
 *
 *   node scripts/build-hardware-preview.mjs
 *   node scripts/build-hardware-preview.mjs --config scripts/hardware-preview.config.json
 *   node scripts/build-hardware-preview.mjs --cache-dir .cache/device-svg   # offline
 *
 * To add, remove or swap a device, edit src/data/devices.json: the row
 * re-measures, re-scales and re-spaces itself. The canvas stays 1200x630
 * whatever you put in it.
 *
 * Device artwork and metadata come from src/data/devices.json — the same source
 * the homepage modal renders from — so the card cannot drift from the site.
 */
// @playwright/test is the repo's devDependency and re-exports chromium.
// A bare "playwright" import is not a dependency here and fails on CI.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  TOKENS,
  MONO,
  SANS,
  MESH_THEME,
  drawMeshBackground,
  fitRow,
} from "./lib-card.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPO = path.resolve(HERE, "..");

// ---------------------------------------------------------------- card geometry
const CARD = { w: 1200, h: 630 };
const PAD = 56; // side margin
const ROW_BOTTOM = 46; // gap under the device row
const CLEARANCE = 30; // minimum breathing room between the text and the tallest device
const AVAILABLE = CARD.w - PAD * 2;

// --------------------------------------------------------------------- CLI args
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};

// REPO is the site checkout. By default that is the parent of scripts/, which is
// right when this lives in the repo; --repo points elsewhere when it does not.
const REPO = path.resolve(
  arg("repo", process.env.MESHTASTIC_REPO ?? DEFAULT_REPO),
);

const configPath = path.resolve(
  HERE,
  arg("config", "hardware-preview.config.json"),
);
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const cacheDir = arg(
  "cache-dir",
  config.cacheDir && path.resolve(REPO, config.cacheDir),
);
const outPath = path.resolve(REPO, arg("out", config.output));

// ------------------------------------------------------------- device resolution
const DEVICES_URL =
  "https://raw.githubusercontent.com/meshtastic/meshtastic/master/src/data/devices.json";

async function loadDevicesJson() {
  const local = path.resolve(
    REPO,
    config.devicesJson ?? "src/data/devices.json",
  );
  if (fs.existsSync(local)) {
    console.log(`devices  ${local}`);
    return JSON.parse(fs.readFileSync(local, "utf8"));
  }
  console.log(
    `devices  ${local}\n` +
      `         not found — falling back to ${DEVICES_URL}\n` +
      `         (run from the site checkout, or pass --repo /path/to/meshtastic, to use your local copy)`,
  );
  const res = await fetch(DEVICES_URL);
  if (!res.ok) {
    throw new Error(
      `No local devices.json and GitHub returned HTTP ${res.status}.\n` +
        `Put this script in the site repo, or pass --repo /path/to/meshtastic.`,
    );
  }
  return res.json();
}

const devicesJson = await loadDevicesJson();
const catalog = new Map(devicesJson.devices.map((d) => [d.name, d]));

// devices.json is the only source for which devices appear and in what order, so
// adding or removing one there needs no change here. The config contributes
// nothing but optional size nudges.
const scales = config.scales ?? {};

const stale = Object.keys(scales).filter((name) => !catalog.has(name));
if (stale.length) {
  console.warn(
    `  ! scale override${stale.length > 1 ? "s" : ""} for ${stale.map((n) => `"${n}"`).join(", ")} ` +
      `no longer in devices.json — ignored.\n` +
      `    Drop ${stale.length > 1 ? "them" : "it"} from "scales" in ${path.relative(REPO, configPath)}.`,
  );
}

// `order` is a preference, not a list: devices it names are placed first in that
// sequence, anything else follows in devices.json order, and a name that has left
// devices.json is skipped. So the arrangement survives, and a new device still
// appears without anyone editing this config.
const preferred = config.order ?? [];
const ordered = [
  ...preferred.map((name) => catalog.get(name)).filter(Boolean),
  ...devicesJson.devices.filter((d) => !preferred.includes(d.name)),
];

const unplaced = ordered
  .filter((d) => !preferred.includes(d.name))
  .map((d) => d.name);
if (preferred.length && unplaced.length) {
  console.log(
    `  i ${unplaced.join(", ")} not in "order" — appended in devices.json order.`,
  );
}

const selected = ordered.map((device) => ({
  name: device.name,
  image: device.image,
  vendor: device.vendor,
  scale: scales[device.name] ?? 1,
}));

const missingArt = selected.filter((d) => !d.image);
if (missingArt.length) {
  throw new Error(
    `devices.json entries without an "image": ${missingArt.map((d) => d.name).join(", ")}.`,
  );
}

// Device artwork lives in the flasher's public folder; the web-flasher repo is
// the same set of files and stands in if that host is unreachable.
const ARTWORK_MIRROR =
  "https://raw.githubusercontent.com/meshtastic/web-flasher/main/public/img/devices/";

async function loadArtwork(image) {
  if (cacheDir) {
    const local = path.join(cacheDir, image);
    if (fs.existsSync(local)) return fs.readFileSync(local, "utf8");
  }

  const sources = [
    `${devicesJson.imageBaseUrl}${image}`,
    `${ARTWORK_MIRROR}${image}`,
  ];
  const failures = [];
  for (const url of sources) {
    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      failures.push(`${url} — ${err.message}`);
      continue;
    }
    if (!res.ok) {
      failures.push(`${url} — HTTP ${res.status}`);
      continue;
    }
    const svg = await res.text();
    if (cacheDir) {
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(path.join(cacheDir, image), svg);
    }
    return svg;
  }
  throw new Error(
    `Could not fetch artwork for "${image}":\n  ${failures.join("\n  ")}\n` +
      `Check the filename against ${devicesJson.imageBaseUrl}, or drop the SVG into ${cacheDir ?? "the cache dir"}.`,
  );
}

// ------------------------------------------------------------------- webfonts
// The card bakes vendored Geist Mono / Geist Sans rather than the site's system
// font stacks. The stacks resolve to SF Mono on macOS and to something quite
// different on Linux, which would silently change the committed PNG depending on
// who regenerated it. These two variable files cover every weight the card uses.
const FONT_DIR = path.resolve(HERE, "assets/fonts");

function fontFaces() {
  const faces = [
    ["Geist Mono", "GeistMono-Variable.woff2"],
    ["Geist", "Geist-Variable.woff2"],
  ];
  return faces
    .map(([family, file]) => {
      const abs = path.join(FONT_DIR, file);
      if (!fs.existsSync(abs)) {
        throw new Error(
          `Missing vendored font ${abs}.\n` +
            `It ships with the repo, so a missing file means the checkout is incomplete.`,
        );
      }
      return (
        `@font-face{font-family:'${family}';` +
        `font-weight:100 900;font-style:normal;font-display:block;` +
        `src:url('file://${abs}') format('woff2-variations');}`
      );
    })
    .join("\n");
}

// ------------------------------------------------------------------------- render
/** Rasterize an SVG and crop it to its visible ink, so padding in the source file
 *  cannot throw off the row's scale or baseline. */
async function rasterizeTrimmed(page, svg, longEdge = 900) {
  return page.evaluate(
    async ({ svg, longEdge }) => {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise((ok, fail) => {
        img.onload = ok;
        img.onerror = () => fail(new Error("SVG failed to decode"));
        img.src = url;
      });
      const vb = svg.match(
        /viewBox="([-\d.eE]+)[ ,]+([-\d.eE]+)[ ,]+([-\d.eE]+)[ ,]+([-\d.eE]+)"/,
      );
      const nw = vb ? +vb[3] : img.naturalWidth || 300;
      const nh = vb ? +vb[4] : img.naturalHeight || 300;
      const s = longEdge / Math.max(nw, nh);
      const W = Math.round(nw * s);
      const H = Math.round(nh * s);

      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);

      const { data } = ctx.getImageData(0, 0, W, H);
      let x0 = W,
        y0 = H,
        x1 = -1,
        y1 = -1;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (data[(y * W + x) * 4 + 3] > 8) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
      }
      if (x1 < 0) throw new Error("SVG rendered blank");

      const tw = x1 - x0 + 1;
      const th = y1 - y0 + 1;
      const t = document.createElement("canvas");
      t.width = tw;
      t.height = th;
      t.getContext("2d").drawImage(c, x0, y0, tw, th, 0, 0, tw, th);
      return { dataUrl: t.toDataURL("image/png"), w: tw, h: th };
    },
    { svg, longEdge },
  );
}

async function backgroundDataUrl(page, scale = 2) {
  return page.evaluate(
    ({ W, H, src, theme }) => {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      // eslint-disable-next-line no-new-func
      const draw = new Function(`return (${src})`)();
      draw(c.getContext("2d"), W, H, theme);
      return c.toDataURL("image/png");
    },
    {
      W: CARD.w * scale,
      H: CARD.h * scale,
      src: drawMeshBackground.toString(),
      theme: MESH_THEME,
    },
  );
}

const LOGO = fs
  .readFileSync(
    path.resolve(REPO, config.logo ?? "scripts/assets/meshtastic-mark.svg"),
    "utf8",
  )
  .replace(/<\?xml[^>]*\?>/, "")
  .replace(/\s+/g, " ")
  .trim();

function cardHtml({ bg, row, text }) {
  const devices = row.items
    .map(
      (d) =>
        `<img src="${d.dataUrl}" alt="${d.name}" style="width:${d.width}px;height:${d.height}px;object-fit:contain;display:block">`,
    )
    .join("\n");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
${fontFaces()}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${CARD.w}px;height:${CARD.h}px;overflow:hidden}
#card{position:relative;width:${CARD.w}px;height:${CARD.h}px;overflow:hidden;background:${TOKENS.background};font-family:${SANS}}
#bg{position:absolute;inset:0;width:${CARD.w}px;height:${CARD.h}px;object-fit:cover}
#vig{position:absolute;left:0;right:0;bottom:0;height:300px;background:linear-gradient(to top,rgba(3,7,18,.92),rgba(3,7,18,0))}
#inner{position:relative;width:100%;height:100%;padding:48px ${PAD}px 0;display:flex;flex-direction:column}
#top{display:flex;align-items:center;justify-content:space-between}
#lock{display:flex;align-items:center;gap:16px}
#word{font-family:${MONO};font-weight:600;font-size:31px;color:${TOKENS.foreground};letter-spacing:-.4px}
#url{font-family:${MONO};font-weight:400;font-size:17px;color:${TOKENS.muted}}
h1{font-family:${MONO};font-weight:700;font-size:76px;line-height:1;color:${TOKENS.foreground};letter-spacing:-1px;margin-top:38px}
h1 span{color:${TOKENS.accent}}
p{font-weight:400;font-size:25px;line-height:1.6;color:${TOKENS.muted};margin-top:20px;max-width:900px}
#row{position:absolute;left:${PAD}px;right:${PAD}px;bottom:${ROW_BOTTOM}px;display:flex;align-items:flex-end;justify-content:${row.justify};gap:${row.gap}px}
</style></head><body><div id="card">
<img id="bg" src="${bg}" alt="">
<div id="vig"></div>
<div id="inner">
<div id="top"><div id="lock">${LOGO}<div id="word">${text.wordmark}</div></div><div id="url">${text.url}</div></div>
<h1>${text.headline}<span>${text.accentSuffix ?? ""}</span></h1>
<p id="sub">${text.subline}</p>
</div>
<div id="row">${devices}</div>
</div></body></html>`;
}

// ---------------------------------------------------------------------------- run
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: CARD.w, height: CARD.h },
  deviceScaleFactor: 1,
});
await page.setContent("<body></body>");

const artwork = [];
for (const d of selected) {
  const svg = await loadArtwork(d.image);
  const { dataUrl, w, h } = await rasterizeTrimmed(page, svg);
  artwork.push({ ...d, dataUrl, aspect: w / h });
}

const bg = await backgroundDataUrl(page);
const text = {
  wordmark: config.wordmark ?? "Meshtastic",
  url: config.url,
  headline: config.headline,
  accentSuffix: config.accentSuffix,
  subline: config.subline,
};

// Pass 1: lay the row out against the full height below the text, render, then
// ask the page where the text actually ends (copy length changes that).
let row = fitRow(artwork, {
  available: AVAILABLE,
  maxHeight: CARD.h - ROW_BOTTOM - 200,
});
await page.setContent(cardHtml({ bg, row, text }));
await page.evaluate(() => document.fonts.ready);
const textBottom = await page.evaluate(
  () => document.getElementById("sub").getBoundingClientRect().bottom,
);

// Pass 2: re-fit with the measured clearance so devices can never ride up into
// the subline, however long the copy or however few the devices.
const headroom = CARD.h - ROW_BOTTOM - textBottom - CLEARANCE;
row = fitRow(artwork, { available: AVAILABLE, maxHeight: headroom });
await page.setContent(cardHtml({ bg, row, text }));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
await page.screenshot({ path: outPath });
await browser.close();

console.log(
  `\nwrote    ${outPath}  ${CARD.w}x${CARD.h}\n` +
    `  ${row.items.length} devices · scale ${row.k.toFixed(3)} · gap ${row.gap}px · ${row.justify}\n` +
    `  headroom ${Math.round(headroom)}px (text ends at ${Math.round(textBottom)}px)\n` +
    row.items
      .map((d) => `  · ${d.name.padEnd(20)} ${d.width}x${d.height}`)
      .join("\n"),
);
