"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { CATEGORIES } from "@/lib/constants";
import { useProgress } from "@/components/learn/ProgressProvider";
import { LevelBadge } from "@/components/learn/LevelBadge";
import type { CourseMetadata } from "@/lib/courses";

interface CourseCardProps {
  course: CourseMetadata;
}

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseProgress } = useProgress();
  const progress = getCourseProgress(course.courseId, course.lessonCount);
  const categoryLabel =
    CATEGORIES.find((c) => c.id === course.category)?.label ?? course.category;

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/learn/${course.courseId}`}
        className="group flex h-full flex-col rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LevelBadge level={course.level} />
          <span>{categoryLabel}</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessonCount}レッスン
          </span>
        </div>

        <h3 className="mt-3 text-lg font-medium leading-snug group-hover:underline group-hover:underline-offset-4">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>

        <div className="mt-auto pt-6">
          {progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{progress}% 完了</span>
              </div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />約{course.estimatedTotalMinutes}
              分
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
