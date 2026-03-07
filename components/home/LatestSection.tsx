"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariantsSlow, fadeInSlow } from "@/lib/animations";
import type { Article } from "@/lib/types";
import {
  ArrowRight,
} from "@phosphor-icons/react";

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
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                Latest
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                医療AI最新ニュース
              </p>
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
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {/* Featured (first) article — full width */}
              {first && (
                <motion.div
                  variants={fadeInSlow}
                  className="sm:col-span-2"
                >
                  <Link
                    href={`/knowledge/${first.slug}`}
                    className="group block rounded-2xl p-6 transition-colors hover:bg-muted/50"
                  >
                    <p className="text-sm text-muted-foreground">
                      {formatDate(first.publishedAt)}
                    </p>
                    <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                      {first.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 leading-relaxed text-muted-foreground">
                      {first.description}
                    </p>
                  </Link>
                </motion.div>
              )}

              {/* Remaining articles — side by side */}
              {rest.map((article) => (
                <motion.div key={article.slug} variants={fadeInSlow}>
                  <Link
                    href={`/knowledge/${article.slug}`}
                    className="group block rounded-2xl p-6 transition-colors hover:bg-muted/50"
                  >
                    <p className="text-sm text-muted-foreground">
                      {formatDate(article.publishedAt)}
                    </p>
                    <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {article.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={fadeInSlow}
              className="mt-12 rounded-2xl p-10 text-center"
            >
              <p className="text-muted-foreground">
                最新ニュースは準備中です。
              </p>
            </motion.div>
          )}

          {/* Mobile "see all" link */}
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
