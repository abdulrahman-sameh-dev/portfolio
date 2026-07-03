"use client";
import Link from "next/link";
import { AlignRightIcon } from "lucide-animated";

export const Navbar = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  return (
    <nav className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto z-100 relative">
      <Link href="/" className="text-2xl font-bold text-white tracking-tighter group transition-all">
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

        <button
          onClick={onOpenMenu}
          className="p-2 hover:bg-zinc-900 rounded-xl transition-all active:scale-90 cursor-pointer"
        >
          <AlignRightIcon className="w-8 h-8 text-white" />
        </button>
      </div>
    </nav>
  );
};
