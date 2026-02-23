"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface StarData {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  delay: number;
  drift: { x: number; y: number };
  twinkle: number;
}

interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  opacity: number;
}

function generateStars(seed: number): StarData[] {
  const rand = seededRandom(seed);
  const stars: StarData[] = [];
  for (let i = 0; i < 55; i++) {
    const isBright = i < 10;
    stars.push({
      cx: 5 + rand() * 90,
      cy: 5 + rand() * 90,
      r: isBright ? 1.5 + rand() * 1.5 : 0.5 + rand() * 1,
      opacity: isBright ? 0.7 + rand() * 0.3 : 0.15 + rand() * 0.4,
      delay: rand() * 2,
      drift: { x: (rand() - 0.5) * 6, y: (rand() - 0.5) * 6 },
      twinkle: 2 + rand() * 3,
    });
  }
  return stars;
}

function generateLines(stars: StarData[]): LineData[] {
  const lines: LineData[] = [];
  const threshold = 25;
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].cx - stars[j].cx;
      const dy = stars[i].cy - stars[j].cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < threshold) {
        const fade = 1 - dist / threshold;
        lines.push({
          x1: stars[i].cx,
          y1: stars[i].cy,
          x2: stars[j].cx,
          y2: stars[j].cy,
          delay: 1.5 + Math.random() * 2,
          opacity: fade * 0.25 * Math.min(stars[i].opacity, stars[j].opacity),
        });
      }
    }
  }
  return lines;
}

export function ConstellationAnimation() {
  const [mounted, setMounted] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 100000));

  useEffect(() => setMounted(true), []);

  const stars = useMemo(() => generateStars(seed), [seed]);
  const lines = useMemo(() => generateLines(stars), [stars]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      className="relative h-full w-full"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {lines.map((line, i) => (
          <motion.line
            key={`l-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className="stroke-foreground"
            strokeWidth={0.15}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: line.opacity, pathLength: 1 }}
            transition={{
              opacity: { duration: 1.5, delay: line.delay },
              pathLength: { duration: 2, delay: line.delay, ease: "easeOut" },
            }}
          />
        ))}

        {stars.map((star, i) => (
          <motion.circle
            key={`s-${i}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            className="fill-foreground"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, star.opacity, star.opacity * 0.5, star.opacity],
              scale: 1,
              cx: [star.cx, star.cx + star.drift.x, star.cx],
              cy: [star.cy, star.cy + star.drift.y, star.cy],
            }}
            transition={{
              opacity: {
                duration: star.twinkle,
                delay: star.delay,
                repeat: Infinity,
                repeatType: "reverse",
              },
              scale: {
                duration: 0.6,
                delay: star.delay,
                ease: "easeOut",
              },
              cx: {
                duration: 20 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              cy: {
                duration: 18 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
