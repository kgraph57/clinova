import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Twitter,
  PenLine,
  Mail,
  ArrowRight,
  Mic,
  PenTool,
  BookOpen,
  GraduationCap,
  Stethoscope,
  Brain,
  Lightbulb,
  Target,
  Star,
  ExternalLink,
  Users,
  UserCheck,
  Presentation,
  Calendar,
} from "lucide-react";
import { getArticleCount } from "@/lib/content";
import { getCourseCount } from "@/lib/courses";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hoshizu — 医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行っています。",
};

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
    icon: Mic,
    label: "講演・セミナー",
    description:
      "学会・病院・企業向けに、医療AIの基礎から実践導入まで。ハンズオン形式にも対応します。",
  },
  {
    icon: PenTool,
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

export default function AboutPage() {
  const counts = getArticleCount();
  const courseCount = getCourseCount();

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
      <div className="mx-auto max-w-[720px] px-6 py-20 sm:py-28">
        {/* Company Header */}
        <section>
          <p className="text-sm font-medium tracking-widest text-muted-foreground">
            About Hoshizu
          </p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            散らばる星を、星座にする。
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Hoshizuは、医療とテクノロジーの交差点で
            プロダクト開発・ナレッジ共有・AI活用支援を行っています。
          </p>
        </section>

        {/* Stats */}
        <section className="mt-10 flex gap-6">
          <div className="text-center">
            <p className="text-2xl font-semibold">{counts.all ?? 0}+</p>
            <p className="mt-0.5 text-xs text-muted-foreground">コンテンツ</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">{courseCount}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">学習コース</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">3</p>
            <p className="mt-0.5 text-xs text-muted-foreground">サービス</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">
            Mission &amp; Vision
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {MISSION_POINTS.map((item) => (
              <div key={item.label} className="rounded-xl bg-muted/50 p-5">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-3 text-sm font-medium">{item.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">事業内容</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {WHAT_WE_DO.map((item) => (
              <div key={item.label} className="rounded-xl bg-muted/50 p-5">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-3 text-sm font-medium">{item.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">
            対応可能なお仕事
          </h2>
          <div className="mt-6 space-y-4">
            {SERVICES.map((service) => (
              <div
                key={service.label}
                className="flex items-start gap-4 rounded-xl border p-5"
              >
                <service.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">{service.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">講演・教育活動</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                period: "2025.04 —",
                title: "院内AIセミナー 企画・開講",
                detail: "医師・医療従事者向け、全7回シリーズ",
                icon: Mic,
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
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border p-5"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="mt-0.5 text-sm font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">
            書籍・雑誌・連載
          </h2>

          {/* Book */}
          <a
            href="https://www.amazon.co.jp/dp/4885637481"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-start gap-4 rounded-xl border p-5 transition-colors hover:bg-muted/50"
          >
            <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium">
                  ケースで学ぶ若手医師のAI活用ガイド
                </h3>
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                診療・救急・病棟・教育・研究・論文作成まで73の臨床ケースを収録。東京医学社、2026年1月刊。
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  5.0 (6件)
                </span>
                <span>共著</span>
              </div>
            </div>
          </a>

          {/* Serials */}
          <div className="mt-4 flex items-start gap-4 rounded-xl border p-5">
            <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border px-2 py-0.5 text-[11px] font-medium">
                  分担執筆
                </span>
                <span className="text-xs text-muted-foreground">
                  2026年3月号
                </span>
              </div>
              <h3 className="mt-1 text-sm font-medium">
                小児内科「AIとともに育つ医療」特集号
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                「小児科専攻医によるAI実践」を執筆。松尾豊、大塚篤司ほか各領域の第一人者が集結した全22項目の特集号。東京医学社。
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-4 rounded-xl border p-5">
            <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border px-2 py-0.5 text-[11px] font-medium">
                  連載
                </span>
                <span className="text-xs text-muted-foreground">
                  2026年3月〜
                </span>
              </div>
              <h3 className="mt-1 text-sm font-medium">
                日経メディカル「医師のための生成AI活用Tips集」
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                鑑別診断のAI壁打ち、PHIゼロの実践、深夜の専門外急患対応など、臨床現場のリアルな課題をAIで解決する全10回連載。日経BP。
              </p>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="mt-16 border-t pt-16">
          <p className="text-sm font-medium tracking-widest text-muted-foreground">
            Founder
          </p>
          <div className="mt-6 flex items-center gap-5">
            <Image
              src="https://github.com/kgraph57.png"
              alt="Ken Okamoto"
              width={72}
              height={72}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-medium">Ken Okamoto</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                医師 / 医療AI研究者
              </p>
            </div>
          </div>

          <p className="mt-6 leading-[1.8] text-muted-foreground">
            臨床医としてAIを日常的に活用する中で得た知見を、
            プロンプトテンプレート・学習コース・ワークフローガイドとして体系化しています。
            「読んで終わり」ではなく「明日の臨床で使える」ナレッジを目指しています。
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
            <a
              href="https://github.com/kgraph57"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://x.com/kgraph_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Twitter className="h-4 w-4" />X
            </a>
            <a
              href="https://note.com/kgraph_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <PenLine className="h-4 w-4" />
              note
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-16 rounded-2xl bg-warm-oat p-8 dark:bg-muted sm:p-10">
          <h2 className="font-serif text-xl tracking-tight">
            お仕事のご依頼・ご相談
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            講演、執筆、監修、研修など、医療AIに関するお仕事のご相談をお待ちしております。
            コンテンツの提案や誤りの報告も歓迎です。
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            お問い合わせ
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </>
  );
}
