import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import type { Artwork } from '../lib/artworks';

// Physics, in the SVG's own units (the artworks are ~1000–1400 units tall), scaled to pixels at runtime.
const CURSOR_RADIUS = 110;
const CURSOR_PUSH = 2;
const SPRING = 0.06;
const DAMPING = 0.82;
const RIPPLE_SPEED = 1.1; // units per ms
const RIPPLE_BAND = 50;
const RIPPLE_PUSH = 1.2;
const RIPPLE_LIFE = 1400; // ms
const REVEAL_DURATION = 2200; // ms
const MORPH_DURATION = 900; // ms each dot takes to travel
const MORPH_SPREAD = 650; // ms between the first dots (at the base) and the last (at the top) setting off
const MORPH_JITTER = 120; // ms of random stagger so the sweep feels organic

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

// Position along a Hilbert curve over a 1024×1024 grid; nearby points get nearby indices.
function hilbertIndex(nx: number, ny: number) {
  const n = 1024;
  let x = Math.max(0, Math.min(n - 1, Math.floor(nx * n)));
  let y = Math.max(0, Math.min(n - 1, Math.floor(ny * n)));
  let d = 0;
  for (let s = n / 2; s >= 1; s /= 2) {
    const rx = (x & s) > 0 ? 1 : 0;
    const ry = (y & s) > 0 ? 1 : 0;
    d += s * s * ((3 * rx) ^ ry);
    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      [x, y] = [y, x];
    }
  }
  return d;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface EngineOptions {
  align: 'left' | 'right';
  reduceMotion: boolean;
  onError: () => void;
}

interface Engine {
  show(src: string): void;
  prefetch(srcs: string[]): void;
  busy(): boolean;
  dispose(): void;
}

/**
 * Draws a halftone artwork as particles. Dots drift away from the cursor and spring back, a click
 * ripples through them, and showing a new artwork morphs the current dots into it.
 */
