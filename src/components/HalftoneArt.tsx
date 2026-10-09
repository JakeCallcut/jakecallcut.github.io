import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import type { Artwork } from '../lib/artworks';

// Physics, in the SVG's own units (the artworks are ~900–1000 units across).
const CURSOR_RADIUS = 140;
const CURSOR_PUSH = 5;
const SPRING = 0.06;
const DAMPING = 0.82;
const RIPPLE_SPEED = 1.1; // units per ms
const RIPPLE_BAND = 60;
const RIPPLE_PUSH = 2.5;
const RIPPLE_LIFE = 1400; // ms
const REVEAL_DURATION = 2200; // ms

interface Halftone {
  width: number;
  height: number;
  fill: string;
  round: boolean;
  ox: Float32Array; // dot centres at rest
  oy: Float32Array;
  size: Float32Array; // side length, or diameter for round dots
  alpha: Float32Array;
}

const cache = new Map<string, Promise<Halftone>>();

// The halftone SVGs are a few <path>s (one per opacity) made of dot subpaths: squares
// ("M x y h s v s h-s z") or circles drawn as two arcs ("M x y a r r 0 1 0 2r 0 a r r 0 1 0 -2r 0 z").
function parseHalftone(svg: string): Halftone {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1].split(/[\s,]+/).map(Number) ?? [0, 0, 1000, 1000];
  const fill = svg.match(/<svg[^>]*\sfill="([^"]+)"/)?.[1] ?? '#4a4a4a';
  const ox: number[] = [];
  const oy: number[] = [];
  const size: number[] = [];
  const alpha: number[] = [];
  let round = false;

  for (const path of svg.matchAll(/<path[^>]*fill-opacity="([\d.]+)"[^>]*\sd="([^"]+)"/g)) {
    const a = Number(path[1]);
    for (const dot of path[2].matchAll(/M([\d.]+) ([\d.]+)([ha])([\d.]+)/g)) {
      const value = Number(dot[4]);
      if (dot[3] === 'a') {
        round = true;
        ox.push(Number(dot[1]) + value);
        oy.push(Number(dot[2]));
        size.push(value * 2);
      } else {
        ox.push(Number(dot[1]) + value / 2);
        oy.push(Number(dot[2]) + value / 2);
        size.push(value);
      }
      alpha.push(a);
    }
  }

  return {
    width: viewBox[2],
    height: viewBox[3],
    fill,
    round,
    ox: Float32Array.from(ox),
    oy: Float32Array.from(oy),
    size: Float32Array.from(size),
    alpha: Float32Array.from(alpha),
  };
}

