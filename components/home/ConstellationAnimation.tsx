"use client";

import { useEffect, useState, useMemo, useId } from "react";
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
  driftX: number;
  driftY: number;
  twinkle: number;
  bright: boolean;
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
    const bright = i < 10;
    stars.push({
      cx: 5 + rand() * 90,
      cy: 5 + rand() * 90,
      r: bright ? 1.5 + rand() * 1.5 : 0.5 + rand() * 1,
      opacity: bright ? 0.7 + rand() * 0.3 : 0.15 + rand() * 0.4,
      delay: rand() * 2,
      driftX: (rand() - 0.5) * 4,
      driftY: (rand() - 0.5) * 4,
      twinkle: 2 + rand() * 3,
      bright,
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
          delay: 1.5 + i * 0.1,
          opacity: fade * 0.3 * Math.min(stars[i].opacity, stars[j].opacity),
        });
      }
    }
  }
  return lines;
}

export function ConstellationAnimation() {
  const [mounted, setMounted] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 100000));
  const uid = useId();

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
      <style>{`
        @keyframes ${uid}-twinkle {
          0%, 100% { opacity: var(--star-op); }
          50% { opacity: calc(var(--star-op) * 0.4); }
        }
        @keyframes ${uid}-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--dx), var(--dy)); }
        }
        @keyframes ${uid}-line-in {
          from { opacity: 0; stroke-dashoffset: 1; }
          to { opacity: var(--line-op); stroke-dashoffset: 0; }
        }
        .${uid}-star {
          animation:
            ${uid}-twinkle var(--tw-dur) ease-in-out infinite,
            ${uid}-drift var(--drift-dur) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        .${uid}-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          animation: ${uid}-line-in 2s ease-out forwards;
          animation-delay: var(--delay);
        }
      `}</style>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {lines.map((line, i) => (
          <line
            key={`l-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className={`stroke-foreground ${uid}-line`}
            strokeWidth={0.15}
            pathLength={1}
            style={
              {
                "--line-op": line.opacity,
                "--delay": `${line.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {stars.map((star, i) => (
          <circle
            key={`s-${i}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            className={`fill-foreground ${uid}-star`}
            style={
              {
                "--star-op": star.opacity,
                "--tw-dur": `${star.twinkle}s`,
                "--drift-dur": `${18 + i * 0.5}s`,
                "--dx": `${star.driftX}px`,
                "--dy": `${star.driftY}px`,
                "--delay": `${star.delay}s`,
                opacity: star.opacity,
              } as React.CSSProperties
            }
          />
        ))}

        {stars
          .filter((s) => s.bright)
          .map((star, i) => (
            <circle
              key={`g-${i}`}
              cx={star.cx}
              cy={star.cy}
              r={star.r * 4}
              className={`fill-foreground ${uid}-star`}
              style={
                {
                  "--star-op": star.opacity * 0.08,
                  "--tw-dur": `${star.twinkle}s`,
                  "--drift-dur": `${18 + i * 0.5}s`,
                  "--dx": `${star.driftX}px`,
                  "--dy": `${star.driftY}px`,
                  "--delay": `${star.delay}s`,
                  opacity: star.opacity * 0.08,
                } as React.CSSProperties
              }
            />
          ))}
      </svg>
    </motion.div>
  );
}
