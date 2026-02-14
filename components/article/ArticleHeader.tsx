import Link from "next/link"
import { ChevronRight, Clock, AlertTriangle } from "lucide-react"
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants"
import type { Article } from "@/lib/types"

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const category = CATEGORIES.find((c) => c.id === article.category)
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType)

  return (
    <div className="mb-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/knowledge" className="transition-colors hover:text-foreground">
          ナレッジ
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/knowledge?category=${category.id}`}
              className="transition-colors hover:text-foreground"
            >
              {category.label}
            </Link>
          </>
        )}
      </nav>

      {/* Meta line */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {category && <span>{category.label}</span>}
        {contentType && (
          <>
            <span className="text-border">|</span>
            <span>{contentType.label}</span>
          </>
        )}
        {article.riskLevel === "high" && (
          <>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1 text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" />
              高リスク
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      {/* Description */}
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {article.description}
      </p>

      {/* Date + Read time */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>{article.publishedAt}</span>
        {article.estimatedReadTime > 0 && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.estimatedReadTime}分で読めます
          </span>
        )}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 border-b" />
    </div>
  )
}
