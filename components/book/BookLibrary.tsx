"use client";

import Link from "next/link";
import { BookOpen, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/learn/ProgressProvider";
import type { BookMetadata } from "@/lib/book";

interface BookLibraryProps {
  readonly books: readonly BookMetadata[];
}

function BookCard({ book }: { readonly book: BookMetadata }) {
  const { isComplete } = useProgress();

  const completedCount = book.parts.reduce((acc, part) => {
    const partCompleted = part.chapters.filter((slug) =>
      isComplete(`book-${book.bookId}`, slug),
    ).length;
    return acc + partCompleted;
  }, 0);

  const percentage =
    book.totalChapters > 0
      ? Math.round((completedCount / book.totalChapters) * 100)
      : 0;

  const hours = Math.floor(book.estimatedTotalMinutes / 60);
  const minutes = book.estimatedTotalMinutes % 60;

  return (
    <Link
      href={`/book/${book.bookId}`}
      className="group flex flex-col overflow-hidden rounded-2xl border transition-colors hover:bg-muted/30"
    >
      {/* Cover area */}
      <div
        className={cn(
          "flex h-48 items-center justify-center",
          book.coverImage
            ? "bg-cover bg-center"
            : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
        )}
        style={
          book.coverImage ? { backgroundImage: `url(${book.coverImage})` } : undefined
        }
      >
        {!book.coverImage && (
          <BookOpen className="h-12 w-12 text-muted-foreground/30" />
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-medium leading-snug group-hover:underline group-hover:underline-offset-4">
          {book.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{book.author}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {book.totalChapters}章
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {hours > 0
              ? `${hours}時間${minutes > 0 ? `${minutes}分` : ""}`
              : `${minutes}分`}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {completedCount} / {book.totalChapters} 章 読了
            </span>
            {percentage > 0 && <span>{percentage}%</span>}
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BookLibrary({ books }: BookLibraryProps) {
  if (books.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4">書籍がまだありません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.bookId} book={book} />
      ))}
    </div>
  );
}
