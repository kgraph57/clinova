import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getContentDirectories(): string[] {
  return ["prompts", "tips", "guides", "articles", "news"];
}

function readMDXFile(filePath: string): Article | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = path.basename(filePath, ".mdx");
    const stats = readingTime(content);

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      category: data.category ?? "ai-fundamentals",
      contentType: data.contentType ?? "article",
      newsType: data.newsType,
      difficulty: data.difficulty,
      tags: data.tags ?? [],
      publishedAt: data.publishedAt ?? new Date().toISOString().split("T")[0],
      updatedAt: data.updatedAt,
      author: data.author ?? "kenokamoto",
      featured: data.featured ?? false,
      riskLevel: data.riskLevel,
      estimatedReadTime: Math.ceil(stats.minutes),
      content,
      coverImage: data.coverImage ?? null,
    };
  } catch {
    return null;
  }
}

export const getAllArticles = cache(function getAllArticles(): Article[] {
  const articles: Article[] = [];

  for (const dir of getContentDirectories()) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const article = readMDXFile(path.join(dirPath, file));
      if (article) articles.push(article);
    }
  }

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
});

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 6);
}

export function getArticleBySlug(slug: string): Article | null {
  for (const dir of getContentDirectories()) {
    const filePath = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return readMDXFile(filePath);
    }
  }
  return null;
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return getAllArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.content.toLowerCase().includes(q),
  );
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getNewsArticles(): Article[] {
  return getAllArticles().filter((a) => a.contentType === "news");
}

export function getLatestNews(count = 3): Article[] {
  return getNewsArticles().slice(0, count);
}

export function getArticleCount(): Record<string, number> {
  const articles = getAllArticles();
  const counts: Record<string, number> = { all: articles.length };
  for (const article of articles) {
    counts[article.category] = (counts[article.category] ?? 0) + 1;
    counts[`type:${article.contentType}`] =
      (counts[`type:${article.contentType}`] ?? 0) + 1;
  }
  return counts;
}
