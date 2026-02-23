"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Users,
  GraduationCap,
  Presentation,
  UserCheck,
  Calendar,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const TIMELINE = [
  {
    period: "2025.04 —",
    title: "院内AIセミナー 開始",
    description:
      "国立成育医療研究センターにて医師・医療従事者向けの生成AIセミナーを企画・開講。全7回シリーズとして継続的に実施。",
    icon: Mic,
    tag: "セミナー",
  },
  {
    period: "2025.08",
    title: "医師向け生成AI講座（全6講座）",
    description:
      "後期研修医を対象に、臨床でのAI活用から倫理・ガバナンスまでを網羅した全6講座（111スライド・計3時間超）の体系的プログラムを設計・登壇。",
    icon: GraduationCap,
    tag: "講座",
  },
  {
    period: "2026.01",
    title: "キャリアアップ研修会",
    description:
      "全職員＋院外から300名超が参加するキャリアアップ研修会に登壇。ハイブリッド形式で「AI活用の最初の一歩」をテーマに、デモを交えた60分のセミナーを実施。",
    icon: Users,
    highlight: true,
    tag: "大規模研修",
  },
  {
    period: "2026.02 —",
    title: "個別AI指導セッション",
    description:
      "チャイルドライフスペシャリスト（CLS）や各診療科の部長・スタッフに対する個別指導を継続中。業務効率化から研究支援まで、職種に最適化した実践的プログラムを提供。",
    icon: UserCheck,
    tag: "個別指導",
  },
  {
    period: "2026.04 —",
    title: "医師のためのAI実践道場（全8回）",
    description:
      "週1回×全8回のランチセミナーシリーズ。プロンプトの型、臨床推論、書類作成、論文執筆まで、「使いこなす」ための実践ステップを凝縮。",
    icon: Presentation,
    tag: "シリーズ",
  },
] as const;

const STATS = [
  { value: "10+", label: "セミナー・講座" },
  { value: "300+", label: "研修参加者" },
  { value: "111", label: "講座スライド" },
] as const;

export function ActivitiesSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Activities
          </h2>
        </div>
        <p className="mt-3 text-muted-foreground">講演・セミナー・教育活動</p>

        <div className="mt-8 flex gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative mt-12"
        >
          <div className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px bg-border sm:block" />

          <div className="flex flex-col gap-6">
            {TIMELINE.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className={`relative flex gap-5 rounded-2xl p-6 transition-colors sm:pl-12 ${
                    item.highlight
                      ? "bg-warm-oat dark:bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="absolute left-[12px] top-8 z-10 hidden h-4 w-4 items-center justify-center rounded-full border-2 border-foreground/20 bg-background sm:flex">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.highlight ? "bg-foreground" : "bg-foreground/40"
                      }`}
                    />
                  </div>

                  <div className="flex-shrink-0 sm:hidden">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium tracking-wide text-muted-foreground">
                        {item.period}
                      </span>
                      <span className="rounded-full border px-2 py-0.5 text-[11px]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-sm font-medium sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
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
