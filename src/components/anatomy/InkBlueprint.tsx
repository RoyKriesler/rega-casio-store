"use client";

const r2 = (n: number) => Math.round(n * 100) / 100;

import { useEffect, useRef, useState } from "react";

// An ink-on-paper technical drawing (front view + side profile) that draws itself in,
// with numbered callouts explained beside it.
export default function InkBlueprint({ diameter, callouts }: { diameter?: string; callouts: { label: string; detail: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setGo(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const line = (delay: number) => ({ strokeDasharray: 900, strokeDashoffset: go ? 0 : 900, transition: `stroke-dashoffset 2.2s ${delay}s cubic-bezier(.4,0,.2,1)` });
  const fade = (delay: number) => ({ opacity: go ? 1 : 0, transition: `opacity .8s ${delay}s` });
  const ink = "#2b2722";

  const pins = [
    { x: 150, y: 70 },
    { x: 150, y: 150 },
    { x: 238, y: 150 },
    { x: 360, y: 150 },
  ];

  return (
    <div ref={ref} className="grid gap-8 rounded-2xl border border-line bg-[#f3eee4] bg-[linear-gradient(rgba(43,39,34,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(43,39,34,.05)_1px,transparent_1px)] bg-[size:20px_20px] p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
      <svg viewBox="0 0 440 300" className="w-full" fill="none" stroke={ink} strokeWidth="1.1" direction="ltr" style={{ direction: "ltr" }} aria-hidden>
        {/* front view */}
        <g style={line(0)}>
          <circle cx="150" cy="150" r="80" />
          <circle cx="150" cy="150" r="68" />
          <circle cx="150" cy="150" r="64" strokeDasharray="2 3" />
          <path d="M120 70 L124 40 H176 L180 70 M120 230 L124 260 H176 L180 230" />
          <rect x="230" y="143" width="10" height="14" rx="2" />
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k / 12) * Math.PI * 2;
            return <line key={k} x1={r2(150 + Math.sin(a) * 56)} y1={r2(150 - Math.cos(a) * 56)} x2={r2(150 + Math.sin(a) * (k % 3 ? 50 : 46))} y2={r2(150 - Math.cos(a) * (k % 3 ? 50 : 46))} />;
          })}
          <line x1="150" y1="150" x2="150" y2="104" strokeWidth="2" />
          <line x1="150" y1="150" x2="186" y2="150" strokeWidth="2" />
        </g>
        {/* side profile */}
        <g style={line(0.5)}>
          <path d="M330 72 Q 322 150 330 228 H 372 Q 380 150 372 72 Z" />
          <line x1="372" y1="90" x2="380" y2="90" />
          <line x1="372" y1="210" x2="380" y2="210" />
          <rect x="372" y="142" width="9" height="16" rx="2" />
          <path d="M338 72 L342 44 H360 L364 72 M338 228 L342 256 H360 L364 228" />
        </g>
        {/* dimensions */}
        <g style={fade(1.6)} stroke={ink} strokeWidth=".8">
          <line x1="70" y1="275" x2="230" y2="275" />
          <path d="M70 271 V279 M230 271 V279" />
          {diameter && (
            <text x="150" y="292" fill={ink} stroke="none" fontSize="11" textAnchor="middle">
              ⌀ {diameter} mm
            </text>
          )}
          <line x1="300" y1="72" x2="300" y2="228" strokeDasharray="3 3" />
        </g>
        {/* numbered pins */}
        <g style={fade(2)}>
          {pins.slice(0, callouts.length).map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="9" fill="#f3eee4" stroke="#866a3a" />
              <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="9" fill="#866a3a" stroke="none">
                {i + 1}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <ol className="space-y-4 self-center">
        {callouts.map((c, i) => (
          <li key={c.label} className="flex gap-3" style={fade(2.1 + i * 0.15)}>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#866a3a] text-[11px] text-[#866a3a]">{i + 1}</span>
            <div>
              <p className="font-semibold text-[#2b2722]">{c.label}</p>
              <p className="text-[15px] text-[#4a443c]">{c.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
