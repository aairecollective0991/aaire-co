"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RoofStyle = "gable" | "lean-to";
type Side = "front" | "back" | "left" | "right";
type PorchSide = "none" | Side;
type OpeningType = "garage" | "walk" | "window";
type ViewMode = "iso" | "front" | "side" | "plan";

interface Opening {
  id: number;
  type: OpeningType;
  side: Side;
  position: number; // feet from front (for left/right) or from left (for front/back)
  width: number;
  height: number;
}

interface BuildingSpec {
  dimensions: { width: number; length: number; eaveHeight: number };
  roof: { style: RoofStyle; pitch: number };
  colors: { roof: string; walls: string; trim: string };
  porch: { side: Side; depth: number; pitch: number } | null;
  openings: Array<{
    type: OpeningType;
    side: Side;
    position: number;
    width: number;
    height: number;
  }>;
}

interface BuildingConfiguratorProps {
  /** Called when user clicks "Request quote". Receives the full spec payload. */
  onQuoteRequest?: (spec: BuildingSpec) => void;
  /** Initial state overrides (optional) */
  initialState?: Partial<State>;
}

interface State {
  width: number;
  length: number;
  eave: number;
  roofStyle: RoofStyle;
  pitch: number;
  roofColorIdx: number;
  wallColorIdx: number;
  trimColorIdx: number;
  porchSide: PorchSide;
  porchDepth: number;
  porchPitch: number;
  openings: Opening[];
  view: ViewMode;
  nextId: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Worldwide Steel's 18-color palette. Approximate hex values for preview.
// Verify against actual color chips before going live.
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
  ["Galvalume", "#B8B8B2"],
];

const OPENING_DEFAULTS: Record<OpeningType, { width: number; height: number }> = {
  garage: { width: 12, height: 12 },
  walk: { width: 3, height: 7 },
  window: { width: 3, height: 3 },
};

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

function lighten(hex: string, pct: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const nr = Math.min(255, Math.round(r + (255 - r) * pct));
  const ng = Math.min(255, Math.round(g + (255 - g) * pct));
  const nb = Math.min(255, Math.round(b + (255 - b) * pct));
  return `rgb(${nr},${ng},${nb})`;
}

