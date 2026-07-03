"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const flatlinePoints = [
  "0,120", "10,60", "20,80", "30,30", "40,90", "50,50",
  "60,70", "70,20", "80,100", "90,40", "100,60",
  "110,110", "120,120", "130,120", "140,120", "150,120",
  "160,120", "170,120", "180,120", "190,120", "200,120",
];

export default function NotFound() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [reconnecting, setReconnecting] = useState(false);

  const handleReconnect = useCallback(() => {
    setReconnecting(true);
    setTimeout(() => setReconnecting(false), 3000);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs mb-12">
        <svg
          ref={svgRef}
          viewBox="0 0 200 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0" y1={20 + i * 25}
              x2="200" y2={20 + i * 25}
              stroke="#27272a"
              strokeWidth="0.3"
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`v${i}`}
              x1={40 + i * 40} y1="20"
              x2={40 + i * 40} y2="140"
              stroke="#27272a"
              strokeWidth="0.3"
            />
          ))}

          {/* Signal line */}
          <motion.path
            d={`M ${flatlinePoints.join(" L ")}`}
            stroke="#818cf8"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 1 }}
            animate={
              reconnecting
                ? {
                    pathLength: [1, 0, 1],
                  }
                : { pathLength: 1 }
            }
            transition={
              reconnecting
                ? { duration: 1.5, ease: "easeInOut" }
                : {}
            }
          />

          {/* Flatline dot */}
          <motion.circle
            cx="200"
            cy="120"
            r="1.5"
            fill="#818cf8"
            animate={
              reconnecting
                ? { opacity: [0, 1, 0] }
                : { opacity: 0.6 }
            }
            transition={
              reconnecting
                ? { duration: 2, repeat: Infinity }
                : {}
            }
          />

          {/* Blip before flatline */}
          <circle cx="90" cy="40" r="1" fill="#818cf8" opacity="0.4" />
          <line x1="90" y1="40" x2="90" y2="120" stroke="#818cf8" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 2" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Signal Lost
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
          404<span className="text-indigo-500">.</span>
        </h1>

        <p className="text-zinc-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
          The route you requested does not exist on this server. 
          The connection was terminated.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            onClick={handleReconnect}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 font-mono text-xs uppercase tracking-[0.2em] hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300"
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
