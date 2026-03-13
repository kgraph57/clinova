"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const SPRING_CONFIG = { damping: 25, stiffness: 300, mass: 0.5 };
const GLOW_SPRING = { damping: 30, stiffness: 180, mass: 0.8 };

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const rafRef = useRef<number>(0);
  const rawX = useRef(0);
  const rawY = useRef(0);

  // Dot follows tightly
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Glow follows with lag
  const glowX = useSpring(0, GLOW_SPRING);
  const glowY = useSpring(0, GLOW_SPRING);

  // Scale for hover state
  const glowScale = useSpring(1, SPRING_CONFIG);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    // Add cursor-hidden class to html
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;

      if (!visible) setVisible(true);

      dotX.set(e.clientX);
      dotY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);

      // Check if cursor is over a dark section
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const dark =
          el.closest(".section-dark") !== null ||
          el.closest("[data-dark-section]") !== null;
        setOnDark(dark);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Track hover state for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
      );
      if (interactive) {
        setHovering(true);
        glowScale.set(1.8);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
      );
      if (interactive) {
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
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible, dotX, dotY, glowX, glowY, glowScale]);

  if (isTouch) return null;

  const dotSize = 6;
  const glowSize = onDark ? 320 : 200;

  return (
    <>
      {/* Dot — precise cursor position */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: hovering
              ? "rgba(196, 180, 152, 1)"
              : "rgba(255, 255, 255, 0.9)",
            transition: "background 0.3s, transform 0.3s",
            transform: hovering ? "scale(2)" : "scale(1)",
          }}
        />
      </motion.div>

      {/* Glow ring — flashlight effect */}
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
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Warm inner glow */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-500"
          style={{
            background: onDark
              ? "radial-gradient(circle, rgba(196,180,152,0.07) 0%, rgba(196,180,152,0.03) 30%, transparent 60%)"
              : "radial-gradient(circle, rgba(184,168,138,0.04) 0%, rgba(184,168,138,0.015) 30%, transparent 60%)",
            opacity: hovering ? 1.5 : 1,
          }}
        />

        {/* Outer diffuse ring — more visible on dark backgrounds */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-500"
          style={{
            background: onDark
              ? "radial-gradient(circle, transparent 40%, rgba(196,180,152,0.04) 60%, transparent 75%)"
              : "radial-gradient(circle, transparent 40%, rgba(184,168,138,0.02) 60%, transparent 75%)",
          }}
        />
      </motion.div>
    </>
  );
}
