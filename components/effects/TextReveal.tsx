"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  splitBy?: "word" | "character";
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  splitBy = "word",
  stagger = 0.03,
  as: Tag = "span",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const units = splitBy === "word" ? text.split(" ") : text.split("");
  const separator = splitBy === "word" ? "\u00A0" : "";

  return (
    <Tag ref={ref} className={className}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {unit}
          {separator}
        </motion.span>
      ))}
    </Tag>
  );
}
