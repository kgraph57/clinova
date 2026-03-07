"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Article } from "@/lib/types";
import {
  ArrowRight,
  ArrowUp,
  Bookmark,
  BookmarkSimple,
} from "@phosphor-icons/react";

interface FloatingReadBarProps {
  article: Article;
  nextArticle?: Article | null;
}

const SHOW_THRESHOLD = 300;

export function FloatingReadBar({
  article,
  nextArticle,
}: FloatingReadBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hoshizu-bookmarks");
      if (stored) {
        const bookmarks: { slug: string }[] = JSON.parse(stored);
        setBookmarked(bookmarks.some((b) => b.slug === article.slug));
      }
    } catch {
      // ignore
    }
  }, [article.slug]);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      setVisible(scrollTop > SHOW_THRESHOLD);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleBookmark() {
    try {
      const stored = localStorage.getItem("hoshizu-bookmarks");
      const bookmarks: { slug: string; title: string; contentType: string }[] =
        stored ? JSON.parse(stored) : [];

      const exists = bookmarks.findIndex((b) => b.slug === article.slug);
      const updated =
        exists >= 0
          ? [...bookmarks.slice(0, exists), ...bookmarks.slice(exists + 1)]
          : [
              ...bookmarks,
              {
                slug: article.slug,
                title: article.title,
                contentType: article.contentType,
              },
            ];

      localStorage.setItem("hoshizu-bookmarks", JSON.stringify(updated));
      setBookmarked(exists < 0);
    } catch {
      // ignore
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-3rem)] max-w-[640px] -translate-x-1/2"
        >
          {/* Progress bar on top edge */}
          <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-t-2xl bg-foreground/5">
            <div
              className="h-full bg-foreground/40 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border bg-background/90 px-4 py-3 shadow-lg backdrop-blur-xl sm:px-5">
            {/* Article title (truncated) */}
            <p className="min-w-0 flex-1 truncate text-sm font-medium">
              {article.title}
            </p>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1">
              {/* Bookmark */}
              <button
                onClick={toggleBookmark}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                aria-label={bookmarked ? "ブックマーク解除" : "ブックマーク"}
              >
                {bookmarked ? (
                  <BookmarkSimple className="h-4 w-4 text-foreground" />
                ) : (
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Scroll to top */}
              <button
                onClick={scrollToTop}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                aria-label="トップへ戻る"
              >
                <ArrowUp className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Next article */}
              {nextArticle && (
                <Link
                  href={`/knowledge/${nextArticle.slug}`}
                  className="ml-1 flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-80"
                >
                  Next
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
