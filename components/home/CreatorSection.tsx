"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/animations";
import { MagneticButton } from "@/components/effects/MagneticButton";
import {
  ArrowRight,
  ArrowUpRight,
  GithubLogo,
  PencilLine,
  TwitterLogo,
} from "@phosphor-icons/react";

interface CreatorSectionProps {
  contentCount: number;
  courseCount: number;
}

const SOCIAL = [
  {
    href: "https://github.com/kgraph57",
    label: "GitHub",
    icon: GithubLogo,
  },
  {
    href: "https://x.com/kgraph_",
    label: "X",
    icon: TwitterLogo,
  },
  {
    href: "https://note.com/kgraph_",
    label: "note",
    icon: PencilLine,
  },
] as const;

export function CreatorSection({}: CreatorSectionProps) {
  return (
    <section className="py-32 sm:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[auto_1fr] lg:gap-24">
          {/* Left: Photo */}
          <motion.div
            variants={fadeInSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <Image
                src="https://github.com/kgraph57.png"
                alt="Ken Okamoto"
                width={200}
                height={200}
                className="rounded-2xl transition-transform duration-500 hover:scale-[1.03]"
              />
              {/* Subtle decorative ring */}
              <div className="absolute -inset-3 -z-10 rounded-3xl border border-border/30" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.p
              variants={fadeInSlow}
              className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/60"
            >
              Founder
            </motion.p>

            <motion.h2
              variants={fadeInSlow}
              className="mt-4 font-serif text-2xl leading-relaxed tracking-tight sm:text-3xl"
            >
              臨床の現場から、
              <br className="hidden sm:block" />
              医療AIの実践知を届ける。
            </motion.h2>

            <motion.div variants={fadeInSlow} className="mt-6">
              <p className="text-lg font-medium tracking-tight">Ken Okamoto</p>
              <p className="mt-1 text-sm text-muted-foreground">
                医師（小児科） / Hoshizu Founder
              </p>
            </motion.div>

            <motion.p
              variants={fadeInSlow}
              className="mt-5 max-w-lg leading-relaxed text-muted-foreground"
            >
              愛育病院にて小児科医として臨床に従事しながら、
              AI×医療の実践知を書籍・連載・セミナーで発信。
              「読んで終わり」ではなく「明日の臨床で使える」を信条に、
              プロダクト開発からナレッジ体系化まで手がける。
            </motion.p>

            {/* Social */}
            <motion.div
              variants={fadeInSlow}
              className="mt-6 flex items-center gap-5"
            >
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeInSlow}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  お仕事のご依頼
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </MagneticButton>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-full border px-6 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                About
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
