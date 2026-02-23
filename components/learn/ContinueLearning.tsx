"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useProgress } from "@/components/learn/ProgressProvider";
import type { CourseMetadata } from "@/lib/courses";

interface ContinueLearningProps {
  readonly courses: readonly CourseMetadata[];
}

export function ContinueLearning({ courses }: ContinueLearningProps) {
  const { lastVisited } = useProgress();

  if (!lastVisited) return null;

  const course = courses.find((c) => c.courseId === lastVisited.courseId);
  if (!course) return null;

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Link
        href={`/learn/${lastVisited.courseId}/${lastVisited.lessonSlug}`}
        className="group mt-10 flex items-center gap-4 rounded-2xl border p-5 transition-colors hover:bg-muted/50"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
          <Play className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">続きから学ぶ</p>
          <p className="mt-0.5 text-sm font-medium">{course.title}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
}
