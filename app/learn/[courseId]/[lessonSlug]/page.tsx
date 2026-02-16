import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllLessonParams,
  getCourseById,
  getLessonBySlug,
  getLessonNavigation,
} from "@/lib/courses";
import { LessonHeader } from "@/components/learn/LessonHeader";
import { LessonNavigation } from "@/components/learn/LessonNavigation";
import { ReadingProgress } from "@/components/article/ReadingProgress";

interface PageProps {
  params: Promise<{ courseId: string; lessonSlug: string }>;
}

export function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { courseId, lessonSlug } = await params;
  const lesson = getLessonBySlug(courseId, lessonSlug);
  if (!lesson) return {};

  const course = getCourseById(courseId);

  return {
    title: lesson.title,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} - ${course?.title ?? "Learn"}`,
      description: lesson.description,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { courseId, lessonSlug } = await params;
  const course = getCourseById(courseId);
  const lesson = getLessonBySlug(courseId, lessonSlug);

  if (!course || !lesson) {
    notFound();
  }

  const { prev, next } = getLessonNavigation(courseId, lessonSlug);

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
        <LessonHeader course={course} lesson={lesson} />

        <article className="prose">
          <MDXRemote source={lesson.content} />
        </article>

        <LessonNavigation courseId={courseId} prev={prev} next={next} />
      </div>
    </>
  );
}
