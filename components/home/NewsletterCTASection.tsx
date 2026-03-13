"use client";

import { motion } from "framer-motion";
import { fadeInSlow, containerVariantsSlow } from "@/lib/animations";
import { EnvelopeSimple, ArrowRight } from "@phosphor-icons/react";

export function NewsletterCTASection() {
  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariantsSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative overflow-hidden rounded-3xl border border-border/50 px-8 py-20 sm:px-16 sm:py-24"
        >
          {/* Subtle gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-gold/[0.03] via-transparent to-purple-500/[0.03]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* Copy */}
            <div>
              <motion.p
                variants={fadeInSlow}
                className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/50"
              >
                Newsletter
              </motion.p>
              <motion.h2
                variants={fadeInSlow}
                className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
              >
                おかもん先生の
                <br className="hidden sm:block" />
                AI医療通信
              </motion.h2>
              <motion.p
                variants={fadeInSlow}
                className="mt-5 max-w-lg leading-[1.8] text-muted-foreground"
              >
                臨床で使えるAI活用術、最新論文の解説、開発裏話を
                週1回お届け。医療者のためのAIリテラシーを一緒に育てましょう。
              </motion.p>

              {/* Highlights */}
              <motion.ul
                variants={fadeInSlow}
                className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground/70"
              >
                {["週1回配信", "臨床で使えるAIネタ", "無料"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-gold" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* CTA */}
            <motion.div variants={fadeInSlow} className="flex flex-col gap-4">
              <a
                href="https://note.com/kgraph_/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-foreground bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
              >
                <EnvelopeSimple className="h-4 w-4" />
                メルマガに登録する
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <p className="text-center text-[11px] text-muted-foreground/40">
                noteメンバーシップにて配信中
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
