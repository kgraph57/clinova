"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STARS = [
  { x: 50, y: 8, s: 1.8, bright: true },
  { x: 30, y: 15, s: 1.2, bright: false },
  { x: 68, y: 12, s: 1.4, bright: true },
  { x: 22, y: 30, s: 1.0, bright: false },
  { x: 42, y: 25, s: 1.6, bright: true },
  { x: 60, y: 28, s: 1.0, bright: false },
  { x: 78, y: 22, s: 1.3, bright: true },
  { x: 15, y: 45, s: 0.9, bright: false },
  { x: 35, y: 42, s: 1.5, bright: true },
  { x: 55, y: 45, s: 1.1, bright: false },
  { x: 72, y: 40, s: 1.4, bright: true },
  { x: 88, y: 35, s: 1.0, bright: false },
  { x: 25, y: 58, s: 1.3, bright: true },
  { x: 45, y: 55, s: 1.0, bright: false },
  { x: 65, y: 58, s: 1.6, bright: true },
  { x: 82, y: 52, s: 1.1, bright: false },
  { x: 18, y: 72, s: 1.1, bright: false },
  { x: 38, y: 68, s: 1.4, bright: true },
  { x: 58, y: 72, s: 1.2, bright: false },
  { x: 75, y: 68, s: 1.5, bright: true },
  { x: 92, y: 65, s: 0.9, bright: false },
  { x: 30, y: 82, s: 1.3, bright: true },
  { x: 50, y: 85, s: 1.0, bright: false },
  { x: 70, y: 80, s: 1.4, bright: true },
  { x: 85, y: 78, s: 1.1, bright: false },
  { x: 45, y: 92, s: 1.2, bright: false },
  { x: 62, y: 90, s: 1.5, bright: true },
];

