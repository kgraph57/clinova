"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { containerVariants, fadeInUpBlur, EASE_DEFAULT } from "@/lib/animations"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.50_0.13_185/0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 via-background to-background dark:from-teal-950/20" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center py-24 text-center sm:py-32 lg:py-40"
        >
          <motion.div variants={fadeInUpBlur}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Medical AI Knowledge Portal
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUpBlur}
            className="mt-8 max-w-2xl text-[2.5rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            医療AI、
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent dark:from-teal-400 dark:via-teal-300 dark:to-cyan-300">
              体系的に。
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUpBlur}
            className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base"
          >
            散在する医療AIの知見を1箇所に集約。
            プロンプト・ワークフロー・学習コースで、
            臨床と研究を加速します。
          </motion.p>

          <motion.div
            variants={fadeInUpBlur}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="gap-2 rounded-full px-6 shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/25">
              <Link href="/knowledge">
                <BookOpen className="h-4 w-4" />
                ナレッジを見る
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-full px-6">
              <Link href="/about">
                詳しく知る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUpBlur}
            className="mt-16 flex items-center gap-10 sm:gap-14"
          >
            {[
              { value: "15+", label: "プロンプト" },
              { value: "5", label: "カテゴリ" },
              { value: "10+", label: "学習コンテンツ" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_DEFAULT, delay: 0.6 + i * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
