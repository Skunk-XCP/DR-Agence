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
  ];
}
