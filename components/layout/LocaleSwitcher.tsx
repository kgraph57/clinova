"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale: Locale = LOCALES.find((l) =>
    pathname.startsWith(`/${l}/`),
  ) ?? DEFAULT_LOCALE;

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      const pathWithoutLocale = LOCALES.reduce(
        (p, l) => (p.startsWith(`/${l}/`) ? p.slice(l.length + 1) : p),
        pathname,
      );

      const newPath =
        newLocale === DEFAULT_LOCALE
          ? pathWithoutLocale
          : `/${newLocale}${pathWithoutLocale}`;

      router.push(newPath);
    },
    [pathname, router],
  );

  return (
    <button
      onClick={() =>
        switchLocale(currentLocale === "ja" ? "en" : "ja")
      }
      className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label="言語を切り替え"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs">{currentLocale === "ja" ? "EN" : "JA"}</span>
    </button>
  );
}
