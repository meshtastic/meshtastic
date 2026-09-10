import { useId, useState } from "react";

interface Preset {
  name: string;
  sf: number;
  bw: number; // kHz, sub-GHz
  wideBw: number; // kHz on the 2.4 GHz band
  cr: number; // denominator of the 4/n coding rate
  licensed?: boolean; // carried by a ham band profile
  onWide?: boolean; // offered by the 2.4 GHz region profile
}

// Matches the modem preset table the firmware ships.
const PRESETS: Preset[] = [
  { name: "Short Turbo", sf: 7, bw: 500, wideBw: 1625, cr: 5, onWide: true },
  { name: "Short Fast", sf: 7, bw: 250, wideBw: 812.5, cr: 5, onWide: true },
  { name: "Short Slow", sf: 8, bw: 250, wideBw: 812.5, cr: 5, onWide: true },
  { name: "Medium Turbo", sf: 9, bw: 500, wideBw: 1625, cr: 5, onWide: true },
  { name: "Medium Fast", sf: 9, bw: 250, wideBw: 812.5, cr: 5, onWide: true },
  { name: "Medium Slow", sf: 10, bw: 250, wideBw: 812.5, cr: 5, onWide: true },
  { name: "Long Turbo", sf: 11, bw: 500, wideBw: 1625, cr: 8, onWide: true },
  { name: "Long Fast", sf: 11, bw: 250, wideBw: 812.5, cr: 5, onWide: true },
  {
    name: "Long Moderate",
    sf: 11,
    bw: 125,
    wideBw: 406.25,
    cr: 8,
    onWide: true,
  },
  { name: "Lite Fast", sf: 9, bw: 125, wideBw: 125, cr: 5 },
  { name: "Lite Slow", sf: 10, bw: 125, wideBw: 125, cr: 5 },
  { name: "Narrow Fast", sf: 7, bw: 62.5, wideBw: 62.5, cr: 6, licensed: true },
  { name: "Narrow Slow", sf: 8, bw: 62.5, wideBw: 62.5, cr: 6, licensed: true },
  { name: "Tiny Fast", sf: 7, bw: 15.6, wideBw: 15.6, cr: 5, licensed: true },
  { name: "Tiny Slow", sf: 8, bw: 15.6, wideBw: 15.6, cr: 6, licensed: true },
];

// Chip rate over symbols, discounted by the coding rate.
const dataRate = (sf: number, bw: number, cr: number): number =>
  (sf * (bw * 1000)) / 2 ** sf / 1000 / (cr / 4);

// 22 dBm transmit into 0 dB of antenna gain, against the thermal floor plus the
// demodulator's 2.5 dB per spreading factor. Reproduces every value in the preset table.
const linkBudget = (sf: number, bw: number): number =>
  197 - 10 * Math.log10(bw * 1000) + 2.5 * (sf - 7);

type FilterId = "all" | "ham" | "bw500" | "bw250" | "narrow" | "wide";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ham", label: "Licensed" },
  { id: "bw500", label: "500 kHz" },
  { id: "bw250", label: "250 kHz" },
  { id: "narrow", label: "Narrow" },
  { id: "wide", label: "2.4 GHz" },
];

type ShapeName =
  | "triangleDown"
  | "triangleUp"
  | "diamond"
  | "circle"
  | "square";

// Bandwidth keeps its own shape and ramp step in both bands, so the 2.4 GHz view reads
// against the sub-GHz one even though the preset names are reused there.
const BANDWIDTH_STYLE = new Map<number, { shape: ShapeName; slot: number }>([
  [15.6, { shape: "triangleDown", slot: 0 }],
  [62.5, { shape: "triangleUp", slot: 1 }],
  [125, { shape: "diamond", slot: 2 }],
  [250, { shape: "circle", slot: 3 }],
  [500, { shape: "square", slot: 4 }],
  [406.25, { shape: "diamond", slot: 2 }],
  [812.5, { shape: "circle", slot: 3 }],
  [1625, { shape: "square", slot: 4 }],
]);

interface Axes {
  xMax: number;
  xTicks: number[];
  yMin: number;
  yMax: number;
  yTicks: number[];
}

// Fixed per band, so switching between the sub-GHz filters never moves the axes
const SUB_AXES: Axes = {
  xMax: 25,
  xTicks: [0, 5, 10, 15, 20, 25],
  yMin: 138,
  yMax: 160,
  yTicks: [140, 145, 150, 155, 160],
};