const LINES: [number, number][] = [
  [0, 4],
  [4, 2],
  [2, 6],
  [1, 4],
  [4, 5],
  [3, 8],
  [8, 9],
  [9, 10],
  [7, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [10, 14],
  [6, 10],
  [12, 17],
  [17, 18],
  [18, 19],
  [14, 19],
  [19, 23],
  [17, 21],
  [21, 22],
  [22, 26],
  [23, 24],
  [22, 25],
  [25, 26],
];

const DUST = [
  { x: 8, y: 20, s: 0.4 },
  { x: 12, y: 55, s: 0.35 },
  { x: 95, y: 15, s: 0.45 },
  { x: 90, y: 48, s: 0.3 },
  { x: 5, y: 85, s: 0.4 },
  { x: 48, y: 35, s: 0.3 },
  { x: 82, y: 88, s: 0.35 },
  { x: 55, y: 18, s: 0.3 },
  { x: 35, y: 50, s: 0.25 },
  { x: 75, y: 55, s: 0.3 },
  { x: 20, y: 90, s: 0.35 },
  { x: 60, y: 65, s: 0.25 },
  { x: 40, y: 78, s: 0.3 },
  { x: 88, y: 25, s: 0.3 },
  { x: 10, y: 38, s: 0.25 },
  { x: 95, y: 75, s: 0.35 },
  { x: 52, y: 50, s: 0.2 },
  { x: 28, y: 45, s: 0.25 },
  { x: 68, y: 35, s: 0.2 },
  { x: 42, y: 15, s: 0.25 },
];

export function ConstellationAnimation() {
  const [ok, setOk] = useState(false);
  const [id] = useState(() => "c" + Math.random().toString(36).slice(2, 7));

  useEffect(() => setOk(true), []);

  if (!ok) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="relative h-full w-full text-foreground"
    >
      <style>{`
        @keyframes ${id}-twinkle {
          0%, 100% { opacity: var(--lo) }
          50% { opacity: var(--hi) }
        }
        @keyframes ${id}-flash {
          0%, 100% { opacity: 0.05 }
          20% { opacity: 1 }
          30% { opacity: 0.7 }
          40% { opacity: 1 }
          60% { opacity: 0.1 }
        }
        @keyframes ${id}-cross-h {
          0%, 100% { opacity: 0; transform: scaleX(0.3) }
          20% { opacity: 0.8; transform: scaleX(1) }
          40% { opacity: 0.6; transform: scaleX(1.2) }
          60% { opacity: 0.1; transform: scaleX(0.5) }
        }
        @keyframes ${id}-cross-v {
          0%, 100% { opacity: 0; transform: scaleY(0.3) }
          25% { opacity: 0.8; transform: scaleY(1) }
          45% { opacity: 0.6; transform: scaleY(1.2) }
          65% { opacity: 0.1; transform: scaleY(0.5) }
        }
        @keyframes ${id}-draw {
          to { stroke-dashoffset: 0 }
        }
        @keyframes ${id}-dust {
          0%, 100% { opacity: 0.04 }
          50% { opacity: 0.18 }
        }
        .${id}-star {
          animation: ${id}-twinkle var(--dur) ease-in-out infinite;
          animation-delay: var(--dl);
        }
        .${id}-bright {
          animation: ${id}-flash var(--dur) ease-in-out infinite;
          animation-delay: var(--dl);
        }
        .${id}-ch {
          animation: ${id}-cross-h var(--dur) ease-in-out infinite;
          animation-delay: var(--dl);
          transform-origin: center;
        }
        .${id}-cv {
          animation: ${id}-cross-v var(--dur) ease-in-out infinite;
          animation-delay: var(--dl);
          transform-origin: center;
        }
        .${id}-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: ${id}-draw 1.5s ease-out forwards;
          animation-delay: var(--dl);
        }
        .${id}-dust {
          animation: ${id}-dust var(--dur) ease-in-out infinite;
          animation-delay: var(--dl);
        }
      `}</style>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
      >
        {LINES.map(([a, b], i) => (
          <line
            key={`l${i}`}
            x1={STARS[a].x}
            y1={STARS[a].y}
            x2={STARS[b].x}
            y2={STARS[b].y}
            stroke="currentColor"
            strokeWidth={0.15}
            opacity={0.2}
            pathLength={1}
            className={`${id}-line`}
            style={{ "--dl": `${1 + i * 0.12}s` } as React.CSSProperties}
          />
        ))}

        {DUST.map((d, i) => (
          <circle
            key={`d${i}`}
            cx={d.x}
            cy={d.y}
            r={d.s}
            fill="currentColor"
            className={`${id}-dust`}
            style={
              {
                "--dur": `${4 + (i % 5) * 1.5}s`,
                "--dl": `${i * 0.7}s`,
                opacity: 0.04,
              } as React.CSSProperties
            }
          />
        ))}

        {STARS.map((star, i) => (
          <g key={`s${i}`}>
            <circle
              cx={star.x}
              cy={star.y}
              r={star.s * 0.5}
              fill="currentColor"
              className={star.bright ? `${id}-bright` : `${id}-star`}
              style={
                {
                  "--lo": star.bright ? 0.15 : 0.1,
                  "--hi": star.bright ? 1 : 0.5,
                  "--dur": `${star.bright ? 2.5 + (i % 3) * 0.8 : 4 + (i % 4) * 1.2}s`,
                  "--dl": `${0.5 + i * 0.15}s`,
                  opacity: star.bright ? 0.15 : 0.1,
                } as React.CSSProperties
              }
            />
            {star.bright && (
              <>
                <line
                  x1={star.x - star.s * 2}
                  y1={star.y}
                  x2={star.x + star.s * 2}
                  y2={star.y}
                  stroke="currentColor"
                  strokeWidth={0.08}
                  className={`${id}-ch`}
                  style={
                    {
                      "--dur": `${2.5 + (i % 3) * 0.8}s`,
                      "--dl": `${0.5 + i * 0.15}s`,
                      opacity: 0,
                    } as React.CSSProperties
                  }
                />
                <line
                  x1={star.x}
                  y1={star.y - star.s * 2}
                  x2={star.x}
                  y2={star.y + star.s * 2}
                  stroke="currentColor"
                  strokeWidth={0.08}
                  className={`${id}-cv`}
                  style={
                    {
                      "--dur": `${2.5 + (i % 3) * 0.8}s`,
                      "--dl": `${0.5 + i * 0.15}s`,
                      opacity: 0,
                    } as React.CSSProperties
                  }
                />
              </>
            )}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
