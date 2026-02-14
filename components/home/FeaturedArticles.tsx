"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { containerVariants } from "@/lib/animations"
import { ArticleCard } from "@/components/knowledge/ArticleCard"
import type { Article } from "@/lib/types"

interface FeaturedArticlesProps {
  articles: Article[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              注目のナレッジ
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              医療AIの実践に役立つ厳選コンテンツ
            </p>
          </div>
          <Link
            href="/knowledge"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            すべて見る
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </motion.div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            すべて見る
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
