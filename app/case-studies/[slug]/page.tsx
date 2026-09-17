import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Database,
  FileCode2,
  TerminalSquare,
  TriangleAlert,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import {
  firstOnwHrCaseStudy,
  type CaseStudyBlock,
  type CaseStudySection,
} from "@/lib/data/case-study-first-onw-hr";

export const dynamicParams = false;

const caseStudies = [firstOnwHrCaseStudy];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  const title = `${study.title} — Full Case Study`;
  const pageUrl = `${siteConfig.siteUrl}/case-studies/${study.slug}`;

  return {
    title,
    description: study.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: study.summary,
      url: pageUrl,
      siteName: siteConfig.name,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
    },
  };
}

function BlockTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800/50">
      <table className="w-full text-left border-collapse min-w-[520px]">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/40">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-[10px] font-mono uppercase tracking-[0.15em] text-indigo-400 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-zinc-800/50 first:border-t-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top ${
                    j === 0
                      ? "text-xs font-mono uppercase tracking-wider text-zinc-300 whitespace-nowrap"
                      : "text-sm text-zinc-400 leading-relaxed"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockCode({ block }: { block: Extract<CaseStudyBlock, { kind: "code" }> }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800/60 bg-[#080808]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-900/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500/40" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
          <span className="w-2 h-2 rounded-full bg-green-500/40" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
          {block.title}
        </span>
        <span className="font-mono text-[9px] text-zinc-500">{block.lang}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono text-zinc-300 whitespace-pre">
        {block.code}
      </pre>
    </div>
  );
}

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-zinc-400 leading-relaxed">
          <span className="text-indigo-400 mt-0.5 shrink-0">{"▸"}</span>
          <span className="max-w-[70ch]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockHurdle({ block }: { block: Extract<CaseStudyBlock, { kind: "hurdle" }> }) {
  return (
    <div className="grid lg:grid-cols-2 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800/50">
      <div className="bg-zinc-900/60 p-6">
        <div className="flex items-center gap-2 mb-3">
          <TriangleAlert size={14} className="text-red-400/80" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400/90">
            Problem
          </span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{block.problem}</p>
      </div>
      <div className="bg-zinc-900/60 p-6">
        <div className="flex items-center gap-2 mb-3">
          <TerminalSquare size={14} className="text-emerald-400/80" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400/90">
            Solution
          </span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{block.solution}</p>
      </div>
    </div>
  );
}

function SectionBlock({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p className="text-zinc-400 leading-relaxed max-w-3xl">{block.text}</p>;
    case "list":
      return <BlockList items={block.items} />;
    case "code":
      return <BlockCode block={block} />;
    case "table":
      return <BlockTable headers={block.headers} rows={block.rows} />;
    case "hurdle":
      return <BlockHurdle block={block} />;
  }
}

function Section({ section }: { section: CaseStudySection }) {
  return (
    <section id={section.id} className="mb-14 scroll-mt-24">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
          {section.label}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter mb-6">
        {section.title}
      </h2>
      {section.intro && (
        <p className="text-zinc-400 leading-relaxed max-w-3xl mb-6">{section.intro}</p>
      )}
      <div className="space-y-6">
        {section.blocks.map((block, i) => (
          <SectionBlock key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const sourceCount = study.sections.reduce((acc, section) => acc + section.blocks.length, 0);

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
            CASE STUDY // FULL ARCHIVE
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-400">
          {study.slug.toUpperCase()}.md → RENDERED
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-6 md:p-10 lg:p-12">
        {/* Title Block */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <Layers size={16} className="text-indigo-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
              Deprecated Markdown Converted to Docs
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              {study.title}
            </h1>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              Production
            </span>
          </div>
          <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">{study.subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {["Laravel 12", "PHP 8", "MySQL", "Blade", "Eloquent"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-mono rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-400 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Summary Strip */}
        <div className="grid md:grid-cols-3 gap-px bg-zinc-800/50 rounded-3xl overflow-hidden border border-zinc-800/50 mb-14">
          <div className="bg-zinc-900/60 p-6 flex items-start gap-3">
            <Database size={16} className="text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-400 leading-relaxed">{study.summary}</p>
          </div>
          <div className="bg-zinc-900/60 p-6 flex items-start gap-3">
            <FileCode2 size={16} className="text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-400 leading-relaxed">
              Fully re-engineered stateless-first: sessions, cache & queues moved out of the
              filesystem onto the shared MySQL store.
            </p>
          </div>
          <div className="bg-zinc-900/60 p-6 flex items-start gap-3">
            <TerminalSquare size={16} className="text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-400 leading-relaxed">
              Hybrid Vercel build graph — PHP lambda for dynamics, CDN edge for assets — configured
              manually in vercel.json.
            </p>
          </div>
        </div>

        {/* Sections */}
        {study.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800/50">
          <Button
            className="text-white bg-linear-30 from-indigo-700 to-indigo-400 border-0"
            asChild
          >
            <Link href="/projects/first-onw-hr">View Summary Case Study</Link>
          </Button>
          <Button className="bg-white/0 text-white hover:bg-white/[0.03] border-indigo-300/40 border" asChild>
            <Link href="/projects">Back to all systems</Link>
          </Button>
          <Button variant="ghost" className="text-zinc-400 hover:text-white px-0" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back home
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
            STATUS: PRODUCTION
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">MODULE:</span> {study.slug.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">SECTIONS:</span> {study.sections.length}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
            <span className="text-zinc-300">BLOCKS:</span> {sourceCount}
          </span>
        </div>
      </div>
    </section>
  );
}