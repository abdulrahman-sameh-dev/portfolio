"use client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { AnimationPlaybackControls, Easing, MotionValue } from "motion/react";
import { useEffect, useState } from "react";

type NodeId = "client" | "core" | "db" | "release";
type Phase = NodeId | "transit" | "deploy" | "overview";

const P_CLIENT_CORE = "M 80 130 L 100 130 L 100 62 L 115 62";
const P_CORE_DB = "M 205 62 L 225 62 L 225 118 L 240 118";
const P_DB_CORE = "M 240 155 L 225 155 L 225 95 L 205 95";
const P_CORE_CLIENT = "M 115 95 L 100 95 L 100 155 L 80 155";
const P_CACHE = "M 160 100 L 160 110 L 205 110";
const P_DB_RELEASE = "M 267.5 168 L 267.5 205 L 200 205 L 200 226";

const connections: {
  id: string;
  d: string;
  opacity: number;
  nodes: NodeId[];
  dashed?: boolean;
}[] = [
  { id: "req", d: P_CLIENT_CORE, opacity: 0.25, nodes: ["client", "core"] },
  { id: "query", d: P_CORE_DB, opacity: 0.25, nodes: ["core", "db"] },
  { id: "resp-db", d: P_DB_CORE, opacity: 0.2, nodes: ["db", "core"] },
  { id: "resp-core", d: P_CORE_CLIENT, opacity: 0.2, nodes: ["core", "client"] },
  { id: "cache", d: P_CACHE, opacity: 0.08, nodes: ["core", "db"], dashed: true },
  { id: "deploy", d: P_DB_RELEASE, opacity: 0.2, nodes: ["db", "release"] },
];

const CAM_EASE: Easing = [0.16, 1, 0.3, 1];
const TAB_POS = [119, 147, 178];

type Frame = { x: number; y: number; w: number; h: number };

const SHOTS: Record<string, Frame> = {
  client: { x: 5, y: 105, w: 90, h: 90 },
  transit: { x: 25, y: 20, w: 185, h: 185 },
  core: { x: 104, y: 8, w: 112, h: 112 },
  transitDb: { x: 152, y: 45, w: 150, h: 150 },
  db: { x: 210, y: 90, w: 105, h: 105 },
  release: { x: 150, y: 210, w: 105, h: 105 },
  full: { x: 0, y: 0, w: 320, h: 320 },
};

const motionCss = `
  .pkt { animation-timing-function: linear; animation-iteration-count: infinite; }
  @keyframes flowFwd { from { offset-distance: 0%; } to { offset-distance: 100%; } }
  @keyframes flowBack { from { offset-distance: 100%; } to { offset-distance: 0%; } }
  .pk1a { offset-path: path("${P_CLIENT_CORE}"); animation-name: flowFwd; animation-duration: 3.4s; }
  .pk1b { offset-path: path("${P_CLIENT_CORE}"); animation-name: flowBack; animation-duration: 3.4s; animation-delay: -1.7s; }
  .pk2a { offset-path: path("${P_CORE_DB}"); animation-name: flowFwd; animation-duration: 3s; animation-delay: -0.8s; }
  .pk2b { offset-path: path("${P_CORE_DB}"); animation-name: flowBack; animation-duration: 3s; animation-delay: -2.3s; }
  .pk3 { offset-path: path("${P_DB_CORE}"); animation-name: flowFwd; animation-duration: 3s; animation-delay: -0.3s; }
  .pk3b { offset-path: path("${P_DB_CORE}"); animation-name: flowBack; animation-duration: 3s; animation-delay: -1.8s; }
  .pk4 { offset-path: path("${P_CORE_CLIENT}"); animation-name: flowFwd; animation-duration: 3.4s; animation-delay: -1s; }
  .pk4b { offset-path: path("${P_CORE_CLIENT}"); animation-name: flowBack; animation-duration: 3.4s; animation-delay: -2.7s; }
  .pk5a { offset-path: path("${P_DB_RELEASE}"); animation-name: flowFwd; animation-duration: 3.2s; animation-delay: -0.6s; }
  .pk5b { offset-path: path("${P_DB_RELEASE}"); animation-name: flowBack; animation-duration: 3.2s; animation-delay: -2.2s; }
  @keyframes pingring { 0% { transform: scale(0.3); opacity: 0.7; } 100% { transform: scale(1.6); opacity: 0; } }
  .ping { transform-box: fill-box; transform-origin: center; animation: pingring 1.9s cubic-bezier(0,0,0.2,1) infinite; }
  .ping2 { transform-box: fill-box; transform-origin: center; animation: pingring 1.9s cubic-bezier(0,0,0.2,1) infinite; animation-delay: -0.95s; }
  @keyframes iops { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.6; } }
  .iops { animation: iops 1.15s ease-in-out infinite; }
  .iops2 { animation: iops 1.15s ease-in-out infinite; animation-delay: -0.575s; }
  @keyframes ringbreath { 0%, 100% { transform: scale(1); opacity: 0.25; } 50% { transform: scale(1.06); opacity: 0.05; } }
  .ringbreath { transform-box: fill-box; transform-origin: center; animation: ringbreath 2.2s ease-in-out infinite; }
  @keyframes codeline { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.7; } }
  .codeline { animation: codeline 2.8s ease-in-out infinite; }
  .codeline2 { animation: codeline 2.8s ease-in-out infinite; animation-delay: -0.95s; }
  .codeline3 { animation: codeline 2.8s ease-in-out infinite; animation-delay: -1.9s; }
  @keyframes caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
  .caret { animation: caret 1.1s step-end infinite; }
  @keyframes corePulse { 0%, 100% { transform: scale(1); opacity: 0.75; } 50% { transform: scale(1.5); opacity: 0.25; } }
  .corepulse { transform-box: fill-box; transform-origin: center; animation: corePulse 2.1s ease-in-out infinite; }
  @keyframes coreWave { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.8); opacity: 0; } }
  .corewave { transform-box: fill-box; transform-origin: center; animation: coreWave 2.1s ease-in-out infinite; }
  @keyframes dbblink { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.9; } }
  .dbblink { animation: dbblink 1.5s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .pkt, .ping, .ping2, .iops, .iops2, .ringbreath, .codeline, .codeline2, .codeline3, .caret, .corepulse, .corewave, .dbblink { animation: none !important; }
  }
`;

