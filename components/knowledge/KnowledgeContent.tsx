"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { containerVariants } from "@/lib/animations"
import { SearchBar } from "./SearchBar"
import { CategorySidebar } from "./CategorySidebar"
import { ArticleCard } from "./ArticleCard"
import { CATEGORIES } from "@/lib/constants"
import type { Article } from "@/lib/types"

interface KnowledgeContentProps {
  articles: Article[]
  counts: Record<string, number>
}

function KnowledgeInner({ articles, counts }: KnowledgeContentProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") ?? ""
  const query = searchParams.get("q") ?? ""

  const filtered = articles.filter((a) => {
    const matchesCategory = !category || a.category === category
    if (!query) return matchesCategory

    const q = query.toLowerCase()
    const matchesQuery =
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    return matchesCategory && matchesQuery
  })

  const activeCat = CATEGORIES.find((c) => c.id === category)

  return (
    <div className="flex gap-10">
      <CategorySidebar counts={counts} />

      <div className="min-w-0 flex-1">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {activeCat ? activeCat.label : "すべてのナレッジ"}
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {filtered.length} 件のコンテンツ
            </p>
          </div>
          <div className="w-full sm:w-64">
            <SearchBar />
          </div>
        </div>

        {/* Mobile category pills */}
        <div className="mb-6 flex gap-1.5 overflow-x-auto pb-2 lg:hidden">
          <a
            href="/knowledge"
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              !category
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            すべて
          </a>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/knowledge?category=${cat.id}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                category === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {filtered.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </motion.div>
        ) : (
          <div className="py-24 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              {query
                ? `「${query}」に一致するコンテンツはありません`
                : "このカテゴリにはまだコンテンツがありません"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function KnowledgeContent(props: KnowledgeContentProps) {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[13px] text-muted-foreground">読み込み中...</div>}>
      <KnowledgeInner {...props} />
    </Suspense>
  )
}
