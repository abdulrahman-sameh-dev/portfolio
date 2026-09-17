export type DeploymentState =
  | "operational"
  | "building"
  | "error"
  | "queued"
  | "unavailable";

export type DeploymentEnv = "production" | "preview" | "development" | "unknown";

export type StatusSource =
  | "vercel-api"
  | "vercel-env"
  | "vercel-runtime"
  | "git"
  | "unavailable";

export type SystemStatus = {
  state: DeploymentState;
  stateLabel: string;
  env: DeploymentEnv;
  envLabel: string;
  commit: {
    sha: string;
    shortSha: string;
    ref: string;
    message: string | null;
    author: string | null;
    date: string | null;
  } | null;
  deployedAt: string | null;
  url: string | null;
  source: StatusSource;
  updatedAt: string;
};

export const STATUS_LABELS: Record<DeploymentState, string> = {
  operational: "OPERATIONAL",
  building: "BUILDING",
  error: "ERROR",
  queued: "QUEUED",
  unavailable: "UNAVAILABLE",
};