const DataFlowDiagram = ({ className = "w-[300px] h-[300px]", delay = 1 }) => {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [phase, setPhase] = useState<Phase>("overview");
  const reduced = useReducedMotion();

  const viewBox = useMotionValue("0 0 320 320");
  const tab = useMotionValue(1);
  const pkt1 = useMotionValue("0%");
  const pkt2 = useMotionValue("0%");
  const pkt3 = useMotionValue("0%");

  const tabX = useTransform(tab, (v) => {
    const c = Math.min(Math.max(v, 0), 2);
    const i = Math.floor(c);
    const f = c - i;
    const j = Math.min(i + 1, 2);
    return TAB_POS[i] + (TAB_POS[j] - TAB_POS[i]) * f;
  });
  const archOpacity = useTransform(tab, (v) => (v < 0.5 ? 0.95 : 0.5));
  const designOpacity = useTransform(tab, (v) => (v >= 0.5 && v < 1.5 ? 0.95 : 0.5));
  const codeOpacity = useTransform(tab, (v) => (v >= 1.5 ? 0.95 : 0.5));

  const nodeOpacity = (node: NodeId) => (hovered === null || hovered === node ? 1 : 0.4);
  const labelFill = (node: NodeId) => (hovered === node || phase === node ? "#c7d2fe" : "#818cf8");
  const labelOpacity = (node: NodeId) => (hovered === node || phase === node ? 1 : 0.6);

  useEffect(() => {
    if (reduced) return;

    const anims: AnimationPlaybackControls[] = [];
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const cam = (frame: Frame, duration: number, ease: Easing = CAM_EASE) => {
      const anim = animate(viewBox, `${frame.x} ${frame.y} ${frame.w} ${frame.h}`, { duration, ease });
      anims.push(anim);
      return anim;
    };
    const travel = (mv: MotionValue<string>, duration: number) => {
      const anim = animate(mv, "100%", { duration, ease: CAM_EASE });
      anims.push(anim);
      return anim;
    };
    const tabTo = (target: number, duration: number) => {
      const anim = animate(tab, target, { duration, ease: CAM_EASE });
      anims.push(anim);
      return anim;
    };

    const run = async () => {
      await wait(900 + delay * 1000);
      while (!cancelled) {
        setPhase("client");
        await cam(SHOTS.client, 1.6);
        await wait(1500);
        if (cancelled) return;

        setPhase("transit");
        pkt1.set("0%");
        await Promise.all([cam(SHOTS.transit, 2.0), travel(pkt1, 2.0)]);
        await wait(600);
        if (cancelled) return;

        setPhase("core");
        await cam(SHOTS.core, 1.3);
        tab.set(0);
        await tabTo(1, 1.0);
        await tabTo(2, 1.0);
        await wait(500);
        if (cancelled) return;

        setPhase("deploy");
        pkt2.set("0%");
        await Promise.all([cam(SHOTS.transitDb, 1.5), travel(pkt2, 1.5)]);
        await cam(SHOTS.db, 1.3);
        await wait(1400);
        if (cancelled) return;

        setPhase("release");
        pkt3.set("0%");
        await Promise.all([cam(SHOTS.release, 1.3), travel(pkt3, 1.3)]);
        await wait(1600);
        if (cancelled) return;

        setPhase("overview");
        await cam(SHOTS.full, 2.4);
        tab.set(1);
        await wait(4600);
      }
    };

    run();
    return () => {
      cancelled = true;
      anims.forEach((anim) => anim.stop());
    };
  }, [reduced, delay, viewBox, tab, pkt1, pkt2, pkt3]);

  const packetClasses = [
    { cls: "pk1a", delay: "0s" },
    { cls: "pk1b", delay: "0s" },
    { cls: "pk2a", delay: "0s" },
    { cls: "pk2b", delay: "0s" },
    { cls: "pk3", delay: "0s" },
    { cls: "pk3b", delay: "0s" },
    { cls: "pk4", delay: "0s" },
    { cls: "pk4b", delay: "0s" },
    { cls: "pk5a", delay: "0s" },
    { cls: "pk5b", delay: "0s" },
  ];

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay }}
      style={{ willChange: "transform" }}
    >
      <style>{motionCss}</style>
      <motion.svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-indigo-500"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tierClient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="tierServer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="tierDb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* ── Background grid ── */}
        <g stroke="#818cf8" strokeWidth="0.3" opacity="0.06">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={`bg-h${i}`} x1="0" y1={40 * i} x2="320" y2={40 * i} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={`bg-v${i}`} x1={40 * i} y1="0" x2={40 * i} y2="320" />
          ))}
        </g>

        {/* ── Interconnect traces ── */}
        {connections.map((conn) => {
          const lit = hovered !== null && conn.nodes.includes(hovered);
          const dim = hovered !== null && !conn.nodes.includes(hovered);
          return (
            <path
              key={conn.id}
              d={conn.d}
              stroke="#818cf8"
              strokeWidth={lit ? 0.9 : 0.5}
              opacity={lit ? 0.85 : dim ? 0.06 : conn.opacity}
              fill="none"
              strokeLinejoin="round"
              strokeDasharray={conn.dashed ? "2 3" : undefined}
              style={{ transition: "opacity 250ms ease, stroke-width 250ms ease" }}
            />
          );
        })}

        {/* Connection dots - endpoint nodes */}
        <g fill="#818cf8" opacity="0.5">
          <circle cx="80" cy="130" r="1.5" />
          <circle cx="115" cy="62" r="1.5" />
          <circle cx="205" cy="62" r="1.5" />
          <circle cx="240" cy="118" r="1.5" />
          <circle cx="240" cy="155" r="1.5" />
          <circle cx="205" cy="95" r="1.5" />
          <circle cx="115" cy="95" r="1.5" />
          <circle cx="80" cy="155" r="1.5" />
          <circle cx="267.5" cy="168" r="1.5" />
          <circle cx="267.5" cy="205" r="1.5" />
          <circle cx="200" cy="205" r="1.5" />
          <circle cx="200" cy="226" r="1.5" />
        </g>
        <circle cx="145" cy="62" r="0.75" fill="#818cf8" opacity="0.15" />
        <circle cx="175" cy="62" r="0.75" fill="#818cf8" opacity="0.1" />
        <circle cx="215" cy="95" r="0.75" fill="#818cf8" opacity="0.1" />

        {/* ── Tier 1: Client (Browser / Frontend) ── */}
        <g
          onMouseEnter={() => setHovered("client")}
          onMouseLeave={() => setHovered(null)}
          style={{ transition: "opacity 250ms ease" }}
          opacity={nodeOpacity("client")}
          className="cursor-pointer"
        >
          {/* Monitor screen */}
          <rect x="20" y="115" width="60" height="42" rx="2" stroke="#818cf8" strokeWidth="0.5" fill="url(#tierClient)" />
          {/* Inner screen */}
          <rect x="25" y="120" width="50" height="32" rx="1" stroke="#818cf8" strokeWidth="0.3" opacity="0.15" />
          {/* Request preparation / inputs */}
          <rect x="27" y="127" width="40" height="1.2" rx="0.6" fill="#a5b4fc" opacity="0.35" />
          <rect x="27" y="133" width="48" height="1.2" rx="0.6" fill="#818cf8" opacity="0.25" />
          <rect x="27" y="139" width="30" height="1.2" rx="0.6" fill="#818cf8" opacity="0.3" />
          {phase === "client" && (
            <rect x="60" y="136.5" width="1.5" height="5" rx="0.75" fill="#a5b4fc" className="caret" />
          )}
          {/* Stand */}
          <rect x="45" y="157" width="10" height="6" stroke="#818cf8" strokeWidth="0.4" opacity="0.3" />
          {/* Base */}
          <rect x="38" y="163" width="24" height="3" rx="1" stroke="#818cf8" strokeWidth="0.4" opacity="0.3" />
          {/* Signal indicator */}
          <circle cx="28" cy="120" r="1" fill="#818cf8" opacity="0.4" />
          <circle cx="28" cy="120" r="3" stroke="#818cf8" strokeWidth="0.2" opacity="0.1" fill="none" />
          {/* Outgoing request ping */}
          <g className="ping">
            <circle cx="50" cy="150" r="4.5" stroke="#818cf8" strokeWidth="0.5" fill="none" />
          </g>
          <g className="ping2">
            <circle cx="50" cy="150" r="4.5" stroke="#818cf8" strokeWidth="0.5" fill="none" />
          </g>
          <polyline points="82,127 86,130 82,133" stroke="#a5b4fc" strokeWidth="0.5" fill="none" opacity="0.5" />
          {/* Labels */}
          <text
            x="50"
            y="177"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 6.5, letterSpacing: "0.12em" }}
            fill={labelFill("client")}
            opacity={labelOpacity("client")}
          >
            CLIENT
          </text>
          <rect x="36" y="180" width="28" height="8" rx="4" fill="#818cf8" opacity="0.06" stroke="#818cf8" strokeWidth="0.3" strokeOpacity="0.25" />
          <text
            x="50"
            y="186"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 5, letterSpacing: "0.15em" }}
            fill={labelFill("client")}
            opacity={labelOpacity("client")}
          >
            ● REQUEST
          </text>
        </g>

        {/* ── Tier 2: Core Engine (Next.js / Node.js) ── */}
        <g
          onMouseEnter={() => setHovered("core")}
          onMouseLeave={() => setHovered(null)}
          style={{ transition: "opacity 250ms ease" }}
          opacity={nodeOpacity("core")}
          className="cursor-pointer"
        >
          {/* Chassis */}
          <rect x="115" y="25" width="90" height="75" rx="3" stroke="#818cf8" strokeWidth="0.5" fill="url(#tierServer)" />
          {/* Tabs */}
          <motion.text x="119" y="37" className="font-mono" style={{ fontSize: 5.5 }} fill="#a5b4fc" opacity={archOpacity}>[ARCH]</motion.text>
          <motion.text x="145" y="37" className="font-mono" style={{ fontSize: 5.5 }} fill="#a5b4fc" opacity={designOpacity}>[DESIGN]</motion.text>
          <motion.text x="178" y="37" className="font-mono" style={{ fontSize: 5.5 }} fill="#a5b4fc" opacity={codeOpacity}>[CODE]</motion.text>
          {/* Active tab underline (GPU transform) */}
          <motion.rect x="0" y="39.5" width="20" height="1.2" rx="0.6" fill="#a5b4fc" style={{ x: tabX }} />
          {/* Divider */}
          <line x1="117" y1="44" x2="203" y2="44" stroke="#818cf8" strokeWidth="0.25" opacity="0.12" />
          {/* Code / telemetry lines */}
          <rect x="120" y="50" width="36" height="1.5" rx="0.75" fill="#a5b4fc" className="codeline" />
          <rect x="120" y="57" width="60" height="1.5" rx="0.75" fill="#818cf8" className="codeline2" />
          <rect x="120" y="64" width="26" height="1.5" rx="0.75" fill="#a5b4fc" className="codeline3" />
          <rect x="120" y="71" width="48" height="1.5" rx="0.75" fill="#818cf8" className="codeline" />
          {/* Caret */}
          <rect x="170" y="69" width="2" height="5" rx="0.5" fill="#a5b4fc" className="caret" />
          {/* Status LEDs */}
          <circle cx="190" cy="50" r="1.5" fill="#818cf8" opacity="0.5" />
          <circle cx="196" cy="50" r="1.5" fill="#818cf8" opacity="0.2" />
          {/* Processing indicator */}
          <g className="corewave">
            <circle cx="160" cy="88" r="5" stroke="#818cf8" strokeWidth="0.3" fill="none" />
          </g>
          <circle cx="160" cy="88" r="2" fill="#a5b4fc" className="corepulse" />
          {/* Labels */}
          <text
            x="160"
            y="110"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 6.5, letterSpacing: "0.12em" }}
            fill={labelFill("core")}
            opacity={labelOpacity("core")}
          >
            CORE ENGINE
          </text>
          <rect x="142" y="113" width="36" height="8" rx="4" fill="#818cf8" opacity="0.06" stroke="#818cf8" strokeWidth="0.3" strokeOpacity="0.25" />
          <text
            x="160"
            y="119"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 5, letterSpacing: "0.15em" }}
            fill={labelFill("core")}
            opacity={labelOpacity("core")}
          >
            ● RUNNING
          </text>
        </g>

        {/* ── Tier 3: Database ── */}
        <g
          onMouseEnter={() => setHovered("db")}
          onMouseLeave={() => setHovered(null)}
          style={{ transition: "opacity 250ms ease" }}
          opacity={nodeOpacity("db")}
          className="cursor-pointer"
        >
          {/* Glowing accent rings */}
          <ellipse cx="267.5" cy="143" rx="42" ry="11" stroke="#818cf8" strokeWidth="0.3" fill="none" className="ringbreath" />
          <ellipse cx="267.5" cy="143" rx="50" ry="13" stroke="#818cf8" strokeWidth="0.2" opacity="0.08" fill="none" />
          {/* Cylinder top ellipse */}
          <ellipse cx="267.5" cy="118" rx="27.5" ry="7" stroke="#818cf8" strokeWidth="0.5" fill="url(#tierDb)" />
          {/* Cylinder body */}
          <path d="M 240 118 L 240 168" stroke="#818cf8" strokeWidth="0.5" />
          <path d="M 295 118 L 295 168" stroke="#818cf8" strokeWidth="0.5" />
          {/* Cylinder bottom arc */}
          <path d="M 240 168 A 27.5 7 0 0 0 295 168" stroke="#818cf8" strokeWidth="0.5" fill="none" />
          {/* Horizontal rack lines */}
          <line x1="240" y1="130" x2="295" y2="130" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <line x1="240" y1="142" x2="295" y2="142" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <line x1="240" y1="154" x2="295" y2="154" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          {/* IOPS indicators */}
          <circle cx="260" cy="143" r="1" fill="#a5b4fc" className="iops" />
          <circle cx="275" cy="143" r="1" fill="#a5b4fc" className="iops2" />
          <circle cx="267.5" cy="143" r="1" fill="#a5b4fc" className="dbblink" />
          {/* Labels */}
          <text
            x="267.5"
            y="184"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 6.5, letterSpacing: "0.12em" }}
            fill={labelFill("db")}
            opacity={labelOpacity("db")}
          >
            DATABASE
          </text>
          <rect x="248" y="187" width="39" height="8" rx="4" fill="#818cf8" opacity="0.06" stroke="#818cf8" strokeWidth="0.3" strokeOpacity="0.25" />
          <text
            x="267.5"
            y="193"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 5, letterSpacing: "0.15em" }}
            fill={labelFill("db")}
            opacity={labelOpacity("db")}
          >
            ● IOPS
          </text>
        </g>

        {/* ── Tier 4: Live Release / Display ── */}
        <g
          onMouseEnter={() => setHovered("release")}
          onMouseLeave={() => setHovered(null)}
          style={{ transition: "opacity 250ms ease" }}
          opacity={nodeOpacity("release")}
          className="cursor-pointer"
        >
          {/* Browser frame */}
          <rect x="155" y="228" width="90" height="60" rx="3" stroke="#818cf8" strokeWidth="0.5" fill="url(#tierServer)" />
          <line x1="155" y1="234" x2="245" y2="234" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <circle cx="160.5" cy="231.5" r="1" fill="#818cf8" opacity="0.4" />
          <circle cx="165" cy="231.5" r="1" fill="#818cf8" opacity="0.25" />
          {/* Rendered viewport */}
          <rect x="159" y="238" width="82" height="32" rx="1" stroke="#818cf8" strokeWidth="0.25" opacity="0.15" fill="none" />
          <rect x="162" y="243" width="34" height="1.5" rx="0.75" fill="#a5b4fc" opacity="0.6" />
          <rect x="162" y="249" width="22" height="1.5" rx="0.75" fill="#818cf8" opacity="0.3" />
          {/* Output chart */}
          <rect x="212" y="253" width="5" height="6" rx="1" fill="#a5b4fc" className="iops" />
          <rect x="219" y="248" width="5" height="11" rx="1" fill="#818cf8" className="iops2" />
          <rect x="226" y="255" width="5" height="4" rx="1" fill="#a5b4fc" className="iops" />
          <line x1="209" y1="262" x2="234" y2="262" stroke="#818cf8" strokeWidth="0.25" opacity="0.25" />
          {/* LIVE indicator */}
          <circle cx="235" cy="247" r="1.2" fill="#a5b4fc" className="dbblink" />
          <text x="239" y="249" className="font-mono" style={{ fontSize: 4.5 }} fill="#a5b4fc" opacity="0.8">
            LIVE
          </text>
          {/* Labels */}
          <text
            x="200"
            y="296"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 6.5, letterSpacing: "0.12em" }}
            fill={labelFill("release")}
            opacity={labelOpacity("release")}
          >
            LIVE RELEASE
          </text>
          <rect x="181" y="299" width="38" height="8" rx="4" fill="#818cf8" opacity="0.06" stroke="#818cf8" strokeWidth="0.3" strokeOpacity="0.25" />
          <text
            x="200"
            y="305"
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 5, letterSpacing: "0.15em" }}
            fill={labelFill("release")}
            opacity={labelOpacity("release")}
          >
            ● DEPLOYED
          </text>
        </g>

        {/* ── Data packets (offset-path motion, reduced-motion aware) ── */}
        <g>
          {packetClasses.map((p) => (
            <g key={p.cls}>
              <circle className={`pkt ${p.cls}`} r="4.5" fill="#818cf8" opacity="0.18" />
              <circle className={`pkt ${p.cls}`} r="2.2" fill="#a5b4fc" />
            </g>
          ))}
        </g>

        {/* ── Storyboard camera packets (phase-gated) ── */}
        {phase === "transit" && (
          <g>
            <motion.circle r="5" fill="#818cf8" opacity="0.2" style={{ offsetPath: `path("${P_CLIENT_CORE}")`, offsetDistance: pkt1 }} />
            <motion.circle r="2.4" fill="#a5b4fc" style={{ offsetPath: `path("${P_CLIENT_CORE}")`, offsetDistance: pkt1 }} />
          </g>
        )}
        {phase === "deploy" && (
          <g>
            <motion.circle r="5" fill="#818cf8" opacity="0.2" style={{ offsetPath: `path("${P_CORE_DB}")`, offsetDistance: pkt2 }} />
            <motion.circle r="2.4" fill="#a5b4fc" style={{ offsetPath: `path("${P_CORE_DB}")`, offsetDistance: pkt2 }} />
          </g>
        )}
        {phase === "release" && (
          <g>
            <motion.circle r="5" fill="#818cf8" opacity="0.2" style={{ offsetPath: `path("${P_DB_RELEASE}")`, offsetDistance: pkt3 }} />
            <motion.circle r="2.4" fill="#a5b4fc" style={{ offsetPath: `path("${P_DB_RELEASE}")`, offsetDistance: pkt3 }} />
          </g>
        )}

        {/* Sub-nodes / interface dots on each tier */}
        <g fill="#818cf8">
          <circle cx="80" cy="145" r="1" opacity="0.2" />
          <circle cx="80" cy="140" r="0.5" opacity="0.1" />
          <circle cx="115" cy="75" r="1" opacity="0.2" />
          <circle cx="120" cy="35" r="0.5" opacity="0.15" />
          <circle cx="200" cy="85" r="0.5" opacity="0.15" />
          <circle cx="200" cy="240" r="0.5" opacity="0.15" />
        </g>
      </motion.svg>
    </motion.div>
  );
};

export default DataFlowDiagram;
