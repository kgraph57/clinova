"use client";

import { useEffect, useRef } from "react";
import { markArticleRead } from "@/lib/storage";

interface ReadTrackerProps {
  readonly slug: string;
}

export function ReadTracker({ slug }: ReadTrackerProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markArticleRead(slug);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  return <div ref={sentinelRef} aria-hidden="true" className="h-px" />;
}
