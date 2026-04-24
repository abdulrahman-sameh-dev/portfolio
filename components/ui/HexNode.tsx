"use client";
import React, { useId } from "react";
import { motion } from "framer-motion"; // تأكد من اسم المكتبة عندك لو هي motion/react

const HexNode = ({ className = "w-[300px] h-[300px]", delay = 1 }) => {
  const uniqueId = useId().replace(/:/g, ""); // توليد ID فريد للـ Gradients
  const nodes = [
    { x: 115, y: -15, r: 30 },
    { x: 38, y: -59, r: -150, delay: 500 },
    { x: -38, y: -59, r: -210, reflect: true },
    { x: -115, y: -15, r: -30, reflect: true },
    { x: -40, y: 56, r: 30 },
    { x: 37, y: 56, r: -30, reflect: true },
  ];

  const DataNode = [
    { x: -135, y: -115, r: 0 },
    { x: 38, y: -59, r: -150, delay: 500 },
    { x: -38, y: -59, r: -210, reflect: true },
    { x: -115, y: -15, r: -30, reflect: true },
    { x: -40, y: 56, r: 30 },
    { x: 37, y: 56, r: -30, reflect: true },
  ];

  const originalPath =
    "M82.3787 12.7861C82.3787 12.7861 77.9127 20.9517 75.0287 25.9501L89.95 51.7945L103.885 51.7945L134.54 104.889L127.658 116.809L112.435 116.809L105.553 104.889L75.026 104.889L67.4117 116.809L7.38206 116.809L3.45748e-06 104.022L7.38206 91.2364L21.8821 91.2364L37.2885 64.5517L29.9232 51.7945L59.8267 5.23022e-06L74.9967 6.55642e-06L82.3787 12.7861ZM59.8267 51.7945L44.6873 78.0169L52.3196 91.2364L82.3787 91.2364L89.95 78.1227L74.7494 51.7945L59.8267 51.7945Z";

  const reflectedPath =
    "M52.1609 12.7861C52.1609 12.7861 56.6269 20.9517 59.511 25.9501L44.5897 51.7945L30.6543 51.7945L9.16972e-06 104.889L6.88159 116.809L22.1048 116.809L28.9864 104.889L59.5136 104.889L67.128 116.809L127.158 116.809L134.54 104.022L127.158 91.2364L112.658 91.2364L97.2511 64.5517L104.617 51.7945L74.7129 5.23022e-06L59.543 6.55642e-06L52.1609 12.7861ZM74.7129 51.7945L89.8524 78.0169L82.2201 91.2364L52.1609 91.2364L44.5897 78.1227L59.7903 51.7945L74.7129 51.7945Z";
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
        className="w-full h-full drop-shadow-[0_0_30px_rgba(126,34,206,0.2)]"
      >
        {/* 1. Main Structure */}
        <motion.g id={`main-structure-${uniqueId}`}>
          <path
            d="M318.215 92.0163V221.591L159.107 313.466L0 221.591V91.8568L159.108 0L318.215 92.0163ZM3.53049 93.8951V219.553L159.107 309.389L314.684 219.553V94.0529L159.107 4.07741L3.53049 93.8951Z"
            fill={`url(#mainGradient-${uniqueId})`}
          />
        </motion.g>

        {/* 2. Inner Core - نبض مع دوران خفيف جداً */}
        {nodes.map((pos, i) => (
          <motion.g
            id={`inner-core-${uniqueId}`}
            key={i}
            // هنا بنحرك الجروب لمكانه وبندوره عشان يكمل الشكل السداسي
            transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r}) `}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={pos.reflect ? reflectedPath : originalPath}
              fill={`url(#coreGradient-${uniqueId})`}
              transform="translate(92, 100)"
            />
          </motion.g>
        ))}

        {/* 3. Data Node - وميض */}
        {/* {DataNode.map((index, i) => (
          <motion.g
            id={`data-node-${uniqueId}`}
            key={i}
            animate={{
              fill: ["#4a4a4a", "#ffffff", "#4a4a4a"],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            transform={`translate(${index.x}, ${index.y}) rotate(${index.r}) `}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          >
            <path
              d="M5.74863 2.5128e-07L-4.39247e-07 10.0488L2.88858 15L14.0934 15L16.875 10.0182L11.2374 0.0024099L5.74863 2.5128e-07Z"
              transform="translate(260, 240) scale(1.5)" // تكبير النقطة شوية عشان تظهر
            />
          </motion.g>
        ))} */}

        <defs>
          <linearGradient
            id={`mainGradient-${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#450a0a" />
            <stop offset="0.5" stopColor="#581c87" />
            <stop offset="1" stopColor="#450a0a" />
          </linearGradient>
          <linearGradient
            id={`coreGradient-${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop stopColor="#7e22ce" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default HexNode;
