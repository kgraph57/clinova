"use client";

import { useRef, useEffect, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
}

interface StarFieldProps {
  /** Number of stars to generate */
  count?: number;
  /** Radius of the "flashlight" reveal area in pixels */
  revealRadius?: number;
  className?: string;
}

export function StarField({
  count = 120,
  revealRadius = 200,
  className = "",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const initStars = useCallback(
    (width: number, height: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          baseAlpha: Math.random() * 0.15 + 0.03,
          alpha: 0.03,
        });
      }
      starsRef.current = stars;
    },
    [count],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const r2 = revealRadius * revealRadius;

    for (const star of starsRef.current) {
      const dx = star.x - mx;
      const dy = star.y - my;
      const dist2 = dx * dx + dy * dy;

      // Stars near cursor glow brightly, others show at dim base alpha
      const targetAlpha =
        dist2 < r2
          ? 0.6 + 0.4 * (1 - Math.sqrt(dist2) / revealRadius)
          : star.baseAlpha;

      // Smooth transition
      star.alpha += (targetAlpha - star.alpha) * 0.15;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 240, ${star.alpha})`;
      ctx.fill();

      // Add glow for bright stars
      if (star.alpha > 0.3) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${star.alpha * 0.15})`;
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [revealRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initStars, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}
