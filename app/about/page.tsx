import type { Metadata } from "next"
import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About",
  description: "Clinovaについて - 医療従事者のためのAIナレッジポータル",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Profile */}
      <section>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            K
          </div>
          <div>
            <h1 className="text-2xl font-bold">Ken Okamoto</h1>
            <p className="text-sm text-muted-foreground">
              医師 / 医療AI研究者
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a
              href="https://github.com/kenokamoto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/contact">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </Link>
          </Button>
        </div>
      </section>

      {/* Mission */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">Clinovaとは</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
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
      <section className="mt-12">
        <h2 className="text-xl font-bold">提供するもの</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "プロンプトライブラリ",
              desc: "鑑別診断、論文執筆、文書作成など、医療者がコピペで使えるAIプロンプト集",
            },
            {
              title: "ワークフローガイド",
              desc: "症例報告の書き方、論文読解、英語校正など、AIを活用したステップバイステップの手順書",
            },
            {
              title: "学習コンテンツ",
              desc: "プロンプトエンジニアリングの基礎から応用まで、医療者向けに最適化した学習コース",
            },
            {
              title: "キュレーション",
              desc: "散在する医療AI情報を体系的に整理。最新の知見もタイムリーに反映",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border bg-card p-4"
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-12 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="text-lg font-bold">フィードバック・コラボレーション</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          コンテンツの提案、誤りの報告、コラボレーションのご相談など、
          お気軽にお問い合わせください。
        </p>
        <Button asChild className="mt-4">
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </section>
    </div>
  )
}
