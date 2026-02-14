import Link from "next/link"
import { ChevronRight, Clock } from "lucide-react"
import type { CourseMetadata, LessonFull } from "@/lib/courses"
import { LessonProgress } from "./LessonProgress"

interface LessonHeaderProps {
  course: CourseMetadata
  lesson: LessonFull
}

export function LessonHeader({ course, lesson }: LessonHeaderProps) {
  return (
    <div className="mb-12">
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/learn" className="transition-colors hover:text-foreground">
          Learn
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/learn/${course.courseId}`}
          className="transition-colors hover:text-foreground"
        >
          {course.title}
        </Link>
      </nav>

      <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
        <LessonProgress
          current={lesson.order}
          total={course.lessonCount}
        />
        <span className="text-border">|</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {lesson.estimatedReadTime}分で読めます
        </span>
      </div>

      <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
        {lesson.title}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {lesson.description}
      </p>

      <div className="mt-10 border-b" />
    </div>
  )
}
