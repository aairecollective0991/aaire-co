"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RoofStyle = "gable" | "lean-to";
type Side = "front" | "back" | "left" | "right";
type OpeningType = "garage" | "walk" | "window";
type CornerBehavior = "miter" | "gap";

interface Opening {
  id: number;
  type: OpeningType;
  side: Side;
  position: number; // feet from front (for left/right walls) or from left (for front/back walls)
  width: number;
  height: number;
}

interface Porch {
  id: number;
  side: Side;
  depth: number;
  pitch: number;
  leftCorner: CornerBehavior;
  rightCorner: CornerBehavior;
}

interface BuildingSpec {
  dimensions: { width: number; length: number; eaveHeight: number };
  roof: { style: RoofStyle; pitch: number };
  colors: { roof: string; walls: string; trim: string };
  porches: Array<{ side: Side; depth: number; pitch: number }>;
  openings: Array<{
    type: OpeningType;
    side: Side;
    positionFromCorner: number;
    width: number;
    height: number;
  }>;
}

interface BuildingConfiguratorProps {
  onQuoteRequest?: (spec: BuildingSpec) => void;
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
  porches: Porch[];
  openings: Opening[];
  nextOpeningId: number;
  nextPorchId: number;
}

// ---------------------------------------------------------------------------
// Constants
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
  ["Galvalume", "#B8B8B2"],
];

const OPENING_DEFAULTS: Record<OpeningType, { width: number; height: number }> = {
  garage: { width: 12, height: 12 },
  walk: { width: 3, height: 7 },
  window: { width: 3, height: 3 },
};

const OPENING_LABEL: Record<OpeningType, string> = {
  garage: "Garage door",
  walk: "Walk door",
  window: "Window",
};

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

function lighten(hex: string, pct: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.min(255, Math.round(r + (255 - r) * pct))},${Math.min(255, Math.round(g + (255 - g) * pct))},${Math.min(255, Math.round(b + (255 - b) * pct))})`;
}

function darken(hex: string, pct: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - pct))},${Math.round(g * (1 - pct))},${Math.round(b * (1 - pct))})`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function wallLength(side: Side, width: number, length: number): number {
  return side === "front" || side === "back" ? length : width;
}

function clampPosition(opening: Opening, width: number, length: number): number {
  const max = wallLength(opening.side, width, length) - opening.width;
  return Math.max(0, Math.min(opening.position, Math.max(0, max)));
}

