"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Envelope,
  GithubLogo,
  PencilLine,
  Rss,
  TwitterLogo,
} from "@phosphor-icons/react";

const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { href: "/knowledge", label: "Knowledge" },
      { href: "/learn", label: "Learn" },
      { href: "/news", label: "News" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/sukusuku-navi", label: "すくすくナビ" },
      { href: "/futari-navi", label: "ふたりナビ" },
      { href: "/pediatric-learning", label: "Pediatric Learning" },
      { href: "/tools", label: "Tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { href: "https://github.com/kgraph57", label: "GitHub", icon: GithubLogo },
  { href: "https://x.com/kgraph_", label: "X", icon: TwitterLogo },
  { href: "https://note.com/kgraph_", label: "note", icon: PencilLine },
  { href: `${SITE_CONFIG.url}/feed.xml`, label: "RSS", icon: Rss },
];

export function Footer() {
  return (
    <footer className="section-dark">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:py-32">
        {/* Top */}
        <div className="grid gap-16 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-light tracking-tight text-[var(--surface-dark-fg)]"
            >
              Hoshizu
            </Link>
            <p className="mt-4 max-w-[240px] text-sm leading-[1.8] text-[var(--surface-dark-fg)]/40">
              散らばる星を、星座にする。
              <br />
              医療AIの実践知を体系化するポータル。
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--surface-dark-fg)]/15 px-5 py-2.5 text-sm font-medium text-[var(--surface-dark-fg)]/60 transition-colors hover:border-[var(--surface-dark-fg)]/30 hover:text-[var(--surface-dark-fg)]"
            >
              <Envelope className="h-4 w-4" />
              お問い合わせ
            </Link>
          </div>

          {/* Navigation */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--surface-dark-fg)]/30">
                {section.title}
              </p>
              <nav className="mt-5 flex flex-col gap-3.5">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[var(--surface-dark-fg)]/50 transition-colors hover:text-[var(--surface-dark-fg)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-6 border-t border-[var(--surface-dark-fg)]/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--surface-dark-fg)]/30">
            &copy; {new Date().getFullYear()} Hoshizu. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--surface-dark-fg)]/30 transition-colors hover:text-[var(--surface-dark-fg)]/70"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
