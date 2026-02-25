import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getBookMetadata,
  getChapterBySlug,
  getChapterNavigation,
  getAllBookChapterParams,
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
import { PromptTemplate } from "@/components/article/PromptTemplate";
import { ActionItem } from "@/components/learn/ActionItem";
import { LessonTracker } from "@/components/learn/LessonTracker";
import { TableOfContents } from "@/components/learn/TableOfContents";
import { MobileToc } from "@/components/learn/MobileToc";
import { extractToc } from "@/lib/toc";
import { StatHighlight } from "@/components/book/mdx/StatHighlight";
import { StatRow, StatRowItem } from "@/components/book/mdx/StatRow";
import { StepFlow, StepFlowStep } from "@/components/book/mdx/StepFlow";
import {
  ComparisonCard,
  ComparisonBefore,
  ComparisonAfter,
} from "@/components/book/mdx/ComparisonCard";
import { BarChart, BarChartBar } from "@/components/book/mdx/BarChart";
import { Timeline, TimelineEvent } from "@/components/book/mdx/Timeline";
import { KeyTakeaway } from "@/components/book/mdx/KeyTakeaway";
import { Figure } from "@/components/book/mdx/Figure";

const mdxComponents = {
  h2: H2,
  h3: H3,
  Warning,
  ResourceCard,
  CaseStudy,
  YouTubeEmbed,
  Callout,
  PromptTemplate,
  ActionItem,
  StatHighlight,
  StatRow,
  StatRowItem,
  StepFlow,
  StepFlowStep,
  ComparisonCard,
  ComparisonBefore,
  ComparisonAfter,
  BarChart,
  BarChartBar,
  Timeline,
  TimelineEvent,
  KeyTakeaway,
  Figure,
};

interface PageProps {
  params: Promise<{ bookId: string; chapterId: string }>;
}

export function generateStaticParams() {
  return getAllBookChapterParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { bookId, chapterId } = await params;
  const chapter = getChapterBySlug(bookId, chapterId);
  if (!chapter) return {};

  const book = getBookMetadata(bookId);

  return {
    title: chapter.title,
    description: chapter.description,
    alternates: {
      canonical: `/book/${bookId}/${chapterId}`,
    },
    openGraph: {
      title: `${chapter.title} - ${book.title}`,
      description: chapter.description,
      type: "article",
    },
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { bookId, chapterId } = await params;
  const book = getBookMetadata(bookId);
  const chapter = getChapterBySlug(bookId, chapterId);

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

  const { prev, next } = getChapterNavigation(bookId, chapterId);
  const tocItems = extractToc(chapter.content);

  return (
    <>
      <ReadingProgress />
      <LessonTracker courseId={`book-${bookId}`} lessonSlug={chapterId} />
      <TableOfContents items={tocItems} />
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
        <ChapterHeader
          bookId={bookId}
          bookTitle={book.title}
          chapter={chapter}
          totalChapters={book.totalChapters}
        />
        <MobileToc items={tocItems} />

        <article className="prose book-prose">
          <MDXRemote
            source={chapter.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <ChapterCompleteButton bookId={bookId} chapterSlug={chapterId} />
        <ChapterNavigation bookId={bookId} prev={prev} next={next} />
      </div>
    </>
  );
}
