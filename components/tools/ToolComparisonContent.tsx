"use client";

import { useMemo, useState } from "react";
import { Search, LayoutGrid, Table2 } from "lucide-react";
import { ToolCard } from "./ToolCard";
import { ToolComparisonTable } from "./ToolComparisonTable";

export interface AITool {
  readonly id: string;
  readonly name: string;
  readonly vendor: string;
  readonly category: string;
  readonly pricing: string;
  readonly hipaaCompliant: boolean;
  readonly japaneseSupport: boolean;
  readonly medicalCertification: string | null;
  readonly strengths: readonly string[];
  readonly limitations: readonly string[];
  readonly useCases: readonly string[];
  readonly url: string;
  readonly lastUpdated: string;
}

const TOOL_CATEGORIES = [
  { id: "general-llm", label: "汎用LLM" },
  { id: "diagnostic", label: "診断支援" },
  { id: "imaging", label: "画像AI" },
  { id: "research", label: "研究支援" },
] as const;

interface ToolComparisonContentProps {
  readonly tools: readonly AITool[];
}

export function ToolComparisonContent({ tools }: ToolComparisonContentProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tools.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.vendor.toLowerCase().includes(q);
      const matchesCategory =
        !categoryFilter || t.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [tools, query, categoryFilter]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ツール名で検索..."
            className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
        <div className="hidden gap-1 sm:flex">
          <button
            onClick={() => setViewMode("card")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "card"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="カード表示"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "table"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="テーブル表示"
          >
            <Table2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`rounded-full px-3 py-1 text-xs transition-colors ${
            !categoryFilter
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          すべて
        </button>
        {TOOL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setCategoryFilter(categoryFilter === cat.id ? null : cat.id)
            }
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              categoryFilter === cat.id
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length}件のツール
      </p>

      {viewMode === "card" ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <ToolComparisonTable tools={filtered} />
        </div>
      )}

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          該当するツールが見つかりませんでした。
        </p>
      )}
    </div>
  );
}
