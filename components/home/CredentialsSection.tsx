"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, fadeInSlow, fadeInUp } from "@/lib/animations";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { ArrowUpRight, Star } from "@phosphor-icons/react";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

const STATS = [
  { value: 10, suffix: "+", label: "セミナー" },
  { value: 300, suffix: "+", label: "参加者" },
  { value: 1, suffix: "", label: "書籍（共著）" },
  { value: 2, suffix: "", label: "連載" },
] as const;

const BOOK = {
  title: "ケースで学ぶ 若手医師のAI活用ガイド",
  subtitle: "現場を動かす考え方と使い方",
  publisher: "東京医学社",
  authors: "監修: 五十嵐隆　編集: 島袋林秀　執筆: 岡本賢・牧庸彦・新野一眞",
  format: "73ケース収録",
  date: "2025年",
  url: "https://www.amazon.co.jp/dp/4885637481",
  rating: 5.0,
  reviews: 6,
  image: "/images/books/ai-medicine-cover.png",
} as const;

const SERIALS = [
  {
    title: "小児内科 58巻3号「AIとともに育つ医療」",
    note: "東京医学社　2026年3月号\n岡本賢が「若手医師によるAI実践：メタ分析と未来予測から見える今」を寄稿。医療AIの現状をメタ分析の知見と将来展望から読み解く。",
    image: "/images/books/pediatrics-ai-cover.png",
    url: "https://www.tokyo-igakusha.co.jp/b/li/b.html?zcid=4&menu=next",
  },
] as const;

const MEDIA = [
  {
    title: "日経メディカル「医師のための生成AI活用Tips集」",
    note: "臨床現場のリアルな課題をAIで解決する全10回連載",
    tag: "連載",
    url: "https://medical.nikkeibp.co.jp/leaf/mem/pub/series/okamoto/",
  },
  {
    title: "医師の調べ物に役立つAI検索ツール、何ができる？ どう使い分ける？",
    note: "シリーズ◎医療現場での活用進む人工知能（2026年3月11日）",
    tag: "日経メディカル監修記事",
    url: "https://medical.nikkeibp.co.jp/leaf/mem/pub/report/t285/202603/592302.html",
  },
] as const;

const ACTIVITIES: readonly {
  period: string;
  title: string;
  tag: string;
  url?: string;
}[] = [
  {
    period: "2025.04 —",
    title: "院内AIセミナー 開始",
    tag: "セミナー",
  },
  {
    period: "2026.01",
    title: "キャリアアップ研修会（300名超）",
    tag: "大規模研修",
  },
  {
    period: "2026.03",
    title: "日経メディカル「医師の調べ物に役立つAI検索ツール」",
    tag: "日経メディカル監修記事",
    url: "https://medical.nikkeibp.co.jp/leaf/mem/pub/report/t285/202603/592302.html",
  },
  {
    period: "2026.04 —",
    title: "医師のためのAI実践道場（全8回）",
    tag: "シリーズ",
  },
];

