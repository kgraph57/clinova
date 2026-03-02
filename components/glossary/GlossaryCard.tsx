"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, LEVELS } from "@/lib/constants";
import type { GlossaryTerm } from "@/lib/glossary";

interface GlossaryCardProps {
  readonly term: GlossaryTerm;
  readonly allTerms: readonly GlossaryTerm[];
}

export function GlossaryCard({ term, allTerms }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const category = CATEGORIES.find((c) => c.id === term.category);
  const level = LEVELS.find((l) => l.id === term.difficulty);
  const related = term.relatedTerms
    .map((id) => allTerms.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <div
      id={term.id}
      className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-medium leading-snug">{term.term}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{term.termEn}</p>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={expanded ? "折りたたむ" : "展開する"}
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {category && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] ${category.bgColor} ${category.color} ${category.darkBgColor}`}
          >
            {category.label}
          </span>
        )}
        {level && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] ${level.bgColor} ${level.color}`}
          >
            {level.label}
          </span>
        )}
      </div>

      <p
        className={`mt-3 text-sm leading-relaxed text-muted-foreground ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {term.definition}
      </p>

      {expanded && related.length > 0 && (
        <div className="mt-3 border-t pt-3">
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            関連用語
          </p>
          <div className="flex flex-wrap gap-1.5">
            {related.map((r) => (
              <a
                key={r!.id}
                href={`#${r!.id}`}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs transition-colors hover:bg-muted/80"
              >
                {r!.term}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
