"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInSlow, containerVariantsSlow } from "@/lib/animations";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

interface StatementSectionProps {
  articleCount: number;
  courseCount: number;
}

const STATS = (articleCount: number, courseCount: number) =>
  [
    { value: articleCount, suffix: "+", label: "ナレッジ記事" },
    { value: courseCount, suffix: "", label: "学習コース" },
    { value: 5, suffix: "", label: "カテゴリ" },
  ] as const;

export function StatementSection({
  articleCount,
  courseCount,
}: StatementSectionProps) {
  const stats = STATS(articleCount, courseCount);

  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Hero image */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mb-20 overflow-hidden rounded-2xl sm:mb-24"
        >
          <div className="aspect-[21/9] sm:aspect-[2.4/1]">
            <Image
              src={`${BASE_PATH}/images/hero-main.png`}
              alt="星空を見上げる医師 — 散らばる星を、星座にする"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.02]"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20 flex justify-center gap-16 sm:gap-24 lg:gap-32"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInSlow}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl"
              />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statement */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
            What we do
          </p>
          <h2 className="mt-8 font-serif text-2xl leading-[1.6] tracking-tight sm:text-3xl sm:leading-[1.6] lg:text-4xl lg:leading-[1.6]">
            医療AIの実践知を、
            <br />
            プロンプト・ガイド・コースに体系化。
            <br />
            臨床の現場ですぐ使えるナレッジを届けます。
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
