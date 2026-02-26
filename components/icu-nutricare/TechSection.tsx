"use client";

import { motion } from "framer-motion";
import { containerVariants, fadeInUp } from "@/lib/animations";

const STACK = [
  { category: "フレームワーク", items: ["React 18", "TypeScript 5"] },
  { category: "ビルド & ルーティング", items: ["Vite 4", "React Router 7"] },
  { category: "可視化", items: ["Recharts 3", "Lucide React"] },
  { category: "スタイリング", items: ["CSS Modules", "CSS Custom Properties"] },
  { category: "バックエンド", items: ["Supabase (任意)", "localStorage"] },
  { category: "デプロイ", items: ["GitHub Pages", "GitHub Actions"] },
] as const;

export function TechSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl tracking-tight sm:text-4xl"
          >
            技術スタック
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-muted-foreground"
          >
            モダンなフロントエンド技術で構築。Supabaseなしでも完全動作
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {STACK.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
