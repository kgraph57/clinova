"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";
import { USE_CASES, getUseCaseArticles } from "@/lib/use-cases";
import { CONTENT_TYPES } from "@/lib/constants";
import type { Article } from "@/lib/types";

interface UseCaseViewProps {
  articles: Article[];
}

function UseCaseSection({
  useCase,
  articles,
}: {
  useCase: (typeof USE_CASES)[number];
  articles: Article[];
}) {
  const [expanded, setExpanded] = useState(false);
  const { featured, related } = getUseCaseArticles(articles, useCase);
  const totalCount = featured.length + related.length;

  if (totalCount === 0) return null;

  const Icon = useCase.icon;

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${useCase.bgColor} ${useCase.darkBgColor}`}
        >
          <Icon className={`h-6 w-6 ${useCase.color}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h2 className="font-serif text-xl font-medium tracking-tight sm:text-2xl">
              {useCase.title}
            </h2>
            <span className="text-sm text-muted-foreground">
              {useCase.subtitle}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {useCase.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs tabular-nums text-muted-foreground">
          {totalCount}件
        </span>
      </div>

      {/* Featured items */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((article) => (
          <CompactCard key={article.slug} article={article} highlight />
        ))}
      </div>

      {/* Expandable related items */}
      {related.length > 0 && (
        <>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((article) => (
                <CompactCard key={article.slug} article={article} />
              ))}
            </motion.div>
          )}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                閉じる
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                関連コンテンツをもっと見る ({related.length}件)
              </>
            )}
          </button>
        </>
      )}
    </motion.section>
  );
}

function CompactCard({
  article,
  highlight = false,
}: {
  article: Article;
  highlight?: boolean;
}) {
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType);

  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className={`group flex flex-col rounded-xl p-4 transition-colors ${
        highlight
          ? "bg-muted/80 hover:bg-muted"
          : "bg-muted/40 hover:bg-muted/70"
      }`}
    >
      <div className="flex items-center gap-2">
        {contentType && (
          <span className="rounded-md bg-background/80 px-2 py-0.5 text-xs text-muted-foreground">
            {contentType.label}
          </span>
        )}
        {article.difficulty && (
          <span className="text-xs text-muted-foreground">
            {article.difficulty === "beginner"
              ? "入門"
              : article.difficulty === "intermediate"
                ? "実践"
                : "応用"}
          </span>
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug group-hover:underline group-hover:underline-offset-4">
        {article.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {article.description}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3">
        {article.estimatedReadTime > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.estimatedReadTime}分
          </span>
        )}
        <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );
}

export function UseCaseView({ articles }: UseCaseViewProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {USE_CASES.map((useCase) => (
        <UseCaseSection
          key={useCase.id}
          useCase={useCase}
          articles={articles}
        />
      ))}
    </motion.div>
  );
}
