"use client";

import { useSystemStatus } from "@/lib/hooks/use-site-status";
import type { DeploymentState, SystemStatus } from "@/lib/status-types";

function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const seconds = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return "JUST NOW";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}M AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}H AGO`;
  const days = Math.floor(hours / 24);
  return `${days}D AGO`;
}

const pingColor: Record<DeploymentState, string> = {
  operational: "bg-indigo-400",
  building: "bg-amber-400",
  queued: "bg-amber-300",
  error: "bg-red-500",
  unavailable: "bg-zinc-500",
};

const dotColor: Record<DeploymentState, string> = {
  operational: "bg-indigo-500",
  building: "bg-amber-400",
  queued: "bg-amber-300",
  error: "bg-red-500",
  unavailable: "bg-zinc-600",
};

export function SystemStatusStrip({
  stackLabel = "NEXT.JS 16",
  systemsCount,
  intervalMs,
}: {
  stackLabel?: string;
  systemsCount?: number;
  intervalMs?: number;
}) {
  const { status, loading } = useSystemStatus(intervalMs);

  if (loading && !status) {
    return (
      <div className="flex items-center justify-between px-6 md:px-10 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-600" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            STATUS: SYNCING
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <span className="text-zinc-400">STACK:</span> {stackLabel}
          </span>
        </div>
      </div>
    );
  }

  const effective: SystemStatus = status ?? {
    state: "unavailable",
    stateLabel: "UNAVAILABLE",
    env: "unknown",
    envLabel: "UNKNOWN",
    commit: null,
    deployedAt: null,
    url: null,
    source: "unavailable",
    updatedAt: new Date().toISOString(),
  };

  const state = effective.state;
  const showDeployed = state !== "unavailable";

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-3 border-t border-zinc-800/60 bg-zinc-900/10">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingColor[state]} opacity-75`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor[state]}`} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
          STATUS:{" "}
          <span className={state === "error" ? "text-red-400" : state === "building" || state === "queued" ? "text-amber-300" : "text-indigo-400"}>
            {effective.stateLabel}
          </span>
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          <span className="text-zinc-300">STACK:</span> {stackLabel}
        </span>
        {systemsCount !== undefined && (
          <>
            <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              <span className="text-zinc-300">SYSTEMS:</span> {systemsCount}
            </span>
          </>
        )}
        <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          <span className="text-zinc-300">BUILD:</span>{" "}
          {effective.commit?.shortSha ?? "—"}
        </span>
        <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          <span className="text-zinc-300">ENV:</span> {effective.envLabel}
        </span>
        {showDeployed && (
          <>
            <span className="font-mono text-[10px] text-zinc-400">{"//"}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              <span className="text-zinc-300">DEPLOYED:</span>{" "}
              {timeAgo(effective.deployedAt)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}