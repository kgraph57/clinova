"use client"

import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUpBlur } from "@/lib/animations"

export function NewsletterSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={fadeInUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-teal-50 to-cyan-50/50 p-8 dark:from-teal-950/30 dark:to-cyan-950/20 sm:p-12"
        >
          <div className="relative z-10 mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight">
              最新情報をお届け
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              医療AIの最新ナレッジ、新しいプロンプト、ワークフローの更新情報をお届けします。
              お気軽にお問い合わせください。
            </p>

            <div className="mt-6">
              <Button asChild size="lg" className="gap-2">
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
