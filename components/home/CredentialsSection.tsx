"use client";

import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/animations";
import { HoverRevealImage } from "@/components/effects/HoverRevealImage";
import {
  ArrowUpRight,
  Star,
} from "@phosphor-icons/react";

const STATS = [
  { value: "10+", label: "セミナー" },
  { value: "300+", label: "参加者" },
  { value: "1", label: "書籍（共著）" },
  { value: "2", label: "連載" },
] as const;

const BOOK = {
  title: "ケースで学ぶ若手医師のAI活用ガイド",
  publisher: "東京医学社",
  date: "2026年1月",
  url: "https://www.amazon.co.jp/dp/4885637481",
  rating: 5.0,
  reviews: 6,
  image: "/images/books/ai-medicine-cover.png",
} as const;

const SERIALS = [
  {
    title: "小児内科 58巻3号",
    note: "2026年3月号",
    image: "/images/books/pediatrics-ai-cover.png",
  },
  {
    title: "日経メディカル連載",
    note: "2026年3月〜",
    image: "/images/books/medical-prompts-cover.png",
  },
] as const;

const ACTIVITIES = [
  {
    period: "2025.04 —",
    title: "院内AIセミナー 開始",
    tag: "セミナー",
    image: "/images/courses/ai-basics.png",
  },
  {
    period: "2026.01",
    title: "キャリアアップ研修会（300名超）",
    tag: "大規模研修",
    image: "/images/courses/medical-ai-overview.png",
  },
  {
    period: "2026.04 —",
    title: "医師のためのAI実践道場（全8回）",
    tag: "シリーズ",
    image: "/images/courses/generative-ai-basics.png",
  },
] as const;

export function CredentialsSection() {
  return (
    <section className="section-dark py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="font-serif text-3xl tracking-tight text-[var(--surface-dark-fg)] sm:text-4xl">
            Track Record
          </h2>
          <p className="mt-3 text-[var(--surface-dark-fg)]/60">
            執筆・講演・教育活動の実績
          </p>
        </motion.div>

        <div className="mt-16">
          {/* Stats */}
          <motion.div
            variants={fadeInSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap gap-12"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold text-[var(--surface-dark-fg)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[var(--surface-dark-fg)]/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Book — hover reveals cover */}
          <motion.div
            variants={fadeInSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <HoverRevealImage
              imageSrc={BOOK.image}
              imageAlt={BOOK.title}
              width={200}
              height={280}
            >
              <a
                href={BOOK.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-16 block rounded-2xl border border-[var(--surface-dark-fg)]/10 p-8 transition-colors hover:border-[var(--surface-dark-fg)]/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full border border-[var(--surface-dark-fg)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--surface-dark-fg)]/70">
                      共著
                    </span>
                    <h3 className="mt-3 text-lg font-medium text-[var(--surface-dark-fg)]">
                      {BOOK.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[var(--surface-dark-fg)]/40 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--surface-dark-fg)]/50">
                  <span>{BOOK.publisher}</span>
                  <span>{BOOK.date}</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {BOOK.rating} ({BOOK.reviews}件)
                  </span>
                </div>
              </a>
            </HoverRevealImage>
          </motion.div>

          {/* Serials — hover reveals covers */}
          <motion.div
            variants={fadeInSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-8"
          >
            {SERIALS.map((serial) => (
              <HoverRevealImage
                key={serial.title}
                imageSrc={serial.image}
                imageAlt={serial.title}
                width={200}
                height={280}
              >
                <div className="cursor-default py-2">
                  <p className="text-sm font-medium text-[var(--surface-dark-fg)]">
                    {serial.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--surface-dark-fg)]/50">
                    {serial.note}
                  </p>
                </div>
              </HoverRevealImage>
            ))}
          </motion.div>

          {/* Activities — hover reveals images */}
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
            <div className="mt-6 flex flex-col gap-1">
              {ACTIVITIES.map((activity) => (
                <HoverRevealImage
                  key={activity.title}
                  imageSrc={activity.image}
                  imageAlt={activity.title}
                  width={320}
                  height={200}
                >
                  <div className="flex items-baseline gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-[var(--surface-dark-fg)]/5">
                    <span className="flex-shrink-0 text-xs tracking-wide text-[var(--surface-dark-fg)]/40">
                      {activity.period}
                    </span>
                    <span className="text-sm text-[var(--surface-dark-fg)]/80">
                      {activity.title}
                    </span>
                  </div>
                </HoverRevealImage>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
