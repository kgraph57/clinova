"use client"

import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUpBlur } from "@/lib/animations"

export function NewsletterSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          variants={fadeInUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent p-8 sm:p-12"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/[0.03] blur-3xl" />

          <div className="relative z-10 mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
              <Mail className="h-5 w-5 text-white" />
            </div>

            <h2 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
              最新情報をお届け
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              医療AIの最新ナレッジ、新しいプロンプト、ワークフローの更新情報をお届けします。
              お気軽にお問い合わせください。
            </p>

            <div className="mt-6">
              <Button asChild size="lg" className="gap-2 rounded-full px-6 shadow-lg shadow-primary/20">
                <a href="mailto:okaken0507@gmail.com?subject=Clinova%20メルマガ登録希望">
                  <Mail className="h-4 w-4" />
                  メールで登録
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p className="mt-3 text-[10px] text-muted-foreground">
              スパムは送りません。いつでも配信停止できます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
