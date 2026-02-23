"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mic,
  PenTool,
  BookOpen,
  GraduationCap,
  Github,
  Twitter,
  PenLine,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const ACTIVITIES = [
  {
    icon: Mic,
    label: "講演・セミナー",
    description: "医療AI導入の実践的な知見を共有",
  },
  {
    icon: PenTool,
    label: "執筆・連載",
    description: "医療AI活用の解説記事・書籍",
  },
  {
    icon: BookOpen,
    label: "監修・コンサル",
    description: "コンテンツや研修の医療AI監修",
  },
  {
    icon: GraduationCap,
    label: "研修・ワークショップ",
    description: "医療従事者向けAIハンズオン研修",
  },
] as const;

interface CreatorSectionProps {
  contentCount: number;
  courseCount: number;
}

export function CreatorSection({
  contentCount,
  courseCount,
}: CreatorSectionProps) {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16"
          >
            {/* Profile */}
            <div className="flex-shrink-0 md:w-[280px]">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Image
                  src="https://github.com/kgraph57.png"
                  alt="Ken Okamoto"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
                <h3 className="mt-4 text-lg font-medium">Ken Okamoto</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Founder / 医師
                </p>
                <div className="mt-3 flex gap-3">
                  <a
                    href="https://github.com/kgraph57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://x.com/kgraph_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="X"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="https://note.com/kgraph_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="note"
                  >
                    <PenLine className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-lg font-semibold text-foreground">
                      {contentCount}+
                    </span>
                    コンテンツ
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-lg font-semibold text-foreground">
                      {courseCount}
                    </span>
                    学習コース
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs font-medium tracking-widest text-muted-foreground">
                Founder
              </p>
              <h2 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
                臨床の現場から、医療AIの実践知を届ける
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                臨床医としてAIを日常的に活用する中で得た知見を、
                プロンプトテンプレート・学習コース・ワークフローガイドとして体系化しています。
                「読んで終わり」ではなく「明日の臨床で使える」ナレッジを目指しています。
              </p>

              {/* Activities */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {ACTIVITIES.map((activity) => (
                  <div
                    key={activity.label}
                    className="flex items-start gap-3 rounded-xl bg-muted/50 p-4"
                  >
                    <activity.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{activity.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  お仕事のご依頼・ご相談
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  プロフィール詳細
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
