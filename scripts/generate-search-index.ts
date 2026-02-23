/**
 * ビルド時に検索インデックスJSONを生成するスクリプト
 * public/search-index.json に出力
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const COURSES_DIR = path.join(CONTENT_DIR, "courses");
const OUTPUT = path.join(process.cwd(), "public", "search-index.json");

interface SearchEntry {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly contentType: string;
  readonly tags: readonly string[];
  readonly href: string;
}

function readContentEntries(): SearchEntry[] {
  const dirs = ["prompts", "tips", "guides", "articles", "news"];
  const entries: SearchEntry[] = [];

  for (const dir of dirs) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"))) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      const slug = path.basename(file, ".mdx");

      entries.push({
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        category: data.category ?? "",
        contentType: data.contentType ?? dir.replace(/s$/, ""),
        tags: data.tags ?? [],
        href: `/knowledge/${slug}`,
      });
    }
  }

  return entries;
}

function readCourseEntries(): SearchEntry[] {
  if (!fs.existsSync(COURSES_DIR)) return [];

  const entries: SearchEntry[] = [];
  const dirs = fs
    .readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const courseId of dirs) {
    const indexPath = path.join(COURSES_DIR, courseId, "_index.mdx");
    if (!fs.existsSync(indexPath)) continue;

    const raw = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(raw);

    entries.push({
      slug: courseId,
      title: data.title ?? "",
      description: data.description ?? "",
      category: data.category ?? "",
      contentType: "course",
      tags: data.skills ?? [],
      href: `/learn/${courseId}`,
    });
  }

  return entries;
}

const entries = [...readContentEntries(), ...readCourseEntries()];
fs.writeFileSync(OUTPUT, JSON.stringify(entries), "utf-8");
console.log(`Search index: ${entries.length} entries → ${OUTPUT}`);
