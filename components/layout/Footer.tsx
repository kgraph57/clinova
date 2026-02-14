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
    <footer className="border-t">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 py-16 md:grid-cols-4">
          <div>
            <span className="text-sm font-semibold tracking-tight">Clinova</span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              医療従事者のための
              <br />
              AIナレッジポータル
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://github.com/kgraph57"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t py-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Clinova. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
