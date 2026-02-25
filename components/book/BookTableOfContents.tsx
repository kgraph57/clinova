"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/learn/ProgressProvider";
import type { BookPart, ChapterMetadata } from "@/lib/book";

interface PartWithChapters extends BookPart {
  readonly chapterDetails: readonly ChapterMetadata[];
}

interface BookTableOfContentsProps {
  readonly bookId: string;
  readonly parts: readonly PartWithChapters[];
}

function PartSection({
  bookId,
  part,
}: {
  readonly bookId: string;
  readonly part: PartWithChapters;
}) {
  const [open, setOpen] = useState(true);
  const { isComplete } = useProgress();

  const completedInPart = part.chapterDetails.filter((ch) =>
    isComplete(`book-${bookId}`, ch.slug),
  ).length;

  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-1 py-5 text-left transition-colors hover:text-foreground"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Part {part.order}
            </span>
            {completedInPart > 0 && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                {completedInPart}/{part.chapterDetails.length}
              </span>
            )}
          </div>
          <span className="mt-0.5 block text-base font-medium">
            {part.title}
          </span>
        </div>
      </button>

      {open && (
        <div className="mb-4 ml-7 flex flex-col gap-1">
          {part.chapterDetails.map((ch) => (
            <ChapterItem key={ch.slug} bookId={bookId} chapter={ch} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChapterItem({
  bookId,
  chapter,
}: {
  readonly bookId: string;
  readonly chapter: ChapterMetadata;
}) {
  const { isComplete } = useProgress();
  const completed = isComplete(`book-${bookId}`, chapter.slug);
  const isComingSoon = chapter.status === "coming-soon";

  if (isComingSoon) {
    return (
      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground/50">
        <span className="flex-1 truncate">{chapter.title}</span>
        <span className="shrink-0 text-xs">Coming Soon</span>
      </div>
    );
  }

  return (
    <Link
      href={`/book/${bookId}/${chapter.slug}`}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/50",
        completed && "text-emerald-700 dark:text-emerald-400",
      )}
    >
      {completed ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
      ) : !chapter.free ? (
        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
      ) : (
        <span className="h-4 w-3.5" />
      )}
      <span className="flex-1 truncate group-hover:underline group-hover:underline-offset-4">
        {chapter.title}
      </span>
      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        {chapter.estimatedMinutes}分
      </span>
    </Link>
  );
}

export function BookTableOfContents({ bookId, parts }: BookTableOfContentsProps) {
  return (
    <div className="rounded-2xl border">
      <div className="px-5 py-4">
        <h2 className="text-lg font-medium">目次</h2>
      </div>
      <div className="px-4">
        {parts.map((part) => (
          <PartSection key={part.id} bookId={bookId} part={part} />
        ))}
      </div>
    </div>
  );
}
