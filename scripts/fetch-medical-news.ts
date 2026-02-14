/**
 * 医療AI最新動向の自動キャッチアップスクリプト（無料版）
 *
 * データソース（全て無料）:
 * - PubMed E-utilities API (論文)
 * - 厚労省 RSS (規制動向)
 * - PMDA RSS (医療機器・SaMD関連)
 *
 * 出力: scripts/data/latest-fetch.json にデータ保存
 * 記事作成: Claude Code に「最新データから記事書いて」と依頼
 *
 * 使い方:
 *   npm run fetch-news        # データ取得
 *   npm run fetch-news:dry    # テスト（結果をコンソールのみに出力）
 *
 * 環境変数:
 *   NCBI_API_KEY - PubMed API キー (任意、レート制限緩和)
 *   DRY_RUN      - "true" でファイル書き込みスキップ
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

// ─── 設定 ───────────────────────────────────────────

const SCRIPT_DIR = import.meta.dirname ?? ".";
const DATA_DIR = join(SCRIPT_DIR, "data");
const OUTPUT_FILE = join(DATA_DIR, "latest-fetch.json");
const HISTORY_DIR = join(DATA_DIR, "history");

const CONFIG = {
  pubmedQueries: [
    '("artificial intelligence"[Title] OR "machine learning"[Title] OR "large language model"[Title]) AND ("clinical trial"[Publication Type] OR "randomized"[Title]) AND "2025"[Date - Publication]',
    '("GPT-4"[Title/Abstract] OR "Med-PaLM"[Title/Abstract] OR "medical AI"[Title]) AND ("2025"[Date - Publication] OR "2026"[Date - Publication])',
    '("AI diagnosis"[Title] OR "AI radiology"[Title] OR "digital pathology"[Title] OR "AI drug discovery"[Title]) AND "2025"[Date - Publication]',
  ],
  pubmedMaxResults: 10,
  /** medRxiv API (医療プレプリント) */
  medrxivQuery: "artificial+intelligence+clinical",
  medrxivMaxResults: 15,
  /** arXiv RSS (AI論文プレプリント) */
  arxivCategories: [
    { id: "cs.AI", name: "Artificial Intelligence" },
    { id: "cs.CL", name: "Computation and Language (NLP)" },
  ],
  arxivMedicalKeywords: [
    "medical",
    "clinical",
    "health",
    "patient",
    "diagnosis",
    "radiology",
    "pathology",
    "drug",
    "pharma",
    "biomedical",
    "hospital",
    "physician",
    "nursing",
    "surgery",
    "oncology",
  ],
  /** 規制・ニュース RSS フィード */
  regulatoryFeeds: [
    {
      name: "厚生労働省 新着情報",
      url: "https://www.mhlw.go.jp/stf/news.rdf",
      keywords: [
        "AI",
        "人工知能",
        "医療情報",
        "個人情報",
        "SaMD",
        "プログラム医療機器",
        "デジタル",
        "オンライン診療",
        "電子カルテ",
        "医療DX",
      ],
    },
    {
      name: "PMDA 安全性情報",
      url: "https://www.pmda.go.jp/rss_018.xml",
      keywords: ["プログラム", "AI", "ソフトウェア", "医療機器"],
    },
    {
      name: "PMDA 承認審査",
      url: "https://www.pmda.go.jp/rss_021.xml",
      keywords: ["プログラム", "AI", "ソフトウェア", "SaMD"],
    },
    {
      name: "PMDA 規制科学・標準化",
      url: "https://www.pmda.go.jp/rss_017.xml",
      keywords: ["プログラム", "AI", "ソフトウェア", "SaMD", "デジタル"],
    },
    {
      name: "FDA MedWatch",
      url: "https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/medwatch/rss.xml",
      keywords: ["software", "AI", "algorithm", "machine learning", "SaMD"],
    },
  ],
} as const;

// ─── 型定義 ──────────────────────────────────────────

interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  pubDate: string;
  abstract: string;
  url: string;
}

interface RegulatoryItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface PreprintArticle {
  id: string;
  title: string;
  authors: string;
  source: "medRxiv" | "arXiv";
  pubDate: string;
  abstract: string;
  url: string;
  category?: string;
}

interface FetchResult {
  fetchedAt: string;
  papers: PubMedArticle[];
  preprints: PreprintArticle[];
  regulatory: RegulatoryItem[];
  stats: {
    totalPapers: number;
    totalPreprints: number;
    totalRegulatory: number;
    queriesUsed: number;
    abstractsFound: number;
  };
}

