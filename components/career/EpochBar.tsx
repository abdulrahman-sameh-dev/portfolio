"use client";

import { CAREER_EPOCHS, type CareerEpochId } from "@/lib/data/career";

export type EpochFilter = "all" | CareerEpochId;

export default function EpochBar({
  value,
  onChange,
}: {
  value: EpochFilter;
  onChange: (value: EpochFilter) => void;
}) {
  const options: { id: EpochFilter; label: string }[] = [
    { id: "all", label: "FULL TRACE" },
    ...CAREER_EPOCHS.map((epoch) => ({ id: epoch.id as EpochFilter, label: epoch.label })),
  ];

  return (
    <div
      role="group"
      aria-label="Filter career by epoch"
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={`px-4 py-2 rounded-full border font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              active
                ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-300"
                : "border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}