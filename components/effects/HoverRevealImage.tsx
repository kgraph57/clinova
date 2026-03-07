"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HoverRevealImageProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  /** Width of the reveal image in px */
  width?: number;
  /** Height of the reveal image in px */
  height?: number;
  className?: string;
}

export function HoverRevealImage({
  children,
  imageSrc,
  imageAlt,
  width = 280,
  height = 180,
  className = "",
}: HoverRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute z-50 overflow-hidden rounded-lg shadow-2xl"
            style={{
              left: pos.x + 16,
              top: pos.y - height / 2,
              width,
              height,
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={width}
              height={height}
              className="h-full w-full object-cover"
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
