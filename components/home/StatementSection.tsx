"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInSlow, containerVariantsSlow } from "@/lib/animations";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

interface StatementSectionProps {
  articleCount: number;
  courseCount: number;
}

const STATS = (articleCount: number, courseCount: number) =>
  [
    { value: articleCount, suffix: "+", label: "ナレッジ記事" },
    { value: courseCount, suffix: "", label: "学習コース" },
    { value: 5, suffix: "", label: "カテゴリ" },
  ] as const;

export function StatementSection({
  articleCount,
  courseCount,
}: StatementSectionProps) {
  const stats = STATS(articleCount, courseCount);
  const imageRef = useRef(null);

  // Parallax: image moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.02]);

  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Hero image with parallax */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-20 overflow-hidden rounded-2xl sm:mb-24"
        >
          <motion.div
            className="aspect-[21/9] sm:aspect-[2.4/1]"
            style={{ y: imageY, scale: imageScale }}
          >
            <Image
              src={`${BASE_PATH}/images/hero-main.png`}
              alt="星空を見上げる医師 — 散らばる星を、星座にする"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20 flex justify-center gap-16 sm:gap-24 lg:gap-32"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInSlow}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl"
              />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
            What we do
          </p>
          <h2 className="mt-8 font-serif text-2xl leading-[1.6] tracking-tight sm:text-3xl sm:leading-[1.6] lg:text-4xl lg:leading-[1.6]">
            医療AIの実践知を、
            <br />
            プロンプト・ガイド・コースに体系化。
            <br />
            臨床の現場ですぐ使えるナレッジを届けます。
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
