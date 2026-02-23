"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LEVELS } from "@/lib/constants";

interface FilterOption {
  readonly id: string;
  readonly label: string;
  readonly count: number;
}

interface CourseFilterEnhancedProps {
  readonly categories: readonly FilterOption[];
  readonly selectedCategory: string | null;
  readonly onSelectCategory: (id: string | null) => void;
  readonly selectedLevel: string | null;
  readonly onSelectLevel: (id: string | null) => void;
  readonly totalCount: number;
  readonly levelCounts: Readonly<Record<string, number>>;
}

function FilterPill({
  label,
  isActive,
  onClick,
}: {
  readonly label: string;
  readonly isActive: boolean;
  readonly onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm transition-colors",
        isActive
          ? "bg-foreground text-background"
          : "bg-muted/50 text-muted-foreground hover:bg-muted",
      )}
    >
      {label}
    </motion.button>
  );
}

export function CourseFilterEnhanced({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedLevel,
  onSelectLevel,
  totalCount,
  levelCounts,
}: CourseFilterEnhancedProps) {
  return (
    <div className="mb-8 space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          カテゴリ
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label={`すべて (${totalCount})`}
            isActive={selectedCategory === null}
            onClick={() => onSelectCategory(null)}
          />
          {categories.map((cat) => (
            <FilterPill
              key={cat.id}
              label={`${cat.label} (${cat.count})`}
              isActive={selectedCategory === cat.id}
              onClick={() => onSelectCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          レベル
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="すべて"
            isActive={selectedLevel === null}
            onClick={() => onSelectLevel(null)}
          />
          {LEVELS.map((level) => (
            <FilterPill
              key={level.id}
              label={`${level.label} (${levelCounts[level.id] ?? 0})`}
              isActive={selectedLevel === level.id}
              onClick={() => onSelectLevel(level.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
