import Link from "next/link";
import { Github, Twitter, Mail, PenLine } from "lucide-react";
import { EmailCapture } from "@/components/layout/EmailCapture";

const FOOTER_LINKS = {
  services: {
    title: "Services",
    links: [
      {
        href: "https://kgraph57.github.io/sukusuku-navi/",
        label: "すくすくナビ",
        external: true,
      },
      {
        href: "https://kgraph57.github.io/nutri-care/",
        label: "NutriCare",
        external: true,
      },
      {
        href: "https://kgraph57.github.io/pediatric-exam-app/",
        label: "Pediatric Exam",
        external: true,
      },
      { href: "/icu-nutricare", label: "ICU NutriCare" },
    ],
  },
  knowledge: {
    title: "Knowledge",
    links: [
      { href: "/knowledge", label: "ナレッジベース" },
      { href: "/learn", label: "学習コース" },
      { href: "/news", label: "ニュース" },
    ],
  },
  company: {
    title: "Company",
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
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Email Capture */}
        <div className="border-t py-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <EmailCapture />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium">お仕事のご依頼</p>
              <p className="mt-1 text-xs text-muted-foreground">
                講演、執筆、監修、研修、プロダクト開発など、お気軽にご相談ください
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Mail className="h-3.5 w-3.5" />
                ご依頼・ご相談
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t py-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Hoshizu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
