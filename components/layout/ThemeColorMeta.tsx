"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const COLORS = {
  light: "#fcfcf4",
  dark: "#141413",
} as const;

export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color =
      resolvedTheme === "dark" ? COLORS.dark : COLORS.light;

    let tag = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "theme-color";
      document.head.appendChild(tag);
    }
    tag.content = color;
  }, [resolvedTheme]);

  return null;
}
