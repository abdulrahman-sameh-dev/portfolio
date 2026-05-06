"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {  Box, Globe, Zap } from "lucide-react";

export default function AboutPage() {
  const experiences = [
    { 
      year: "2023", 
      title: "The Genesis", 
      role: "System Exploration & Logic Foundations", 
      current: false 
    },
    { 
      year: "2024", 
      title: "Skill Synthesis", 
      role: "Experimental Projects & Code Evolution",
      current: false 
    },
    { 
      year: "2025", 
      title: "Eaalim Meet", 
      role: "Full Stack Development & Real-time Systems", 
      current: false 
    },
    { 
      year: "2026", 
      title: "Red Connect", 
      role: "System Architect & Lead Developer", 
      current: true
    },
  ];

  const stepDuration = 0.6;
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-24 max-w-7xl mx-auto">
      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-20 space-y-4 font-mono border-l-2 border-indigo-600 pl-6"
      >
        <p className="text-indigo-500 text-sm tracking-widest uppercase">
          / Root / Abdulrahman / Identity
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Architecting digital systems with an{" "}
          <span className="text-zinc-500 italic">Engineering Mindset.</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl leading-relaxed">
          I'm Abdulrahman Sameh, a 22-year-old Full Stack Developer building
          scalable architectures with Next.js and TypeScript. My work is defined
          by minimalist aesthetics and robust system structure.
        </p>
      </motion.div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT & CENTER COLUMN (8 Cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Enhanced Stack Card */}
          <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-md flex flex-col min-h-[300px] group transition-all duration-500 hover:border-indigo-500/30">
  <div className="flex justify-between items-start mb-10">
    <div className="space-y-1">
      <h3 className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em]">
        Core Engine
      </h3>
      <p className="text-zinc-400 text-xs font-mono">Current Stack: 2026.04-Stable</p>
    </div>
    <div className="flex gap-1">
       {[1, 2, 3].map((i) => (
         <div key={i} className="w-1 h-1 rounded-full bg-indigo-500/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
       ))}
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {[
      { name: "Next.js", icon: "NX", level: "95%" },
      { name: "TypeScript", icon: "TS", level: "90%" },
      { name: "Tailwind", icon: "TW", level: "98%" },
      { name: "Postgres", icon: "PG", level: "85%" },
      { name: "Docker", icon: "DK", level: "80%" },
      { name: "Prisma", icon: "PR", level: "92%" },
      { name: "Framer", icon: "FM", level: "88%" },
      { name: "Node.js", icon: "JS", level: "90%" },
    ].map((tech, i) => (
      <motion.div
        key={tech.name}
        whileHover={{ y: -5 }}
        className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-indigo-500/5 hover:border-indigo-500/40 transition-all cursor-crosshair group/item"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-mono text-indigo-500 font-bold">{tech.icon}</span>
          <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover/item:bg-indigo-500 transition-colors" />
        </div>
        <p className="text-sm font-bold text-zinc-200 mb-1">{tech.name}</p>
        <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: tech.level }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className="h-full bg-indigo-500/50" 
          />
        </div>
      </motion.div>
    ))}
  </div>
</div>

          {/* Refined Philosophy Card */}
          <div className="relative overflow-hidden group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-center min-h-[250px]">
  {/* Background Decoration */}
  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-60 transition-opacity">
    <Zap size={40} className="text-indigo-500" />
  </div>

  <h3 className="absolute top-8 left-8 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em]">
    Principles
  </h3>

  <div className="relative z-10 flex pt-5 flex-col h-full justify-around">
    <p className="text-2xl md:text-3xl font-black leading-tight tracking-tighter text-zinc-200">
      <span className="text-indigo-500">Code</span> is liability, <br />
      <span className="italic text-zinc-500 group-hover:text-zinc-300 transition-colors">Architecture</span> is the asset.
    </p>
  {/* Interactive Bottom Detail */}
              <div className="flex w-full items-center flex-row justify-between">
              <div className="mt-6 items-center ">
      <div className="h-1px w-12 bg-indigo-500/50" />
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        Engineering Mindset v2.0
      </p>
    </div>
    <div className="w-16 h-16 absolute right-0 rounded-full border border-zinc-800 flex items-center mt-4 justify-center group-hover:border-indigo-500/50 transition-colors">
       <Box size={30} className="text-zinc-600 group-hover:text-indigo-400" />
    </div>
  </div>
  </div>

