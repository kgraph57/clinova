"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fadeInUpBlur } from "@/lib/animations"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        toast.success("登録ありがとうございます！")
        setEmail("")
      } else {
        const data = await res.json()
        toast.error(data.error ?? "登録に失敗しました")
      }
    } catch {
      toast.error("ネットワークエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

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
              医療AIの最新ナレッジ、新しいプロンプト、ワークフローの更新情報をメールでお届けします。
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex gap-2"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">登録</span>
              </Button>
            </form>

            <p className="mt-3 text-[10px] text-muted-foreground">
              スパムは送りません。いつでも配信停止できます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