function getPlanGeometry(state: State, vbW: number, vbH: number) {
  let totalW = state.width;
  let totalL = state.length;
  let offW = 0;
  let offL = 0;

  state.porches.forEach((p) => {
    if (p.side === "front") {
      totalW += p.depth;
      offW = Math.max(offW, p.depth);
    } else if (p.side === "back") {
      totalW += p.depth;
    } else if (p.side === "left") {
      totalL += p.depth;
      offL = Math.max(offL, p.depth);
    } else if (p.side === "right") {
      totalL += p.depth;
    }
  });

  const padding = 60;
  const scale = Math.min((vbW - padding * 2) / totalL, (vbH - padding * 2) / totalW);
  const px0 = (vbW - totalL * scale) / 2 + offL * scale;
  const py0 = (vbH - totalW * scale) / 2 + offW * scale;
  return { px0, py0, scale, totalW, totalL };
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
    roofColorIdx: 12,
    wallColorIdx: 6,
    trimColorIdx: 6,
    porches: [],
    openings: [
      { id: 1, type: "garage", side: "front", position: 20, width: 12, height: 12 },
      { id: 2, type: "walk", side: "right", position: 10, width: 3, height: 7 },
      { id: 3, type: "window", side: "left", position: 15, width: 3, height: 3 },
      { id: 4, type: "window", side: "left", position: 45, width: 3, height: 3 },
    ],
    nextOpeningId: 5,
    nextPorchId: 1,
    ...initialState,
  });

  const clampedOpenings = useMemo(
    () => state.openings.map((op) => ({ ...op, position: clampPosition(op, state.width, state.length) })),
    [state.openings, state.width, state.length]
  );

  const openingCounts = useMemo(() => {
    const counts = { garage: 0, walk: 0, window: 0 };
    clampedOpenings.forEach((op) => counts[op.type]++);
    return counts;
  }, [clampedOpenings]);

  const roofHex = COLORS[state.roofColorIdx][1];
  const wallHex = COLORS[state.wallColorIdx][1];
  const trimHex = COLORS[state.trimColorIdx][1];

  // -------------------------------------------------------------------------
  // Drag
  // -------------------------------------------------------------------------

  const planSvgRef = useRef<SVGSVGElement | null>(null);
  const [dragState, setDragState] = useState<{
    openingId: number;
    side: Side;
    offsetFeet: number;
  } | null>(null);

  const updateOpening = useCallback((id: number, patch: Partial<Opening>) => {
    setState((s) => ({
      ...s,
      openings: s.openings.map((op) => (op.id === id ? { ...op, ...patch } : op)),
    }));
  }, []);

  useEffect(() => {
    if (!dragState) return;

    const handleMove = (e: PointerEvent) => {
      const svg = planSvgRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const svgPoint = pt.matrixTransform(ctm.inverse());
      const { px0, py0, scale } = getPlanGeometry(state, 600, 380);
      const opening = state.openings.find((o) => o.id === dragState.openingId);
      if (!opening) return;

      let positionFeet = 0;
      if (dragState.side === "front" || dragState.side === "back") positionFeet = (svgPoint.x - px0) / scale;
      else positionFeet = (svgPoint.y - py0) / scale;

      positionFeet -= dragState.offsetFeet;

      const wall = wallLength(dragState.side, state.width, state.length);
      const clamped = Math.max(0, Math.min(positionFeet, wall - opening.width));
      updateOpening(dragState.openingId, { position: Math.round(clamped * 10) / 10 });
    };

    const handleUp = () => setDragState(null);

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("pointercancel", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleUp);
    };
  }, [dragState, state, updateOpening]);

  const handleOpeningPointerDown = (e: React.PointerEvent<SVGElement>, opening: Opening) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const svg = planSvgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPoint = pt.matrixTransform(ctm.inverse());
    const { px0, py0, scale } = getPlanGeometry(state, 600, 380);

    let pointerFeet = 0;
    if (opening.side === "front" || opening.side === "back") pointerFeet = (svgPoint.x - px0) / scale;
    else pointerFeet = (svgPoint.y - py0) / scale;

    setDragState({
      openingId: opening.id,
      side: opening.side,
      offsetFeet: pointerFeet - opening.position,
    });
  };

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const addOpening = (type: OpeningType) => {
    const side: Side = type === "garage" ? "front" : type === "walk" ? "right" : "left";
    const d = OPENING_DEFAULTS[type];
    setState((s) => ({
      ...s,
      openings: [...s.openings, { id: s.nextOpeningId, type, side, position: 5, width: d.width, height: d.height }],
      nextOpeningId: s.nextOpeningId + 1,
    }));
  };

  const removeOpening = (id: number) => setState((s) => ({ ...s, openings: s.openings.filter((o) => o.id !== id) }));

  const changeOpeningSide = (id: number, side: Side) => {
    setState((s) => ({
      ...s,
      openings: s.openings.map((o) => (o.id === id ? { ...o, side, position: 0 } : o)),
    }));
  };

  const addPorch = () => {
    setState((s) => {
      const used = new Set(s.porches.map((p) => p.side));
      const available: Side[] = (["front", "back", "left", "right"] as Side[]).filter((sd) => !used.has(sd));
      if (available.length === 0) return s;
      return {
        ...s,
        porches: [...s.porches, { id: s.nextPorchId, side: available[0], depth: 10, pitch: 2, leftCorner: "gap", rightCorner: "gap" }],
        nextPorchId: s.nextPorchId + 1,
      };
    });
  };

  const updatePorch = (id: number, patch: Partial<Porch>) => {
    setState((s) => ({ ...s, porches: s.porches.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  };

  const removePorch = (id: number) => setState((s) => ({ ...s, porches: s.porches.filter((p) => p.id !== id) }));

  const handleQuote = () => {
    const spec: BuildingSpec = {
      dimensions: { width: state.width, length: state.length, eaveHeight: state.eave },
      roof: { style: state.roofStyle, pitch: state.pitch },
      colors: {
        roof: COLORS[state.roofColorIdx][0],
        walls: COLORS[state.wallColorIdx][0],
        trim: COLORS[state.trimColorIdx][0],
      },
      porches: state.porches.map((p) => ({ side: p.side, depth: p.depth, pitch: p.pitch })),
      openings: clampedOpenings.map((o) => ({
        type: o.type,
        side: o.side,
        positionFromCorner: Math.round(o.position * 10) / 10,
        width: o.width,
        height: o.height,
      })),
    };
    onQuoteRequest?.(spec);
  };

  const availablePorchSides = useMemo(() => {
    const used = new Set(state.porches.map((p) => p.side));
    return (["front", "back", "left", "right"] as Side[]).filter((sd) => !used.has(sd));
  }, [state.porches]);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="relative flex min-h-[560px] flex-col gap-3 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900 lg:sticky lg:top-4">
        <div className="pointer-events-none absolute bottom-4 right-4 opacity-20 dark:opacity-30">
          <Image src="/images/logos/aaire-logo-black.png" alt="" width={48} height={48} className="block dark:hidden" />
          <Image src="/images/logos/aaire-logo-white.jpg" alt="" width={48} height={48} className="hidden dark:block" />
        </div>

        <div className="flex flex-col rounded-lg bg-white/60 p-2 dark:bg-neutral-950/40">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">Preview</span>
            <span className="font-mono text-[11px] tabular-nums text-neutral-600 dark:text-neutral-400">
              {state.width}&prime; W × {state.length}&prime; L × {state.eave}&prime; H · {state.pitch}:12 {state.roofStyle}
            </span>
          </div>
          <svg
            viewBox="0 0 600 180"
            className="h-[180px] w-full"
            role="img"
            aria-label="Isometric preview"
            dangerouslySetInnerHTML={{ __html: renderIso({ state, clampedOpenings, roofHex, wallHex, trimHex, vbW: 600, vbH: 180 }) }}
          />
        </div>

        <div className="flex flex-1 flex-col rounded-lg bg-white/60 p-2 dark:bg-neutral-950/40">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
              Plan · drag to reposition
            </span>
            {dragState && (
              <span className="font-mono text-[11px] tabular-nums text-neutral-600 dark:text-neutral-400">dragging…</span>
            )}
          </div>
          <svg
            ref={planSvgRef}
            viewBox="0 0 600 380"
            className="h-auto max-h-[480px] w-full touch-none select-none"
            role="img"
            aria-label="Plan view"
          >
            <PlanViewSvg
              state={state}
              clampedOpenings={clampedOpenings}
              roofHex={roofHex}
              wallHex={wallHex}
              trimHex={trimHex}
              vbW={600}
              vbH={380}
              onOpeningPointerDown={handleOpeningPointerDown}
              draggingId={dragState?.openingId ?? null}
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <section>
          <p className="mb-2.5 text-sm font-medium">Dimensions</p>
          <SliderRow label="Width" min={12} max={80} step={1} value={state.width} onChange={(v) => setState((s) => ({ ...s, width: v }))} />
          <SliderRow label="Length" min={20} max={200} step={5} value={state.length} onChange={(v) => setState((s) => ({ ...s, length: v }))} />
          <SliderRow label="Height" min={8} max={30} step={1} value={state.eave} onChange={(v) => setState((s) => ({ ...s, eave: v }))} />
        </section>

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
            <label className="w-14 text-[13px] text-neutral-600 dark:text-neutral-400">Pitch</label>
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

        <section>
          <p className="mb-2.5 text-sm font-medium">Colors</p>
          <ColorRow label="Roof" selectedIdx={state.roofColorIdx} onChange={(i) => setState((s) => ({ ...s, roofColorIdx: i }))} />
          <ColorRow label="Walls" selectedIdx={state.wallColorIdx} onChange={(i) => setState((s) => ({ ...s, wallColorIdx: i }))} />
          <ColorRow label="Trim" selectedIdx={state.trimColorIdx} onChange={(i) => setState((s) => ({ ...s, trimColorIdx: i }))} isLast />
        </section>

        <section>
          <div className="mb-2.5 flex items-baseline justify-between">
            <p className="text-sm font-medium">Porches</p>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-500">{state.porches.length}/4 sides</span>
          </div>
          <div className="flex flex-col gap-2">
            {state.porches.length === 0 && (
              <p className="my-1 text-xs italic text-neutral-500 dark:text-neutral-500">No porches — add one below.</p>
            )}
            {state.porches.map((p) => (
              <div key={p.id} className="flex flex-col gap-1.5 rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium capitalize">{p.side} porch</span>
                  <button
                    onClick={() => removePorch(p.id)}
                    className="h-[22px] w-[22px] rounded-md border border-neutral-300 bg-transparent text-sm leading-none text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-[1fr_1fr] gap-1.5">
                  <select
                    value={p.side}
                    onChange={(e) => {
                      const newSide = e.target.value as Side;
                      if (state.porches.some((other) => other.id !== p.id && other.side === newSide)) return;
                      updatePorch(p.id, { side: newSide });
                    }}
                    className="rounded-md border border-neutral-300 bg-white px-1.5 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    {(["front", "back", "left", "right"] as Side[]).map((sd) => {
                      const taken = state.porches.some((other) => other.id !== p.id && other.side === sd);
                      return (
                        <option key={sd} value={sd} disabled={taken}>
                          {sd}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    value={p.pitch}
                    onChange={(e) => updatePorch(p.id, { pitch: parseFloat(e.target.value) })}
                    className="rounded-md border border-neutral-300 bg-white px-1.5 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <option value={1}>1:12 pitch</option>
                    <option value={2}>2:12 pitch</option>
                    <option value={3}>3:12 pitch</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-neutral-600 dark:text-neutral-400">Depth</label>
                  <input
                    type="range"
                    min={6}
                    max={20}
                    step={1}
                    value={p.depth}
                    onChange={(e) => updatePorch(p.id, { depth: parseInt(e.target.value, 10) })}
                    className="flex-1"
                  />
                  <span className="min-w-[28px] text-right text-[11px] font-medium tabular-nums">{p.depth}&prime;</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <label className="text-[11px] text-neutral-600 dark:text-neutral-400">Left corner:</label>
                    <select
                      value={p.leftCorner}
                      onChange={(e) => updatePorch(p.id, { leftCorner: e.target.value as CornerBehavior })}
                      className="rounded-md border border-neutral-300 bg-white px-1 py-0.5 text-[11px] dark:border-neutral-700 dark:bg-neutral-800"
                    >
                      <option value="gap">gap</option>
                      <option value="miter">miter</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[11px] text-neutral-600 dark:text-neutral-400">Right:</label>
                    <select
                      value={p.rightCorner}
                      onChange={(e) => updatePorch(p.id, { rightCorner: e.target.value as CornerBehavior })}
                      className="rounded-md border border-neutral-300 bg-white px-1 py-0.5 text-[11px] dark:border-neutral-700 dark:bg-neutral-800"
                    >
                      <option value="gap">gap</option>
                      <option value="miter">miter</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {availablePorchSides.length > 0 && (
            <button
              onClick={addPorch}
              className="mt-2 w-full rounded-md border border-neutral-300 bg-transparent px-2 py-1.5 text-xs hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
            >
              + Add porch
            </button>
          )}
        </section>

        <section>
          <div className="mb-2.5 flex items-baseline justify-between">
            <p className="text-sm font-medium">Openings</p>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-500">
              {openingCounts.garage > 0 && `${openingCounts.garage} garage`}
              {openingCounts.garage > 0 && (openingCounts.walk > 0 || openingCounts.window > 0) && " · "}
              {openingCounts.walk > 0 && `${openingCounts.walk} walk`}
              {openingCounts.walk > 0 && openingCounts.window > 0 && " · "}
              {openingCounts.window > 0 && `${openingCounts.window} window${openingCounts.window > 1 ? "s" : ""}`}
              {clampedOpenings.length === 0 && "Drag to position"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {clampedOpenings.length === 0 ? (
              <p className="my-1 text-xs italic text-neutral-500 dark:text-neutral-500">No openings yet.</p>
            ) : (
              clampedOpenings.map((op) => (
                <div key={op.id} className="grid grid-cols-[1fr_auto_auto_26px] items-center gap-1.5 rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
                  <span className="truncate text-xs text-neutral-700 dark:text-neutral-300">
                    {OPENING_LABEL[op.type]}
                    {op.type === "garage" ? ` ${op.width}×${op.height}` : ""}
                  </span>
                  <select
                    value={op.side}
                    onChange={(e) => changeOpeningSide(op.id, e.target.value as Side)}
                    className="rounded-md border border-neutral-300 bg-white px-1 py-0.5 text-[11px] dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <option value="front">Front</option>
                    <option value="back">Back</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                  <span className="font-mono text-[11px] tabular-nums text-neutral-600 dark:text-neutral-400" title="Feet from corner">
                    {Math.round(op.position * 10) / 10}&prime;
                  </span>
                  <button
                    onClick={() => removeOpening(op.id)}
                    className="h-[26px] w-[26px] rounded-md border border-neutral-300 bg-transparent text-sm leading-none text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
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
                + {OPENING_LABEL[type]}
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
      <label className="w-14 text-[13px] text-neutral-600 dark:text-neutral-400">{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseInt(e.target.value, 10))} className="flex-1" />
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
              style={{ background: col[1], border: selected ? "2px solid currentColor" : "1px solid rgba(128,128,128,0.3)" }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface PlanViewProps {
  state: State;
  clampedOpenings: Opening[];
  roofHex: string;
  wallHex: string;
  trimHex: string;
  vbW: number;
  vbH: number;
  onOpeningPointerDown: (e: React.PointerEvent<SVGElement>, op: Opening) => void;
  draggingId: number | null;
}

function PlanViewSvg({ state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH, onOpeningPointerDown, draggingId }: PlanViewProps) {
  const { px0, py0, scale } = getPlanGeometry(state, vbW, vbH);
  const W = state.width;
  const L = state.length;

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
            <rect x={prx} y={pry} width={prw} height={prh} fill={lighten(roofHex, 0.55)} stroke={darken(roofHex, 0.2)} strokeWidth={0.8} strokeDasharray="4,3" opacity={0.55} />
            <text x={prx + prw / 2} y={pry + prh / 2} fontSize={11} fill="rgba(100,100,100,0.9)" textAnchor="middle" dominantBaseline="middle" fontFamily="inherit">
              {p.depth}&prime; porch
            </text>
          </g>
        );
      })}

      <rect x={px0} y={py0} width={L * scale} height={W * scale} fill={lighten(wallHex, 0.2)} stroke={darken(wallHex, 0.3)} strokeWidth={1.2} />
      {state.roofStyle === "gable" && (
        <line x1={px0} y1={py0 + (W * scale) / 2} x2={px0 + L * scale} y2={py0 + (W * scale) / 2} stroke={darken(wallHex, 0.3)} strokeWidth={0.5} strokeDasharray="4,3" />
      )}

      <text x={px0 + (L * scale) / 2} y={py0 - 14} fontSize={11} fill="rgba(100,100,100,0.8)" textAnchor="middle" fontFamily="inherit">FRONT · {L}&prime;</text>
      <text x={px0 + (L * scale) / 2} y={py0 + W * scale + 22} fontSize={11} fill="rgba(100,100,100,0.8)" textAnchor="middle" fontFamily="inherit">BACK</text>
      <text x={px0 - 14} y={py0 + (W * scale) / 2} fontSize={11} fill="rgba(100,100,100,0.8)" textAnchor="end" dominantBaseline="middle" fontFamily="inherit">LEFT · {W}&prime;</text>
      <text x={px0 + L * scale + 14} y={py0 + (W * scale) / 2} fontSize={11} fill="rgba(100,100,100,0.8)" textAnchor="start" dominantBaseline="middle" fontFamily="inherit">RIGHT</text>

      {clampedOpenings.map((op) => {
        const thickness = Math.max(4, scale * 1.2);
        const fill = op.type === "window" ? "#8FB8D4" : trimHex;
        let ox = 0, oy = 0, ow = 0, oh = 0;
        if (op.side === "front") { ox = px0 + op.position * scale; oy = py0 - thickness / 2; ow = op.width * scale; oh = thickness; }
        else if (op.side === "back") { ox = px0 + op.position * scale; oy = py0 + W * scale - thickness / 2; ow = op.width * scale; oh = thickness; }
        else if (op.side === "left") { ox = px0 - thickness / 2; oy = py0 + op.position * scale; ow = thickness; oh = op.width * scale; }
        else if (op.side === "right") { ox = px0 + L * scale - thickness / 2; oy = py0 + op.position * scale; ow = thickness; oh = op.width * scale; }

        const isDragging = draggingId === op.id;
        let lx = ox + ow / 2;
        let ly = oy + oh / 2;
        let anchor: "start" | "middle" | "end" = "middle";
        let baseline: "hanging" | "middle" | "auto" = "middle";
        const labelOffset = 16;
        if (op.side === "front") { ly = oy - labelOffset; baseline = "auto"; }
        else if (op.side === "back") { ly = oy + oh + labelOffset; baseline = "hanging"; }
        else if (op.side === "left") { lx = ox - labelOffset; anchor = "end"; }
        else if (op.side === "right") { lx = ox + ow + labelOffset; anchor = "start"; }

        const fromLabel = op.side === "front" || op.side === "back" ? "left" : "front";

        return (
          <g key={op.id}>
            <rect
              x={ox}
              y={oy}
              width={ow}
              height={oh}
              fill={fill}
              stroke={isDragging ? "#000" : darken(op.type === "window" ? "#5C8BA8" : trimHex, 0.3)}
              strokeWidth={isDragging ? 1.5 : 0.5}
              style={{ cursor: "grab" }}
              onPointerDown={(e) => onOpeningPointerDown(e, op)}
            />
            {isDragging && (
              <text x={lx} y={ly} fontSize={11} fill="rgba(30,30,30,0.95)" textAnchor={anchor} dominantBaseline={baseline} fontFamily="inherit" fontWeight={500}>
                {Math.round(op.position * 10) / 10}&prime; from {fromLabel}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Iso renderer
// ---------------------------------------------------------------------------

interface IsoArgs {
  state: State;
  clampedOpenings: Opening[];
  roofHex: string;
  wallHex: string;
  trimHex: string;
  vbW: number;
  vbH: number;
}

function renderIso({ state, clampedOpenings, roofHex, wallHex, trimHex, vbW, vbH }: IsoArgs): string {
  const W = state.width;
  const L = state.length;
  const E = state.eave;
  const pitch = state.pitch;
  const ridgeRise = (W / 2) * (pitch / 12);

  const isoRaw = (x: number, y: number, z: number): [number, number] => [(x - z) * 0.866, (x + z) * 0.5 - y];

  const peakY = state.roofStyle === "lean-to" ? E + (W * pitch) / 12 : E + ridgeRise;
  const corners: Array<[number, number]> = [
    isoRaw(0, 0, 0), isoRaw(W, 0, 0), isoRaw(0, 0, L), isoRaw(W, 0, L),
    isoRaw(0, E, 0), isoRaw(W, E, 0), isoRaw(0, E, L), isoRaw(W, E, L),
  ];
  if (state.roofStyle === "lean-to") corners.push(isoRaw(0, peakY, 0), isoRaw(0, peakY, L));
  else corners.push(isoRaw(W / 2, peakY, 0), isoRaw(W / 2, peakY, L));

  state.porches.forEach((p) => {
    const pd = p.depth;
    if (p.side === "front") corners.push(isoRaw(-pd, 0, 0), isoRaw(-pd, 0, L), isoRaw(-pd, E - 2, 0), isoRaw(-pd, E - 2, L));
    else if (p.side === "back") corners.push(isoRaw(W + pd, 0, 0), isoRaw(W + pd, 0, L), isoRaw(W + pd, E - 2, 0), isoRaw(W + pd, E - 2, L));
    else if (p.side === "left") corners.push(isoRaw(0, 0, -pd), isoRaw(W, 0, -pd), isoRaw(0, E - 2, -pd), isoRaw(W, E - 2, -pd));
    else if (p.side === "right") corners.push(isoRaw(0, 0, L + pd), isoRaw(W, 0, L + pd), isoRaw(0, E - 2, L + pd), isoRaw(W, E - 2, L + pd));
  });

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  corners.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  const padding = 20;
  const scale = Math.min((vbW - padding * 2) / (maxX - minX), (vbH - padding * 2) / (maxY - minY));
  const offX = (vbW - (maxX - minX) * scale) / 2 - minX * scale;
  const offY = (vbH - (maxY - minY) * scale) / 2 - minY * scale;
  const iso = (x: number, y: number, z: number): [number, number] => {
    const [rx, ry] = isoRaw(x, y, z);
    return [rx * scale + offX, ry * scale + offY];
  };

  let content = "";

  state.porches.forEach((p) => {
    const pd = p.depth;
    const pe = 2;
    let pr: [number, number][] = [];
    let posts: Array<[[number, number], [number, number]]> = [];
    if (p.side === "front") {
      pr = [iso(-pd, E - pe, 0), iso(-pd, E - pe, L), iso(0, E, L), iso(0, E, 0)];
      posts = [[iso(-pd, 0, 0), iso(-pd, E - pe, 0)], [iso(-pd, 0, L), iso(-pd, E - pe, L)]];
    } else if (p.side === "back") {
      pr = [iso(W, E, 0), iso(W, E, L), iso(W + pd, E - pe, L), iso(W + pd, E - pe, 0)];
      posts = [[iso(W + pd, 0, 0), iso(W + pd, E - pe, 0)], [iso(W + pd, 0, L), iso(W + pd, E - pe, L)]];
    } else if (p.side === "left") {
      pr = [iso(0, E, 0), iso(0, E - pe, -pd), iso(W, E - pe, -pd), iso(W, E, 0)];
      posts = [[iso(0, 0, -pd), iso(0, E - pe, -pd)], [iso(W, 0, -pd), iso(W, E - pe, -pd)]];
    } else if (p.side === "right") {
      pr = [iso(0, E, L), iso(0, E - pe, L + pd), iso(W, E - pe, L + pd), iso(W, E, L)];
      posts = [[iso(0, 0, L + pd), iso(0, E - pe, L + pd)], [iso(W, 0, L + pd), iso(W, E - pe, L + pd)]];
    }
    content += `<polygon points="${pr.map((pt) => pt.join(",")).join(" ")}" fill="${roofHex}" stroke="${darken(roofHex, 0.25)}" stroke-width="0.8"/>`;
    posts.forEach(([a, b]) => {
      content += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${trimHex}" stroke-width="2"/>`;
    });
  });

  const blb = iso(0, 0, L), brb = iso(W, 0, L), brt = iso(W, E, L), blt = iso(0, E, L);
  const backPeak = state.roofStyle === "lean-to" ? iso(0, E + (W * pitch) / 12, L) : iso(W / 2, E + ridgeRise, L);
  const frontPeak = state.roofStyle === "lean-to" ? iso(0, E + (W * pitch) / 12, 0) : iso(W / 2, E + ridgeRise, 0);

  const backGable = state.roofStyle === "lean-to" ? [blb, brb, brt, backPeak] : [blb, brb, brt, backPeak, blt];
  content += `<polygon points="${backGable.map((p) => p.join(",")).join(" ")}" fill="${darken(wallHex, 0.18)}" stroke="${darken(wallHex, 0.3)}" stroke-width="0.8"/>`;

  const frb = iso(W, 0, 0);
  content += `<polygon points="${[frb, brb, brt, iso(W, E, 0)].map((p) => p.join(",")).join(" ")}" fill="${darken(wallHex, 0.1)}" stroke="${darken(wallHex, 0.28)}" stroke-width="0.8"/>`;

  const flb = iso(0, 0, 0);
  const frt2 = iso(W, E, 0);
  const flt = iso(0, E, 0);
  const frontGable = [flb, frb, frt2, frontPeak, flt];
  content += `<polygon points="${frontGable.map((p) => p.join(",")).join(" ")}" fill="${wallHex}" stroke="${darken(wallHex, 0.28)}" stroke-width="0.8"/>`;

  content += `<polygon points="${[flb, iso(0, 0, L), iso(0, E, L), flt].map((p) => p.join(",")).join(" ")}" fill="${lighten(wallHex, 0.08)}" stroke="${darken(wallHex, 0.25)}" stroke-width="0.8"/>`;

  if (state.roofStyle === "lean-to") {
    const roofSlope = [frt2, brt, iso(0, E + (W * pitch) / 12, L), iso(0, E + (W * pitch) / 12, 0)];
    content += `<polygon points="${roofSlope.map((p) => p.join(",")).join(" ")}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
  } else {
    content += `<polygon points="${[frt2, brt, backPeak, frontPeak].map((p) => p.join(",")).join(" ")}" fill="${roofHex}" stroke="${darken(roofHex, 0.22)}" stroke-width="0.8"/>`;
    content += `<polygon points="${[iso(0, E, 0), frontPeak, backPeak, iso(0, E, L)].map((p) => p.join(",")).join(" ")}" fill="${darken(roofHex, 0.18)}" stroke="${darken(roofHex, 0.28)}" stroke-width="0.8"/>`;
  }

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
