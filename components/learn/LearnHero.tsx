"use client"

import { motion } from "framer-motion"
import { fadeInUp, containerVariants } from "@/lib/animations"

export function LearnHero() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-16"
    >
      <motion.p variants={fadeInUp} className="text-sm text-muted-foreground">
        Learn
      </motion.p>
      <motion.h1
        variants={fadeInUp}
        className="mt-2 font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl"
      >
        医療AI学習コース
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground"
      >
        AIの基礎から医療応用まで、体系的に学べるコースを用意しました。
        順番に進めることで、医療現場でのAI活用に必要な知識が身につきます。
      </motion.p>
    </motion.section>
  )
}
