import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ChapterNavItem } from "@/lib/book";

interface ChapterNavigationProps {
  readonly prev: ChapterNavItem | null;
  readonly next: ChapterNavItem | null;
}

export function ChapterNavigation({ prev, next }: ChapterNavigationProps) {
  return (
    <nav className="mt-16 flex items-stretch gap-4 border-t pt-8">
      {prev ? (
        <Link
          href={`/book/${prev.slug}`}
          className="group flex flex-1 flex-col rounded-xl border p-4 transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            前の章
          </span>
          <span className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/book/${next.slug}`}
          className="group flex flex-1 flex-col items-end rounded-xl border p-4 text-right transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            次の章
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            {next.title}
          </span>
        </Link>
      ) : (
        <Link
          href="/book"
          className="group flex flex-1 flex-col items-end rounded-xl border p-4 text-right transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            目次に戻る
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            書籍トップ
          </span>
        </Link>
      )}
    </nav>
  );
}
