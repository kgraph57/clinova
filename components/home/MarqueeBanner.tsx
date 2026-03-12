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
    <div className="border-y border-border/40 py-6 overflow-hidden">
      <Marquee speed={40} pauseOnHover>
        {KEYWORDS.map((word) => (
          <span
            key={word}
            className="whitespace-nowrap font-serif text-base font-light tracking-wide text-muted-foreground/40 sm:text-lg"
          >
            {word}
            <span className="mx-8 text-accent-gold/40">&loz;</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
