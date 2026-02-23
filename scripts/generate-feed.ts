/**
 * ビルド時にRSS 2.0フィードを生成するスクリプト
 * public/feed.xml に出力
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT = path.join(process.cwd(), "public", "feed.xml");

const SITE_URL = "https://kgraph57.github.io/hoshizu";
const SITE_TITLE = "Hoshizu - 医療AI ナレッジポータル";
const SITE_DESCRIPTION =
  "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行うHoshizuの公式フィード。";
const AUTHOR = "Hoshizu / Ken Okamoto";

interface RssItem {
  readonly title: string;
  readonly description: string;
  readonly link: string;
  readonly pubDate: string;
  readonly category: string;
  readonly contentType: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

function readItems(): RssItem[] {
  const dirs = ["news", "articles", "guides", "prompts", "tips"];
  const items: RssItem[] = [];

  for (const dir of dirs) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"))) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      const slug = path.basename(file, ".mdx");

      items.push({
        title: data.title ?? slug,
        description: data.description ?? "",
        link: `${SITE_URL}/knowledge/${slug}`,
        pubDate: data.publishedAt ?? data.date ?? new Date().toISOString().split("T")[0],
        category: data.category ?? dir,
        contentType: data.contentType ?? dir.replace(/s$/, ""),
      });
    }
  }

  return items.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );
}

const items = readItems().slice(0, 50); // 最新50件
const buildDate = new Date().toUTCString();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${escapeXml(AUTHOR)}</managingEditor>
    <ttl>1440</ttl>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc822(item.pubDate)}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
      <category>${escapeXml(item.category)}</category>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

fs.writeFileSync(OUTPUT, xml, "utf-8");
console.log(`RSS feed: ${items.length} items → ${OUTPUT}`);
