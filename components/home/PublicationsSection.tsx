"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, ArrowUpRight } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const PUBLICATIONS = [
  {
    title: "ケースで学ぶ若手医師のAI活用ガイド",
    role: "共著",
    authors: "五十嵐 隆（監修）、島袋 林秀、岡本 賢、牧 庸彦、新野 一眞",
    publisher: "東京医学社",
    date: "2026年1月",
    description:
      "診療・救急・病棟・教育・研究・論文作成まで、73の臨床ケースで学ぶ実践的AI活用ガイドブック。国立成育医療研究センターのAIホスピタルプロジェクトの知見を凝縮。",
    url: "https://www.amazon.co.jp/dp/4885637481",
    rating: 5.0,
    reviews: 6,
    isbn: "978-4885637483",
  },
] as const;

export function PublicationsSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Publications
          </h2>
        </div>
        <p className="mt-3 text-muted-foreground">書籍・執筆活動</p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10"
        >
          {PUBLICATIONS.map((book) => (
            <motion.a
              key={book.isbn}
              variants={fadeInUp}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 rounded-2xl bg-warm-oat p-8 transition-all duration-200 hover:scale-[1.01] dark:bg-muted sm:flex-row sm:items-start sm:p-10"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium">
                      {book.role}
                    </span>
                    <h3 className="mt-3 text-xl font-medium leading-snug sm:text-2xl">
                      {book.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {book.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span>{book.publisher}</span>
                  <span className="text-border">|</span>
                  <span>{book.date}</span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {book.rating} ({book.reviews}件)
                  </span>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  {book.authors}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
