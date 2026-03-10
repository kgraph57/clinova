"use client";

import { motion } from "framer-motion";
import { containerVariantsSlow, fadeInSlow } from "@/lib/animations";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

const SERVICES = [
  {
    number: "01",
    title: "Knowledge Base",
    titleJa: "ナレッジ体系化",
    description:
      "プロンプトテンプレート、臨床ワークフロー、AIツール比較など、医療現場ですぐ使えるナレッジを体系的に整理・公開。",
    href: "/knowledge",
    color: "group-hover:border-[#4a7c6f]",
  },
  {
    number: "02",
    title: "Learning Courses",
    titleJa: "学習コース",
    description:
      "医療AIの基礎から実践まで、ステップバイステップで学べる構造化コース。ハンズオン形式で「わかる」から「使える」へ。",
    href: "/learn",
    color: "group-hover:border-[#6366f1]",
  },
  {
    number: "03",
    title: "Products & Tools",
    titleJa: "プロダクト開発",
    description:
      "すくすくナビ、ふたりナビなど、医療・子育て領域のWebアプリケーションを企画・設計・開発。",
    href: "#products",
    color: "group-hover:border-[#d97706]",
  },
  {
    number: "04",
    title: "Seminars & Writing",
    titleJa: "講演・執筆",
    description:
      "学会・病院・企業向けの講演、医学書籍の執筆、日経メディカル連載。専門知識をわかりやすく届ける。",
    href: "/about",
    color: "group-hover:border-[#8b5cf6]",
  },
] as const;

export function ServicesOverview() {
  return (
    <section className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInSlow}>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
              What we do
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">
              Services
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-0 sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <motion.div key={service.number} variants={fadeInSlow}>
                <Link
                  href={service.href}
                  className={`group flex h-full flex-col border-t p-8 transition-colors duration-300 sm:p-10 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${service.color} hover:bg-muted/30`}
                >
                  <span className="text-xs font-medium tracking-widest text-muted-foreground/40">
                    {service.number}
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.titleJa}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground/80">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
