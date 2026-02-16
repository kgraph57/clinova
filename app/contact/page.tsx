"use client";

import { useState } from "react";
import { Send, Mail, Mic, PenTool, BookOpen, GraduationCap, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const REQUEST_TYPES = [
  { id: "lecture", icon: Mic, label: "講演・セミナー" },
  { id: "writing", icon: PenTool, label: "執筆・連載" },
  { id: "supervision", icon: BookOpen, label: "監修・コンサル" },
  { id: "training", icon: GraduationCap, label: "研修・ワークショップ" },
  { id: "other", icon: MessageSquare, label: "その他" },
] as const;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const typeLabel = REQUEST_TYPES.find((t) => t.id === selectedType)?.label ?? "";

    const mailtoBody = [
      typeLabel ? `【ご依頼種別】${typeLabel}` : "",
      `【お名前】${name}`,
      `【メールアドレス】${email}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoUrl;

    toast.success("メールアプリを起動しています。");
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-[520px] px-6 py-20 sm:py-28">
      <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
        お問い合わせ
      </h1>
      <p className="mt-3 text-muted-foreground">
        講演・執筆・監修・研修のご依頼、フィードバック、コラボレーションのご提案など、お気軽にどうぞ。
      </p>

      {/* Request type selector */}
      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">ご依頼の種類</p>
        <div className="flex flex-wrap gap-2">
          {REQUEST_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() =>
                setSelectedType(selectedType === type.id ? "" : type.id)
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
                selectedType === type.id
                  ? "border-foreground bg-foreground text-background"
                  : "hover:bg-muted"
              )}
            >
              <type.icon className="h-3.5 w-3.5" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
          {loading ? "送信中..." : "メールで送信する"}
        </button>
      </form>

      {/* Direct email fallback */}
      <div className="mt-10 rounded-xl border border-dashed p-5 text-center">
        <p className="text-sm text-muted-foreground">
          フォームがうまく動作しない場合は、
          直接メールでもお気軽にご連絡ください
        </p>
        <a
          href="mailto:your-email@example.com"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
        >
          <Mail className="h-4 w-4" />
          your-email@example.com
        </a>
      </div>
    </div>
  );
}
