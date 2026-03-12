"use client";

import { useRef, useEffect, useCallback } from "react";

// ── Star color palette ──
const STAR_COLORS = [
  [255, 255, 240],   // Warm white
  [220, 230, 255],   // Cool blue-white
  [255, 245, 220],   // Pale gold
  [200, 215, 255],   // Icy blue
  [255, 235, 210],   // Soft amber
  [240, 240, 255],   // Pure white-blue
] as const;

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  twinkleAmplitude: number;
  color: readonly [number, number, number];
  depth: number; // 0 = far, 1 = close
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  brightness: number;
}

interface StarFieldProps {
  count?: number;
  revealRadius?: number;
  className?: string;
}

export function StarField({
  count = 200,
  revealRadius = 280,
  className = "",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initStars = useCallback(
    (width: number, height: number) => {
      sizeRef.current = { w: width, h: height };
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        // Depth distribution: more far stars than close ones
        const depth = Math.pow(Math.random(), 1.5);
        const baseAlpha = 0.03 + depth * 0.22;
        const radius = 0.2 + depth * 1.4;
        const color =
          STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha,
          alpha: baseAlpha * 0.3,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.02 * (1 - depth * 0.5),
          twinkleAmplitude: 0.05 + Math.random() * 0.15,
          color,
          depth,
        });
      }
      starsRef.current = stars;
    },
    [count],
  );

  const spawnShootingStar = useCallback(() => {
    const { w, h } = sizeRef.current;
    if (w === 0) return;

    // Start from random edge position
    const startX = Math.random() * w * 0.8 + w * 0.1;
    const startY = Math.random() * h * 0.3;
    const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2;
    const speed = 4 + Math.random() * 6;

    shootingStarsRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 50 + Math.random() * 40,
      length: 40 + Math.random() * 60,
      brightness: 0.5 + Math.random() * 0.5,
    });
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    ctx.clearRect(0, 0, w, h);
    timeRef.current += 1;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const r2 = revealRadius * revealRadius;
    const constellationRadius = revealRadius * 0.8;
    const constellationR2 = constellationRadius * constellationRadius;

    // ── Draw stars ──
    const nearCursorStars: Star[] = [];

    for (const star of starsRef.current) {
      // Autonomous twinkling
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * star.twinkleAmplitude;
      const secondaryTwinkle =
        Math.sin(star.twinklePhase * 2.7 + star.depth * 5) * star.twinkleAmplitude * 0.3;
      const autonomousAlpha = star.baseAlpha + twinkle + secondaryTwinkle;

      const dx = star.x - mx;
      const dy = star.y - my;
      const dist2 = dx * dx + dy * dy;

      const targetAlpha =
        dist2 < r2
          ? 0.65 + 0.35 * (1 - Math.sqrt(dist2) / revealRadius)
          : Math.max(0, autonomousAlpha);

      // Smooth transition
      star.alpha += (targetAlpha - star.alpha) * 0.08;

      const [r, g, b] = star.color;

      // Main star body
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.alpha})`;
      ctx.fill();

      // Soft glow halo for moderately bright stars
      if (star.alpha > 0.15) {
        const glowRadius = star.radius * (3 + star.depth * 2);
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
          `rgba(${r}, ${g}, ${b}, ${star.alpha * 0.2})`,
        );
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Cross-shaped diffraction spikes for very bright stars
      if (star.alpha > 0.5 && star.depth > 0.6) {
        const spikeLen = star.radius * 6;
        const spikeAlpha = (star.alpha - 0.5) * 0.6;

        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(Math.PI / 4);

        for (let axis = 0; axis < 2; axis++) {
          const gradient2 = ctx.createLinearGradient(
            axis === 0 ? -spikeLen : 0,
            axis === 1 ? -spikeLen : 0,
            axis === 0 ? spikeLen : 0,
            axis === 1 ? spikeLen : 0,
          );
          gradient2.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
          gradient2.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${spikeAlpha})`);
          gradient2.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.strokeStyle = gradient2;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          if (axis === 0) {
            ctx.moveTo(-spikeLen, 0);
            ctx.lineTo(spikeLen, 0);
          } else {
            ctx.moveTo(0, -spikeLen);
            ctx.lineTo(0, spikeLen);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // Collect stars near cursor for constellation lines
      if (dist2 < constellationR2 && star.alpha > 0.1) {
        nearCursorStars.push(star);
      }
    }

    // ── Constellation lines ──
    if (nearCursorStars.length > 1) {
      const maxLineDistance = constellationRadius * 0.6;
      const maxLineD2 = maxLineDistance * maxLineDistance;

      for (let i = 0; i < nearCursorStars.length; i++) {
        for (let j = i + 1; j < nearCursorStars.length; j++) {
          const a = nearCursorStars[i];
          const b = nearCursorStars[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const dd2 = ddx * ddx + ddy * ddy;

          if (dd2 < maxLineD2) {
            const dist = Math.sqrt(dd2);
            const lineAlpha =
              Math.min(a.alpha, b.alpha) *
              0.15 *
              (1 - dist / maxLineDistance);

            // Blend colors of connected stars
            const [ar, ag, ab] = a.color;
            const [br, bg, bb] = b.color;
            const mr = Math.round((ar + br) / 2);
            const mg = Math.round((ag + bg) / 2);
            const mb = Math.round((ab + bb) / 2);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // ── Shooting stars ──
    const aliveShootingStars: ShootingStar[] = [];
    for (const ss of shootingStarsRef.current) {
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life += 1;

      const progress = ss.life / ss.maxLife;
      if (progress >= 1) continue;

      // Fade in quickly, fade out slowly
      const fadeIn = Math.min(progress * 5, 1);
      const fadeOut = 1 - Math.pow(progress, 2);
      const alpha = fadeIn * fadeOut * ss.brightness;

      // Trail
      const tailX = ss.x - (ss.vx / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * fadeOut;
      const tailY = ss.y - (ss.vy / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * fadeOut;

      const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(0.7, `rgba(220, 230, 255, ${alpha * 0.3})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head glow
      const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 3);
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      headGlow.addColorStop(1, `rgba(200, 220, 255, 0)`);
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = headGlow;
      ctx.fill();

      aliveShootingStars.push(ss);
    }
    shootingStarsRef.current = aliveShootingStars;

    // Randomly spawn shooting stars
    if (Math.random() < 0.003) {
      spawnShootingStar();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [revealRadius, spawnShootingStar]);

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
