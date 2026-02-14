"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export function NewsletterSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl bg-warm-oat p-10 dark:bg-muted sm:p-16"
        >
          <div className="mx-auto max-w-lg text-center">
            <Mail className="mx-auto h-6 w-6 text-foreground/60" />

            <h2 className="mt-5 font-serif text-3xl tracking-tight sm:text-4xl">
              最新情報をお届け
            </h2>
            <p className="mt-3 text-muted-foreground">
              医療AIの最新ナレッジ、新しいプロンプト、ワークフローの更新情報をお届けします。
            </p>

            <div className="mt-8">
              <a
                href="mailto:okaken0507@gmail.com?subject=Hoshizu%20メルマガ登録希望"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                メールで登録
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
