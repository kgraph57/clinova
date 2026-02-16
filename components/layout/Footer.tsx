import Link from "next/link";
import { Github, Twitter, Mail, PenLine } from "lucide-react";

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
      { href: "/learn", label: "学習コース" },
      { href: "/news", label: "ニュースレター" },
      { href: "/knowledge?category=ai-fundamentals", label: "AI基礎" },
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
    <footer className="border-t">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 py-16 md:grid-cols-4">
          <div>
            <span className="text-sm font-semibold tracking-tight">
              Hoshizu
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              散らばる星を、
              <br />
              星座にする。
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://github.com/kgraph57"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/kgraph_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://note.com/kgraph_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="note"
              >
                <PenLine className="h-4 w-4" />
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

        {/* Request CTA */}
        <div className="border-t py-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">講演・執筆・監修のご依頼</p>
              <p className="mt-1 text-xs text-muted-foreground">
                セミナー、記事執筆、研修、コンテンツ監修など、お気軽にご相談ください
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Mail className="h-3.5 w-3.5" />
              ご依頼・ご相談
            </Link>
          </div>
        </div>

        <div className="border-t py-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Hoshizu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
