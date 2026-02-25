import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getBookMetadata,
  getAllChapterSlugs,
  getChapterBySlug,
  getChapterNavigation,
} from "@/lib/book";
import { ChapterHeader } from "@/components/book/ChapterHeader";
import { ChapterNavigation } from "@/components/book/ChapterNavigation";
import { ChapterCompleteButton } from "@/components/book/ChapterCompleteButton";
import { ChapterGate } from "@/components/book/ChapterGate";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { Warning } from "@/components/article/Warning";
import { ResourceCard } from "@/components/article/ResourceCard";
import { CaseStudy } from "@/components/article/CaseStudy";
import { YouTubeEmbed } from "@/components/article/YouTubeEmbed";
import { Callout } from "@/components/article/Callout";
import { H2, H3 } from "@/components/article/HeadingWithId";
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
};

interface PageProps {
  params: Promise<{ chapterId: string }>;
}

export function generateStaticParams() {
  return getAllChapterSlugs().map((chapterId) => ({ chapterId }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getChapterBySlug(chapterId);
  if (!chapter) return {};

  const book = getBookMetadata();

  return {
    title: chapter.title,
    description: chapter.description,
    alternates: {
      canonical: `/book/${chapterId}`,
    },
    openGraph: {
      title: `${chapter.title} - ${book.title}`,
      description: chapter.description,
      type: "article",
    },
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapterId } = await params;
  const book = getBookMetadata();
  const chapter = getChapterBySlug(chapterId);

  if (!chapter) {
    notFound();
  }

  if (chapter.status === "coming-soon") {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20 text-center">
        <h1 className="font-serif text-2xl tracking-tight sm:text-3xl">
          {chapter.title}
        </h1>
        <p className="mt-4 text-muted-foreground">
          この章は現在執筆中です。公開をお楽しみに。
        </p>
      </div>
    );
  }

  if (!chapter.free) {
    return (
      <ChapterGate
        partTitle={chapter.partTitle}
        chapterTitle={chapter.title}
        description={chapter.description}
      />
    );
  }

  const { prev, next } = getChapterNavigation(chapterId);
  const tocItems = extractToc(chapter.content);

  return (
    <>
      <ReadingProgress />
      <LessonTracker courseId="book" lessonSlug={chapterId} />
      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
        <ChapterHeader
          chapter={chapter}
          totalChapters={book.totalChapters}
        />
        <MobileToc items={tocItems} />

        <article className="prose">
          <MDXRemote
            source={chapter.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <ChapterCompleteButton chapterSlug={chapterId} />
        <ChapterNavigation prev={prev} next={next} />
      </div>
    </>
  );
}
