"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const shortcuts = [
  { keys: ["g", "h"], label: "Go Home", href: "/" },
  { keys: ["g", "p"], label: "Go Projects", href: "/projects" },
  { keys: ["g", "a"], label: "Go About", href: "/about" },
  { keys: ["c"], label: "Scroll to Contact", href: "/#contact" },
  { keys: ["?"], label: "Show shortcuts", href: null },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [leader, setLeader] = useState<string | null>(null);
  const router = useRouter();

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setLeader(null);
    if (href.startsWith("/#")) {
      if (window.location.pathname === "/") {
        const el = document.getElementById(href.slice(2));
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  }, [router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
        setLeader(null);
        return;
      }

      if (e.key === "Escape" && open) {
        setOpen(false);
        setLeader(null);
        return;
      }

      if (!open) return;

      if (leader) {
        if (e.key === "h") navigate("/");
        else if (e.key === "p") navigate("/projects");
        else if (e.key === "a") navigate("/about");
        else if (e.key === "?") setLeader(null);
        setLeader(null);
        return;
      }

      if (e.key === "g") {
        setLeader("g");
      } else if (e.key === "c") {
        navigate("/#contact");
      } else if (e.key === "?") {
        setLeader("?");
        setTimeout(() => setLeader(null), 1000);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, leader, navigate]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-120 flex items-start justify-center pt-[20vh]"
          onClick={() => { setOpen(false); setLeader(null); }}
        >
          <div
            className="w-full max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            >
              <div className="px-4 py-2.5 border-b border-zinc-800">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                  {leader === "?" ? "Shortcuts" : "Command"}
                </span>
              </div>
              <div className="p-2">
                {shortcuts.map((s) => (
                  <button
                    key={s.keys.join("+")}
                    onClick={() => s.href && navigate(s.href)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors duration-150 group"
                  >
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                      {s.label}
                    </span>
                    <kbd className="font-mono text-[10px] text-zinc-600 tracking-wider flex gap-1">
                      {s.keys.map((k, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                          {k === " " ? "SPACE" : k}
                        </span>
                      ))}
                    </kbd>
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-zinc-800">
                <span className="font-mono text-[9px] text-zinc-700 uppercase tracking-[0.2em]">
                  Press <kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">Esc</kbd> to close &middot; <kbd className="px-1 rounded bg-zinc-800 border border-zinc-700">/</kbd> to open
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
