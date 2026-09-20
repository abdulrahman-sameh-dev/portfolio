import { execSync } from "node:child_process";
import type { ActivityCommit, ActivitySource, GitActivity } from "@/lib/activity-types";

const GITHUB_API = "https://api.github.com";
const GITHUB_ACCEPT = "application/vnd.github+json";
const TTL_MS = 60_000;
const PER_PAGE = 30;

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function fromGitRemote(): { owner: string; repo: string } | null {
  try {
    const url = execSync("git config --get remote.origin.url", {
      encoding: "utf8",
      timeout: 4000,
    }).trim();
    if (!url) return null;
    const match =
      url.match(/github\.com[:/]([^/]+?)\/([^/.]+?)(?:\.git)?$/) ??
      url.match(/github\.com\/([^/]+?)\/([^/]+?)(?:\/)?$/);
    if (!match) return null;
    return { owner: match[1], repo: match[2] };
  } catch {
    return null;
  }
}

function repoIdentity(): { owner: string; repo: string } {
  const envOwner = env("GITHUB_OWNER");
  const envRepo = env("GITHUB_REPO");
  if (envOwner && envRepo) return { owner: envOwner, repo: envRepo };
  return fromGitRemote() ?? { owner: "abdulrahman-sameh-dev", repo: "portfolio" };
}

function subjectOf(message: string): string {
  return message.split("\n", 1)[0]?.trim() || message.trim();
}

async function fromGitHubApi(owner: string, repo: string): Promise<{
  activity: GitActivity | null;
  rateLimited: boolean;
}> {
  const headers: Record<string, string> = {
    Accept: GITHUB_ACCEPT,
    "User-Agent": "portfolite-status",
  };
  const token = env("GITHUB_API_TOKEN");
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=${PER_PAGE}`,
      { headers, cache: "no-store" }
    );

    if (res.status === 403 || res.status === 429) {
      return { activity: null, rateLimited: true };
    }
    if (!res.ok) return { activity: null, rateLimited: false };

    const data = (await res.json()) as Array<{
      sha?: string;
      html_url?: string;
      commit?: { message?: string; author?: { name?: string; date?: string } };
      author?: { login?: string } | null;
    }>;

    const commits: ActivityCommit[] = data
      .filter((item) => item.sha)
      .map((item) => {
        const sha = String(item.sha);
        return {
          sha,
          shortSha: sha.slice(0, 7),
          subject: subjectOf(item.commit?.message ?? ""),
          author: item.author?.login ?? item.commit?.author?.name ?? "unknown",
          date: item.commit?.author?.date ?? new Date().toISOString(),
          url: item.html_url ?? `${GITHUB_API}/repos/${owner}/${repo}/commit/${sha}`,
        };
      });

    return {
      activity: {
        source: "github-api",
        rateLimited: false,
        commits,
        updatedAt: new Date().toISOString(),
      },
      rateLimited: false,
    };
  } catch {
    return { activity: null, rateLimited: false };
  }
}

function gitLogCommits(owner: string, repo: string): GitActivity | null {
  try {
    const raw = execSync(
      `git log -${PER_PAGE} --format=%H%x1f%s%x1f%an%x1f%cI --date=iso-strict`,
      {
        encoding: "utf8",
        timeout: 4000,
        maxBuffer: 32 * 1024 * 1024,
      }
    ).trim();
    if (!raw) return null;

    const commits: ActivityCommit[] = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [sha, subject, author, date] = line.split("\x1f");
        return {
          sha,
          shortSha: sha.slice(0, 7),
          subject: subject ?? "",
          author: author ?? "unknown",
          date: date ?? new Date().toISOString(),
          url: `https://github.com/${owner}/${repo}/commit/${sha}`,
        };
      });

    return {
      source: "git",
      rateLimited: false,
      commits,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function unavailableActivity(rateLimited: boolean): GitActivity {
  return {
    source: "unavailable",
    rateLimited,
    commits: [],
    updatedAt: new Date().toISOString(),
  };
}

let cache: { at: number; activity: GitActivity } | null = null;

export async function getGitActivity(force = false): Promise<GitActivity> {
  const now = Date.now();
  if (!force && cache && now - cache.at < TTL_MS) {
    return cache.activity;
  }

  const { owner, repo } = repoIdentity();
  const fromApi = await fromGitHubApi(owner, repo);

  const activity =
    (fromApi.activity && fromApi.activity.commits.length > 0 && fromApi.activity) ||
    gitLogCommits(owner, repo) ||
    unavailableActivity(fromApi.rateLimited);

  cache = { at: now, activity };
  return activity;
}

export type { ActivityCommit, ActivitySource, GitActivity };