export function CredentialsSection() {
  return (
    <section className="section-dark py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--surface-dark-fg)]/30">
            From practice to principle.
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-[var(--surface-dark-fg)] sm:text-4xl">
            Books & Track Record
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 flex flex-wrap gap-12"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-3xl font-semibold text-[var(--surface-dark-fg)]"
              />
              <p className="mt-1 text-sm text-[var(--surface-dark-fg)]/50">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Books grid — cover images prominent */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {/* Main book — larger card */}
          <motion.a
            variants={fadeInUp}
            href={BOOK.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative sm:col-span-1"
          >
            <div className="overflow-hidden rounded-2xl bg-[var(--surface-dark-fg)]/5 p-6 transition-colors duration-300 hover:bg-[var(--surface-dark-fg)]/8">
              <div className="mx-auto max-w-[200px]">
                <Image
                  src={`${BASE_PATH}${BOOK.image}`}
                  alt={BOOK.title}
                  width={400}
                  height={533}
                  loading="eager"
                  className="rounded-lg object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1"
                />
              </div>
              <div className="mt-6">
                <span className="rounded-full border border-[var(--surface-dark-fg)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--surface-dark-fg)]/70">
                  共著
                </span>
                <h3 className="mt-2 text-sm font-medium leading-snug text-[var(--surface-dark-fg)]">
                  {BOOK.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--surface-dark-fg)]/40">
                  {BOOK.subtitle}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--surface-dark-fg)]/50">
                  <span>
                    {BOOK.publisher}　{BOOK.format}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {BOOK.rating}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--surface-dark-fg)]/40">
                  {BOOK.authors}
                </p>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-[var(--surface-dark-fg)]/30 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.a>

          {/* Serial publications */}
          {SERIALS.map((serial) => (
            <motion.a
              key={serial.title}
              variants={fadeInUp}
              href={serial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative sm:col-span-1"
            >
              <div className="overflow-hidden rounded-2xl bg-[var(--surface-dark-fg)]/5 p-6 transition-colors duration-300 hover:bg-[var(--surface-dark-fg)]/8">
                <div className="mx-auto max-w-[200px]">
                  <Image
                    src={`${BASE_PATH}${serial.image}`}
                    alt={serial.title}
                    width={400}
                    height={533}
                    loading="eager"
                    className="rounded-lg object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1"
                  />
                </div>
                <div className="mt-6">
                  <span className="rounded-full border border-[var(--surface-dark-fg)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--surface-dark-fg)]/70">
                    寄稿
                  </span>
                  <h3 className="mt-2 text-sm font-medium text-[var(--surface-dark-fg)]">
                    {serial.title}
                  </h3>
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-[var(--surface-dark-fg)]/50">
                    {serial.note}
                  </p>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-[var(--surface-dark-fg)]/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Media & Articles */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--surface-dark-fg)]/40">
            Media & Articles
          </p>
          <div className="mt-6 flex flex-col">
            {MEDIA.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center gap-4 border-b border-[var(--surface-dark-fg)]/8 py-4 transition-colors hover:bg-[var(--surface-dark-fg)]/[0.03]"
              >
                <span className="flex-1 text-sm text-[var(--surface-dark-fg)]/80 group-hover:text-[var(--surface-dark-fg)]">
                  {item.title}
                  <span className="mt-0.5 block text-xs text-[var(--surface-dark-fg)]/40">
                    {item.note}
                  </span>
                </span>
                <span className="rounded-full border border-[var(--surface-dark-fg)]/15 px-2.5 py-0.5 text-xs text-[var(--surface-dark-fg)]/50">
                  {item.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[var(--surface-dark-fg)]/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Activities timeline */}
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--surface-dark-fg)]/40">
            Selected Activities
          </p>
          <div className="mt-6 flex flex-col">
            {ACTIVITIES.map((activity, i) => {
              const Wrapper = activity.url ? motion.a : motion.div;
              const linkProps = activity.url
                ? { href: activity.url, target: "_blank" as const, rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={activity.title}
                  {...linkProps}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex items-center gap-4 border-b border-[var(--surface-dark-fg)]/8 py-4 transition-colors hover:bg-[var(--surface-dark-fg)]/[0.03]${activity.url ? " group" : ""}`}
                >
                  <span className="w-24 flex-shrink-0 text-xs tracking-wide text-[var(--surface-dark-fg)]/40">
                    {activity.period}
                  </span>
                  <span className="flex-1 text-sm text-[var(--surface-dark-fg)]/80">
                    {activity.title}
                  </span>
                  <span className="rounded-full border border-[var(--surface-dark-fg)]/15 px-2.5 py-0.5 text-xs text-[var(--surface-dark-fg)]/50">
                    {activity.tag}
                  </span>
                  {activity.url && (
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[var(--surface-dark-fg)]/30 opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </Wrapper>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
