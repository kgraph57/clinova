import type { Metadata } from "next";
import Link from "next/link";
import {
  Github,
  Mail,
  BookOpen,
  Workflow,
  GraduationCap,
  Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Clinovaについて - 医療従事者のためのAIナレッジポータル",
};

const OFFERINGS = [
  {
    title: "プロンプトライブラリ",
    desc: "鑑別診断、論文執筆、文書作成など、医療者がコピペで使えるAIプロンプト集",
    icon: BookOpen,
  },
  {
    title: "ワークフローガイド",
    desc: "症例報告の書き方、論文読解、英語校正など、AIを活用したステップバイステップの手順書",
    icon: Workflow,
  },
  {
    title: "学習コンテンツ",
    desc: "プロンプトエンジニアリングの基礎から応用まで、医療者向けに最適化した学習コース",
    icon: GraduationCap,
  },
  {
    title: "キュレーション",
    desc: "散在する医療AI情報を体系的に整理。最新の知見もタイムリーに反映",
    icon: Library,
  },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Profile */}
      <section>
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-2xl font-bold text-white shadow-lg shadow-teal-500/20">
            K
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ken Okamoto</h1>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              医師 / 医療AI研究者
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg"
          >
            <a
              href="https://github.com/kgraph57"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg"
          >
            <Link href="/contact">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </Link>
          </Button>
        </div>
      </section>

      {/* Mission */}
      <section className="mt-14">
        <h2 className="text-lg font-bold tracking-tight">Clinovaとは</h2>
        <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.85] text-muted-foreground">
          <p>
            Clinova（クリノバ）は、医療従事者のためのAIナレッジポータルです。
            臨床現場や研究で使える AI プロンプト、ワークフローガイド、
            学習コンテンツを体系的にまとめています。
          </p>
          <p>
            医療AIに関する情報はTwitter、Note、論文、書籍など様々な場所に散在しています。
            それらを1箇所に集約し、忙しい医療者がすぐに実践できる形で提供することが
            Clinovaのミッションです。
          </p>
          <p>
            「AI本を読んでも実践に結びつかない」「情報が散らばりすぎて
            体系化できていない」— そんな声に応えるために、
            実際に臨床・研究で使えるナレッジを厳選してお届けします。
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="mt-14">
        <h2 className="text-lg font-bold tracking-tight">提供するもの</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {OFFERINGS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/20"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="mt-3 text-[0.9375rem] font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-14 rounded-2xl border bg-gradient-to-br from-primary/[0.03] to-transparent p-8 text-center">
        <h2 className="text-lg font-bold tracking-tight">
          フィードバック・コラボレーション
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          コンテンツの提案、誤りの報告、コラボレーションのご相談など、
          お気軽にお問い合わせください。
        </p>
        <Button
          asChild
          className="mt-5 rounded-full px-6 shadow-lg shadow-primary/20"
        >
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </section>
    </div>
  );
}
