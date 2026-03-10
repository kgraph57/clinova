"use client";

import { Marquee } from "@/components/effects/Marquee";

const KEYWORDS = [
  "Healthcare AI",
  "Clinical Practice",
  "Medical Education",
  "Prompt Engineering",
  "Patient Safety",
  "Evidence-Based",
  "Digital Health",
  "AI Ethics",
  "Pediatrics",
  "Knowledge Sharing",
] as const;

export function MarqueeBanner() {
  return (
    <div className="border-y py-5 overflow-hidden">
      <Marquee speed={50} pauseOnHover>
        {KEYWORDS.map((word) => (
          <span
            key={word}
            className="whitespace-nowrap text-sm font-medium tracking-wide text-muted-foreground/50"
          >
            {word}
            <span className="ml-6 text-border/60">/</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