function darken(hex: string, pct: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - pct))},${Math.round(g * (1 - pct))},${Math.round(b * (1 - pct))})`;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BuildingConfigurator({
  onQuoteRequest,
  initialState,
}: BuildingConfiguratorProps) {
  const [state, setState] = useState<State>({
    width: 40,
    length: 60,
    eave: 14,
    roofStyle: "gable",
    pitch: 4,
    roofColorIdx: 12, // Burnished Slate
    wallColorIdx: 6, // Polar White
    trimColorIdx: 6,
    porchSide: "none",
    porchDepth: 10,
    porchPitch: 2,
    openings: [
      { id: 1, type: "garage", side: "front", position: 20, width: 12, height: 12 },
      { id: 2, type: "walk", side: "right", position: 10, width: 3, height: 7 },
      { id: 3, type: "window", side: "left", position: 15, width: 3, height: 3 },
      { id: 4, type: "window", side: "left", position: 45, width: 3, height: 3 },
    ],
    view: "iso",
    nextId: 5,
    ...initialState,
  });

  const sideMaxPosition = useCallback(
    (side: Side) => (side === "front" || side === "back" ? state.width : state.length),
    [state.width, state.length]
  );

  const clampedOpenings = useMemo(
    () =>
      state.openings.map((op) => {
        const max = (op.side === "front" || op.side === "back" ? state.width : state.length) - op.width;
        return { ...op, position: Math.max(0, Math.min(op.position, Math.max(0, max))) };
      }),
    [state.openings, state.width, state.length]
  );

  const roofHex = COLORS[state.roofColorIdx][1];
  const wallHex = COLORS[state.wallColorIdx][1];
  const trimHex = COLORS[state.trimColorIdx][1];

  // -------------------------------------------------------------------------
  // SVG rendering
  // -------------------------------------------------------------------------

  const svgContent = useMemo(() => {
    const W = state.width;
    const L = state.length;
    const E = state.eave;
    const pitch = state.pitch;
    const ridgeRise = (W / 2) * (pitch / 12);
    const vbW = 600;
    const vbH = 460;

    if (state.view === "iso") {
      return renderIso({ W, L, E, pitch, ridgeRise, state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH });
    }
    if (state.view === "front") {
      return renderFront({ W, L, E, pitch, ridgeRise, state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH });
    }
    if (state.view === "side") {
      return renderSide({ W, L, E, state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH });
    }
    return renderPlan({ W, L, state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH });
  }, [state, clampedOpenings, roofHex, wallHex, trimHex]);

  const viewHint = useMemo(() => {
    switch (state.view) {
      case "iso":
        return "Isometric preview · not to scale";
      case "front":
        return "Front endwall · shows front-facing openings only";
      case "side":
        return "Right sidewall · shows right-side openings only";
      case "plan":
        return "Top-down plan · all openings visible";
    }
  }, [state.view]);

  const specReadout = useMemo(() => {
    const roofLabel = `${state.pitch}:12 ${state.roofStyle}`;
    const porchLabel = state.porchSide === "none" ? "" : ` · ${state.porchDepth}′ porch ${state.porchSide}`;
    return `${state.width}′ W × ${state.length}′ L × ${state.eave}′ H · ${roofLabel}${porchLabel}`;
  }, [state]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const updateOpening = (id: number, field: "side" | "position", value: string | number) => {
    setState((s) => ({
      ...s,
      openings: s.openings.map((op) => {
        if (op.id !== id) return op;
        if (field === "side") return { ...op, side: value as Side };
        return { ...op, position: Math.max(0, Number(value) || 0) };
      }),
    }));
  };

  const removeOpening = (id: number) => {
    setState((s) => ({ ...s, openings: s.openings.filter((o) => o.id !== id) }));
  };

  const addOpening = (type: OpeningType) => {
    const side: Side = type === "garage" ? "front" : type === "walk" ? "right" : "left";
    const d = OPENING_DEFAULTS[type];
    setState((s) => ({
      ...s,
      openings: [...s.openings, { id: s.nextId, type, side, position: 5, width: d.width, height: d.height }],
      nextId: s.nextId + 1,
    }));
  };

  const handleQuote = () => {
    const spec: BuildingSpec = {
      dimensions: { width: state.width, length: state.length, eaveHeight: state.eave },
      roof: { style: state.roofStyle, pitch: state.pitch },
      colors: {
        roof: COLORS[state.roofColorIdx][0],
        walls: COLORS[state.wallColorIdx][0],
        trim: COLORS[state.trimColorIdx][0],
      },
      porch:
        state.porchSide === "none"
          ? null
          : { side: state.porchSide as Side, depth: state.porchDepth, pitch: state.porchPitch },
      openings: clampedOpenings.map((o) => ({
        type: o.type,
        side: o.side,
        position: o.position,
        width: o.width,
        height: o.height,
      })),
    };
    onQuoteRequest?.(spec);
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
      {/* Preview pane */}
      <div className="relative flex min-h-[520px] flex-col rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900 lg:sticky lg:top-4">
        {/* Logo watermark — light logo on dark mode, dark logo on light mode */}
        <div className="pointer-events-none absolute bottom-4 right-4 opacity-20 dark:opacity-30">
          <Image
            src="/images/logos/aaire-logo-black.png"
            alt=""
            width={56}
            height={56}
            className="block dark:hidden"
            priority={false}
          />
          <Image
            src="/images/logos/aaire-logo-white.jpg"
            alt=""
            width={56}
            height={56}
            className="hidden dark:block"
            priority={false}
          />
        </div>

        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-xs tabular-nums text-neutral-600 dark:text-neutral-400">
            {specReadout}
          </span>
          <div className="flex flex-shrink-0 gap-1">
            {(["iso", "front", "side", "plan"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setState((s) => ({ ...s, view: v }))}
                className={`rounded-md px-2.5 py-1 text-xs capitalize transition-colors ${
                  state.view === v
                    ? "border border-neutral-400 bg-white dark:border-neutral-500 dark:bg-neutral-800"
                    : "border border-neutral-300 bg-transparent hover:bg-white/50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <svg
            viewBox="0 0 600 460"
            className="h-auto max-h-[480px] w-full"
            role="img"
            aria-label="Building preview"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        <p className="mt-1 text-center text-[11px] text-neutral-500 dark:text-neutral-500">{viewHint}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* Dimensions */}
        <section>
          <p className="mb-2.5 text-sm font-medium">Dimensions</p>
          <SliderRow
            label="Width"
            min={12}
            max={80}
            step={1}
            value={state.width}
            onChange={(v) => setState((s) => ({ ...s, width: v }))}
          />
          <SliderRow
            label="Length"
            min={20}
            max={200}
            step={5}
            value={state.length}
            onChange={(v) => setState((s) => ({ ...s, length: v }))}
          />
          <SliderRow
            label="Eave"
            min={8}
            max={30}
            step={1}
            value={state.eave}
            onChange={(v) => setState((s) => ({ ...s, eave: v }))}
          />
        </section>

        {/* Roof */}
        <section>
          <p className="mb-2.5 text-sm font-medium">Roof</p>
          <div className="mb-2.5 flex gap-1.5">
            {(["gable", "lean-to"] as RoofStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setState((s) => ({ ...s, roofStyle: style }))}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs capitalize transition-colors ${
                  state.roofStyle === style
                    ? "border border-neutral-400 bg-white dark:border-neutral-500 dark:bg-neutral-800"
                    : "border border-neutral-300 bg-transparent hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <label className="w-13 text-[13px] text-neutral-600 dark:text-neutral-400">Pitch</label>
            <select
              value={state.pitch}
              onChange={(e) => setState((s) => ({ ...s, pitch: parseFloat(e.target.value) }))}
              className="flex-1 rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-[13px] dark:border-neutral-700 dark:bg-neutral-800"
            >
              <option value={1.5}>1.5:12 (low)</option>
              <option value={2}>2:12</option>
              <option value={3}>3:12</option>
              <option value={4}>4:12 (standard)</option>
              <option value={6}>6:12 (steep)</option>
            </select>
          </div>
        </section>

        {/* Colors */}
        <section>
          <p className="mb-2.5 text-sm font-medium">Colors</p>
          <ColorRow
            label="Roof"
            selectedIdx={state.roofColorIdx}
            onChange={(i) => setState((s) => ({ ...s, roofColorIdx: i }))}
          />
          <ColorRow
            label="Walls"
            selectedIdx={state.wallColorIdx}
            onChange={(i) => setState((s) => ({ ...s, wallColorIdx: i }))}
          />
          <ColorRow
            label="Trim"
            selectedIdx={state.trimColorIdx}
            onChange={(i) => setState((s) => ({ ...s, trimColorIdx: i }))}
            isLast
          />
        </section>

        {/* Porch */}
        <section>
          <p className="mb-2.5 text-sm font-medium">Porch / lean-to extension</p>
          <div className="mb-2.5 flex flex-wrap gap-1">
            {(["none", "front", "back", "left", "right"] as PorchSide[]).map((side) => (
              <button
                key={side}
                onClick={() => setState((s) => ({ ...s, porchSide: side }))}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs capitalize transition-colors ${
                  state.porchSide === side
                    ? "border border-neutral-400 bg-white dark:border-neutral-500 dark:bg-neutral-800"
                    : "border border-neutral-300 bg-transparent hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
                }`}
              >
                {side}
              </button>
            ))}
          </div>
          {state.porchSide !== "none" && (
            <>
              <SliderRow
                label="Depth"
                min={6}
                max={20}
                step={1}
                value={state.porchDepth}
                onChange={(v) => setState((s) => ({ ...s, porchDepth: v }))}
              />
              <div className="flex items-center gap-2.5">
                <label className="w-13 text-[13px] text-neutral-600 dark:text-neutral-400">Pitch</label>
                <select
                  value={state.porchPitch}
                  onChange={(e) => setState((s) => ({ ...s, porchPitch: parseFloat(e.target.value) }))}
                  className="flex-1 rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-[13px] dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <option value={1}>1:12</option>
                  <option value={2}>2:12</option>
                  <option value={3}>3:12</option>
                </select>
              </div>
            </>
          )}
        </section>

        {/* Openings */}
        <section>
          <div className="mb-2.5 flex items-baseline justify-between">
            <p className="text-sm font-medium">Openings</p>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-500">Plan view shows positions</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {clampedOpenings.length === 0 ? (
              <p className="my-1 text-xs italic text-neutral-500 dark:text-neutral-500">
                No openings yet — add doors and windows below.
              </p>
            ) : (
              clampedOpenings.map((op) => (
                <div
                  key={op.id}
                  className="grid grid-cols-[72px_1fr_1fr_28px] items-center gap-1.5 rounded-md bg-neutral-100 p-2 dark:bg-neutral-900"
                >
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">
                    {op.type === "garage" ? `Garage ${op.width}×${op.height}` : op.type === "walk" ? "Walk door" : "Window"}
                  </span>
                  <select
                    value={op.side}
                    onChange={(e) => updateOpening(op.id, "side", e.target.value)}
                    className="w-full rounded-md border border-neutral-300 bg-white px-1.5 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <option value="front">Front</option>
                    <option value="back">Back</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                  <input
                    type="number"
                    min={0}
                    max={sideMaxPosition(op.side)}
                    step={1}
                    value={op.position}
                    onChange={(e) => updateOpening(op.id, "position", e.target.value)}
                    title="Feet from left/front corner"
                    className="w-full rounded-md border border-neutral-300 bg-white px-1.5 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-800"
                  />
                  <button
                    onClick={() => removeOpening(op.id)}
                    className="h-[26px] w-[26px] rounded-md border border-neutral-300 bg-transparent text-sm leading-none text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {(["garage", "walk", "window"] as OpeningType[]).map((type) => (
              <button
                key={type}
                onClick={() => addOpening(type)}
                className="flex-1 rounded-md border border-neutral-300 bg-transparent px-2 py-1.5 text-xs hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
              >
                + {type === "garage" ? "Garage door" : type === "walk" ? "Walk door" : "Window"}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={handleQuote}
          className="mt-1 rounded-md border border-neutral-400 bg-white p-2.5 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          Request quote for this spec →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SliderRow({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2.5">
      <label className="w-13 text-[13px] text-neutral-600 dark:text-neutral-400">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="flex-1"
      />
      <span className="min-w-[42px] text-right text-[13px] font-medium tabular-nums">{value}&prime;</span>
    </div>
  );
}

function ColorRow({
  label,
  selectedIdx,
  onChange,
  isLast = false,
}: {
  label: string;
  selectedIdx: number;
  onChange: (i: number) => void;
  isLast?: boolean;
}) {
  return (
    <div className={isLast ? "" : "mb-2.5"}>
      <p className="mb-1.5 text-xs text-neutral-600 dark:text-neutral-400">{label}</p>
      <div className="flex flex-wrap gap-1">
        {COLORS.map((col, i) => {
          const selected = selectedIdx === i;
          return (
            <button
              key={i}
              title={col[0]}
              onClick={() => onChange(i)}
              className="h-[22px] w-[22px] rounded-full p-0 transition-transform"
              style={{
                background: col[1],
                border: selected
                  ? "2px solid currentColor"
                  : "1px solid rgba(128,128,128,0.3)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SVG view renderers — pure functions, return SVG markup strings
// ---------------------------------------------------------------------------

interface IsoRenderArgs {
  W: number;
  L: number;
  E: number;
  pitch: number;
  ridgeRise: number;
  state: State;
  clampedOpenings: Opening[];
  roofHex: string;
  wallHex: string;
  trimHex: string;
  vbW: number;
  vbH: number;
}

function renderIso({
  W,
  L,
  E,
  pitch,
  ridgeRise,
  state,
  clampedOpenings,
  roofHex,
  wallHex,
  trimHex,
  vbW,
  vbH,
}: IsoRenderArgs): string {
  const isoRaw = (x: number, y: number, z: number): [number, number] => [(x - z) * 0.866, (x + z) * 0.5 - y];

  const peakY = state.roofStyle === "lean-to" ? E + (W * pitch) / 12 : E + ridgeRise;
  const corners: Array<[number, number]> = [
    isoRaw(0, 0, 0), isoRaw(W, 0, 0), isoRaw(0, 0, L), isoRaw(W, 0, L),
    isoRaw(0, E, 0), isoRaw(W, E, 0), isoRaw(0, E, L), isoRaw(W, E, L),
  ];
  if (state.roofStyle === "lean-to") {
    corners.push(isoRaw(0, peakY, 0), isoRaw(0, peakY, L));
  } else {
    corners.push(isoRaw(W / 2, peakY, 0), isoRaw(W / 2, peakY, L));
  }

  if (state.porchSide !== "none") {
    const pd = state.porchDepth;
    if (state.porchSide === "front") {
      corners.push(isoRaw(-pd, 0, 0), isoRaw(-pd, 0, L), isoRaw(-pd, E - 2, 0), isoRaw(-pd, E - 2, L));
    } else if (state.porchSide === "back") {
      corners.push(isoRaw(W + pd, 0, 0), isoRaw(W + pd, 0, L), isoRaw(W + pd, E - 2, 0), isoRaw(W + pd, E - 2, L));
    } else if (state.porchSide === "left") {
      corners.push(isoRaw(0, 0, -pd), isoRaw(W, 0, -pd), isoRaw(0, E - 2, -pd), isoRaw(W, E - 2, -pd));
    } else if (state.porchSide === "right") {
      corners.push(isoRaw(0, 0, L + pd), isoRaw(W, 0, L + pd), isoRaw(0, E - 2, L + pd), isoRaw(W, E - 2, L + pd));
    }
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  corners.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  const spanX = maxX - minX;
  const spanY = maxY - minY;
  const padding = 40;
  const scale = Math.min((vbW - padding * 2) / spanX, (vbH - padding * 2) / spanY);
  const offX = (vbW - spanX * scale) / 2 - minX * scale;
  const offY = (vbH - spanY * scale) / 2 - minY * scale;
  const iso = (x: number, y: number, z: number): [number, number] => {
    const [rx, ry] = isoRaw(x, y, z);
    return [rx * scale + offX, ry * scale + offY];
  };

  let content = "";

  // Porch roof (drawn first so building occludes its back edge)
  if (state.porchSide !== "none") {
    const pd = state.porchDepth;
    const pe = 2; // eave drop
    let pr: [number, number][] = [];
    let posts: Array<[[number, number], [number, number]]> = [];
    if (state.porchSide === "front") {
      pr = [iso(-pd, E - pe, 0), iso(-pd, E - pe, L), iso(0, E, L), iso(0, E, 0)];
      posts = [[iso(-pd, 0, 0), iso(-pd, E - pe, 0)], [iso(-pd, 0, L), iso(-pd, E - pe, L)]];
    } else if (state.porchSide === "back") {
      pr = [iso(W, E, 0), iso(W, E, L), iso(W + pd, E - pe, L), iso(W + pd, E - pe, 0)];
      posts = [[iso(W + pd, 0, 0), iso(W + pd, E - pe, 0)], [iso(W + pd, 0, L), iso(W + pd, E - pe, L)]];
    } else if (state.porchSide === "left") {
      pr = [iso(0, E, 0), iso(0, E - pe, -pd), iso(W, E - pe, -pd), iso(W, E, 0)];
      posts = [[iso(0, 0, -pd), iso(0, E - pe, -pd)], [iso(W, 0, -pd), iso(W, E - pe, -pd)]];
    } else if (state.porchSide === "right") {
      pr = [iso(0, E, L), iso(0, E - pe, L + pd), iso(W, E - pe, L + pd), iso(W, E, L)];
      posts = [[iso(0, 0, L + pd), iso(0, E - pe, L + pd)], [iso(W, 0, L + pd), iso(W, E - pe, L + pd)]];
    }
    content += `<polygon points="${pr.map((p) => p.join(",")).join(" ")}" fill="${roofHex}" stroke="${darken(roofHex, 0.25)}" stroke-width="0.8"/>`;
    posts.forEach(([a, b]) => {
      content += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${trimHex}" stroke-width="2"/>`;
    });
  }

  // Walls
  const blb = iso(0, 0, L), brb = iso(W, 0, L), brt = iso(W, E, L), blt = iso(0, E, L);
  const backPeak = state.roofStyle === "lean-to" ? iso(0, E + (W * pitch) / 12, L) : iso(W / 2, E + ridgeRise, L);
  const frontPeak = state.roofStyle === "lean-to" ? iso(0, E + (W * pitch) / 12, 0) : iso(W / 2, E + ridgeRise, 0);

  const backGable = state.roofStyle === "lean-to" ? [blb, brb, brt, backPeak] : [blb, brb, brt, backPeak, blt];
  content += `<polygon points="${backGable.map((p) => p.join(",")).join(" ")}" fill="${darken(wallHex, 0.18)}" stroke="${darken(wallHex, 0.3)}" stroke-width="0.8"/>`;

  const frb = iso(W, 0, 0);
  content += `<polygon points="${[frb, brb, brt, iso(W, E, 0)].map((p) => p.join(",")).join(" ")}" fill="${darken(wallHex, 0.1)}" stroke="${darken(wallHex, 0.28)}" stroke-width="0.8"/>`;

  const flb = iso(0, 0, 0);
  const frb3 = iso(W, 0, 0);
  const frt2 = iso(W, E, 0);
  const flt = iso(0, E, 0);
  const frontGable = [flb, frb3, frt2, frontPeak, flt];
  content += `<polygon points="${frontGable.map((p) => p.join(",")).join(" ")}" fill="${wallHex}" stroke="${darken(wallHex, 0.28)}" stroke-width="0.8"/>`;

  content += `<polygon points="${[flb, iso(0, 0, L), iso(0, E, L), flt].map((p) => p.join(",")).join(" ")}" fill="${lighten(wallHex, 0.08)}" stroke="${darken(wallHex, 0.25)}" stroke-width="0.8"/>`;

  // Roof
  if (state.roofStyle === "lean-to") {
    const roofSlope = [frt2, brt, iso(0, E + (W * pitch) / 12, L), iso(0, E + (W * pitch) / 12, 0)];
    content += `<polygon points="${roofSlope.map((p) => p.join(",")).join(" ")}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
  } else {
    const roofRight = [frt2, brt, backPeak, frontPeak];
    content += `<polygon points="${roofRight.map((p) => p.join(",")).join(" ")}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
    const roofLeft = [iso(0, E, 0), frontPeak, backPeak, iso(0, E, L)];
    content += `<polygon points="${roofLeft.map((p) => p.join(",")).join(" ")}" fill="${darken(roofHex, 0.18)}" stroke="${darken(roofHex, 0.28)}" stroke-width="0.8"/>`;
  }

  // Openings (skip back-facing in iso)
  clampedOpenings.forEach((op) => {
    if (op.side === "back") return;
    const w = op.width;
    let h = Math.min(op.height, E - 0.5);
    const pos = op.position;
    let pts: [number, number][] | null = null;

    if (op.type === "window") {
      const baseY = E * 0.45;
      h = op.height;
      if (op.side === "front") pts = [iso(pos, baseY, 0), iso(pos + w, baseY, 0), iso(pos + w, baseY + h, 0), iso(pos, baseY + h, 0)];
      else if (op.side === "right") pts = [iso(W, baseY, pos), iso(W, baseY, pos + w), iso(W, baseY + h, pos + w), iso(W, baseY + h, pos)];
      else if (op.side === "left") pts = [iso(0, baseY, pos), iso(0, baseY, pos + w), iso(0, baseY + h, pos + w), iso(0, baseY + h, pos)];
      if (pts) content += `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="#8FB8D4" stroke="${trimHex}" stroke-width="0.8"/>`;
    } else {
      if (op.side === "front") pts = [iso(pos, 0, 0), iso(pos + w, 0, 0), iso(pos + w, h, 0), iso(pos, h, 0)];
      else if (op.side === "right") pts = [iso(W, 0, pos), iso(W, 0, pos + w), iso(W, h, pos + w), iso(W, h, pos)];
      else if (op.side === "left") pts = [iso(0, 0, pos), iso(0, 0, pos + w), iso(0, h, pos + w), iso(0, h, pos)];
      if (!pts) return;
      content += `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${trimHex}" stroke="${darken(trimHex, 0.3)}" stroke-width="0.8"/>`;
      if (op.type === "garage") {
        for (let hh = 1; hh < 5; hh++) {
          const hy = (h * hh) / 5;
          let hp1: [number, number] | null = null;
          let hp2: [number, number] | null = null;
          if (op.side === "front") { hp1 = iso(pos, hy, 0); hp2 = iso(pos + w, hy, 0); }
          else if (op.side === "right") { hp1 = iso(W, hy, pos); hp2 = iso(W, hy, pos + w); }
          else if (op.side === "left") { hp1 = iso(0, hy, pos); hp2 = iso(0, hy, pos + w); }
          if (hp1 && hp2) {
            content += `<line x1="${hp1[0]}" y1="${hp1[1]}" x2="${hp2[0]}" y2="${hp2[1]}" stroke="${darken(trimHex, 0.25)}" stroke-width="0.5"/>`;
          }
        }
      }
    }
  });

  return content;
}

interface FrontRenderArgs extends IsoRenderArgs {}

function renderFront({
  W,
  L,
  E,
  pitch,
  ridgeRise,
  state,
  clampedOpenings,
  roofHex,
  wallHex,
  trimHex,
  vbW,
  vbH,
}: FrontRenderArgs): string {
  const peakH = state.roofStyle === "lean-to" ? E + (W * pitch) / 12 : E + ridgeRise;
  const totalH = peakH + 2;
  let totalW = W;
  let porchOffsetLeft = 0;
  if (state.porchSide === "front") { totalW = W + state.porchDepth; porchOffsetLeft = state.porchDepth; }
  else if (state.porchSide === "back") { totalW = W + state.porchDepth; }

  const padding = 50;
  const scale = Math.min((vbW - padding * 2) / totalW, (vbH - padding * 2) / totalH);
  const baseY = (vbH + totalH * scale) / 2;
  const x0 = (vbW - totalW * scale) / 2 + porchOffsetLeft * scale;
  const eaveY = baseY - E * scale;
  const peakY = baseY - peakH * scale;

  let content = "";

  if (state.porchSide === "front" || state.porchSide === "back") {
    const pd = state.porchDepth;
    const porchPeakH = E + (pd * state.porchPitch) / 12;
    const porchEaveH = E - 2;
    if (state.porchSide === "front") {
      const px = x0 - pd * scale;
      content += `<polygon points="${px},${baseY} ${x0},${baseY} ${x0},${baseY - porchPeakH * scale} ${px},${baseY - porchEaveH * scale}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8" opacity="0.85"/>`;
      content += `<line x1="${px}" y1="${baseY}" x2="${px}" y2="${baseY - porchEaveH * scale}" stroke="${trimHex}" stroke-width="1.5"/>`;
    } else {
      const px2 = x0 + W * scale + pd * scale;
      content += `<polygon points="${px2},${baseY} ${x0 + W * scale},${baseY} ${x0 + W * scale},${baseY - porchPeakH * scale} ${px2},${baseY - porchEaveH * scale}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8" opacity="0.85"/>`;
      content += `<line x1="${px2}" y1="${baseY}" x2="${px2}" y2="${baseY - porchEaveH * scale}" stroke="${trimHex}" stroke-width="1.5"/>`;
    }
  }

  if (state.roofStyle === "lean-to") {
    content += `<polygon points="${x0},${baseY} ${x0},${peakY} ${x0 + W * scale},${eaveY} ${x0 + W * scale},${baseY}" fill="${wallHex}" stroke="${darken(wallHex, 0.22)}" stroke-width="0.8"/>`;
    content += `<polygon points="${x0 - 8},${peakY} ${x0 + W * scale + 8},${eaveY - 4} ${x0 + W * scale + 8},${eaveY} ${x0 - 8},${peakY + 8}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
  } else {
    const peakX = x0 + (W * scale) / 2;
    content += `<polygon points="${x0},${baseY} ${x0},${eaveY} ${peakX},${peakY} ${x0 + W * scale},${eaveY} ${x0 + W * scale},${baseY}" fill="${wallHex}" stroke="${darken(wallHex, 0.22)}" stroke-width="0.8"/>`;
    const rO = 6;
    content += `<polygon points="${x0 - rO},${eaveY + 3} ${peakX},${peakY - 3} ${x0 + W * scale + rO},${eaveY + 3} ${x0 + W * scale + rO - 1},${eaveY + 6} ${peakX},${peakY} ${x0 - rO + 1},${eaveY + 6}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
  }

  clampedOpenings.forEach((op) => {
    if (op.side !== "front") return;
    const dx = x0 + op.position * scale;
    const dw = op.width * scale;
    const dh = op.height * scale;
    if (op.type === "window") {
      const winY = baseY - (E * 0.45 + op.height) * scale;
      content += `<rect x="${dx}" y="${winY}" width="${dw}" height="${dh}" fill="#8FB8D4" stroke="${trimHex}" stroke-width="0.8"/>`;
    } else {
      content += `<rect x="${dx}" y="${baseY - dh}" width="${dw}" height="${dh}" fill="${trimHex}" stroke="${darken(trimHex, 0.3)}" stroke-width="0.8"/>`;
      if (op.type === "garage") {
        for (let h = 1; h < 6; h++) {
          const hy = baseY - (dh * h) / 6;
          content += `<line x1="${dx}" y1="${hy}" x2="${dx + dw}" y2="${hy}" stroke="${darken(trimHex, 0.25)}" stroke-width="0.5"/>`;
        }
      }
    }
  });

  content += `<line x1="${x0 - 30}" y1="${baseY}" x2="${x0 + W * scale + 30}" y2="${baseY}" stroke="rgba(128,128,128,0.5)" stroke-width="0.5" stroke-dasharray="2,2"/>`;

  return content;
}

function renderSide({
  L,
  E,
  state,
  clampedOpenings,
  roofHex,
  wallHex,
  trimHex,
  vbW,
  vbH,
}: Omit<IsoRenderArgs, "W" | "pitch" | "ridgeRise"> & { W?: number }): string {
  let totalL = L;
  let porchOffsetLeft = 0;
  if (state.porchSide === "left") { totalL = L + state.porchDepth; porchOffsetLeft = state.porchDepth; }
  else if (state.porchSide === "right") { totalL = L + state.porchDepth; }

  const totalH = E + 4;
  const padding = 50;
  const scale = Math.min((vbW - padding * 2) / totalL, (vbH - padding * 2) / totalH);
  const baseY = (vbH + totalH * scale) / 2;
  const x0 = (vbW - totalL * scale) / 2 + porchOffsetLeft * scale;
  const eaveY = baseY - E * scale;

  let content = "";

  if (state.porchSide === "left" || state.porchSide === "right") {
    const pd = state.porchDepth;
    const pe = 2;
    if (state.porchSide === "left") {
      const px = x0 - pd * scale;
      content += `<rect x="${px}" y="${baseY - (E - pe) * scale - 3}" width="${pd * scale}" height="3" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
      content += `<line x1="${px}" y1="${baseY}" x2="${px}" y2="${baseY - (E - pe) * scale}" stroke="${trimHex}" stroke-width="1.5"/>`;
    } else {
      const px2 = x0 + L * scale;
      content += `<rect x="${px2}" y="${baseY - (E - pe) * scale - 3}" width="${pd * scale}" height="3" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
      content += `<line x1="${px2 + pd * scale}" y1="${baseY}" x2="${px2 + pd * scale}" y2="${baseY - (E - pe) * scale}" stroke="${trimHex}" stroke-width="1.5"/>`;
    }
  }

  content += `<rect x="${x0}" y="${eaveY}" width="${L * scale}" height="${E * scale}" fill="${wallHex}" stroke="${darken(wallHex, 0.22)}" stroke-width="0.8"/>`;

  const roofThick = 4;
  if (state.roofStyle === "lean-to") {
    content += `<rect x="${x0 - 6}" y="${eaveY - roofThick}" width="${L * scale + 12}" height="${roofThick}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
  } else {
    content += `<rect x="${x0 - 6}" y="${eaveY - roofThick}" width="${L * scale + 12}" height="${roofThick}" fill="${darken(roofHex, 0.1)}" stroke="${darken(roofHex, 0.25)}" stroke-width="0.8"/>`;
    content += `<line x1="${x0 - 6}" y1="${eaveY - roofThick / 2}" x2="${x0 + L * scale + 6}" y2="${eaveY - roofThick / 2}" stroke="${darken(roofHex, 0.3)}" stroke-width="0.3" stroke-dasharray="3,2"/>`;
  }

  clampedOpenings.forEach((op) => {
    if (op.side !== "right") return;
    const dx = x0 + op.position * scale;
    const dw = op.width * scale;
    const dh = op.height * scale;
    if (op.type === "window") {
      const winY = baseY - (E * 0.45 + op.height) * scale;
      content += `<rect x="${dx}" y="${winY}" width="${dw}" height="${dh}" fill="#8FB8D4" stroke="${trimHex}" stroke-width="0.8"/>`;
    } else {
      content += `<rect x="${dx}" y="${baseY - dh}" width="${dw}" height="${dh}" fill="${trimHex}" stroke="${darken(trimHex, 0.3)}" stroke-width="0.8"/>`;
      if (op.type === "garage") {
        for (let h = 1; h < 6; h++) {
          const hy = baseY - (dh * h) / 6;
          content += `<line x1="${dx}" y1="${hy}" x2="${dx + dw}" y2="${hy}" stroke="${darken(trimHex, 0.25)}" stroke-width="0.5"/>`;
        }
      }
    }
  });

  content += `<line x1="${x0 - 30}" y1="${baseY}" x2="${x0 + L * scale + 30}" y2="${baseY}" stroke="rgba(128,128,128,0.5)" stroke-width="0.5" stroke-dasharray="2,2"/>`;

  return content;
}

function renderPlan({
  W,
  L,
  state,
  clampedOpenings,
  roofHex,
  wallHex,
  trimHex,
  vbW,
  vbH,
}: Omit<IsoRenderArgs, "E" | "pitch" | "ridgeRise"> & { E?: number }): string {
  let totalW = W;
  let totalL = L;
  let offW = 0;
  let offL = 0;
  if (state.porchSide === "front") { totalW += state.porchDepth; offW = state.porchDepth; }
  else if (state.porchSide === "back") { totalW += state.porchDepth; }
  else if (state.porchSide === "left") { totalL += state.porchDepth; offL = state.porchDepth; }
  else if (state.porchSide === "right") { totalL += state.porchDepth; }

  const padding = 60;
  const scale = Math.min((vbW - padding * 2) / totalL, (vbH - padding * 2) / totalW);
  const px0 = (vbW - totalL * scale) / 2 + offL * scale;
  const py0 = (vbH - totalW * scale) / 2 + offW * scale;

  let content = "";

  if (state.porchSide !== "none") {
    const pd = state.porchDepth;
    let prx = 0, pry = 0, prw = 0, prh = 0;
    if (state.porchSide === "front") { prx = px0; pry = py0 - pd * scale; prw = L * scale; prh = pd * scale; }
    else if (state.porchSide === "back") { prx = px0; pry = py0 + W * scale; prw = L * scale; prh = pd * scale; }
    else if (state.porchSide === "left") { prx = px0 - pd * scale; pry = py0; prw = pd * scale; prh = W * scale; }
    else if (state.porchSide === "right") { prx = px0 + L * scale; pry = py0; prw = pd * scale; prh = W * scale; }
    content += `<rect x="${prx}" y="${pry}" width="${prw}" height="${prh}" fill="${lighten(roofHex, 0.5)}" stroke="${darken(roofHex, 0.2)}" stroke-width="0.8" stroke-dasharray="4,3" opacity="0.6"/>`;
    content += `<text x="${prx + prw / 2}" y="${pry + prh / 2}" font-size="10" fill="rgba(128,128,128,0.8)" text-anchor="middle" dominant-baseline="middle" font-family="inherit">porch</text>`;
  }

  content += `<rect x="${px0}" y="${py0}" width="${L * scale}" height="${W * scale}" fill="${lighten(wallHex, 0.15)}" stroke="${darken(wallHex, 0.3)}" stroke-width="1"/>`;

  if (state.roofStyle === "gable") {
    content += `<line x1="${px0}" y1="${py0 + (W * scale) / 2}" x2="${px0 + L * scale}" y2="${py0 + (W * scale) / 2}" stroke="${darken(wallHex, 0.3)}" stroke-width="0.5" stroke-dasharray="4,3"/>`;
  }

  content += `<text x="${px0 + (L * scale) / 2}" y="${py0 - 8}" font-size="10" fill="rgba(128,128,128,0.7)" text-anchor="middle" font-family="inherit">FRONT (${L}&apos;)</text>`;
  content += `<text x="${px0 + (L * scale) / 2}" y="${py0 + W * scale + 18}" font-size="10" fill="rgba(128,128,128,0.7)" text-anchor="middle" font-family="inherit">BACK</text>`;
  content += `<text x="${px0 - 10}" y="${py0 + (W * scale) / 2}" font-size="10" fill="rgba(128,128,128,0.7)" text-anchor="end" dominant-baseline="middle" font-family="inherit">LEFT (${W}&apos;)</text>`;
  content += `<text x="${px0 + L * scale + 10}" y="${py0 + (W * scale) / 2}" font-size="10" fill="rgba(128,128,128,0.7)" text-anchor="start" dominant-baseline="middle" font-family="inherit">RIGHT</text>`;

  clampedOpenings.forEach((op) => {
    const thickness = Math.max(3, scale * 0.8);
    const fill = op.type === "window" ? "#8FB8D4" : trimHex;
    let ox = 0, oy = 0, ow = 0, oh = 0;
    if (op.side === "front") { ox = px0 + op.position * scale; oy = py0 - thickness / 2; ow = op.width * scale; oh = thickness; }
    else if (op.side === "back") { ox = px0 + op.position * scale; oy = py0 + W * scale - thickness / 2; ow = op.width * scale; oh = thickness; }
    else if (op.side === "left") { ox = px0 - thickness / 2; oy = py0 + op.position * scale; ow = thickness; oh = op.width * scale; }
    else if (op.side === "right") { ox = px0 + L * scale - thickness / 2; oy = py0 + op.position * scale; ow = thickness; oh = op.width * scale; }
    content += `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" fill="${fill}" stroke="${darken(op.type === "window" ? "#5C8BA8" : trimHex, 0.3)}" stroke-width="0.5"/>`;
  });

  return content;
}
