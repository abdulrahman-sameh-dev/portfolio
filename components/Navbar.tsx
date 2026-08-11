"use client";
import Link from "next/link";
import { AlignRightIcon, ArrowUpRightIcon } from "lucide-animated";
import { siteConfig } from "@/lib/site";

export const Navbar = ({ onOpenMenu, isOpen }: { onOpenMenu: () => void; isOpen: boolean }) => {
  return (
    <nav aria-label="Main navigation" className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto z-100 relative">
      <Link href="/" className="text-2xl font-bold text-white tracking-tighter group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg">
        Abdulrahman<span className="text-indigo-600 group-hover:animate-pulse">.</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="lg:flex items-center gap-2 px-3 py-1 rounded-full hidden bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">System Building</span>
        </div>

        <Link
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-white hover:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all"
        >
          Resume
          <ArrowUpRightIcon size={14} />
        </Link>

        <button
          onClick={onOpenMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="p-2 hover:bg-zinc-900 rounded-xl transition-all active:scale-90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <AlignRightIcon className="w-8 h-8 text-white" />
        </button>
      </div>
    </nav>
  );
};
