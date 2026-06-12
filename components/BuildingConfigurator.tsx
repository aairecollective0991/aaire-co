"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Roboto_Mono } from "next/font/google";

const mono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RoofStyle = "gable" | "lean-to";
type TrussType = "open-web" | "flush-column";
type Side = "front" | "back" | "left" | "right";
type OpeningType = "garage" | "walk" | "window";

const TRUSS_LABEL: Record<TrussType, string> = {
  "open-web": "Open Web Truss",
  "flush-column": "Residential Flush Column",
};

type AddonKey = "dormers" | "enclosedGable" | "mezzanine" | "insulation";
const ADDONS: Array<{ key: AddonKey; label: string }> = [
  { key: "dormers", label: "Dormers" },
  { key: "enclosedGable", label: "Enclosed add-on gable" },
  { key: "mezzanine", label: "Mezzanine" },
  { key: "insulation", label: "Insulation" },
];

interface Opening {
  id: number;
  type: OpeningType;
  side: Side;
  position: number; // feet from the wall's left corner
  width: number;
  height: number;
}

interface Porch {
  id: number;
  side: Side;
  depth: number;
  pitch: number;
}

interface BuildingSpec {
  dimensions: { width: number; length: number; eaveHeight: number };
  roof: { style: RoofStyle; pitch: number; trussType: TrussType };
  colors: { roof: string; walls: string; trim: string };
  porches: Array<{ side: Side; depth: number; pitch: number }>;
  openings: Array<{ type: OpeningType; side: Side; positionFromCorner: number; width: number; height: number }>;
  addons: string[];
}

interface BuildingConfiguratorProps {
  onQuoteRequest?: (spec: BuildingSpec, specText: string) => void;
  initialState?: Partial<State>;
}

interface State {
  width: number;
  length: number;
  eave: number;
  roofStyle: RoofStyle;
  trussType: TrussType;
  pitch: number;
  roofColorIdx: number;
  wallColorIdx: number;
  trimColorIdx: number;
  porches: Porch[];
  openings: Opening[];
  addons: Record<AddonKey, boolean>;
  nextOpeningId: number;
  nextPorchId: number;
}

// ---------------------------------------------------------------------------
// Theme tokens
// ---------------------------------------------------------------------------

const T = {
  bg:          "#0d1b2a",   // unified navy base
  panel:       "#162336",   // navy-light
  panelDeep:   "#0a1420",   // recessed inputs
  border:      "#1e3a5a",   // navy-tinted border
  borderSoft:  "#162a40",   // nested dividers
  accent:      "#C9A96E",   // gold (unchanged)
  cyan:        "#00d4ff",   // cyan highlight (unchanged)
  good:        "#34d399",   // green (unchanged)
  warn:        "#f5b54a",   // amber (unchanged)
} as const;
const INK = "rgba(220,210,190,0.9)";  // warm cream-adjacent
const INK_DIM = "#94a3b8";             // secondary text — still passes WCAG AA on new panel

// ---------------------------------------------------------------------------
// Materials (named, high-contrast)
// ---------------------------------------------------------------------------

const COLORS: Array<[string, string]> = [
  ["Crimson Red", "#8E1F25"],
  ["Rustic Red", "#6B2420"],
  ["Royal Blue", "#1E3A6B"],
  ["Gallery Blue", "#3E5E87"],
  ["Forest Green", "#2E4A34"],
  ["Evergreen", "#1F3328"],
  ["Polar White", "#F2F2EC"],
  ["Colonial White", "#E8E2D0"],
  ["Beige", "#C9B896"],
  ["Light Stone", "#B8B0A0"],
  ["Charcoal Gray", "#3E3E40"],
  ["Light Gray", "#9A9A98"],
  ["Burnished Slate", "#3A2E2A"],
  ["Brownstone", "#5A3F30"],
  ["Copper Penny", "#7A3F1E"],
  ["Dark Bronze", "#2E2620"],
  ["Black", "#1A1A1A"],
  ["Galvalume (bare steel)", "#B8B8B2"],
];

const OPENING_DEFAULTS: Record<OpeningType, { width: number; height: number }> = {
  garage: { width: 12, height: 12 },
  walk: { width: 3, height: 7 },
  window: { width: 3, height: 4 },
};
const OPENING_LABEL: Record<OpeningType, string> = { garage: "Garage door", walk: "Walk door", window: "Window" };

const WINDOW_SILL = 3.5;
const WINDOW_FILL = "#8FB8D4";

const DEFAULTS = { width: 40, length: 60, eave: 14, roofStyle: "gable" as RoofStyle, trussType: "open-web" as TrussType, pitch: 4, roofColorIdx: 10, wallColorIdx: 6, trimColorIdx: 6 };

// ---------------------------------------------------------------------------
// Geometry helpers (ridge along length; gable ends = left/right)
// ---------------------------------------------------------------------------

function wallExtent(side: Side, width: number, length: number): number {
  return side === "front" || side === "back" ? length : width;
}
function ridgeRise(width: number, pitch: number, style: RoofStyle): number {
  return style === "lean-to" ? width * (pitch / 12) : (width / 2) * (pitch / 12);
}
function isMirrored(side: Side): boolean {
  return side === "back" || side === "right";
}
function lighten(hex: string, pct: number): string {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.min(255, Math.round(r + (255 - r) * pct))},${Math.min(255, Math.round(g + (255 - g) * pct))},${Math.min(255, Math.round(b + (255 - b) * pct))})`;
}
function darken(hex: string, pct: number): string {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - pct))},${Math.round(g * (1 - pct))},${Math.round(b * (1 - pct))})`;
}
function clampPosition(opening: Opening, width: number, length: number): number {
  const max = wallExtent(opening.side, width, length) - opening.width;
  return Math.max(0, Math.min(opening.position, Math.max(0, max)));
}

function getPlanGeometry(state: State, vbW: number, vbH: number) {
  let totalW = state.width, totalL = state.length, offW = 0, offL = 0;
  state.porches.forEach((p) => {
    if (p.side === "front") { totalW += p.depth; offW = Math.max(offW, p.depth); }
    else if (p.side === "back") totalW += p.depth;
    else if (p.side === "left") { totalL += p.depth; offL = Math.max(offL, p.depth); }
    else if (p.side === "right") totalL += p.depth;
  });
  const padding = 56;
  const scale = Math.min((vbW - padding * 2) / totalL, (vbH - padding * 2) / totalW);
  const px0 = (vbW - totalL * scale) / 2 + offL * scale;
  const py0 = (vbH - totalW * scale) / 2 + offW * scale;
  return { px0, py0, scale };
}

const EVW = 320, EVH = 220, EV_PAD_X = 30, EV_PAD_TOP = 24, EV_PAD_BOTTOM = 30;
function elevationScale(state: State): number {
  const rise = ridgeRise(state.width, state.pitch, state.roofStyle);
  return Math.min((EVW - EV_PAD_X * 2) / Math.max(state.length, state.width), (EVH - EV_PAD_TOP - EV_PAD_BOTTOM) / (state.eave + rise));
}