function loadHalftone(src: string) {
  let pending = cache.get(src);
  if (!pending) {
    pending = fetch(src)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${src}`);
        return response.text();
      })
      .then(parseHalftone);
    pending.catch(() => cache.delete(src));
    cache.set(src, pending);
  }
  return pending;
}

interface HalftoneArtProps {
  art: Artwork;
  /** Which bottom corner the artwork sits in when its box is wider than it. */
  align?: 'left' | 'right';
  className?: string;
}

/**
 * A halftone artwork as a field of particles: dots drift away from the cursor and spring back,
 * and a click or tap sends a ripple through it. Drawn like object-contain, anchored to a bottom
 * corner, and revealed with an upward sweep the first time it scrolls into view.
 */
export default function HalftoneArt({ art, align = 'left', className = '' }: HalftoneArtProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const src = art.sources[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      setFallback(true);
      return;
    }

    let disposed = false;
    let started = false;
    let frame = 0;
    let data: Halftone | null = null;
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let cssW = 0;
    let cssH = 0;
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let revealStart = 0;
    let revealing = false;
    let fillColor = '';
    const pointer = { x: 0, y: 0, active: false };
    const ripples: { x: number; y: number; t: number }[] = [];

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = rect.width;
      cssH = rect.height;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (data) {
        scale = Math.min(cssW / data.width, cssH / data.height);
        offsetX = align === 'right' ? cssW - data.width * scale : 0;
        offsetY = cssH - data.height * scale;
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, cssW, cssH);
      if (!data) return;
      ctx.fillStyle = fillColor;

      const progress = revealing ? Math.min(1, (now - revealStart) / REVEAL_DURATION) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      const front = eased * 1.15; // sweep line, measured up from the base (0 → 1)

      // Dots are batched into one path per run of equal opacity.
      let currentAlpha = -1;
      ctx.beginPath();
      for (let i = 0; i < x.length; i++) {
        let a = data.alpha[i];
        if (progress < 1) {
          const heightUp = 1 - data.oy[i] / data.height;
          const visible = Math.min(1, Math.max(0, (front - heightUp) / 0.1));
          if (visible <= 0) continue;
          a *= visible;
        }
        if (a !== currentAlpha) {
          ctx.fill();
          ctx.beginPath();
          ctx.globalAlpha = a;
          currentAlpha = a;
        }
        const s = Math.max(0.5, data.size[i] * scale);
        const cx = offsetX + x[i] * scale;
        const cy = offsetY + y[i] * scale;
        if (data.round) {
          ctx.moveTo(cx + s / 2, cy);
          ctx.arc(cx, cy, s / 2, 0, Math.PI * 2);
        } else {
          ctx.rect(cx - s / 2, cy - s / 2, s, s);
        }
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      if (progress >= 1) revealing = false;
    };

    const step = (now: number) => {
      frame = 0;
      if (!data) return;
      let moving = false;

      if (!reduceMotion) {
        for (let r = ripples.length - 1; r >= 0; r--) {
          if (now - ripples[r].t > RIPPLE_LIFE) ripples.splice(r, 1);
        }

        const r2 = CURSOR_RADIUS * CURSOR_RADIUS;
        for (let i = 0; i < x.length; i++) {
          let fx = (data.ox[i] - x[i]) * SPRING;
          let fy = (data.oy[i] - y[i]) * SPRING;

          if (pointer.active) {
            const dx = x[i] - pointer.x;
            const dy = y[i] - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2 && d2 > 0.0001) {
              const d = Math.sqrt(d2);
              const falloff = 1 - d / CURSOR_RADIUS;
              const push = falloff * falloff * CURSOR_PUSH;
              fx += (dx / d) * push;
              fy += (dy / d) * push;
            }
          }

          for (const ripple of ripples) {
            const dx = data.ox[i] - ripple.x;
            const dy = data.oy[i] - ripple.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            const age = now - ripple.t;
            const off = Math.abs(d - age * RIPPLE_SPEED);
            if (off < RIPPLE_BAND) {
              const push = (1 - off / RIPPLE_BAND) * (1 - age / RIPPLE_LIFE) * RIPPLE_PUSH;
              fx += (dx / d) * push;
              fy += (dy / d) * push;
            }
          }

          vx[i] = (vx[i] + fx) * DAMPING;
          vy[i] = (vy[i] + fy) * DAMPING;
          x[i] += vx[i];
          y[i] += vy[i];

          if (!moving && (Math.abs(vx[i]) > 0.01 || Math.abs(vy[i]) > 0.01 || Math.abs(x[i] - data.ox[i]) > 0.05)) {
            moving = true;
          }
        }
      }

      draw(now);
      if (moving || ripples.length > 0 || revealing) frame = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(step);
    };

    const toArtwork = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left - offsetX) / scale,
        y: (event.clientY - rect.top - offsetY) / scale,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !data) return;
      const point = toArtwork(event);
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.active = true;
      kick();
    };
    const onPointerLeave = () => {
      pointer.active = false;
      kick();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (reduceMotion || !data) return;
      ripples.push({ ...toArtwork(event), t: performance.now() });
      kick();
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (!frame) draw(performance.now());
    });

    // Load and reveal once the artwork is near the viewport, so a reveal below the fold isn't missed.
    const start = () => {
      if (started) return;
      started = true;
      loadHalftone(src)
        .then(halftone => {
          if (disposed) return;
          data = halftone;
          // Tint from the theme palette when it defines one; otherwise keep the artwork's own colour.
          fillColor = getComputedStyle(document.documentElement).getPropertyValue('--statue').trim() || halftone.fill;
          x = Float32Array.from(halftone.ox);
          y = Float32Array.from(halftone.oy);
          vx = new Float32Array(x.length);
          vy = new Float32Array(x.length);
          layout();
          revealing = !reduceMotion;
          revealStart = performance.now();
          kick();
        })
        .catch(() => {
          if (!disposed) setFallback(true);
        });
    };

    let viewObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'undefined') {
      start();
    } else {
      viewObserver = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            viewObserver?.disconnect();
            start();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      viewObserver.observe(canvas);
    }

    resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      viewObserver?.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, [src, align, reduceMotion]);

  if (fallback) {
    return (
      <img
        src={src}
        alt={art.alt}
        decoding="async"
        draggable={false}
        className={`statue-reveal select-none object-contain ${align === 'right' ? 'object-right-bottom' : 'object-left-bottom'} ${className}`}
      />
    );
  }

  return <canvas ref={canvasRef} role="img" aria-label={art.alt} data-src={src} className={`touch-manipulation ${className}`} />;
}
