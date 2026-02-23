"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useProgress } from "@/components/learn/ProgressProvider";
import { CompletionCertificate } from "@/components/learn/CompletionCertificate";

interface CourseCompletionBannerProps {
  readonly courseId: string;
  readonly courseTitle: string;
  readonly lessonCount: number;
}

export function CourseCompletionBanner({
  courseId,
  courseTitle,
  lessonCount,
}: CourseCompletionBannerProps) {
  const { getCourseProgress } = useProgress();
  const [showCert, setShowCert] = useState(false);

  const progress = getCourseProgress(courseId, lessonCount);
  if (progress < 100) return null;

  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-8 rounded-2xl bg-[var(--color-warm-oat)] p-6 dark:bg-muted"
      >
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <Award className="h-8 w-8 shrink-0 text-amber-500" />
          <div className="flex-1">
            <p className="font-semibold">
              おめでとうございます！このコースを完了しました
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              修了証を発行して、学習成果を記録しましょう
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCert(true)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            <Award className="h-4 w-4" />
            修了証を発行
          </button>
        </div>
      </motion.div>

      {showCert && (
        <CompletionCertificate
          courseId={courseId}
          courseTitle={courseTitle}
          onClose={() => setShowCert(false)}
        />
      )}
    </>
  );
}
