"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/animations";
import {
  ArrowRight,
  GithubLogo,
  PencilLine,
  TwitterLogo,
} from "@phosphor-icons/react";

interface CreatorSectionProps {
  contentCount: number;
  courseCount: number;
}

export function CreatorSection({}: CreatorSectionProps) {
  return (
    <section className="border-t py-32 sm:py-48">
      <div className="mx-auto max-w-[720px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInSlow}
            className="font-serif text-2xl leading-relaxed tracking-tight sm:text-3xl"
          >
            臨床の現場から、医療AIの実践知を届ける
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInSlow}
            className="mx-auto mt-6 max-w-[560px] leading-relaxed text-muted-foreground"
          >
            臨床医としてAIを日常的に活用する中で得た知見を、すぐに使えるナレッジとして体系化しています。
            「読んで終わり」ではなく「明日の臨床で使える」を目指して。
          </motion.p>

          {/* Founder */}
          <motion.div variants={fadeInSlow} className="mt-10">
            <p className="text-lg font-medium tracking-tight">Ken Okamoto</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Founder / 医師
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInSlow}
            className="mt-5 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <a
              href="https://github.com/kgraph57"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GithubLogo className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://x.com/kgraph_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <TwitterLogo className="h-3.5 w-3.5" />
              X
            </a>
            <a
              href="https://note.com/kgraph_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <PencilLine className="h-3.5 w-3.5" />
              note
            </a>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInSlow}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              お仕事のご依頼
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              About
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
