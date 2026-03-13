"use client";

import { useRef, useState, useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(184, 168, 138, 0.15)",
  as = "div",
  href,
  target,
  rel,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const Tag = as as React.ElementType;
  const linkProps = as === "a" ? { href, target, rel } : {};

  return (
    <Tag
      ref={cardRef}
      className={`glow-card group relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...linkProps}
    >
      {/* Gradient border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />

      {/* Inner spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(184, 168, 138, 0.04), transparent 40%)`
            : "none",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
