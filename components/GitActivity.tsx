"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GitCommitVerticalIcon } from "lucide-animated";
import { useGitActivity } from "@/lib/hooks/use-github-activity";
import { timeAgo } from "@/lib/time";
import type { ActivityCommit } from "@/lib/activity-types";
import ActivityModal from "@/components/ActivityModal";

function CommitRow({ commit }: { commit: ActivityCommit }) {
  return (
    <div className="flex items-center gap-4 px-4 md:px-6 py-3 border-b border-zinc-800/60 last:border-b-0 hover:bg-zinc-800/30 transition-colors">
      <span className="hidden sm:flex shrink-0 w-2 h-2 rounded-full bg-indigo-500/70" />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-300/90">
          commit {commit.shortSha}
        </p>
        <p className="mt-1 text-sm text-zinc-200 font-medium leading-snug truncate">
          {commit.subject}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-[10px] text-zinc-500 truncate">
          {commit.author}
        </p>
        <p className="font-mono text-[10px] text-zinc-600">
          {timeAgo(commit.date)}
        </p>
      </div>
    </div>
  );
}

export function GitActivity() {
  const { activity, loading, error } = useGitActivity();
  const [open, setOpen] = useState(false);

  const preview = activity?.commits.slice(0, 4) ?? [];

  const sourceLabel =
    activity?.source === "github-api"
      ? "SOURCE: GITHUB API"
      : activity?.source === "git"
        ? "SOURCE: BUILD-TIME GIT LOG"
        : "SOURCE: N/A";

  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Recent System Activity<span className="text-indigo-500">.</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Live commit telemetry pulled directly from the repository. No mocked
          data — every entry is a real push.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        viewport={{ once: true }}
        className="rounded-3xl border border-zinc-800 bg-[#080808] overflow-hidden"
      >
        {/* Monitor Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <GitCommitVerticalIcon size={14} className="text-indigo-400 ml-2" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              GIT // RECENT COMMITS
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-wider text-zinc-500 hidden sm:block">
            {sourceLabel}
          </span>
        </div>

        {/* Body */}
        {loading && !activity ? (
          <div className="px-4 md:px-6 py-5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            STATUS: SYNCING COMMITS...
          </div>
        ) : error || !activity ? (
          <div className="px-4 md:px-6 py-5 space-y-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
              STATUS: TELEMETRY OFFLINE
            </p>
            <p className="text-sm text-zinc-500">
              GitHub API unreachable — try again in a moment.
            </p>
          </div>
        ) : activity.commits.length === 0 ? (
          <div className="px-4 md:px-6 py-5 space-y-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
              STATUS: NO COMMIT SIGNAL
            </p>
            <p className="text-sm text-zinc-500">
              {activity.rateLimited
                ? "GitHub API limit reached — build-time history unavailable."
                : "No commit history could be resolved."}
            </p>
          </div>
        ) : (
          <div>
            {preview.map((commit) => (
              <CommitRow key={commit.sha} commit={commit} />
            ))}
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
              <button
                onClick={() => setOpen(true)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1 py-0.5 cursor-pointer"
              >
                View Full Activity History {"→"}
              </button>
              <span className="font-mono text-[9px] text-zinc-600">
                {activity.commits.length} COMMITS LOGGED
              </span>
            </div>
          </div>
        )}
      </motion.div>

      <ActivityModal
        open={open}
        onClose={() => setOpen(false)}
        commits={activity?.commits ?? []}
      />
    </section>
  );
}