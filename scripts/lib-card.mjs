// Shared pieces for the hardware preview card: brand tokens, the network-map
// background, and the auto-fit layout solver.
//
// Tokens mirror src/css/variables.css ([data-theme="dark"]) and the
// THEME_COLORS.dark block in src/components/homepage/network-map-background.tsx.

export const TOKENS = {
  background: "#030712", // network-map bgEdge
  bgCenter: "#111827", // network-map bgCenter
  foreground: "#FAFAFA", // --foreground  0 0% 98%
  muted: "#9DA3AF", // --muted-foreground  220 10% 65%
  accent: "#69F284", // --accent  132 84% 68%
  mesh: { r: 98, g: 235, b: 140 }, // network-map primaryColor
};

// Vendored Geist (scripts/assets/fonts) leads both stacks so the rendered PNG is
// the same on every machine. The site's own system stacks follow as a fallback,
// and are what the page itself still uses in the browser.
export const MONO =
  "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
export const SANS =
  "'Geist', system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif";

// Node field from network-map-background.tsx (x%, y%, radioRange%).
export const MESH_NODES = [
  [18, 28, 18],
  [22, 35, 16],
  [28, 32, 17],
  [32, 38, 15],
  [15, 42, 16],
  [35, 30, 14],
  [32, 62, 18],
  [28, 72, 16],
  [48, 28, 14],
  [52, 32, 13],
  [55, 28, 14],
  [50, 38, 15],
  [58, 36, 14],
  [52, 52, 16],
  [58, 58, 15],
  [55, 68, 17],
  [68, 25, 18],
  [78, 38, 16],
  [85, 35, 15],
  [88, 42, 14],
  [92, 35, 15],
  [80, 50, 16],
  [88, 68, 17],
  [82, 72, 18],
];

// Continent polygons from drawMap(), as fractions of the canvas.
export const MESH_SHAPES = [
  [
    [0.08, 0.2],
    [0.35, 0.15],
    [0.38, 0.35],
    [0.25, 0.5],
    [0.08, 0.35],
  ],
  [
    [0.25, 0.52],
    [0.35, 0.55],
    [0.32, 0.85],
    [0.22, 0.75],
  ],
  [
    [0.42, 0.18],
    [0.8, 0.78],
  ],
];

/**
 * Draw the homepage's network-map background onto a canvas context.
 * Every input arrives in `theme` so this function can be stringified and run
 * inside the browser page, where module scope is not available.
 */
