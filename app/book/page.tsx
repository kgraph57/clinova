import type { Metadata } from "next";
import { getAllBooks } from "@/lib/book";
import { BookLibrary } from "@/components/book/BookLibrary";

export const metadata: Metadata = {
  title: "Book - 書籍ライブラリ",
  description: "医療AI関連の書籍ライブラリ。エビデンスに基づく体系的ガイド。",
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

  return <BookLibrary books={books} />;
}
