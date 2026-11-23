"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { GithubIcon, ArrowUpRightIcon } from "lucide-animated";
import {
  SchematicStack,
  SchematicFlow,
  SchematicPipeline,
} from "@/components/SchematicIcons";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site";

const LiveDemoModal = dynamic(() => import("@/components/LiveDemoModal"), {
  ssr: false,
});

interface ProjectProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectProps) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const getStatusOverlay = (status: string) => {
    if (status.includes("Vision"))
      return {
        icon: <SchematicStack className="w-8 h-8" />,
        label: "Architecting Infrastructure",
      };
    if (status.includes("Beta"))
      return {
        icon: <SchematicFlow className="w-8 h-8" />,
        label: "Private Beta Access",
      };
    if (status.includes("Production"))
      return {
        icon: <SchematicFlow className="w-8 h-8" />,
        label: "Live in Production",
      };
    return {
      icon: <SchematicPipeline className="w-8 h-8" />,
      label: "Compiling MVP",
    };
  };

  const overlay = getStatusOverlay(project.status);
  const caseStudyHref = project.url?.caseStudy ?? `/projects/${project.slug}`;
  const liveDemoHref = project.url?.liveDemo;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-2xl p-8 max-sm:py-6 hover:border-indigo-500/50 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-300/5 via-indigo-600/15 m-1 backdrop-blur-3xl opacity-50 from-35% z-20 to-transparent rounded-2xl pointer-events-none md:hidden" />

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

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-0 transition-all duration-500 pointer-events-none">
        <div className="flex scale-95 flex-col items-center gap-4 text-center p-6 transition-transform duration-500 group-hover:scale-100">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            {overlay.icon}
          </div>
          <div className="space-y-1">
            <h3 className="text-white font-bold tracking-tighter text-xl">
              System Soon
            </h3>
            <p className="text-indigo-300/70 font-mono text-[10px] tracking-[0.3em] uppercase">
              {overlay.label}
            </p>
          </div>
          <div className="w-32 h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full w-full origin-left bg-indigo-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between group-hover:blur-sm group-hover:scale-[0.98] transition-all duration-500">
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

          <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
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
        <Link
          href={caseStudyHref}
          aria-label={`Read the ${project.title} case study`}
        >
          <Button className="text-white bg-linear-30 cursor-pointer from-indigo-700 to-indigo-400 border-0">
            Case Study
            <ArrowUpRightIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
          </Button>
        </Link>

        {liveDemoHref ? (
          <Link
            href={liveDemoHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${project.title} live demo in a new tab`}
          >
            <Button className="bg-white/0 text-white cursor-pointer border-indigo-300/40">
              Live Demo
              <ArrowUpRightIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
            </Button>
          </Link>
        ) : (
          <Button
            type="button"
            aria-label={`Show live demo status for ${project.title}`}
            onClick={() => setDemoModalOpen(true)}
            className="bg-white/0 text-white cursor-pointer border border-indigo-300/40"
          >
            Live Demo
            <ArrowUpRightIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
          </Button>
        )}

        {project.url?.github && (
          <Link
            href={project.url.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View the ${project.title} source code on GitHub`}
          >
            <Button className="bg-white/0 text-white cursor-pointer border-indigo-300/40">
              GitHub
              <GithubIcon aria-hidden="true" className="w-5 h-5 mt-0.5 text-indigo-50" />
            </Button>
          </Link>
        )}
      </div>

      {demoModalOpen && (
        <LiveDemoModal
          open={demoModalOpen}
          onOpenChange={setDemoModalOpen}
          projectTitle={project.title}
        />
      )}
    </motion.div>
  );
};

export default ProjectCard;
