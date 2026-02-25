import type { Metadata } from "next";
import { getAllBooks } from "@/lib/book";
import { BookLibrary } from "@/components/book/BookLibrary";

export const metadata: Metadata = {
  title: "Book - 書籍ライブラリ",
  description:
    "医療AI関連の書籍ライブラリ。エビデンスに基づく体系的ガイド。",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book - 書籍ライブラリ",
    description: "医療AI関連の書籍ライブラリ。",
    type: "website",
  },
};

export default function BookLibraryPage() {
  const books = getAllBooks();

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12 sm:py-20">
      <div className="mb-12">
        <h1 className="font-serif text-2xl tracking-tight sm:text-3xl">
          書籍ライブラリ
        </h1>
        <p className="mt-3 text-muted-foreground">
          医療×AIを体系的に学べる書籍コレクション
        </p>
      </div>
      <BookLibrary books={books} />
    </div>
  );
}
