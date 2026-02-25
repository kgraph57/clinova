import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import type { ChapterMetadata } from "@/lib/book";

interface ChapterHeaderProps {
  readonly chapter: ChapterMetadata;
  readonly totalChapters: number;
}

export function ChapterHeader({ chapter, totalChapters }: ChapterHeaderProps) {
  return (
    <div className="mb-12">
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/book" className="transition-colors hover:text-foreground">
          Book
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate">{chapter.partTitle}</span>
      </nav>

      <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          {chapter.order} / {totalChapters}
        </span>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {chapter.estimatedReadTime}分で読めます
        </span>
      </div>

      <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
        {chapter.title}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {chapter.description}
      </p>

      <div className="mt-10 border-b" />
    </div>
  );
}
