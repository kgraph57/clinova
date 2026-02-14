"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    // Simulate submission for MVP
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("お問い合わせを送信しました。ありがとうございます。")
    ;(e.target as HTMLFormElement).reset()
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        お問い合わせ
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        ご質問、フィードバック、コラボレーションのご提案など、お気軽にどうぞ。
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium"
            >
              お名前
            </label>
            <Input id="name" name="name" required placeholder="山田 太郎" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              メールアドレス
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-sm font-medium"
          >
            件名
          </label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="お問い合わせ内容の概要"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium"
          >
            メッセージ
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="詳細をお書きください"
          />
        </div>

        <Button type="submit" disabled={loading} className="gap-2">
          <Send className="h-4 w-4" />
          {loading ? "送信中..." : "送信する"}
        </Button>
      </form>
    </div>
  )
}
