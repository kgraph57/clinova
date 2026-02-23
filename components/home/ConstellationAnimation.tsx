"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ConstellationAnimation() {
  const [mounted, setMounted] = useState(false);
  const [id] = useState(() => "ca" + Math.random().toString(36).slice(2, 7));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // ===== 星座の設計 =====
  // Hoshizuコンセプト：「散らばる星を、星座にする。」
  // 北極星（Polaris）を中心に、こぐま座・おおぐま座の柄杓の形を
  // 参考にした「道標となる星座」を描く。
  // 医療×AI×テクノロジーの「繋がり・ナビゲーション」を表現。
  //
  // viewBox: 0 0 500 500
  //
  // 星の配置（名前付き）:
  //   Polaris（北極星）: 中央やや上 (250, 80) ← 最も輝く
  //
  //   こぐま座の柄杓（小さな柄杓）:
  //     Kochab   (180, 130)
  //     Pherkad  (210, 165)
  //     γ UMi    (240, 195)
  //     δ UMi    (260, 230)  ← 柄の折れ目
  //     ε UMi    (310, 215)
  //     ζ UMi    (350, 190)
  //     η UMi    (370, 155)  ← 柄の先端
  //
  //   おおぐま座の柄杓（大きな柄杓）:
  //     Dubhe    (130, 280)
  //     Merak    (150, 330)  ← この2つがPolaris方向を指す
  //     Phecda   (200, 350)
  //     Megrez   (235, 310)
  //     Alioth   (285, 295)
  //     Mizar    (330, 270)
  //     Alkaid   (375, 245)  ← 柄の先端
  //
  //   散らばる小さな星（背景）:
  //     多数の小さな星を配置

  // ===== 主要な星 =====
  const MAIN_STARS = [
    // id, x, y, r（半径）, bright（輝く）, name, delay
    { id: "polaris", x: 250, y: 80,  r: 5.5, bright: true,  name: "Polaris", delay: 0.8 },
    // こぐま座
    { id: "kochab",  x: 178, y: 132, r: 3.8, bright: true,  name: "Kochab",  delay: 1.2 },
    { id: "pherkad", x: 210, y: 168, r: 3.0, bright: false, name: "Pherkad", delay: 1.5 },
    { id: "g-umi",   x: 242, y: 196, r: 2.6, bright: false, name: "γ UMi",   delay: 1.8 },
    { id: "d-umi",   x: 264, y: 232, r: 2.8, bright: false, name: "δ UMi",   delay: 2.1 },
    { id: "e-umi",   x: 312, y: 218, r: 2.4, bright: false, name: "ε UMi",   delay: 2.4 },
    { id: "z-umi",   x: 352, y: 192, r: 2.6, bright: false, name: "ζ UMi",   delay: 2.7 },
    { id: "h-umi",   x: 372, y: 156, r: 3.2, bright: true,  name: "η UMi",   delay: 3.0 },
    // おおぐま座
    { id: "dubhe",   x: 128, y: 282, r: 4.2, bright: true,  name: "Dubhe",   delay: 1.0 },
    { id: "merak",   x: 148, y: 334, r: 3.8, bright: true,  name: "Merak",   delay: 1.3 },
    { id: "phecda",  x: 198, y: 354, r: 3.2, bright: false, name: "Phecda",  delay: 1.6 },
    { id: "megrez",  x: 234, y: 314, r: 2.8, bright: false, name: "Megrez",  delay: 1.9 },
    { id: "alioth",  x: 284, y: 298, r: 3.8, bright: true,  name: "Alioth",  delay: 2.2 },
    { id: "mizar",   x: 330, y: 272, r: 3.4, bright: true,  name: "Mizar",   delay: 2.5 },
    { id: "alkaid",  x: 374, y: 246, r: 3.2, bright: false, name: "Alkaid",  delay: 2.8 },
  ];

  // ===== 星座線（接続） =====
  // こぐま座の柄杓
  const LINES_URSA_MINOR = [
    ["polaris", "kochab"],
    ["kochab",  "pherkad"],
    ["pherkad", "g-umi"],
    ["g-umi",   "d-umi"],
    ["d-umi",   "e-umi"],
    ["e-umi",   "z-umi"],
    ["z-umi",   "h-umi"],
    // 柄杓の口を閉じる
    ["kochab",  "h-umi"],
  ];

  // おおぐま座の柄杓
  const LINES_URSA_MAJOR = [
    ["dubhe",  "merak"],
    ["merak",  "phecda"],
    ["phecda", "megrez"],
    ["megrez", "dubhe"],   // 柄杓の口（四角形）
    ["megrez", "alioth"],
    ["alioth", "mizar"],
    ["mizar",  "alkaid"],
  ];

  // Polaris方向を指す補助線（Dubhe→Merak→Polaris）
  const LINES_GUIDE = [
    ["merak",  "polaris"],  // ガイドライン（北極星への道標）
  ];

  const ALL_LINES = [
    ...LINES_URSA_MINOR.map((l, i) => ({ from: l[0], to: l[1], type: "minor", delay: 1.0 + i * 0.18 })),
    ...LINES_URSA_MAJOR.map((l, i) => ({ from: l[0], to: l[1], type: "major", delay: 1.2 + i * 0.18 })),
    ...LINES_GUIDE.map((l, i) => ({ from: l[0], to: l[1], type: "guide", delay: 3.2 + i * 0.3 })),
  ];

  // 星の座標マップ
  const starMap = Object.fromEntries(MAIN_STARS.map(s => [s.id, { x: s.x, y: s.y }]));

  // 線の長さを計算（stroke-dasharray用）
  const lineLength = (from: string, to: string) => {
    const a = starMap[from];
    const b = starMap[to];
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  };

  // ===== 背景の小さな星（散らばり感） =====
  const BG_STARS = [
    { x: 42,  y: 45,  s: 0.9 }, { x: 78,  y: 28,  s: 0.7 }, { x: 112, y: 52,  s: 0.8 },
    { x: 155, y: 22,  s: 0.6 }, { x: 195, y: 48,  s: 0.7 }, { x: 302, y: 38,  s: 0.8 },
    { x: 338, y: 62,  s: 0.6 }, { x: 388, y: 32,  s: 0.9 }, { x: 428, y: 58,  s: 0.7 },
    { x: 462, y: 88,  s: 0.6 }, { x: 478, y: 135, s: 0.8 }, { x: 455, y: 178, s: 0.7 },
    { x: 468, y: 225, s: 0.6 }, { x: 452, y: 268, s: 0.9 }, { x: 472, y: 312, s: 0.7 },
    { x: 445, y: 355, s: 0.6 }, { x: 462, y: 398, s: 0.8 }, { x: 418, y: 428, s: 0.7 },
    { x: 375, y: 415, s: 0.6 }, { x: 322, y: 438, s: 0.9 }, { x: 268, y: 448, s: 0.7 },
    { x: 215, y: 432, s: 0.6 }, { x: 162, y: 418, s: 0.8 }, { x: 108, y: 405, s: 0.7 },
    { x: 58,  y: 388, s: 0.6 }, { x: 28,  y: 342, s: 0.9 }, { x: 18,  y: 295, s: 0.7 },
    { x: 32,  y: 248, s: 0.6 }, { x: 22,  y: 198, s: 0.8 }, { x: 48,  y: 155, s: 0.7 },
    { x: 68,  y: 108, s: 0.6 }, { x: 88,  y: 72,  s: 0.9 }, { x: 345, y: 128, s: 0.7 },
    { x: 408, y: 108, s: 0.6 }, { x: 425, y: 148, s: 0.8 }, { x: 92,  y: 222, s: 0.7 },
    { x: 72,  y: 265, s: 0.6 }, { x: 55,  y: 315, s: 0.9 }, { x: 285, y: 148, s: 0.7 },
    { x: 318, y: 368, s: 0.6 }, { x: 258, y: 388, s: 0.8 }, { x: 178, y: 258, s: 0.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="relative h-full w-full"
    >
      <style>{`
        @keyframes ${id}-twinkle {
          0%, 100% { opacity: var(--lo); transform: scale(1); }
          50%       { opacity: var(--hi); transform: scale(1.9); }
        }
        @keyframes ${id}-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-dot-in {
          0%   { opacity: 0; r: 0; }
          60%  { opacity: 1; r: calc(var(--r) * 1.7); }
          100% { opacity: 1; r: var(--r); }
        }
        @keyframes ${id}-sparkle-in {
          0%   { opacity: 0; transform: scale(0) rotate(-20deg); }
          60%  { opacity: 1; transform: scale(1.4) rotate(8deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes ${id}-sparkle-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50%       { transform: scale(0.5) rotate(22deg); opacity: 0.25; }
        }
        @keyframes ${id}-guide-pulse {
          0%, 100% { opacity: 0.12; }
          50%       { opacity: 0.35; }
        }
        @keyframes ${id}-bg-twinkle {
          0%, 100% { opacity: var(--lo); }
          50%       { opacity: var(--hi); }
        }

        .${id}-bg-star {
          animation: ${id}-bg-twinkle var(--dur) ease-in-out infinite var(--dl);
        }
        .${id}-line {
          stroke-dashoffset: var(--len);
          stroke-dasharray: var(--len);
          animation: ${id}-draw var(--dur) cubic-bezier(0.4,0,0.2,1) forwards var(--dl);
        }
        .${id}-guide-line {
          stroke-dashoffset: var(--len);
          stroke-dasharray: var(--len);
          animation: ${id}-draw 1.2s cubic-bezier(0.4,0,0.2,1) forwards var(--dl),
                     ${id}-guide-pulse 3s ease-in-out infinite calc(var(--dl) + 1.5s);
        }
        .${id}-dot {
          opacity: 0;
          transform-origin: center;
          animation: ${id}-twinkle var(--dur2) ease-in-out infinite var(--dl2);
          animation-fill-mode: both;
        }
        .${id}-dot-appear {
          opacity: 0;
          transform-origin: center;
          animation: ${id}-dot-in 0.5s ease forwards var(--dl);
        }
        .${id}-sparkle {
          opacity: 0;
          transform-origin: center;
        }
        .${id}-sparkle-polaris {
          animation: ${id}-sparkle-in 0.8s ease forwards 0.9s,
                     ${id}-sparkle-pulse 2.2s ease-in-out infinite 2.0s;
        }
        .${id}-sparkle-kochab {
          animation: ${id}-sparkle-in 0.7s ease forwards 1.3s,
                     ${id}-sparkle-pulse 2.8s ease-in-out infinite 2.5s;
        }
        .${id}-sparkle-dubhe {
          animation: ${id}-sparkle-in 0.7s ease forwards 1.1s,
                     ${id}-sparkle-pulse 3.2s ease-in-out infinite 2.3s;
        }
        .${id}-sparkle-alioth {
          animation: ${id}-sparkle-in 0.7s ease forwards 2.3s,
                     ${id}-sparkle-pulse 2.5s ease-in-out infinite 3.2s;
        }
      `}</style>

      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        {/* ===== 背景の小さな星 ===== */}
        {BG_STARS.map((s, i) => {
          const lo = 0.05 + (i % 4) * 0.025;
          const hi = lo + 0.18 + (i % 3) * 0.08;
          return (
            <circle
              key={`bg${i}`}
              cx={s.x}
              cy={s.y}
              r={s.s}
              fill="currentColor"
              className={`${id}-bg-star`}
              style={{
                "--lo": lo,
                "--hi": hi,
                "--dur": `${3.5 + (i % 5) * 1.1}s`,
                "--dl":  `${(i % 7) * 0.45}s`,
                opacity: lo,
              } as React.CSSProperties}
            />
          );
        })}

        {/* ===== こぐま座・おおぐま座の星座線 ===== */}
        {ALL_LINES.map((line, i) => {
          const from = starMap[line.from];
          const to   = starMap[line.to];
          const len  = lineLength(line.from, line.to);
          const isGuide = line.type === "guide";
          const isMinor = line.type === "minor";
          return (
            <line
              key={`line${i}`}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke="currentColor"
              strokeWidth={isGuide ? 0.5 : isMinor ? 0.6 : 0.7}
              strokeLinecap="round"
              opacity={isGuide ? 0.18 : isMinor ? 0.3 : 0.28}
              strokeDasharray={len}
              strokeDashoffset={len}
              className={isGuide ? `${id}-guide-line` : `${id}-line`}
              style={{
                "--len": len,
                "--dur": `${isGuide ? 1.2 : 0.9 + len / 400}s`,
                "--dl":  `${line.delay}s`,
              } as React.CSSProperties}
            />
          );
        })}

        {/* ===== 主要な星のドット ===== */}
        {MAIN_STARS.map((star) => {
          const lo  = star.bright ? 0.3 : 0.18;
          const hi  = star.bright ? 1.0 : 0.65;
          const dur = star.bright ? 2.2 : 3.5;
          return (
            <g key={star.id}>
              {/* 出現アニメーション */}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill="currentColor"
                className={`${id}-dot-appear`}
                style={{ "--dl": `${star.delay}s` } as React.CSSProperties}
              />
              {/* きらめきアニメーション（出現後） */}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill="currentColor"
                className={`${id}-dot`}
                style={{
                  "--lo":  lo,
                  "--hi":  hi,
                  "--dur2": `${dur}s`,
                  "--dl2": `${star.delay + 0.5}s`,
                  opacity: 0,
                } as React.CSSProperties}
              />
            </g>
          );
        })}

        {/* ===== 4点星のきらめき（主要な星） ===== */}

        {/* Polaris（北極星）— 最大 */}
        <g className={`${id}-sparkle ${id}-sparkle-polaris`} transform="translate(250, 80)">
          <line x1="-14" y1="0"   x2="14"  y2="0"   stroke="currentColor" strokeWidth={1.2} opacity={0.9}/>
          <line x1="0"   y1="-14" x2="0"   y2="14"  stroke="currentColor" strokeWidth={1.2} opacity={0.9}/>
          <line x1="-8"  y1="-8"  x2="8"   y2="8"   stroke="currentColor" strokeWidth={0.6} opacity={0.6}/>
          <line x1="8"   y1="-8"  x2="-8"  y2="8"   stroke="currentColor" strokeWidth={0.6} opacity={0.6}/>
        </g>

        {/* Kochab */}
        <g className={`${id}-sparkle ${id}-sparkle-kochab`} transform="translate(178, 132)">
          <line x1="-9"  y1="0"   x2="9"   y2="0"   stroke="currentColor" strokeWidth={0.9} opacity={0.9}/>
          <line x1="0"   y1="-9"  x2="0"   y2="9"   stroke="currentColor" strokeWidth={0.9} opacity={0.9}/>
          <line x1="-5"  y1="-5"  x2="5"   y2="5"   stroke="currentColor" strokeWidth={0.5} opacity={0.6}/>
          <line x1="5"   y1="-5"  x2="-5"  y2="5"   stroke="currentColor" strokeWidth={0.5} opacity={0.6}/>
        </g>

        {/* Dubhe */}
        <g className={`${id}-sparkle ${id}-sparkle-dubhe`} transform="translate(128, 282)">
          <line x1="-10" y1="0"   x2="10"  y2="0"   stroke="currentColor" strokeWidth={1.0} opacity={0.9}/>
          <line x1="0"   y1="-10" x2="0"   y2="10"  stroke="currentColor" strokeWidth={1.0} opacity={0.9}/>
          <line x1="-6"  y1="-6"  x2="6"   y2="6"   stroke="currentColor" strokeWidth={0.5} opacity={0.6}/>
          <line x1="6"   y1="-6"  x2="-6"  y2="6"   stroke="currentColor" strokeWidth={0.5} opacity={0.6}/>
        </g>

        {/* Alioth */}
        <g className={`${id}-sparkle ${id}-sparkle-alioth`} transform="translate(284, 298)">
          <line x1="-9"  y1="0"   x2="9"   y2="0"   stroke="currentColor" strokeWidth={0.9} opacity={0.9}/>
          <line x1="0"   y1="-9"  x2="0"   y2="9"   stroke="currentColor" strokeWidth={0.9} opacity={0.9}/>
          <line x1="-5"  y1="-5"  x2="5"   y2="5"   stroke="currentColor" strokeWidth={0.5} opacity={0.6}/>
          <line x1="5"   y1="-5"  x2="-5"  y2="5"   stroke="currentColor" strokeWidth={0.5} opacity={0.6}/>
        </g>

        {/* ===== Polaris への方向矢印（ガイドの先端） ===== */}
        {/* Merak→Polaris の延長線上に小さな矢印ヒント */}
        <circle
          cx={250} cy={80}
          r={12}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.4}
          opacity={0}
          strokeDasharray="3 4"
          style={{
            animation: `${id}-guide-pulse 3s ease-in-out infinite 4s`,
          }}
        />
      </svg>
    </motion.div>
  );
}
