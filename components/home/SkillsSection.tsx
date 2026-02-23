"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  ShieldCheck,
  BarChart3,
  PieChart,
  Github,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const SKILLS = [
  {
    name: "Paper Writer",
    repo: "paper-writer-skill",
    description:
      "論文執筆の全工程をAIで支援。文献検索から投稿原稿まで一気通貫。",
    url: "https://github.com/kgraph57/paper-writer-skill",
    icon: FileText,
  },
  {
    name: "Evidentia",
    repo: "evidentia",
    description:
      "医療コンテンツのエビデンスレベルを自動評価するファクトチェックスキル。",
    url: "https://github.com/kgraph57/evidentia",
    icon: ShieldCheck,
  },
  {
    name: "McKinsey Viz",
    repo: "mckinsey-style-visualization-skill",
    description: "戦略コンサルティング水準のデータ可視化を自動生成。",
    url: "https://github.com/kgraph57/mckinsey-style-visualization-skill",
    icon: BarChart3,
  },
  {
    name: "HBR Viz",
    repo: "hbr-style-visualization",
    description:
      "Harvard Business Review スタイルのチャート・インフォグラフィック生成。",
    url: "https://github.com/kgraph57/hbr-style-visualization",
    icon: PieChart,
  },
] as const;

export function SkillsSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Skills
            </h2>
            <p className="mt-3 text-muted-foreground">
              Claude Code 向けに開発したAIスキル・プラグイン
            </p>
          </div>
          <a
            href="https://github.com/kgraph57"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Github className="h-4 w-4" />
            その他のプロジェクト
          </a>
        </div>

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
                key={skill.repo}
                variants={fadeInUp}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-background">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{skill.name}</h3>
                    <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <div className="mt-6 text-center sm:hidden">
          <a
            href="https://github.com/kgraph57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            その他のプロジェクト
          </a>
        </div>
      </div>
    </section>
  );
}
