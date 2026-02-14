"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { containerVariants, fadeInUp } from "@/lib/animations"
import { CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

const WARM_COLORS = [
  "bg-warm-sage",
  "bg-warm-sky",
  "bg-warm-heather",
  "bg-warm-oat",
  "bg-warm-cactus",
] as const

interface CategoryOverviewProps {
  counts: Record<string, number>
}

export function CategoryOverview({ counts }: CategoryOverviewProps) {
  return (
    <section className="border-t py-20 sm:py-28">
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
            const Icon = cat.icon
            const count = counts[cat.id] ?? 0
            return (
              <motion.div key={cat.id} variants={fadeInUp}>
                <Link
                  href={`/knowledge?category=${cat.id}`}
                  className={cn(
                    "group flex flex-col justify-between rounded-2xl p-8 transition-all duration-200 hover:scale-[1.02]",
                    WARM_COLORS[i % WARM_COLORS.length],
                    "dark:bg-muted",
                  )}
                >
                  <div>
                    <Icon className="h-6 w-6 text-foreground/70" />
                    <h3 className="mt-4 text-lg font-medium">{cat.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {count} 件のコンテンツ
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
