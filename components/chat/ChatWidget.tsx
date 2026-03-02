"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  readonly role: "user" | "assistant";
  readonly content: string;
}

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!CHAT_API_URL) {
        // Fallback: search-index based local search
        const res = await fetch(
          `${process.env.NODE_ENV === "production" ? "/hoshizu" : ""}/search-index.json`,
        );
        const index = (await res.json()) as Array<{
          title: string;
          description: string;
          href: string;
          tags: string[];
        }>;

        const q = trimmed.toLowerCase();
        const matches = index
          .filter(
            (item) =>
              item.title.toLowerCase().includes(q) ||
              item.description?.toLowerCase().includes(q) ||
              item.tags?.some((t: string) => t.toLowerCase().includes(q)),
          )
          .slice(0, 5);

        const reply =
          matches.length > 0
            ? `関連するコンテンツが見つかりました:\n\n${matches.map((m) => `- [${m.title}](${m.href})`).join("\n")}`
            : "申し訳ありません、該当するコンテンツが見つかりませんでした。別のキーワードで試してみてください。";

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } else {
        const res = await fetch(CHAT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmed }),
        });
        const data = (await res.json()) as { reply: string };
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "エラーが発生しました。しばらく経ってから再度お試しください。",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105"
        aria-label="チャットを開く"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[360px] flex-col rounded-2xl border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <p className="text-sm font-medium">Hoshizu AI</p>
          <p className="text-xs text-muted-foreground">
            コンテンツを検索・質問
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="チャットを閉じる"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            <p>
              医療AIに関する質問や
              <br />
              コンテンツの検索ができます
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-muted"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-3 text-left">
            <div className="inline-block rounded-2xl bg-muted px-4 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力..."
            className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-xl"
            disabled={loading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