export function drawMeshBackground(ctx, W, H, theme) {
  const { bgCenter, bgEdge, mesh, nodes, shapes, dim = 1 } = theme;
  const { r, g, b } = mesh;

  const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
  bg.addColorStop(0, bgCenter);
  bg.addColorStop(1, bgEdge);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const px = H / 630; // stroke scale relative to the 1200x630 design size

  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 * dim})`;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.03 * dim})`;
  ctx.lineWidth = px;
  for (const pts of shapes) {
    ctx.beginPath();
    pts.forEach(([x, y], i) =>
      i ? ctx.lineTo(W * x, H * y) : ctx.moveTo(W * x, H * y),
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  const diagonal = Math.sqrt(W * W + H * H);
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.05 * dim})`;
  ctx.lineWidth = px;
  ctx.setLineDash([4 * px, 8 * px]);
  for (const [nx, ny, range] of nodes) {
    ctx.beginPath();
    ctx.arc(
      (W * nx) / 100,
      (H * ny) / 100,
      (diagonal * range) / 100,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
  }
  ctx.setLineDash([]);

  for (const [nx, ny] of nodes) {
    const x = (W * nx) / 100;
    const y = (H * ny) / 100;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 9 * px);
    glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 * dim})`);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.beginPath();
    ctx.arc(x, y, 9 * px, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 4 * px, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 * dim})`;
    ctx.fill();
  }
}

/** Everything drawMeshBackground needs, ready to hand across into the page. */
export const MESH_THEME = {
  bgCenter: TOKENS.bgCenter,
  bgEdge: TOKENS.background,
  mesh: TOKENS.mesh,
  nodes: MESH_NODES,
  shapes: MESH_SHAPES,
  dim: 0.6, // the node field is far denser on a 1200x630 card than across the hero
};

/**
 * Work out how big each device should be and how far apart they sit.
 *
 * Inputs are the TRIMMED aspect ratios (width / height of the visible ink), so
 * a device whose SVG carries extra padding is treated the same as one that
 * does not — that is what makes a swap safe.
 *
 * Sizing happens in three stages:
 *   1. Each device gets a nominal height: BASE x its own `scale` (1 by default,
 *      so an unknown new device just lands at the base height).
 *   2. One uniform factor `k` shrinks (or cautiously grows) the whole row until
 *      it fits the available width, the height ceiling, and the clearance below
 *      the text block — whichever binds first.
 *   3. Leftover width becomes the gap between devices, clamped so three devices
 *      do not drift to the edges and nine do not collide.
 *
 * Nothing here touches the canvas size; only the row adapts.
 */
export function fitRow(devices, opts) {
  const {
    available, // px of usable width between the side margins
    baseHeight = 200, // nominal height of a `scale: 1` device
    maxHeight, // hard ceiling: the row's vertical space
    minGap = 16, // floor: gaps tighten to here before devices shrink
    prefGap = 24, // the gap the row aims for when there is room
    maxGap = 72,
    growCap = 1.4, // never enlarge a sparse row more than this
  } = opts;

  const n = devices.length;
  if (n === 0) throw new Error("No devices selected — pick at least one.");

  // Normalise on the long edge rather than the height. Devices in this lineup are
  // objects of broadly similar size, so giving a landscape board the same height
  // as a portrait handheld makes the board far wider than anything else on the
  // card — a 50mm dev module ends up out-measuring a base station. Sizing the
  // long edge instead keeps them comparable. Portrait artwork is unaffected,
  // since its long edge is already its height.
  const longEdges = devices.map((d) => baseHeight * (d.scale ?? 1));
  const heights = longEdges.map((edge, i) =>
    devices[i].aspect > 1 ? edge / devices[i].aspect : edge,
  );
  const widths = heights.map((h, i) => h * devices[i].aspect);

  const sumW = widths.reduce((a, b) => a + b, 0);
  const tallest = Math.max(...heights);
  const slots = Math.max(n - 1, 0);

  // Two width budgets: one that keeps a comfortable gap, one that lets the gap
  // tighten to its floor before any device is allowed to shrink.
  const kPreferred = (available - prefGap * slots) / sumW;
  const kTight = (available - minGap * slots) / sumW;
  const kCeiling = maxHeight / tallest; // the row's vertical headroom

  let k;
  if (kTight < 1) {
    k = Math.min(kTight, kCeiling); // too crowded: shrink everything
  } else {
    k = Math.min(Math.max(1, Math.min(kPreferred, growCap)), kCeiling);
  }
  if (!(k > 0)) throw new Error("Not enough room for this many devices.");

  const finalW = widths.map((w) => w * k);
  const finalH = heights.map((h) => h * k);

  const slack = available - finalW.reduce((a, b) => a + b, 0);
  let gap = slots ? slack / slots : 0;
  // A single device has no gaps to distribute, so space-between would pin it to
  // the left margin.
  let justify = slots ? "space-between" : "center";
  if (gap > maxGap) {
    gap = maxGap; // stop a short row from spreading to the margins
    justify = "center";
  }

  return {
    k,
    justify,
    gap: Math.round(gap * 10) / 10,
    rowWidth: finalW.reduce((a, b) => a + b, 0) + gap * Math.max(n - 1, 0),
    items: devices.map((d, i) => ({
      ...d,
      width: Math.round(finalW[i] * 10) / 10,
      height: Math.round(finalH[i] * 10) / 10,
    })),
  };
}
