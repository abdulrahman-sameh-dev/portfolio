"use client";
import { motion } from "motion/react";

const DataFlowDiagram = ({ className = "w-[300px] h-[300px]", delay = 1 }) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay }}
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-indigo-500"
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

        {/* ── Tier 1: Client (Browser / Frontend) ── */}
        <g>
          {/* Monitor screen */}
          <rect x="20" y="115" width="60" height="42" rx="2" stroke="#818cf8" strokeWidth="0.5" fill="url(#tierClient)" />
          {/* Inner screen */}
          <rect x="25" y="120" width="50" height="32" rx="1" stroke="#818cf8" strokeWidth="0.3" opacity="0.15" />
          {/* Stand */}
          <rect x="45" y="157" width="10" height="6" stroke="#818cf8" strokeWidth="0.4" opacity="0.3" />
          {/* Base */}
          <rect x="38" y="163" width="24" height="3" rx="1" stroke="#818cf8" strokeWidth="0.4" opacity="0.3" />
          {/* Label dot */}
          <circle cx="50" cy="150" r="1" fill="#818cf8" opacity="0.15" />
          {/* Signal indicator */}
          <circle cx="28" cy="120" r="1" fill="#818cf8" opacity="0.4" />
          <circle cx="28" cy="120" r="3" stroke="#818cf8" strokeWidth="0.2" opacity="0.1" fill="none" />
        </g>

        {/* ── Tier 2: Server (Next.js / Node.js) ── */}
        <g>
          {/* Chassis */}
          <rect x="115" y="25" width="90" height="75" rx="3" stroke="#818cf8" strokeWidth="0.5" fill="url(#tierServer)" />
          {/* Rack ventilation lines */}
          <line x1="122" y1="40" x2="198" y2="40" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <line x1="122" y1="50" x2="198" y2="50" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <line x1="122" y1="60" x2="198" y2="60" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <line x1="122" y1="70" x2="198" y2="70" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          <line x1="122" y1="80" x2="198" y2="80" stroke="#818cf8" strokeWidth="0.25" opacity="0.2" />
          {/* Status LEDs */}
          <circle cx="190" cy="33" r="1.5" fill="#818cf8" opacity="0.5" />
          <circle cx="196" cy="33" r="1.5" fill="#818cf8" opacity="0.2" />
          {/* Processing indicator (pulsing dot) */}
          <circle cx="160" cy="55" r="2" fill="#a5b4fc" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="160" cy="55" r="5" stroke="#818cf8" strokeWidth="0.2" opacity="0.1" fill="none">
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0;0.1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ── Tier 3: Database ── */}
        <g>
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
          {/* DB activity indicator */}
          <circle cx="267.5" cy="143" r="1" fill="#a5b4fc" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ── Interconnect traces ── */}

        {/* Request path: Client → Server (up-right) */}
        <path
          d="M 80 130 L 100 130 L 100 62 L 115 62"
          stroke="#818cf8"
          strokeWidth="0.5"
          opacity="0.25"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Via at 45° bend */}
        <circle cx="100" cy="130" r="1" fill="#818cf8" opacity="0.3" />
        <circle cx="100" cy="62" r="1" fill="#818cf8" opacity="0.3" />

        {/* Query path: Server → Database (right) */}
        <path
          d="M 205 62 L 225 62 L 225 118 L 240 118"
          stroke="#818cf8"
          strokeWidth="0.5"
          opacity="0.25"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="225" cy="62" r="1" fill="#818cf8" opacity="0.3" />
        <circle cx="225" cy="118" r="1" fill="#818cf8" opacity="0.3" />

        {/* Response path: Database → Server (left, lower) */}
        <path
          d="M 240 155 L 225 155 L 225 95 L 205 95"
          stroke="#818cf8"
          strokeWidth="0.5"
          opacity="0.2"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="225" cy="155" r="1" fill="#818cf8" opacity="0.3" />
        <circle cx="225" cy="95" r="1" fill="#818cf8" opacity="0.3" />

        {/* Response path: Server → Client (left, lower) */}
        <path
          d="M 115 95 L 100 95 L 100 155 L 80 155"
          stroke="#818cf8"
          strokeWidth="0.5"
          opacity="0.2"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="95" r="1" fill="#818cf8" opacity="0.3" />
        <circle cx="100" cy="155" r="1" fill="#818cf8" opacity="0.3" />

        {/* Cache hint: smaller inner path between server and db */}
        <path
          d="M 160 100 L 160 110 L 205 110"
          stroke="#818cf8"
          strokeWidth="0.3"
          opacity="0.08"
          fill="none"
          strokeDasharray="2 3"
        />

        {/* ── Data packets (animateMotion) ── */}

        {/* Packet 1: Client → Server (request) */}
        <circle r="2" fill="#a5b4fc" opacity="0.9">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 80 130 L 100 130 L 100 62 L 115 62"
          />
        </circle>

        {/* Packet 2: Server → Database (query) */}
        <circle r="2" fill="#a5b4fc" opacity="0.9">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
            path="M 205 62 L 225 62 L 225 118 L 240 118"
          />
        </circle>

        {/* Packet 3: Database → Server (response) */}
        <circle r="1.5" fill="#818cf8" opacity="0.7">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="3s"
            path="M 240 155 L 225 155 L 225 95 L 205 95"
          />
        </circle>

        {/* Packet 4: Server → Client (response) */}
        <circle r="1.5" fill="#818cf8" opacity="0.7">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="4.5s"
            path="M 115 95 L 100 95 L 100 155 L 80 155"
          />
        </circle>

        {/* ── Schematic annotations ── */}

        {/* Connection dots - endpoint nodes */}
        <circle cx="80" cy="130" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="115" cy="62" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="205" cy="62" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="240" cy="118" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="240" cy="155" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="205" cy="95" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="115" cy="95" r="1.5" fill="#818cf8" opacity="0.5" />
        <circle cx="80" cy="155" r="1.5" fill="#818cf8" opacity="0.5" />

        {/* Sub-nodes / interface dots on each tier */}
        <circle cx="80" cy="145" r="1" fill="#818cf8" opacity="0.2" />
        <circle cx="80" cy="140" r="0.5" fill="#818cf8" opacity="0.1" />
        <circle cx="115" cy="75" r="1" fill="#818cf8" opacity="0.2" />
        <circle cx="120" cy="35" r="0.5" fill="#818cf8" opacity="0.15" />
        <circle cx="200" cy="85" r="0.5" fill="#818cf8" opacity="0.15" />

        {/* Signal status dots on interconnect lines */}
        <circle cx="145" cy="62" r="0.75" fill="#818cf8" opacity="0.15" />
        <circle cx="175" cy="62" r="0.75" fill="#818cf8" opacity="0.1" />
        <circle cx="215" cy="95" r="0.75" fill="#818cf8" opacity="0.1" />

      </svg>
    </motion.div>
  );
};

export default DataFlowDiagram;
