/**
 * Weekly Medical AI Newsletter 自動生成スクリプト
 *
 * fetch-medical-news.ts で取得した latest-fetch.json を読み込み、
 * Claude API で MDX 記事を生成して content/news/ に保存する。
 *
 * 使い方:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate-weekly-article.ts
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate-weekly-article.ts --dry-run
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY - Claude API キー (必須)
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ─── 設定 ───────────────────────────────────────────

const SCRIPT_DIR = import.meta.dirname ?? join(process.cwd(), "scripts");
const PROJECT_ROOT = join(SCRIPT_DIR, "..");
const DATA_FILE = join(SCRIPT_DIR, "data", "latest-fetch.json");
const NEWS_DIR = join(PROJECT_ROOT, "content", "news");

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 4096;

// ─── 型定義 ──────────────────────────────────────────

interface PubMedArticle {
  readonly pmid: string;
  readonly title: string;
  readonly authors: string;
  readonly journal: string;
  readonly pubDate: string;
  readonly abstract: string;
  readonly url: string;
}

interface PreprintArticle {
  readonly id: string;
  readonly title: string;
  readonly authors: string;
  readonly source: string;
  readonly pubDate: string;
  readonly abstract: string;
  readonly url: string;
  readonly category?: string;
}

interface RegulatoryItem {
  readonly title: string;
  readonly link: string;
  readonly pubDate: string;
  readonly source: string;
}

interface FetchResult {
  readonly fetchedAt: string;
  readonly papers: readonly PubMedArticle[];
  readonly preprints: readonly PreprintArticle[];
  readonly regulatory: readonly RegulatoryItem[];
  readonly stats: {
    readonly totalPapers: number;
    readonly totalPreprints: number;
    readonly totalRegulatory: number;
  };
}

// ─── ユーティリティ ─────────────────────────────────

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
}

function formatDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
}

function buildDataSummary(data: FetchResult): string {
  const papersList = data.papers
    .slice(0, 15)
    .map(
      (p) =>
        `- **${p.title}** (${p.journal}, ${p.pubDate})\n  著者: ${p.authors.slice(0, 100)}\n  URL: ${p.url}\n  概要: ${p.abstract.slice(0, 300)}`,
    )
    .join("\n\n");

  const preprintsList = data.preprints
    .slice(0, 10)
    .map(
      (p) =>
        `- **[${p.source}] ${p.title}** (${p.pubDate})\n  URL: ${p.url}\n  概要: ${p.abstract.slice(0, 300)}`,
    )
    .join("\n\n");

  const regulatoryList = data.regulatory
    .slice(0, 10)
    .map((r) => `- **[${r.source}] ${r.title}**\n  URL: ${r.link}`)
    .join("\n\n");

  return `## 取得データ概要
- 論文: ${data.stats.totalPapers} 件
- プレプリント: ${data.stats.totalPreprints} 件
- 規制ニュース: ${data.stats.totalRegulatory} 件

### PubMed 論文
${papersList || "（データなし）"}

### プレプリント (medRxiv / arXiv)
${preprintsList || "（データなし）"}

### 規制・行政ニュース
${regulatoryList || "（データなし）"}`;
}

// ─── プロンプト ──────────────────────────────────────

function buildPrompt(dataSummary: string, date: string, weekNum: number): string {
  return `あなたは医療AI分野に精通した日本人医師ライターです。以下の最新データから、Weekly Medical AI Newsletter の MDX 記事を生成してください。

## 要件

1. **フォーマット**: MDX (frontmatter + Markdown)
2. **言語**: 日本語（論文タイトル等は英語のまま可）
3. **読者**: 医師・医療従事者・医療AIに関心のあるエンジニア
4. **トーン**: 専門的だがわかりやすく。臨床的意義を必ず添える
5. **長さ**: 2000〜3000文字程度

## 構成

\`\`\`
---
title: "Weekly Medical AI Newsletter #${weekNum} (${date})"
description: "（主要トピック3つを簡潔に列挙）"
category: "ai-fundamentals"
contentType: "news"
newsType: "weekly"
difficulty: "intermediate"
tags: ["ニュースレター", "医療AI", ...関連タグ3-4個]
publishedAt: "${date}"
featured: true
---

# Medical AI Newsletter #${weekNum}

**${date}号** | （特集テーマ）

---

## 今週のハイライト

### （注目トピック1 — タイトル）
（200-400字の解説。臨床的意義・背景・エビデンスレベルを含む）

<Callout type="insight" title="ポイント">
- 箇条書き2-3点
</Callout>

---

### （注目トピック2）
...

---

## 論文ピックアップ
（興味深い論文2-3本を短く紹介）

## 規制・行政動向
（該当があれば。なければ省略可）

## 編集後記
（1-2文の締めくくり）
\`\`\`

## 注意事項
- データにある情報のみ使用。推測や捏造は絶対NG
- 具体的な数値（AUC、サンプルサイズ等）はデータにある場合のみ記載
- <Callout> は insight, warning, tip の3種類を適宜使い分ける
- Callout の type は必ず "insight", "warning", "tip" のいずれか
- MDX の frontmatter は --- で囲む
- データが少ない場合は無理に量を増やさず、質を重視

## 今週の取得データ

${dataSummary}

---

上記データから、最もインパクトの大きい3-5トピックを選び、MDXファイルの内容を **frontmatter含めて完全な形で** 出力してください。コードブロックで囲まず、そのままMDXとして出力してください。`;
}

// ─── メイン処理 ──────────────────────────────────────

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  console.log("=== Weekly Newsletter 自動生成 ===");
  console.log(`日時: ${new Date().toISOString()}`);
  console.log(`モード: ${isDryRun ? "DRY RUN" : "本番"}`);
  console.log(`モデル: ${MODEL}`);
  console.log();

  // 1. API キー確認
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY が設定されていません");
    process.exit(1);
  }

  // 2. データ読み込み
  if (!existsSync(DATA_FILE)) {
    console.error(`データファイルが見つかりません: ${DATA_FILE}`);
    console.error("先に npm run fetch-news を実行してください");
    process.exit(1);
  }

  const data: FetchResult = JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  console.log(`データ読み込み完了 (取得日: ${data.fetchedAt})`);
  console.log(
    `  論文: ${data.stats.totalPapers}, プレプリント: ${data.stats.totalPreprints}, 規制: ${data.stats.totalRegulatory}`,
  );

  if (
    data.stats.totalPapers === 0 &&
    data.stats.totalPreprints === 0 &&
    data.stats.totalRegulatory === 0
  ) {
    console.log("\nデータが空のため記事生成をスキップします");
    process.exit(0);
  }

  // 3. 日付・号数
  const today = new Date();
  const monday = getMonday(today);
  const dateStr = formatDateStr(monday);
  const weekNum = getWeekNumber(today);

  const outputFile = join(NEWS_DIR, `${dateStr}.mdx`);
  if (existsSync(outputFile)) {
    console.log(`\n${outputFile} は既に存在します。スキップします。`);
    process.exit(0);
  }

  // 4. Claude API 呼び出し
  console.log("\nClaude API 呼び出し中...");
  const dataSummary = buildDataSummary(data);
  const prompt = buildPrompt(dataSummary, dateStr, weekNum);

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  if (!content.includes("---")) {
    console.error("生成された記事にfrontmatterが含まれていません");
    console.error("出力:", content.slice(0, 200));
    process.exit(1);
  }

  console.log(`生成完了 (${content.length} 文字)`);
  console.log(
    `使用トークン: 入力=${response.usage.input_tokens}, 出力=${response.usage.output_tokens}`,
  );

  // 5. 保存
  if (isDryRun) {
    console.log("\n[DRY RUN] ファイル書き込みをスキップ");
    console.log("\n--- 生成プレビュー (先頭500文字) ---");
    console.log(content.slice(0, 500));
    return;
  }

  writeFileSync(outputFile, content, "utf-8");
  console.log(`\n保存完了: ${outputFile}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
