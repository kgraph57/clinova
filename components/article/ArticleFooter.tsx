"use client"

import Link from "next/link"
import { ArrowLeft, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArticleCard } from "@/components/knowledge/ArticleCard"
import { toast } from "sonner"
import type { Article } from "@/lib/types"

interface ArticleFooterProps {
  article: Article
  relatedArticles: Article[]
}

export function ArticleFooter({ article, relatedArticles }: ArticleFooterProps) {
  function handleShare() {
    const url = `${window.location.origin}/knowledge/${article.slug}`
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URLをコピーしました")
    })
  }

  function handleTweet() {
    const text = encodeURIComponent(`${article.title} | Clinova`)
    const url = encodeURIComponent(
      `${window.location.origin}/knowledge/${article.slug}`,
    )
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    )
  }

  return (
    <div className="mt-12">
      <Separator className="mb-8" />

      {/* Share */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">共有:</span>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleTweet}>
          <Twitter className="h-3.5 w-3.5" />
          Tweet
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleShare}>
          <Share2 className="h-3.5 w-3.5" />
          URL
        </Button>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold">関連するナレッジ</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          ナレッジ一覧に戻る
        </Link>
      </div>
    </div>
  )
}
