import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { LessonNavItem } from "@/lib/courses"

interface LessonNavigationProps {
  courseId: string
  prev: LessonNavItem | null
  next: LessonNavItem | null
}

export function LessonNavigation({ courseId, prev, next }: LessonNavigationProps) {
  return (
    <nav className="mt-16 flex items-stretch gap-4 border-t pt-8">
      {prev ? (
        <Link
          href={`/learn/${courseId}/${prev.slug}`}
          className="group flex flex-1 flex-col rounded-xl border p-4 transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            前のレッスン
          </span>
          <span className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/learn/${courseId}/${next.slug}`}
          className="group flex flex-1 flex-col items-end rounded-xl border p-4 text-right transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            次のレッスン
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            {next.title}
          </span>
        </Link>
      ) : (
        <Link
          href={`/learn/${courseId}`}
          className="group flex flex-1 flex-col items-end rounded-xl border p-4 text-right transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            コースに戻る
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            コース概要
          </span>
        </Link>
      )}
    </nav>
  )
}