// ─── PubMed E-utilities ─────────────────────────────

async function searchPubMed(
  query: string,
  maxResults: number,
): Promise<string[]> {
  const apiKey = process.env.NCBI_API_KEY
    ? `&api_key=${process.env.NCBI_API_KEY}`
    : "";
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=${maxResults}&sort=date&term=${encodeURIComponent(query)}${apiKey}`;

  const res = await fetch(searchUrl);
  if (!res.ok) throw new Error(`PubMed search failed: ${res.status}`);

  const data = (await res.json()) as { esearchresult: { idlist: string[] } };
  return data.esearchresult.idlist;
}

async function fetchPubMedArticles(pmids: string[]): Promise<PubMedArticle[]> {
  if (pmids.length === 0) return [];

  const apiKey = process.env.NCBI_API_KEY
    ? `&api_key=${process.env.NCBI_API_KEY}`
    : "";
  const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${pmids.join(",")}${apiKey}`;

  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error(`PubMed fetch failed: ${res.status}`);

  const data = (await res.json()) as {
    result: Record<
      string,
      {
        uid: string;
        title: string;
        authors: Array<{ name: string }>;
        source: string;
        pubdate: string;
      }
    >;
  };

  const articles: PubMedArticle[] = [];
  for (const pmid of pmids) {
    const article = data.result[pmid];
    if (!article) continue;
    articles.push({
      pmid: article.uid,
      title: article.title,
      authors: article.authors?.map((a) => a.name).join(", ") ?? "Unknown",
      journal: article.source,
      pubDate: article.pubdate,
      abstract: "",
      url: `https://pubmed.ncbi.nlm.nih.gov/${article.uid}/`,
    });
  }

  return articles;
}

async function fetchAbstracts(pmids: string[]): Promise<Map<string, string>> {
  if (pmids.length === 0) return new Map();

  const apiKey = process.env.NCBI_API_KEY
    ? `&api_key=${process.env.NCBI_API_KEY}`
    : "";
  const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=${pmids.join(",")}${apiKey}`;

  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error(`PubMed abstract fetch failed: ${res.status}`);

  const xml = await res.text();
  const abstracts = new Map<string, string>();

  const articleMatches = xml.matchAll(
    /<PubmedArticle>[\s\S]*?<PMID[^>]*>(\d+)<\/PMID>[\s\S]*?(?:<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>|<\/PubmedArticle>)/g,
  );

  for (const match of articleMatches) {
    const pmid = match[1];
    const abstractText = match[2]?.replace(/<[^>]+>/g, "") ?? "";
    if (pmid && abstractText) {
      abstracts.set(pmid, abstractText);
    }
  }

  return abstracts;
}

// ─── medRxiv API ────────────────────────────────────

async function fetchMedRxivPreprints(
  query: string,
  maxResults: number,
): Promise<PreprintArticle[]> {
  try {
    // medRxiv content API: 直近30日の論文を取得
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fromDate = thirtyDaysAgo.toISOString().split("T")[0];
    const toDate = today.toISOString().split("T")[0];

    const url = `https://api.medrxiv.org/details/medrxiv/${fromDate}/${toDate}/0/json`;

    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`medRxiv API: ${res.status}`);

    const data = (await res.json()) as {
      collection: Array<{
        rel_doi: string;
        rel_title: string;
        rel_authors: string;
        rel_date: string;
        rel_abs: string;
        category: string;
      }>;
    };

    const queryWords = query.split("+").map((w) => w.toLowerCase());

    return data.collection
      .filter((item) => {
        const text =
          `${item.rel_title} ${item.rel_abs} ${item.category}`.toLowerCase();
        return queryWords.every((w) => text.includes(w));
      })
      .slice(0, maxResults)
      .map((item) => ({
        id: item.rel_doi,
        title: item.rel_title,
        authors: item.rel_authors,
        source: "medRxiv" as const,
        pubDate: item.rel_date,
        abstract: item.rel_abs.slice(0, 500),
        url: `https://doi.org/${item.rel_doi}`,
        category: item.category,
      }));
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`  medRxiv取得エラー: ${msg}`);
    return [];
  }
}

// ─── arXiv API ──────────────────────────────────────

