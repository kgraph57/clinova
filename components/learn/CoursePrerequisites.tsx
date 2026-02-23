import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { CourseMetadata } from "@/lib/courses";
import { LevelBadge } from "./LevelBadge";

interface CoursePrerequisitesProps {
  readonly prerequisites: readonly CourseMetadata[];
}

export function CoursePrerequisites({
  prerequisites,
}: CoursePrerequisitesProps) {
  if (prerequisites.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="text-sm font-semibold tracking-wide">前提コース</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        先にこれらのコースを受講することを推奨します
      </p>
      <div className="mt-4 space-y-2">
        {prerequisites.map((course) => (
          <Link
            key={course.courseId}
            href={`/learn/${course.courseId}`}
            className="group flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors hover:bg-muted/50"
          >
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <span className="text-sm font-medium group-hover:underline group-hover:underline-offset-4">
                {course.title}
              </span>
            </div>
            <LevelBadge level={course.level} />
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
