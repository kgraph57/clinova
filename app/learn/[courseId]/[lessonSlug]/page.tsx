import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllLessonParams,
  getCourseById,
  getLessonBySlug,
  getLessonNavigation,
} from "@/lib/courses";
import { LessonHeader } from "@/components/learn/LessonHeader";
import { LessonNavigation } from "@/components/learn/LessonNavigation";
import { LessonGate } from "@/components/learn/LessonGate";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { Warning } from "@/components/article/Warning";
import { ResourceCard } from "@/components/article/ResourceCard";
import { CaseStudy } from "@/components/article/CaseStudy";
import { YouTubeEmbed } from "@/components/article/YouTubeEmbed";
import { Callout } from "@/components/article/Callout";
import { H2, H3 } from "@/components/article/HeadingWithId";
import { Quiz } from "@/components/learn/Quiz";
import { ActionItem } from "@/components/learn/ActionItem";
import { LessonCompleteButton } from "@/components/learn/LessonCompleteButton";
import { LessonTracker } from "@/components/learn/LessonTracker";
import { TableOfContents } from "@/components/learn/TableOfContents";
import { MobileToc } from "@/components/learn/MobileToc";
import { extractToc } from "@/lib/toc";

const mdxComponents = {
  h2: H2,
  h3: H3,
  Warning,
  ResourceCard,
  CaseStudy,
  YouTubeEmbed,
  Callout,
  Quiz,
  ActionItem,
};

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
    alternates: {
      canonical: `/learn/${courseId}/${lessonSlug}`,
    },
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

  const isGated = !course.free && lesson.order > 1;

  if (isGated) {
    return (
      <LessonGate
        courseTitle={course.title}
        lessonTitle={lesson.title}
        preview={lesson.description}
      />
    );
  }

  const { prev, next } = getLessonNavigation(courseId, lessonSlug);
  const tocItems = extractToc(lesson.content);

  return (
    <>
      <ReadingProgress />
      <LessonTracker courseId={courseId} lessonSlug={lessonSlug} />
      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
        <LessonHeader course={course} lesson={lesson} />
        <MobileToc items={tocItems} />

        <article className="prose">
          <MDXRemote
            source={lesson.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <LessonCompleteButton courseId={courseId} lessonSlug={lessonSlug} />
        <LessonNavigation courseId={courseId} prev={prev} next={next} />
      </div>
    </>
  );
}
