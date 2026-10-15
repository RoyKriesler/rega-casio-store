"use client";

const r2 = (n: number) => Math.round(n * 100) / 100;

import { useEffect, useRef, useState } from "react";

export type Part = { label: string; detail: string };

// Pinned section: as you scroll, the watch separates into its layers, each labelled.
export default function ExplodedView({ parts, dial = "#1f3a68" }: { parts: Part[]; dial?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const spread = ease(Math.min(1, p * 1.4));
  const layers = parts.length;
  const cx = 200,
    rx = 130,
    ry = 40;
  const baseY = 250;
  const gap = 62;
  const yOf = (i: number) => baseY + (i - (layers - 1) / 2) * gap * spread;

  const draw = (i: number) => {
    const y = yOf(i);
    switch (i) {
      case 0: // crystal
        return (
          <g>
            <ellipse cx={cx} cy={y} rx={rx - 12} ry={ry - 4} fill="url(#glass)" stroke="#9aa6b2" strokeWidth="1" />
            <ellipse cx={cx - 30} cy={y - 10} rx={40} ry={8} fill="#fff" opacity="0.5" />
          </g>
        );
      case 1: // bezel
        return (
          <g>
            <ellipse cx={cx} cy={y + 6} rx={rx} ry={ry} fill="#9da2a6" />
            <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill="url(#steel)" />
            <ellipse cx={cx} cy={y} rx={rx - 16} ry={ry - 6} fill="#f6f3ee" />
          </g>
        );
      case 2: // dial
        return (
          <g>
            <ellipse cx={cx} cy={y} rx={rx - 18} ry={ry - 7} fill={dial} />
            {Array.from({ length: 12 }, (_, k) => {
              const a = (k / 12) * Math.PI * 2;
              return <line key={k} x1={r2(cx + Math.sin(a) * (rx - 32))} y1={r2(y - Math.cos(a) * (ry - 12))} x2={r2(cx + Math.sin(a) * (rx - 44))} y2={r2(y - Math.cos(a) * (ry - 16))} stroke="#e8e8e8" strokeWidth={k % 3 ? 1.5 : 3} />;
            })}
            <line x1={cx} y1={y} x2={cx + 40} y2={y - 14} stroke="#f2f2f2" strokeWidth="4" strokeLinecap="round" />
            <line x1={cx} y1={y} x2={cx - 70} y2={y - 8} stroke="#f2f2f2" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 3: // movement
        return (
          <g>
            <ellipse cx={cx} cy={y} rx={rx - 24} ry={ry - 9} fill="#b08a4a" />
            {[[-40, 0, 26], [30, -4, 18], [10, 10, 12], [-6, -10, 9]].map(([dx, dy, r], k) => (
              <g key={k}>
                <ellipse cx={cx + dx} cy={y + dy} rx={r} ry={r * 0.3} fill="none" stroke="#e7c27a" strokeWidth="2" strokeDasharray="3 2" />
                <ellipse cx={cx + dx} cy={y + dy} rx={r * 0.25} ry={r * 0.08} fill="#8b1e2b" />
              </g>
            ))}
          </g>
        );
      case 4: // case
        return (
          <g>
            <path d={`M ${cx - rx} ${y} v 22 a ${rx} ${ry} 0 0 0 ${rx * 2} 0 v -22`} fill="#a9adb1" />
            <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill="url(#steel)" />
            <ellipse cx={cx} cy={y} rx={rx - 10} ry={ry - 4} fill="#8d9195" />
            <rect x={cx + rx - 4} y={y - 6} width="18" height="14" rx="3" fill="url(#steel)" />
          </g>
        );
      default: // caseback
        return (
          <g>
            <ellipse cx={cx} cy={y + 5} rx={rx - 8} ry={ry - 3} fill="#9da2a6" />
            <ellipse cx={cx} cy={y} rx={rx - 8} ry={ry - 3} fill="url(#steel)" />
            <ellipse cx={cx} cy={y} rx={rx - 40} ry={ry - 13} fill="url(#glass)" stroke="#9aa6b2" />
          </g>
        );
    }
  };

  return (
    <section ref={ref} className="relative h-[240svh]">
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] items-center overflow-hidden">
        <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
          <svg viewBox="0 0 400 500" className="mx-auto h-[min(70svh,560px)] w-auto" aria-hidden>
            <defs>
              <linearGradient id="steel" x1="0" x2="1">
                <stop offset="0" stopColor="#c9ccd0" />
                <stop offset=".45" stopColor="#f3f4f5" />
                <stop offset=".55" stopColor="#d9dcdf" />
                <stop offset="1" stopColor="#a7abaf" />
              </linearGradient>
              <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity=".7" />
                <stop offset="1" stopColor="#b9c7d3" stopOpacity=".25" />
              </linearGradient>
            </defs>
            {[...parts.keys()].reverse().map((i) => (
              <g key={i}>{draw(i)}</g>
            ))}
          </svg>
          <ol className="space-y-5">
            {parts.map((part, i) => (
              <li
                key={part.label}
                className="flex gap-4 border-t border-line pt-3 transition-all duration-500"
                style={{ opacity: spread > (i + 0.3) / layers ? 1 : 0.15, transform: `translateX(${spread > (i + 0.3) / layers ? 0 : -12}px)` }}
              >
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <div>
                  <p className="font-semibold">{part.label}</p>
                  <p className="text-[15px] text-ink-soft">{part.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
