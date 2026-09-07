"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { XIcon } from "lucide-animated";
import { siteConfig } from "@/lib/site";

const experienceYears = new Date().getFullYear() - 2022;

export default function ExecutiveSummary({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const featured = siteConfig.skills.filter((s) => s.featured);
  const avgProficiency = Math.round(
    featured.reduce((acc, s) => acc + s.proficiency, 0) / featured.length
  );

  const metrics = [
    { value: String(siteConfig.projects.length), label: "SHIPPED SYSTEMS" },
    { value: String(siteConfig.systems.length), label: "ACTIVE SYSTEMS" },
    { value: String(experienceYears), label: "YEARS EXPLORING" },
    { value: String(siteConfig.skills.length), label: "STACK UNITS" },
    { value: `${avgProficiency}%`, label: "AVG PROFICIENCY" },
  ];

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "a, button:not([disabled])"
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-120 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Executive summary"
            tabIndex={-1}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                Executive Summary {"//"} System State
              </span>
              <button
                onClick={onClose}
                aria-label="Close executive summary"
                className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
              >
                <XIcon size={18} />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              {/* Key Metrics */}
              <section className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Key Metrics
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
                  {metrics.map((m) => (
                    <div key={m.label} className="bg-zinc-900 px-3 py-3">
                      <p className="text-xl font-bold text-white tracking-tighter">
                        {m.value}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Stack Proficiency */}
              <section className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Core Stack Proficiency
                </span>
                <div className="space-y-2">
                  {featured.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                        {skill.name}
                      </span>
                      <div className="flex-1 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right font-mono text-[10px] text-zinc-500">
                        {skill.proficiency}%
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Protocols */}
              <section className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Contact Protocols
                </span>
                <div className="rounded-lg border border-zinc-800 divide-y divide-zinc-800">
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Direct Line
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-mono text-xs text-zinc-200 hover:text-indigo-400 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      QoS Location
                    </span>
                    <span className="font-mono text-xs text-zinc-200">
                      {siteConfig.location.city} — {siteConfig.location.timezone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Status
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400">
                      {siteConfig.availability.label}
                    </span>
                  </div>
                </div>
              </section>

              {/* Quiet link to full topology */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Need the full trace?
                </span>
                <Link
                  href="/career-path"
                  onClick={onClose}
                  className="font-mono text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View Career Topology →
                </Link>
              </div>
            </div>

            <div className="px-5 py-2.5 border-t border-zinc-800">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em]">
                Press{" "}
                <kbd className="px-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
                  Esc
                </kbd>{" "}
                to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}