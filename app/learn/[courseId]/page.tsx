import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCourseSlugs,
  getCourseById,
  getLessonsForCourse,
  getPrerequisiteCourses,
} from "@/lib/courses";
import { SITE_CONFIG } from "@/lib/constants";
import { CourseHeader } from "@/components/learn/CourseHeader";
import { CourseOutcomes } from "@/components/learn/CourseOutcomes";
import { CourseTargetAudience } from "@/components/learn/CourseTargetAudience";
import { CoursePrerequisites } from "@/components/learn/CoursePrerequisites";
import { CourseSkillTags } from "@/components/learn/CourseSkillTags";
import { LessonList } from "@/components/learn/LessonList";
import { CourseCompletionBanner } from "@/components/learn/CourseCompletionBanner";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return getAllCourseSlugs().map((courseId) => ({ courseId }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) return {};

  return {
    title: course.title,
    description: course.description,
    alternates: {
      canonical: `/learn/${courseId}`,
    },
    openGraph: {
      title: `${course.title} | Hoshizu`,
      description: course.description,
      type: "website",
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const lessons = getLessonsForCourse(courseId);
  const prerequisiteCourses = getPrerequisiteCourses(courseId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    numberOfLessons: course.lessonCount,
    timeRequired: `PT${course.estimatedTotalMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "ja",
    educationalLevel: course.level,
    teaches: course.learningOutcomes,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
        <CourseCompletionBanner
          courseId={courseId}
          courseTitle={course.title}
          lessonCount={course.lessonCount}
        />
        <CourseHeader course={course} />
        <CourseOutcomes outcomes={course.learningOutcomes} />
        <CourseTargetAudience targetAudience={course.targetAudience} />
        <CoursePrerequisites prerequisites={prerequisiteCourses} />
        <CourseSkillTags skills={course.skills} />

        <h2 className="mb-6 mt-12 text-sm font-semibold tracking-wide">
          カリキュラム
        </h2>
        <LessonList courseId={courseId} lessons={lessons} />
      </div>
    </>
  );
}
