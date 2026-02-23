"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

function prng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Star {
  cx: number;
  cy: number;
  r: number;
  peakOp: number;
  baseOp: number;
  delay: number;
  dx: number;
  dy: number;
  twinkleDur: number;
  sparkle: boolean;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  op: number;
}

function makeStars(seed: number): Star[] {
  const rand = prng(seed);
  const out: Star[] = [];

  for (let i = 0; i < 50; i++) {
    const sparkle = i < 8;
    const mid = i >= 8 && i < 20;
    out.push({
      cx: 2 + rand() * 96,
      cy: 2 + rand() * 96,
      r: sparkle
        ? 0.4 + rand() * 0.35
        : mid
          ? 0.2 + rand() * 0.2
          : 0.1 + rand() * 0.15,
      peakOp: sparkle
        ? 0.6 + rand() * 0.4
        : mid
          ? 0.25 + rand() * 0.2
          : 0.1 + rand() * 0.12,
      baseOp: sparkle ? 0.04 : 0.02,
      delay: rand() * 5,
      dx: (rand() - 0.5) * 1.2,
      dy: (rand() - 0.5) * 1.2,
      twinkleDur: sparkle ? 2.5 + rand() * 2.5 : 4 + rand() * 5,
      sparkle,
    });
  }
  return out;
}

function makeLines(stars: Star[]): Line[] {
  const out: Line[] = [];
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const d = Math.hypot(
        stars[i].cx - stars[j].cx,
        stars[i].cy - stars[j].cy,
      );
      if (d < 18 && (stars[i].sparkle || stars[j].sparkle)) {
        out.push({
          x1: stars[i].cx,
          y1: stars[i].cy,
          x2: stars[j].cx,
          y2: stars[j].cy,
          delay: 2.5 + i * 0.12,
          op: (1 - d / 18) * 0.08,
        });
      }
    }
  }
  return out;
}

export function ConstellationAnimation() {
  const [ok, setOk] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 99999));
  const [id] = useState(() => "h" + Math.random().toString(36).slice(2, 7));

  useEffect(() => setOk(true), []);

  const stars = useMemo(() => makeStars(seed), [seed]);
  const lines = useMemo(() => makeLines(stars), [stars]);

  if (!ok) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.3 }}
      className="relative h-full w-full"
    >
      <style>{`
        @keyframes ${id}-twinkle {
          0%   { opacity: var(--base) }
          45%  { opacity: var(--peak) }
          55%  { opacity: var(--peak) }
          100% { opacity: var(--base) }
        }
        @keyframes ${id}-drift {
          0%,100% { transform: translate(0,0) }
          50% { transform: translate(var(--mx),var(--my)) }
        }
        @keyframes ${id}-line {
          from { opacity:0; stroke-dashoffset:1 }
          to { opacity: var(--lo); stroke-dashoffset:0 }
        }
        .${id}-s {
          animation:
            ${id}-twinkle var(--td) ease-in-out infinite,
            ${id}-drift var(--dd) ease-in-out infinite;
          animation-delay: var(--dl);
          will-change: opacity;
        }
        .${id}-l {
          stroke-dasharray:1;
          stroke-dashoffset:1;
          opacity:0;
          animation: ${id}-line 3.5s cubic-bezier(.4,0,.2,1) forwards;
          animation-delay: var(--dl);
        }
      `}</style>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {lines.map((l, i) => (
          <line
            key={`l${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            className={`stroke-foreground ${id}-l`}
            strokeWidth={0.08}
            pathLength={1}
            style={
              { "--lo": l.op, "--dl": `${l.delay}s` } as React.CSSProperties
            }
          />
        ))}
        {stars.map((s, i) => (
          <circle
            key={`s${i}`}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            className={`fill-foreground ${id}-s`}
            style={
              {
                "--peak": s.peakOp,
                "--base": s.baseOp,
                "--td": `${s.twinkleDur}s`,
                "--dd": `${25 + i * 0.5}s`,
                "--mx": `${s.dx}px`,
                "--my": `${s.dy}px`,
                "--dl": `${s.delay}s`,
                opacity: s.baseOp,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </motion.div>
  );
}
