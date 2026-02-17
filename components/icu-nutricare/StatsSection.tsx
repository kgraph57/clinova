"use client";

import { motion } from "framer-motion";
import { containerVariants, fadeInUp } from "@/lib/animations";

const STATS = [
  { value: "379", label: "栄養製品", unit: "品" },
  { value: "97", label: "栄養成分", unit: "項目" },
  { value: "11", label: "薬剤相互作用ルール", unit: "種" },
  { value: "9", label: "テンプレート", unit: "種" },
] as const;

export function StatsSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <p className="font-serif text-4xl tracking-tight sm:text-5xl">
                {stat.value}
                <span className="ml-1 text-lg text-muted-foreground">
                  {stat.unit}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
