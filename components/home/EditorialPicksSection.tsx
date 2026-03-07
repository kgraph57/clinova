"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, CONTENT_TYPES } from "@/lib/constants";
import type { Article } from "@/lib/types";
import {
  ArrowRight,
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  Clock,
} from "@phosphor-icons/react";

interface EditorialPicksSectionProps {
  articles: Article[];
}

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? "20%" : "-20%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (d: number) => ({
    x: d > 0 ? "-20%" : "20%",
    opacity: 0,
  }),
};

const SLIDE_TRANSITION = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
const AUTO_ADVANCE_MS = 6000;

function SlideContent({
  article,
  direction,
}: {
  article: Article;
  direction: number;
}) {
  const category = CATEGORIES.find((c) => c.id === article.category);
  const contentType = CONTENT_TYPES.find((c) => c.id === article.contentType);

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={SLIDE_TRANSITION}
      className="absolute inset-0 flex items-center"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Link href={`/knowledge/${article.slug}`} className="group block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {category && <span>{category.label}</span>}
            {contentType && (
              <>
                <span className="text-border">|</span>
                <span>{contentType.label}</span>
              </>
            )}
          </div>

          <h3 className="mt-6 max-w-3xl font-serif text-3xl leading-snug tracking-tight transition-opacity group-hover:opacity-80 sm:text-4xl lg:text-5xl xl:text-6xl">
            {article.title}
          </h3>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {article.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{article.publishedAt}</span>
              {article.estimatedReadTime > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.estimatedReadTime}min
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
              Read
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export function EditorialPicksSection({
  articles,
}: EditorialPicksSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = articles.length;

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % count, 1);
  }, [current, count, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + count) % count, -1);
  }, [current, count, goTo]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, next, count]);

  if (count === 0) return null;

  return (
    <section
      className="py-32 sm:py-48"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-[1200px] items-end justify-between px-6">
        <div>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Picks
          </h2>
          <p className="mt-3 text-muted-foreground">厳選コンテンツ</p>
        </div>
        <Link
          href="/knowledge"
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          すべて見る
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Carousel viewport */}
      <div className="relative mt-12 min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <SlideContent
            key={articles[current].slug}
            article={articles[current]}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Controls: progress bars + arrows */}
      <div className="mx-auto mt-8 flex max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-2">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="flex h-8 items-center"
              aria-label={`Slide ${i + 1}`}
            >
              <div className="h-0.5 w-8 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full bg-foreground/60"
                  initial={{ width: 0 }}
                  animate={{ width: i === current ? "100%" : "0%" }}
                  transition={
                    i === current
                      ? { duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }
                      : { duration: 0.3 }
                  }
                />
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            aria-label="Previous"
          >
            <CaretLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            aria-label="Next"
          >
            <CaretRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-10 text-center sm:hidden">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          すべて見る
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
