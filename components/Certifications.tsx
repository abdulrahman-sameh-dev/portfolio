"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Maximize2Icon,
  XIcon,
} from "lucide-animated";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  kind: "certificate" | "transcript";
};

const SLIDES: Slide[] = [
  {
    src: "/certificates/1.jpeg",
    alt: "Yat Learning Centers — Laravel PHP certification",
    caption: "Laravel PHP Certification",
    kind: "certificate",
  },
  {
    src: "/certificates/2.jpeg",
    alt: "Official transcript with the 75-hour course breakdown",
    caption: "Official Transcript — 75 Hours",
    kind: "transcript",
  },
];

const COURSE_BREAKDOWN = [
  { label: "PHP Fundamentals", hours: 36 },
  { label: "Laravel PHP Framework", hours: 21 },
  { label: "MySQL Fundamentals", hours: 12 },
  { label: "Full Stack Developer — Final Project", hours: 6 },
];

const TOTAL_HOURS = COURSE_BREAKDOWN.reduce((sum, c) => sum + c.hours, 0);
const AUTO_ADVANCE_MS = 5500;

export default function Certifications() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<Slide | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || paused || open) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduced, paused, open]);

  const goTo = (dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
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
  }, [open]);

  const active = SLIDES[index];

  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Credentials<span className="text-indigo-500">.</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Verified course completion — a 75-hour Laravel PHP track with a
          production-finished final project.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6">
        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-zinc-800 bg-[#080808] overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative h-80 sm:h-105 lg:h-115">
            <AnimatePresence initial={false} mode="wait">
              <motion.button
                key={active.src}
                type="button"
                onClick={() => setOpen(active)}
                aria-label={`View ${active.caption} in high resolution`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={index === 0}
                />
                <span className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-zinc-700 text-zinc-300 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2Icon className="w-3.5 h-3.5" size={16}/> Inspect
                </span>
              </motion.button>
            </AnimatePresence>
          </div>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Previous certificate"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-zinc-700 text-zinc-300 hover:text-white hover:border-indigo-400/60 hover:bg-black/80 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <ChevronLeftIcon className="w-5 h-5" size={20} />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Next certificate"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-zinc-700 text-zinc-300 hover:text-white hover:border-indigo-400/60 hover:bg-black/80 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <ChevronRightIcon className="w-5 h-5" size={20} />
          </button>

          {/* Dots + counter */}
          <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to ${slide.caption}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  i === index
                    ? "w-8 bg-indigo-500"
                    : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <span className="absolute bottom-0 left-0 right-0 px-5 py-2.5 bg-gradient-to-t from-black/80 to-transparent text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            {active.caption}
          </span>
        </motion.div>

        {/* ── Breakdown Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } }}
          viewport={{ once: true }}
          className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/[0.03] p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              Course Transcript
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              {TOTAL_HOURS}h Total
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
            Laravel PHP Framework
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-8">
            Yat Learning Centers certification — server-side PHP to a
            framework-grade full-stack build, verified module by module.
          </p>

          <div className="space-y-5 grow">
            {COURSE_BREAKDOWN.map((course, i) => (
              <div key={course.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-300">{course.label}</span>
                  <span className="font-mono text-xs text-zinc-400">
                    {course.hours}h
                  </span>
                </div>
                <div className="h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(course.hours / TOTAL_HOURS) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500">
              Certification Verified
            </span>
            <span className="text-xs font-mono text-zinc-300">
              Yat Learning Centers
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── High-res Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-120 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={open.caption}
              tabIndex={-1}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                  Credential {"//"} {open.caption}
                </span>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close certificate modal"
                  className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
                >
                  <XIcon size={18} />
                </button>
              </div>

              <div className="relative w-full h-[55vh] sm:h-[60vh] bg-black">
                <Image
                  src={open.src}
                  alt={open.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              </div>

              {open.kind === "transcript" ? (
                <div className="p-5 md:p-6 space-y-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Official transcript issued by Yat Learning Centers —{" "}
                    {TOTAL_HOURS} total course hours across four modules.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
                    {COURSE_BREAKDOWN.map((course) => (
                      <div key={course.label} className="bg-zinc-900 px-4 py-3 flex items-center justify-between gap-3">
                        <span className="text-xs text-zinc-300">{course.label}</span>
                        <span className="font-mono text-xs text-indigo-400 whitespace-nowrap">
                          {course.hours}h
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="p-5 md:p-6 text-sm text-zinc-400 leading-relaxed">
                  Laravel PHP certification from Yat Learning Centers — completed
                  the full {TOTAL_HOURS}-hour server-side track including the
                  final full-stack project.
                </p>
              )}

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
    </section>
  );
}