"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryOption {
  readonly id: string;
  readonly label: string;
  readonly count: number;
}

interface CourseFilterProps {
  readonly categories: readonly CategoryOption[];
  readonly selected: string | null;
  readonly onSelect: (id: string | null) => void;
  readonly totalCount: number;
}

export function CourseFilter({
  categories,
  selected,
  onSelect,
  totalCount,
}: CourseFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <FilterPill
        label={`すべて (${totalCount})`}
        isActive={selected === null}
        onClick={() => onSelect(null)}
      />
      {categories.map((cat) => (
        <FilterPill
          key={cat.id}
          label={`${cat.label} (${cat.count})`}
          isActive={selected === cat.id}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
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
