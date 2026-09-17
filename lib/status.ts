import { execSync } from "node:child_process";
import type {
  DeploymentEnv,
  DeploymentState,
  StatusSource,
  SystemStatus,
} from "@/lib/status-types";
import { STATUS_LABELS } from "@/lib/status-types";

const VERCEL_API = "https://api.vercel.com";
const TTL_MS = 60_000;

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function runGit(format: string): string | null {
  try {
    return execSync(`git log -1 --format=${format}`, {
      encoding: "utf8",
      timeout: 4000,
    }).trim() || null;
  } catch {
    return null;
  }
}

function gitCommitInfo() {
  const sha = runGit("%H");
  if (!sha) return null;
  return {
    sha,
    shortSha: sha.slice(0, 7),
    ref: runGit("%D") ?? "HEAD",
    message: runGit("%s"),
    author: runGit("%an"),
    date: runGit("%cI"),
  };
}

function resolveState(readyState: string): DeploymentState {
  switch (readyState) {
    case "READY":
    case "REDEPLOYING":
      return "operational";
    case "BUILDING":
    case "INITIALIZING":
      return "building";
    case "QUEUED":
      return "queued";
    case "ERROR":
      return "error";
    default:
      return "unavailable";
  }
}

function resolveEnv(target: string, vercelEnv: string): DeploymentEnv {
  if (target === "production" || vercelEnv === "production") return "production";
  if (target === "preview" || vercelEnv === "preview") return "preview";
  if (vercelEnv === "development") return "development";
  return "unknown";
}

async function fromVercelApi(token: string, deploymentId: string): Promise<SystemStatus | null> {
  try {
    const res = await fetch(`${VERCEL_API}/v6/deployments/${encodeURIComponent(deploymentId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
      readyState?: string;
      target?: string;
      ready?: string | number;
      created?: string | number;
      url?: string;
      meta?: {
        githubCommitSha?: string;
        githubCommitRef?: string;
        githubCommitMessage?: string;
        githubCommitAuthorName?: string;
        githubCommitAuthorLogin?: string;
      };
      gitSource?: { sha?: string };
    };

    const state = resolveState(String(data.readyState ?? "").toUpperCase());
    const target = String(data.target ?? "").toLowerCase();
    const vercelEnv = env("VERCEL_ENV");

    const meta = data.meta ?? {};
    const commitSha = meta.githubCommitSha ?? data.gitSource?.sha ?? null;

    return {
      state,
      stateLabel: STATUS_LABELS[state],
      env: resolveEnv(target, vercelEnv),
      envLabel: (target || "preview").toUpperCase(),
      commit: commitSha
        ? {
            sha: String(commitSha).slice(0, 7),
            shortSha: String(commitSha).slice(0, 7),
            ref: meta.githubCommitRef ?? "main",
            message: meta.githubCommitMessage ?? null,
            author: meta.githubCommitAuthorName ?? meta.githubCommitAuthorLogin ?? null,
            date: new Date(Number(data.created)).toISOString(),
          }
        : null,
      deployedAt: data.ready ? new Date(Number(data.ready)).toISOString() : null,
      url: data.url ? `https://${data.url}` : null,
      source: "vercel-api",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function fromVercelGitEnv(): SystemStatus | null {
  const sha = env("VERCEL_GIT_COMMIT_SHA");
  const vercelEnv = env("VERCEL_ENV");
  if (!sha && !vercelEnv && !env("VERCEL_DEPLOYMENT_ID")) return null;

  const state: DeploymentState = vercelEnv === "development" ? "operational" : "operational";
  return {
    state,
    stateLabel: STATUS_LABELS[state],
    env: resolveEnv(vercelEnv, vercelEnv),
    envLabel: (vercelEnv || "unknown").toUpperCase(),
    commit: sha
      ? {
          sha: sha.slice(0, 7),
          shortSha: sha.slice(0, 7),
          ref: env("VERCEL_GIT_COMMIT_REF") || "main",
          message: env("VERCEL_GIT_COMMIT_MESSAGE") || null,
          author: env("VERCEL_GIT_COMMIT_AUTHOR_LOGIN") || null,
          date: env("VERCEL_GIT_COMMIT_AUTHORED_AT") || null,
        }
      : null,
    deployedAt: env("VERCEL_DEPLOYMENT_ID") ? new Date().toISOString() : null,
    url: env("VERCEL_PROJECT_PRODUCTION_URL") ? `https://${env("VERCEL_PROJECT_PRODUCTION_URL")}` : null,
    source: vercelEnv ? "vercel-runtime" : "vercel-env",
    updatedAt: new Date().toISOString(),
  };
}

function fromLocalGit(): SystemStatus | null {
  const commit = gitCommitInfo();
  if (!commit) return null;
  return {
    state: "operational",
    stateLabel: STATUS_LABELS.operational,
    env: "development",
    envLabel: "DEVELOPMENT",
    commit,
    deployedAt: commit.date,
    url: null,
    source: "git",
    updatedAt: new Date().toISOString(),
  };
}

function unavailableStatus(): SystemStatus {
  return {
    state: "unavailable",
    stateLabel: STATUS_LABELS.unavailable,
    env: "unknown",
    envLabel: "UNKNOWN",
    commit: null,
    deployedAt: null,
    url: null,
    source: "unavailable",
    updatedAt: new Date().toISOString(),
  };
}

let cache: { at: number; status: SystemStatus } | null = null;

export async function getSystemStatus(force = false): Promise<SystemStatus> {
  const now = Date.now();
  if (!force && cache && now - cache.at < TTL_MS) {
    return cache.status;
  }

  const token = env("VERCEL_API_TOKEN");
  const deploymentId = env("VERCEL_DEPLOYMENT_ID");

  const status =
    (token && deploymentId && (await fromVercelApi(token, deploymentId))) ||
    fromVercelGitEnv() ||
    fromLocalGit() ||
    unavailableStatus();

  cache = { at: now, status };
  return status;
}

export type { DeploymentEnv, DeploymentState, StatusSource, SystemStatus };