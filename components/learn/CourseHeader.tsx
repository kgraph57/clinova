import Link from "next/link";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { LevelBadge } from "./LevelBadge";
import type { CourseMetadata } from "@/lib/courses";

interface CourseHeaderProps {
  course: CourseMetadata;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const categoryLabel =
    CATEGORIES.find((c) => c.id === course.category)?.label ?? course.category;

  return (
    <div className="mb-12">
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href="/learn"
          className="transition-colors hover:text-foreground"
        >
          Learn
        </Link>
      </nav>

      <div className="mb-3 flex items-center gap-2">
        <LevelBadge level={course.level} size="md" />
        <span className="text-sm text-muted-foreground">{categoryLabel}</span>
      </div>

      <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
        {course.title}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {course.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          {course.lessonCount}レッスン
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          約{course.estimatedTotalMinutes}分
        </span>
      </div>

      <div className="mt-10 border-b" />
    </div>
  );
}
