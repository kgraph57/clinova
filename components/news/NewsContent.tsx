"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Newspaper, Clock, ArrowUpRight, Calendar } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";
import type { Article } from "@/lib/types";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

interface NewsContentProps {
  articles: Article[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsCard({ article, featured }: { article: Article; featured?: boolean }) {
  const imageSrc = article.coverImage ? `${BASE_PATH}${article.coverImage}` : null;

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/knowledge/${article.slug}`}
        className={`group flex flex-col rounded-2xl border bg-card overflow-hidden transition-colors hover:bg-muted/50 ${
          featured ? "sm:flex-row" : ""
        }`}
      >
        {/* Thumbnail */}
        {imageSrc && (
          <div
            className={`relative overflow-hidden bg-muted ${
              featured
                ? "h-52 sm:h-auto sm:w-80 sm:flex-shrink-0"
                : "h-44 w-full"
            }`}
          >
            <Image
              src={imageSrc}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? "(max-width: 640px) 100vw, 320px" : "100vw"}
            />
          </div>
        )}

        {/* Content */}
        <div className={`flex flex-1 flex-col justify-between p-6 ${featured ? "sm:p-8" : ""}`}>
          <div>
            {/* Date + Read time */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.publishedAt)}
              </span>
              {article.estimatedReadTime > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.estimatedReadTime}min
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className={`mt-3 font-medium leading-snug group-hover:underline group-hover:underline-offset-4 ${
                featured ? "text-xl sm:text-2xl" : "text-lg"
              }`}
            >
              {article.title}
            </h3>

            {/* Description */}
            <p
              className={`mt-2 text-sm leading-relaxed text-muted-foreground ${
                featured ? "line-clamp-3" : "line-clamp-2"
              }`}
            >
              {article.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function NewsContent({ articles }: NewsContentProps) {
  const [latest, ...rest] = articles;

  return (
    <>
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3">
          <Newspaper className="h-5 w-5 text-muted-foreground" />
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
            News
          </h1>
        </div>
        <p className="mt-3 max-w-lg text-muted-foreground">
          医療AI分野の最新ニュース、注目論文レビュー、規制動向をお届けします。
        </p>
      </motion.div>

      {articles.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          <Newspaper className="mx-auto h-10 w-10 opacity-40" />
          <p className="mt-4">まだニュースがありません。</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 space-y-6"
        >
          {/* Featured (latest) */}
          {latest && <NewsCard article={latest} featured />}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
