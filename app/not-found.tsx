"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Envelope,
  GraduationCap,
  Newspaper,
} from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  {
    href: "/knowledge",
    icon: BookOpen,
    label: "ナレッジ",
    description: "プロンプト・ガイド・Tipsを探す",
  },
  {
    href: "/learn",
    icon: GraduationCap,
    label: "学習コース",
    description: "医療AIを体系的に学ぶ",
  },
  {
    href: "/news",
    icon: Newspaper,
    label: "ニュースレター",
    description: "最新の医療AIニュースを読む",
  },
  {
    href: "/contact",
    icon: Envelope,
    label: "お問い合わせ",
    description: "講演・執筆・監修のご依頼",
  },
] as const;

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground/50"
      >
        Page not found
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        className="mt-4 font-serif text-7xl font-light tracking-tight sm:text-8xl"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="mt-4 text-sm text-muted-foreground/60"
      >
        お探しのページは存在しないか、移動した可能性があります。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        className="mt-12 grid w-full max-w-md gap-3"
      >
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 rounded-2xl border border-border/50 p-5 transition-all duration-300 hover:border-border hover:bg-muted/30"
            >
              <Icon className="h-5 w-5 text-muted-foreground/50 transition-colors group-hover:text-accent-gold" />
              <div>
                <p className="text-sm font-medium">{link.label}</p>
                <p className="text-xs text-muted-foreground/60">
                  {link.description}
                </p>
              </div>
            </Link>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      >
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground/50 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          ホームに戻る
        </Link>
      </motion.div>
    </div>
  );
}
