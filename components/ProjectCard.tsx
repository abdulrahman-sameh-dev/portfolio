"use client";

import { motion } from "motion/react";
import { GithubIcon, ArrowUpRightIcon } from "lucide-animated";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site";

interface ProjectProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectProps) => {
  const caseStudyHref = project.url?.caseStudy ?? `/projects/${project.slug}`;
  const liveDemoHref = project.url?.liveDemo;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-2xl p-8 max-sm:py-6 hover:border-indigo-500/50 transition-all duration-500"
    >
      {project.image && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-20 group-hover:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/90 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              {project.status}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3">{project.description}</p>
        </div>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-mono rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-400 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-30 mt-6 flex flex-wrap justify-end gap-2">
        <Link href={caseStudyHref} aria-label={`Read the ${project.title} case study`}>
          <Button className="text-white bg-linear-30 cursor-pointer from-indigo-700 to-indigo-400 border-0">
            Case Study
            <ArrowUpRightIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
          </Button>
        </Link>

        {liveDemoHref && (
          <Link
            href={liveDemoHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${project.title} live demo in a new tab`}
          >
            <Button className="bg-white/0 text-white cursor-pointer border border-indigo-300/40">
              Live Demo
              <ArrowUpRightIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
            </Button>
          </Link>
        )}

        {project.url?.github && (
          <Link
            href={project.url.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View the ${project.title} source code on GitHub`}
          >
            <Button className="bg-white/0 text-white cursor-pointer border border-indigo-300/40">
              GitHub
              <GithubIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
