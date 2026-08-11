import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <section className="border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03]">
      {/* ── Monitor Header ── */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/30" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <span className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            CASE STUDY
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-400">
          {project.status}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-6 md:p-10 lg:p-12">
        {/* Title Block */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <Layers size={16} className="text-indigo-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
              System Case Study
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              {project.title}
            </h1>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              {project.status}
            </span>
          </div>
          <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
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

        {/* Overview */}
        <div className="mb-12">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
            Overview
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-3xl">{project.overview}</p>
        </div>

        {/* Problem + Architecture */}
        <div className="grid lg:grid-cols-2 gap-px bg-zinc-800/50 rounded-3xl overflow-hidden border border-zinc-800/50 mb-12">
          <div className="bg-zinc-900/60 p-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Problem Statement
            </h2>
            <p className="text-zinc-400 leading-relaxed">{project.problem}</p>
          </div>
          <div className="bg-zinc-900/60 p-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Architecture & Tech Stack
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">{project.architecture.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.architecture.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges + Metrics */}
        <div className="grid lg:grid-cols-2 gap-px bg-zinc-800/50 rounded-3xl overflow-hidden border border-zinc-800/50 mb-12">
          <div className="bg-zinc-900/60 p-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Challenges
            </h2>
            <ul className="space-y-4">
              {project.challenges.map((challenge) => (
                <li key={challenge} className="flex gap-3 text-zinc-400 leading-relaxed">
                  <span className="text-indigo-400 mt-0.5 shrink-0">{"▸"}</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-zinc-900/60 p-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Key Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <p className="text-2xl font-bold text-white tracking-tight">{metric.value}</p>
                  <p className="text-xs text-zinc-400 leading-snug">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {project.url?.liveDemo && (
            <Button className="text-white bg-linear-30 from-indigo-700 to-indigo-400 border-0" asChild>
              <Link href={project.url.liveDemo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Link>
            </Button>
          )}
          {project.url?.github && (
            <Button className="bg-white/0 text-white hover:bg-white/[0.03] border-indigo-300/40 border" asChild>
              <Link href={project.url.github} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          )}
          <Button variant="ghost" className="text-zinc-400 hover:text-white px-0" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to systems
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Telemetry Strip ── */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
            STATUS: {project.status}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">MODULE:</span> {project.slug.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">STACK:</span> {project.architecture.stack.length}
          </span>
        </div>
      </div>
    </section>
  );
}
