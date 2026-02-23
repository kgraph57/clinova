"use client";

import { motion } from "framer-motion";
import { containerVariants, fadeInUp } from "@/lib/animations";
import { LEARNING_PATHS } from "@/lib/learning-paths";
import { LearningPathCard } from "./LearningPathCard";

export function LearningPaths() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mt-12"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="font-serif text-xl tracking-tight sm:text-2xl">
          目的から選ぶ学習パス
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          あなたの役割・目標に合わせて、最適なコースの組み合わせをご提案します
        </p>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {LEARNING_PATHS.map((path) => (
          <LearningPathCard key={path.id} path={path} />
        ))}
      </div>
    </motion.section>
  );
}
