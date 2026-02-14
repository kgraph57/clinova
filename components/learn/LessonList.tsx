import type { LessonMetadata } from "@/lib/courses"
import { LessonListItem } from "./LessonListItem"

interface LessonListProps {
  courseId: string
  lessons: LessonMetadata[]
}

export function LessonList({ courseId, lessons }: LessonListProps) {
  return (
    <div className="space-y-1">
      {lessons.map((lesson) => (
        <LessonListItem
          key={lesson.slug}
          courseId={courseId}
          lesson={lesson}
        />
      ))}
    </div>
  )
}
