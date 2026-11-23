"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { SchematicBox, SchematicGlobe, SchematicZap } from "@/components/SchematicIcons";
import { siteConfig } from "@/lib/site";

const journey = [
  {
    period: "2022 — 2023",
    title: "Foundations",
    detail: "Programming basics, Linux, Git, and the habit of finishing small projects.",
    current: false,
  },
  {
    period: "2024 — 2025",
    title: "Full-Stack Practice",
    detail: "Built with Next.js, TypeScript, Laravel, and MySQL; learned by shipping.",
    current: false,
  },
  {
    period: "2026",
    title: "Product Thinking",
    detail: "Planning, problem framing, and separating shipped products from experiments.",
    current: true,
  },
];

const principles = [
  {
    title: "Understand first",
    detail: "Clarify the problem and the person behind it before choosing a solution.",
  },
  {
    title: "Plan in small pieces",
    detail: "Turn a broad goal into milestones that can be reviewed and adjusted.",
  },
  {
    title: "Build for real use",
    detail: "Favor clear behavior, maintainable code, and an honest deployment path.",
  },
];

export default function AboutView() {
  const featuredSkills = siteConfig.skills.filter((skill) => skill.featured);

  return (
    <section className="border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03]">
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/30" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <span className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            Who I Am
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-400">
          {siteConfig.role}
        </span>
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 space-y-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-400">
            / Root / Abdulrahman / Identity
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white text-balance">
            Building useful digital products with a full-stack foundation.
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">{siteConfig.intro}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-md flex flex-col min-h-[260px] group transition-all duration-500 hover:border-indigo-500/30">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-zinc-200 font-bold text-sm tracking-tight">My Mindset</h2>
                <SchematicZap className="w-5 h-5 text-indigo-500/70" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                  >
                    <p className="text-sm font-bold text-zinc-200 mb-2">{principle.title}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{principle.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col min-h-[280px] hover:border-indigo-500/30 transition-colors">
              <h2 className="text-zinc-200 font-bold text-sm mb-6">Current Focus</h2>
              <ul className="space-y-3">
                {siteConfig.currentFocus.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col min-h-[280px] hover:border-indigo-500/30 transition-colors">
              <h2 className="text-zinc-200 font-bold text-sm mb-6">Learning</h2>
              <ul className="space-y-3">
                {siteConfig.learning.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col min-h-[240px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-zinc-200 font-bold text-sm">Working Stack</h2>
                <SchematicBox className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                  >
                    {skill.name} <span className="text-zinc-600">/ {skill.level}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-between min-h-[240px] overflow-hidden relative group">
              <SchematicGlobe className="w-24 h-24 absolute -bottom-4 -right-4 text-indigo-500/15 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Location
                </p>
                <p className="text-3xl font-bold tracking-tight text-white">{siteConfig.location.city}</p>
                <Link
                  href={siteConfig.location.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 text-xs font-mono tracking-wider mt-2 inline-block hover:text-indigo-300 transition-colors"
                >
                  {siteConfig.location.coordinates}
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-between min-h-[240px] hover:border-indigo-500/30 transition-colors">
              <div>
                <h2 className="text-zinc-200 font-bold text-sm mb-4">Let&apos;s Connect</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  If you want to talk about a product, a build, or an idea still taking shape, my inbox is open.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="px-4 py-2 rounded-xl border border-indigo-500/40 text-indigo-300 font-mono text-[10px] uppercase tracking-wider hover:bg-indigo-500/5 transition-colors"
                >
                  Email
                </Link>
                <Link
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase tracking-wider hover:border-indigo-500/30 hover:text-zinc-200 transition-colors"
                >
                  GitHub
                </Link>
                <Link
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase tracking-wider hover:border-indigo-500/30 hover:text-zinc-200 transition-colors"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-10">
              <SchematicZap className="w-4 h-4 text-indigo-500" />
              <h2 className="text-zinc-200 font-bold text-sm uppercase tracking-[0.2em]">My Journey</h2>
            </div>

            <div className="relative flex flex-col ml-2">
              {journey.map((item, index) => (
                <div key={item.period} className="relative pl-10 pb-12 last:pb-0">
                  {index < journey.length - 1 && (
                    <div className="absolute left-[7px] top-[24px] h-[calc(100%-20px)] w-[2px] bg-zinc-800/60" />
                  )}
                  <div className="absolute left-0 top-[6px] flex items-center justify-center">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        item.current ? "border-indigo-400 bg-black" : "border-zinc-700 bg-black"
                      }`}
                    >
                      <span className={`rounded-full bg-indigo-500 ${item.current ? "w-2 h-2" : "w-1.5 h-1.5"}`} />
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                      {item.period}
                    </span>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-bold tracking-tight leading-tight mt-1 ${
                          item.current ? "text-white text-xl" : "text-zinc-300 text-lg"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {item.current && (
                        <span className="text-[10px] px-2 py-0.5 bg-indigo-500/15 text-indigo-400 rounded-full font-mono">
                          Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-2">{item.detail}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
            Status: Open to work
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] text-zinc-500">
            {siteConfig.role}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
          <span className="font-mono text-[10px] text-zinc-500">{siteConfig.location.city}</span>
        </div>
      </div>
    </section>
  );
}