async function fetchArxivPreprints(
  categories: ReadonlyArray<{ id: string; name: string }>,
  medicalKeywords: readonly string[],
): Promise<PreprintArticle[]> {
  try {
    // arXiv API: 医療関連のAI論文を検索
    const catQuery = categories.map((c) => `cat:${c.id}`).join("+OR+");
    const kwQuery = medicalKeywords
      .slice(0, 5)
      .map((k) => `all:${k}`)
      .join("+OR+");
    const url = `https://export.arxiv.org/api/query?search_query=(${catQuery})+AND+(${kwQuery})&sortBy=submittedDate&sortOrder=descending&max_results=15`;

    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`arXiv API: ${res.status}`);

    const xml = await res.text();
    const entries: PreprintArticle[] = [];

    const entryMatches = xml.matchAll(
      /<entry>[\s\S]*?<id>([\s\S]*?)<\/id>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<summary>([\s\S]*?)<\/summary>[\s\S]*?<published>([\s\S]*?)<\/published>[\s\S]*?(?:<name>([\s\S]*?)<\/name>)?[\s\S]*?<\/entry>/g,
    );

    for (const match of entryMatches) {
      const arxivUrl = match[1]?.trim() ?? "";
      const arxivId = arxivUrl.replace("http://arxiv.org/abs/", "");
      entries.push({
        id: arxivId,
        title: (match[2]?.trim() ?? "").replace(/\s+/g, " "),
        authors: match[5]?.trim() ?? "Unknown",
        source: "arXiv",
        pubDate: match[4]?.trim().split("T")[0] ?? "",
        abstract: (match[3]?.trim() ?? "").replace(/\s+/g, " ").slice(0, 500),
        url: arxivUrl,
        category: categories.map((c) => c.name).join(", "),
      });
    }

    return entries;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`  arXiv取得エラー: ${msg}`);
    return [];
  }
}

// ─── RSS フィード取得 ────────────────────────────────

