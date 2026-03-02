"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { containerVariants } from "@/lib/animations";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import type { Article } from "@/lib/types";

interface WeeklyPickupProps {
  readonly articles: Article[];
}

export function WeeklyPickup({ articles }: WeeklyPickupProps) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Weekly Pickup
              </span>
            </div>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              今週のピックアップ
            </h2>
            <p className="mt-3 text-muted-foreground">
              今週おすすめのコンテンツをピックアップ
            </p>
          </div>
          <Link
            href="/knowledge"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
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
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
