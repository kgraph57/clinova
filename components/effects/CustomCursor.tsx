"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const GLOW_SPRING = { damping: 30, stiffness: 180, mass: 0.8 };
const SCALE_SPRING = { damping: 25, stiffness: 300, mass: 0.5 };

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [isTouch, setIsTouch] = useState(true);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const glowX = useSpring(0, GLOW_SPRING);
  const glowY = useSpring(0, GLOW_SPRING);
  const glowScale = useSpring(1, SCALE_SPRING);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      dotX.set(e.clientX);
      dotY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);

      // Check context
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const isInHero =
          el.closest("[data-hero-section]") !== null;
        setInHero(isInHero);

        const dark =
          el.closest(".section-dark") !== null;
        setOnDark(dark);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
        )
      ) {
        setHovering(true);
        glowScale.set(1.8);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
        )
      ) {
        setHovering(false);
        glowScale.set(1);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [visible, dotX, dotY, glowX, glowY, glowScale]);

  if (isTouch) return null;

  // Hide everything in hero (StarField handles its own interaction)
  const show = visible && !inHero;

  const dotSize = 6;
  const glowSize = onDark ? 350 : 240;

  return (
    <>
      {/* Dot — small gold/white point replacing the arrow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
        }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: hovering
              ? "rgba(196, 180, 152, 1)"
              : "rgba(255, 255, 255, 0.9)",
            transition: "background 0.3s, transform 0.3s",
            transform: hovering ? "scale(2.5)" : "scale(1)",
          }}
        />
      </motion.div>

      {/* Glow — warm flashlight that illuminates content */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: glowX,
          y: glowY,
          width: glowSize,
          height: glowSize,
          marginLeft: -glowSize / 2,
          marginTop: -glowSize / 2,
          scale: glowScale,
        }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Inner warm glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: onDark
              ? "radial-gradient(circle, rgba(196,180,152,0.08) 0%, rgba(196,180,152,0.03) 35%, transparent 60%)"
              : "radial-gradient(circle, rgba(184,168,138,0.05) 0%, rgba(184,168,138,0.02) 30%, transparent 55%)",
            transition: "background 0.5s",
          }}
        />

        {/* Outer ring halo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: onDark
              ? "radial-gradient(circle, transparent 45%, rgba(196,180,152,0.04) 60%, transparent 75%)"
              : "radial-gradient(circle, transparent 45%, rgba(184,168,138,0.025) 60%, transparent 75%)",
            transition: "background 0.5s",
          }}
        />
      </motion.div>
    </>
  );
}