</div>

          {/* Location/Status Card */}
          <div className="p-8 rounded-[2.5rem] bg-indigo-600 flex flex-col justify-between group overflow-hidden relative">
            <Globe
              size={100}
              className="absolute -bottom-4 -right-4 text-indigo-400/20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700"
            />
            <h3 className="text-indigo-200 font-mono text-[10px] uppercase tracking-[0.4em]">
              Base
            </h3>
            <div className="z-10">
              <p className="text-3xl font-black tracking-wider">Giza, Egypt</p>
              <Link
                href={"https://maps.app.goo.gl/ywy3QXCJ7y8EfdQL6"}
                target="_blank"
                className="text-indigo-200 text-xs font-mono uppercase tracking-widest mt-1"
              >
                30°07'59.2"N, 31°03'45.7"E
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 Cols) - Career Timeline */}
        <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-12">
        <Zap size={16} className="text-indigo-500" />
        <h3 className="text-zinc-200 font-bold text-sm uppercase tracking-[0.2em]">
          Career Architecture
        </h3>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col ml-2">
        {experiences.map((exp, index) => {
          const cumulativeDelay = index * stepDuration;
          const isCurrent = exp.current;

          return (
            <div key={index} className="relative pl-10 pb-12 last:pb-0">

              {/* Line */}
              {!isCurrent && (
                <div className="absolute left-[7px] top-[24px] h-[calc(100%-20px)] w-[2px] bg-zinc-800/30">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{
                      duration: stepDuration,
                      delay: cumulativeDelay,
                      ease: "linear",
                    }}
                    className="w-full bg-indigo-500 origin-top"
                  />
                </div>
              )}

              {/* Dot */}
              <div className="absolute left-0 top-[6px] flex items-center justify-center">

                {/* Pulse Effect (only for current) */}
                {isCurrent && (
                  <span className="absolute w-6 h-6 rounded-full bg-indigo-500/30 animate-ping" />
                )}

                <motion.div
                  initial={{
                    borderColor: "#27272a",
                    backgroundColor: "transparent",
                  }}
                  animate={{
                    borderColor: "#6366f1",
                    backgroundColor: "#000",
                  }}
                  transition={{ delay: cumulativeDelay, duration: 0.2 }}
                  className={`
                    rounded-full border-2 z-20 flex items-center justify-center
                    ${isCurrent 
                      ? "w-5 h-5 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]" 
                      : "w-4 h-4 border-zinc-700"
                    }
                  `}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: cumulativeDelay + 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className={`
                      bg-indigo-500 rounded-full
                      ${isCurrent ? "w-2 h-2" : "w-1.5 h-1.5"}
                    `}
                  />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: cumulativeDelay, duration: 0.4 }}
              >
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-[0.2em]">
                  {exp.year}
                </span>

                <div className="flex items-center gap-2">
                  <h4
                    className={`
                      font-bold tracking-tight leading-tight mt-1
                      ${isCurrent 
                        ? "text-white text-xl" 
                        : "text-zinc-300 text-lg"}
                    `}
                  >
                    {exp.title}
                  </h4>

                  {/* Badge */}
                  {isCurrent && (
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-full font-mono">
                      Present
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-500 font-medium font-mono mt-1">
                  {exp.role}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
      </div>
    </div>
  );
}

// "use client";
// import { motion } from "motion/react";
// import HexNode from '@/components/ui/HexNode';

// const HexGrid = () => {
//   // تعريف زوايا ودوران الـ 6 نودز بناءً على الدائرة (0, 60, 120, 180, 240, 300)
//   // Distance هي المسافة من المركز لكل قطعة (تحتاج ضبط بناءً على حجم النود)
//   const distance = 160;

//   const nodes = [
//     { angle: 0, rotate: 0, delay: 0 },
//     { angle: 60, rotate: 60, delay: 0.1 },
//     { angle: 120, rotate: 120, delay: 0.2 },
//     { angle: 180, rotate: 180, delay: 0.3 },
//     { angle: 240, rotate: 240, delay: 0.4 },
//     { angle: 300, rotate: 300, delay: 0.5 },
//   ];

//   return (
//     <div className="relative flex items-center justify-center min-h-screen w-full bg-black overflow-hidden">

//       {/* 1. الطبقة الخلفية: الـ Dynamic Hex Grid */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {nodes.map((node, index) => {
//           // حساب الـ (x, y) باستخدام حساب المثلثات (Cos, Sin)
//           // عشان نوزعهم بدقة في شكل دائري سداسي
//           const x = distance * Math.cos((node.angle * Math.PI) / 180);
//           const y = distance * Math.sin((node.angle * Math.PI) / 180);

//           return (
//             <motion.div
//               key={index}
//               className="absolute"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: node.delay, duration: 1 }}
//               style={{
//                 // التحريك والدوران لكل نود
//                 transform: `translate(${x}px, ${y}px) rotate(${node.rotate}deg)`,
//                 // تأكد إن نقطة الدوران هي السنتر بتاع النود نفسها
//                 transformOrigin: 'center center',
//               }}
//             >
//               {/* حجم النود الواحد. تأكد إنه متفرغ صح */}
//               <HexNode className="w-[200px] h-[200px]" />
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* 2. الطبقة الوسطى: الـ Headline
//       <div className="relative z-10 text-center font-geist">
//         <h1 className="text-9xl font-bold tracking-tighter text-white">
//           Portfolite<span className="text-purple-500">.</span>
//         </h1>
//         <p className="text-zinc-500 text-lg mt-4 font-mono tracking-widest uppercase">
//           Dynamic Systems Architecture
//         </p>
//       </div> */}
//     </div>
//   )
// }

// export default HexGrid
