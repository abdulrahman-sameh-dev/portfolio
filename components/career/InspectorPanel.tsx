"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { GithubIcon } from "lucide-animated";
import { careerNodes, type CareerActionLinks, type CareerNode } from "@/lib/data/career";

// Precomputed once from the static career data.
const lifetime = (() => {
  const systemsShipped = careerNodes.filter(
    (node) => node.category === "project" || node.category === "company"
  ).length;
  const counts = new Map<string, number>();
  for (const node of careerNodes) {
    for (const tech of node.stack) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  const primaryStack = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 4)
    .map(([tech]) => tech);
  const currentFocus =
    careerNodes.find((node) => node.timeline.endsWith("PRESENT"))?.title ??
    "Full Stack Engineer & Systems Architect";
  return { systemsShipped, primaryStack, currentFocus };
})();

function ReferenceLink({ links }: { links: CareerActionLinks }) {
  const entries: { label: string; href: string; icon: "arrow" | "github" | "live" }[] = [];
  if (links.caseStudyUrl) entries.push({ label: "View Case Study", href: links.caseStudyUrl, icon: "arrow" });
  if (links.liveDemoUrl) entries.push({ label: "Live Demo", href: links.liveDemoUrl, icon: "live" });
  if (links.githubUrl) entries.push({ label: "Source on GitHub", href: links.githubUrl, icon: "github" });

  if (entries.length === 0) return null;

  return (
    <div className="space-y-2 pt-2 border-t border-zinc-800">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
        References
      </span>
      <div className="flex flex-col gap-1.5">
        {entries.map((link) => {
          const inner = (
            <>
              {link.icon === "github" ? (
                <GithubIcon size={13} />
              ) : link.icon === "live" ? (
                <ArrowUpRight size={13} />
              ) : (
                <ArrowUpRight size={13} />
              )}
              {link.label}
            </>
          );
          const base =
            "inline-flex items-center gap-1.5 font-mono text-xs text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded";
          return link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href} className={base}>
              {inner}
            </Link>
          ) : (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={base}>
              {inner}
            </a>
          );
        })}
      </div>
    </div>
  );
}

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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="p-5 space-y-6"
            >
              {/* Identity */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {node.category.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {node.timeline}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tighter text-white">
                  {node.title}
                </h3>
              </div>

              {/* Impact */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Impact
                </span>
                <ul className="space-y-1.5">
                  {node.impactMetrics.map((impact) => (
                    <li
                      key={impact}
                      className="flex gap-2 text-sm text-zinc-300 leading-snug"
                    >
                      <span className="text-indigo-500 font-mono">{"▸"}</span>
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Decisions */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Architecture Decisions
                </span>
                <ul className="space-y-1.5">
                  {node.architectureDecisions.map((decision) => (
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

              {/* Stack */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {node.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <ReferenceLink links={node.actionLinks} />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-4"
            >
              {/* Terminal card */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-300">
                    {"// SYSTEM_INSPECTOR: AWAITING_SELECTION"}
                  </span>
                </div>
                <div className="px-4 py-4 font-mono text-[11px] leading-relaxed text-zinc-300">
                  Click any topology node on the graph to inspect architectural
                  decisions, metrics, and codebase impact.
                  <span className="inline-block w-2 h-3.5 ml-1 align-middle bg-indigo-400/80 animate-pulse" />
                </div>
              </div>

              {/* Global lifetime summary */}
              <div className="mt-4 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                    Global Lifetime Summary
                  </span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                      Total Systems Shipped
                    </span>
                    <span className="font-mono text-lg font-bold text-white tracking-tighter">
                      {String(lifetime.systemsShipped).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                      Primary Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {lifetime.primaryStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1 border-t border-zinc-800">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                      Current Focus Status
                    </span>
                    <p className="flex items-center gap-2 text-sm text-zinc-200 font-medium">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                      </span>
                      {lifetime.currentFocus}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}