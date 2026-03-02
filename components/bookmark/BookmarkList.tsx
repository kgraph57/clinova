"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getBookmarks,
  removeBookmark,
  type BookmarkItem,
} from "@/lib/storage";
import { CONTENT_TYPES } from "@/lib/constants";

export function BookmarkList() {
  const [items, setItems] = useState<readonly BookmarkItem[]>([]);

  useEffect(() => {
    setItems(getBookmarks());
  }, []);

  function handleRemove(slug: string) {
    removeBookmark(slug);
    setItems(getBookmarks());
    toast("ブックマークを解除しました");
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
        <Bookmark className="h-12 w-12 stroke-1" />
        <p>まだブックマークがありません。</p>
        <p className="text-sm">
          記事ページの「保存」ボタンでブックマークできます。
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y">
      {items.map((item) => {
        const type = CONTENT_TYPES.find((c) => c.id === item.contentType);
        return (
          <li key={item.slug} className="flex items-start gap-4 py-4">
            <div className="min-w-0 flex-1">
              <Link
                href={`/knowledge/${item.slug}`}
                className="font-medium transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                {type && <span>{type.label}</span>}
                <span>
                  {new Date(item.bookmarkedAt).toLocaleDateString("ja-JP")}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => handleRemove(item.slug)}
              aria-label="ブックマーク解除"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
