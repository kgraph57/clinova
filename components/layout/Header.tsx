"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";
import { List } from "@phosphor-icons/react";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Only use transparent/white header on home page with dark hero
  const hasDarkHero = pathname === "/";
  const transparent = hasDarkHero && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "group/header fixed top-0 z-50 w-full transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-md border-b",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className={cn(
            "font-serif text-lg font-medium tracking-tight transition-colors",
            transparent && "text-white",
          )}
        >
          Hoshizu
        </Link>

        <MegaMenu scrolled={!transparent} />

        <div
          className={cn(
            "flex items-center gap-2",
            transparent &&
              "[&_button]:text-white/80 [&_button:hover]:text-white",
          )}
        >
          <SearchDialog />
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>

        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
}
