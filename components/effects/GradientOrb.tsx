"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  phaseSpeed: number;
}

interface GradientOrbProps {
  className?: string;
}

const ORB_CONFIGS = [
  { color: [108, 60, 220], radiusFactor: 0.42, opacity: 0.5 },   // Deep violet
  { color: [30, 140, 210], radiusFactor: 0.35, opacity: 0.4 },   // Aurora blue
  { color: [50, 200, 170], radiusFactor: 0.28, opacity: 0.32 },  // Teal
  { color: [160, 60, 200], radiusFactor: 0.22, opacity: 0.28 },  // Magenta accent
] as const;

export function GradientOrb({ className = "" }: GradientOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  const initOrbs = useCallback((w: number, h: number) => {
    sizeRef.current = { w, h };
    const orbs: Orb[] = ORB_CONFIGS.map((cfg, i) => ({
      x: w * (0.2 + i * 0.22),
      y: h * (0.25 + (i % 2) * 0.35),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.min(w, h) * cfg.radiusFactor,
      color: `rgba(${cfg.color[0]}, ${cfg.color[1]}, ${cfg.color[2]}, ${cfg.opacity})`,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.004,
    }));
    orbsRef.current = orbs;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    timeRef.current += 0.008;
    ctx.clearRect(0, 0, w, h);

    const mx = mouseRef.current.x * w;
    const my = mouseRef.current.y * h;

    for (const orb of orbsRef.current) {
      orb.phase += orb.phaseSpeed;

      // Gentle autonomous drift with sine wave
      orb.vx += Math.sin(orb.phase * 0.7) * 0.012;
      orb.vy += Math.cos(orb.phase * 0.5) * 0.010;

      // Mouse attraction (subtle parallax)
      const attractX = (mx - orb.x) * 0.0002;
      const attractY = (my - orb.y) * 0.0002;
      orb.vx += attractX;
      orb.vy += attractY;

      // Damping
      orb.vx *= 0.992;
      orb.vy *= 0.992;

      orb.x += orb.vx;
      orb.y += orb.vy;

      // Soft bounds
      if (orb.x < -orb.radius * 0.4) orb.vx += 0.15;
      if (orb.x > w + orb.radius * 0.4) orb.vx -= 0.15;
      if (orb.y < -orb.radius * 0.4) orb.vy += 0.15;
      if (orb.y > h + orb.radius * 0.4) orb.vy -= 0.15;

      // Pulsing radius
      const pulseRadius = orb.radius * (1 + Math.sin(orb.phase) * 0.08);

      // Draw radial gradient orb
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, pulseRadius,
      );
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(0.4, orb.color.replace(/[\d.]+\)$/, (m) => {
        const v = parseFloat(m) * 0.6;
        return `${v})`;
      }));
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initOrbs(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initOrbs, draw]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ filter: "blur(72px)" }}
      aria-hidden="true"
    />
  );
}
