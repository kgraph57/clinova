"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Star, ArrowUpRight, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { containerVariants, fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"
import type { GitHubRepo } from "@/lib/types"

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  MDX: "bg-orange-400",
  Go: "bg-cyan-500",
  Rust: "bg-red-500",
}

function formatRelativeTime(dateString: string): string {
  const now = new Date()
  const updated = new Date(dateString)
  const diffMs = now.getTime() - updated.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "今日"
  if (diffDays === 1) return "昨日"
  if (diffDays < 7) return `${diffDays}日前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}ヶ月前`
  return `${Math.floor(diffDays / 365)}年前`
}

interface GitHubSectionProps {
  repos: GitHubRepo[]
}

export function GitHubSection({ repos }: GitHubSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll, repos])

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("[data-repo-card]")?.clientWidth ?? 340
    const gap = 24
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    })
  }, [])

  if (repos.length === 0) return null

  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                GitHub
              </h2>
            </div>
            <p className="mt-3 text-muted-foreground">
              オープンソースの医療AI関連プロジェクト
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/kgraph57"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              プロフィール
            </a>
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                canScrollLeft
                  ? "hover:bg-muted"
                  : "cursor-default opacity-30",
              )}
              aria-label="前へスクロール"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                canScrollRight
                  ? "hover:bg-muted"
                  : "cursor-default opacity-30",
              )}
              aria-label="次へスクロール"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          ref={scrollRef}
          className="-mx-6 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              variants={fadeInUp}
              data-repo-card
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[300px] flex-none snap-start flex-col rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted sm:w-[340px]"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{repo.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {repo.description ?? "No description"}
              </p>

              <div className="mt-auto flex items-center gap-4 pt-6 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        LANGUAGE_COLORS[repo.language] ?? "bg-foreground/30",
                      )}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </span>
                )}
                {repo.updated_at && (
                  <span className="ml-auto flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(repo.updated_at)}
                  </span>
                )}
              </div>
            </motion.a>
          ))}

          {/* CTA card at the end */}
          <motion.a
            variants={fadeInUp}
            href="https://github.com/kgraph57"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[300px] flex-none snap-start flex-col items-center justify-center rounded-2xl border border-dashed p-6 transition-colors hover:bg-muted/50 sm:w-[340px]"
          >
            <Github className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-foreground" />
            <p className="mt-3 text-sm font-medium">
              すべてのリポジトリを見る
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              github.com/kgraph57
            </p>
          </motion.a>
        </motion.div>

        {/* Mobile scroll hint */}
        <div className="mt-2 flex justify-center sm:hidden">
          <p className="text-xs text-muted-foreground">
            ← スワイプして他のリポジトリを見る →
          </p>
        </div>
      </div>
    </section>
  )
}
