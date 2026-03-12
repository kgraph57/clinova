"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
}

export function AnimatedDivider({ className }: AnimatedDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        }}
      />
    </div>
  );
}
