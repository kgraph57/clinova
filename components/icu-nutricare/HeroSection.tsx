"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-chart-1" />
            Open Source — 379製品 × 97栄養成分
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
          >
            臨床栄養管理を、
            <br />
            定量化する。
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            経腸栄養・静脈栄養の成分を自動計算し、
            充足度をスコアリング。薬剤相互作用の検出から
            投与プロトコル生成まで、栄養管理のワークフローを一つに。
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="https://kgraph57.github.io/nutri-care/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              デモを試す
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/kgraph57/nutri-care"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
