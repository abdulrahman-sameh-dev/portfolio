export type ActivitySource = "github-api" | "git" | "unavailable";

export interface ActivityCommit {
  sha: string;
  shortSha: string;
  subject: string;
  author: string;
  date: string;
  url: string;
}

export interface GitActivity {
  source: ActivitySource;
  rateLimited: boolean;
  commits: ActivityCommit[];
  updatedAt: string;
}