"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Activity, GraduationCap } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

type Service = {
  name: string;
  repo: string;
  description: string;
  url: string;
  internal?: boolean;
  icon: React.ElementType;
  language: string;
  color: string;
};

const SERVICES: Service[] = [
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
    name: "ICU NutriCare",
    repo: "nutri-care",
    description:
      "ICU・PICU向け包括的栄養管理アプリ。379製品のデータベースと12の臨床機能で、エビデンスに基づく栄養サポートを提供します。",
    url: "/icu-nutricare",
    internal: true,
    icon: Activity,
    language: "TypeScript",
    color: "bg-warm-sky dark:bg-blue-950/30",
  },
  {
    name: "Pediatric Learning",
    repo: "pediatric-exam-app",
    description:
      "小児科領域の学習を支援するアプリ。問題演習・解説・弱点分析で効率的な学習を実現します。",
    url: "https://kgraph57.github.io/pediatric-exam-app/",
    icon: GraduationCap,
    language: "JavaScript",
    color: "bg-warm-heather dark:bg-purple-950/30",
  },
];

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
            const cardClass = `group flex flex-col justify-between rounded-2xl p-8 transition-all duration-200 hover:scale-[1.02] ${service.color}`;
            const inner = (
              <>
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
              </>
            );

            return (
              <motion.div key={service.repo} variants={fadeInUp}>
                {service.internal ? (
                  <Link href={service.url} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
