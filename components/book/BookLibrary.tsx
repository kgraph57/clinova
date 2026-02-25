"use client";

import Link from "next/link";
import { BookOpen, Clock, User, ChevronRight } from "lucide-react";
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
      className="group flex flex-col overflow-hidden rounded-2xl border transition-all hover:border-foreground/20 hover:shadow-lg sm:flex-row"
    >
      {/* Cover */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          "h-56 sm:h-auto sm:w-52",
          book.coverImage
            ? "bg-cover bg-center"
            : "bg-gradient-to-br from-slate-800 to-slate-950 dark:from-slate-700 dark:to-slate-900",
        )}
        style={
          book.coverImage
            ? { backgroundImage: `url(${book.coverImage})` }
            : undefined
        }
      >
        {!book.coverImage && (
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <BookOpen className="h-10 w-10 text-white/40" />
            <span className="font-serif text-sm leading-tight text-white/70">
              {book.title}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-medium leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">
          {book.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {book.description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
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
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {completedCount} / {book.totalChapters} 章 読了
            </span>
            {percentage > 0 && <span>{percentage}%</span>}
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-foreground">
          <span>読み始める</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
    <div className="flex flex-col gap-6">
      {books.map((book) => (
        <BookCard key={book.bookId} book={book} />
      ))}
    </div>
  );
}
