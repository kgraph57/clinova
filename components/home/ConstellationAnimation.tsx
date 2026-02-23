"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  maxOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  appearDelay: number;
}

const STAR_COUNT = 60;
const CONNECTION_DISTANCE = 130;
const DRIFT_SPEED = 0.15;
const FORMATION_DURATION = 3500;

export function ConstellationAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const padding = 24;
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = padding + Math.random() * (width - padding * 2);
      const y = padding + Math.random() * (height - padding * 2);
      const maxOpacity = 0.4 + Math.random() * 0.6;
      stars.push({
        x,
        y,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        radius: 1 + Math.random() * 2.5,
        opacity: 0,
        maxOpacity,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        twinklePhase: Math.random() * Math.PI * 2,
        appearDelay: Math.random() * 2000,
      });
    }
    starsRef.current = stars;
    sizeRef.current = { w: width, h: height };
  }, []);

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    const { w: width, h: height } = sizeRef.current;
    if (width === 0 || height === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    ctx.clearRect(0, 0, width, height);

    const stars = starsRef.current;
    const isDark = document.documentElement.classList.contains("dark");
    const starRGB = isDark ? "240, 237, 230" : "20, 20, 19";

    for (const star of stars) {
      if (elapsed > star.appearDelay) {
        const appearProgress = Math.min(
          (elapsed - star.appearDelay) / 1000,
          1,
        );
        const eased = 1 - Math.pow(1 - appearProgress, 3);
        const twinkle =
          Math.sin(
            timestamp * 0.001 * star.twinkleSpeed + star.twinklePhase,
          ) *
            0.2 +
          0.8;
        star.opacity = star.maxOpacity * eased * twinkle;
      }

      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 5 || star.x > width - 5) star.vx *= -1;
      if (star.y < 5 || star.y > height - 5) star.vy *= -1;

      const dx = star.x - mouseRef.current.x;
      const dy = star.y - mouseRef.current.y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      const mouseGlow = distToMouse < 150 ? (1 - distToMouse / 150) * 0.4 : 0;
      const finalOpacity = Math.min(star.opacity + mouseGlow, 1);

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starRGB}, ${finalOpacity})`;
      ctx.fill();

      if (star.radius > 1.4) {
        const glowRadius = star.radius * 4;
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          glowRadius,
        );
        gradient.addColorStop(
          0,
          `rgba(${starRGB}, ${finalOpacity * 0.15})`,
        );
        gradient.addColorStop(1, `rgba(${starRGB}, 0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const formationProgress = Math.min(elapsed / FORMATION_DURATION, 1);
    const formationEased = 1 - Math.pow(1 - formationProgress, 4);
    const currentMaxDist = CONNECTION_DISTANCE * formationEased;

    ctx.lineWidth = 0.7;
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].opacity < 0.05) continue;
      for (let j = i + 1; j < stars.length; j++) {
        if (stars[j].opacity < 0.05) continue;

        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < currentMaxDist) {
          const distFade = 1 - dist / currentMaxDist;
          const pulse =
            Math.sin(timestamp * 0.0005 + (i + j) * 0.3) * 0.12 + 0.88;
          const opacity =
            distFade *
            0.25 *
            pulse *
            Math.min(stars[i].opacity, stars[j].opacity);

          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(${starRGB}, ${opacity})`;
          ctx.stroke();
        }
      }
    }

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
      ctx.lineWidth = 0.5;
      for (const star of stars) {
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170 && star.opacity > 0.1) {
          const opacity = (1 - dist / 170) * 0.15 * star.opacity;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = `rgba(${starRGB}, ${opacity})`;
          ctx.stroke();
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars(rect.width, rect.height);
      startTimeRef.current = 0;
    };

    resize();
    animationRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

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

    return () => {
      cancelAnimationFrame(animationRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initStars, animate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="relative h-full w-full"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </motion.div>
  );
}
