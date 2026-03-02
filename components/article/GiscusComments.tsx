"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.replaceChildren();

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "kgraph57/hoshizu");
    script.setAttribute("data-repo-id", "");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "dark" : "light",
    );
    script.setAttribute("data-lang", "ja");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    el.appendChild(script);
  }, [resolvedTheme]);

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-6 font-serif text-xl tracking-tight">コメント</h2>
      <div ref={ref} />
    </section>
  );
}
