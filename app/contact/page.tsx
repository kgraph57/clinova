"use client"

import { useState } from "react"
import { Send, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("お問い合わせを送信しました。ありがとうございます。")
    ;(e.target as HTMLFormElement).reset()
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          お問い合わせ
        </h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          ご質問、フィードバック、コラボレーションのご提案など、お気軽にどうぞ。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-[13px] font-medium"
            >
              お名前
            </label>
            <Input id="name" name="name" required placeholder="山田 太郎" className="rounded-lg" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-medium"
            >
              メールアドレス
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-lg"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-[13px] font-medium"
          >
            件名
          </label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="お問い合わせ内容の概要"
            className="rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-[13px] font-medium"
          >
            メッセージ
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="詳細をお書きください"
            className="rounded-lg"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full gap-2 rounded-full shadow-lg shadow-primary/20 sm:w-auto sm:px-8">
          <Send className="h-4 w-4" />
          {loading ? "送信中..." : "送信する"}
        </Button>
      </form>

      <div className="mt-10 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <Mail className="h-3 w-3" />
        <span>直接メール:</span>
        <a href="mailto:okaken0507@gmail.com" className="text-primary hover:underline">
          okaken0507@gmail.com
        </a>
      </div>
    </div>
  )
}
