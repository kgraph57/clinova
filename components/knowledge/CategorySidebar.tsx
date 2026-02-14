"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { LayoutGrid } from "lucide-react"
import { CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CategorySidebarProps {
  counts: Record<string, number>
}

export function CategorySidebar({ counts }: CategorySidebarProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") ?? ""

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-20 space-y-1">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          カテゴリ
        </h3>

        <Link
          href="/knowledge"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
            !activeCategory
              ? "bg-primary/5 font-medium text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          すべて
          <span className="ml-auto text-xs">{counts.all ?? 0}</span>
        </Link>

        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <Link
              key={cat.id}
              href={`/knowledge?category=${cat.id}`}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/5 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
              <span className="ml-auto text-xs">{counts[cat.id] ?? 0}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
