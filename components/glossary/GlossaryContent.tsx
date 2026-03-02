"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { GlossaryCard } from "./GlossaryCard";
import { CATEGORIES, LEVELS } from "@/lib/constants";
import type { GlossaryTerm } from "@/lib/glossary";

interface GlossaryContentProps {
  readonly terms: readonly GlossaryTerm[];
}

export function GlossaryContent({ terms }: GlossaryContentProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return terms.filter((t) => {
      const matchesQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.termEn.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      const matchesCategory =
        !categoryFilter || t.category === categoryFilter;
      const matchesLevel = !levelFilter || t.difficulty === levelFilter;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [terms, query, categoryFilter, levelFilter]);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="用語を検索..."
          className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
        />
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
        {CATEGORIES.map((cat) => (
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

      <div className="mt-2 flex flex-wrap gap-2">
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() =>
              setLevelFilter(levelFilter === lvl.id ? null : lvl.id)
            }
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              levelFilter === lvl.id
                ? `${lvl.bgColor} ${lvl.color}`
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length}件の用語
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {filtered.map((term) => (
          <GlossaryCard key={term.id} term={term} allTerms={terms} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          該当する用語が見つかりませんでした。
        </p>
      )}
    </div>
  );
}
