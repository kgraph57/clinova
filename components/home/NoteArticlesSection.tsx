"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariantsSlow, fadeInSlow } from "@/lib/animations";
import { ArrowUpRight, PencilLine } from "@phosphor-icons/react";

interface NoteArticle {
  title: string;
  url: string;
  thumbnail: string;
  date: string;
}

const NOTE_ARTICLES: NoteArticle[] = [
  {
    title: "バーンアウトを防ぐ「美的距離」—アートがもたらす心の余白",
    url: "https://note.com/kgraph_/n/n9e4cf3c581f5",
    thumbnail:
      "https://assets.st-note.com/production/uploads/images/246199404/rectangle_large_type_2_b5d135327f67797db1cfa1fd283c4005.png?fit=bounds&quality=85&width=1280",
    date: "2026.03.10",
  },
  {
    title: "患者の視点を「体験」する—アートが育む共感とコミュニケーション",
    url: "https://note.com/kgraph_/n/n7d4c1a8aeca2",
    thumbnail:
      "https://assets.st-note.com/production/uploads/images/246198791/rectangle_large_type_2_62a32e03f0fc65d8f74cf1870a50a6b6.png?fit=bounds&quality=85&width=1280",
    date: "2026.03.09",
  },
  {
    title: "診断力を鍛える「臨床美術」—観察・記述・解釈のサイクル",
    url: "https://note.com/kgraph_/n/n9da2c284e019",
    thumbnail:
      "https://assets.st-note.com/production/uploads/images/246198499/rectangle_large_type_2_dbd8010f4417e63ac96daa2a910970cd.png?fit=bounds&quality=85&width=1280",
    date: "2026.03.08",
  },
];

interface NoteArticlesSectionProps {
  articles?: NoteArticle[];
}

export function NoteArticlesSection({
  articles = NOTE_ARTICLES,
}: NoteArticlesSectionProps) {
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
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
                Insight
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Latest from note
              </h2>
            </div>
            <a
              href="https://note.com/kgraph_"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <PencilLine className="h-3.5 w-3.5" />
              すべて見る
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          {/* Article cards — thumbnail-first layout */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {articles.map((article, i) => (
              <motion.a
                key={article.url}
                variants={fadeInSlow}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[1.91/1] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    width={640}
                    height={335}
                    loading="eager"
                    className="h-full w-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Text */}
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">
                    {article.date}
                  </p>
                  <h3 className="mt-1.5 text-sm font-medium leading-snug transition-colors group-hover:text-foreground/70">
                    {article.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Mobile link */}
          <motion.div
            variants={fadeInSlow}
            className="mt-8 text-center sm:hidden"
          >
            <a
              href="https://note.com/kgraph_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <PencilLine className="h-3.5 w-3.5" />
              すべて見る
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
