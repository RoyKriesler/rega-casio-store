"use client";

import { useEffect, useState } from "react";

// A live analog wristwatch: case, lugs, leather strap, and hands set to the visitor's local time.
// Seconds sweep smoothly; with prefers-reduced-motion they tick once per second.

const CX = 200;
const CY = 330;
const r2 = (n: number) => Math.round(n * 100) / 100;

function hand(angleDeg: number, length: number, tail: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x1: r2(CX - Math.cos(a) * tail),
    y1: r2(CY - Math.sin(a) * tail),
    x2: r2(CX + Math.cos(a) * length),
    y2: r2(CY + Math.sin(a) * length),
  };
}

export default function WristWatch() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setNow(new Date());
    if (reduce) {
      const t = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(t);
    }
    let raf = 0;
    const loop = () => {
      setNow(new Date());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const h = now ? now.getHours() % 12 : 10;
  const m = now ? now.getMinutes() : 10;
  const s = now ? now.getSeconds() + now.getMilliseconds() / 1000 : 30;
  const day = now ? now.getDate() : 14;

  const hourA = (h + m / 60) * 30;
  const minA = (m + s / 60) * 6;
  const secA = s * 6;

  const hh = hand(hourA, 70, 14);
  const mh = hand(minA, 104, 16);
  const sh = hand(secA, 116, 28);

  const label = now
    ? `השעה עכשיו ${String(now.getHours()).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    : "שעון יד";

  return (
    <svg viewBox="0 0 400 660" role="img" aria-label={label} className="mx-auto h-auto w-full max-w-[220px] sm:max-w-[340px]">
      <defs>
        <linearGradient id="ww-strap" x1="0" x2="1">
          <stop offset="0" stopColor="#4a2f1d" />
          <stop offset="0.5" stopColor="#6b4329" />
          <stop offset="1" stopColor="#4a2f1d" />
        </linearGradient>
        <linearGradient id="ww-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f4f2" />
          <stop offset="0.45" stopColor="#b9bab8" />
          <stop offset="0.55" stopColor="#d9dad7" />
          <stop offset="1" stopColor="#8e908d" />
        </linearGradient>
        <radialGradient id="ww-dial" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#fbf8f1" />
          <stop offset="1" stopColor="#ece6d8" />
        </radialGradient>
      </defs>

      {/* Strap */}
      <path d="M140 0 H260 V200 H140 Z" fill="url(#ww-strap)" />
      <path d="M140 460 H260 V660 H140 Z" fill="url(#ww-strap)" />
      {[0, 460].map((y) => (
        <g key={y} stroke="#c9a77f" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7">
          <line x1="150" y1={y} x2="150" y2={y + 200} />
          <line x1="250" y1={y} x2="250" y2={y + 200} />
        </g>
      ))}
      {[530, 565, 600].map((y) => (
        <ellipse key={y} cx="200" cy={y} rx="5" ry="6" fill="#2b1a10" />
      ))}

      {/* Lugs */}
      <path d="M132 170 L150 215 H250 L268 170 Z" fill="url(#ww-steel)" />
      <path d="M132 490 L150 445 H250 L268 490 Z" fill="url(#ww-steel)" />

      {/* Crown */}
      <rect x="352" y="314" width="20" height="32" rx="4" fill="url(#ww-steel)" stroke="#8e908d" />
      <g stroke="#8e908d" strokeWidth="1">
        {[320, 326, 332, 338].map((y) => (
          <line key={y} x1="355" y1={y} x2="369" y2={y} />
        ))}
      </g>

      {/* Case and bezel */}
      <circle cx={CX} cy={CY} r="158" fill="url(#ww-steel)" />
      <circle cx={CX} cy={CY} r="146" fill="#cfd0cd" />
      <circle cx={CX} cy={CY} r="138" fill="url(#ww-dial)" />

      {/* Minute track */}
      {Array.from({ length: 60 }, (_, i) => {
        const a = ((i * 6 - 90) * Math.PI) / 180;
        const big = i % 5 === 0;
        const r1 = big ? 112 : 124;
        const rOut = 130;
        return (
          <line
            key={i}
            x1={r2(CX + Math.cos(a) * r1)}
            y1={r2(CY + Math.sin(a) * r1)}
            x2={r2(CX + Math.cos(a) * rOut)}
            y2={r2(CY + Math.sin(a) * rOut)}
            stroke="#1c1c1a"
            strokeWidth={big ? 4.5 : 1.2}
            strokeLinecap="butt"
          />
        );
      })}

      {/* Brand and date */}
      <text x={CX} y={CY - 52} textAnchor="middle" fontSize="20" fontWeight="600" fill="#1c1c1a" style={{ fontFamily: "var(--font-frank)" }}>
        רגע
      </text>
      <text x={CX} y={CY - 34} textAnchor="middle" fontSize="8" letterSpacing="2" fill="#6b6a64" style={{ fontFamily: "var(--font-plex-mono)" }}>
        AUTOMATIC
      </text>
      <rect x={CX + 62} y={CY - 11} width="30" height="22" fill="#fff" stroke="#9a9890" strokeWidth="1" />
      <text x={CX + 77} y={CY + 6} textAnchor="middle" fontSize="15" fill="#1c1c1a" style={{ fontFamily: "var(--font-plex-mono)" }}>
        {day}
      </text>

      {/* Hands */}
      <line {...hh} stroke="#1c1c1a" strokeWidth="9" strokeLinecap="round" />
      <line {...mh} stroke="#1c1c1a" strokeWidth="6" strokeLinecap="round" />
      <line {...sh} stroke="#c8102e" strokeWidth="2" strokeLinecap="round" />
      <circle cx={CX} cy={CY} r="8" fill="#1c1c1a" />
      <circle cx={CX} cy={CY} r="3.5" fill="#c8102e" />

      {/* Crystal glare */}
      <path d="M95 250 A138 138 0 0 1 230 196 A160 160 0 0 0 95 250 Z" fill="#fff" opacity="0.35" />
    </svg>
  );
}
