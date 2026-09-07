"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/80 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 print:hidden cursor-pointer"
    >
      <Printer size={13} />
      Export .PDF
    </button>
  );
}