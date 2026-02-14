"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { containerVariants, fadeInUp } from "@/lib/animations"
import { CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CategoryOverviewProps {
  counts: Record<string, number>
}

export function CategoryOverview({ counts }: CategoryOverviewProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            カテゴリから探す
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            目的に合わせてナレッジを体系的にアクセス
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const count = counts[cat.id] ?? 0
            return (
              <motion.div key={cat.id} variants={fadeInUp}>
                <Link
                  href={`/knowledge?category=${cat.id}`}
                  className={cn(
                    "group flex flex-col items-center rounded-xl border p-6 text-center transition-all",
                    "hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md",
                    cat.bgColor,
                    cat.darkBgColor,
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg",
                      "bg-white/80 dark:bg-white/10",
                    )}
                  >
                    <Icon className={cn("h-6 w-6", cat.color)} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{cat.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {count} 件
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
