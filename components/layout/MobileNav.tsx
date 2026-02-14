"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/knowledge", label: "ナレッジ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "お問い合わせ" },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="text-lg font-bold tracking-tight">Clinova</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t pt-4">
          <p className="px-3 text-xs text-muted-foreground">
            医療従事者のためのAIナレッジポータル
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
