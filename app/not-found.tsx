"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const BEAT_SEGMENT = [
  [0, 120],
  [18, 120],
  [24, 120],
  [28, 110],
  [32, 132],
  [38, 82],
  [44, 120],
  [52, 120],
  [56, 116],
  [60, 120],
  [72, 120],
  [86, 120],
  [100, 120],
] as const;

const heartbeatPath = Array.from({ length: 6 }, (_, segment) =>
  BEAT_SEGMENT.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x + segment * 100} ${y}`).join(" ")
).join(" ");

export default function NotFound() {
  const reducedMotion = useReducedMotion();
  const [runKey, setRunKey] = useState(0);
  const [flatlineRun, setFlatlineRun] = useState(-1);
  const phase =
    reducedMotion || flatlineRun === runKey ? "flatline" : "live";

  useEffect(() => {
    if (reducedMotion) return;

    const timeout = window.setTimeout(() => setFlatlineRun(runKey), 4200);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, runKey]);

  const handleReconnect = useCallback(() => {
    setRunKey((value) => value + 1);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs mb-12">
        <svg
          viewBox="0 0 200 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={20 + i * 25}
              x2="200"
              y2={20 + i * 25}
              stroke="#27272a"
              strokeWidth="0.3"
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`v${i}`}
              x1={40 + i * 40}
              y1="20"
              x2={40 + i * 40}
              y2="140"
              stroke="#27272a"
              strokeWidth="0.3"
            />
          ))}

          {phase === "live" && (
            <motion.g
              animate={{ x: [0, -100] }}
              transition={{ duration: 1, ease: "linear", repeat: Infinity }}
              style={{ willChange: "transform" }}
            >
              <path
                d={heartbeatPath}
                stroke="#818cf8"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          )}

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "flatline" ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.9 }}
          >
            <path
              d="M 0 120 L 200 120"
              stroke="#818cf8"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="200" cy="120" r="1.5" fill="#818cf8" />
          </motion.g>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              phase === "live" ? "bg-indigo-400" : "bg-zinc-700"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            {phase === "live" ? "Signal Active" : "Flatline"}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              phase === "live" ? "bg-indigo-400" : "bg-zinc-700"
            }`}
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
          404<span className="text-indigo-500">.</span>
        </h1>

        <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-sm mx-auto">
          The route you requested does not exist on this server.
          The connection was terminated.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            onClick={handleReconnect}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 font-mono text-xs uppercase tracking-[0.2em] hover:bg-indigo-500/10 hover:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all duration-300"
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &#9679;
            </motion.span>
            Reconnect
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