const WIDE_AXES: Axes = {
  xMax: 90,
  xTicks: [0, 15, 30, 45, 60, 75, 90],
  yMin: 133,
  yMax: 155,
  yTicks: [135, 140, 145, 150, 155],
};

const WIDTH = 880;
const HEIGHT = 528;
const PAD = { top: 84, right: 90, bottom: 52, left: 62 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

const RADIUS = 6;
const LABEL_SIZE = 12;

const xScale = (kbps: number, axes: Axes): number =>
  PAD.left + (kbps / axes.xMax) * PLOT_W;

const yScale = (db: number, axes: Axes): number =>
  PAD.top + ((axes.yMax - db) / (axes.yMax - axes.yMin)) * PLOT_H;

interface Placement {
  x: number;
  y: number;
  anchor: "start" | "end";
}

const CHAR_W = 6.1;

// Rails above the smoothed line through the points, nearest first, so a label that cannot
// fit close in steps further up rather than sliding far along the curve. Every stalk then
// leaves its mark up and to the right, and stays short.
// Hand-placed labels, as offsets from the mark. Positive dy points down the screen and a
// dy of 4 reads as horizontal, since the text sits on its baseline; a negative dx puts the
// label to the left of its mark. Anything not listed here is placed automatically below.
const LABEL_HINTS = new Map<string, { dx: number; dy: number }>([
  ["Short Turbo", { dx: 12, dy: -8 }],
  ["Short Fast", { dx: 14, dy: 4 }],
  ["Medium Turbo", { dx: 14, dy: 4 }],
  ["Short Slow", { dx: 24, dy: -10 }],
  ["Medium Fast", { dx: 20, dy: 4 }],
  ["Narrow Fast", { dx: 20, dy: 1 }],
  ["Long Turbo", { dx: 37, dy: -26 }],
  ["Medium Slow", { dx: 25, dy: 4 }],
  ["Long Fast", { dx: 26, dy: -25 }],
  ["Narrow Slow", { dx: 30, dy: -34 }],
  ["Lite Fast", { dx: 21, dy: -26 }],
  ["Tiny Slow", { dx: 18, dy: -28 }],
  ["Long Moderate", { dx: 20, dy: -30 }],
  ["Tiny Fast", { dx: 22, dy: -30 }],
  ["Lite Slow", { dx: 24, dy: -35 }],
]);

const BANDS = [-28, -50, -72, -94, -116, -138, -160];
const SLIDES = [10, 30, 52, 76];
const MARK_CLEARANCE = 10;
// Labels stay clear of the title
const TITLE_BAND = 70;

interface Anchored {
  name: string;
  cx: number;
  cy: number;
}

interface LabelBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const hits = (a: LabelBox, b: LabelBox): boolean =>
  a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;

// Reads the rail at any x by walking the polyline it is built from
const railAt = (xs: number[], ys: number[], x: number): number => {
  const last = xs.length - 1;
  if (x <= xs[0]) return ys[0];
  if (x >= xs[last]) return ys[last];
  for (let i = 1; i <= last; i++) {
    if (x <= xs[i]) {
      const span = xs[i] - xs[i - 1] || 1;
      return ys[i - 1] + ((x - xs[i - 1]) / span) * (ys[i] - ys[i - 1]);
    }
  }
  return ys[last];
};

const placeLabels = (points: Anchored[]): Placement[] => {
  const marks: LabelBox[] = points.map((point) => ({
    x1: point.cx - MARK_CLEARANCE,
    y1: point.cy - MARK_CLEARANCE,
    x2: point.cx + MARK_CLEARANCE,
    y2: point.cy + MARK_CLEARANCE,
  }));
  const order = points
    .map((point, index) => ({ point, index }))
    .sort((a, b) => a.point.cx - b.point.cx);
  const n = order.length;
  const xs = order.map((entry) => entry.point.cx);
  const smooth = order.map((entry, i) => {
    const prev = order[Math.max(0, i - 1)].point.cy;
    const next = order[Math.min(n - 1, i + 1)].point.cy;
    return (prev + 2 * entry.point.cy + next) / 4;
  });

  const out: Placement[] = new Array(points.length);
  const placed: LabelBox[] = [...marks];

  // Hand-placed labels go down first, so the automatic ones have to work around them
  for (const entry of order) {
    const hint = LABEL_HINTS.get(entry.point.name);
    if (!hint) continue;
    const x = entry.point.cx + hint.dx;
    const y = entry.point.cy + hint.dy;
    const w = entry.point.name.length * CHAR_W;
    const anchor = hint.dx < 0 ? "end" : "start";
    const x1 = anchor === "end" ? x - w : x;
    placed.push({ x1, y1: y - LABEL_SIZE, x2: x1 + w, y2: y + 3 });
    out[entry.index] = { x, y, anchor };
  }

  for (const entry of order) {
    if (LABEL_HINTS.has(entry.point.name)) continue;
    const w = entry.point.name.length * CHAR_W;
    let chosen: Placement | null = null;

    for (const band of BANDS) {
      if (chosen) break;
      const railY = smooth.map((y) => y + band);
      for (const slide of SLIDES) {
        const x = entry.point.cx + slide;
        // Never let the rail put a label level with or below its own mark
        const y = Math.min(railAt(xs, railY, x), entry.point.cy - 14);
        const box: LabelBox = {
          x1: x,
          y1: y - LABEL_SIZE,
          x2: x + w,
          y2: y + 3,
        };
        const onCanvas = box.x2 <= WIDTH - 4 && box.y1 >= TITLE_BAND;
        if (onCanvas && !placed.some((other) => hits(box, other))) {
          placed.push(box);
          chosen = { x, y, anchor: "start" };
          break;
        }
      }
    }

    out[entry.index] = chosen ?? {
      x: entry.point.cx + SLIDES[0],
      y: Math.max(12, entry.point.cy - 14),
      anchor: "start",
    };
  }
  return out;
};

const Mark = ({
  shape,
  cx,
  cy,
  r,
}: {
  shape: ShapeName;
  cx: number;
  cy: number;
  r: number;
}): JSX.Element => {
  switch (shape) {
    case "square":
      return <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} />;
    case "diamond":
      return (
        <polygon
          points={`${cx},${cy - r * 1.25} ${cx + r * 1.25},${cy} ${cx},${cy + r * 1.25} ${cx - r * 1.25},${cy}`}
        />
      );
    case "triangleUp":
      return (
        <polygon
          points={`${cx},${cy - r * 1.3} ${cx + r * 1.2},${cy + r * 0.9} ${cx - r * 1.2},${cy + r * 0.9}`}
        />
      );
    case "triangleDown":
      return (
        <polygon
          points={`${cx},${cy + r * 1.3} ${cx + r * 1.2},${cy - r * 0.9} ${cx - r * 1.2},${cy - r * 0.9}`}
        />
      );
    default:
      return <circle cx={cx} cy={cy} r={r} />;
  }
};

