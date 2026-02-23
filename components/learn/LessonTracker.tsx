"use client";

import { useEffect } from "react";
import { useProgress } from "@/components/learn/ProgressProvider";

interface LessonTrackerProps {
  readonly courseId: string;
  readonly lessonSlug: string;
}

export function LessonTracker({ courseId, lessonSlug }: LessonTrackerProps) {
  const { updateLastVisited } = useProgress();

  useEffect(() => {
    updateLastVisited(courseId, lessonSlug);
  }, [courseId, lessonSlug, updateLastVisited]);

  return null;
}
