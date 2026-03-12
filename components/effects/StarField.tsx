"use client";

import { useRef, useEffect, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  twinkleAmplitude: number;
}

interface StarFieldProps {
  /** Number of stars to generate */
  count?: number;
  /** Radius of the "flashlight" reveal area in pixels */
  revealRadius?: number;
  className?: string;
}

export function StarField({
  count = 160,
  revealRadius = 240,
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
        const baseAlpha = Math.random() * 0.25 + 0.05;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.3,
          baseAlpha,
          alpha: baseAlpha * 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.008 + Math.random() * 0.025,
          twinkleAmplitude: Math.random() * 0.15 + 0.03,
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
      // Autonomous twinkling
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * star.twinkleAmplitude;
      const autonomousAlpha = star.baseAlpha + twinkle;

      const dx = star.x - mx;
      const dy = star.y - my;
      const dist2 = dx * dx + dy * dy;

      // Stars near cursor glow brightly, others twinkle autonomously
      const targetAlpha =
        dist2 < r2
          ? 0.7 + 0.3 * (1 - Math.sqrt(dist2) / revealRadius)
          : autonomousAlpha;

      // Smooth transition
      star.alpha += (targetAlpha - star.alpha) * 0.12;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 240, ${star.alpha})`;
      ctx.fill();

      // Glow for brighter moments
      if (star.alpha > 0.25) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 220, 255, ${star.alpha * 0.12})`;
        ctx.fill();
      }

      // Bright twinkle cross for the brightest stars
      if (star.alpha > 0.55) {
        const len = star.radius * 4;
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - len, star.y);
        ctx.lineTo(star.x + len, star.y);
        ctx.moveTo(star.x, star.y - len);
        ctx.lineTo(star.x, star.y + len);
        ctx.stroke();
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

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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
