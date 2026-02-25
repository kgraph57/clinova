import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BOOKS_DIR = path.join(process.cwd(), "content", "book");

export interface BookPart {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly chapters: readonly string[];
}

export interface BookMetadata {
  readonly bookId: string;
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

function bookDir(bookId: string): string {
  return path.join(BOOKS_DIR, bookId);
}

function readBookIndex(bookId: string): BookMetadata | null {
  const indexPath = path.join(bookDir(bookId), "_index.mdx");
  if (!fs.existsSync(indexPath)) return null;

  const raw = fs.readFileSync(indexPath, "utf-8");
  const { data } = matter(raw);

  return {
    bookId,
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
        chapters: Array.isArray(p.chapters) ? p.chapters.map(String) : [],
      }),
    ),
  };
}

function readChapterFile(
  bookId: string,
  filename: string,
): ChapterFull | null {
  const filePath = path.join(bookDir(bookId), filename);
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

/* ── Multi-book queries ── */

export const getAllBooks = cache(function getAllBooks(): BookMetadata[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];

  const dirs = fs
    .readdirSync(BOOKS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const books: BookMetadata[] = [];
  for (const dir of dirs) {
    const meta = readBookIndex(dir);
    if (meta) books.push(meta);
  }

  return books;
});

export function getAllBookSlugs(): string[] {
  return getAllBooks().map((b) => b.bookId);
}

export function getAllBookChapterParams(): {
  bookId: string;
  chapterId: string;
}[] {
  const books = getAllBooks();
  const params: { bookId: string; chapterId: string }[] = [];

  for (const book of books) {
    const dir = bookDir(book.bookId);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx") && f !== "_index.mdx")
      .sort();

    for (const file of files) {
      const chapter = readChapterFile(book.bookId, file);
      if (chapter && chapter.status === "published") {
        params.push({ bookId: book.bookId, chapterId: chapter.slug });
      }
    }
  }

  return params;
}

/* ── Single-book queries ── */

export const getBookMetadata = cache(function getBookMetadata(
  bookId: string,
): BookMetadata {
  const meta = readBookIndex(bookId);
  if (!meta) {
    return {
      bookId,
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

export const getAllChapters = cache(function getAllChapters(
  bookId: string,
): ChapterMetadata[] {
  const dir = bookDir(bookId);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && f !== "_index.mdx")
    .sort();

  const chapters: ChapterMetadata[] = [];
  for (const file of files) {
    const chapter = readChapterFile(bookId, file);
    if (chapter) {
      const { content: _, ...meta } = chapter;
      chapters.push(meta);
    }
  }

  return chapters.sort((a, b) => a.order - b.order);
});

export function getChapterBySlug(
  bookId: string,
  slug: string,
): ChapterFull | null {
  return readChapterFile(bookId, `${slug}.mdx`);
}

export function getChapterNavigation(
  bookId: string,
  currentSlug: string,
): { prev: ChapterNavItem | null; next: ChapterNavItem | null } {
  const chapters = getAllChapters(bookId);
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

export function getChaptersForPart(
  bookId: string,
  partId: string,
): ChapterMetadata[] {
  return getAllChapters(bookId).filter((c) => c.partId === partId);
}

export function getAllChapterSlugs(bookId: string): string[] {
  return getAllChapters(bookId)
    .filter((c) => c.status === "published")
    .map((c) => c.slug);
}

export function getBookPartsWithChapters(
  bookId: string,
): ReadonlyArray<
  BookPart & { readonly chapterDetails: readonly ChapterMetadata[] }
> {
  const meta = getBookMetadata(bookId);
  const allChapters = getAllChapters(bookId);

  return meta.parts.map((part) => ({
    ...part,
    chapterDetails: part.chapters
      .map((slug) => allChapters.find((c) => c.slug === slug))
      .filter((c): c is ChapterMetadata => c !== undefined),
  }));
}
