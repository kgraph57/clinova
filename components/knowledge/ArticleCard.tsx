"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, ArrowUpRight } from "lucide-react"
import { fadeInUp } from "@/lib/animations"
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants"
import type { Article } from "@/lib/types"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find((c) => c.id === article.category)
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType)

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/knowledge/${article.slug}`}
        className="group flex h-full flex-col rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted"
      >
        {/* Category + Type */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {category && <span>{category.label}</span>}
          {contentType && (
            <>
              <span className="text-border">|</span>
              <span>{contentType.label}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-lg font-medium leading-snug group-hover:underline group-hover:underline-offset-4">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </p>

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{article.publishedAt}</span>
            {article.estimatedReadTime > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.estimatedReadTime}分
              </span>
            )}
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  )
}
