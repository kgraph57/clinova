"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Clock, Calendar } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";
import type { Article } from "@/lib/types";

interface NewsletterSectionProps {
  articles: Article[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function NewsletterSection({ articles }: NewsletterSectionProps) {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Newspaper className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                Latest News
              </h2>
            </div>
            <p className="mt-3 text-muted-foreground">
              医療AIの最新ニュース、注目論文、規制動向
            </p>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            すべて見る
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {articles.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article) => (
              <motion.div key={article.slug} variants={fadeInUp}>
                <Link
                  href={`/knowledge/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(article.publishedAt)}</span>
                    {article.estimatedReadTime > 0 && (
                      <>
                        <span className="text-border">|</span>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{article.estimatedReadTime}min</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-lg font-medium leading-snug group-hover:underline group-hover:underline-offset-4">
                    {article.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 rounded-2xl bg-muted/50 p-10 text-center"
          >
            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">
              最新ニュースは準備中です。
            </p>
          </motion.div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            すべて見る
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
