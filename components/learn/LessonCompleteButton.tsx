"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/learn/ProgressProvider";

interface LessonCompleteButtonProps {
  readonly courseId: string;
  readonly lessonSlug: string;
}

export function LessonCompleteButton({
  courseId,
  lessonSlug,
}: LessonCompleteButtonProps) {
  const { isComplete, toggleComplete } = useProgress();
  const completed = isComplete(courseId, lessonSlug);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-10"
    >
      <button
        type="button"
        onClick={() => toggleComplete(courseId, lessonSlug)}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed p-6 text-sm font-medium transition-colors",
          completed
            ? "border-emerald-300 bg-emerald-50/50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
            : "hover:bg-muted/50",
        )}
      >
        {completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
        {completed ? "完了しました" : "このレッスンを完了としてマーク"}
      </button>
    </motion.div>
  );
}
