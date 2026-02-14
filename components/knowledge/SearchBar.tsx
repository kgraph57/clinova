"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set("q", value)
      } else {
        params.delete("q")
      }
      router.replace(`/knowledge?${params.toString()}`)
    },
    [router, searchParams],
  )

  useEffect(() => {
    const timer = setTimeout(() => updateSearch(query), 300)
    return () => clearTimeout(timer)
  }, [query, updateSearch])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="キーワードで検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full pl-10 pr-8"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
          onClick={() => setQuery("")}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
