"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants"
import type { Article } from "@/lib/types"
import {
  ArrowUpRight,
  ArrowsClockwise,
  Clock,
  Sparkle,
} from "@phosphor-icons/react";

interface ArticleCardProps {
  article: Article
}

function isNew(publishedAt: string) {
  const diff = Date.now() - new Date(publishedAt).getTime()
  return diff < 14 * 24 * 60 * 60 * 1000
}

function isUpdated(article: Article) {
  return article.updatedAt && article.updatedAt !== article.publishedAt
}

export function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find((c) => c.id === article.category)
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType)
  const showNew = isNew(article.publishedAt)
  const showUpdated = !showNew && isUpdated(article)

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/knowledge/${article.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-muted/50 p-6 transition-all duration-500 hover:bg-muted hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
      >
        {/* Subtle top-edge accent line on hover */}
        <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-foreground/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

        {/* Category + Type + Badges */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {category && <span>{category.label}</span>}
          {contentType && (
            <>
              <span className="text-border">|</span>
              <span>{contentType.label}</span>
            </>
          )}
          {showNew && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Sparkle className="h-3 w-3" />
              NEW
            </span>
          )}
          {showUpdated && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <ArrowsClockwise className="h-3 w-3" />
              Updated
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-lg font-medium leading-snug transition-colors duration-300 group-hover:text-foreground">
          {article.title}
        </h3>

        {/* Description — expands on hover */}
        <div className="mt-2 grid transition-[grid-template-rows] duration-500 ease-out grid-rows-[1fr] group-hover:grid-rows-[1fr]">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground transition-all duration-500 group-hover:line-clamp-4">
            {article.description}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{article.publishedAt}</span>
            {article.estimatedReadTime > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.estimatedReadTime}min
              </span>
            )}
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/10">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
