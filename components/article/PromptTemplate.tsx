"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PromptTemplateProps {
  children: React.ReactNode;
}

export function PromptTemplate({ children }: PromptTemplateProps) {
  const [copied, setCopied] = useState(false);

  function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (typeof node === "object" && "props" in node) {
      return extractText(
        (node as React.ReactElement<{ children?: React.ReactNode }>).props
          .children,
      );
    }
    return "";
  }

  function handleCopy() {
    const text = extractText(children);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("プロンプトをコピーしました");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent">
      <div className="flex items-center justify-between border-b border-primary/10 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
          <Terminal className="h-3 w-3" />
          プロンプト
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 rounded-md text-[11px] opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-600" />
              コピー済み
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              コピー
            </>
          )}
        </Button>
      </div>
      <div className="whitespace-pre-wrap px-4 py-4 text-[0.84rem] leading-[1.85]">
        {children}
      </div>
    </div>
  );
}
