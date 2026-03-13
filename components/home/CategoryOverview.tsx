"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariantsSlow, fadeInSlow } from "@/lib/animations";
import { CATEGORIES } from "@/lib/constants";
import { ICON_MAP } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";

const WARM_COLORS = [
  "bg-warm-sage",
  "bg-warm-sky",
  "bg-warm-heather",
  "bg-warm-oat",
  "bg-warm-cactus",
] as const;

const GLOW_COLORS = [
  "rgba(74, 124, 111, 0.2)",
  "rgba(100, 140, 190, 0.2)",
  "rgba(140, 100, 160, 0.2)",
  "rgba(180, 160, 120, 0.2)",
  "rgba(100, 150, 120, 0.2)",
] as const;

interface CategoryOverviewProps {
  counts: Record<string, number>;
}

function CategoryCard({
  cat,
  count,
  index,
}: {
  cat: (typeof CATEGORIES)[number];
  count: number;
  index: number;
}) {
  const Icon = ICON_MAP[cat.iconName];
  const ref = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div variants={fadeInSlow}>
      <Link
        ref={ref}
        href={`/knowledge?category=${cat.id}`}
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:shadow-md",
          WARM_COLORS[index % WARM_COLORS.length],
          "dark:bg-muted/50 dark:hover:bg-muted",
        )}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cursor-tracking glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: hovered
              ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${GLOW_COLORS[index % GLOW_COLORS.length]}, transparent 40%)`
              : "none",
          }}
        />

        <div className="relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Icon className="h-6 w-6 text-foreground/70" />
          </div>
          <h3 className="mt-5 text-lg font-medium tracking-tight">
            {cat.label}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground/70">
            {count} 件のコンテンツ
          </p>
        </div>
        <div className="relative z-10 mt-8 flex items-center gap-1.5 text-sm font-medium text-foreground/50 transition-all duration-500 group-hover:text-foreground">
          詳しく見る
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryOverview({ counts }: CategoryOverviewProps) {
  return (
    <section className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={fadeInSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
            Browse by topic
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Categories
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              count={counts[cat.id] ?? 0}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
