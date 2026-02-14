import Link from "next/link";
import { Github, Twitter } from "lucide-react";

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
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-primary-foreground">
                  C
                </span>
              </div>
              <span className="font-bold tracking-tight">Clinova</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              医療従事者のための
              <br />
              AIナレッジポータル
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://github.com/kgraph57"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
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

        <div className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Clinova. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