async function fetchRssItems(
  feedUrl: string,
  keywords: readonly string[],
  sourceName: string,
): Promise<RegulatoryItem[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { "User-Agent": "Hoshizu-Medical-News-Fetcher/1.0" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.warn(`  [${res.status}] ${feedUrl}`);
      return [];
    }

    const xml = await res.text();
    const items: RegulatoryItem[] = [];

    // RSS 2.0 / RDF 両対応
    const itemMatches = xml.matchAll(
      /<item[^>]*>[\s\S]*?<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>[\s\S]*?<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>[\s\S]*?(?:<(?:pubDate|dc:date)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:pubDate|dc:date)>)?[\s\S]*?<\/item>/g,
    );

    for (const match of itemMatches) {
      const title = match[1]?.trim() ?? "";
      const link = match[2]?.trim() ?? "";
      const pubDate = match[3]?.trim() ?? "";

      const isRelevant = keywords.some(
        (kw) => title.includes(kw) || link.includes(kw),
      );
      if (isRelevant) {
        items.push({ title, link, pubDate, source: sourceName });
      }
    }

    return items;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  RSS取得失敗 (${sourceName}): ${message}`);
    return [];
  }
}

// ─── データ保存 ──────────────────────────────────────

function saveResults(result: FetchResult): string {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(HISTORY_DIR)) mkdirSync(HISTORY_DIR, { recursive: true });

  // 最新データを保存
  writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), "utf-8");

  // 日付付きの履歴も保存
  const dateStr = new Date().toISOString().split("T")[0];
  const historyFile = join(HISTORY_DIR, `fetch-${dateStr}.json`);
  writeFileSync(historyFile, JSON.stringify(result, null, 2), "utf-8");

  return OUTPUT_FILE;
}

function loadPreviousPmids(): Set<string> {
  try {
    if (!existsSync(OUTPUT_FILE)) return new Set();
    const prev = JSON.parse(readFileSync(OUTPUT_FILE, "utf-8")) as FetchResult;
    return new Set(prev.papers.map((p) => p.pmid));
  } catch {
    return new Set();
  }
}

// ─── メイン処理 ──────────────────────────────────────

async function main() {
  const isDryRun = process.env.DRY_RUN === "true";

  console.log("=== 医療AI最新動向キャッチアップ ===");
  console.log(`日時: ${new Date().toISOString()}`);
  console.log(
    `モード: ${isDryRun ? "DRY RUN（ファイル書き込みなし）" : "本番"}`,
  );
  console.log();

  const previousPmids = loadPreviousPmids();
  if (previousPmids.size > 0) {
    console.log(`前回の取得: ${previousPmids.size} 件の論文`);
  }

  // 1. PubMed 検索
  console.log("\n--- PubMed 論文検索 ---");
  const allPmids = new Set<string>();

  for (const query of CONFIG.pubmedQueries) {
    try {
      const pmids = await searchPubMed(query, CONFIG.pubmedMaxResults);
      for (const id of pmids) allPmids.add(id);
      console.log(`  クエリ結果: ${pmids.length} 件`);
      await new Promise((resolve) => setTimeout(resolve, 400));
    } catch (error) {
      console.warn(`  検索エラー: ${error}`);
    }
  }

  const uniquePmids = [...allPmids];
  const newPmids = uniquePmids.filter((id) => !previousPmids.has(id));
  console.log(`  合計: ${uniquePmids.length} 件 (新規: ${newPmids.length} 件)`);

  // 2. 論文詳細取得
  console.log("\n--- 論文詳細取得 ---");
  const articles = await fetchPubMedArticles(uniquePmids);
  await new Promise((resolve) => setTimeout(resolve, 400));

  // 3. アブストラクト取得
  console.log("  アブストラクト取得中...");
  const abstracts = await fetchAbstracts(uniquePmids);
  const enrichedArticles = articles.map((a) => ({
    ...a,
    abstract: abstracts.get(a.pmid) ?? "",
  }));
  console.log(`  取得完了: ${abstracts.size} 件`);

  // 4. medRxiv プレプリント取得
  console.log("\n--- medRxiv プレプリント ---");
  const medrxivArticles = await fetchMedRxivPreprints(
    CONFIG.medrxivQuery,
    CONFIG.medrxivMaxResults,
  );
  console.log(`  取得: ${medrxivArticles.length} 件`);

  // 5. arXiv プレプリント取得
  console.log("\n--- arXiv プレプリント ---");
  const arxivArticles = await fetchArxivPreprints(
    CONFIG.arxivCategories,
    CONFIG.arxivMedicalKeywords,
  );
  console.log(`  取得: ${arxivArticles.length} 件`);

  const allPreprints = [...medrxivArticles, ...arxivArticles];

  // 6. 規制関連 RSS 取得
  console.log("\n--- 規制関連 RSS フィード ---");
  const regulatoryItems: RegulatoryItem[] = [];
  for (const feed of CONFIG.regulatoryFeeds) {
    const items = await fetchRssItems(feed.url, feed.keywords, feed.name);
    for (const item of items) {
      regulatoryItems.push(item);
    }
    console.log(`  ${feed.name}: ${items.length} 件`);
  }

  // 7. 結果まとめ
  const result: FetchResult = {
    fetchedAt: new Date().toISOString(),
    papers: enrichedArticles,
    preprints: allPreprints,
    regulatory: regulatoryItems,
    stats: {
      totalPapers: enrichedArticles.length,
      totalPreprints: allPreprints.length,
      totalRegulatory: regulatoryItems.length,
      queriesUsed: CONFIG.pubmedQueries.length,
      abstractsFound: abstracts.size,
    },
  };

  // 8. サマリー表示
  console.log("\n=== 取得結果サマリー ===");
  console.log(
    `PubMed論文: ${result.stats.totalPapers} (アブストラクト: ${result.stats.abstractsFound})`,
  );
  console.log(
    `プレプリント: ${result.stats.totalPreprints} (medRxiv: ${medrxivArticles.length}, arXiv: ${arxivArticles.length})`,
  );
  console.log(`規制ニュース: ${result.stats.totalRegulatory}`);
  console.log(`新規PubMed論文: ${newPmids.length}`);

  if (enrichedArticles.length > 0) {
    console.log("\n主なPubMed論文:");
    for (const a of enrichedArticles.slice(0, 5)) {
      const isNew = !previousPmids.has(a.pmid) ? " [NEW]" : "";
      console.log(`  - ${a.title.slice(0, 70)}... (${a.journal})${isNew}`);
    }
  }

  if (allPreprints.length > 0) {
    console.log("\n主なプレプリント:");
    for (const p of allPreprints.slice(0, 5)) {
      console.log(`  - [${p.source}] ${p.title.slice(0, 65)}...`);
    }
  }

  if (regulatoryItems.length > 0) {
    console.log("\n規制関連ニュース:");
    for (const r of regulatoryItems.slice(0, 5)) {
      console.log(`  - [${r.source}] ${r.title.slice(0, 60)}`);
    }
  }

  // 7. 保存
  if (isDryRun) {
    console.log("\n[DRY RUN] ファイル書き込みをスキップしました");
    return;
  }

  const savedPath = saveResults(result);
  console.log(`\n保存完了: ${savedPath}`);
  console.log("\n次のステップ:");
  console.log("  Claude Code で「最新データから記事書いて」と依頼してください");
  console.log(`  データファイル: ${savedPath}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
