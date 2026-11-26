"use client";
import { motion } from "motion/react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const FeaturedProjects = () => {
  const projects = siteConfig.projects.slice(0, 3);

  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work.</h2>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Projects with a clear implementation, a real repo or live link, and a written case study.
          Earlier ideas and unfinished experiments live in The Lab.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] max-sm:auto-rows-auto max-sm:gap-4">
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent rounded-b-2xl pointer-events-none" />

        <div className="md:col-span-8 md:row-span-2">
          <ProjectCard project={projects[0]} />
        </div>

        <div className="md:col-span-4 md:row-span-2">
          <ProjectCard project={projects[1]} />
        </div>

        <div className="md:col-span-12 md:row-span-1">
          <ProjectCard project={projects[2]} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline" size={"lg"} className="border-zinc-800 hover:bg-zinc-900">
          <Link href="/projects">View All Projects</Link>
        </Button>
        <Button asChild variant="ghost" size={"lg"} className="text-zinc-400 hover:text-white px-0">
          <Link href="/lab" className="inline-flex items-center gap-2">
            Explore The Lab <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
