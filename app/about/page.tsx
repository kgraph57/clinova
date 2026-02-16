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
} from "lucide-react";
import { getArticleCount } from "@/lib/content";
import { getCourseCount } from "@/lib/courses";

export const metadata: Metadata = {
  title: "About",
  description: "Ken Okamoto — 医師 / 医療AI研究者",
};

const EXPERTISE = [
  {
    icon: Brain,
    label: "医療AI実装",
    description:
      "LLMを活用した臨床支援ツールの設計・プロンプトエンジニアリング",
  },
  {
    icon: Stethoscope,
    label: "臨床実践",
    description: "AIを日常診療に統合するワークフローの構築と検証",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ken Okamoto",
    jobTitle: "医師 / 医療AI研究者",
    url: "https://kgraph57.github.io/hoshizu/about",
    sameAs: [
      "https://github.com/kgraph57",
      "https://x.com/kgraph_",
      "https://note.com/kgraph_",
    ],
    knowsAbout: [
      "Medical AI",
      "Prompt Engineering",
      "Clinical Decision Support",
      "Healthcare Informatics",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[720px] px-6 py-20 sm:py-28">
        {/* Profile */}
        <section>
          <div className="flex items-center gap-5">
            <Image
              src="https://github.com/kgraph57.png"
              alt="Ken Okamoto"
              width={72}
              height={72}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-medium">Ken Okamoto</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                医師 / 医療AI研究者
              </p>
            </div>
          </div>

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

          {/* Stats */}
          <div className="mt-6 flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-semibold">{counts.all ?? 0}+</p>
              <p className="mt-0.5 text-xs text-muted-foreground">コンテンツ</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{courseCount}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">学習コース</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">5</p>
              <p className="mt-0.5 text-xs text-muted-foreground">専門領域</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">Hoshizuとは</h2>
          <div className="mt-6 space-y-4 text-base leading-[1.8] text-muted-foreground">
            <p>
              Hoshizu（星図）は、散らばるデータをつなぎ、使えるナレッジに変える
              医療AIナレッジポータルです。プロンプト、ワークフローガイド、
              学習コンテンツを1箇所に集約しています。
            </p>
            <p>
              医療AIに関する情報はTwitter、Note、論文、書籍など様々な場所に散在しています。
              それらの「星」をつなぎ、実践で使える「星座」に変えることが
              Hoshizuのミッションです。
            </p>
            <p>
              「AI本を読んでも実践に結びつかない」「情報が散らばりすぎて
              体系化できていない」— そんな声に応えるために、
              実際に臨床・研究で使えるナレッジを厳選してお届けします。
            </p>
          </div>
        </section>

        {/* Expertise */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">専門領域</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {EXPERTISE.map((item) => (
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
