"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpen,
  Brain,
  Envelope,
  GithubLogo,
  GraduationCap,
  Lightbulb,
  Microphone,
  PenNib,
  PencilLine,
  Presentation,
  Star,
  Stethoscope,
  Target,
  TwitterLogo,
  UserCheck,
  Users,
} from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const MISSION_POINTS = [
  {
    icon: Target,
    label: "Mission",
    description:
      "医療AIに関する情報はSNS、論文、書籍など様々な場所に散在しています。それらの「星」をつなぎ、実践で使える「星座」に変えること。",
  },
  {
    icon: Lightbulb,
    label: "Vision",
    description:
      "すべての医療従事者がAIを日常のツールとして使いこなし、患者さんにより良い医療を届けられる世界を目指します。",
  },
] as const;

const WHAT_WE_DO = [
  {
    icon: Brain,
    label: "プロダクト開発",
    description:
      "医療・子育て領域のWebアプリケーション・ツールを設計・開発しています。",
  },
  {
    icon: Stethoscope,
    label: "ナレッジ共有",
    description:
      "プロンプトテンプレート・学習コース・ワークフローガイドを体系化し、無料で公開しています。",
  },
] as const;

const SERVICES = [
  {
    icon: Microphone,
    label: "講演・セミナー",
    description:
      "学会・病院・企業向けに、医療AIの基礎から実践導入まで。ハンズオン形式にも対応します。",
  },
  {
    icon: PenNib,
    label: "執筆・連載",
    description:
      "医療AI活用に関する解説記事、書籍執筆、Web連載。専門知識をわかりやすく伝えます。",
  },
  {
    icon: BookOpen,
    label: "監修・コンサルティング",
    description:
      "医療AIコンテンツの正確性監修、導入計画の策定、教材の共同開発。",
  },
  {
    icon: GraduationCap,
    label: "研修・ワークショップ",
    description:
      "医療従事者向けのAI活用ハンズオン研修。実際の臨床シナリオに基づいた実践的内容。",
  },
] as const;

const ACTIVITIES = [
  {
    period: "2025.04 —",
    title: "院内AIセミナー 企画・開講",
    detail: "医師・医療従事者向け、全7回シリーズ",
    icon: Microphone,
  },
  {
    period: "2025.08",
    title: "医師向け生成AI講座（全6講座）",
    detail:
      "後期研修医対象、111スライド・計3時間超の体系プログラム",
    icon: GraduationCap,
  },
  {
    period: "2026.01",
    title: "キャリアアップ研修会 登壇",
    detail: "全職員＋院外300名超参加、ハイブリッド開催",
    icon: Users,
  },
  {
    period: "2026.02 —",
    title: "個別AI指導セッション",
    detail: "CLS・各診療科部長・スタッフへの実践指導",
    icon: UserCheck,
  },
  {
    period: "2026.04 —",
    title: "医師のためのAI実践道場（全8回）",
    detail: "週1回ランチセミナー形式、プロンプト〜論文執筆まで",
    icon: Presentation,
  },
] as const;

