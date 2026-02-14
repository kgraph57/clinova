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
    <aside className="hidden w-48 shrink-0 lg:block">
      <nav className="sticky top-24 space-y-1">
        <Link
          href="/knowledge"
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
            !activeCategory
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            すべて
          </span>
          <span className="tabular-nums">{counts.all ?? 0}</span>
        </Link>

        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <Link
              key={cat.id}
              href={`/knowledge?category=${cat.id}`}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {cat.label}
              </span>
              <span className="tabular-nums">{counts[cat.id] ?? 0}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
