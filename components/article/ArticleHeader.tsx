import Link from "next/link"
import { ChevronRight, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/types"

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const category = CATEGORIES.find((c) => c.id === article.category)
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType)

  return (
    <div className="mb-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1 text-[11px] text-muted-foreground">
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

      {/* Badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {category && (
          <Badge
            variant="secondary"
            className={cn("gap-1 rounded-md", category.bgColor, category.darkBgColor)}
          >
            {(() => {
              const Icon = category.icon
              return <Icon className={cn("h-3 w-3", category.color)} />
            })()}
            {category.label}
          </Badge>
        )}
        {contentType && (
          <Badge variant="outline" className="rounded-md text-[10px] font-normal">
            {contentType.label}
          </Badge>
        )}
        {article.riskLevel === "high" && (
          <Badge variant="destructive" className="gap-1 rounded-md">
            <AlertTriangle className="h-3 w-3" />
            高リスク
          </Badge>
        )}
        {article.riskLevel === "medium" && (
          <Badge
            variant="secondary"
            className="gap-1 rounded-md border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
          >
            <AlertTriangle className="h-3 w-3" />
            中リスク
          </Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        {article.title}
      </h1>

      {/* Description */}
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
        {article.description}
      </p>

      {/* Meta */}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
        <span>{article.publishedAt}</span>
        {article.estimatedReadTime > 0 && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.estimatedReadTime}分で読めます
          </span>
        )}
        {article.difficulty && (
          <Badge variant="outline" className="rounded-md text-[10px] font-normal">
            {article.difficulty === "beginner"
              ? "初級"
              : article.difficulty === "intermediate"
                ? "中級"
                : "上級"}
          </Badge>
        )}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="mt-8 border-b" />
    </div>
  )
}
