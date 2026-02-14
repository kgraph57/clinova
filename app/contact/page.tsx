"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("お問い合わせを送信しました。ありがとうございます。");
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-[520px] px-6 py-20 sm:py-28">
      <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
        お問い合わせ
      </h1>
      <p className="mt-3 text-muted-foreground">
        ご質問、フィードバック、コラボレーションのご提案など、お気軽にどうぞ。
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              お名前
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder="山田 太郎"
              className="rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
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
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
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

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {loading ? "送信中..." : "送信する"}
        </button>
      </form>
    </div>
  );
}
