"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp, fadeInUpBlur } from "@/lib/animations";
import { TiltCard } from "@/components/effects/TiltCard";
import {
  ArrowUpRight,
  Article,
  Baby,
  ChartBar,
  ChartPie,
  GithubLogo,
  GraduationCap,
  Heartbeat,
  ShieldCheck,
} from "@phosphor-icons/react";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/hoshizu" : "";

const SERVICES = [
  {
    name: "すくすくナビ",
    description:
      "港区の子育て支援情報を一元化。保育園・医療機関・手当制度などを地域密着で整理し、子育て世代をサポートします。",
    href: "/sukusuku-navi",
    icon: Baby,
    color: "bg-warm-sage dark:bg-emerald-950/30",
    number: "01",
    image: "/images/products/sukusuku-navi.png",
  },
  {
    name: "ふたりナビ",
    description:
      "結婚手続き・届出・給付金ナビ。婚姻届の提出から名義変更・保険・税金まで、手続きをステップごとにガイドします。",
    href: "/futari-navi",
    icon: Heartbeat,
    color: "bg-warm-sky dark:bg-sky-950/30",
    number: "02",
    image: "/images/products/futari-navi.png",
  },
  {
    name: "Pediatric Learning",
    description:
      "小児科領域の学習を支援するアプリ。問題演習・解説・弱点分析で効率的な学習を実現。医学生・研修医の試験対策にも対応します。",
    href: "/pediatric-learning",
    icon: GraduationCap,
    color: "bg-warm-heather dark:bg-purple-950/30",
    number: "03",
    image: "/images/products/pediatric-learning.png",
  },
] as const;

const SKILLS = [
  {
    name: "Paper Writer",
    description:
      "論文執筆の全工程をAIで支援。文献検索から投稿原稿まで一気通貫。",
    url: "https://github.com/kgraph57/paper-writer-skill",
    icon: Article,
  },
  {
    name: "Evidentia",
    description:
      "医療コンテンツのエビデンスレベルを自動評価するファクトチェックスキル。",
    url: "https://github.com/kgraph57/evidentia",
    icon: ShieldCheck,
  },
  {
    name: "McKinsey Viz",
    description: "戦略コンサルティング水準のデータ可視化を自動生成。",
    url: "https://github.com/kgraph57/mckinsey-style-visualization-skill",
    icon: ChartBar,
  },
  {
    name: "HBR Viz",
    description:
      "Harvard Business Review スタイルのチャート・インフォグラフィック生成。",
    url: "https://github.com/kgraph57/hbr-style-visualization",
    icon: ChartPie,
  },
] as const;

export function ProductsSection() {
  return (
    <section className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden h-px w-10 origin-left bg-foreground/15 sm:block"
            />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground/50">
              Built with care
            </p>
          </div>
          <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Products
          </h2>
        </motion.div>
        <p className="mt-3 text-muted-foreground">
          医療・子育て領域のプロダクトとAIスキル
        </p>

        {/* Services — numbered cards with tilt */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.name} variants={fadeInUpBlur}>
                <TiltCard tiltDeg={4} glare>
                  <Link
                    href={service.href}
                    className={`group flex h-full flex-col rounded-2xl overflow-hidden transition-all duration-300 ${service.color}`}
                  >
                    {/* Screenshot */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={`${BASE_PATH}${service.image}`}
                        alt={service.name}
                        width={640}
                        height={400}
                        loading="eager"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* Text */}
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
                          <Icon className="h-4.5 w-4.5 text-foreground/70" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium">
                            {service.name}
                          </h3>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.a
                key={skill.name}
                variants={fadeInUp}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl bg-muted/50 p-6 transition-all duration-300 hover:bg-muted hover:shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-background transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{skill.name}</h3>
                    <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* GitHub link */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/kgraph57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubLogo className="h-4 w-4" />
            View all projects on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
