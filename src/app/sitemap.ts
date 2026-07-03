import type { MetadataRoute } from "next";

const baseUrl = "https://www.donatien-rouzeirol.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/offres`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/geo.json`,
      lastModified: new Date("2026-07-03"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date("2026-07-03"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
