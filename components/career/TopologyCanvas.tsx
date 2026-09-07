"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { Easing } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  CAREER_CANVAS,
  type CareerNode,
  type CareerNodeType,
} from "@/lib/data/career";

const NODE_W = 176;
const NODE_H = 58;
const RATIO = CAREER_CANVAS.h / CAREER_CANVAS.w;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.45;
const W_MIN = CAREER_CANVAS.w / MAX_ZOOM;
const W_MAX = CAREER_CANVAS.w / MIN_ZOOM;
const EASE: Easing = [0.16, 1, 0.3, 1];
const FIT_MARGIN = 150;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

function edgeEndpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = Math.min(
    NODE_W / 2 / Math.abs(dx || 1e-9),
    NODE_H / 2 / Math.abs(dy || 1e-9)
  );
  return { x: a.x + dx * t, y: a.y + dy * t };
}

function Glyph({
  type,
  active,
}: {
  type: CareerNodeType;
  active: boolean;
}) {
  const stroke = active ? "#818cf8" : "#71717a";
  const fill = active ? "#818cf8" : "none";
  return (
    <g fill="none" stroke={stroke} strokeWidth="1.1" vectorEffect="non-scaling-stroke">
      {type === "Company" || type === "KeyProject" ? (
        <>
          <rect x="2" y="2" width="16" height="11" rx="1.5" />
          <path d="M6 16 H14" />
          <path d="M10 13 V16" />
          {type === "KeyProject" && (
            <circle cx="10" cy="7.5" r="2" fill={fill} stroke="none" />
          )}
        </>
      ) : type === "SkillEpoch" ? (
        <>
          <rect x="2" y="2" width="16" height="14" rx="1.5" />
          <path d="M5 6 H15" />
          <path d="M5 9 H15" />
          <path d="M5 12 H11" />
        </>
      ) : (
        <>
          <rect x="4.5" y="4.5" width="11" height="11" rx="1" transform="rotate(45 10 10)" />
          <circle cx="10" cy="10" r="1.2" fill={fill} stroke="none" />
        </>
      )}
    </g>
  );
}

