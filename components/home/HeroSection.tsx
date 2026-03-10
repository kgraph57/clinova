"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/effects/TextReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { StarField } from "@/components/effects/StarField";
import { CaretDown } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative -mt-16 flex min-h-svh flex-col justify-end bg-[#0a0a0f] px-6 pb-24 sm:pb-32 lg:pb-40">
      <StarField count={150} revealRadius={120} />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        {/* Eyebrow — top-left quiet label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8e5dc]/30"
        >
          Healthcare &times; AI &times; Technology
        </motion.p>

        {/* Main heading — left-aligned, two-line split */}
        <div className="mt-6 sm:mt-8">
          <TextReveal
            text="散らばる星を、"
            as="h1"
            splitBy="character"
            stagger={0.04}
            className="block font-serif text-5xl tracking-tight leading-[1.05] text-[#e8e5dc] sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          />
          <TextReveal
            text="星座にする。"
            as="p"
            splitBy="character"
            stagger={0.04}
            className="mt-1 block font-serif text-5xl tracking-tight leading-[1.05] text-[#e8e5dc]/70 sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          />
        </div>

        {/* Bottom row: description left + CTA right */}
        <div className="mt-12 flex flex-col gap-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="max-w-sm text-sm leading-relaxed text-[#e8e5dc]/40"
          >
            医療とテクノロジーの交差点で、
            <br className="hidden sm:block" />
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
                className="inline-flex items-center rounded-full border border-[#e8e5dc]/20 bg-[#e8e5dc] px-8 py-3 text-sm font-medium tracking-wide text-[#0a0a0f] transition-opacity hover:opacity-80"
              >
                Explore
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CaretDown className="h-5 w-5 text-[#e8e5dc]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
