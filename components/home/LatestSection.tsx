"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariantsSlow, fadeInSlow } from "@/lib/animations";
import type { Article } from "@/lib/types";
import { ArrowRight } from "@phosphor-icons/react";

interface LatestSectionProps {
  articles: Article[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}年${month}月${day}日`;
}

export function LatestSection({ articles }: LatestSectionProps) {
  const visible = articles.slice(0, 3);
  const [first, ...rest] = visible;

  return (
    <section className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div
            variants={fadeInSlow}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
                Stay informed
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Latest
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              すべて見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Articles */}
          {visible.length > 0 ? (
            <div className="mt-16">
              {/* Featured first article */}
              {first && (
                <motion.div variants={fadeInSlow}>
                  <Link
                    href={`/knowledge/${first.slug}`}
                    className="group block border-b border-border/50 pb-8 transition-colors"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                      {formatDate(first.publishedAt)}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug tracking-tight transition-opacity group-hover:opacity-70 sm:text-3xl">
                      {first.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground/70">
                      {first.description}
                    </p>
                  </Link>
                </motion.div>
              )}

              {/* Remaining articles */}
              {rest.map((article) => (
                <motion.div key={article.slug} variants={fadeInSlow}>
                  <Link
                    href={`/knowledge/${article.slug}`}
                    className="group flex items-baseline justify-between border-b border-border/50 py-6 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium leading-snug tracking-tight transition-opacity group-hover:opacity-70">
                        {article.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground/60">
                        {article.description}
                      </p>
                    </div>
                    <span className="ml-6 flex-shrink-0 text-xs text-muted-foreground/40">
                      {formatDate(article.publishedAt)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={fadeInSlow}
              className="mt-16 rounded-2xl border border-border/30 p-12 text-center"
            >
              <p className="text-muted-foreground/60">
                最新ニュースは準備中です。
              </p>
            </motion.div>
          )}

          {/* Mobile link */}
          <motion.div
            variants={fadeInSlow}
            className="mt-8 text-center sm:hidden"
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              すべて見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
