"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Newspaper,
  Clock,
  ArrowUpRight,
  Calendar,
  Radio,
  FileText,
  Scale,
  Package,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";
import type { Article } from "@/lib/types";

interface NewsContentProps {
  articles: Article[];
}

const NEWS_TABS = [
  { key: "all", label: "All", icon: Newspaper },
  { key: "weekly", label: "Weekly", icon: Radio },
  { key: "paper", label: "論文", icon: FileText },
  { key: "regulation", label: "規制", icon: Scale },
  { key: "product", label: "プロダクト", icon: Package },
] as const;

type TabKey = (typeof NEWS_TABS)[number]["key"];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsCard({
  article,
  featured,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/knowledge/${article.slug}`}
        className={`group flex flex-col rounded-2xl border bg-card p-6 transition-colors hover:bg-muted/50 ${
          featured ? "sm:flex-row sm:gap-8 sm:p-8" : ""
        }`}
      >
        <div className="flex-1">
          {/* Date + Read time + Badge */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            {article.estimatedReadTime > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.estimatedReadTime}min
              </span>
            )}
            {article.newsType && (
              <NewsTypeBadge newsType={article.newsType} />
            )}
          </div>

          {/* Title */}
          <h3
            className={`mt-3 font-medium leading-snug group-hover:underline group-hover:underline-offset-4 ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {article.title}
          </h3>

          {/* Description */}
          <p
            className={`mt-2 text-sm leading-relaxed text-muted-foreground ${
              featured ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {article.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end sm:mt-0">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  weekly: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  paper: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  regulation: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  product: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const BADGE_LABELS: Record<string, string> = {
  weekly: "Weekly",
  paper: "論文",
  regulation: "規制",
  product: "プロダクト",
};

function NewsTypeBadge({ newsType }: { newsType: string }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        BADGE_STYLES[newsType] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {BADGE_LABELS[newsType] ?? newsType}
    </span>
  );
}

export function NewsContent({ articles }: NewsContentProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered =
    activeTab === "all"
      ? articles
      : articles.filter((a) => a.newsType === activeTab);

  const [latest, ...rest] = filtered;

  return (
    <>
      {/* Header */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <div className="flex items-center gap-3">
          <Newspaper className="h-5 w-5 text-muted-foreground" />
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
            News
          </h1>
        </div>
        <p className="mt-3 max-w-lg text-muted-foreground">
          医療AI分野の最新ニュース、注目論文レビュー、規制動向をお届けします。
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {NEWS_TABS.map(({ key, label, icon: Icon }) => {
          const count =
            key === "all"
              ? articles.length
              : articles.filter((a) => a.newsType === key).length;
          if (key !== "all" && count === 0) return null;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              <span className="ml-0.5 text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          <Newspaper className="mx-auto h-10 w-10 opacity-40" />
          <p className="mt-4">この分類のニュースはまだありません。</p>
        </div>
      ) : (
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 space-y-6"
        >
          {/* Featured (latest) */}
          {latest && <NewsCard article={latest} featured />}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
