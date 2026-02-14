import { Stethoscope, Microscope, Heart, Brain, Workflow } from "lucide-react";

export const SITE_CONFIG = {
  name: "Clinova",
  description: "医療従事者のためのAIナレッジポータル",
  tagline: "医療AI、体系的に。",
  url: "https://clinova-psi.vercel.app",
  author: {
    name: "Ken Okamoto",
    github: "kgraph57",
    twitter: "",
    note: "",
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

export const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/knowledge", label: "ナレッジ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

export const CONTENT_TYPES = [
  { id: "prompt", label: "プロンプト", labelEn: "Prompt" },
  { id: "tip", label: "Tips", labelEn: "Tips" },
  { id: "guide", label: "ガイド", labelEn: "Guide" },
  { id: "article", label: "記事", labelEn: "Article" },
] as const;
