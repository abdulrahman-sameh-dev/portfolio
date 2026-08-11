"use client"
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  SiNextdotjs, SiReact, SiDocker, SiGithub, SiLinux, SiLivekit,
  SiMongodb, SiNodedotjs, SiTailwindcss, SiFramer, SiTypescript,
  SiPostgresql, SiPrisma,
} from 'react-icons/si'
import type { IconType } from 'react-icons';
import { siteConfig } from "@/lib/site";

const iconMap: Record<string, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  framer: SiFramer,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  mongodb: SiMongodb,
  livekit: SiLivekit,
  postgres: SiPostgresql,
  prisma: SiPrisma,
  docker: SiDocker,
  linux: SiLinux,
  github: SiGithub,
};

const skills = siteConfig.skills;
const categories = ["All", "Frontend", "Backend", "DevOps"];

export default function StackGrid() {
  const [activeTab, setActiveTab] = useState("All");

  const handleFilterClick = (cat: string) => {
    setActiveTab(cat);
  };

  const filteredSkills = activeTab === "All" ? skills : skills.filter(s => s.category === activeTab);

  return (
    <section
      className="px-6 max-w-6xl mx-auto min-h-[90vh] items-center flex flex-col justify-center"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-3">
          Technical Arsenal
        </h2>
        <p className="text-muted-foreground">
          Focused expertise across the full software stack.
        </p>
      </div>

      {/* الفلتر - تفاعل بالـ Hover */}
      <div className="flex gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterClick(cat)}
            aria-pressed={activeTab === cat}
            className={`relative px-6 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeTab === cat
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {activeTab === cat && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-zinc-800 border border-zinc-700 rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* الجريد - مقاسات موزونة (4 أعمدة في الشاشات الكبيرة) */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.icon];
            return (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-zinc-800/60 bg-[#080808] hover:border-indigo-500/40 transition-all duration-500 cursor-default"
            >
              <div className="relative z-10 flex flex-col gap-4 max-h-40">
                <div className="flex justify-between items-center">
                  <div className="relative w-10 h-10 rounded-xl backdrop-blur-2xl bg-indigo-400/50 flex items-center justify-center border border-zinc-800 transition-all duration-500 overflow-hidden text-white">
                    <div
  className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
  style={{ backgroundColor: skill.brandBg }}
/>

                    <Icon
  className="w-5 h-5 relative z-10 transition-all duration-500 grayscale-0 md:grayscale md:group-hover:grayscale-0"
  style={{ color: skill.brand, padding: skill.padding }}
/>
                  </div>
                  <span className="text-[12px] font-mono text-zinc-400 group-hover:text-indigo-400">
                    {skill.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed ">
                    {skill.description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/0.3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}