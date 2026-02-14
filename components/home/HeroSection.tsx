"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
          >
            散らばる星を、
            <br />
            星座にする。
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            散在するデータをつなぎ、使えるナレッジに。
            プロンプト、ワークフロー、ガイドを1箇所に集約し、
            あなたの実践を加速します。
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              ナレッジを見る
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground underline underline-offset-4 decoration-border transition-colors hover:text-foreground hover:decoration-foreground"
            >
              詳しく知る
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
