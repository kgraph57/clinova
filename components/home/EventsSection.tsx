"use client";

import { motion } from "framer-motion";
import { fadeInSlow, fadeInUpBlur, containerVariantsSlow, scaleRevealSoft } from "@/lib/animations";
import {
  CalendarBlank,
  MapPin,
  ArrowUpRight,
  Users,
} from "@phosphor-icons/react";

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  href: string;
  status: "upcoming" | "open" | "closed";
}

const EVENTS: Event[] = [
  {
    title: "医療者のためのAI活用セミナー",
    date: "2026年4月 開催予定",
    location: "オンライン",
    description:
      "ChatGPT・Claude を臨床現場で安全に使うための実践ワークショップ。プロンプト設計から症例ベースの演習まで。",
    href: "/contact",
    status: "upcoming",
  },
  {
    title: "AI×医療 経営講座",
    date: "随時開催",
    location: "オンライン / 対面",
    description:
      "クリニック経営者向け。AI導入の費用対効果、スタッフ教育、患者コミュニケーションへの活用法。",
    href: "/contact",
    status: "open",
  },
];

const STATUS_LABEL: Record<Event["status"], { text: string; className: string }> = {
  upcoming: {
    text: "準備中",
    className: "border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  open: {
    text: "受付中",
    className: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  },
  closed: {
    text: "受付終了",
    className: "border-border text-muted-foreground",
  },
};

export function EventsSection() {
  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInUpBlur} className="flex items-center gap-4">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden h-px w-10 origin-left bg-foreground/15 sm:block"
            />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground/50">
              Events &amp; Seminars
            </p>
          </motion.div>
          <motion.h2
            variants={fadeInSlow}
            className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            セミナー・イベント
          </motion.h2>
          <motion.p
            variants={fadeInUpBlur}
            className="mt-4 max-w-xl text-muted-foreground"
          >
            講演・ワークショップ・経営講座など、
            AI×医療の実践知を直接お届けする場を定期的に開催しています。
          </motion.p>

          {/* Event cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {EVENTS.map((event) => {
              const badge = STATUS_LABEL[event.status];
              return (
                <motion.a
                  key={event.title}
                  href={event.href}
                  variants={scaleRevealSoft}
                  className="group relative flex flex-col rounded-2xl border border-border/50 p-8 transition-all duration-500 hover:border-border hover:shadow-sm"
                >
                  {/* Status badge */}
                  <span
                    className={`self-start rounded-full border px-3 py-1 text-[11px] font-medium ${badge.className}`}
                  >
                    {badge.text}
                  </span>

                  <h3 className="mt-5 font-serif text-xl tracking-tight sm:text-2xl">
                    {event.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <CalendarBlank className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <ArrowUpRight className="absolute right-6 top-8 h-4 w-4 text-muted-foreground/30 transition-all duration-300 group-hover:text-accent-gold" />
                </motion.a>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInSlow}
            className="mt-10 flex items-center gap-4 text-sm text-muted-foreground"
          >
            <Users className="h-4 w-4 text-accent-gold" />
            <p>
              講演・セミナーの登壇依頼は{" "}
              <a
                href="/contact"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
                お問い合わせ
              </a>{" "}
              からお気軽にどうぞ。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
