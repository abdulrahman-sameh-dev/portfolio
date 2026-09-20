"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XIcon, ArrowUpRightIcon } from "lucide-animated";
import type { ActivityCommit } from "@/lib/activity-types";
import { fullDate } from "@/lib/time";

export default function ActivityModal({
  open,
  onClose,
  commits,
}: {
  open: boolean;
  onClose: () => void;
  commits: ActivityCommit[];
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
            aria-label="Full git commit history"
            tabIndex={-1}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                Full Activity History {"//"} {commits.length} Commits
              </span>
              <button
                onClick={onClose}
                aria-label="Close activity history"
                className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Timeline */}
            <div className="p-4 md:p-5">
              <ol className="space-y-0 relative border-l border-zinc-800 ml-2">
                {commits.map((commit, index) => (
                  <li key={commit.sha} className="relative pl-6 pb-6 last:pb-1">
                    <span className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-indigo-400 transition-colors" />
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 rounded-lg py-1 -mx-1 px-1 hover:bg-zinc-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-300/90">
                          commit {commit.shortSha}{" "}
                          <span className="text-zinc-600">{"//"}</span>{" "}
                          <span className="text-zinc-400">{index} {index === 0 && "(HEAD)"}</span>
                        </p>
                        <p className="mt-1.5 text-sm text-zinc-200 font-medium leading-snug">
                          {commit.subject}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-zinc-500">
                          {commit.author} <span className="text-zinc-700">{"//"}</span> {fullDate(commit.date)}
                        </p>
                      </div>
                      <ArrowUpRightIcon className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-indigo-400 translate-y-0.5 transition-colors" />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}