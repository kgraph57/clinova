"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
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
    <div className="group relative my-8 rounded-2xl bg-muted/70 dark:bg-muted">
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          プロンプト
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 rounded-full text-xs opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
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
      <div className="whitespace-pre-wrap px-6 pb-6 pt-3 text-sm leading-[1.8]">
        {children}
      </div>
    </div>
  );
}
