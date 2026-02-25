import type { Metadata } from "next";
import {
  getBookMetadata,
  getBookPartsWithChapters,
  getAllChapters,
} from "@/lib/book";
import { BookHero } from "@/components/book/BookHero";
import { BookTableOfContents } from "@/components/book/BookTableOfContents";
import { BookProgressBar } from "@/components/book/BookProgressBar";

export const metadata: Metadata = {
  title: "Book - AI×医療 実践ガイド",
  description:
    "医療AIの基礎から臨床応用、研究活用、倫理・規制、教育まで。エビデンスに基づく体系的ガイド。",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "AI×医療 — 臨床医のための実践ガイド",
    description:
      "医療AIの基礎から臨床応用、研究活用、倫理・規制、教育まで。",
    type: "website",
  },
};

export default function BookPage() {
  const book = getBookMetadata();
  const partsWithChapters = getBookPartsWithChapters();
  const allChapters = getAllChapters();
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
        totalChapters={book.totalChapters}
        chapterSlugs={chapterSlugs}
      />
      <BookTableOfContents parts={partsWithChapters} />
    </div>
  );
}
