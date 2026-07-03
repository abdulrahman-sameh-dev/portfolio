"use client"
import { motion } from 'motion/react'

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  textColor: string;
  color: string;
  padding: string;
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {skill.name}
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-400">
            {skill.level}
          </span>
        </div>

        {/* الوصف التقني اللي بيظهر بس في الـ Hover */}
        <p className="text-sm text-zinc-500 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {skill.desc}
        </p>
      </div>

      {/* خط سفلي "ينبض" (Subtle Pulse) */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-500 group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}