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

  for (let i = 0; i < 90; i++) {
    const tier = i < 5 ? "bright" : i < 14 ? "mid" : i < 35 ? "dim" : "dust";

    const r =
      tier === "bright"
        ? 0.6 + rand() * 0.5
        : tier === "mid"
          ? 0.3 + rand() * 0.25
          : tier === "dim"
            ? 0.15 + rand() * 0.15
            : 0.08 + rand() * 0.1;

    const peak =
      tier === "bright"
        ? 0.9 + rand() * 0.1
        : tier === "mid"
          ? 0.5 + rand() * 0.35
          : tier === "dim"
            ? 0.2 + rand() * 0.2
            : 0.08 + rand() * 0.12;

    out.push({
      cx: rand() * 100,
      cy: rand() * 100,
      r,
      peak,
      base: tier === "bright" ? 0.1 : tier === "mid" ? 0.06 : 0.03,
      delay: rand() * 6,
      dur:
        tier === "bright"
          ? 2 + rand() * 2
          : tier === "mid"
            ? 3 + rand() * 3
            : 4 + rand() * 5,
      cross: tier === "bright",
    });
  }
  return out;
}

function makeLines(stars: Star[]): Line[] {
  const out: Line[] = [];
  const bright = stars.filter((s) => s.cross || s.peak > 0.4);
  for (let i = 0; i < bright.length; i++) {
    for (let j = i + 1; j < bright.length; j++) {
      const d = Math.hypot(
        bright[i].cx - bright[j].cx,
        bright[i].cy - bright[j].cy,
      );
      if (d < 20) {
        out.push({
          x1: bright[i].cx,
          y1: bright[i].cy,
          x2: bright[j].cx,
          y2: bright[j].cy,
          delay: 2 + i * 0.2,
          op: (1 - d / 20) * 0.2,
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
      transition={{ duration: 2, delay: 0.3 }}
      className="relative h-full w-full text-foreground"
    >
      <style>{`
        @keyframes ${id}-sparkle {
          0%   { opacity: var(--b) }
          40%  { opacity: var(--p) }
          55%  { opacity: var(--p) }
          65%  { opacity: calc(var(--p) * 0.5) }
          75%  { opacity: var(--p) }
          100% { opacity: var(--b) }
        }
        @keyframes ${id}-cross {
          0%   { opacity: 0; transform: scale(0.3) rotate(0deg) }
          40%  { opacity: var(--p); transform: scale(1) rotate(10deg) }
          55%  { opacity: var(--p); transform: scale(1.15) rotate(18deg) }
          65%  { opacity: calc(var(--p) * 0.4); transform: scale(0.85) rotate(25deg) }
          75%  { opacity: var(--p); transform: scale(1) rotate(32deg) }
          100% { opacity: 0; transform: scale(0.3) rotate(45deg) }
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
          animation: ${id}-line 3s cubic-bezier(.4,0,.2,1) forwards;
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
            stroke="currentColor"
            className={`${id}-l`}
            strokeWidth={0.08}
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
                fill="currentColor"
                className={`${id}-s`}
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
                x1={s.cx - s.r * 3.5}
                y1={s.cy}
                x2={s.cx + s.r * 3.5}
                y2={s.cy}
                stroke="currentColor"
                className={`${id}-c`}
                strokeWidth={0.05}
                style={
                  {
                    "--p": s.peak * 0.7,
                    "--d": `${s.dur}s`,
                    "--dl": `${s.delay}s`,
                    opacity: 0,
                  } as React.CSSProperties
                }
              />
              <line
                x1={s.cx}
                y1={s.cy - s.r * 3.5}
                x2={s.cx}
                y2={s.cy + s.r * 3.5}
                stroke="currentColor"
                className={`${id}-c`}
                strokeWidth={0.05}
                style={
                  {
                    "--p": s.peak * 0.7,
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
              fill="currentColor"
              className={`${id}-s`}
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
