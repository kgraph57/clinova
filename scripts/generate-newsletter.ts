/**
 * ニュースレター HTML 生成スクリプト
 *
 * content/news/, content/guides/, content/prompts/ から
 * 直近1週間の記事を取得し、HTML メールテンプレートを生成する。
 *
 * 出力: scripts/data/newsletter.html
 *
 * 使い方:
 *   npx tsx scripts/generate-newsletter.ts
 *   npx tsx scripts/generate-newsletter.ts --days 14   # 14日間分
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
} from "fs";
import { join, basename } from "path";
import matter from "gray-matter";

// ─── 設定 ───────────────────────────────────────────

const SCRIPT_DIR = import.meta.dirname ?? join(process.cwd(), "scripts");
const PROJECT_ROOT = join(SCRIPT_DIR, "..");
const CONTENT_DIR = join(PROJECT_ROOT, "content");
const OUTPUT_DIR = join(SCRIPT_DIR, "data");
const OUTPUT_FILE = join(OUTPUT_DIR, "newsletter.html");

const SITE_URL = "https://kgraph57.github.io/hoshizu";
const SITE_NAME = "Hoshizu";
const SITE_NAME_JP = "星図";
const UNSUBSCRIBE_URL = `${SITE_URL}/unsubscribe`;

/**
 * コンテンツディレクトリとラベルのマッピング
 */
const CONTENT_SECTIONS = [
  { dir: "news", label: "最新ニュース", icon: "newspaper" },
  { dir: "guides", label: "新着ガイド", icon: "book-open" },
  { dir: "prompts", label: "新着プロンプト", icon: "terminal" },
  { dir: "articles", label: "新着記事", icon: "file-text" },
] as const;

// ─── 型定義 ──────────────────────────────────────────

interface ContentItem {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly category: string;
  readonly contentType: string;
  readonly tags: readonly string[];
  readonly url: string;
}

interface NewsletterData {
  readonly generatedAt: string;
  readonly periodDays: number;
  readonly sections: ReadonlyArray<{
    readonly label: string;
    readonly items: readonly ContentItem[];
  }>;
  readonly totalItems: number;
}

// ─── コンテンツ読み込み ──────────────────────────────

function parseArgs(): { days: number } {
  const daysIndex = process.argv.indexOf("--days");
  const days =
    daysIndex !== -1 ? parseInt(process.argv[daysIndex + 1] ?? "7", 10) : 7;
  return { days: Number.isNaN(days) ? 7 : days };
}

