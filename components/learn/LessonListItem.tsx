"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, ArrowRight } from "lucide-react"
import { fadeInUp } from "@/lib/animations"
import type { LessonMetadata } from "@/lib/courses"

interface LessonListItemProps {
  courseId: string
  lesson: LessonMetadata
}

export function LessonListItem({ courseId, lesson }: LessonListItemProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/learn/${courseId}/${lesson.slug}`}
        className="group flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-muted/50"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
          {lesson.order}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium group-hover:underline group-hover:underline-offset-4">
            {lesson.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {lesson.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {lesson.estimatedMinutes}分
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  )
}
