"use client";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon, ArrowUpRightIcon, BoxIcon, LockIcon, TerminalIcon } from "lucide-animated";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    url: {
      liveDemo: string;
      github: string;
    };
    status: string;
    description: string;
    tags: string[];
    image?: string;
  };
}

const ProjectCard = ({ project }: ProjectProps) => {
  // دالة لتحديد أيقونة ونص الـ Hover بناءً على الحالة
  const getStatusOverlay = (status: string) => {
    if (status.includes("Vision")) return { icon: <BoxIcon className="w-8 h-8" />, label: "Architecting Infrastructure" };
    if (status.includes("Beta")) return { icon: <LockIcon className="w-8 h-8" />, label: "Private Beta Access" };
    return { icon: <TerminalIcon className="w-8 h-8" />, label: "Compiling MVP" };
  };

  const overlay = getStatusOverlay(project.status);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-2xl p-8 max-sm:py-6 hover:border-indigo-500/50 transition-all duration-500"
    >
        <div className="absolute inset-0 bg-linear-to-tr from-indigo-300/5 flex md:hidden via-indigo-600/15 m-1 backdrop-blur-3xl opacity-50 from-35% z-20 to-transparent rounded-2xl" />
      {/* 1. Background Image Layer */}
      {project.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100"
            className="object-cover opacity-20 group-hover:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/90 to-transparent" />
        </div>
      )}

      {/* 2. COMING SOON OVERLAY (The Magic Part) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4 text-center p-6"
        >
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            {overlay.icon}
          </div>
          <div className="space-y-1">
            <h4 className="text-white font-bold tracking-tighter text-xl uppercase">System Soon</h4>
            <p className="text-indigo-300/70 font-mono text-[10px] tracking-[0.3em] uppercase">
              {overlay.label}
            </p>
          </div>
          
          {/* Progress Bar Style */}
          <div className="w-32 h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* 3. Original Content (Visible by default) */}
      <div className="relative z-10 flex h-full flex-col justify-between group-hover:blur-sm group-hover:scale-[0.98] transition-all duration-500">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              {project.status}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {project.title}
          </h3>

          <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-mono rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-500 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>


          <div className="flex flex-row gap-2 justify-end grow">
            <Link href={project.url.liveDemo} >
            <Button className="text-white bg-linear-30 cursor-pointer from-indigo-700 to-indigo-400 border-0 ">
              Live Demo
              <ArrowUpRightIcon className="w-5 h-5 mt-0.5 text-indigo-50 hover:text-white cursor-pointer transition-colors" />
            </Button>
            </Link>
            <Link href={project.url.github} >
            <Button className="bg-white/0 text-white cursor-pointer border-indigo-300/40 ">
              GitHub
              <GithubIcon className="w-5 h-5 mt-0.5 text-indigo-50 hover:text-white cursor-pointer transition-colors" />
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;