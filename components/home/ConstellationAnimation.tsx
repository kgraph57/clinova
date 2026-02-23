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
  peak: number;
  base: number;
  delay: number;
  dur: number;
  cross: boolean;
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
  const total = 120;

  for (let i = 0; i < total; i++) {
    const tier = i < 5 ? "bright" : i < 15 ? "mid" : i < 40 ? "dim" : "dust";

    const r =
      tier === "bright"
        ? 0.5 + rand() * 0.4
        : tier === "mid"
          ? 0.25 + rand() * 0.2
          : tier === "dim"
            ? 0.12 + rand() * 0.12
            : 0.06 + rand() * 0.08;

    const peak =
      tier === "bright"
        ? 0.85 + rand() * 0.15
        : tier === "mid"
          ? 0.4 + rand() * 0.3
          : tier === "dim"
            ? 0.15 + rand() * 0.15
            : 0.06 + rand() * 0.08;

    out.push({
      cx: rand() * 100,
      cy: rand() * 100,
      r,
      peak,
      base: tier === "dust" ? 0.02 : 0.03,
      delay: rand() * 8,
      dur:
        tier === "bright"
          ? 1.8 + rand() * 2
          : tier === "mid"
            ? 2.5 + rand() * 3
            : 4 + rand() * 6,
      cross: tier === "bright",
    });
  }
  return out;
}

function makeLines(stars: Star[]): Line[] {
  const out: Line[] = [];
  const bright = stars.filter((s) => s.cross || s.peak > 0.35);
  for (let i = 0; i < bright.length; i++) {
    for (let j = i + 1; j < bright.length; j++) {
      const d = Math.hypot(
        bright[i].cx - bright[j].cx,
        bright[i].cy - bright[j].cy,
      );
      if (d < 15) {
        out.push({
          x1: bright[i].cx,
          y1: bright[i].cy,
          x2: bright[j].cx,
          y2: bright[j].cy,
          delay: 3 + i * 0.3,
          op: (1 - d / 15) * 0.12,
        });
      }
    }
  }
  return out;
}

export function ConstellationAnimation() {
  const [ok, setOk] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 99999));
  const [id] = useState(() => "k" + Math.random().toString(36).slice(2, 7));

  useEffect(() => setOk(true), []);

  const stars = useMemo(() => makeStars(seed), [seed]);
  const lines = useMemo(() => makeLines(stars), [stars]);

  if (!ok) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, delay: 0.2 }}
      className="relative h-full w-full"
    >
      <style>{`
        @keyframes ${id}-sparkle {
          0%   { opacity: var(--b) }
          40%  { opacity: var(--p) }
          50%  { opacity: var(--p) }
          60%  { opacity: calc(var(--p) * 0.6) }
          70%  { opacity: var(--p) }
          100% { opacity: var(--b) }
        }
        @keyframes ${id}-cross {
          0%   { opacity: 0; transform: scale(0.5) rotate(0deg) }
          40%  { opacity: var(--p); transform: scale(1) rotate(15deg) }
          50%  { opacity: var(--p); transform: scale(1.1) rotate(20deg) }
          60%  { opacity: calc(var(--p) * 0.5); transform: scale(0.9) rotate(25deg) }
          70%  { opacity: var(--p); transform: scale(1) rotate(30deg) }
          100% { opacity: 0; transform: scale(0.5) rotate(45deg) }
        }
        @keyframes ${id}-line {
          from { opacity: 0; stroke-dashoffset: 1 }
          to   { opacity: var(--lo); stroke-dashoffset: 0 }
        }
        .${id}-s {
          animation: ${id}-sparkle var(--d) ease-in-out infinite;
          animation-delay: var(--dl);
        }
        .${id}-c {
          animation: ${id}-cross var(--d) ease-in-out infinite;
          animation-delay: var(--dl);
          transform-origin: center;
        }
        .${id}-l {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          animation: ${id}-line 4s cubic-bezier(.4,0,.2,1) forwards;
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
            className={`stroke-foreground/20 ${id}-l`}
            strokeWidth={0.06}
            pathLength={1}
            style={
              { "--lo": l.op, "--dl": `${l.delay}s` } as React.CSSProperties
            }
          />
        ))}

        {stars.map((s, i) =>
          s.cross ? (
            <g key={`s${i}`}>
              <circle
                cx={s.cx}
                cy={s.cy}
                r={s.r}
                className={`fill-foreground ${id}-s`}
                style={
                  {
                    "--p": s.peak,
                    "--b": s.base,
                    "--d": `${s.dur}s`,
                    "--dl": `${s.delay}s`,
                    opacity: s.base,
                  } as React.CSSProperties
                }
              />
              <line
                x1={s.cx - s.r * 3}
                y1={s.cy}
                x2={s.cx + s.r * 3}
                y2={s.cy}
                className={`stroke-foreground ${id}-c`}
                strokeWidth={0.04}
                style={
                  {
                    "--p": s.peak * 0.6,
                    "--d": `${s.dur}s`,
                    "--dl": `${s.delay}s`,
                    opacity: 0,
                  } as React.CSSProperties
                }
              />
              <line
                x1={s.cx}
                y1={s.cy - s.r * 3}
                x2={s.cx}
                y2={s.cy + s.r * 3}
                className={`stroke-foreground ${id}-c`}
                strokeWidth={0.04}
                style={
                  {
                    "--p": s.peak * 0.6,
                    "--d": `${s.dur}s`,
                    "--dl": `${s.delay}s`,
                    opacity: 0,
                  } as React.CSSProperties
                }
              />
            </g>
          ) : (
            <circle
              key={`s${i}`}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              className={`fill-foreground ${id}-s`}
              style={
                {
                  "--p": s.peak,
                  "--b": s.base,
                  "--d": `${s.dur}s`,
                  "--dl": `${s.delay}s`,
                  opacity: s.base,
                } as React.CSSProperties
              }
            />
          ),
        )}
      </svg>
    </motion.div>
  );
}
