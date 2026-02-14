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
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              注目のナレッジ
            </h2>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              医療AIの実践に役立つ厳選コンテンツ
            </p>
          </div>
          <Link
            href="/knowledge"
            className="hidden items-center gap-1 text-[13px] font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
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

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-primary"
          >
            すべて見る
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
