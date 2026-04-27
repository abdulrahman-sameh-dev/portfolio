"use client";
import { motion } from "motion/react";
import { GithubIcon, ArrowUpRightIcon } from "lucide-animated";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  project: {
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
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-2xl p-8 hover:border-indigo-500/50 transition-colors"
    >
      {project.image && (
        <div className="absolute inset-1 rounded-2xl z-0">
          <Image
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-200"
            width="2000"
            height="100"
          />
          {/* الـ Gradient عشان الكلام يفضل مقروء */}
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent rounded-b-2xl" />
        </div>
      )}

      {/* خلفية Glow خفيفة بتظهر عند الـ Hover */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              {project.status}
            </span>


          </div>

          <h3 className="text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>

          <p className="text-zinc-400 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto justify-between">
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300"
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
