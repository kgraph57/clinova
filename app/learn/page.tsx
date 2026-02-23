import type { Metadata } from "next";
import { getAllCourses } from "@/lib/courses";
import { LearnHero } from "@/components/learn/LearnHero";
import { LearningPaths } from "@/components/learn/LearningPaths";
import { ContinueLearning } from "@/components/learn/ContinueLearning";
import { CourseListWithFilter } from "@/components/learn/CourseListWithFilter";

export const metadata: Metadata = {
  title: "Learn - 医療AI学習コース",
  description: "AIの基礎から医療応用まで、体系的に学べるコースを用意しました。",
};

export default function LearnPage() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12 sm:py-20">
      <LearnHero />
      <ContinueLearning courses={courses} />
      <LearningPaths />

      <h2 className="mb-8 mt-16 font-serif text-xl tracking-tight sm:text-2xl">
        全コース一覧
      </h2>
      <CourseListWithFilter courses={courses} />
    </div>
  );
}
