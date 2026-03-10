"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/animations";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

interface StatementSectionProps {
  articleCount: number;
  courseCount: number;
}

export function StatementSection({
  articleCount,
  courseCount,
}: StatementSectionProps) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Hero image — oil painting of doctor stargazing */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mb-16 overflow-hidden rounded-3xl sm:mb-20"
        >
          <div className="aspect-[21/9] sm:aspect-[2.4/1]">
            <Image
              src={`${BASE_PATH}/images/hero-main.png`}
              alt="星空を見上げる医師 — 散らばる星を、星座にする"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
          {/* Subtle gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-24">
          {/* Left: statement text */}
          <motion.div
            variants={fadeInSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
              What we do
            </p>
            <h2 className="mt-6 font-serif text-2xl leading-relaxed tracking-tight text-foreground/90 sm:text-3xl lg:text-4xl lg:leading-relaxed">
              医療AIの実践知を、
              <br />
              プロンプト・ガイド・コースに体系化。
              <br className="hidden sm:block" />
              臨床の現場ですぐ使えるナレッジを届けます。
            </h2>
          </motion.div>

          {/* Right: animated stats */}
          <motion.div
            variants={fadeInSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex gap-12 lg:flex-col lg:gap-8"
          >
            <div>
              <AnimatedCounter
                value={articleCount}
                suffix="+"
                className="text-3xl font-semibold tabular-nums tracking-tight"
              />
              <p className="mt-1 text-sm text-muted-foreground">ナレッジ記事</p>
            </div>
            <div>
              <AnimatedCounter
                value={courseCount}
                className="text-3xl font-semibold tabular-nums tracking-tight"
              />
              <p className="mt-1 text-sm text-muted-foreground">学習コース</p>
            </div>
            <div>
              <AnimatedCounter
                value={5}
                className="text-3xl font-semibold tabular-nums tracking-tight"
              />
              <p className="mt-1 text-sm text-muted-foreground">カテゴリ</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
