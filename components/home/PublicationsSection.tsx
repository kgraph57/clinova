"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  ArrowUpRight,
  Newspaper,
  FileText,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const BOOKS = [
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

const SERIALS = [
  {
    title: "小児内科 58巻3号「AIとともに育つ医療」",
    role: "分担執筆",
    publisher: "東京医学社",
    date: "2026年3月号",
    description:
      "特集「AIとともに育つ医療 ― 小児医療の新しいかたち」にて「小児科専攻医によるAI実践」を執筆。松尾豊、大塚篤司ほか各領域の第一人者が集結した全22項目の特集号。",
    icon: FileText,
  },
  {
    title: "日経メディカル「医師のための生成AI活用Tips集」",
    role: "連載",
    publisher: "日経BP",
    date: "2026年3月〜",
    description:
      "鑑別診断のAI壁打ち、PHIゼロの実践、深夜の専門外急患、存在しない論文への対処など、臨床現場のリアルな課題をAIで解決する全10回連載。",
    icon: Newspaper,
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
        <p className="mt-3 text-muted-foreground">書籍・雑誌・連載</p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 flex flex-col gap-6"
        >
          {/* Book */}
          {BOOKS.map((book) => (
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

          {/* Serials */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SERIALS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="flex items-start gap-4 rounded-2xl bg-muted/50 p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-background">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border px-2 py-0.5 text-[11px] font-medium">
                        {item.role}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-sm font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {item.publisher}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
