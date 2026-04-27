import { readdir } from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://portfolite-mocha.vercel.app/";
const APP_DIR = path.join(process.cwd(), "app");

const PAGE_FILE_PATTERN = /^page\.(js|jsx|ts|tsx|mdx)$/;
const SKIPPED_SEGMENTS = new Set(["api"]);

function normalizeRoute(route: string): string {
  if (!route || route === "/") return "/";
  const normalized = route.replace(/\/+/g, "/").replace(/\/$/, "");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function isGroupSegment(segment: string): boolean {
  return segment.startsWith("(") && segment.endsWith(")");
}

function isParallelSegment(segment: string): boolean {
  return segment.startsWith("@");
}

function sanitizeSegmentsForSitemap(segments: string[]): string[] {
  return segments.filter((segment) => {
    if (!segment) return false;
    if (SKIPPED_SEGMENTS.has(segment)) return false;
    if (isGroupSegment(segment)) return false;
    if (isParallelSegment(segment)) return false;
    return true;
  });
}

async function walkAppDirectory(
  dir: string,
  segments: string[] = [],
  routes = new Set<string>(),
): Promise<Set<string>> {
  const entries = await readdir(dir, { withFileTypes: true });
  const hasPageFile = entries.some(
    (entry) => entry.isFile() && PAGE_FILE_PATTERN.test(entry.name),
  );

  if (hasPageFile) {
    const route = sanitizeSegmentsForSitemap(segments).join("/");
    routes.add(normalizeRoute(route ? `/${route}` : "/"));
  }

  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) =>
        walkAppDirectory(path.join(dir, entry.name), [...segments, entry.name], routes),
      ),
  );

  return routes;
}

function makeRepresentativeRoute(route: string): string {
  // Convert dynamic routes like /projects/[id] to /projects for sitemap coverage.
  const staticOnly = route
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("["))
    .join("/");

  return normalizeRoute(staticOnly ? `/${staticOnly}` : "/");
}

function getChangeFrequency(
  route: string,
): "daily" | "weekly" | "monthly" {
  if (route === "/") return "daily";
  if (route.startsWith("/blog")) return "weekly";
  if (route.startsWith("/projects")) return "weekly";
  return "monthly";
}

function getPriority(route: string): number {
  if (route === "/") return 1;
  if (route.startsWith("/blog")) return 0.8;
  if (route.startsWith("/projects")) return 0.8;
  if (route === "/about" || route === "/contact") return 0.6;
  return 0.5;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const discoveredRoutes = await walkAppDirectory(APP_DIR);
  discoveredRoutes.add("/");

  const normalizedRoutes = new Set(
    [...discoveredRoutes].map((route) => makeRepresentativeRoute(route)),
  );

  return [...normalizedRoutes]
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
    .map((route) => ({
      url: new URL(route === "/" ? "" : route.slice(1), BASE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    }));
}
