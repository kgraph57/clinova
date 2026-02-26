import type { MetadataRoute } from "next";
import { getAllArticles, getAllSlugs } from "@/lib/content";
import { getAllCourseSlugs, getAllLessonParams } from "@/lib/courses";
import { getAllBooks, getAllBookChapterParams } from "@/lib/book";

export const dynamic = "force-static";

const BASE_URL = "https://kgraph57.github.io/hoshizu";

export default function sitemap(): MetadataRoute.Sitemap {
  // 最新記事の更新日をリストページの lastModified に使う
  const articles = getAllArticles();
  const latestArticleDate = articles[0]?.publishedAt
    ? new Date(articles[0].publishedAt)
    : new Date();

  // slug → publishedAt のマップ
  const articleDateMap = new Map(
    articles.map((a) => [a.slug, new Date(a.updatedAt ?? a.publishedAt)]),
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/knowledge`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/learn`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/sukusuku-navi`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/futari-navi`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pediatric-learning`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const knowledgePages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/knowledge/${slug}`,
    lastModified: articleDateMap.get(slug) ?? latestArticleDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = getAllCourseSlugs().map((id) => ({
    url: `${BASE_URL}/learn/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lessonPages: MetadataRoute.Sitemap = getAllLessonParams().map(
    ({ courseId, lessonSlug }) => ({
      url: `${BASE_URL}/learn/${courseId}/${lessonSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }),
  );

  const bookPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/book`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...getAllBooks().map((book) => ({
      url: `${BASE_URL}/book/${book.bookId}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllBookChapterParams().map(({ bookId, chapterId }) => ({
      url: `${BASE_URL}/book/${bookId}/${chapterId}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [
    ...staticPages,
    ...knowledgePages,
    ...coursePages,
    ...lessonPages,
    ...bookPages,
  ];
}
