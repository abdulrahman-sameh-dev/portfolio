"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import TopologyCanvas from "@/components/career/TopologyCanvas";
import InspectorPanel from "@/components/career/InspectorPanel";
import EpochBar, { type EpochFilter } from "@/components/career/EpochBar";
import { careerNodes } from "@/lib/data/career";

export default function CareerPathPage() {
  const [epoch, setEpoch] = useState<EpochFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visibleNodes = useMemo(
    () =>
      epoch === "all"
        ? careerNodes
        : careerNodes.filter((node) => node.epoch === epoch),
    [epoch]
  );

  const selectedNode = useMemo(
    () => careerNodes.find((node) => node.id === selectedId) ?? null,
    [selectedId]
  );

  const handleEpochChange = (value: EpochFilter) => {
    setEpoch(value);
    setSelectedId(null);
    setHoveredId(null);
  };

  const experienceYears = new Date().getFullYear() - 2022;

  const jsonLd = useMemo(() => {
    const graph = careerNodes.map((node) => ({
      "@type": node["@type"],
      name: node.name,
      description: node.summary,
      startDate: node.dateRange.start,
      [node.type === "Company" ? "employeeRole" : "about"]: node.role,
    }));
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Abdulrahman Sameh",
      jobTitle: "Full Stack Engineer & Systems Architect",
      description:
        "Engineered career trajectory from logic foundations to real-time systems and architecture-level ownership.",
      hasPart: graph,
    });
  }, []);

  return (
    <section className="border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* ── Monitor Header ── */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/30" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <span className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            Career Operating System
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-400">
          v2.5.0-trace
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-6 md:p-8 lg:p-10 space-y-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
            Career Operating <br className="hidden md:block" />
            <span className="text-indigo-500">System.</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
            A live topology of the journey from logic foundations to
            architecture-level ownership. Each node is a milestone — select it
            to read its telemetry.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Drag to pan {"//"} Scroll or pinch to zoom {"//"} Click a node to inspect
          </p>
        </motion.div>

        {/* Epoch Filter */}
        <EpochBar value={epoch} onChange={handleEpochChange} />

        {/* Topology + Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <TopologyCanvas
              nodes={visibleNodes}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHover={setHoveredId}
            />
          </div>
          <div className="lg:col-span-4 min-h-[320px]">
            <InspectorPanel
              node={selectedNode}
              onClear={() => setSelectedId(null)}
            />
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
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
            STATUS: TRACING
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">EXPERIENCE:</span> {experienceYears} YEARS
          </span>
          <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">NODES:</span> {visibleNodes.length}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">PHASE:</span>{" "}
            {epoch === "all" ? "FULL TRACE" : epoch.toUpperCase()}
          </span>
        </div>
      </div>
    </section>
  );
}