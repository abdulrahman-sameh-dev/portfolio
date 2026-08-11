"use client"
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { SiNextdotjs, SiReact, SiDocker, SiGithub, SiLinux, SiLivekit, SiMongodb, SiNodedotjs, SiTailwindcss, SiFramer, SiGit } from 'react-icons/si'

const skills = [
  {
    id: 1,
    name: "Next.js 16",
    category: "Frontend",
    level: "Expert",
    desc: "App Router, Server Actions & High-performance rendering.",
    Icon: SiNextdotjs,
    textColor: "#000000",
    color: "#ffffff",
    padding: "2px"
  },
  {
    id: 2,
    name: "React",
    category: "Frontend",
    level: "Expert",
    desc: "Modern Hooks, Context API & Component Architecture.",
    Icon: SiReact,
    textColor: "#61DAFB",
    color: "#23272F",
    padding: "2px"
  },
  {
    id: 3,
    name: "Framer Motion",
    category: "Frontend",
    level: "Advanced",
    desc: "Complex SVG animations & micro-interactions.",
    Icon: SiFramer,
    textColor: "#FFFFFF ",
    color: "#000000",
    padding: "7px"
  },
  {
    id: 4,
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Expert",
    desc: "Utility-first CSS & Scalable Design Systems.",
    Icon: SiTailwindcss,
    textColor: "#ffff",
    color: "#38BDF8",
    padding: "4px"
  },

  // Backend
  {
    id: 5,
    name: "Node.js",
    category: "Backend",
    level: "Advanced",
    desc: "Building scalable server-side logic & RESTful APIs.",
    Icon: SiNodedotjs,
    textColor: "#000000",
    color: "#339933",
    padding: "5px"
  },
  {
    id: 6,
    name: "MongoDB",
    category: "Backend",
    level: "Advanced",
    desc: "NoSQL Schema design & Mongoose optimization.",
    Icon: SiMongodb,
    textColor: "#00ED64",
    color: "#00684A",
    padding: "4px"
  },
  {
    id: 7,
    name: "LiveKit",
    category: "Backend",
    level: "Intermediate",
    desc: "Real-time communication & WebRTC infrastructure.",
    Icon: SiLivekit,
    textColor: "#1F85FF",
    color: "#000000",
    padding: "7px"
  },

  // DevOps
  {
    id: 8,
    name: "Docker",
    category: "DevOps",
    level: "Basic",
    desc: "Containerizing apps for consistent dev/prod workflows.",
    Icon: SiDocker,
    textColor: "#FFFFFF ",
    color: "#2496ED",
    padding: "6px"
  },
  {
    id: 9,
    name: "Linux",
    category: "DevOps",
    level: "Advanced",
    desc: "Power user in Bash scripting & system management.",
    Icon: SiLinux,
    textColor: "#000000",
    color: "#FFFFFF",
    padding: "2px"
  },
  {
    id: 10,
    name: "Git & GitHub",
    category: "DevOps",
    level: "Expert",
    desc: "Advanced branching strategies & CI/CD workflows.",
    Icon: SiGithub || SiGit,
    textColor: "#FFFFFF",
    color: "#181717",
    padding: "0px"
  },
];

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
            className={`relative px-6 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
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
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-zinc-800/60 bg-[#080808] hover:border-indigo-500/40 transition-all duration-500 cursor-default"
            >
              <div className="relative z-10 flex flex-col gap-4 max-h-40">
                <div className="flex justify-between items-center">
                  {/* أيقونة بترجع للونها الأصلي في الـ Hover */}
                  <div className="relative w-10 h-10 rounded-xl backdrop-blur-2xl bg-indigo-400/50 flex items-center justify-center border border-zinc-800 transition-all duration-500 overflow-hidden text-white">
                    {/* طبقة اللون اللي بتظهر في الـ Hover فقط */}
                    <div
  className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
  style={{ backgroundColor: skill.color }}
/>

                    {/* الأيقونة - بتتحول للأسود في الـ Hover عشان الخلفية نورت */}
                    <skill.Icon
  className="w-5 h-5 relative z-10 transition-all duration-500 grayscale-0 md:grayscale md:group-hover:grayscale-0"
  style={{ color: skill.textColor }}
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
                  {/* الوصف التقني يظهر فقط عند الـ Hover */}
                  <p className="text-[11px] text-muted-foreground leading-relaxed ">
                    {skill.desc}
                  </p>
                </div>
              </div>

              {/* إضاءة خلفية ناعمة جداً */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/0.3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}