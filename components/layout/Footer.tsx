import Link from "next/link"
import { Github, Twitter } from "lucide-react"

const FOOTER_LINKS = {
  product: {
    title: "コンテンツ",
    links: [
      { href: "/knowledge", label: "ナレッジ" },
      { href: "/knowledge?category=diagnosis", label: "診断支援" },
      { href: "/knowledge?category=research", label: "研究・論文" },
      { href: "/knowledge?category=workflow", label: "ワークフロー" },
    ],
  },
  resources: {
    title: "リソース",
    links: [
      { href: "/knowledge?category=ai-fundamentals", label: "AI基礎" },
      { href: "/knowledge?category=clinical", label: "臨床実践" },
    ],
  },
  company: {
    title: "サイト情報",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "お問い合わせ" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-teal-600">
                <span className="text-[10px] font-bold text-white">C</span>
              </div>
              <span className="text-sm font-bold tracking-tight">Clinova</span>
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              医療従事者のための
              <br />
              AIナレッジポータル
            </p>
            <div className="mt-4 flex gap-1.5">
              <a
                href="https://github.com/kgraph57"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t py-6 text-center text-[11px] text-muted-foreground">
          &copy; {new Date().getFullYear()} Clinova. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
