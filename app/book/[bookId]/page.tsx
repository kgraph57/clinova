import type { Metadata } from "next";
import {
  getBookMetadata,
  getBookPartsWithChapters,
  getAllChapters,
  getAllBookSlugs,
} from "@/lib/book";
import { BookHero } from "@/components/book/BookHero";
import { BookTableOfContents } from "@/components/book/BookTableOfContents";
import { BookProgressBar } from "@/components/book/BookProgressBar";

interface PageProps {
  params: Promise<{ bookId: string }>;
}

export function generateStaticParams() {
  return getAllBookSlugs().map((bookId) => ({ bookId }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBookMetadata(bookId);

  return {
    title: book.title ? `Book - ${book.title}` : "Book",
    description: book.description,
    alternates: {
      canonical: `/book/${bookId}`,
    },
    openGraph: {
      title: book.title,
      description: book.description,
      type: "website",
    },
  };
}

export default async function BookOverviewPage({ params }: PageProps) {
  const { bookId } = await params;
  const book = getBookMetadata(bookId);
  const partsWithChapters = getBookPartsWithChapters(bookId);
  const allChapters = getAllChapters(bookId);
  const chapterSlugs = allChapters.map((c) => c.slug);

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12 sm:py-20">
      <BookHero
        title={book.title}
        description={book.description}
        author={book.author}
        totalChapters={book.totalChapters}
        estimatedTotalMinutes={book.estimatedTotalMinutes}
      />
      <BookProgressBar
        bookId={bookId}
        totalChapters={book.totalChapters}
        chapterSlugs={chapterSlugs}
      />
      <BookTableOfContents bookId={bookId} parts={partsWithChapters} />
    </div>
  );
}
