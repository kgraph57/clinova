"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Compass } from "lucide-react";
import { containerVariants } from "@/lib/animations";
import { SearchBar } from "./SearchBar";
import { CategorySidebar } from "./CategorySidebar";
import { ArticleCard } from "./ArticleCard";
import { UseCaseView } from "./UseCaseView";
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants";
import type { Article } from "@/lib/types";

interface KnowledgeContentProps {
  articles: Article[];
  counts: Record<string, number>;
}

function buildHref(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params.toString());
  if (value) {
    next.set(key, value);
  } else {
    next.delete(key);
  }
  const qs = next.toString();
  return qs ? `/knowledge?${qs}` : "/knowledge";
}

function KnowledgeInner({ articles, counts }: KnowledgeContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") ?? "";
  const contentType = searchParams.get("type") ?? "";
  const query = searchParams.get("q") ?? "";
  const view = searchParams.get("view") ?? "";

  const isBrowseMode = view === "all" || !!category || !!contentType || !!query;

  const filtered = articles.filter((a) => {
    const matchesCategory = !category || a.category === category;
    const matchesType = !contentType || a.contentType === contentType;
    if (!query) return matchesCategory && matchesType;

    const q = query.toLowerCase();
    const matchesQuery =
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesType && matchesQuery;
  });

  const handleTypeChange = useCallback(
    (typeId: string) => {
      router.replace(buildHref(searchParams, "type", typeId), {
        scroll: false,
      });
    },
    [router, searchParams],
  );

  const handleViewToggle = useCallback(
    (mode: "scenes" | "all") => {
      if (mode === "scenes") {
        router.replace("/knowledge", { scroll: false });
      } else {
        router.replace("/knowledge?view=all", { scroll: false });
      }
    },
    [router],
  );

  const activeCat = CATEGORIES.find((c) => c.id === category);

  return (
    <div className="flex gap-12">
      {isBrowseMode && <CategorySidebar counts={counts} />}

      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
              {isBrowseMode
                ? activeCat
                  ? activeCat.label
                  : "すべてのナレッジ"
                : "ナレッジ"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isBrowseMode
                ? `${filtered.length} 件のコンテンツ`
                : "やりたいことから探す"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full sm:w-64">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="mb-8 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleViewToggle("scenes")}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !isBrowseMode
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            シーン別
          </button>
          <button
            type="button"
            onClick={() => handleViewToggle("all")}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              isBrowseMode
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            すべて
          </button>
        </div>

        {/* Scene-based view (default) */}
        {!isBrowseMode && <UseCaseView articles={articles} />}

        {/* Browse mode (existing flat grid) */}
        {isBrowseMode && (
          <>
            {/* Mobile category pills */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              <a
                href={buildHref(searchParams, "category", "")}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                  !category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                すべて
              </a>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={buildHref(searchParams, "category", cat.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                    category === cat.id
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </a>
              ))}
            </div>

            {/* Content type filter pills */}
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => handleTypeChange("")}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  !contentType
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                すべて
              </button>
              {CONTENT_TYPES.map((ct) => {
                const typeCount = counts[`type:${ct.id}`] ?? 0;
                return (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => handleTypeChange(ct.id)}
                    className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      contentType === ct.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {ct.label}
                    <span className="ml-1.5 tabular-nums opacity-60">
                      {typeCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {filtered.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </motion.div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-muted-foreground">
                  {query
                    ? `「${query}」に一致するコンテンツはありません`
                    : contentType && category
                      ? `${activeCat?.label ?? "このカテゴリ"}の${CONTENT_TYPES.find((ct) => ct.id === contentType)?.label ?? ""}はまだありません`
                      : "このカテゴリにはまだコンテンツがありません"}
                </p>
                {contentType && category && (
                  <button
                    type="button"
                    onClick={() => handleTypeChange("")}
                    className="mt-4 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    フィルタを解除してすべて表示
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function KnowledgeContent(props: KnowledgeContentProps) {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-muted-foreground">
          読み込み中...
        </div>
      }
    >
      <KnowledgeInner {...props} />
    </Suspense>
  );
}
