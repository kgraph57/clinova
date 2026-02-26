"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

const STATS = [
  { value: "200+", label: "コンテンツ" },
  { value: "15", label: "学習コース" },
  { value: "無料", label: "公開中" },
] as const;

export function HeroSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* テキスト側 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium tracking-widest text-muted-foreground"
            >
              Healthcare &times; AI &times; Technology
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="mt-4 font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            >
              散らばる星を、
              <br />
              星座にする。
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Hoshizuは、医療とテクノロジーの交差点で
              プロダクト開発・ナレッジ共有・AI活用支援を行っています。
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Knowledge
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                学習コース
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-14 flex items-center gap-8"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 画像側 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:w-[52%] lg:flex-shrink-0"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={`${BASE_PATH}/images/hero-main.png`}
                alt="散らばる星を、星座にする。"
                width={2752}
                height={1536}
                className="w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
