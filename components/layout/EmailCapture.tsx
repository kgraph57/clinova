"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    // TODO: Replace with actual email service (ConvertKit, Substack, etc.)
    // For now, open mailto with a subscription request
    const subject = encodeURIComponent("Hoshizu ニュースレター登録希望");
    const body = encodeURIComponent(
      `以下のメールアドレスでニュースレターに登録を希望します。\n\n${email}`,
    );
    window.open(
      `mailto:contact@hoshizu.dev?subject=${subject}&body=${body}`,
      "_blank",
    );
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl bg-muted/50 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold">
            医療AI の最新情報を受け取る
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            注目論文・プロンプト・規制動向を週1回お届け。配信停止はいつでも可能です。
          </p>

          {submitted ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4" />
              送信しました。ありがとうございます。
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex gap-2"
            >
              <Input
                type="email"
                required
                placeholder="you@hospital.jp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 flex-1 rounded-lg text-sm"
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-80"
              >
                登録
                <ArrowRight className="h-3 w-3" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
