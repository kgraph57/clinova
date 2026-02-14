import type { Metadata } from "next";
import Link from "next/link";
import { Github, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Hoshizuについて - 散らばる星を、星座にする",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 sm:py-28">
      {/* Profile */}
      <section>
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl font-medium">
            K
          </div>
          <div>
            <h1 className="text-xl font-medium">Ken Okamoto</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              医師 / 医療AI研究者
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-4">
          <a
            href="https://github.com/kgraph57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            GitHub
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

      {/* Contact CTA */}
      <section className="mt-16 rounded-2xl bg-warm-oat p-8 dark:bg-muted sm:p-10">
        <h2 className="font-serif text-xl tracking-tight">
          フィードバック・コラボレーション
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          コンテンツの提案、誤りの報告、コラボレーションのご相談など、
          お気軽にお問い合わせください。
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
  );
}
