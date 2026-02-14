"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { containerVariants, fadeInUpBlur, EASE_DEFAULT } from "@/lib/animations"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 via-background to-background dark:from-teal-950/20" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center py-20 text-center sm:py-28 lg:py-36"
        >
          {/* Badge */}
          <motion.div variants={fadeInUpBlur}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              医療AI ナレッジポータル
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUpBlur}
            className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            医療AI、
            <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-300">
              体系的に。
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUpBlur}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            散在する医療AIの知見を1箇所に集約。
            <br className="hidden sm:block" />
            プロンプト・ワークフロー・学習コースで、
            <br className="hidden sm:block" />
            臨床と研究の現場を支えます。
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUpBlur}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/knowledge">
                <BookOpen className="h-4 w-4" />
                ナレッジを見る
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/about">
                詳しく知る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUpBlur}
            className="mt-14 grid grid-cols-3 gap-8 sm:gap-12"
          >
            {[
              { value: "15+", label: "プロンプト" },
              { value: "5+", label: "ワークフロー" },
              { value: "10+", label: "学習コンテンツ" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  className="text-2xl font-bold text-primary sm:text-3xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE_DEFAULT, delay: 0.6 }}
                >
                  {stat.value}
                </motion.div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
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