function createEngine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, options: EngineOptions): Engine {
  const { align, reduceMotion } = options;
  let disposed = false;
  let frame = 0;
  let token = 0;
  let art: Halftone | null = null;
  let fillColor = '';
  let cssW = 0;
  let cssH = 0;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;

  // Particles: current position/velocity in CSS pixels, the dot of `art` each one is heading for,
  // and where/how it started its current morph.
  let count = 0;
  let x = new Float32Array(0);
  let y = new Float32Array(0);
  let vx = new Float32Array(0);
  let vy = new Float32Array(0);
  let target = new Int32Array(0);
  let keep = new Uint8Array(0); // 0 for surplus particles that fade out during a morph
  let startX = new Float32Array(0);
  let startY = new Float32Array(0);
  let startSize = new Float32Array(0);
  let startAlpha = new Float32Array(0);
  let delay = new Float32Array(0);

  let morphStart = -1;
  let revealStart = 0;
  let revealing = false;
  const pointer = { x: 0, y: 0, active: false };
  const ripples: { x: number; y: number; t: number }[] = [];

  const layoutFor = (a: Halftone) => {
    const s = Math.min(cssW / a.width, cssH / a.height);
    return { s, ox: align === 'right' ? cssW - a.width * s : 0, oy: cssH - a.height * s };
  };

  const applyLayout = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = rect.width;
    cssH = rect.height;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (art) ({ s: scale, ox: offsetX, oy: offsetY } = layoutFor(art));
  };

  const restX = (i: number) => offsetX + art!.ox[target[i]] * scale;
  const restY = (i: number) => offsetY + art!.oy[target[i]] * scale;
  const progressOf = (i: number, now: number) =>
    morphStart < 0 ? 1 : easeInOut(Math.min(1, Math.max(0, (now - morphStart - delay[i]) / MORPH_DURATION)));
  const sizeOf = (i: number, e: number) => startSize[i] + (art!.size[target[i]] * scale - startSize[i]) * e;
  const alphaOf = (i: number, e: number) => startAlpha[i] + ((keep[i] ? art!.alpha[target[i]] : 0) - startAlpha[i]) * e;

  const allocate = (n: number) => {
    count = n;
    x = new Float32Array(n);
    y = new Float32Array(n);
    vx = new Float32Array(n);
    vy = new Float32Array(n);
    target = new Int32Array(n);
    keep = new Uint8Array(n);
    startX = new Float32Array(n);
    startY = new Float32Array(n);
    startSize = new Float32Array(n);
    startAlpha = new Float32Array(n);
    delay = new Float32Array(n);
  };

  // One particle per dot, at rest.
  const settleOn = (next: Halftone) => {
    art = next;
    ({ s: scale, ox: offsetX, oy: offsetY } = layoutFor(next));
    allocate(next.ox.length);
    for (let i = 0; i < count; i++) {
      target[i] = i;
      keep[i] = 1;
      x[i] = startX[i] = restX(i);
      y[i] = startY[i] = restY(i);
      startSize[i] = next.size[i] * scale;
      startAlpha[i] = next.alpha[i];
    }
    morphStart = -1;
  };

  // Pair current particles with the next artwork's dots along a Hilbert curve, so neighbours stay
  // neighbours in flight. Surplus particles fade out; missing ones split off and fade in.
  const morphTo = (next: Halftone, now: number) => {
    const n = count;
    const m = next.ox.length;
    const total = Math.max(n, m);
    const prev = { x, y, vx, vy, size: new Float32Array(n), alpha: new Float32Array(n) };
    for (let i = 0; i < n; i++) {
      prev.size[i] = sizeOf(i, 1);
      prev.alpha[i] = alphaOf(i, 1);
    }

    const { s, ox: nOffX, oy: nOffY } = layoutFor(next);
    const nextX = (q: number) => nOffX + next.ox[q] * s;
    const nextY = (q: number) => nOffY + next.oy[q] * s;
    const orderOld = Array.from({ length: n }, (_, i) => i).map(i => [hilbertIndex(prev.x[i] / cssW, prev.y[i] / cssH), i]);
    const orderNew = Array.from({ length: m }, (_, q) => q).map(q => [hilbertIndex(nextX(q) / cssW, nextY(q) / cssH), q]);
    orderOld.sort((a, b) => a[0] - b[0]);
    orderNew.sort((a, b) => a[0] - b[0]);

    allocate(total);
    const usedOld = new Uint8Array(n);
    const usedNew = new Uint8Array(m);
    for (let k = 0; k < total; k++) {
      const i = orderOld[Math.floor((k * n) / total)][1];
      const q = orderNew[Math.floor((k * m) / total)][1];
      x[k] = startX[k] = prev.x[i];
      y[k] = startY[k] = prev.y[i];
      vx[k] = prev.vx[i];
      vy[k] = prev.vy[i];
      startSize[k] = prev.size[i];
      startAlpha[k] = usedOld[i] ? 0 : prev.alpha[i];
      usedOld[i] = 1;
      target[k] = q;
      keep[k] = usedNew[q] ? 0 : 1;
      usedNew[q] = 1;
      // Sweep upward from the base, like the reveal.
      delay[k] = (1 - next.oy[q] / next.height) * MORPH_SPREAD + Math.random() * MORPH_JITTER;
    }

    art = next;
    ({ s: scale, ox: offsetX, oy: offsetY } = layoutFor(next));
    morphStart = now;
  };

  // Once a morph lands, drop the faded-out particles so there is exactly one per dot again.
  const finishMorph = () => {
    const kept: number[] = [];
    for (let i = 0; i < count; i++) if (keep[i]) kept.push(i);
    const old = { x, y, vx, vy, target };
    allocate(kept.length);
    kept.forEach((from, i) => {
      x[i] = old.x[from];
      y[i] = old.y[from];
      vx[i] = old.vx[from];
      vy[i] = old.vy[from];
      target[i] = old.target[from];
      keep[i] = 1;
      startSize[i] = art!.size[target[i]] * scale;
      startAlpha[i] = art!.alpha[target[i]];
    });
    morphStart = -1;
  };

  const draw = (now: number) => {
    ctx.clearRect(0, 0, cssW, cssH);
    if (!art) return;
    ctx.fillStyle = fillColor;

    const revealProgress = revealing ? Math.min(1, (now - revealStart) / REVEAL_DURATION) : 1;
    const front = (1 - Math.pow(1 - revealProgress, 3)) * 1.15; // sweep line, measured up from the base

    // Dots are batched into one path per run of equal opacity.
    let currentAlpha = -1;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const e = progressOf(i, now);
      let a = alphaOf(i, e);
      if (revealProgress < 1) {
        const heightUp = 1 - art.oy[target[i]] / art.height;
        a *= Math.min(1, Math.max(0, (front - heightUp) / 0.1));
      }
      if (a <= 0.01) continue;
      a = Math.round(a * 50) / 50;
      if (a !== currentAlpha) {
        ctx.fill();
        ctx.beginPath();
        ctx.globalAlpha = a;
        currentAlpha = a;
      }
      const s = Math.max(0.5, sizeOf(i, e));
      if (art.round) {
        ctx.moveTo(x[i] + s / 2, y[i]);
        ctx.arc(x[i], y[i], s / 2, 0, Math.PI * 2);
      } else {
        ctx.rect(x[i] - s / 2, y[i] - s / 2, s, s);
      }
    }
    ctx.fill();
    ctx.globalAlpha = 1;

    if (revealProgress >= 1) revealing = false;
  };

  const step = (now: number) => {
    frame = 0;
    if (!art) return;
    let moving = false;

    for (let r = ripples.length - 1; r >= 0; r--) {
      if (now - ripples[r].t > RIPPLE_LIFE) ripples.splice(r, 1);
    }

    const radius = CURSOR_RADIUS * scale;
    const r2 = radius * radius;
    const push = CURSOR_PUSH * scale;
    for (let i = 0; i < count; i++) {
      const e = progressOf(i, now);
      const tx = startX[i] + (restX(i) - startX[i]) * e;
      const ty = startY[i] + (restY(i) - startY[i]) * e;
      let fx = (tx - x[i]) * SPRING;
      let fy = (ty - y[i]) * SPRING;

      if (pointer.active) {
        const dx = x[i] - pointer.x;
        const dy = y[i] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const falloff = 1 - d / radius;
          fx += (dx / d) * falloff * falloff * push;
          fy += (dy / d) * falloff * falloff * push;
        }
      }

      for (const ripple of ripples) {
        const dx = tx - ripple.x;
        const dy = ty - ripple.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const age = now - ripple.t;
        const off = Math.abs(d - age * RIPPLE_SPEED * scale);
        const band = RIPPLE_BAND * scale;
        if (off < band) {
          const p = (1 - off / band) * (1 - age / RIPPLE_LIFE) * RIPPLE_PUSH * scale;
          fx += (dx / d) * p;
          fy += (dy / d) * p;
        }
      }

      vx[i] = (vx[i] + fx) * DAMPING;
      vy[i] = (vy[i] + fy) * DAMPING;
      x[i] += vx[i];
      y[i] += vy[i];

      if (!moving && (Math.abs(vx[i]) > 0.01 || Math.abs(vy[i]) > 0.01 || Math.abs(x[i] - tx) > 0.05)) moving = true;
    }

    if (morphStart >= 0 && now - morphStart > MORPH_SPREAD + MORPH_JITTER + MORPH_DURATION) finishMorph();

    draw(now);
    if (moving || ripples.length > 0 || revealing || morphStart >= 0) frame = requestAnimationFrame(step);
  };

  const kick = () => {
    if (!frame && !disposed) frame = requestAnimationFrame(step);
  };

  const toCanvas = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerMove = (event: PointerEvent) => {
    if (reduceMotion || event.pointerType === 'touch' || !art) return;
    Object.assign(pointer, toCanvas(event), { active: true });
    kick();
  };
  const onPointerLeave = () => {
    pointer.active = false;
    kick();
  };
  const onPointerDown = (event: PointerEvent) => {
    if (reduceMotion || !art) return;
    ripples.push({ ...toCanvas(event), t: performance.now() });
    kick();
  };

  const resizeObserver = new ResizeObserver(() => {
    const before = { offsetX, offsetY, scale };
    applyLayout();
    // Keep particles where they belong if the box changes size while at rest.
    if (art && morphStart < 0 && before.scale > 0) {
      for (let i = 0; i < count; i++) {
        x[i] = restX(i);
        y[i] = restY(i);
        startSize[i] = art.size[target[i]] * scale;
      }
    }
    if (!frame) draw(performance.now());
  });
  resizeObserver.observe(canvas);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointerdown', onPointerDown);
  applyLayout();

  return {
    show(src) {
      const request = ++token;
      loadHalftone(src)
        .then(next => {
          if (disposed || request !== token) return;
          // Tint from the theme palette when it defines one; otherwise keep the artwork's own colour.
          fillColor = getComputedStyle(document.documentElement).getPropertyValue('--statue').trim() || next.fill;
          const now = performance.now();
          if (!art) {
            settleOn(next);
            revealing = !reduceMotion;
            revealStart = now;
          } else if (reduceMotion) {
            settleOn(next);
          } else {
            if (morphStart >= 0) finishMorph();
            morphTo(next, now);
          }
          kick();
          if (!frame) draw(now);
        })
        .catch(() => {
          if (!disposed) options.onError();
        });
    },
    prefetch(srcs) {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idle(() => srcs.forEach(src => loadHalftone(src).catch(() => undefined)));
    },
    busy: () => morphStart >= 0,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
    },
  };
}

