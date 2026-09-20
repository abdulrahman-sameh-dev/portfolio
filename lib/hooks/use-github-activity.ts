"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GitActivity } from "@/lib/activity-types";

const DEFAULT_INTERVAL_MS = 5 * 60_000;

export function useGitActivity(intervalMs: number = DEFAULT_INTERVAL_MS) {
  const [activity, setActivity] = useState<GitActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch("/api/activity", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as GitActivity;
      setActivity(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sync = () => void fetchActivity();
    const timeout = window.setTimeout(sync, 0);
    intervalRef.current = window.setInterval(sync, intervalMs);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(intervalRef.current);
    };
  }, [fetchActivity, intervalMs]);

  return { activity, loading, error, refetch: fetchActivity };
}