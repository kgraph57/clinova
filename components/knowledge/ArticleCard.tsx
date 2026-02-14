"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, AlertTriangle, ArrowUpRight } from "lucide-react"
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
        className="group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Arrow indicator */}
        <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground/0 transition-all duration-200 group-hover:text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

        {/* Category + Type */}
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                category?.bgColor,
                category?.darkBgColor,
              )}
            >
              <Icon className={cn("h-4 w-4", category?.color)} />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="rounded-md text-[10px] font-normal">
              {contentType?.label}
            </Badge>
            {article.riskLevel === "high" && (
              <Badge variant="destructive" className="gap-0.5 rounded-md text-[10px]">
                <AlertTriangle className="h-2.5 w-2.5" />
                高リスク
              </Badge>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-[0.9375rem] font-semibold leading-snug tracking-tight group-hover:text-primary">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {article.description}
        </p>

        {/* Tags + Meta */}
        <div className="mt-auto pt-4">
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2.5">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
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
                className="ml-auto h-[18px] rounded px-1.5 text-[9px] font-normal"
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
