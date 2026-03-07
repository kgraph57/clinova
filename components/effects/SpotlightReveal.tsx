"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface SpotlightRevealProps {
  children: React.ReactNode;
  radius?: number;
  className?: string;
}

export function SpotlightReveal({
  children,
  radius = 250,
  className,
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  const maskStyle = isHovering
    ? `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`
    : "linear-gradient(black, black)";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
        style={{
          background: "var(--surface-dark, #1a1917)",
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
        }}
      />
    </div>
  );
}
