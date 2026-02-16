"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Share2,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { toast } from "sonner";
import type { Article } from "@/lib/types";
import type { CourseMetadata } from "@/lib/courses";

interface ArticleFooterProps {
  article: Article;
  relatedArticles: Article[];
  relatedCourses?: CourseMetadata[];
}

export function ArticleFooter({
  article,
  relatedArticles,
  relatedCourses = [],
}: ArticleFooterProps) {
  function handleShare() {
    const url = `${window.location.origin}/knowledge/${article.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URLをコピーしました");
    });
  }

  function handleTweet() {
    const text = encodeURIComponent(`${article.title} | Hoshizu`);
    const url = encodeURIComponent(
      `${window.location.origin}/knowledge/${article.slug}`,
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  }

  return (
    <div className="mt-16">
      <div className="border-t pt-8" />

      {/* Share */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">共有</span>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-full"
          onClick={handleTweet}
        >
          <Twitter className="h-3.5 w-3.5" />
          Tweet
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-full"
          onClick={handleShare}
        >
          <Share2 className="h-3.5 w-3.5" />
          URLをコピー
        </Button>
      </div>

      {/* Creator CTA */}
      <div className="mt-10 rounded-2xl bg-warm-oat p-6 dark:bg-muted sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">
              講演・執筆・研修のご依頼を承っています
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              医療AIの実践的な知見を、セミナー・記事・ワークショップなどの形でお届けします
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            お問い合わせ
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">
            関連する学習コース
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedCourses.map((course) => (
              <Link
                key={course.courseId}
                href={`/learn/${course.courseId}`}
                className="group flex items-center gap-4 rounded-2xl bg-muted/50 p-5 transition-colors hover:bg-muted"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug group-hover:underline group-hover:underline-offset-4">
                    {course.title}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessonCount}レッスン
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />約
                      {course.estimatedTotalMinutes}分
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight">
            関連するナレッジ
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-12 pb-4">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          ナレッジ一覧に戻る
        </Link>
      </div>
    </div>
  );
}
