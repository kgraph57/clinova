"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import { fadeInUp } from "@/lib/animations"
import type { CourseMetadata } from "@/lib/courses"

interface CourseCardProps {
  course: CourseMetadata
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/learn/${course.courseId}`}
        className="group flex h-full flex-col rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{course.category}</span>
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

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            約{course.estimatedTotalMinutes}分
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  )
}
