import type { MetadataRoute } from "next"
import { getAllArticles } from "@/lib/content"
import { SITE_CONFIG } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const baseUrl = SITE_CONFIG.url

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/knowledge/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: "weekly" as const,
    priority: article.featured ? 0.8 : 0.6,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/knowledge`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...articleEntries,
  ]
}
