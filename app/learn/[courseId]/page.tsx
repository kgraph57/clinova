import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getAllCourseSlugs,
  getCourseById,
  getLessonsForCourse,
} from "@/lib/courses"
import { CourseHeader } from "@/components/learn/CourseHeader"
import { LessonList } from "@/components/learn/LessonList"

interface PageProps {
  params: Promise<{ courseId: string }>
}

export function generateStaticParams() {
  return getAllCourseSlugs().map((courseId) => ({ courseId }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) return {}

  return {
    title: course.title,
    description: course.description,
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { courseId } = await params
  const course = getCourseById(courseId)

  if (!course) {
    notFound()
  }

  const lessons = getLessonsForCourse(courseId)

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
      <CourseHeader course={course} />
      <LessonList courseId={courseId} lessons={lessons} />
    </div>
  )
}
