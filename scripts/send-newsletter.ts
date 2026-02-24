/**
 * ニュースレター送信スクリプト
 *
 * Resend API を使用して、登録済み購読者にニュースレターを送信する。
 *
 * 前提:
 *   - scripts/generate-newsletter.ts で HTML が生成済み
 *   - subscribers/subscribers.json に購読者リストが存在
 *
 * 環境変数:
 *   RESEND_API_KEY     - Resend API キー (必須)
 *   NEWSLETTER_FROM    - 送信元アドレス (任意、デフォルト: "Hoshizu <newsletter@hoshizu.dev>")
 *
 * 使い方:
 *   npx tsx scripts/send-newsletter.ts                           # 本番送信
 *   npx tsx scripts/send-newsletter.ts --dry-run                 # テスト (送信しない)
 *   npx tsx scripts/send-newsletter.ts --subject "カスタム件名"    # 件名を指定
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { Resend } from "resend";

// ─── 設定 ───────────────────────────────────────────

const PROJECT_ROOT = join(import.meta.dirname ?? ".", "..");
const NEWSLETTER_HTML = join(import.meta.dirname ?? ".", "data", "newsletter.html");
const NEWSLETTER_META = join(import.meta.dirname ?? ".", "data", "newsletter-meta.json");
const SUBSCRIBERS_FILE = join(PROJECT_ROOT, "subscribers", "subscribers.json");

const BATCH_SIZE = 100;
const BATCH_DELAY_MS = 1000;

const DEFAULT_FROM = "Hoshizu <newsletter@hoshizu.dev>";

// ─── 型定義 ──────────────────────────────────────────

interface Subscriber {
  readonly email: string;
  readonly name?: string;
  readonly subscribedAt: string;
  readonly active: boolean;
}

interface SubscriberList {
  readonly subscribers: readonly Subscriber[];
}

interface SendResult {
  readonly email: string;
  readonly success: boolean;
  readonly error?: string;
  readonly resendId?: string;
}

interface SendSummary {
  readonly totalSubscribers: number;
  readonly activeSubscribers: number;
  readonly sent: number;
  readonly failed: number;
  readonly dryRun: boolean;
  readonly subject: string;
  readonly results: readonly SendResult[];
  readonly startedAt: string;
  readonly completedAt: string;
}

interface NewsletterMeta {
  readonly subject: string;
  readonly generatedAt: string;
  readonly totalItems: number;
}

// ─── 引数パース ──────────────────────────────────────

function parseArgs(): { dryRun: boolean; subject: string | null } {
  const dryRun = process.argv.includes("--dry-run");
  const subjectIndex = process.argv.indexOf("--subject");
  const subject = subjectIndex !== -1 ? (process.argv[subjectIndex + 1] ?? null) : null;
  return { dryRun, subject };
}

// ─── 購読者読み込み ──────────────────────────────────

function loadSubscribers(): readonly Subscriber[] {
  if (!existsSync(SUBSCRIBERS_FILE)) {
    throw new Error(`購読者ファイルが見つかりません: ${SUBSCRIBERS_FILE}`);
  }

  const raw = readFileSync(SUBSCRIBERS_FILE, "utf-8");
  const data = JSON.parse(raw) as SubscriberList;

  if (!Array.isArray(data.subscribers)) {
    throw new Error("購読者データの形式が不正です。subscribers 配列が必要です。");
  }

  return data.subscribers;
}

// ─── ニュースレター読み込み ──────────────────────────

function loadNewsletterHtml(): string {
  if (!existsSync(NEWSLETTER_HTML)) {
    throw new Error(
      `ニュースレターHTMLが見つかりません: ${NEWSLETTER_HTML}\n` +
      "先に generate-newsletter.ts を実行してください。",
    );
  }
  return readFileSync(NEWSLETTER_HTML, "utf-8");
}

function loadNewsletterMeta(): NewsletterMeta | null {
  if (!existsSync(NEWSLETTER_META)) return null;
  try {
    return JSON.parse(readFileSync(NEWSLETTER_META, "utf-8")) as NewsletterMeta;
  } catch {
    return null;
  }
}

// ─── バッチ送信 ──────────────────────────────────────

function createBatches<T>(items: readonly T[], size: number): ReadonlyArray<readonly T[]> {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size));
  }
  return batches;
}

async function sendBatch(
  resend: Resend,
  subscribers: readonly Subscriber[],
  html: string,
  subject: string,
  from: string,
  dryRun: boolean,
): Promise<readonly SendResult[]> {
  const results: SendResult[] = [];

  for (const subscriber of subscribers) {
    if (dryRun) {
      console.log(`  [DRY RUN] ${subscriber.email}`);
      results.push({
        email: subscriber.email,
        success: true,
        resendId: "dry-run",
      });
      continue;
    }

    try {
      const response = await resend.emails.send({
        from,
        to: subscriber.email,
        subject,
        html,
      });

      if (response.error) {
        console.log(`  [FAIL] ${subscriber.email}: ${response.error.message}`);
        results.push({
          email: subscriber.email,
          success: false,
          error: response.error.message,
        });
      } else {
        console.log(`  [OK] ${subscriber.email} (ID: ${response.data?.id})`);
        results.push({
          email: subscriber.email,
          success: true,
          resendId: response.data?.id,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`  [ERROR] ${subscriber.email}: ${message}`);
      results.push({
        email: subscriber.email,
        success: false,
        error: message,
      });
    }
  }

  return results;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── メイン処理 ──────────────────────────────────────

async function main() {
  const { dryRun, subject: subjectOverride } = parseArgs();
  const startedAt = new Date().toISOString();

  console.log("=== Hoshizu Newsletter Sender ===");
  console.log(`日時: ${startedAt}`);
  console.log(`モード: ${dryRun ? "DRY RUN (送信しない)" : "本番送信"}`);
  console.log();

  // Resend API キー確認
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && !dryRun) {
    throw new Error(
      "RESEND_API_KEY 環境変数が設定されていません。\n" +
      "Resend (https://resend.com) でAPIキーを取得し、環境変数に設定してください。\n" +
      "テストの場合は --dry-run フラグを使用してください。",
    );
  }

  const from = process.env.NEWSLETTER_FROM ?? DEFAULT_FROM;

  // データ読み込み
  const html = loadNewsletterHtml();
  const meta = loadNewsletterMeta();
  const allSubscribers = loadSubscribers();
  const activeSubscribers = allSubscribers.filter((s) => s.active);

  // 件名決定
  const subject = subjectOverride ?? meta?.subject ?? `[Hoshizu] 医療AIニュースレター`;

  console.log(`件名: ${subject}`);
  console.log(`送信元: ${from}`);
  console.log(`購読者: ${allSubscribers.length} 名 (アクティブ: ${activeSubscribers.length} 名)`);
  console.log(`HTML サイズ: ${(html.length / 1024).toFixed(1)} KB`);
  if (meta) {
    console.log(`コンテンツ: ${meta.totalItems} 件`);
  }
  console.log();

  if (activeSubscribers.length === 0) {
    console.log("アクティブな購読者がいません。送信をスキップします。");
    return;
  }

  // バッチ処理
  const batches = createBatches(activeSubscribers, BATCH_SIZE);
  console.log(`バッチ数: ${batches.length} (${BATCH_SIZE}件/バッチ)`);
  console.log();

  const resend = new Resend(apiKey ?? "re_test_placeholder");
  const allResults: SendResult[] = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    if (!batch) continue;

    console.log(`--- バッチ ${i + 1}/${batches.length} (${batch.length} 件) ---`);

    const results = await sendBatch(resend, batch, html, subject, from, dryRun);
    for (const r of results) {
      allResults.push(r);
    }

    // バッチ間のレート制限待機
    if (i < batches.length - 1) {
      console.log(`  待機中 (${BATCH_DELAY_MS}ms)...`);
      await sleep(BATCH_DELAY_MS);
    }
  }

  // サマリー
  const completedAt = new Date().toISOString();
  const sent = allResults.filter((r) => r.success).length;
  const failed = allResults.filter((r) => !r.success).length;

  const summary: SendSummary = {
    totalSubscribers: allSubscribers.length,
    activeSubscribers: activeSubscribers.length,
    sent,
    failed,
    dryRun,
    subject,
    results: allResults,
    startedAt,
    completedAt,
  };

  console.log("\n=== 送信結果サマリー ===");
  console.log(`成功: ${sent} 件`);
  console.log(`失敗: ${failed} 件`);
  console.log(`完了: ${completedAt}`);

  if (failed > 0) {
    console.log("\n--- 失敗した送信先 ---");
    for (const r of allResults.filter((r) => !r.success)) {
      console.log(`  ${r.email}: ${r.error}`);
    }
  }

  // サマリーを標準出力にJSON形式で出力（GitHub Actions で利用）
  console.log("\n::set-output name=summary::" + JSON.stringify(summary));
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
