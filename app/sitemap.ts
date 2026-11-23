import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.siteUrl}/career-path`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.siteUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = siteConfig.projects.flatMap((project) => [
    {
      url: `${siteConfig.siteUrl}/projects/${project.slug}`,
      lastModified: new Date(project.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...(project.url?.caseStudy
      ? [
          {
            url: `${siteConfig.siteUrl}${project.url.caseStudy}`,
            lastModified: new Date(project.datePublished),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      : []),
  ]);

  return [...staticRoutes, ...projectRoutes];
}