interface Camera {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Pointer {
  x: number;
  y: number;
}

type Gesture =
  | { type: "pan"; startCam: Camera; startPoint: Pointer }
  | { type: "pinch"; startCam: Camera; startMid: Pointer; startDist: number };

function boundsOf(list: CareerNode[]) {
  const xs = list.map((n) => n.x);
  const ys = list.map((n) => n.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

interface TopologyCanvasProps {
  nodes: CareerNode[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

export default function TopologyCanvas({
  nodes,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: TopologyCanvasProps) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const pointersRef = useRef<Map<number, Pointer>>(new Map());
  const gestureRef = useRef<Gesture | null>(null);

  const viewBox = useMotionValue(
    `0 0 ${CAREER_CANVAS.w} ${CAREER_CANVAS.h}`
  );
  const camRef = useRef<Camera>({
    x: 0,
    y: 0,
    w: CAREER_CANVAS.w,
    h: CAREER_CANVAS.h,
  });

  const setCam = useCallback((x: number, y: number, w: number, h: number) => {
    camRef.current = { x, y, w, h };
    viewBox.set(`${x} ${y} ${w} ${h}`);
  }, [viewBox]);

  const flyCam = useCallback((x: number, y: number, w: number, h: number) => {
    camRef.current = { x, y, w, h };
    viewBox.set(`${x} ${y} ${w} ${h}`);
    if (reduced) return;
    animate(viewBox, `${x} ${y} ${w} ${h}`, { duration: 1.2, ease: EASE });
  }, [viewBox, reduced]);

  const fitToNodes = useCallback((list: CareerNode[], animated: boolean) => {
    const b = boundsOf(list);
    const x0 = b.minX - FIT_MARGIN;
    const x1 = b.maxX + FIT_MARGIN;
    const y0 = b.minY - FIT_MARGIN;
    const y1 = b.maxY + FIT_MARGIN;
    const w = x1 - x0;
    const h = y1 - y0;
    const z = clamp(Math.min(CAREER_CANVAS.w / w, CAREER_CANVAS.h / h), MIN_ZOOM, 1.2);
    const vw = CAREER_CANVAS.w / z;
    const vh = CAREER_CANVAS.h / z;
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    if (animated) flyCam(cx - vw / 2, cy - vh / 2, vw, vh);
    else setCam(cx - vw / 2, cy - vh / 2, vw, vh);
  }, [flyCam, setCam]);

  const flyToNode = useCallback((node: CareerNode) => {
    const z = 1.7;
    const vw = CAREER_CANVAS.w / z;
    const vh = CAREER_CANVAS.h / z;
    flyCam(node.x - vw / 2, node.y - vh / 2, vw, vh);
  }, [flyCam]);

  // Initial + epoch-change framing.
  useEffect(() => {
    fitToNodes(nodes, !reduced);
  }, [nodes, reduced, fitToNodes]);

  const toView = (clientX: number, clientY: number): Pointer => {
    const el = svgRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * CAREER_CANVAS.w,
      y: ((clientY - rect.top) / rect.height) * CAREER_CANVAS.h,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    svgRef.current?.setPointerCapture(e.pointerId);
    const v = toView(e.clientX, e.clientY);
    pointersRef.current.set(e.pointerId, v);
    const size = pointersRef.current.size;
    if (size === 1) {
      gestureRef.current = {
        type: "pan",
        startCam: { ...camRef.current },
        startPoint: v,
      };
    } else if (size === 2) {
      const pts = [...pointersRef.current.values()];
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const dist = Math.max(Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), 1);
      gestureRef.current = {
        type: "pinch",
        startCam: { ...camRef.current },
        startMid: mid,
        startDist: dist,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    const v = toView(e.clientX, e.clientY);
    pointersRef.current.set(e.pointerId, v);
    const g = gestureRef.current;
    if (!g) return;

    if (g.type === "pan" && pointersRef.current.size === 1) {
      const dx = v.x - g.startPoint.x;
      const dy = v.y - g.startPoint.y;
      setCam(
        g.startCam.x - (dx / CAREER_CANVAS.w) * g.startCam.w,
        g.startCam.y - (dy / CAREER_CANVAS.h) * g.startCam.h,
        g.startCam.w,
        g.startCam.h
      );
    } else if (g.type === "pinch" && pointersRef.current.size >= 2) {
      const pts = [...pointersRef.current.values()];
      const curMid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const curDist = Math.max(
        Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        1
      );
      const w0 = g.startCam.w;
      const vw = clamp(w0 * (g.startDist / curDist), W_MIN, W_MAX);
      const vh = vw * RATIO;
      const wx = g.startCam.x + (g.startMid.x / CAREER_CANVAS.w) * w0;
      const wy = g.startCam.y + (g.startMid.y / CAREER_CANVAS.h) * g.startCam.h;
      setCam(
        wx - (curMid.x / CAREER_CANVAS.w) * vw,
        wy - (curMid.y / CAREER_CANVAS.h) * vh,
        vw,
        vh
      );
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    pointersRef.current.delete(e.pointerId);
    const remaining = [...pointersRef.current.entries()];
    gestureRef.current =
      remaining.length === 1
        ? { type: "pan", startCam: { ...camRef.current }, startPoint: remaining[0][1] }
        : null;
  };

  // Native wheel listener so preventDefault works reliably.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const v: Pointer = {
        x: ((e.clientX - rect.left) / rect.width) * CAREER_CANVAS.w,
        y: ((e.clientY - rect.top) / rect.height) * CAREER_CANVAS.h,
      };
      const c = camRef.current;
      const wx = c.x + (v.x / CAREER_CANVAS.w) * c.w;
      const wy = c.y + (v.y / CAREER_CANVAS.h) * c.h;
      const k = e.deltaY < 0 ? 1 / 1.25 : 1.25;
      const vw = clamp(c.w * k, W_MIN, W_MAX);
      const vh = vw * RATIO;
      setCam(
        wx - (v.x / CAREER_CANVAS.w) * vw,
        wy - (v.y / CAREER_CANVAS.h) * vh,
        vw,
        vh
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [svgRef, setCam]);

  const zoomBy = useCallback((k: number) => {
    const c = camRef.current;
    const vw = clamp(c.w / k, W_MIN, W_MAX);
    const vh = vw * RATIO;
    const cx = c.x + c.w / 2;
    const cy = c.y + c.h / 2;
    setCam(cx - vw / 2, cy - vh / 2, vw, vh);
  }, [setCam]);

  const handleZoomIn = () => zoomBy(1.35);
  const handleZoomOut = () => zoomBy(1 / 1.35);
  const handleFit = () => fitToNodes(nodes, !reduced);

  const activeId = selectedId ?? hoveredId;

  // Build edges only between visible nodes.
  const edges = useMemo(() => {
    const map = new Map(nodes.map((n) => [n.id, n]));
    const out: { d: string; tx: number; ty: number; from: string; to: string }[] = [];
    for (const n of nodes) {
      for (const targetId of n.connectedTo) {
        const t = map.get(targetId);
        if (!t) continue;
        const s = edgeEndpoint(n, t);
        const e = edgeEndpoint(t, n);
        out.push({ d: `M ${s.x} ${s.y} L ${e.x} ${e.y}`, tx: e.x, ty: e.y, from: n.id, to: targetId });
      }
    }
    return out;
  }, [nodes]);

  const edgeActive = (e: { from: string; to: string }, activeId: string | null) =>
    !!activeId && (e.from === activeId || e.to === activeId);

  return (
    <div className="relative w-full aspect-[1000/640] rounded-xl border border-zinc-800 bg-black/40 overflow-hidden select-none">
      <motion.svg
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="img"
        aria-label="Interactive career topology graph. Drag to pan, scroll or pinch to zoom, click a node to inspect it."
        style={{ cursor: "grab" }}
      >
        {/* Micro grid backdrop */}
        <defs>
          <pattern id="topo-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#27272a" strokeWidth="0.5" opacity="0.35" />
          </pattern>
        </defs>
        <rect width={CAREER_CANVAS.w} height={CAREER_CANVAS.h} fill="url(#topo-grid)" />
        <rect width={CAREER_CANVAS.w} height={CAREER_CANVAS.h} fill="none" stroke="#3f3f46" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        <g style={{ touchAction: "none" }}>
          {/* Connections */}
          {edges.map((e) => {
            const active = edgeActive(e, activeId);
            const dimmed = !!activeId && !active;
            return (
              <g key={`${e.from}-${e.to}`}>
                <path
                  d={e.d}
                  fill="none"
                  stroke={active ? "#6366f1" : "#3f3f46"}
                  strokeWidth={active ? 1.4 : 1}
                  strokeOpacity={dimmed ? 0.07 : active ? 0.9 : 0.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "opacity 300ms ease, stroke 300ms ease" }}
                />
                <circle
                  cx={e.tx}
                  cy={e.ty}
                  r={2.2}
                  fill={active ? "#818cf8" : "#52525b"}
                  opacity={dimmed ? 0.1 : 1}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "opacity 300ms ease, fill 300ms ease" }}
                />
                {active && !reduced && (
                  <>
                    <motion.circle
                      r={3.4}
                      fill="#6366f1"
                      opacity={0.55}
                      style={{ offsetPath: `path("${e.d}")` }}
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      r={1.6}
                      fill="#a5b4fc"
                      style={{ offsetPath: `path("${e.d}")` }}
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const selected = selectedId === node.id;
            const active = activeId === node.id;
            const dimmed = !!activeId && !active;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x - NODE_W / 2} ${node.y - NODE_H / 2})`}
                opacity={dimmed ? 0.35 : 1}
                style={{ transition: "opacity 300ms ease", cursor: "pointer" }}
                role="button"
                tabIndex={0}
                aria-label={`${node.name}. ${node.dateRange.label}. Click to inspect.`}
                onClick={() => {
                  if (selectedId === node.id) {
                    onSelect(null);
                    fitToNodes(nodes, !reduced);
                  } else {
                    onSelect(node.id);
                    flyToNode(node);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(node.id);
                    flyToNode(node);
                  }
                }}
                onFocus={() => onHover(node.id)}
                onBlur={() => onHover(null)}
                onPointerEnter={() => onHover(node.id)}
                onPointerLeave={() => onHover(null)}
              >
                <motion.rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  fill={selected ? "#161619" : "#0e0e10"}
                  stroke={active ? "#6366f1" : "#3f3f46"}
                  strokeWidth={active ? 1.5 : 1}
                  strokeOpacity={active ? 0.95 : 1}
                  vectorEffect="non-scaling-stroke"
                  animate={active ? { strokeOpacity: [0.55, 1, 0.55] } : { strokeOpacity: 1 }}
                  transition={active ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                />
                {selected && !reduced && (
                  <motion.rect
                    width={NODE_W}
                    height={NODE_H}
                    rx={10}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <g transform="translate(10 20)">
                  <Glyph type={node.type} active={active} />
                </g>
                <text
                  x="38"
                  y="22"
                  className="font-mono"
                  style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.02em" }}
                  fill={active ? "#f4f4f5" : "#d4d4d8"}
                >
                  {node.name.toUpperCase()}
                </text>
                <text
                  x="38"
                  y="35.5"
                  className="font-mono"
                  style={{ fontSize: 7.5 }}
                  fill="#52525b"
                >
                  {`${node.type.toUpperCase()} · ${node.dateRange.label}`}
                </text>
                <circle
                  cx={NODE_W - 9}
                  cy={7}
                  r={2.4}
                  fill={active ? "#6366f1" : "#3f3f46"}
                  vectorEffect="non-scaling-stroke"
                />
                {active && !reduced && (
                  <motion.circle
                    cx={NODE_W - 9}
                    cy={7}
                    r={5}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    animate={{ opacity: [0.9, 0.05, 0.9] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </motion.svg>

      {/* Overlay controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        <button
          title="Zoom in"
          aria-label="Zoom in"
          onClick={handleZoomIn}
          className="min-w-8 h-8 px-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm font-mono text-[11px] text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          +
        </button>
        <button
          title="Zoom out"
          aria-label="Zoom out"
          onClick={handleZoomOut}
          className="min-w-8 h-8 px-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm font-mono text-[11px] text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          −
        </button>
        <button
          title="Fit graph"
          aria-label="Fit graph to view"
          onClick={handleFit}
          className="min-w-8 h-8 px-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm font-mono text-[11px] text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          FIT
        </button>
      </div>
    </div>
  );
}