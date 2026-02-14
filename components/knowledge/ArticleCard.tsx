"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { fadeInUp } from "@/lib/animations"
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/types"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find((c) => c.id === article.category)
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType)
  const Icon = category?.icon

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/knowledge/${article.slug}`}
        className="group flex flex-col rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
      >
        {/* Top: Category + Content Type */}
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md",
                category?.bgColor,
                category?.darkBgColor,
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", category?.color)} />
            </div>
          )}
          <Badge variant="secondary" className="text-[10px] font-normal">
            {contentType?.label}
          </Badge>
          {article.riskLevel === "high" && (
            <Badge variant="destructive" className="gap-1 text-[10px]">
              <AlertTriangle className="h-2.5 w-2.5" />
              高リスク
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {article.description}
        </p>

        {/* Footer: tags + meta */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{article.publishedAt}</span>
            {article.estimatedReadTime > 0 && (
              <span className="flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />
                {article.estimatedReadTime}分
              </span>
            )}
            {article.difficulty && (
              <Badge
                variant="outline"
                className="h-4 text-[9px] font-normal"
              >
                {article.difficulty === "beginner"
                  ? "初級"
                  : article.difficulty === "intermediate"
                    ? "中級"
                    : "上級"}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
