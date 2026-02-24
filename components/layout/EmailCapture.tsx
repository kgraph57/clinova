"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

/**
 * Formspree フォームID
 * ---------------------------------------------------------
 * 以下の FORMSPREE_ID を実際のフォームIDに置き換えてください。
 * 1. https://formspree.io にログイン
 * 2. 新しいフォームを作成
 * 3. フォームIDをコピーして以下に貼り付け
 *
 * 空文字列のままだと mailto: フォールバックが使われます。
 * ---------------------------------------------------------
 */
const FORMSPREE_ID = "";
const FORMSPREE_URL = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleFormspreeSubmit(emailAddress: string): Promise<void> {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: emailAddress,
        _subject: "Hoshizu Newsletter Registration",
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        errors?: Array<{ message: string }>;
      } | null;
      const message =
        data?.errors?.[0]?.message ?? "送信に失敗しました。";
      throw new Error(message);
    }
  }

  function handleMailtoFallback(emailAddress: string): void {
    const subject = encodeURIComponent("Hoshizu Newsletter Registration");
    const body = encodeURIComponent(
      `以下のメールアドレスでニュースレターに登録を希望します。\n\n${emailAddress}`,
    );
    window.open(
      `mailto:contact@hoshizu.dev?subject=${subject}&body=${body}`,
      "_blank",
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    // Formspree が未設定の場合は mailto: フォールバック
    if (!FORMSPREE_URL) {
      handleMailtoFallback(email);
      setSubmitState("success");
      toast.success("メールクライアントを開きました。送信をお願いします。");
      return;
    }

    setSubmitState("submitting");

    try {
      await handleFormspreeSubmit(email);
      setSubmitState("success");
      setEmail("");
      toast.success("登録ありがとうございます。次回の配信をお楽しみに。");
    } catch (error) {
      setSubmitState("error");
      const message =
        error instanceof Error ? error.message : "送信に失敗しました。";
      toast.error(message);
    }
  }

  function handleRetry() {
    setSubmitState("idle");
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

          {submitState === "success" ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4" />
              登録が完了しました。ありがとうございます。
            </div>
          ) : submitState === "error" ? (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                送信に失敗しました。もう一度お試しください。
              </div>
              <button
                type="button"
                onClick={handleRetry}
                className="text-xs font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
              >
                再試行
              </button>
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
                disabled={submitState === "submitting"}
                className="h-9 flex-1 rounded-lg text-sm"
              />
              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {submitState === "submitting" ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    送信中
                  </>
                ) : (
                  <>
                    登録
                    <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