const formatRate = (kbps: number): string =>
  kbps >= 10 ? kbps.toFixed(1) : kbps.toFixed(2);

const formatBandwidth = (value: number): string => {
  const bw = Number(value);
  return `${Number.isInteger(bw) ? bw : Number(bw.toFixed(2))} kHz`;
};

const matchesFilter = (preset: Preset, filter: FilterId): boolean => {
  switch (filter) {
    case "ham":
      return preset.licensed === true;
    case "bw500":
      return preset.bw === 500;
    case "bw250":
      return preset.bw === 250;
    case "narrow":
      return preset.bw < 250;
    case "wide":
      return preset.onWide === true;
    default:
      return true;
  }
};

export const LinkBudgetChart = (): JSX.Element => {
  const [selected, setSelected] = useState<FilterId[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const titleId = useId();
  const descId = useId();

  const wide = selected.includes("wide");
  const axes = wide ? WIDE_AXES : SUB_AXES;

  // No selection means everything; otherwise a preset needs to match any one chip
  const visible = (preset: Preset): boolean =>
    selected.length === 0 ||
    selected.some((filter) => matchesFilter(preset, filter));

  // The 2.4 GHz set reuses the preset names at wide bandwidths, so it never mixes
  const toggle = (id: FilterId) => {
    setActive(null);
    if (id === "all") {
      setSelected([]);
      return;
    }
    if (id === "wide" || selected.includes("wide")) {
      setSelected(selected.includes(id) ? [] : [id]);
      return;
    }
    setSelected(
      selected.includes(id)
        ? selected.filter((entry) => entry !== id)
        : [...selected, id],
    );
  };

  const points = PRESETS.filter(visible).map((preset) => {
    const bw = wide ? preset.wideBw : preset.bw;
    const kbps = dataRate(preset.sf, bw, preset.cr);
    const db = linkBudget(preset.sf, bw);
    const style = BANDWIDTH_STYLE.get(bw) ?? {
      shape: "circle" as ShapeName,
      slot: 3,
    };
    return {
      ...preset,
      bw,
      kbps,
      db,
      style,
      cx: xScale(kbps, axes),
      cy: yScale(db, axes),
    };
  });

  const placements = placeLabels(points);
  const labelled = points.map((point, index) => ({
    ...point,
    label: placements[index],
  }));

  const legend = [...new Set(points.map((point) => point.bw))]
    .filter((bw) => Number.isFinite(bw))
    .sort((a, b) => a - b);
  const hovered = points.find((point) => point.name === active);

  return (
    <figure className="lbc-root my-6 mx-0">
      <style>{`
        .lbc-root {
          --lbc-surface: hsl(var(--background));
          --lbc-ink: hsl(var(--foreground));
          --lbc-ink-muted: hsl(var(--subtle));
          --lbc-grid: #e1e0d9;
          --lbc-axis: #c3c2b7;
          --lbc-bw-0: #6da7ec;
          --lbc-bw-1: #3987e5;
          --lbc-bw-2: #256abf;
          --lbc-bw-3: #184f95;
          --lbc-bw-4: #0d366b;
        }
        @media (prefers-color-scheme: dark) {
          :root:where(:not([data-theme="light"])) .lbc-root {
            --lbc-grid: #2c2c2a;
            --lbc-axis: #383835;
            --lbc-bw-0: #256abf;
            --lbc-bw-1: #3987e5;
            --lbc-bw-2: #6da7ec;
            --lbc-bw-3: #9ec5f4;
            --lbc-bw-4: #cde2fb;
          }
        }
        :root[data-theme="dark"] .lbc-root {
          --lbc-grid: #2c2c2a;
          --lbc-axis: #383835;
          --lbc-bw-0: #256abf;
          --lbc-bw-1: #3987e5;
          --lbc-bw-2: #6da7ec;
          --lbc-bw-3: #9ec5f4;
          --lbc-bw-4: #cde2fb;
        }
        .lbc-mark { stroke: var(--lbc-surface); stroke-width: 2; }
        .lbc-hit {
          position: absolute;
          width: 30px; height: 30px;
          transform: translate(-50%, -50%);
          background: none; border: 0; padding: 0;
          border-radius: 50%; cursor: pointer;
        }
        .lbc-hit:focus-visible { outline: 2px solid var(--lbc-ink); outline-offset: 0; }
        .lbc-chip {
          border-radius: 9999px;
          border: 1px solid hsl(var(--accent));
          padding: 0.1rem 0.75rem;
          font: inherit;
          background: none;
          color: inherit;
          cursor: pointer;
        }
        .lbc-chip[aria-pressed="true"] {
          background: hsl(var(--btn-primary));
          color: hsl(var(--btn-primary-foreground));
        }
      `}</style>

      <ul className="flex flex-wrap gap-x-4 gap-y-1 list-none pl-0 mb-1 text-sm">
        {legend.map((bw) => {
          const style = BANDWIDTH_STYLE.get(bw);
          return (
            <li key={bw} className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <g fill={`var(--lbc-bw-${style?.slot ?? 3})`}>
                  <Mark shape={style?.shape ?? "circle"} cx={8} cy={8} r={5} />
                </g>
              </svg>
              {formatBandwidth(bw)}
            </li>
          );
        })}
      </ul>

      <div className="relative" onMouseLeave={() => setActive(null)}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>
            Link budget versus data rate, by modem preset
          </title>
          <text
            x={WIDTH / 2}
            y={62}
            textAnchor="middle"
            fontSize={24}
            fontWeight={700}
            fill="var(--lbc-ink)"
          >
            Link budget VS data rate
          </text>
          <desc id={descId}>
            A scatter plot of {points.length} modem presets
            {wide ? " on the 2.4 GHz band" : ""}. Data rate in kilobits per
            second runs along the horizontal axis and link budget in decibels up
            the vertical axis. Point shape and colour give the bandwidth. Each
            point carries its exact figures as a label for assistive technology.
          </desc>

          {axes.yTicks.map((db) => (
            <g key={db}>
              <line
                x1={PAD.left}
                y1={yScale(db, axes)}
                x2={PAD.left + PLOT_W}
                y2={yScale(db, axes)}
                stroke="var(--lbc-grid)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 10}
                y={yScale(db, axes) + 4}
                textAnchor="end"
                fontSize={15}
                fill="var(--lbc-ink-muted)"
              >
                {db}
              </text>
            </g>
          ))}

          {axes.xTicks.map((kbps) => (
            <g key={kbps}>
              <line
                x1={xScale(kbps, axes)}
                y1={PAD.top}
                x2={xScale(kbps, axes)}
                y2={PAD.top + PLOT_H}
                stroke="var(--lbc-grid)"
                strokeWidth={1}
              />
              <text
                x={xScale(kbps, axes)}
                y={PAD.top + PLOT_H + 20}
                textAnchor="middle"
                fontSize={15}
                fill="var(--lbc-ink-muted)"
              >
                {kbps}
              </text>
            </g>
          ))}

          <line
            x1={PAD.left}
            y1={PAD.top}
            x2={PAD.left}
            y2={PAD.top + PLOT_H}
            stroke="var(--lbc-axis)"
            strokeWidth={1}
          />
          <line
            x1={PAD.left}
            y1={PAD.top + PLOT_H}
            x2={PAD.left + PLOT_W}
            y2={PAD.top + PLOT_H}
            stroke="var(--lbc-axis)"
            strokeWidth={1}
          />

          <text
            x={PAD.left + PLOT_W / 2}
            y={HEIGHT - 8}
            textAnchor="middle"
            fontSize={15}
            fill="var(--lbc-ink)"
          >
            Data rate (kbps)
          </text>
          <text
            transform={`translate(16 ${PAD.top + PLOT_H / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={15}
            fill="var(--lbc-ink)"
          >
            Link budget (dB)
          </text>

          {labelled.map((point) => {
            const dim = active !== null && active !== point.name;
            const stalkX =
              point.label.anchor === "start"
                ? point.label.x - 4
                : point.label.x + 4;
            return (
              <g key={point.name} opacity={dim ? 0.35 : 1}>
                <line
                  x1={point.cx}
                  y1={point.cy}
                  x2={stalkX}
                  y2={point.label.y - 4}
                  stroke="var(--lbc-axis)"
                  strokeWidth={1}
                />
                <g
                  className="lbc-mark"
                  fill={`var(--lbc-bw-${point.style.slot})`}
                >
                  <Mark
                    shape={point.style.shape}
                    cx={point.cx}
                    cy={point.cy}
                    r={RADIUS}
                  />
                </g>
                <text
                  x={point.label.x}
                  y={point.label.y}
                  textAnchor={point.label.anchor}
                  fontSize={LABEL_SIZE}
                  fill="var(--lbc-ink)"
                >
                  {point.name}
                </text>
              </g>
            );
          })}
        </svg>

        {points.map((point) => (
          <button
            key={point.name}
            type="button"
            className="lbc-hit"
            style={{
              left: `${(point.cx / WIDTH) * 100}%`,
              top: `${(point.cy / HEIGHT) * 100}%`,
            }}
            aria-label={`${point.name}: ${formatRate(point.kbps)} kbps, ${point.db.toFixed(1)} dB, SF${point.sf}, coding rate 4/${point.cr}, ${formatBandwidth(point.bw)}`}
            onMouseEnter={() => setActive(point.name)}
            onFocus={() => setActive(point.name)}
            onBlur={() => setActive(null)}
          />
        ))}

        {hovered ? (
          <div
            className="pointer-events-none absolute z-10 rounded-md border border-accent bg-secondary px-2 py-1 text-sm shadow-md"
            style={{
              left: `${((hovered.cx + (hovered.cx > WIDTH * 0.6 ? -150 : 14)) / WIDTH) * 100}%`,
              top: `${(hovered.cy / HEIGHT) * 100}%`,
            }}
          >
            <strong>{hovered.name}</strong>
            <br />
            {formatRate(hovered.kbps)} kbps · {hovered.db.toFixed(1)} dB
            <br />
            SF{hovered.sf} · 4/{hovered.cr} · {formatBandwidth(hovered.bw)}
          </div>
        ) : null}
      </div>

      <fieldset className="flex flex-wrap gap-2 border-0 m-0 p-0 min-w-0 mt-3">
        <legend className="sr-only">Filter presets</legend>
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className="lbc-chip"
            aria-pressed={
              id === "all" ? selected.length === 0 : selected.includes(id)
            }
            onClick={() => toggle(id)}
          >
            {label}
          </button>
        ))}
      </fieldset>
    </figure>
  );
};
