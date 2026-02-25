import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BOOK_DIR = path.join(process.cwd(), "content", "book");

export interface BookPart {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly chapters: readonly string[];
}

export interface BookMetadata {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly coverImage?: string;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly totalChapters: number;
  readonly estimatedTotalMinutes: number;
  readonly parts: readonly BookPart[];
}

export interface ChapterMetadata {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly partId: string;
  readonly partTitle: string;
  readonly order: number;
  readonly partOrder: number;
  readonly estimatedMinutes: number;
  readonly estimatedReadTime: number;
  readonly free: boolean;
  readonly status: "published" | "coming-soon";
  readonly tags: readonly string[];
}

export interface ChapterFull extends ChapterMetadata {
  readonly content: string;
}

export interface ChapterNavItem {
  readonly slug: string;
  readonly title: string;
  readonly order: number;
}

function readBookIndex(): BookMetadata | null {
  const indexPath = path.join(BOOK_DIR, "_index.mdx");
  if (!fs.existsSync(indexPath)) return null;

  const raw = fs.readFileSync(indexPath, "utf-8");
  const { data } = matter(raw);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    author: data.author ?? "",
    coverImage: data.coverImage,
    publishedAt: data.publishedAt ?? "",
    updatedAt: data.updatedAt,
    totalChapters: data.totalChapters ?? 0,
    estimatedTotalMinutes: data.estimatedTotalMinutes ?? 0,
    parts: (data.parts ?? []).map(
      (p: Record<string, unknown>, i: number) => ({
        id: String(p.id ?? ""),
        title: String(p.title ?? ""),
        description: String(p.description ?? ""),
        order: Number(p.order ?? i + 1),
        chapters: Array.isArray(p.chapters)
          ? p.chapters.map(String)
          : [],
      }),
    ),
  };
}

function readChapterFile(filename: string): ChapterFull | null {
  const filePath = path.join(BOOK_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filename, ".mdx");
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    partId: data.partId ?? "",
    partTitle: data.partTitle ?? "",
    order: data.order ?? 0,
    partOrder: data.partOrder ?? 0,
    estimatedMinutes: data.estimatedMinutes ?? Math.ceil(stats.minutes),
    estimatedReadTime: Math.ceil(stats.minutes),
    free: data.free ?? false,
    status: data.status === "coming-soon" ? "coming-soon" : "published",
    tags: data.tags ?? [],
    content,
  };
}

export const getBookMetadata = cache(function getBookMetadata(): BookMetadata {
  const meta = readBookIndex();
  if (!meta) {
    return {
      title: "",
      description: "",
      author: "",
      publishedAt: "",
      totalChapters: 0,
      estimatedTotalMinutes: 0,
      parts: [],
    };
  }
  return meta;
});

export const getAllChapters = cache(function getAllChapters(): ChapterMetadata[] {
  if (!fs.existsSync(BOOK_DIR)) return [];

  const files = fs
    .readdirSync(BOOK_DIR)
    .filter((f) => f.endsWith(".mdx") && f !== "_index.mdx")
    .sort();

  const chapters: ChapterMetadata[] = [];
  for (const file of files) {
    const chapter = readChapterFile(file);
    if (chapter) {
      const { content: _, ...meta } = chapter;
      chapters.push(meta);
    }
  }

  return chapters.sort((a, b) => a.order - b.order);
});

export function getChapterBySlug(slug: string): ChapterFull | null {
  return readChapterFile(`${slug}.mdx`);
}

export function getChapterNavigation(
  currentSlug: string,
): { prev: ChapterNavItem | null; next: ChapterNavItem | null } {
  const chapters = getAllChapters();
  const idx = chapters.findIndex((c) => c.slug === currentSlug);

  return {
    prev:
      idx > 0
        ? {
            slug: chapters[idx - 1].slug,
            title: chapters[idx - 1].title,
            order: chapters[idx - 1].order,
          }
        : null,
    next:
      idx < chapters.length - 1
        ? {
            slug: chapters[idx + 1].slug,
            title: chapters[idx + 1].title,
            order: chapters[idx + 1].order,
          }
        : null,
  };
}

export function getChaptersForPart(partId: string): ChapterMetadata[] {
  return getAllChapters().filter((c) => c.partId === partId);
}

export function getAllChapterSlugs(): string[] {
  return getAllChapters()
    .filter((c) => c.status === "published")
    .map((c) => c.slug);
}

export function getBookPartsWithChapters(): ReadonlyArray<
  BookPart & { readonly chapterDetails: readonly ChapterMetadata[] }
> {
  const meta = getBookMetadata();
  const allChapters = getAllChapters();

  return meta.parts.map((part) => ({
    ...part,
    chapterDetails: part.chapters
      .map((slug) => allChapters.find((c) => c.slug === slug))
      .filter((c): c is ChapterMetadata => c !== undefined),
  }));
}
