"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { GithubIcon } from "lucide-animated";
import type { CareerNode } from "@/lib/data/career";

export default function InspectorPanel({
  node,
  onClear,
}: {
  node: CareerNode | null;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col h-full rounded-xl border border-zinc-800 bg-zinc-900/[0.03] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
          Inspector {"//"} Node Telemetry
        </span>
        {node && (
          <button
            onClick={onClear}
            aria-label="Clear node selection"
            className="p-1 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
          >
            <X size={14} className="text-zinc-400" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {node ? (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-5 space-y-6"
            >
              {/* Identity */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {node.type.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {node.dateRange.label}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tighter text-white">
                  {node.name}
                </h3>
                {node.role && (
                  <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                    {node.role}
                  </p>
                )}
              </div>

              {/* Impact */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Impact
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {node.summary}
                </p>
              </div>

              {/* Key Decisions */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Key Decisions
                </span>
                <ul className="space-y-1.5">
                  {node.decisions.map((decision) => (
                    <li
                      key={decision}
                      className="flex gap-2 text-sm text-zinc-300 leading-snug"
                    >
                      <span className="text-indigo-500 font-mono">{"▸"}</span>
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {node.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {node.metrics.length > 0 && (
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                    Metrics
                  </span>
                  <div className="grid grid-cols-2 gap-px bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
                    {node.metrics.map((m) => (
                      <div key={m.label} className="bg-zinc-900/60 px-3 py-2.5">
                        <p className="text-base font-bold text-white tracking-tighter">
                          {m.value}
                        </p>
                        <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References */}
              {node.links && node.links.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                    References
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {node.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target={link.kind === "live" ? undefined : "_blank"}
                        rel={link.kind === "live" ? undefined : "noopener noreferrer"}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                      >
                        {link.kind === "github" ? (
                          <GithubIcon size={13} />
                        ) : (
                          <ArrowUpRight size={13} />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center h-full min-h-64 px-6 text-center"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                No Node Selected
              </span>
              <p className="mt-3 max-w-[26ch] text-xs text-zinc-500 leading-relaxed">
                Select a node on the topology to read its telemetry — impact,
                decisions, and technical stack.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}