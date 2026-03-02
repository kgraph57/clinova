"use client";

import { useState } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Globe,
  Award,
} from "lucide-react";
import type { AITool } from "./ToolComparisonContent";

interface ToolCardProps {
  readonly tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{tool.name}</h3>
          <p className="text-sm text-muted-foreground">{tool.vendor}</p>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`${tool.name}のサイトを開く`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tool.hipaaCompliant && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            HIPAA
          </span>
        )}
        {tool.japaneseSupport && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
            <Globe className="h-3 w-3" />
            日本語
          </span>
        )}
        {tool.medicalCertification && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
            <Award className="h-3 w-3" />
            認証済
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{tool.pricing}</p>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {expanded ? "閉じる" : "詳細を見る"}
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 border-t pt-3 text-sm">
          <div>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">
              強み
            </p>
            <ul className="mt-1 list-inside list-disc text-muted-foreground">
              {tool.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-rose-600 dark:text-rose-400">
              制限事項
            </p>
            <ul className="mt-1 list-inside list-disc text-muted-foreground">
              {tool.limitations.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">ユースケース</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {tool.useCases.map((u) => (
                <span
                  key={u}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
          {tool.medicalCertification && (
            <p className="text-xs text-muted-foreground">
              認証: {tool.medicalCertification}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            最終更新: {tool.lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
}