interface DragDesc {
  openingId: number; svg: SVGSVGElement; axis: "x" | "y"; originPx: number; pxPerFt: number; mirror: boolean; ext: number; widthFt: number; offsetFt: number;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BuildingConfigurator({ onQuoteRequest, initialState }: BuildingConfiguratorProps) {
  const [state, setState] = useState<State>({
    ...DEFAULTS,
    porches: [],
    openings: [
      { id: 1, type: "garage", side: "front", position: 8, width: 12, height: 12 },
      { id: 2, type: "garage", side: "front", position: 40, width: 12, height: 12 },
      { id: 3, type: "walk", side: "right", position: 8, width: 3, height: 7 },
      { id: 4, type: "window", side: "front", position: 26, width: 3, height: 4 },
      { id: 5, type: "window", side: "left", position: 16, width: 3, height: 4 },
    ],
    addons: { dormers: false, enclosedGable: false, mezzanine: false, insulation: false },
    nextOpeningId: 6,
    nextPorchId: 1,
    ...initialState,
  });

  const [placeTool, setPlaceTool] = useState<OpeningType | null>(null);

  const clampedOpenings = useMemo(
    () => state.openings.map((op) => ({ ...op, position: clampPosition(op, state.width, state.length) })),
    [state.openings, state.width, state.length]
  );

  const counts = useMemo(() => {
    const c = { garage: 0, walk: 0, window: 0 };
    clampedOpenings.forEach((op) => c[op.type]++);
    return c;
  }, [clampedOpenings]);

  const roofHex = COLORS[state.roofColorIdx][1];
  const wallHex = COLORS[state.wallColorIdx][1];
  const trimHex = COLORS[state.trimColorIdx][1];

  const rise = ridgeRise(state.width, state.pitch, state.roofStyle);
  const ridgeHeight = Math.round((state.eave + rise) * 10) / 10;

  // ---- Live specs -------------------------------------------------------
  const specs = useMemo(() => {
    const { width: W, length: L, eave: E, pitch } = state;
    const sqft = W * L;
    const perimeter = 2 * (W + L);
    const wallArea = perimeter * E;
    const pitchDeg = Math.round((Math.atan(pitch / 12) * 180) / Math.PI);
    let roofArea: number;
    if (state.roofStyle === "lean-to") roofArea = Math.sqrt(W * W + rise * rise) * L;
    else roofArea = 2 * Math.sqrt((W / 2) * (W / 2) + rise * rise) * L;
    const porchArea = state.porches.reduce((sum, p) => sum + p.depth * wallExtent(p.side, W, L), 0);
    return { sqft, perimeter, wallArea: Math.round(wallArea), roofArea: Math.round(roofArea), porchArea: Math.round(porchArea), pitchDeg };
  }, [state, rise]);

  // ---- Validation (advisory, not a compliance claim) --------------------
  const checks = useMemo(() => {
    const out: Array<{ ok: boolean; msg: string }> = [];
    out.push({ ok: true, msg: `Clear-span ${state.width}′ width within standard range (12–80′)` });
    if (state.eave > 20) out.push({ ok: false, msg: `Tall ${state.eave}′ eave — bracing & anchorage to confirm on quote` });
    if (state.width > 60 && state.pitch < 2) out.push({ ok: false, msg: `Wide span with low pitch — confirm snow/load rating with us` });
    else out.push({ ok: true, msg: `Roof pitch ${state.pitch}:12 (${specs.pitchDeg}°) suitable for this span` });
    return out;
  }, [state.width, state.eave, state.pitch, specs.pitchDeg]);

  const isModified =
    state.width !== DEFAULTS.width || state.length !== DEFAULTS.length || state.eave !== DEFAULTS.eave ||
    state.roofStyle !== DEFAULTS.roofStyle || state.trussType !== DEFAULTS.trussType || state.pitch !== DEFAULTS.pitch ||
    state.roofColorIdx !== DEFAULTS.roofColorIdx || state.wallColorIdx !== DEFAULTS.wallColorIdx || state.trimColorIdx !== DEFAULTS.trimColorIdx;

  // ---- Drag -------------------------------------------------------------
  const dragRef = useRef<DragDesc | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const updateOpening = useCallback((id: number, patch: Partial<Opening>) => {
    setState((s) => ({ ...s, openings: s.openings.map((op) => (op.id === id ? { ...op, ...patch } : op)) }));
  }, []);

  const svgCoord = (svg: SVGSVGElement, cx: number, cy: number, axis: "x" | "y"): number | null => {
    const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
    const ctm = svg.getScreenCTM(); if (!ctm) return null;
    const p = pt.matrixTransform(ctm.inverse());
    return axis === "x" ? p.x : p.y;
  };

  useEffect(() => {
    // rAF-throttle: coalesce many pointermove events into one state update per frame.
    let raf = 0;
    let pending: { id: number; position: number } | null = null;
    const flush = () => { raf = 0; if (pending) { updateOpening(pending.id, { position: pending.position }); pending = null; } };
    const move = (e: PointerEvent) => {
      const d = dragRef.current; if (!d) return;
      const coord = svgCoord(d.svg, e.clientX, e.clientY, d.axis); if (coord == null) return;
      const rawFt = (coord - d.originPx) / d.pxPerFt;
      const posFt = (d.mirror ? d.ext - rawFt : rawFt) - d.offsetFt;
      pending = { id: d.openingId, position: Math.round(Math.max(0, Math.min(posFt, d.ext - d.widthFt)) * 10) / 10 };
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const up = () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (pending) { updateOpening(pending.id, { position: pending.position }); pending = null; }
      dragRef.current = null;
      setDraggingId(null);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    return () => { if (raf) cancelAnimationFrame(raf); document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); };
  }, [updateOpening]);

  const beginDrag = (e: React.PointerEvent<SVGElement>, opening: Opening, geom: { axis: "x" | "y"; originPx: number; pxPerFt: number; mirror: boolean; ext: number }) => {
    if (placeTool) return;
    e.preventDefault();
    const svg = (e.currentTarget as SVGGraphicsElement).ownerSVGElement; if (!svg) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const coord = svgCoord(svg, e.clientX, e.clientY, geom.axis); if (coord == null) return;
    const rawFt = (coord - geom.originPx) / geom.pxPerFt;
    const posFt = geom.mirror ? geom.ext - rawFt : rawFt;
    dragRef.current = { openingId: opening.id, svg, axis: geom.axis, originPx: geom.originPx, pxPerFt: geom.pxPerFt, mirror: geom.mirror, ext: geom.ext, widthFt: opening.width, offsetFt: posFt - opening.position };
    setDraggingId(opening.id);
  };

  // ---- Click-to-place ---------------------------------------------------
  const placeOnWall = (e: React.MouseEvent<SVGElement>, side: Side) => {
    if (!placeTool) return;
    const svg = (e.currentTarget as SVGGraphicsElement).ownerSVGElement; if (!svg) return;
    const axis: "x" | "y" = side === "front" || side === "back" ? "x" : "y";
    const coord = svgCoord(svg, e.clientX, e.clientY, axis); if (coord == null) return;
    const { px0, py0, scale } = getPlanGeometry(state, 600, 380);
    const ext = wallExtent(side, state.width, state.length);
    const d = OPENING_DEFAULTS[placeTool];
    let pos = (axis === "x" ? coord - px0 : coord - py0) / scale - d.width / 2;
    pos = Math.max(0, Math.min(pos, ext - d.width));
    setState((s) => ({
      ...s,
      openings: [...s.openings, { id: s.nextOpeningId, type: placeTool, side, position: Math.round(pos * 10) / 10, width: d.width, height: d.height }],
      nextOpeningId: s.nextOpeningId + 1,
    }));
  };

  // ---- Mutations --------------------------------------------------------
  const removeOpening = (id: number) => setState((s) => ({ ...s, openings: s.openings.filter((o) => o.id !== id) }));
  const addPorch = () => setState((s) => {
    const used = new Set(s.porches.map((p) => p.side));
    const avail = (["front", "back", "left", "right"] as Side[]).filter((sd) => !used.has(sd));
    if (!avail.length) return s;
    return { ...s, porches: [...s.porches, { id: s.nextPorchId, side: avail[0], depth: 10, pitch: 2 }], nextPorchId: s.nextPorchId + 1 };
  });
  const updatePorch = (id: number, patch: Partial<Porch>) => setState((s) => ({ ...s, porches: s.porches.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const removePorch = (id: number) => setState((s) => ({ ...s, porches: s.porches.filter((p) => p.id !== id) }));
  const reset = () => setState((s) => ({ ...s, ...DEFAULTS }));

  const buildSpec = (): BuildingSpec => ({
    dimensions: { width: state.width, length: state.length, eaveHeight: state.eave },
    roof: { style: state.roofStyle, pitch: state.pitch, trussType: state.trussType },
    colors: { roof: COLORS[state.roofColorIdx][0], walls: COLORS[state.wallColorIdx][0], trim: COLORS[state.trimColorIdx][0] },
    porches: state.porches.map((p) => ({ side: p.side, depth: p.depth, pitch: p.pitch })),
    openings: clampedOpenings.map((o) => ({ type: o.type, side: o.side, positionFromCorner: Math.round(o.position * 10) / 10, width: o.width, height: o.height })),
    addons: ADDONS.filter((a) => state.addons[a.key]).map((a) => a.label),
  });

  const buildSpecText = (): string => {
    const s = buildSpec();
    return [
      "AAIRE CO. — STEEL BUILDING SPEC SHEET",
      "=====================================",
      "",
      `Footprint:     ${state.width}' W x ${state.length}' L  (${specs.sqft.toLocaleString()} sq ft)`,
      `Eave height:   ${state.eave}'`,
      `Ridge height:  ${ridgeHeight}'`,
      `Roof:          ${state.roofStyle}, ${state.pitch}:12 pitch (${specs.pitchDeg} deg)`,
      `Framing:       ${TRUSS_LABEL[state.trussType]}`,
      `Wall area:     ~${specs.wallArea.toLocaleString()} sq ft (gross)`,
      `Roof area:     ~${specs.roofArea.toLocaleString()} sq ft`,
      "",
      "MATERIALS",
      `  Roof:  ${s.colors.roof}`,
      `  Walls: ${s.colors.walls}`,
      `  Trim:  ${s.colors.trim}`,
      "",
      `OPENINGS (${clampedOpenings.length})`,
      ...clampedOpenings.map((o) => `  - ${OPENING_LABEL[o.type]} ${o.width}'x${o.height}' on ${o.side} wall, ${Math.round(o.position * 10) / 10}' from corner`),
      ...(state.porches.length
        ? ["", `PORCHES (${state.porches.length}) — ~${specs.porchArea.toLocaleString()} sq ft total`,
           ...state.porches.map((p) => `  - ${p.side}: ${p.depth}' deep, ${p.pitch}:12  (~${(p.depth * wallExtent(p.side, state.width, state.length)).toLocaleString()} sq ft)`)]
        : []),
      ...(s.addons.length ? ["", "INQUIRE ABOUT", ...s.addons.map((a) => `  - ${a}`)] : []),
      "",
      "Estimate only — final design engineered to your local wind & snow loads.",
      "Request a free quote at aaireco.com",
    ].join("\n");
  };

  const downloadSpec = () => {
    const blob = new Blob([buildSpecText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `aaire-${state.width}x${state.length}-spec.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const availablePorchSides = useMemo(() => {
    const used = new Set(state.porches.map((p) => p.side));
    return (["front", "back", "left", "right"] as Side[]).filter((sd) => !used.has(sd));
  }, [state.porches]);

  const elevProps = { state, clampedOpenings, roofHex, wallHex, trimHex, draggingId, beginDrag };

  // -------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-4">
      {/* ===================== PREVIEW (full width) ===================== */}
      <div
        className="relative flex flex-col gap-3 rounded-xl border p-3"
        style={{ background: T.panel, borderColor: T.border, backgroundImage: `linear-gradient(rgba(201,169,110,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.08) 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
      >
        {/* Summary bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2" style={{ background: T.panelDeep, borderColor: T.borderSoft }}>
          <span className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: T.accent }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.good }} /> Live preview
          </span>
          <span className={`${mono.className} text-[13px] tabular-nums`} style={{ color: INK }}>
            {state.width}′W × {state.length}′L × {state.eave}′H · {state.pitch}:12 {state.roofStyle} · ridge {ridgeHeight}′
          </span>
          <span className={`${mono.className} text-[11px] tracking-widest uppercase hidden sm:block`} style={{ color: "rgba(201,169,110,0.35)" }}>
            AAIRE CO. — PLAN VIEW
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.6fr_1fr]">
          <div className="hidden sm:block"><IsoPanel state={state} roofHex={roofHex} wallHex={wallHex} trimHex={trimHex} clampedOpenings={clampedOpenings} /></div>
          <ElevationPanel wall="back" label="Back" {...elevProps} />
          {/* TECH SPECS — docked top-right of the views */}
          <div className="rounded-lg border p-3" style={{ background: T.panel, borderColor: T.border }}>
            <div className="mb-2 flex items-center justify-between">
              <SectionTitle icon="calc">Technical specs</SectionTitle>
              {isModified && <span className="rounded px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wider" style={{ color: T.accent, background: "rgba(201,169,110,0.12)", border: `1px solid ${T.accent}55` }}>Modified</span>}
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              <Spec label="Floor area" value={`${specs.sqft.toLocaleString()}`} unit="ft²" highlight />
              <Spec label="Footprint" value={`${state.width}×${state.length}`} unit="ft" />
              <Spec label="Eave height" value={`${state.eave}`} unit="ft" />
              <Spec label="Ridge height" value={`${ridgeHeight}`} unit="ft" />
              <Spec label="Roof pitch" value={`${state.pitch}:12`} unit={`${specs.pitchDeg}°`} />
              <Spec label="Perimeter" value={`${specs.perimeter}`} unit="ft" />
              <Spec label="Wall area" value={`~${specs.wallArea.toLocaleString()}`} unit="ft²" />
              <Spec label="Roof area" value={`~${specs.roofArea.toLocaleString()}`} unit="ft²" />
              {state.porches.length > 0 && <Spec label="Porch area" value={`${specs.porchArea.toLocaleString()}`} unit="ft²" highlight />}
            </div>
            <div className="mt-3 flex flex-col gap-1 border-t pt-2.5" style={{ borderColor: T.borderSoft }}>
              {checks.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[13px] leading-snug">
                  <span className="mt-px" style={{ color: c.ok ? T.good : T.warn }}>{c.ok ? "✓" : "⚠"}</span>
                  <span style={{ color: c.ok ? "rgba(52,211,153,0.95)" : "rgba(245,181,74,0.95)" }}>{c.msg}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={downloadSpec} className="mt-3 flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]" style={{ color: T.cyan, background: "rgba(0,212,255,0.08)", border: `1px solid ${T.cyan}44` }}>
              <DownloadIcon /> Download spec sheet
            </button>
          </div>

          <ElevationPanel wall="left" label="Left · gable" {...elevProps} />
          <PlanPanel state={state} clampedOpenings={clampedOpenings} roofHex={roofHex} wallHex={wallHex} trimHex={trimHex} draggingId={draggingId} beginDrag={beginDrag} placeTool={placeTool} placeOnWall={placeOnWall} />
          <ElevationPanel wall="right" label="Right · gable" {...elevProps} />

          <div className="sm:hidden"><IsoPanel state={state} roofHex={roofHex} wallHex={wallHex} trimHex={trimHex} clampedOpenings={clampedOpenings} /></div>
          <FramingSchematic trussType={state.trussType} />
          <ElevationPanel wall="front" label="Front" {...elevProps} />
          <div className="hidden sm:block" />
        </div>
      </div>

      {/* ===================== CONTROLS (below views) ===================== */}
      <div className={`${mono.className} flex flex-col gap-3`}>
        <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* DIMENSIONS */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <SectionTitle icon="beam">Dimensions</SectionTitle>
            <button type="button" onClick={reset} className="rounded px-1.5 py-1 text-[13px] uppercase tracking-wider transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ color: INK_DIM }}>Reset</button>
          </div>
          <Stepper label="Width" value={state.width} min={12} max={80} step={1} unit="ft" modified={state.width !== DEFAULTS.width} onChange={(v) => setState((s) => ({ ...s, width: v }))} />
          <Stepper label="Length" value={state.length} min={20} max={200} step={5} unit="ft" modified={state.length !== DEFAULTS.length} onChange={(v) => setState((s) => ({ ...s, length: v }))} />
          <Stepper label="Eave height" value={state.eave} min={8} max={30} step={1} unit="ft" modified={state.eave !== DEFAULTS.eave} onChange={(v) => setState((s) => ({ ...s, eave: v }))} />
        </Card>

        {/* ROOF */}
        <Card>
          <SectionTitle icon="roof">Roof</SectionTitle>
          <div className="mb-2 mt-2 flex gap-1.5">
            {(["gable", "lean-to"] as RoofStyle[]).map((style) => {
              const on = state.roofStyle === style;
              return (
                <button key={style} type="button" aria-pressed={on} onClick={() => setState((s) => ({ ...s, roofStyle: style }))}
                  className="flex-1 rounded-md px-2 py-2 text-sm capitalize transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  style={{ color: on ? T.bg : INK, background: on ? T.accent : "transparent", border: `1px solid ${on ? T.accent : T.border}`, fontWeight: on ? 600 : 400 }}>
                  {style}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="roof-pitch" className="w-16 text-[14px]" style={{ color: INK_DIM }}>Pitch</label>
            <select id="roof-pitch" value={state.pitch} onChange={(e) => setState((s) => ({ ...s, pitch: parseFloat(e.target.value) }))}
              className={`${mono.className} flex-1 rounded-md px-2 py-2 text-[14px] outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]`} style={{ background: T.panelDeep, border: `1px solid ${T.border}`, color: INK }}>
              <option value={1.5}>1.5:12 (low)</option>
              <option value={2}>2:12</option>
              <option value={3}>3:12</option>
              <option value={4}>4:12 (standard)</option>
              <option value={6}>6:12 (steep)</option>
            </select>
          </div>
        </Card>

        {/* FRAMING */}
        <Card>
          <SectionTitle icon="beam">Framing</SectionTitle>
          <div className="mt-2 flex flex-col gap-1.5">
            {(["open-web", "flush-column"] as TrussType[]).map((tt) => {
              const on = state.trussType === tt;
              return (
                <button key={tt} type="button" aria-pressed={on} onClick={() => setState((s) => ({ ...s, trussType: tt }))}
                  className="rounded-md px-3 py-2.5 text-left text-[15px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  style={{ color: on ? T.bg : INK, background: on ? T.accent : "transparent", border: `1px solid ${on ? T.accent : T.border}`, fontWeight: on ? 600 : 400 }}>
                  {TRUSS_LABEL[tt]}
                  <span className="mt-0.5 block text-[14px] font-normal" style={{ color: on ? "rgba(15,20,25,0.72)" : INK_DIM }}>
                    {tt === "open-web" ? "Triangulated steel lattice — best value, DIY-friendly" : "Solid flush columns — clean interior for living space"}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[14px]" style={{ color: INK_DIM }}>See the connection detail in the schematic, lower-left of the views.</p>
        </Card>

        {/* ADD-ONS */}
        <Card>
          <SectionTitle icon="door">Add-ons to inquire about</SectionTitle>
          <p className="mb-1.5 mt-1 text-[14px]" style={{ color: INK_DIM }}>Check any you want priced into your quote.</p>
          <div className="flex flex-col">
            {ADDONS.map((a) => (
              <label key={a.key} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-2 text-[15px] transition-colors hover:bg-white/5" style={{ color: INK }}>
                <input type="checkbox" checked={state.addons[a.key]}
                  onChange={(e) => setState((s) => ({ ...s, addons: { ...s.addons, [a.key]: e.target.checked } }))}
                  className="h-[18px] w-[18px] flex-shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ accentColor: T.accent }} />
                {a.label}
              </label>
            ))}
          </div>
        </Card>

        {/* MATERIALS */}
        <Card>
          <SectionTitle icon="swatch">Materials</SectionTitle>
          <div className="mt-2 flex flex-col gap-2.5">
            <MaterialPicker label="Roof" selectedIdx={state.roofColorIdx} onChange={(i) => setState((s) => ({ ...s, roofColorIdx: i }))} />
            <MaterialPicker label="Walls" selectedIdx={state.wallColorIdx} onChange={(i) => setState((s) => ({ ...s, wallColorIdx: i }))} />
            <MaterialPicker label="Trim" selectedIdx={state.trimColorIdx} onChange={(i) => setState((s) => ({ ...s, trimColorIdx: i }))} />
          </div>
        </Card>

        {/* OPENINGS */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <SectionTitle icon="door">Openings</SectionTitle>
            <span className={`${mono.className} text-[13px]`} style={{ color: INK_DIM }}>
              {counts.garage}G · {counts.walk}W · {counts.window}Win
            </span>
          </div>

          {/* place tool */}
          <div className="mb-2 flex gap-1.5">
            {(["garage", "walk", "window"] as OpeningType[]).map((type) => {
              const on = placeTool === type;
              return (
                <button key={type} type="button" aria-pressed={on} aria-label={`Place ${type}`} onClick={() => setPlaceTool(on ? null : type)}
                  className="flex-1 rounded-md px-2 py-2 text-[13px] capitalize transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  style={{ color: on ? T.bg : INK, background: on ? T.cyan : "transparent", border: `1px solid ${on ? T.cyan : T.border}`, fontWeight: on ? 600 : 400 }}>
                  + {type}
                </button>
              );
            })}
          </div>
          <p className="mb-2 text-[13px] italic leading-snug" style={{ color: placeTool ? T.cyan : INK_DIM }}>
            {placeTool ? `Click a wall in the plan to place a ${placeTool}. Click the tool again to stop.` : "Pick a tool above, then click the plan to place. Drag any opening in the plan or an elevation to move it."}
          </p>

          <div className="flex flex-col gap-1.5">
            {clampedOpenings.length === 0 ? (
              <p className="my-1 text-sm italic" style={{ color: INK_DIM }}>No openings yet.</p>
            ) : (
              clampedOpenings.map((op) => {
                const ext = wallExtent(op.side, state.width, state.length);
                return (
                  <div key={op.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-1.5 py-1">
                    <span className="truncate text-sm" style={{ color: INK }}>
                      <span className="mr-1 inline-block h-2 w-2 rounded-sm align-middle" style={{ background: op.type === "window" ? WINDOW_FILL : trimHex }} />
                      {OPENING_LABEL[op.type]}{op.type === "garage" ? ` ${op.width}×${op.height}` : ""}
                    </span>
                    <select aria-label={`${OPENING_LABEL[op.type]} wall`} value={op.side} onChange={(e) => updateOpening(op.id, { side: e.target.value as Side, position: 0 })}
                      className={`${mono.className} rounded px-1 py-1 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]`} style={{ background: T.panel, border: `1px solid ${T.border}`, color: INK }}>
                      <option value="front">Front</option>
                      <option value="back">Back</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                    <div className="flex items-center">
                      <input type="number" inputMode="numeric" aria-label={`${OPENING_LABEL[op.type]} position from corner, feet`}
                        value={Math.round(op.position * 10) / 10} min={0} max={Math.max(0, ext - op.width)} step={1}
                        onChange={(e) => { const v = parseFloat(e.target.value); if (Number.isNaN(v)) return; updateOpening(op.id, { position: Math.max(0, Math.min(v, ext - op.width)) }); }}
                        className={`${mono.className} w-12 rounded bg-transparent px-1 py-1 text-center text-[13px] tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]`} style={{ border: `1px solid ${T.border}`, color: INK }} />
                      <span className="ml-0.5 text-[13px]" style={{ color: INK_DIM }}>′</span>
                    </div>
                    <button type="button" aria-label={`Remove ${OPENING_LABEL[op.type]}`} onClick={() => removeOpening(op.id)} className="flex h-8 w-8 items-center justify-center rounded-md text-base leading-none transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ color: INK_DIM, border: `1px solid ${T.border}` }}>×</button>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* PORCHES */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <SectionTitle icon="beam">Porches</SectionTitle>
            <span className="text-[13px]" style={{ color: INK_DIM }}>{state.porches.length}/4</span>
          </div>
          <div className="flex flex-col gap-2">
            {state.porches.map((p) => (
              <div key={p.id} className="flex items-center gap-2 py-1">
                <select aria-label="Porch wall" value={p.side} onChange={(e) => { const ns = e.target.value as Side; if (state.porches.some((o) => o.id !== p.id && o.side === ns)) return; updatePorch(p.id, { side: ns }); }}
                  className={`${mono.className} rounded px-1 py-1 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]`} style={{ background: T.panel, border: `1px solid ${T.border}`, color: INK }}>
                  {(["front", "back", "left", "right"] as Side[]).map((sd) => <option key={sd} value={sd} disabled={state.porches.some((o) => o.id !== p.id && o.side === sd)}>{sd}</option>)}
                </select>
                <input type="range" aria-label={`${p.side} porch depth, feet`} min={6} max={20} step={1} value={p.depth} onChange={(e) => updatePorch(p.id, { depth: parseInt(e.target.value, 10) })} className="flex-1" />
                <span className={`${mono.className} w-9 text-right text-[13px]`} style={{ color: INK }}>{p.depth}′</span>
                <button type="button" aria-label={`Remove ${p.side} porch`} onClick={() => removePorch(p.id)} className="flex h-8 w-8 items-center justify-center rounded text-base leading-none hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ color: INK_DIM, border: `1px solid ${T.border}` }}>×</button>
              </div>
            ))}
            {state.porches.length === 0 && <p className="text-sm italic" style={{ color: INK_DIM }}>No porches.</p>}
          </div>
          {availablePorchSides.length > 0 && (
            <button type="button" onClick={addPorch} className="mt-2 w-full rounded-md py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ color: INK, border: `1px solid ${T.border}` }}>+ Add porch</button>
          )}
        </Card>
        </div>

        <button type="button" onClick={() => onQuoteRequest?.(buildSpec(), buildSpecText())} className="rounded-md py-3.5 text-[15px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-[#0d1b2a]" style={{ color: T.bg, background: T.accent, boxShadow: `0 0 24px rgba(201,169,110,0.25)` }}>
          Request quote for this build →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// UI primitives
// ---------------------------------------------------------------------------

function Card({ children }: { children: React.ReactNode }) {
  return <section className="rounded-lg border p-3" style={{ background: T.panel, borderColor: T.border }}>{children}</section>;
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon: string }) {
  return (
    <p className="flex items-center gap-1.5 text-[15px] font-semibold" style={{ color: INK }}>
      <TechIcon name={icon} /> {children}
    </p>
  );
}

function Spec({ label, value, unit, highlight }: { label: string; value: string; unit?: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px]" style={{ color: INK_DIM }}>{label}</span>
      <span className={`${mono.className} text-[15px] tabular-nums`} style={{ color: highlight ? T.cyan : INK, fontWeight: highlight ? 600 : 500 }}>
        {value}{unit && <span className="ml-0.5 text-[13px]" style={{ color: INK_DIM }}>{unit}</span>}
      </span>
    </div>
  );
}

function Stepper({ label, value, min, max, step, unit, modified, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; modified: boolean; onChange: (v: number) => void }) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const id = `step-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <label htmlFor={id} className="flex items-center gap-1.5 text-[14px]" style={{ color: INK_DIM }}>
        {label}
        {modified && <span className="rounded px-1 text-[12px] font-bold uppercase" style={{ color: T.accent, background: "rgba(201,169,110,0.12)" }}>mod</span>}
      </label>
      <div className="flex items-center overflow-hidden rounded-md" style={{ border: `1px solid ${T.border}`, background: T.panelDeep }}>
        <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(clamp(value - step))} className="flex h-9 w-9 items-center justify-center text-lg leading-none transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A96E]" style={{ color: T.accent }}>−</button>
        <div className="flex items-center" style={{ borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}` }}>
          <input id={id} type="number" inputMode="numeric" aria-label={`${label} in ${unit}`} value={value} min={min} max={max} step={step}
            onChange={(e) => { const v = parseFloat(e.target.value); if (!Number.isNaN(v)) onChange(clamp(v)); }}
            className={`${mono.className} w-12 bg-transparent py-1.5 text-center text-[15px] tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A96E]`} style={{ color: INK }} />
          <span className="pr-1.5 text-[13px]" style={{ color: INK_DIM }}>{unit}</span>
        </div>
        <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(clamp(value + step))} className="flex h-9 w-9 items-center justify-center text-lg leading-none transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A96E]" style={{ color: T.accent }}>+</button>
      </div>
    </div>
  );
}

function MaterialPicker({ label, selectedIdx, onChange }: { label: string; selectedIdx: number; onChange: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[13px]" style={{ color: INK_DIM }}>{label}</span>
        <button type="button" aria-expanded={open} aria-label={`${label} material: ${COLORS[selectedIdx][0]}. Change`} onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[13px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ color: INK }}>
          <span className="inline-block h-3.5 w-3.5 rounded-sm" style={{ background: COLORS[selectedIdx][1], border: "1px solid rgba(255,255,255,0.2)" }} />
          {COLORS[selectedIdx][0]}
          <span style={{ color: INK_DIM }}>{open ? "▲" : "▼"}</span>
        </button>
      </div>
      {open && (
        <div className="grid grid-cols-2 gap-1 rounded-md p-1.5" style={{ background: T.panelDeep, border: `1px solid ${T.borderSoft}` }}>
          {COLORS.map((c, i) => {
            const on = i === selectedIdx;
            return (
              <button key={i} type="button" aria-pressed={on} onClick={() => { onChange(i); setOpen(false); }} className="flex items-center gap-1.5 rounded px-1.5 py-2 text-left text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]" style={{ background: on ? "rgba(201,169,110,0.12)" : "transparent", color: on ? T.accent : INK }}>
                <span className="inline-block h-3.5 w-3.5 flex-shrink-0 rounded-sm" style={{ background: c[1], border: "1px solid rgba(255,255,255,0.2)" }} />
                <span className="truncate">{c[0]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DownloadIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" /></svg>;
}

function TechIcon({ name }: { name: string }) {
  const c = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: 1.8 } as const;
  if (name === "calc") return <svg {...c}><rect x="5" y="3" width="14" height="18" rx="1" strokeLinejoin="round" /><path d="M8 7h8M8 11h2M12 11h0M8 15h2" strokeLinecap="round" /></svg>;
  if (name === "beam") return <svg {...c}><path d="M3 7h18M3 17h18M7 7v10M17 7v10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "roof") return <svg {...c}><path d="M3 12l9-7 9 7M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "swatch") return <svg {...c}><circle cx="9" cy="9" r="6" strokeLinejoin="round" /><path d="M15 9a6 6 0 11-6 6" strokeLinecap="round" /></svg>;
  if (name === "door") return <svg {...c}><rect x="6" y="3" width="12" height="18" rx="1" strokeLinejoin="round" /><circle cx="14.5" cy="12" r="0.8" fill={T.accent} stroke="none" /></svg>;
  return null;
}

function PanelShell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-lg p-1.5" style={{ background: T.panelDeep, border: `1px solid ${T.borderSoft}` }}>
      <div className="mb-0.5 flex items-center justify-between px-1">
        <span className="text-[13px] font-semibold" style={{ color: T.accent }}>{title}</span>
        {hint && <span className={`${mono.className} text-[13px]`} style={{ color: INK_DIM }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Plan panel
// ---------------------------------------------------------------------------

interface PlanProps {
  state: State; clampedOpenings: Opening[]; roofHex: string; wallHex: string; trimHex: string; draggingId: number | null;
  beginDrag: (e: React.PointerEvent<SVGElement>, op: Opening, geom: { axis: "x" | "y"; originPx: number; pxPerFt: number; mirror: boolean; ext: number }) => void;
  placeTool: OpeningType | null;
  placeOnWall: (e: React.MouseEvent<SVGElement>, side: Side) => void;
}

function PlanPanel(props: PlanProps) {
  return (
    <PanelShell title="Top / Plan" hint={props.placeTool ? "click wall to place" : "drag openings"}>
      <svg viewBox="0 0 600 380" className="h-auto w-full touch-none select-none" role="img" aria-label="Plan view">
        <PlanViewSvg {...props} vbW={600} vbH={380} />
      </svg>
    </PanelShell>
  );
}

function PlanViewSvg({ state, clampedOpenings, roofHex, wallHex, trimHex, draggingId, beginDrag, placeTool, placeOnWall, vbW, vbH }: PlanProps & { vbW: number; vbH: number }) {
  const { px0, py0, scale } = getPlanGeometry(state, vbW, vbH);
  const W = state.width, L = state.length;
  const hit = placeTool ? Math.max(10, scale * 2) : 0;

  return (
    <>
      {state.porches.map((p) => {
        let prx = 0, pry = 0, prw = 0, prh = 0;
        if (p.side === "front") { prx = px0; pry = py0 - p.depth * scale; prw = L * scale; prh = p.depth * scale; }
        else if (p.side === "back") { prx = px0; pry = py0 + W * scale; prw = L * scale; prh = p.depth * scale; }
        else if (p.side === "left") { prx = px0 - p.depth * scale; pry = py0; prw = p.depth * scale; prh = W * scale; }
        else if (p.side === "right") { prx = px0 + L * scale; pry = py0; prw = p.depth * scale; prh = W * scale; }
        return (
          <g key={p.id}>
            <rect x={prx} y={pry} width={prw} height={prh} fill={lighten(roofHex, 0.3)} stroke={darken(roofHex, 0.1)} strokeWidth={0.8} strokeDasharray="4,3" opacity={0.4} />
            <text x={prx + prw / 2} y={pry + prh / 2} fontSize={17} fill={INK_DIM} textAnchor="middle" dominantBaseline="middle">{p.depth}′ porch</text>
          </g>
        );
      })}

      <rect x={px0} y={py0} width={L * scale} height={W * scale} fill={lighten(wallHex, 0.1)} stroke={darken(wallHex, 0.1)} strokeWidth={1.4} />
      {state.roofStyle === "gable" && <line x1={px0} y1={py0 + (W * scale) / 2} x2={px0 + L * scale} y2={py0 + (W * scale) / 2} stroke={INK_DIM} strokeWidth={0.6} strokeDasharray="5,4" />}

      {(() => {
        const pd = (sd: Side) => state.porches.find((p) => p.side === sd)?.depth ?? 0;
        return (
          <>
            <text x={px0 + (L * scale) / 2} y={py0 - pd("front") * scale - 14} fontSize={17} fill={INK} textAnchor="middle">FRONT · {L}′</text>
            <text x={px0 + (L * scale) / 2} y={py0 + W * scale + pd("back") * scale + 22} fontSize={17} fill={INK} textAnchor="middle">BACK</text>
            <text x={px0 - pd("left") * scale - 14} y={py0 + (W * scale) / 2} fontSize={17} fill={INK} textAnchor="end" dominantBaseline="middle">LEFT · {W}′</text>
            <text x={px0 + L * scale + pd("right") * scale + 14} y={py0 + (W * scale) / 2} fontSize={17} fill={INK} textAnchor="start" dominantBaseline="middle">RIGHT</text>
          </>
        );
      })()}

      {/* placement hit strips */}
      {placeTool && (["front", "back", "left", "right"] as Side[]).map((side) => {
        let x = 0, y = 0, w = 0, h = 0;
        if (side === "front") { x = px0; y = py0 - hit; w = L * scale; h = hit; }
        else if (side === "back") { x = px0; y = py0 + W * scale; w = L * scale; h = hit; }
        else if (side === "left") { x = px0 - hit; y = py0; w = hit; h = W * scale; }
        else { x = px0 + L * scale; y = py0; w = hit; h = W * scale; }
        return <rect key={side} x={x} y={y} width={w} height={h} fill="rgba(0,212,255,0.18)" stroke={T.cyan} strokeWidth={0.8} strokeDasharray="3,3" style={{ cursor: "copy" }} onClick={(e) => placeOnWall(e, side)} />;
      })}

      {clampedOpenings.map((op) => {
        const thickness = Math.max(4, scale * 1.4);
        const fill = op.type === "window" ? WINDOW_FILL : trimHex;
        let ox = 0, oy = 0, ow = 0, oh = 0;
        if (op.side === "front") { ox = px0 + op.position * scale; oy = py0 - thickness / 2; ow = op.width * scale; oh = thickness; }
        else if (op.side === "back") { ox = px0 + op.position * scale; oy = py0 + W * scale - thickness / 2; ow = op.width * scale; oh = thickness; }
        else if (op.side === "left") { ox = px0 - thickness / 2; oy = py0 + op.position * scale; ow = thickness; oh = op.width * scale; }
        else { ox = px0 + L * scale - thickness / 2; oy = py0 + op.position * scale; ow = thickness; oh = op.width * scale; }
        const axis: "x" | "y" = op.side === "front" || op.side === "back" ? "x" : "y";
        const ext = wallExtent(op.side, W, L);
        const isDragging = draggingId === op.id;
        return (
          <rect key={op.id} x={ox} y={oy} width={ow} height={oh} fill={fill} stroke={isDragging ? T.cyan : darken(op.type === "window" ? "#5C8BA8" : trimHex, 0.2)} strokeWidth={isDragging ? 2 : 0.5}
            style={{ cursor: placeTool ? "default" : "grab", pointerEvents: placeTool ? "none" : "auto" }}
            onPointerDown={(e) => beginDrag(e, op, { axis, originPx: axis === "x" ? px0 : py0, pxPerFt: scale, mirror: false, ext })} />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Elevation panel
// ---------------------------------------------------------------------------

interface ElevProps {
  wall: Side; label: string; state: State; clampedOpenings: Opening[]; roofHex: string; wallHex: string; trimHex: string; draggingId: number | null;
  beginDrag: (e: React.PointerEvent<SVGElement>, op: Opening, geom: { axis: "x" | "y"; originPx: number; pxPerFt: number; mirror: boolean; ext: number }) => void;
}

function ElevationPanel({ wall, label, state, clampedOpenings, roofHex, wallHex, trimHex, draggingId, beginDrag }: ElevProps) {
  const isGableEnd = wall === "left" || wall === "right";
  const ext = wallExtent(wall, state.width, state.length);
  const E = state.eave;
  const rise = ridgeRise(state.width, state.pitch, state.roofStyle);
  const scale = elevationScale(state);
  const mirror = isMirrored(wall);
  const groundY = EVH - EV_PAD_BOTTOM;
  const px0 = (EVW - ext * scale) / 2;
  const toX = (posFt: number) => px0 + (mirror ? ext - posFt : posFt) * scale;
  const toY = (heightFt: number) => groundY - heightFt * scale;
  const wallOpenings = clampedOpenings.filter((op) => op.side === wall);
  // Back/Front sit in the wide center column (1.6fr); shrink their label font so the
  // rendered pixel size matches the side-column (Left/Right) elevations.
  const lp = wall === "back" || wall === "front" ? 9 : 15;

  let roofPoly: string;
  if (state.roofStyle === "lean-to") {
    roofPoly = isGableEnd
      ? `${toX(0)},${toY(E)} ${toX(ext)},${toY(E)} ${toX(ext)},${toY(E + rise)}`
      : `${toX(0)},${toY(E)} ${toX(ext)},${toY(E)} ${toX(ext)},${toY(E + rise)} ${toX(0)},${toY(E + rise / 2)}`;
  } else if (isGableEnd) {
    roofPoly = `${toX(0)},${toY(E)} ${toX(ext / 2)},${toY(E + rise)} ${toX(ext)},${toY(E)}`;
  } else {
    roofPoly = `${toX(0)},${toY(E)} ${toX(ext)},${toY(E)} ${toX(ext)},${toY(E + rise)} ${toX(0)},${toY(E + rise)}`;
  }
  const ov = 0.8 * scale;

  return (
    <PanelShell title={label} hint={isGableEnd ? `${state.pitch}:12` : `${ext}′`}>
      <svg viewBox={`0 0 ${EVW} ${EVH}`} className="h-auto w-full touch-none select-none" role="img" aria-label={`${label} elevation`}>
        <line x1={px0 - ov} y1={groundY} x2={px0 + ext * scale + ov} y2={groundY} stroke={INK_DIM} strokeWidth={1} />
        <polygon points={roofPoly} fill={roofHex} stroke={darken(roofHex, 0.15)} strokeWidth={0.8} strokeLinejoin="round" />
        <line x1={px0 - ov} y1={toY(E)} x2={px0 + ext * scale + ov} y2={toY(E)} stroke={darken(roofHex, 0.2)} strokeWidth={1} />
        {!isGableEnd && state.roofStyle === "gable" && <line x1={toX(0)} y1={toY(E + rise)} x2={toX(ext)} y2={toY(E + rise)} stroke={darken(roofHex, 0.25)} strokeWidth={1} />}
        <rect x={toX(mirror ? ext : 0)} y={toY(E)} width={ext * scale} height={E * scale} fill={wallHex} stroke={darken(wallHex, 0.15)} strokeWidth={1} />

        {wallOpenings.map((op) => {
          const isWindow = op.type === "window";
          const h = isWindow ? op.height : Math.min(op.height, E - 0.3);
          const baseFt = isWindow ? Math.min(WINDOW_SILL, Math.max(0, E - op.height - 0.5)) : 0;
          const x = toX(mirror ? op.position + op.width : op.position);
          const y = toY(baseFt + h);
          const w = op.width * scale, hpx = h * scale;
          const dragging = draggingId === op.id;
          const fill = isWindow ? WINDOW_FILL : trimHex;
          return (
            <g key={op.id}>
              <rect x={x} y={y} width={w} height={hpx} fill={fill} stroke={dragging ? T.cyan : darken(isWindow ? "#5C8BA8" : trimHex, 0.2)} strokeWidth={dragging ? 1.8 : 0.6}
                style={{ cursor: "grab" }} onPointerDown={(e) => beginDrag(e, op, { axis: "x", originPx: px0, pxPerFt: scale, mirror, ext })} />
              {op.type === "garage" && Array.from({ length: 3 }).map((_, i) => { const ly = y + (hpx * (i + 1)) / 4; return <line key={i} x1={x} y1={ly} x2={x + w} y2={ly} stroke={darken(trimHex, 0.2)} strokeWidth={0.5} pointerEvents="none" />; })}
              {isWindow && <><line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + hpx} stroke={darken("#5C8BA8", 0.2)} strokeWidth={0.5} pointerEvents="none" /><line x1={x} y1={y + hpx / 2} x2={x + w} y2={y + hpx / 2} stroke={darken("#5C8BA8", 0.2)} strokeWidth={0.5} pointerEvents="none" /></>}
            </g>
          );
        })}

        <g stroke={INK_DIM} strokeWidth={0.6}>
          <line x1={px0 - 12} y1={groundY} x2={px0 - 12} y2={toY(E)} />
          <line x1={px0 - 15} y1={groundY} x2={px0 - 9} y2={groundY} />
          <line x1={px0 - 15} y1={toY(E)} x2={px0 - 9} y2={toY(E)} />
        </g>
        <text x={px0 - 16} y={(groundY + toY(E)) / 2} fontSize={lp} fill={INK} textAnchor="end" dominantBaseline="middle" transform={`rotate(-90 ${px0 - 16} ${(groundY + toY(E)) / 2})`}>{E}′</text>
        <text x={px0 + (ext * scale) / 2} y={groundY + 16} fontSize={lp} fill={INK_DIM} textAnchor="middle">{ext}′</text>
      </svg>
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Iso panel
// ---------------------------------------------------------------------------

function IsoPanel({ state, roofHex, wallHex, trimHex, clampedOpenings }: { state: State; roofHex: string; wallHex: string; trimHex: string; clampedOpenings: Opening[] }) {
  return (
    <PanelShell title="3D preview">
      <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="Isometric preview"
        dangerouslySetInnerHTML={{ __html: renderIso({ state, clampedOpenings, roofHex, wallHex, trimHex, vbW: 320, vbH: 200 }) }} />
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Framing connection schematic (open web truss vs residential flush column)
// ---------------------------------------------------------------------------

function FramingSchematic({ trussType }: { trussType: TrussType }) {
  return (
    <PanelShell title="Framing connection">
      <svg viewBox="0 0 320 210" className="h-auto w-full" role="img" aria-label={`${TRUSS_LABEL[trussType]} column connecting to a top truss`}
        dangerouslySetInnerHTML={{ __html: renderFraming(trussType) }} />
      <p className="px-1 pb-0.5 text-center text-[15px] font-semibold" style={{ color: T.accent }}>{TRUSS_LABEL[trussType]}</p>
    </PanelShell>
  );
}

function renderFraming(trussType: TrussType): string {
  const groundY = 184;
  const member = T.accent, web = "#6f93ba", joint = T.cyan, ink = INK, dim = INK_DIM;
  const L = (x1: number, y1: number, x2: number, y2: number, st: string, w: number) =>
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${st}" stroke-width="${w}"/>`;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  // W-pattern lattice between chord A (a0->a1) and chord B (b0->b1)
  const zig = (ax0: number, ay0: number, ax1: number, ay1: number, bx0: number, by0: number, bx1: number, by1: number, n: number) => {
    let out = "";
    for (let i = 0; i < n; i++) {
      const t0 = i / n, tm = (i + 0.5) / n, t1 = (i + 1) / n;
      out += L(lerp(ax0, ax1, t0), lerp(ay0, ay1, t0), lerp(bx0, bx1, tm), lerp(by0, by1, tm), web, 1.2);
      out += L(lerp(bx0, bx1, tm), lerp(by0, by1, tm), lerp(ax0, ax1, t1), lerp(ay0, ay1, t1), web, 1.2);
    }
    return out;
  };
  let s = "";

  // ground + hatch
  s += L(24, groundY, 306, groundY, dim, 1.3);
  for (let x = 30; x <= 306; x += 15) s += L(x, groundY, x - 6, groundY + 7, dim, 0.8);

  if (trussType === "open-web") {
    // Tapered open-web column: outer chord vertical, inner chord angles out going up
    // (narrow at the base, widens toward the eave), then mates the roof truss at the knee angle.
    const oX = 72, eaveY = 70;            // outer (wall-side) chord, vertical
    const inB = 82, inTx = 110, inTy = 82; // inner chord: base 10 wide -> top ~38 wide
    s += L(oX, groundY, oX, eaveY, member, 2.6);       // outer chord (vertical)
    s += L(inB, groundY, inTx, inTy, member, 2.6);     // inner chord (taper)
    s += zig(oX, groundY, oX, eaveY, inB, groundY, inTx, inTy, 5); // column lattice
    // Roof truss continuing from the column top, sloping up to the ridge
    const rtX = 306, rtY = 30, rbX = 300, rbY = 50;
    s += L(oX, eaveY, rtX, rtY, member, 2.6);          // top chord (roofline)
    s += L(inTx, inTy, rbX, rbY, member, 2.6);         // bottom chord
    s += zig(oX, eaveY, rtX, rtY, inTx, inTy, rbX, rbY, 6); // truss lattice
    // base plate + knee gusset
    s += L(oX - 8, groundY, inB + 6, groundY, member, 3.8);
    const kx = (oX + inTx) / 2, ky = (eaveY + inTy) / 2;
    s += `<circle cx="${kx}" cy="${ky}" r="5.5" fill="${joint}"/>`;
    s += `<circle cx="${kx}" cy="${ky}" r="9" fill="none" stroke="${joint}" stroke-width="1" opacity="0.5"/>`;
    s += `<text x="${kx + 12}" y="${ky - 8}" font-size="15" fill="${joint}" text-anchor="start" font-family="monospace">knee</text>`;
    s += `<text x="210" y="22" font-size="15" fill="${ink}" text-anchor="middle">Roof truss</text>`;
    s += `<text x="96" y="${groundY + 24}" font-size="15" fill="${dim}" text-anchor="middle">Tapered column</text>`;
  } else {
    // Residential flush column: slim uniform solid post (narrow), separate roof truss on top.
    const cL = 74, cR = 90, eaveY = 80;   // column width 16 (uniform)
    s += `<rect x="${cL}" y="${eaveY}" width="${cR - cL}" height="${groundY - eaveY}" fill="#384154" stroke="${member}" stroke-width="2"/>`;
    s += L((cL + cR) / 2, eaveY, (cL + cR) / 2, groundY, web, 0.9); // I-beam web hint
    // Roof truss seated directly on the column top (deeper than the column is wide)
    const eX = cL + 3, topY = eaveY - 18, rtX = 306, rtY = 42, rbX = 300, rbY = 58;
    s += L(eX, topY, rtX, rtY, member, 2.6);    // top chord
    s += L(eX, eaveY, rbX, rbY, member, 2.6);   // bottom chord (lands on the column top)
    s += L(eX, topY, eX, eaveY, member, 2.2);   // eave-end web ties the truss to the column
    s += zig(eX, topY, rtX, rtY, eX, eaveY, rbX, rbY, 6);
    // base plate + connection
    s += L(cL - 8, groundY, cR + 8, groundY, member, 3.8);
    const cx = (cL + cR) / 2;
    s += `<circle cx="${cx}" cy="${eaveY}" r="5" fill="${joint}"/>`;
    s += `<text x="${cx + 12}" y="${eaveY - 10}" font-size="15" fill="${joint}" text-anchor="start" font-family="monospace">connection</text>`;
    s += `<text x="210" y="22" font-size="15" fill="${ink}" text-anchor="middle">Roof truss</text>`;
    s += `<text x="${cx}" y="${groundY + 24}" font-size="15" fill="${dim}" text-anchor="middle">Flush column</text>`;
  }
  return s;
}

// ---------------------------------------------------------------------------
// Iso renderer
// ---------------------------------------------------------------------------

interface IsoArgs { state: State; clampedOpenings: Opening[]; roofHex: string; wallHex: string; trimHex: string; vbW: number; vbH: number; }

function renderIso({ state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH }: IsoArgs): string {
  const W = state.width, L = state.length, E = state.eave;
  const rise = ridgeRise(W, state.pitch, state.roofStyle);
  const peakX = state.roofStyle === "lean-to" ? W : W / 2;
  const isoRaw = (x: number, y: number, z: number): [number, number] => [(z - x) * 0.866, (x + z) * 0.5 - y];
  const cs: Array<[number, number]> = [
    isoRaw(0, 0, 0), isoRaw(W, 0, 0), isoRaw(0, 0, L), isoRaw(W, 0, L),
    isoRaw(0, E, 0), isoRaw(W, E, 0), isoRaw(0, E, L), isoRaw(W, E, L),
    isoRaw(peakX, E + rise, 0), isoRaw(peakX, E + rise, L),
  ];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  cs.forEach(([x, y]) => { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; });
  const pad = 22;
  const scale = Math.min((vbW - pad * 2) / (maxX - minX), (vbH - pad * 2) / (maxY - minY));
  const offX = (vbW - (maxX - minX) * scale) / 2 - minX * scale;
  const offY = (vbH - (maxY - minY) * scale) / 2 - minY * scale;
  const iso = (x: number, y: number, z: number): [number, number] => { const [rx, ry] = isoRaw(x, y, z); return [rx * scale + offX, ry * scale + offY]; };
  const pts = (a: Array<[number, number]>) => a.map((p) => p.join(",")).join(" ");
  let s = "";

  s += `<polygon points="${pts([iso(0, 0, 0), iso(W, 0, 0), iso(W, 0, L), iso(0, 0, L)])}" fill="rgba(0,0,0,0.25)"/>`;
  s += `<polygon points="${pts([iso(0, 0, 0), iso(0, 0, L), iso(0, E, L), iso(0, E, 0)])}" fill="${lighten(wallHex, 0.04)}" stroke="${darken(wallHex, 0.12)}" stroke-width="0.8"/>`;
  s += `<polygon points="${pts([iso(0, 0, 0), iso(W, 0, 0), iso(W, E, 0), iso(0, E, 0)])}" fill="${wallHex}" stroke="${darken(wallHex, 0.12)}" stroke-width="0.8"/>`;
  if (state.roofStyle === "lean-to") s += `<polygon points="${pts([iso(0, E, 0), iso(W, E, 0), iso(W, E + rise, 0)])}" fill="${darken(wallHex, 0.04)}" stroke="${darken(wallHex, 0.12)}" stroke-width="0.8"/>`;
  else s += `<polygon points="${pts([iso(0, E, 0), iso(W, E, 0), iso(W / 2, E + rise, 0)])}" fill="${darken(wallHex, 0.04)}" stroke="${darken(wallHex, 0.12)}" stroke-width="0.8"/>`;

  if (state.roofStyle === "lean-to") {
    s += `<polygon points="${pts([iso(0, E, 0), iso(0, E, L), iso(W, E + rise, L), iso(W, E + rise, 0)])}" fill="${roofHex}" stroke="${darken(roofHex, 0.15)}" stroke-width="0.8"/>`;
  } else {
    s += `<polygon points="${pts([iso(0, E, 0), iso(0, E, L), iso(W / 2, E + rise, L), iso(W / 2, E + rise, 0)])}" fill="${roofHex}" stroke="${darken(roofHex, 0.12)}" stroke-width="0.8"/>`;
    s += `<polygon points="${pts([iso(W / 2, E + rise, 0), iso(W / 2, E + rise, L), iso(W, E, L), iso(W, E, 0)])}" fill="${darken(roofHex, 0.16)}" stroke="${darken(roofHex, 0.18)}" stroke-width="0.8"/>`;
  }

  clampedOpenings.forEach((op) => {
    if (op.side !== "front" && op.side !== "left") return;
    const w = op.width, isWindow = op.type === "window";
    const base = isWindow ? Math.min(WINDOW_SILL, Math.max(0, E - op.height - 0.5)) : 0;
    const h = isWindow ? op.height : Math.min(op.height, E - 0.3);
    const fill = isWindow ? WINDOW_FILL : trimHex;
    let poly: Array<[number, number]> = [];
    if (op.side === "front") { const p = Math.min(op.position, L - w); poly = [iso(0, base, p), iso(0, base, p + w), iso(0, base + h, p + w), iso(0, base + h, p)]; }
    else { const p = Math.min(op.position, W - w); poly = [iso(p, base, 0), iso(p + w, base, 0), iso(p + w, base + h, 0), iso(p, base + h, 0)]; }
    s += `<polygon points="${pts(poly)}" fill="${fill}" stroke="${darken(isWindow ? "#5C8BA8" : trimHex, 0.2)}" stroke-width="0.6"/>`;
    if (op.type === "garage") for (let i = 1; i < 4; i++) {
      const hy = base + (h * i) / 4; let a: [number, number], b: [number, number];
      if (op.side === "front") { const p = Math.min(op.position, L - w); a = iso(0, hy, p); b = iso(0, hy, p + w); } else { const p = Math.min(op.position, W - w); a = iso(p, hy, 0); b = iso(p + w, hy, 0); }
      s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${darken(trimHex, 0.2)}" stroke-width="0.4"/>`;
    }
  });

  // Mirror horizontally so the front (door) side reads on the opposite side.
  return `<g transform="translate(${vbW} 0) scale(-1 1)">${s}</g>`;
}
