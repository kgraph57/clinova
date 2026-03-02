"use client";

import { useCallback, useMemo, useState } from "react";
import { Copy, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { extractVariables, fillTemplate } from "@/lib/prompt-utils";

interface PromptPlaygroundProps {
  readonly children: React.ReactNode;
}

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

export function PromptPlayground({ children }: PromptPlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const rawText = useMemo(() => extractText(children), [children]);
  const variables = useMemo(() => extractVariables(rawText), [rawText]);
  const filledText = useMemo(
    () => fillTemplate(rawText, values),
    [rawText, values],
  );
  const allFilled = variables.every((v) => values[v]?.trim());

  const handleChange = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(filledText).then(() => {
      setCopied(true);
      toast.success("プロンプトをコピーしました");
      setTimeout(() => setCopied(false), 2000);
    });
  }, [filledText]);

  if (variables.length === 0) {
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

  return (
    <div className="my-8 rounded-2xl border bg-card">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">プロンプト プレイグラウンド</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 rounded-full text-xs"
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

      <div className="grid gap-3 border-b px-6 py-5">
        <p className="text-xs font-medium text-muted-foreground">
          変数を入力してカスタマイズ
        </p>
        {variables.map((v) => (
          <div key={v} className="flex items-center gap-3">
            <label
              htmlFor={`var-${v}`}
              className="min-w-[120px] text-sm font-medium"
            >
              {v}
            </label>
            <input
              id={`var-${v}`}
              type="text"
              value={values[v] ?? ""}
              onChange={(e) => handleChange(v, e.target.value)}
              placeholder={`${v}を入力...`}
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        ))}
      </div>

      <div className="px-6 py-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {showPreview || allFilled ? "プレビュー" : "テンプレート"}
          </span>
          {variables.length > 0 && (
            <button
              onClick={() => setShowPreview((p) => !p)}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPreview ? "テンプレート表示" : "プレビュー表示"}
            </button>
          )}
        </div>
        <div className="whitespace-pre-wrap rounded-xl bg-muted/70 px-5 py-4 text-sm leading-[1.8] dark:bg-muted">
          {showPreview || allFilled ? filledText : rawText}
        </div>
      </div>
    </div>
  );
}
