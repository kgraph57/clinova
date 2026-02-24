import {
  Siren,
  Presentation,
  BookOpen,
  FileText,
  MessageCircleHeart,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Article } from "./types";

export interface UseCase {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly bgColor: string;
  readonly darkBgColor: string;
  readonly featured: readonly string[];
  readonly slugPatterns: readonly RegExp[];
  readonly categories: readonly string[];
}

export const USE_CASES: readonly UseCase[] = [
  {
    id: "oncall",
    title: "当直・救急",
    subtitle: "On-call & Emergency",
    description:
      "当直前の準備、救急対応プロトコル、鑑別診断の整理に。「今夜の当直が不安」な時に開くセクション。",
    icon: Siren,
    color: "text-red-600",
    bgColor: "bg-red-50",
    darkBgColor: "dark:bg-red-950/30",
    featured: [
      "on-call-ai-toolkit",
      "ai-sepsis-early-warning",
      "ai-antibiotic-stewardship",
      "ai-medication-safety",
      "ai-icu-critical-care",
    ],
    slugPatterns: [
      /oncall/,
      /on-call/,
      /emergency/,
      /night-shift/,
      /differential/,
      /risk-stratif/,
      /medication-check/,
      /drug-interaction/,
      /interaction-check/,
      /renal-dosing/,
      /medication-dosing/,
      /polypharmacy/,
      /lab-interpretation/,
      /symptom-analysis/,
      /handoff/,
      /sepsis/,
      /early-warning/,
      /radiology-collaboration/,
      /triage-to-consultation/,
      /antibiotic/,
      /stewardship/,
      /icu-critical/,
      /medication-safety/,
    ],
    categories: ["clinical", "diagnosis"],
  },
  {
    id: "conference",
    title: "カンファ・プレゼン",
    subtitle: "Conference & Presentation",
    description:
      "症例プレゼン、抄読会、学会発表の準備に。「明日カンファで発表」な時の味方。",
    icon: Presentation,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-950/30",
    featured: [
      "conference-prep-workflow",
      "morning-rounds-prep",
      "ai-tumor-board-trial-matching",
      "case-presentation",
      "journal-club-express",
    ],
    slugPatterns: [
      /conference/,
      /presentation/,
      /jc-/,
      /journal-club/,
      /teaching/,
      /explain-to-junior/,
      /case-report/,
      /case-presentation/,
      /poster/,
      /slide/,
      /morning-rounds/,
      /tumor-board/,
      /trial-matching/,
    ],
    categories: [],
  },
  {
    id: "research",
    title: "論文・研究",
    subtitle: "Research & Publication",
    description:
      "文献検索からデータ解析、論文執筆、投稿まで。初めての症例報告から系統的レビューまで対応。",
    icon: BookOpen,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-950/30",
    featured: [
      "first-case-report",
      "literature-search",
      "res-stats-python",
      "research-paper-summary",
      "pubmed-search-guide",
    ],
    slugPatterns: [
      /^research-/,
      /^res-/,
      /literature/,
      /systematic-review/,
      /meta-analysis/,
      /manuscript/,
      /grant/,
      /ethics-review/,
      /paper-writing/,
      /data-visualization/,
      /english-proofread/,
      /observational-study/,
      /aacr-/,
      /critical-appraisal/,
      /evidence-summary/,
      /abstract-draft/,
      /pubmed/,
      /qi-project/,
    ],
    categories: ["research"],
  },
  {
    id: "documentation",
    title: "文書作成",
    subtitle: "Medical Documentation",
    description:
      "退院サマリー、紹介状、インシデントレポート。日常の書類作成を効率化するテンプレート集。",
    icon: FileText,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-950/30",
    featured: [
      "doc-discharge-summary",
      "ai-ambient-documentation",
      "ai-discharge-workflow",
      "admin-referral-letter",
      "admin-incident-report",
    ],
    slugPatterns: [
      /^admin-/,
      /^doc-/,
      /discharge/,
      /referral/,
      /incident/,
      /informed-consent/,
      /medical-certificate/,
      /medical-record/,
      /documentation/,
      /report-writer/,
      /meeting-summarizer/,
      /email-professional/,
      /consultation-email/,
      /ambient/,
      /discharge-workflow/,
    ],
    categories: [],
  },
  {
    id: "patient",
    title: "患者対応",
    subtitle: "Patient Communication",
    description:
      "患者説明、Bad News の伝え方、SDM支援。「どう伝えたらいいか」を一緒に考えるセクション。",
    icon: MessageCircleHeart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    darkBgColor: "dark:bg-pink-950/30",
    featured: [
      "patient-explanation",
      "comm-bad-news",
      "sdm-treatment-options",
      "pat-handout-generator",
      "patient-education",
    ],
    slugPatterns: [
      /patient/,
      /^pat-/,
      /^sdm-/,
      /^comm-/,
      /bad-news/,
      /education-material/,
      /palliative/,
      /multilingual/,
      /treatment-comparison/,
      /term-translation/,
    ],
    categories: [],
  },
  {
    id: "ai-basics",
    title: "AI活用の基本",
    subtitle: "AI Fundamentals & Safety",
    description:
      "プロンプトの書き方、安全な使い方、AIの限界。「AIを使ってみたいけど不安」な方はここから。",
    icon: ShieldCheck,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    darkBgColor: "dark:bg-violet-950/30",
    featured: [
      "ai-safety-for-residents",
      "global-medical-ai-landscape-2026",
      "ai-medical-education",
      "ai-clinical-reasoning-tools",
      "ai-telemedicine-workflow",
    ],
    slugPatterns: [
      /^ai-/,
      /prompting$/,
      /chain-of-thought/,
      /^cot/,
      /few-shot/,
      /zero-shot/,
      /role-playing/,
      /meta-prompting/,
      /prompt-chaining/,
      /self-consistency/,
      /tree-of-thought/,
      /bias-awareness/,
      /fact-checking/,
      /error-checking/,
      /uncertainty/,
      /hallucin/,
      /legal-framework/,
      /global-medical-ai/,
      /clinical-reasoning/,
      /medical-education/,
      /telemedicine/,
    ],
    categories: ["ai-fundamentals"],
  },
] as const;

export function matchArticleToUseCase(
  article: Article,
  useCase: UseCase,
): boolean {
  const slugMatch = useCase.slugPatterns.some((pattern) =>
    pattern.test(article.slug),
  );
  if (slugMatch) return true;

  if (
    useCase.categories.length > 0 &&
    useCase.categories.includes(article.category)
  ) {
    return true;
  }

  return false;
}

export function getUseCaseArticles(
  articles: readonly Article[],
  useCase: UseCase,
): { featured: Article[]; related: Article[] } {
  const featuredSet = new Set(useCase.featured);

  const featured: Article[] = [];
  const related: Article[] = [];

  for (const article of articles) {
    if (featuredSet.has(article.slug)) {
      featured.push(article);
    } else if (matchArticleToUseCase(article, useCase)) {
      related.push(article);
    }
  }

  const orderedFeatured = useCase.featured
    .map((slug) => featured.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined);

  return { featured: orderedFeatured, related };
}
