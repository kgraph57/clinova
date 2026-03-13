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
      <div className="relative">
        {/* Base line */}
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
        {/* Gold shimmer overlay */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={isInView ? { x: "200%", opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-px w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-gold) 50%, transparent)",
          }}
        />
      </div>
    </div>
  );
}
