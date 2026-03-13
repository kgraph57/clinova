"use client";

import { motion } from "framer-motion";
import { fadeInSlow, containerVariantsSlow } from "@/lib/animations";

interface MediaItem {
  name: string;
  role: string;
}

const MEDIA: MediaItem[] = [
  { name: "日経メディカル", role: "連載" },
  { name: "愛育病院", role: "小児科" },
  { name: "note", role: "メンバーシップ" },
  { name: "GitHub", role: "OSS" },
];

export function MediaLogosSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.p
            variants={fadeInSlow}
            className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground/40"
          >
            Featured in
          </motion.p>

          <motion.div
            variants={fadeInSlow}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16"
          >
            {MEDIA.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-1 text-muted-foreground/50 transition-colors duration-500 hover:text-muted-foreground"
              >
                <span className="text-lg font-serif tracking-tight">
                  {item.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  {item.role}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
