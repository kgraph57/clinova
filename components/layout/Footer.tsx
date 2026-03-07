import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import {
  GithubLogo,
  PencilLine,
  Rss,
  TwitterLogo,
} from "@phosphor-icons/react";

const NAV_LINKS = [
  { href: "/knowledge", label: "Knowledge" },
  { href: "/learn", label: "Learn" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/kgraph57",
    label: "GitHub",
    icon: GithubLogo,
  },
  {
    href: "https://x.com/kgraph_",
    label: "X",
    icon: TwitterLogo,
  },
  {
    href: "https://note.com/kgraph_",
    label: "note",
    icon: PencilLine,
  },
  {
    href: `${SITE_CONFIG.url}/feed.xml`,
    label: "RSS",
    icon: Rss,
  },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="font-serif text-lg font-medium tracking-tight"
          >
            Hoshizu
          </Link>

          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hoshizu. All rights reserved.
          </p>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
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
