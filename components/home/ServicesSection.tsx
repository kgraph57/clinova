"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Utensils, GraduationCap } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const SERVICES = [
  {
    name: "すくすくナビ",
    repo: "sukusuku-navi",
    description:
      "港区の子育て支援情報を一元化。保育園・医療機関・手当制度などを地域密着で整理し、子育て世代をサポートします。",
    url: "https://kgraph57.github.io/sukusuku-navi/",
    icon: Baby,
    language: "MDX",
    color: "bg-warm-sage dark:bg-emerald-950/30",
  },
  {
    name: "NutriCare",
    repo: "nutri-care",
    description:
      "ICU・病棟向け栄養管理ツール。経腸栄養・静脈栄養の計算を自動化し、臨床現場の栄養管理を効率化します。",
    url: "https://kgraph57.github.io/nutri-care/",
    icon: Utensils,
    language: "TypeScript",
    color: "bg-warm-sky dark:bg-blue-950/30",
  },
  {
    name: "Pediatric Exam",
    repo: "pediatric-exam-app",
    description:
      "小児科専門医試験の学習を支援するアプリ。問題演習・解説・弱点分析で効率的な試験対策を実現します。",
    url: "https://kgraph57.github.io/pediatric-exam-app/",
    icon: GraduationCap,
    language: "JavaScript",
    color: "bg-warm-heather dark:bg-purple-950/30",
  },
] as const;

const LANGUAGE_DOTS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  MDX: "bg-orange-400",
};

export function ServicesSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          Services
        </h2>
        <p className="mt-3 text-muted-foreground">
          医療・子育て領域で実際に運用しているプロダクト
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.a
                key={service.repo}
                variants={fadeInUp}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col justify-between rounded-2xl p-8 transition-all duration-200 hover:scale-[1.02] ${service.color}`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <Icon className="h-7 w-7 text-foreground/70" />
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 text-xl font-medium">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${LANGUAGE_DOTS[service.language] ?? "bg-foreground/30"}`}
                    />
                    {service.language}
                  </span>
                  <span className="rounded-full border px-2 py-0.5 text-[11px]">
                    {service.repo}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
