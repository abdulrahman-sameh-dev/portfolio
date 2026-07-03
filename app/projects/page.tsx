"use client"

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers } from "lucide-react";
import { SchematicStack, SchematicFlow, SchematicPipeline, SchematicNodes } from "@/components/SchematicIcons";

const systems = [
  {
    id: "frontend",
    label: "Frontend Architecture",
    description: "Component-driven design system with Motion-driven micro-interactions and Tailwind CSS 4 token layers.",
    tech: ["Next.js 16", "React 19", "Motion", "Tailwind CSS 4", "TypeScript 5"],
    status: "Live",
    progress: 95,
    Icon: SchematicStack,
  },
  {
    id: "backend",
    label: "Backend Systems",
    description: "RESTful API architecture with Node.js, MongoDB schema design, and real-time WebRTC infrastructure.",
    tech: ["Node.js", "MongoDB", "LiveKit", "WebRTC"],
    status: "Building",
    progress: 65,
    Icon: SchematicFlow,
  },
  {
    id: "devops",
    label: "DevOps & Infrastructure",
    description: "Containerized deployments, CI/CD pipelines, and Linux-based server orchestration.",
    tech: ["Docker", "GitHub Actions", "Linux", "Nginx"],
    status: "Optimizing",
    progress: 50,
    Icon: SchematicPipeline,
  },
  {
    id: "realtime",
    label: "Real-Time Systems",
    description: "Low-latency communication layer powering live events, presence, and data synchronization.",
    tech: ["LiveKit", "WebSockets", "WebRTC"],
    status: "Designing",
    progress: 30,
    Icon: SchematicNodes,
  },
];

export default function Projects() {
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
            SYSTEMS DASHBOARD
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-700">
          v2.4.1
        </span>
      </div>

      {/* ── Content with Micro-Grid Background ── */}
      <div className="relative bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]">
        <div className="relative z-10 p-6 md:p-10 lg:p-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <Layers size={16} className="text-indigo-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
                Active Systems
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
              Architectures<span className="text-indigo-500">.</span>
            </h1>
            <p className="max-w-xl text-zinc-500 text-lg leading-relaxed">
              Systems in active development — each layer is engineered for precision, 
              performance, and production readiness.
            </p>
          </motion.div>

          {/* System Grid */}
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800/50 rounded-3xl overflow-hidden border border-zinc-800/50 mb-10">
            {systems.map((system, index) => {
              const Icon = system.Icon;
              return (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="relative group bg-zinc-900/60 p-8 hover:bg-zinc-900/90 transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-600">
                        {system.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-600">{system.progress}%</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                    {system.label}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {system.description}
                  </p>

                  <div className="h-px bg-zinc-800 mb-5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${system.progress}%` }}
                      transition={{ delay: 0.4 + 0.1 * index, duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-indigo-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {system.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-500 border border-zinc-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button asChild variant="ghost" className="text-zinc-500 hover:text-white px-0">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to index
              </Link>
            </Button>
          </motion.div>

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
            STATUS: LIVE
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">SYSTEMS:</span> 4
          </span>
          <span className="font-mono text-[10px] text-zinc-700">//</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">UPTIME:</span> ALL NOMINAL
          </span>
          <span className="font-mono text-[10px] text-zinc-700">//</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
            <span className="text-zinc-500">ENV:</span> DEVELOPMENT
          </span>
        </div>
      </div>

    </section>
  );
}
