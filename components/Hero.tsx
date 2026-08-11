"use client";
import { motion } from "motion/react";
import HexNode from "@/components/ui/HexNode";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import Link from "next/link";

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03]">

      {/* ── Main Canvas: Left Panel + Right Monitor ── */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* ── Left Panel: Text Hierarchy ── */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-16 gap-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 md:gap-8"
          >
            <motion.span
              variants={item}
              className="border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-sm md:text-base font-medium px-5 py-3 rounded-xl w-fit backdrop-blur-sm"
            >
              Specialized in Scalable Web Systems
            </motion.span>

            <motion.h1
              variants={item}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Developing High-Performance <br />
              <span className="text-indigo-400">
                Full-Stack Applications.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-xl text-lg md:text-xl text-zinc-400 leading-relaxed"
            >
              Full Stack Developer specialized in Next.js, TypeScript, Node.js & Scalable Architecture.
            </motion.p>

            <motion.div variants={item} className="flex gap-4">
              <Button className="text-white bg-linear-30 from-indigo-700 to-indigo-400 border-0 py-5 px-7 text-base" asChild>
                <Link href={"/#contact"}>
                  Get Started
                </Link>
              </Button>
              <Button className="bg-white/0 text-white hover:bg-white/[0.03] border-indigo-300/40 border py-5 px-7 text-base" asChild>
                <Link href={"/about"}>
                  Learn More <ArrowUpRightIcon />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right Panel: Monitoring Dashboard ── */}
        <div className="lg:w-[45%] xl:w-[42%] flex items-center justify-center p-5 md:p-6 lg:p-8">
          <div className="w-full border border-zinc-800/60 rounded-2xl bg-zinc-900/20 overflow-hidden">

            {/* Monitor Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/30" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
                  <span className="w-2 h-2 rounded-full bg-green-500/30" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  SYSTEM TOPOLOGY
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-wider text-zinc-700">
                v2.4.1
              </span>
            </div>

            {/* Diagram Canvas with Micro-Grid Background */}
            <div
              className="relative bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[20px_20px]"
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(129,140,248,0.04),transparent)] pointer-events-none" />
              <HexNode className="w-full h-auto p-3 md:p-4" />
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom Telemetry Strip ── */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            STATUS: OPERATIONAL
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">STACK:</span> NEXT.JS 16
          </span>
          <span className="font-mono text-[10px] text-zinc-700">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">ENV:</span> PRODUCTION
          </span>
          <span className="font-mono text-[10px] text-zinc-700">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">UPTIME:</span> 99.9%
          </span>
        </div>
      </div>

    </section>
  );
};

export default Hero;
