"use client";

import { useEffect, useState } from "react";

// ============================================================
// Hoshizu Constellation Animation
// コンセプト：「散らばる星を、星座にする。」
// スタイル：yolu.jp風 — ゆっくり・上品・バウンスなし
//
// 星座：こぐま座（Ursa Minor）＋おおぐま座（Ursa Major）
//   北極星（Polaris）を頂点に、2つの柄杓が描かれる。
//   Merak→Polaris の点線は「北を指す道標」の比喩。
// ============================================================

export function ConstellationAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // ── 星の定義 ─────────────────────────────────────────────
  // x, y: viewBox 0 0 500 500 内の座標
  // r: 半径（明るい星ほど大きい）
  // sparkle: 4点星を表示するか
  // delay: 出現ディレイ（秒）
  const stars = [
    // こぐま座
    { id: "polaris", x: 248, y: 72,  r: 4.5, sparkle: true,  delay: 0.6  },
    { id: "kochab",  x: 175, y: 128, r: 3.2, sparkle: true,  delay: 1.0  },
    { id: "pherkad", x: 208, y: 164, r: 2.4, sparkle: false, delay: 1.4  },
    { id: "g-umi",   x: 240, y: 192, r: 2.0, sparkle: false, delay: 1.7  },
    { id: "d-umi",   x: 262, y: 228, r: 2.2, sparkle: false, delay: 2.0  },
    { id: "e-umi",   x: 310, y: 214, r: 1.9, sparkle: false, delay: 2.3  },
    { id: "z-umi",   x: 350, y: 188, r: 2.1, sparkle: false, delay: 2.6  },
    { id: "h-umi",   x: 370, y: 152, r: 2.6, sparkle: false, delay: 2.9  },
    // おおぐま座
    { id: "dubhe",   x: 125, y: 278, r: 3.5, sparkle: true,  delay: 0.8  },
    { id: "merak",   x: 145, y: 330, r: 3.2, sparkle: false, delay: 1.1  },
    { id: "phecda",  x: 196, y: 350, r: 2.6, sparkle: false, delay: 1.5  },
    { id: "megrez",  x: 232, y: 310, r: 2.2, sparkle: false, delay: 1.8  },
    { id: "alioth",  x: 282, y: 294, r: 3.2, sparkle: true,  delay: 2.1  },
    { id: "mizar",   x: 328, y: 268, r: 2.8, sparkle: false, delay: 2.4  },
    { id: "alkaid",  x: 372, y: 242, r: 2.6, sparkle: false, delay: 2.7  },
  ];

  // 座標マップ
  const pos: Record<string, { x: number; y: number }> = Object.fromEntries(
    stars.map((s) => [s.id, { x: s.x, y: s.y }])
  );

  // ── 星座線の定義 ─────────────────────────────────────────
  const lines: { from: string; to: string; delay: number; dashed?: boolean }[] = [
    // こぐま座
    { from: "polaris", to: "kochab",  delay: 0.8  },
    { from: "kochab",  to: "pherkad", delay: 1.05 },
    { from: "pherkad", to: "g-umi",   delay: 1.3  },
    { from: "g-umi",   to: "d-umi",   delay: 1.55 },
    { from: "d-umi",   to: "e-umi",   delay: 1.8  },
    { from: "e-umi",   to: "z-umi",   delay: 2.05 },
    { from: "z-umi",   to: "h-umi",   delay: 2.3  },
    { from: "kochab",  to: "h-umi",   delay: 2.6  },
    // おおぐま座
    { from: "dubhe",   to: "merak",   delay: 1.0  },
    { from: "merak",   to: "phecda",  delay: 1.25 },
    { from: "phecda",  to: "megrez",  delay: 1.5  },
    { from: "megrez",  to: "dubhe",   delay: 1.75 },
    { from: "megrez",  to: "alioth",  delay: 2.0  },
    { from: "alioth",  to: "mizar",   delay: 2.25 },
    { from: "mizar",   to: "alkaid",  delay: 2.5  },
    // 道標ライン（Merak → Polaris）
    { from: "merak",   to: "polaris", delay: 3.2, dashed: true },
  ];

  // 線の長さを計算
  const len = (from: string, to: string) => {
    const a = pos[from], b = pos[to];
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  };

  // ── 背景の小さな星 ────────────────────────────────────────
  const bgStars = [
    { x: 42,  y: 45,  r: 0.8 }, { x: 78,  y: 28,  r: 0.6 },
    { x: 115, y: 52,  r: 0.7 }, { x: 158, y: 22,  r: 0.5 },
    { x: 198, y: 48,  r: 0.6 }, { x: 305, y: 38,  r: 0.7 },
    { x: 340, y: 62,  r: 0.5 }, { x: 390, y: 32,  r: 0.8 },
    { x: 430, y: 58,  r: 0.6 }, { x: 465, y: 90,  r: 0.5 },
    { x: 480, y: 138, r: 0.7 }, { x: 458, y: 180, r: 0.6 },
    { x: 470, y: 228, r: 0.5 }, { x: 455, y: 272, r: 0.8 },
    { x: 475, y: 315, r: 0.6 }, { x: 448, y: 358, r: 0.5 },
    { x: 465, y: 400, r: 0.7 }, { x: 420, y: 430, r: 0.6 },
    { x: 378, y: 418, r: 0.5 }, { x: 325, y: 440, r: 0.8 },
    { x: 270, y: 450, r: 0.6 }, { x: 218, y: 435, r: 0.5 },
    { x: 165, y: 420, r: 0.7 }, { x: 110, y: 408, r: 0.6 },
    { x: 60,  y: 390, r: 0.5 }, { x: 28,  y: 345, r: 0.8 },
    { x: 18,  y: 298, r: 0.6 }, { x: 32,  y: 250, r: 0.5 },
    { x: 22,  y: 200, r: 0.7 }, { x: 50,  y: 158, r: 0.6 },
    { x: 70,  y: 110, r: 0.5 }, { x: 90,  y: 74,  r: 0.8 },
    { x: 348, y: 130, r: 0.6 }, { x: 412, y: 110, r: 0.5 },
    { x: 94,  y: 225, r: 0.6 }, { x: 74,  y: 268, r: 0.5 },
    { x: 58,  y: 318, r: 0.7 }, { x: 288, y: 150, r: 0.6 },
    { x: 320, y: 370, r: 0.5 }, { x: 260, y: 390, r: 0.7 },
    { x: 180, y: 260, r: 0.6 }, { x: 428, y: 150, r: 0.5 },
  ];

  return (
    <div className="relative h-full w-full">
      <style>{`
        @keyframes hoshizu-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hoshizu-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes hoshizu-dot-appear {
          from { opacity: 0; transform: scale(0.2); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hoshizu-sparkle-appear {
          from { opacity: 0; transform: scale(0.1); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hoshizu-sparkle-breathe {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.6); }
        }
        @keyframes hoshizu-twinkle {
          0%, 100% { opacity: var(--lo); }
          50%       { opacity: var(--hi); }
        }
        @keyframes hoshizu-guide-breathe {
          0%, 100% { opacity: 0.10; }
          50%       { opacity: 0.28; }
        }

        .hoshizu-bg-star {
          animation: hoshizu-twinkle var(--dur) ease-in-out infinite var(--dl);
        }
        .hoshizu-line {
          stroke-dashoffset: var(--len);
          stroke-dasharray:  var(--len);
          animation: hoshizu-draw var(--dur) ease-in-out forwards var(--dl);
        }
        .hoshizu-guide {
          stroke-dashoffset: var(--len);
          stroke-dasharray:  var(--len);
          animation:
            hoshizu-draw 1.8s ease-in-out forwards var(--dl),
            hoshizu-guide-breathe 4s ease-in-out infinite calc(var(--dl) + 2s);
        }
        .hoshizu-dot {
          opacity: 0;
          transform-origin: center;
          animation: hoshizu-dot-appear 0.8s ease-out forwards var(--dl);
        }
        .hoshizu-sparkle {
          opacity: 0;
          transform-origin: center;
        }
        .hoshizu-sparkle-active {
          animation:
            hoshizu-sparkle-appear 1.0s ease-out forwards var(--dl),
            hoshizu-sparkle-breathe 3.5s ease-in-out infinite calc(var(--dl) + 1.2s);
        }
      `}</style>

      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        {/* ── 背景の小さな星 ── */}
        {bgStars.map((s, i) => {
          const lo  = 0.04 + (i % 4) * 0.02;
          const hi  = lo + 0.12 + (i % 3) * 0.06;
          const dur = 4 + (i % 6) * 1.2;
          const dl  = (i % 9) * 0.5;
          return (
            <circle
              key={`bg${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="currentColor"
              className="hoshizu-bg-star"
              style={{
                "--lo": lo,
                "--hi": hi,
                "--dur": `${dur}s`,
                "--dl":  `${dl}s`,
                opacity: lo,
              } as React.CSSProperties}
            />
          );
        })}

        {/* ── 星座線 ── */}
        {lines.map((line, i) => {
          const a   = pos[line.from];
          const b   = pos[line.to];
          const l   = len(line.from, line.to);
          const dur = 1.4 + l / 320;
          return line.dashed ? (
            <line
              key={`line${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="currentColor"
              strokeWidth={0.5}
              strokeLinecap="round"
              strokeDasharray={`${l} 0`}
              opacity={0.1}
              className="hoshizu-guide"
              style={{
                "--len": l,
                "--dl":  `${line.delay}s`,
              } as React.CSSProperties}
            />
          ) : (
            <line
              key={`line${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="currentColor"
              strokeWidth={0.65}
              strokeLinecap="round"
              opacity={0.28}
              className="hoshizu-line"
              style={{
                "--len": l,
                "--dur": `${dur}s`,
                "--dl":  `${line.delay}s`,
              } as React.CSSProperties}
            />
          );
        })}

        {/* ── 星のドット ── */}
        {stars.map((s) => (
          <circle
            key={`dot-${s.id}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="currentColor"
            opacity={0.85}
            className="hoshizu-dot"
            style={{ "--dl": `${s.delay}s` } as React.CSSProperties}
          />
        ))}

        {/* ── 4点星（sparkle: true の星のみ） ── */}
        {stars
          .filter((s) => s.sparkle)
          .map((s) => {
            const sz = s.id === "polaris" ? 11 : s.id === "dubhe" ? 8 : 7;
            const sw = s.id === "polaris" ? 1.0 : 0.8;
            const dl = s.delay + 0.4;
            return (
              <g
                key={`sparkle-${s.id}`}
                transform={`translate(${s.x},${s.y})`}
                className="hoshizu-sparkle hoshizu-sparkle-active"
                style={{ "--dl": `${dl}s` } as React.CSSProperties}
              >
                {/* 縦横 */}
                <line
                  x1={-sz} y1={0}   x2={sz}  y2={0}
                  stroke="currentColor" strokeWidth={sw} opacity={0.85}
                />
                <line
                  x1={0}   y1={-sz} x2={0}   y2={sz}
                  stroke="currentColor" strokeWidth={sw} opacity={0.85}
                />
                {/* 斜め（細め） */}
                <line
                  x1={-sz * 0.55} y1={-sz * 0.55} x2={sz * 0.55} y2={sz * 0.55}
                  stroke="currentColor" strokeWidth={sw * 0.5} opacity={0.5}
                />
                <line
                  x1={sz * 0.55}  y1={-sz * 0.55} x2={-sz * 0.55} y2={sz * 0.55}
                  stroke="currentColor" strokeWidth={sw * 0.5} opacity={0.5}
                />
              </g>
            );
          })}
      </svg>
    </div>
  );
}
