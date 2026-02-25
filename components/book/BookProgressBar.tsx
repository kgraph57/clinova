"use client";

import { useProgress } from "@/components/learn/ProgressProvider";

interface BookProgressBarProps {
  readonly totalChapters: number;
  readonly chapterSlugs: readonly string[];
}

export function BookProgressBar({
  totalChapters,
  chapterSlugs,
}: BookProgressBarProps) {
  const { isComplete } = useProgress();

  const completedCount = chapterSlugs.filter((slug) =>
    isComplete("book", slug),
  ).length;

  const percentage =
    totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  if (completedCount === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {completedCount} / {totalChapters} 章 読了
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
