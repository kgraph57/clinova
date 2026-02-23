import {
  Stethoscope,
  Microscope,
  Heart,
  Brain,
  Workflow,
  Sparkles,
  TrendingUp,
  Crown,
} from "lucide-react";

export const SITE_CONFIG = {
  name: "Hoshizu",
  description:
    "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行っています。",
  tagline: "散らばる星を、星座にする。",
  url: "https://kgraph57.github.io/hoshizu",
  author: {
    name: "Ken Okamoto",
    github: "kgraph57",
    twitter: "kgraph_",
    note: "kgraph_",
  },
} as const;

export const CATEGORIES = [
  {
    id: "diagnosis",
    label: "診断支援",
    labelEn: "Diagnosis",
    icon: Stethoscope,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    darkBgColor: "dark:bg-rose-950/30",
  },
  {
    id: "research",
    label: "研究・論文",
    labelEn: "Research",
    icon: Microscope,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-950/30",
  },
  {
    id: "clinical",
    label: "臨床実践",
    labelEn: "Clinical",
    icon: Heart,
    color: "text-green-600",
    bgColor: "bg-green-50",
    darkBgColor: "dark:bg-green-950/30",
  },
  {
    id: "ai-fundamentals",
    label: "AI基礎",
    labelEn: "AI Basics",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-950/30",
  },
  {
    id: "workflow",
    label: "ワークフロー",
    labelEn: "Workflow",
    icon: Workflow,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-950/30",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const LEVELS = [
  {
    id: "beginner",
    label: "入門",
    labelEn: "Beginner",
    icon: Sparkles,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-950/30",
    order: 1,
  },
  {
    id: "intermediate",
    label: "実践",
    labelEn: "Intermediate",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-950/30",
    order: 2,
  },
  {
    id: "advanced",
    label: "応用",
    labelEn: "Advanced",
    icon: Crown,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    darkBgColor: "dark:bg-violet-950/30",
    order: 3,
  },
] as const;

export type LevelId = (typeof LEVELS)[number]["id"];

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/news", label: "News" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONTENT_TYPES = [
  { id: "prompt", label: "プロンプト", labelEn: "Prompt" },
  { id: "tip", label: "Tips", labelEn: "Tips" },
  { id: "guide", label: "ガイド", labelEn: "Guide" },
  { id: "article", label: "記事", labelEn: "Article" },
  { id: "news", label: "ニュース", labelEn: "News" },
] as const;
