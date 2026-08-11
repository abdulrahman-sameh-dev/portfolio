"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { SchematicZap, SchematicBox, SchematicGlobe } from "@/components/SchematicIcons";

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
    <section className="border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03]">

      {/* ── Monitor Header ── */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/30" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <span className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            PROFILE
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-700">
          v2.4.1
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="p-6 md:p-10 lg:p-12">

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16 space-y-4 font-mono"
        >
          <p className="text-indigo-500 text-sm tracking-widest uppercase">
            / Root / Abdulrahman / Identity
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Architecting digital systems with an{" "}
            <span className="text-zinc-500 italic">Engineering Mindset.</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            I&apos;m Abdulrahman Sameh, a 22-year-old Full Stack Developer building
            scalable architectures with Next.js and TypeScript. My work is defined
            by minimalist aesthetics and robust system structure.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* ── LEFT & CENTER COLUMN (8 Cols) ── */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Stack Card */}
            <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-md flex flex-col min-h-[300px] group transition-all duration-500 hover:border-indigo-500/30">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
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

            {/* Philosophy Card */}
            <div className="relative overflow-hidden group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-center min-h-[250px]">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-60 transition-opacity">
                <SchematicZap className="w-10 h-10 text-indigo-500" />
              </div>

              <div className="relative z-10 flex pt-5 flex-col h-full justify-around">
                <p className="text-2xl md:text-3xl font-black leading-tight tracking-tighter text-zinc-200">
                  <span className="text-indigo-500">Code</span> is liability, <br />
                  <span className="italic text-zinc-500 group-hover:text-zinc-300 transition-colors">Architecture</span> is the asset.
                </p>
                <div className="flex w-full items-center flex-row justify-between">
                  <div className="mt-6 items-center">
                    <div className="h-px w-12 bg-indigo-500/50" />
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Engineering Mindset v2.0
                    </p>
                  </div>
                  <div className="w-16 h-16 absolute right-0 rounded-full border border-zinc-800 flex items-center mt-4 justify-center group-hover:border-indigo-500/50 transition-colors">
                    <SchematicBox className="w-7 h-7 text-zinc-600 group-hover:text-indigo-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card — now tonal, not solid indigo */}
            <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-between group overflow-hidden relative">
              <SchematicGlobe className="w-24 h-24 absolute -bottom-4 -right-4 text-indigo-500/15 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
              <div className="z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Location</span>
                </div>
                <p className="text-3xl font-black tracking-wider text-white">Giza, Egypt</p>
                <Link
                  href={"https://maps.app.goo.gl/ywy3QXCJ7y8EfdQL6"}
                  target="_blank"
                  className="text-indigo-400 text-xs font-mono uppercase tracking-widest mt-1 inline-block hover:text-indigo-300 transition-colors"
                >
                  {`30°07'59.2"N, 31°03'45.7"E`}
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (4 Cols) — Career Timeline ── */}
          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col h-full overflow-hidden">
            
            <div className="flex items-center gap-2 mb-12">
              <SchematicZap className="w-4 h-4 text-indigo-500" />
              <h3 className="text-zinc-200 font-bold text-sm uppercase tracking-[0.2em]">
                Career Architecture
              </h3>
            </div>

            <div className="relative flex flex-col ml-2">
              {experiences.map((exp, index) => {
                const cumulativeDelay = index * stepDuration;
                const isCurrent = exp.current;

                return (
                  <div key={index} className="relative pl-10 pb-12 last:pb-0">

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

                    <div className="absolute left-0 top-[6px] flex items-center justify-center">
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

      {/* ── Telemetry Strip ── */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            STATUS: ACTIVE
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">PROFILE:</span> FULL-STACK ARCHITECT
          </span>
          <span className="font-mono text-[10px] text-zinc-700">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">LOCATION:</span> GIZA, EGYPT
          </span>
          <span className="font-mono text-[10px] text-zinc-700">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">EXPERIENCE:</span> 4 YEARS
          </span>
        </div>
      </div>

    </section>
  );
}
