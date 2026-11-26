import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FlaskConical, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.lab.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = siteConfig.lab.find((entry) => entry.slug === slug);
  if (!item) return {};

  const title = `${item.title} — The Lab`;
  const pageUrl = `${siteConfig.siteUrl}/lab/${item.slug}`;
  const image = item.image ?? "/assets/MetaDeta.png";

  return {
    title,
    description: item.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: item.description,
      url: pageUrl,
      siteName: siteConfig.name,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.description,
      images: [image],
    },
  };
}

export default async function LabDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = siteConfig.lab.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const pageUrl = `${siteConfig.siteUrl}/lab/${item.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    url: pageUrl,
    datePublished: item.datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: item.technologies.join(", "),
  };

  return (
    <section className="border border-zinc-800/80 rounded-3xl overflow-hidden bg-zinc-900/[0.03]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/30" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <span className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            Lab Notes
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-zinc-400">{item.status}</span>
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <FlaskConical size={16} className="text-indigo-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
              {item.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{item.title}</h1>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              {item.status}
            </span>
          </div>
          <p className="max-w-2xl text-zinc-400 leading-relaxed">{item.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-zinc-800/50 rounded-3xl overflow-hidden border border-zinc-800/50 mb-12">
          <div className="bg-zinc-900/60 p-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
              What This Is
            </h2>
            <ul className="space-y-4">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-zinc-400 leading-relaxed">
                  <span className="text-indigo-400 mt-0.5 shrink-0">{"▸"}</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-zinc-900/60 p-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Current Notes
            </h2>
            <ul className="space-y-4">
              {item.notes.map((note) => (
                <li key={note} className="flex gap-3 text-zinc-400 leading-relaxed">
                  <span className="text-zinc-600 mt-0.5 shrink-0">{"—"}</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 mb-4">
            Directions
          </h2>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((technology) => (
              <span
                key={technology}
                className="px-3 py-1 text-[10px] font-mono rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-400 uppercase tracking-wider"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {item.links?.map((link) => {
            const external = link.external ?? /^https?:\/\//.test(link.href);
            return (
              <Button key={link.href} asChild className="bg-white/0 text-white border border-indigo-500/40 hover:bg-indigo-500/5">
                <Link href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  {link.label}
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            );
          })}
          {!item.links?.length && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 self-center">
              No public links yet
            </span>
          )}
          <Button variant="ghost" className="text-zinc-400 hover:text-white px-0" asChild>
            <Link href="/lab">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to The Lab
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
            Status: {item.status}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-500">
          {item.slug}
        </span>
      </div>
    </section>
  );
}
