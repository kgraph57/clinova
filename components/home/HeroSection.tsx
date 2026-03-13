"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/effects/TextReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { StarField } from "@/components/effects/StarField";
import { CaretDown } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section data-dark-section className="relative -mt-16 flex min-h-svh flex-col justify-end overflow-hidden bg-[#06060e] px-6 pb-24 sm:pb-32 lg:pb-40">
      {/* Static CSS aurora — always visible even before JS loads */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 20% 60%, rgba(108,60,220,0.28) 0%, transparent 70%)",
            "radial-gradient(ellipse 55% 40% at 75% 35%, rgba(30,140,210,0.22) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 35% at 50% 75%, rgba(50,200,170,0.16) 0%, transparent 60%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* Gradient orb — animated, mouse-tracking */}
      <GradientOrb />

      {/* Star field — autonomous twinkling + mouse reveal */}
      <StarField count={200} revealRadius={280} className="z-[1]" />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6,6,14,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        {/* Eyebrow with gold accent line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="flex items-center gap-4"
        >
          <span
            className="h-px w-10 shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(196,180,152,0.7))",
            }}
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/30">
            Healthcare &times; AI &times; Technology
          </p>
        </motion.div>

        {/* Main heading */}
        <div className="mt-8 sm:mt-10">
          <TextReveal
            text="散らばる星を、"
            as="h1"
            splitBy="character"
            stagger={0.04}
            className="block font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          />
          <TextReveal
            text="星座にする。"
            as="p"
            splitBy="character"
            stagger={0.04}
            className="mt-1 block font-serif text-5xl leading-[1.05] tracking-tight text-[#c4b498]/55 sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          />
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col gap-8 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="max-w-xs text-[13px] leading-[1.8] text-white/30"
          >
            医療とテクノロジーの交差点で、
            <br />
            ナレッジを体系化するポータル
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          >
            <MagneticButton>
              <Link
                href="/knowledge"
                className="group inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300"
                style={{
                  borderColor: "rgba(196,180,152,0.25)",
                  background: "rgba(196,180,152,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(196,180,152,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(196,180,152,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(196,180,152,0.25)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(196,180,152,0.04)";
                }}
              >
                Explore
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <CaretDown className="h-4 w-4" style={{ color: "rgba(196,180,152,0.3)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
