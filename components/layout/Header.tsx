"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";

import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";
import { List } from "@phosphor-icons/react";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hasDarkHero = pathname === "/";
  const transparent = hasDarkHero && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "group/header fixed top-0 z-50 w-full transition-all duration-500",
        transparent
          ? "bg-transparent"
          : "border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className={cn(
            "font-serif text-lg font-medium tracking-tight transition-colors duration-300",
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
    </motion.header>
  );
}
