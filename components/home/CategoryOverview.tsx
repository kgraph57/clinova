"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp } from "@/lib/animations";
import { CATEGORIES } from "@/lib/constants";
import { ICON_MAP } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";
import { TiltCard } from "@/components/effects/TiltCard";

const WARM_COLORS = [
  "bg-warm-sage",
  "bg-warm-sky",
  "bg-warm-heather",
  "bg-warm-oat",
  "bg-warm-cactus",
] as const;

interface CategoryOverviewProps {
  counts: Record<string, number>;
}

export function CategoryOverview({ counts }: CategoryOverviewProps) {
  return (
    <section className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          カテゴリから探す
        </h2>
        <p className="mt-3 text-muted-foreground">
          5つの領域で医療AIナレッジを体系的に整理
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CATEGORIES.map((cat, i) => {
            const Icon = ICON_MAP[cat.iconName];
            const count = counts[cat.id] ?? 0;
            return (
              <motion.div key={cat.id} variants={fadeInUp}>
                <TiltCard tiltDeg={4} glare>
                  <Link
                    href={`/knowledge?category=${cat.id}`}
                    className={cn(
                      "group flex flex-col justify-between rounded-2xl p-8 transition-all duration-300",
                      WARM_COLORS[i % WARM_COLORS.length],
                      "dark:bg-muted",
                    )}
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6 text-foreground/70" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">{cat.label}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {count} 件のコンテンツ
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      詳しく見る
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