interface AboutPageContentProps {
  articleCount: number;
  courseCount: number;
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-2xl tracking-tight sm:text-3xl ${eyebrow ? "mt-3" : ""}`}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export function AboutPageContent({
  articleCount,
  courseCount,
}: AboutPageContentProps) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Hoshizu",
      url: "https://kgraph57.github.io/hoshizu",
      description:
        "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行っています。",
      founder: {
        "@type": "Person",
        name: "Ken Okamoto",
        jobTitle: "Founder / 医師",
      },
      sameAs: [
        "https://github.com/kgraph57",
        "https://x.com/kgraph_",
        "https://note.com/kgraph_",
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-[720px] px-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground/50"
          >
            About Hoshizu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl"
          >
            散らばる星を、星座にする。
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-[1.8] text-muted-foreground"
          >
            Hoshizuは、医療とテクノロジーの交差点で
            プロダクト開発・ナレッジ共有・AI活用支援を行っています。
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-16">
        <div className="mx-auto flex max-w-[720px] justify-start gap-16 px-6 sm:gap-20">
          {[
            { value: articleCount, suffix: "+", label: "コンテンツ" },
            { value: courseCount, suffix: "", label: "学習コース" },
            { value: 3, suffix: "", label: "サービス" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-serif text-4xl font-light tracking-tight sm:text-5xl"
              />
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[720px] px-6">
        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
          }}
        />

        {/* Mission & Vision */}
        <section className="py-16">
          <SectionHeading eyebrow="Purpose" title="Mission & Vision" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MISSION_POINTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className="rounded-2xl border border-border/50 p-6 transition-colors hover:bg-muted/30"
                >
                  <Icon className="h-5 w-5 text-accent-gold" />
                  <h3 className="mt-4 text-sm font-medium">{item.label}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-muted-foreground/70">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16">
          <SectionHeading eyebrow="Core" title="事業内容" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {WHAT_WE_DO.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className="rounded-2xl border border-border/50 p-6 transition-colors hover:bg-muted/30"
                >
                  <Icon className="h-5 w-5 text-accent-gold" />
                  <h3 className="mt-4 text-sm font-medium">{item.label}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-muted-foreground/70">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <SectionHeading eyebrow="Services" title="対応可能なお仕事" />
          <div className="mt-8 space-y-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="flex items-start gap-4 border-b border-border/40 pb-5 pt-2"
                >
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground/50" />
                  <div>
                    <h3 className="text-sm font-medium">{service.label}</h3>
                    <p className="mt-1.5 text-sm leading-[1.8] text-muted-foreground/70">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Activities */}
        <section className="py-16">
          <SectionHeading eyebrow="Track record" title="講演・教育活動" />
          <div className="mt-8 space-y-0">
            {ACTIVITIES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="flex items-start gap-4 border-b border-border/40 py-5"
                >
                  <span className="w-20 flex-shrink-0 pt-0.5 text-xs tracking-wide text-muted-foreground/50">
                    {item.period}
                  </span>
                  <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground/40" />
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground/60">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Publications */}
        <section className="py-16">
          <SectionHeading eyebrow="Publications" title="書籍・雑誌・連載" />

          <div className="mt-8 space-y-4">
            <a
              href="https://www.amazon.co.jp/dp/4885637481"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-border/50 p-6 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                  <div>
                    <h3 className="text-sm font-medium">
                      ケースで学ぶ若手医師のAI活用ガイド
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.8] text-muted-foreground/70">
                      診療・救急・病棟・教育・研究・論文作成まで73の臨床ケースを収録。東京医学社、2026年1月刊。
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/50">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        5.0 (6件)
                      </span>
                      <span>共著</span>
                    </div>
                  </div>
                </div>
                <ArrowSquareOut className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>

            <div className="rounded-2xl border border-border/50 p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground/70">
                      分担執筆
                    </span>
                    <span className="text-xs text-muted-foreground/50">
                      2026年3月号
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-medium">
                    小児内科「AIとともに育つ医療」特集号
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.8] text-muted-foreground/70">
                    「小児科専攻医によるAI実践」を執筆。松尾豊、大塚篤司ほか各領域の第一人者が集結した全22項目の特集号。東京医学社。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground/70">
                      連載
                    </span>
                    <span className="text-xs text-muted-foreground/50">
                      2026年3月〜
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-medium">
                    日経メディカル「医師のための生成AI活用Tips集」
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.8] text-muted-foreground/70">
                    鑑別診断のAI壁打ち、PHIゼロの実践、深夜の専門外急患対応など、臨床現場のリアルな課題をAIで解決する全10回連載。日経BP。
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://medical.nikkeibp.co.jp/leaf/mem/pub/report/t285/202603/592302.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-border/50 p-6 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground/70">
                        日経メディカル監修記事
                      </span>
                      <span className="text-xs text-muted-foreground/50">
                        2026年3月11日
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-sm font-medium">
                      医師の調べ物に役立つAI検索ツール、何ができる？ どう使い分ける？
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.8] text-muted-foreground/70">
                      シリーズ◎医療現場での活用進む人工知能。生成AIの登場で変わった医師の情報アクセスと、AI検索ツールの活用法・使い分けを解説。日経BP。
                    </p>
                  </div>
                </div>
                <ArrowSquareOut className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          </div>
        </section>

        {/* Founder */}
        <section className="py-16">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
            }}
          />
          <div className="pt-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
              Founder
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Image
                src="https://github.com/kgraph57.png"
                alt="Ken Okamoto"
                width={80}
                height={80}
                className="rounded-2xl"
              />
              <div>
                <h3 className="text-xl font-medium tracking-tight">
                  Ken Okamoto
                </h3>
                <p className="mt-1 text-sm text-muted-foreground/60">
                  医師 / 医療AI研究者
                </p>
              </div>
            </div>

            <p className="mt-6 leading-[1.8] text-muted-foreground/70">
              臨床医としてAIを日常的に活用する中で得た知見を、
              プロンプトテンプレート・学習コース・ワークフローガイドとして体系化しています。
              「読んで終わり」ではなく「明日の臨床で使える」ナレッジを目指しています。
            </p>

            <div className="mt-6 flex flex-wrap gap-5">
              {[
                {
                  href: "https://github.com/kgraph57",
                  icon: GithubLogo,
                  label: "GitHub",
                },
                {
                  href: "https://x.com/kgraph_",
                  icon: TwitterLogo,
                  label: "X",
                },
                {
                  href: "https://note.com/kgraph_",
                  icon: PencilLine,
                  label: "note",
                },
                { href: "/contact", icon: Envelope, label: "Contact" },
              ].map((link) => {
                const Icon = link.icon;
                const isExternal = link.href.startsWith("http");
                const Component = isExternal ? "a" : Link;
                const props = isExternal
                  ? { target: "_blank" as const, rel: "noopener noreferrer" }
                  : {};
                return (
                  <Component
                    key={link.label}
                    href={link.href}
                    {...props}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/60 transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Component>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mb-16 rounded-2xl border border-border/30 bg-muted/30 p-8 sm:p-10">
          <h2 className="font-serif text-xl tracking-tight">
            お仕事のご依頼・ご相談
          </h2>
          <p className="mt-3 text-sm leading-[1.8] text-muted-foreground/70">
            講演、執筆、監修、研修など、医療AIに関するお仕事のご相談をお待ちしております。
            コンテンツの提案や誤りの報告も歓迎です。
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            お問い合わせ
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </>
  );
}
