"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const DOMAINS = [
  {
    label: "Clinical\nMedicine",
    labelJa: "臨床医療",
    description:
      "小児科医として現場で培った\n診療・患者コミュニケーションの知見",
    color: "#4a7c6f",
    colorMuted: "rgba(74, 124, 111, 0.12)",
  },
  {
    label: "AI &\nTechnology",
    labelJa: "AI・テクノロジー",
    description: "LLM活用・プロンプト設計\nプロダクト開発・システム構築",
    color: "#6366f1",
    colorMuted: "rgba(99, 102, 241, 0.12)",
  },
  {
    label: "Education &\nMedia",
    labelJa: "教育・発信",
    description: "書籍・連載・セミナー・メルマガ\nナレッジの体系化と共有",
    color: "#d97706",
    colorMuted: "rgba(217, 119, 6, 0.12)",
  },
] as const;

function VennDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Circle positions (top, bottom-left, bottom-right)
  const positions = [
    { cx: 200, cy: 140 }, // top
    { cx: 130, cy: 260 }, // bottom-left
    { cx: 270, cy: 260 }, // bottom-right
  ];

  const r = 110;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[400px]">
      <svg
        viewBox="0 0 400 400"
        className="w-full"
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.06))" }}
      >
        {/* Circles */}
        {positions.map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r={r}
            fill={DOMAINS[i].colorMuted}
            stroke={DOMAINS[i].color}
            strokeWidth={1.5}
            initial={{ r: 0, opacity: 0 }}
            animate={isInView ? { r, opacity: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.15,
              ease: EASE,
            }}
          />
        ))}

        {/* Center intersection glow */}
        <motion.circle
          cx={200}
          cy={220}
          r={30}
          fill="url(#centerGlow)"
          initial={{ r: 0, opacity: 0 }}
          animate={isInView ? { r: 30, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
        />

        {/* Center star */}
        <motion.text
          x={200}
          y={225}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-foreground text-[14px] font-semibold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
        >
          ★
        </motion.text>

        {/* Labels on each circle */}
        {positions.map((pos, i) => {
          // Offset labels outward
          const labelOffsets = [
            { x: 200, y: 80 },
            { x: 120, y: 310 },
            { x: 280, y: 310 },
          ];
          return (
            <motion.text
              key={`label-${i}`}
              x={labelOffsets[i].x}
              y={labelOffsets[i].y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground text-[11px] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
            >
              {DOMAINS[i].label.split("\n").map((line, j) => (
                <tspan key={j} x={labelOffsets[i].x} dy={j === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </motion.text>
          );
        })}

        {/* Gradient def */}
        <defs>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="rgba(184, 168, 138, 0.4)" />
            <stop offset="100%" stopColor="rgba(184, 168, 138, 0)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export function PhilosophySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* Left: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60"
            >
              Our Approach
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="mt-4 font-serif text-3xl leading-snug tracking-tight sm:text-4xl lg:text-5xl lg:leading-snug"
            >
              3つの領域が交わる場所で、
              <br />
              医療AIの実践知を紡ぐ。
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="mt-6 leading-relaxed text-muted-foreground"
            >
              臨床現場で手を動かし、テクノロジーでプロダクトを形にし、
              そこで得た知見を教育・メディアとして届ける。
              この3つのサイクルを回し続けることで、
              机上の空論ではない「使える」ナレッジを生み出しています。
            </motion.p>

            {/* Domain cards */}
            <div className="mt-10 flex flex-col gap-3">
              {DOMAINS.map((domain, i) => (
                <motion.div
                  key={domain.labelJa}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.1,
                    ease: EASE,
                  }}
                  className="flex items-start gap-4 rounded-xl border border-border/50 p-4 transition-colors hover:bg-muted/30"
                >
                  <div
                    className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: domain.color }}
                  />
                  <div>
                    <p className="text-sm font-medium">{domain.labelJa}</p>
                    <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                      {domain.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Venn Diagram with parallax */}
          <motion.div style={{ y }}>
            <VennDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
