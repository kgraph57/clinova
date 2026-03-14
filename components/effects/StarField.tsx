"use client";

import { useRef, useEffect, useCallback } from "react";

// ── Color palette ──
const STAR_PALETTES = [
  [255, 252, 240], // Warm white
  [210, 225, 255], // Cool blue
  [255, 240, 210], // Pale gold
  [190, 210, 255], // Icy blue
  [255, 230, 205], // Soft amber
  [235, 240, 255], // Crisp white
] as const;

// ── Types ──
interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
  speed: number;
  amplitude: number;
  color: readonly number[];
  depth: number; // 0..1 — 0 = far, 1 = near
  parallaxX: number;
  parallaxY: number;
  birthDelay: number; // radial entrance delay
  born: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trailLen: number;
  brightness: number;
  particles: MeteorParticle[];
}

interface MeteorParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: number[];
  opacity: number;
  phase: number;
  driftX: number;
  driftY: number;
}

interface StarFieldProps {
  count?: number;
  revealRadius?: number;
  className?: string;
}

// ── Sprite cache ──
const spriteCache = new Map<string, HTMLCanvasElement>();

function getStarSprite(
  r: number,
  g: number,
  b: number,
  radius: number,
): HTMLCanvasElement {
  const key = `${r}-${g}-${b}-${Math.round(radius * 10)}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  const size = Math.ceil((radius * 8 + 4) * 2);
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const cx = c.getContext("2d");
  if (!cx) return c;

  const center = size / 2;

  // Outer glow
  const glow = cx.createRadialGradient(center, center, 0, center, center, radius * 4);
  glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
  glow.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.08)`);
  glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  cx.fillStyle = glow;
  cx.fillRect(0, 0, size, size);

  // Core
  const core = cx.createRadialGradient(center, center, 0, center, center, radius);
  core.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  core.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.6)`);
  core.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  cx.fillStyle = core;
  cx.beginPath();
  cx.arc(center, center, radius * 1.5, 0, Math.PI * 2);
  cx.fill();

  spriteCache.set(key, c);
  return c;
}

export function StarField({
  count = 240,
  revealRadius = 300,
  className = "",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const entranceRef = useRef(0); // 0..1 entrance progress

  // ── Init stars ──
  const initStars = useCallback(
    (w: number, h: number) => {
      sizeRef.current = { w, h };
      entranceRef.current = 0;
      const centerX = w * 0.5;
      const centerY = h * 0.6;
      const maxDist = Math.sqrt(w * w + h * h) * 0.5;

      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.pow(Math.random(), 1.6);
        const baseAlpha = 0.02 + depth * 0.2;
        const radius = 0.3 + depth * 1.6;
        const color = STAR_PALETTES[Math.floor(Math.random() * STAR_PALETTES.length)];

        const x = Math.random() * w;
        const y = Math.random() * h;

        // Birth delay based on distance from center
        const dx = x - centerX;
        const dy = y - centerY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const birthDelay = (distFromCenter / maxDist) * 0.7 + Math.random() * 0.15;

        stars.push({
          x,
          y,
          radius,
          baseAlpha,
          alpha: 0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.018 * (1 - depth * 0.4),
          amplitude: 0.06 + Math.random() * 0.16,
          color,
          depth,
          parallaxX: 0,
          parallaxY: 0,
          birthDelay,
          born: false,
        });
      }
      starsRef.current = stars;

      // ── Init nebulae ──
      const nebulae: Nebula[] = [
        { x: w * 0.2, y: h * 0.5, radius: w * 0.35, color: [100, 50, 200], opacity: 0.04, phase: 0, driftX: 0.08, driftY: 0.03 },
        { x: w * 0.75, y: h * 0.3, radius: w * 0.28, color: [30, 120, 200], opacity: 0.035, phase: 2, driftX: -0.05, driftY: 0.06 },
        { x: w * 0.5, y: h * 0.8, radius: w * 0.25, color: [50, 180, 150], opacity: 0.025, phase: 4, driftX: 0.04, driftY: -0.04 },
      ];
      nebulaeRef.current = nebulae;
    },
    [count],
  );

  // ── Spawn meteor ──
  const spawnMeteor = useCallback(() => {
    const { w, h } = sizeRef.current;
    if (w === 0) return;
    const startX = w * 0.1 + Math.random() * w * 0.7;
    const startY = Math.random() * h * 0.25;
    const angle = Math.PI * 0.12 + Math.random() * Math.PI * 0.25;
    const speed = 5 + Math.random() * 7;

    meteorsRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 45 + Math.random() * 35,
      trailLen: 50 + Math.random() * 70,
      brightness: 0.6 + Math.random() * 0.4,
      particles: [],
    });
  }, []);

  // ── Draw loop ──
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    frameRef.current += 1;
    ctx.clearRect(0, 0, w, h);

    // Entrance progress (1.5 seconds at 60fps)
    if (entranceRef.current < 1) {
      entranceRef.current = Math.min(1, entranceRef.current + 0.011);
    }
    const entrance = entranceRef.current;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const hasPointer = mouseRef.current.active;
    const r2 = revealRadius * revealRadius;

    // ── Parallax offset from mouse ──
    const parallaxCenterX = hasPointer ? (mx / w - 0.5) : 0;
    const parallaxCenterY = hasPointer ? (my / h - 0.5) : 0;

    // ── Nebulae ──
    for (const neb of nebulaeRef.current) {
      neb.phase += 0.003;
      const nx = neb.x + Math.sin(neb.phase * 0.7) * 20 + neb.driftX;
      const ny = neb.y + Math.cos(neb.phase * 0.5) * 15 + neb.driftY;
      const pulsedR = neb.radius * (1 + Math.sin(neb.phase) * 0.06);

      // Parallax for nebulae (very subtle - far away)
      const nebPX = nx + parallaxCenterX * -8;
      const nebPY = ny + parallaxCenterY * -8;

      const nebOpacity = neb.opacity * Math.min(entrance * 2, 1);

      const grad = ctx.createRadialGradient(nebPX, nebPY, 0, nebPX, nebPY, pulsedR);
      grad.addColorStop(0, `rgba(${neb.color[0]}, ${neb.color[1]}, ${neb.color[2]}, ${nebOpacity})`);
      grad.addColorStop(0.5, `rgba(${neb.color[0]}, ${neb.color[1]}, ${neb.color[2]}, ${nebOpacity * 0.4})`);
      grad.addColorStop(1, `rgba(0, 0, 0, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(nebPX, nebPY, pulsedR, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Stars ──
    for (const star of starsRef.current) {
      // Birth animation
      if (!star.born) {
        if (entrance >= star.birthDelay) {
          star.born = true;
        } else {
          continue;
        }
      }

      const birthProgress = Math.min(
        (entrance - star.birthDelay) / 0.2,
        1,
      );
      const birthEase = 1 - Math.pow(1 - Math.max(0, birthProgress), 3);

      // Twinkling
      star.phase += star.speed;
      const twinkle1 = Math.sin(star.phase) * star.amplitude;
      const twinkle2 = Math.sin(star.phase * 2.3 + star.depth * 4) * star.amplitude * 0.25;
      const autoAlpha = star.baseAlpha + twinkle1 + twinkle2;

      // Parallax — deeper stars move less
      const parallaxStrength = 12 + star.depth * 28;
      star.parallaxX += (parallaxCenterX * parallaxStrength - star.parallaxX) * 0.03;
      star.parallaxY += (parallaxCenterY * parallaxStrength - star.parallaxY) * 0.03;

      const sx = star.x + star.parallaxX;
      const sy = star.y + star.parallaxY;

      // Mouse proximity
      const dx = sx - mx;
      const dy = sy - my;
      const dist2 = dx * dx + dy * dy;

      const targetAlpha =
        hasPointer && dist2 < r2
          ? autoAlpha + 0.3 * (1 - Math.sqrt(dist2) / revealRadius)
          : Math.max(0, autoAlpha);

      star.alpha += (targetAlpha - star.alpha) * 0.04;
      const finalAlpha = star.alpha * birthEase;
      if (finalAlpha < 0.005) continue;

      const [cr, cg, cb] = star.color;

      // Draw with sprite for performance
      const sprite = getStarSprite(cr, cg, cb, star.radius);
      const spriteSize = sprite.width;
      ctx.globalAlpha = finalAlpha;
      ctx.drawImage(
        sprite,
        sx - spriteSize / 2,
        sy - spriteSize / 2,
      );
      ctx.globalAlpha = 1;

      // Diffraction spikes for bright near stars
      if (finalAlpha > 0.45 && star.depth > 0.55) {
        const spikeLen = star.radius * 8 * birthEase;
        const spikeAlpha = (finalAlpha - 0.45) * 0.5;

        ctx.save();
        ctx.translate(sx, sy);

        // 4-point star spikes (45° rotated)
        for (let a = 0; a < 4; a++) {
          const angle = (a * Math.PI) / 4 + Math.PI / 8;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const len = a % 2 === 0 ? spikeLen : spikeLen * 0.6;

          const grad = ctx.createLinearGradient(0, 0, cos * len, sin * len);
          grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${spikeAlpha})`);
          grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(cos * len, sin * len);
          ctx.stroke();

          // Mirror
          const grad2 = ctx.createLinearGradient(0, 0, -cos * len, -sin * len);
          grad2.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${spikeAlpha})`);
          grad2.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
          ctx.strokeStyle = grad2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-cos * len, -sin * len);
          ctx.stroke();
        }
        ctx.restore();
      }

    }

    // ── Meteors ──
    const aliveMeteors: Meteor[] = [];
    for (const m of meteorsRef.current) {
      m.x += m.vx;
      m.y += m.vy;
      m.life += 1;

      const progress = m.life / m.maxLife;
      if (progress >= 1 && m.particles.length === 0) continue;

      if (progress < 1) {
        const fadeIn = Math.min(progress * 6, 1);
        const fadeOut = 1 - Math.pow(progress, 1.5);
        const alpha = fadeIn * fadeOut * m.brightness;

        // Spawn debris particles
        if (Math.random() < 0.6) {
          m.particles.push({
            x: m.x + (Math.random() - 0.5) * 2,
            y: m.y + (Math.random() - 0.5) * 2,
            vx: m.vx * 0.1 + (Math.random() - 0.5) * 1.5,
            vy: m.vy * 0.1 + (Math.random() - 0.5) * 1.5 - 0.5,
            life: 0,
            maxLife: 15 + Math.random() * 20,
            size: 0.3 + Math.random() * 0.8,
          });
        }

        // Trail
        const speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const nx = m.vx / speed;
        const ny = m.vy / speed;
        const tailX = m.x - nx * m.trailLen * fadeOut;
        const tailY = m.y - ny * m.trailLen * fadeOut;

        const trailGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        trailGrad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        trailGrad.addColorStop(0.5, `rgba(200, 220, 255, ${alpha * 0.15})`);
        trailGrad.addColorStop(0.85, `rgba(220, 235, 255, ${alpha * 0.5})`);
        trailGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head bloom
        const headR = 4;
        const headGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, headR);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        headGlow.addColorStop(0.3, `rgba(200, 225, 255, ${alpha * 0.5})`);
        headGlow.addColorStop(1, `rgba(150, 200, 255, 0)`);
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, headR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Debris particles
      const aliveParticles: MeteorParticle[] = [];
      for (const p of m.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life += 1;

        const pp = p.life / p.maxLife;
        if (pp >= 1) continue;

        const pAlpha = (1 - pp) * 0.6;
        ctx.fillStyle = `rgba(220, 235, 255, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - pp * 0.5), 0, Math.PI * 2);
        ctx.fill();

        aliveParticles.push(p);
      }
      m.particles = aliveParticles;

      if (progress < 1 || aliveParticles.length > 0) {
        aliveMeteors.push(m);
      }
    }
    meteorsRef.current = aliveMeteors;

    // Random meteor spawn (~every 5-8s)
    if (Math.random() < 0.003) {
      spawnMeteor();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [revealRadius, spawnMeteor]);

  // ── Setup ──
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
      spriteCache.clear();
      initStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Mobile gyroscope
    let gyroCleanup: (() => void) | undefined;
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      const beta = e.beta ?? 0;  // -180..180 (front-back tilt)
      const gamma = e.gamma ?? 0; // -90..90 (left-right tilt)
      const { w, h } = sizeRef.current;
      // Map tilt to a "virtual cursor" position
      mouseRef.current = {
        x: w * 0.5 + (gamma / 45) * w * 0.3,
        y: h * 0.5 + ((beta - 45) / 45) * h * 0.3,
        active: true,
      };
    };

    // Request permission on iOS
    const setupGyro = async () => {
      try {
        const DOE = DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<string>;
        };
        if (typeof DOE.requestPermission === "function") {
          // iOS 13+ — only works on user gesture, so we listen for first touch
          const onTouch = async () => {
            try {
              const perm = await DOE.requestPermission!();
              if (perm === "granted") {
                window.addEventListener("deviceorientation", onDeviceOrientation);
              }
            } catch { /* user denied */ }
            window.removeEventListener("touchstart", onTouch);
          };
          window.addEventListener("touchstart", onTouch, { once: true });
          gyroCleanup = () => {
            window.removeEventListener("touchstart", onTouch);
            window.removeEventListener("deviceorientation", onDeviceOrientation);
          };
        } else {
          // Android / non-iOS
          window.addEventListener("deviceorientation", onDeviceOrientation);
          gyroCleanup = () => {
            window.removeEventListener("deviceorientation", onDeviceOrientation);
          };
        }
      } catch { /* not supported */ }
    };

    // Only enable gyro on touch devices
    if ("ontouchstart" in window) {
      setupGyro();
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      gyroCleanup?.();
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
