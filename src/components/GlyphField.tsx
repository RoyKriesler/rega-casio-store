"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const rnd = () => CHARS[(Math.random() * CHARS.length) | 0];

export type GlyphFieldHandle = {
  // Ripple from a point in CSS pixels relative to the field (defaults to the centre).
  burst: (x?: number, y?: number, strength?: number) => void;
  // Make the glyphs in the middle row spell `text` for a moment.
  spell: (text: string) => void;
};

// A field of monospace glyphs that keep mutating, densest in a soft drifting blob and fading
// to nothing at the edges. Clicks send a ring outward that scrambles and brightens the glyphs
// it passes. Canvas-based, one draw per frame; static under prefers-reduced-motion.
const GlyphField = forwardRef<
  GlyphFieldHandle,
  {
    className?: string;
    color?: string; // rgb triplet, e.g. "28,25,21"
    accent?: string; // ring colour, rgb triplet
    cell?: number; // font size in px
    base?: number; // 0..1 idle density; 0 = only ripples are visible
    interactive?: boolean; // click/tap to ripple, pointer lifts glyphs under it
  }
>(function GlyphField({ className = "", color = "28,25,21", accent = "140,109,63", cell = 13, base = 0.55, interactive = true }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<{ x: number; y: number; t: number; s: number }[]>([]);
  const pointer = useRef<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });
  const spellRef = useRef<{ text: string; t: number } | null>(null);
  const size = useRef({ w: 0, h: 0 });

  useImperativeHandle(ref, () => ({
    burst(x, y, s = 1) {
      const { w, h } = size.current;
      ripples.current.push({ x: x ?? w / 2, y: y ?? h / 2, t: performance.now(), s });
    },
    spell(text) {
      // Glyphs are drawn left to right, so Hebrew is stored reversed to read correctly.
      const rtl = /[\u0590-\u05FF]/.test(text);
      spellRef.current = { text: rtl ? [...text].reverse().join("") : text, t: performance.now() };
    },
  }));

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Canvas cannot read CSS variables in ctx.font, so resolve the mono family once.
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim() || "ui-monospace";
    let cols = 0,
      rows = 0,
      chars: string[] = [],
      seed: number[] = [];
    const cw = cell * 0.62,
      ch = cell * 1.35;

    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      size.current = { w: r.width, h: r.height };
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(r.width / cw);
      rows = Math.ceil(r.height / ch);
      chars = Array.from({ length: cols * rows }, rnd);
      seed = Array.from({ length: cols * rows }, () => Math.random());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    let raf = 0;
    const draw = (now: number) => {
      const { w, h } = size.current;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `500 ${cell}px ${mono}, ui-monospace, monospace`;
      ctx.textBaseline = "top";
      const t = now / 1000;
      // Drifting blob centre, like the density cloud in the reference.
      const bx = w * (0.5 + 0.18 * Math.sin(t * 0.13)),
        by = h * (0.45 + 0.14 * Math.cos(t * 0.17));
      const br = Math.max(w, h) * 0.55;
      ripples.current = ripples.current.filter((r) => now - r.t < 1600);
      const sp = spellRef.current && now - spellRef.current.t < 2600 ? spellRef.current : null;
      const spRow = Math.floor(rows / 2),
        spCol = sp ? Math.floor((cols - sp.text.length) / 2) : 0;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const px = x * cw,
            py = y * ch;
          if (!reduce && Math.random() < 0.02) chars[i] = rnd();
          // idle density: soft blob, edge vignette, per-cell noise
          const d = Math.hypot(px - bx, py - by) / br;
          const edge = Math.min(px / (w * 0.12), (w - px) / (w * 0.12), py / (h * 0.12), (h - py) / (h * 0.12), 1);
          let a = base * Math.max(0, 1 - d) * Math.max(0, edge) * (0.25 + 0.75 * seed[i]);
          let ring = 0;
          for (const r of ripples.current) {
            const age = (now - r.t) / 1000;
            const rad = age * 520 * r.s;
            const dist = Math.hypot(px - r.x, py - r.y);
            const band = Math.abs(dist - rad);
            if (band < 46) {
              const k = (1 - band / 46) * (1 - age / 1.6);
              ring = Math.max(ring, k);
              if (!reduce && Math.random() < 0.5) chars[i] = rnd();
            }
          }
          if (pointer.current.on) {
            const pd = Math.hypot(px - pointer.current.x, py - pointer.current.y);
            if (pd < 120) a = Math.max(a, (1 - pd / 120) * 0.5);
          }
          let c = chars[i];
          let spelled = false;
          if (sp && y === spRow && x >= spCol && x < spCol + sp.text.length) {
            const age = (now - sp.t) / 1000;
            const k = x - spCol;
            // letters lock in left to right, then fade out
            if (age > 0.25 + k * 0.05) {
              c = sp.text[k];
              spelled = true;
            }
          }
          if (spelled) {
            const age = (now - sp!.t) / 1000;
            ctx.fillStyle = `rgba(${accent},${Math.min(1, 2.6 - age)})`;
          } else if (ring > 0.02) {
            ctx.fillStyle = `rgba(${accent},${Math.min(1, a + ring)})`;
          } else {
            if (a < 0.015) continue;
            ctx.fillStyle = `rgba(${color},${a})`;
          }
          ctx.fillText(c, px, py);
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [cell, base, color, accent]);

  const local = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={`block h-full w-full ${className}`}
      onPointerDown={
        interactive
          ? (e) => {
              const p = local(e);
              ripples.current.push({ ...p, t: performance.now(), s: 1 });
            }
          : undefined
      }
      onPointerMove={interactive ? (e) => (pointer.current = { ...local(e), on: true }) : undefined}
      onPointerLeave={interactive ? () => (pointer.current.on = false) : undefined}
    />
  );
});

export default GlyphField;
