"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  isBookmarked as checkBookmarked,
  addBookmark,
  removeBookmark,
  type BookmarkItem,
} from "@/lib/storage";

interface BookmarkButtonProps {
  readonly slug: string;
  readonly title: string;
  readonly contentType: string;
  readonly variant?: "icon" | "full";
}

export function BookmarkButton({
  slug,
  title,
  contentType,
  variant = "icon",
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(checkBookmarked(slug));
  }, [slug]);

  const toggle = useCallback(() => {
    if (bookmarked) {
      removeBookmark(slug);
      setBookmarked(false);
      toast("ブックマークを解除しました");
    } else {
      const item: BookmarkItem = {
        slug,
        title,
        contentType,
        bookmarkedAt: Date.now(),
      };
      addBookmark(item);
      setBookmarked(true);
      toast.success("ブックマークに追加しました");
    }
  }, [bookmarked, slug, title, contentType]);

  if (variant === "full") {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={toggle}
        aria-label={bookmarked ? "ブックマーク解除" : "ブックマークに追加"}
      >
        {bookmarked ? (
          <>
            <BookmarkCheck className="h-4 w-4 text-primary" />
            保存済み
          </>
        ) : (
          <>
            <Bookmark className="h-4 w-4" />
            保存
          </>
        )}
      </Button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="text-muted-foreground transition-colors hover:text-foreground"
      aria-label={bookmarked ? "ブックマーク解除" : "ブックマークに追加"}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </button>
  );
}
