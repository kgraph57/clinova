"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp } from "@/lib/animations";

interface CourseOutcomesProps {
  readonly outcomes: readonly string[];
}

export function CourseOutcomes({ outcomes }: CourseOutcomesProps) {
  if (outcomes.length === 0) return null;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 rounded-2xl border p-6"
    >
      <h2 className="text-sm font-semibold tracking-wide">
        このコースで身につくこと
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {outcomes.map((outcome) => (
          <motion.li
            key={outcome}
            variants={fadeInUp}
            className="flex items-start gap-2"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span className="text-sm leading-relaxed">{outcome}</span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
