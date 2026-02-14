import type { Metadata } from "next"
import { getAllCourses } from "@/lib/courses"
import { LearnHero } from "@/components/learn/LearnHero"
import { CourseCard } from "@/components/learn/CourseCard"

export const metadata: Metadata = {
  title: "Learn - 医療AI学習コース",
  description:
    "AIの基礎から医療応用まで、体系的に学べるコースを用意しました。",
}

export default function LearnPage() {
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12 sm:py-20">
      <LearnHero />

      <div className="grid gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  )
}
