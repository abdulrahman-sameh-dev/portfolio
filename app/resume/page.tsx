import type { Metadata } from "next";
import PrintButton from "@/components/ui/PrintButton";
import { careerNodes } from "@/lib/data/career";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "System Brief",
  description:
    "Print-ready system brief and career record of Abdulrahman Sameh — Full Stack Engineer & Systems Architect.",
};

const parseTimelineStart = (timeline: string) =>
  Number(timeline.split(" — ")[0].replace(".", ""));

const byStartDesc = (a: (typeof careerNodes)[number], b: (typeof careerNodes)[number]) =>
  parseTimelineStart(b.timeline) - parseTimelineStart(a.timeline);

const experience = careerNodes
  .filter((node) => node.category === "company" || node.category === "project")
  .sort(byStartDesc);
const foundations = careerNodes.filter((node) => node.category === "architecture_epoch");

export default function ResumePage() {
  const featuredSkills = siteConfig.skills.filter((skill) => skill.featured);

  return (
    <section className="border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03] print:rounded-none print:border-0">
      {/* ── Monitor Header ── */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-zinc-800/60 print:hidden">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/30" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <span className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            System Brief {"//"} Document 001
          </span>
        </div>
        <PrintButton />
      </div>

      {/* ── Document ── */}
      <div className="print:border print:border-zinc-300 print:rounded-lg print:px-8 print:max-w-none">
        {/* Header */}
        <header className="print:pt-0 print:px-0 px-6 md:px-8 pt-8 pb-6 border-b border-zinc-800/60">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-500 print:text-black">
            System Brief {"//"} PERSON RECORD
          </p>
          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {siteConfig.name}
              </h1>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 print:text-neutral-600">
                Full Stack Engineer {"//"} Systems Architect
              </p>
            </div>
            <address className="not-italic font-mono text-[11px] uppercase tracking-wider text-zinc-400 print:text-neutral-600 space-y-1 md:text-right">
              <p>{siteConfig.location.city}</p>
              <p>{siteConfig.location.coordinates}</p>
              <p>{siteConfig.email}</p>
            </address>
          </div>
        </header>

        {/* Contact Strip */}
        <div className="print:px-0 px-6 md:px-8 py-4 border-b border-zinc-800/60 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400 print:text-black">
          <span>
            <span className="text-zinc-300 print:text-black">AVAILABILITY:</span>{" "}
            {siteConfig.availability.label}
          </span>
          <span>
            <span className="text-zinc-300 print:text-black">TIMEZONE:</span>{" "}
            {siteConfig.location.timezone}
          </span>
          <span>
            <span className="text-zinc-300 print:text-black">GITHUB:</span>{" "}
            {siteConfig.socials.github.replace("https://", "")}
          </span>
          <span>
            <span className="text-zinc-300 print:text-black">X:</span>{" "}
            {siteConfig.socials.x.replace("https://", "")}
          </span>
        </div>

        {/* Body */}
        <div className="print:px-0 print:py-6 px-6 md:px-8 py-8 space-y-10">
          {/* Summary */}
          <section className="space-y-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-500 print:text-black">
              Summary
            </h2>
            <p className="text-zinc-300 leading-relaxed max-w-3xl print:text-black">
              Full Stack Engineer specializing in real-time systems, scalable
              web architecture, and serverless PHP platforms (Laravel 12 · PHP 8 ·
              MySQL). I treat deployment as a first-class output, data
              contracts as the first line of defense, and boring, observable
              systems as the highest form of elegance. From logic foundations in
              C++ to production real-time and serverless PHP platforms,
              everything ships, everything is typed, and nothing runs outside a
              pipeline.
            </p>
          </section>

          {/* Core Stack */}
          <section className="space-y-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-500 print:text-black">
              Core Stack
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 print:bg-black border border-zinc-800 print:border-black rounded-xl overflow-hidden">
              {featuredSkills.map((skill) => (
                <li key={skill.name} className="bg-zinc-900/60 print:bg-white px-4 py-3">
                  <p className="text-sm font-bold text-white print:text-black">{skill.name}</p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500 print:text-neutral-500">
                    {skill.level}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-500 print:text-black">
              Experience & Signature Systems
            </h2>
            <div className="space-y-6">
              {experience.map((node) => (
                <article
                  key={node.id}
                  className="border border-zinc-800 print:border-black print:break-inside-avoid rounded-xl overflow-hidden"
                >
                  <div className="px-5 py-3 bg-zinc-900/60 print:bg-white border-b border-zinc-800 print:border-black flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white print:text-black">
                        {node.title}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 print:text-neutral-600">
                        {node.category.toUpperCase()} {"//"} {node.timeline}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <ul className="space-y-1">
                      {node.impactMetrics.map((metric) => (
                        <li
                          key={metric}
                          className="flex gap-1.5 items-start text-xs text-zinc-300 print:text-black"
                        >
                          <span className="text-indigo-500 print:text-black mt-px">{"▸"}</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-zinc-400 leading-relaxed print:text-black">
                      {node.summary}
                    </p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {node.architectureDecisions.map((decision) => (
                        <li
                          key={decision}
                          className="text-xs text-zinc-300 print:text-black flex gap-1.5 items-center"
                        >
                          <span className="text-indigo-500 print:text-black">{"▸"}</span>
                          {decision}
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-wrap gap-1.5">
                      {node.stack.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 print:bg-neutral-100 text-zinc-500 print:text-black"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Foundations & Milestones */}
          <section className="space-y-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-500 print:text-black">
              Foundations & Milestones
            </h2>
            <ul className="divide-y divide-zinc-800 print:divide-black border border-zinc-800 print:border-black rounded-xl overflow-hidden">
              {foundations.map((node) => (
                <li key={node.id} className="px-5 py-3 bg-zinc-900/60 print:bg-white">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <p className="font-bold text-white print:text-black">{node.title}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 print:text-neutral-600">
                      {node.timeline}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed print:text-neutral-700">
                    {node.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}