interface HalftoneArtProps {
  art: Artwork;
  /** Which bottom corner the artwork sits in when its box is wider than it. */
  align?: 'left' | 'right';
  className?: string;
  /** Makes the artwork a button; called on click or keyboard activation. */
  onActivate?: () => void;
  /** Accessible name for the button when `onActivate` is set. */
  activateLabel?: string;
  /** Other artworks to fetch in the background so switching to them is instant. */
  prefetch?: Artwork[];
}

/**
 * A halftone artwork as a field of particles, revealed with an upward sweep the first time it
 * scrolls into view. Changing `art` (or the theme) morphs the dots into the new artwork.
 */
export default function HalftoneArt({ art, align = 'left', className = '', onActivate, activateLabel, prefetch }: HalftoneArtProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [fallback, setFallback] = useState(false);
  const [visible, setVisible] = useState(false);
  const src = art.sources[theme];

  // Create the engine once per canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      setFallback(true);
      return;
    }
    const engine = createEngine(canvas, ctx, { align, reduceMotion, onError: () => setFallback(true) });
    engineRef.current = engine;

    // Load and reveal once the artwork is near the viewport, so a reveal below the fold isn't missed.
    let viewObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
    } else {
      viewObserver = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            viewObserver?.disconnect();
            setVisible(true);
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      viewObserver.observe(canvas);
    }

    return () => {
      viewObserver?.disconnect();
      engine.dispose();
      engineRef.current = null;
    };
  }, [align, reduceMotion]);

  // Show (or morph to) the current artwork.
  useEffect(() => {
    if (visible) engineRef.current?.show(src);
  }, [src, visible, align, reduceMotion]);

  const prefetchKey = prefetch?.map(a => a.sources[theme]).join('|') ?? '';
  useEffect(() => {
    if (visible && prefetchKey) engineRef.current?.prefetch(prefetchKey.split('|'));
  }, [prefetchKey, visible]);

  const content = fallback ? (
    <img
      src={src}
      alt={onActivate ? '' : art.alt}
      decoding="async"
      draggable={false}
      className={`statue-reveal size-full select-none object-contain ${align === 'right' ? 'object-right-bottom' : 'object-left-bottom'}`}
    />
  ) : (
    <canvas
      ref={canvasRef}
      role={onActivate ? undefined : 'img'}
      aria-label={onActivate ? undefined : art.alt}
      data-src={src}
      className="block size-full touch-manipulation"
    />
  );

  if (!onActivate) return <div className={className}>{content}</div>;

  return (
    <button
      type="button"
      aria-label={activateLabel}
      title={activateLabel}
      onClick={() => {
        if (!engineRef.current?.busy()) onActivate();
      }}
      className={`cursor-pointer ${className}`}
    >
      {content}
    </button>
  );
}
