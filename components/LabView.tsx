"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FlaskConical, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function LabView() {
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
            The Lab
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-400">
          Explorations
        </span>
      </div>

      <div className="relative bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]">
        <div className="relative z-10 p-6 md:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <FlaskConical size={16} className="text-indigo-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
                Research & Ideas
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4 text-balance">
              The Lab
            </h1>
            <p className="max-w-2xl text-zinc-400 leading-relaxed">
              A record of ideas, directions, and experiments before they become products. These are
              honest work-in-progress notes — not shipped systems, live services, or client work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteConfig.lab.map((item, index) => (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col p-8 rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800/60 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                    {item.status}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    {item.type}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight mb-3">{item.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">{item.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900/60 text-[10px] font-mono uppercase tracking-wider text-zinc-500"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/lab/${item.slug}`}
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-mono text-[10px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
                >
                  Read notes
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