function readContentItems(dirName: string, cutoffDate: Date): ContentItem[] {
  const dirPath = join(CONTENT_DIR, dirName);
  if (!existsSync(dirPath)) return [];

  const files = readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
  const items: ContentItem[] = [];

  for (const file of files) {
    try {
      const raw = readFileSync(join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      const slug = basename(file, ".mdx");
      const publishedAt = data.publishedAt ?? data.date ?? "";

      if (!publishedAt) continue;

      const pubDate = new Date(publishedAt);
      if (pubDate < cutoffDate) continue;

      items.push({
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        publishedAt,
        category: data.category ?? dirName,
        contentType: data.contentType ?? dirName.replace(/s$/, ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        url: `${SITE_URL}/knowledge/${slug}`,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`  [WARN] ${file}: ${msg}`);
    }
  }

  return items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function collectNewsletterData(days: number): NewsletterData {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  cutoffDate.setHours(0, 0, 0, 0);

  const sections = CONTENT_SECTIONS.map((section) => {
    const items = readContentItems(section.dir, cutoffDate);
    return { label: section.label, items };
  }).filter((section) => section.items.length > 0);

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);

  return {
    generatedAt: new Date().toISOString(),
    periodDays: days,
    sections,
    totalItems,
  };
}

// ─── HTML テンプレート ────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

function renderItemHtml(item: ContentItem): string {
  const tagsHtml =
    item.tags.length > 0
      ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8;">${item.tags
          .slice(0, 3)
          .map((t) => `#${escapeHtml(String(t))}`)
          .join("  ")}</p>`
      : "";

  return `
            <tr>
              <td style="padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
                <a href="${item.url}" style="text-decoration: none; color: #1e293b; font-size: 15px; font-weight: 600; line-height: 1.4;">
                  ${escapeHtml(item.title)}
                </a>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.6;">
                  ${escapeHtml(item.description).slice(0, 200)}${item.description.length > 200 ? "..." : ""}
                </p>
                <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8;">
                  ${formatDate(item.publishedAt)}
                </p>
                ${tagsHtml}
              </td>
            </tr>`;
}

function renderSectionHtml(
  label: string,
  items: readonly ContentItem[],
): string {
  return `
          <!-- Section: ${label} -->
          <tr>
            <td style="padding: 24px 0 8px 0;">
              <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: 0.02em;">
                ${escapeHtml(label)}
              </h2>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${items.map(renderItemHtml).join("")}
              </table>
            </td>
          </tr>`;
}

function generateNewsletterHtml(data: NewsletterData, subject: string): string {
  const dateRange = (() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - data.periodDays);
    return `${formatDate(start.toISOString())} - ${formatDate(end.toISOString())}`;
  })();

  const sectionsHtml = data.sections
    .map((s) => renderSectionHtml(s.label, s.items))
    .join("");

  const noContentHtml =
    data.totalItems === 0
      ? `
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <p style="font-size: 14px; color: #94a3b8;">
                この期間の新着コンテンツはありません。
              </p>
            </td>
          </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0f172a; border-radius: 12px 12px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.05em;">
                      ${escapeHtml(SITE_NAME)} / ${escapeHtml(SITE_NAME_JP)}
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8;">
                      医療AI ナレッジポータル - Weekly Newsletter
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Greeting -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.8;">
                      いつも ${escapeHtml(SITE_NAME)} をご利用いただきありがとうございます。<br>
                      ${escapeHtml(dateRange)} の期間に公開された新着コンテンツをお届けします。
                    </p>
                  </td>
                </tr>

                ${sectionsHtml}
                ${noContentHtml}

                <!-- CTA -->
                <tr>
                  <td style="padding: 32px 0 0 0; text-align: center;">
                    <a href="${SITE_URL}" style="display: inline-block; padding: 12px 32px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 8px; letter-spacing: 0.02em;">
                      サイトで全記事を読む
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f1f5f9; border-radius: 0 0 12px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.8;">
                      ${escapeHtml(SITE_NAME)} / ${escapeHtml(SITE_NAME_JP)} - 医療AI ナレッジポータル<br>
                      このメールは ${escapeHtml(SITE_NAME)} ニュースレターに登録いただいた方にお送りしています。
                    </p>
                    <p style="margin: 12px 0 0 0; font-size: 12px;">
                      <a href="${UNSUBSCRIBE_URL}" style="color: #64748b; text-decoration: underline;">
                        配信停止はこちら
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─── メイン処理 ──────────────────────────────────────

function main() {
  const { days } = parseArgs();

  console.log("=== Hoshizu Newsletter Generator ===");
  console.log(`期間: 直近 ${days} 日間`);
  console.log(`日時: ${new Date().toISOString()}`);
  console.log();

  // コンテンツ収集
  const data = collectNewsletterData(days);

  console.log("--- 収集結果 ---");
  for (const section of data.sections) {
    console.log(`  ${section.label}: ${section.items.length} 件`);
    for (const item of section.items) {
      console.log(`    - ${item.title}`);
    }
  }
  console.log(`  合計: ${data.totalItems} 件`);

  if (data.totalItems === 0) {
    console.log(
      "\n新着コンテンツがありません。空のニュースレターを生成します。",
    );
  }

  // HTML 生成
  const subject = `[${SITE_NAME}] 医療AIニュースレター (${formatDate(new Date().toISOString())})`;
  const html = generateNewsletterHtml(data, subject);

  // 出力ディレクトリ確保
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  writeFileSync(OUTPUT_FILE, html, "utf-8");
  console.log(`\nHTML出力: ${OUTPUT_FILE}`);
  console.log(`件名候補: ${subject}`);

  // メタデータも出力（send-newsletter.ts が参照可能）
  const metaFile = join(OUTPUT_DIR, "newsletter-meta.json");
  writeFileSync(
    metaFile,
    JSON.stringify(
      {
        generatedAt: data.generatedAt,
        subject,
        periodDays: data.periodDays,
        totalItems: data.totalItems,
        sections: data.sections.map((s) => ({
          label: s.label,
          count: s.items.length,
        })),
      },
      null,
      2,
    ),
    "utf-8",
  );
  console.log(`メタデータ: ${metaFile}`);
}

main();
