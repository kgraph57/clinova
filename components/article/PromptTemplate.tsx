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
    <div className="group relative my-6 rounded-lg border-l-4 border-primary bg-primary/5 p-4 dark:bg-primary/10">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          プロンプト
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100"
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
      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
