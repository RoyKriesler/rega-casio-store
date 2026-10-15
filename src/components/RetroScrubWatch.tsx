"use client";

import { useEffect, useRef, useState } from "react";

// Seven-segment map: a b c d e f g
const SEG: Record<string, number[]> = {
  "0": [1, 1, 1, 1, 1, 1, 0], "1": [0, 1, 1, 0, 0, 0, 0], "2": [1, 1, 0, 1, 1, 0, 1], "3": [1, 1, 1, 1, 0, 0, 1],
  "4": [0, 1, 1, 0, 0, 1, 1], "5": [1, 0, 1, 1, 0, 1, 1], "6": [1, 0, 1, 1, 1, 1, 1], "7": [1, 1, 1, 0, 0, 0, 0],
  "8": [1, 1, 1, 1, 1, 1, 1], "9": [1, 1, 1, 1, 0, 1, 1], " ": [0, 0, 0, 0, 0, 0, 0],
};
const PATHS = [
  "M6 2 L34 2 L29 7 L11 7 Z", "M35 3 L35 31 L30 28 L30 8 Z", "M35 35 L35 63 L30 58 L30 38 Z", "M6 64 L34 64 L29 59 L11 59 Z",
  "M5 35 L5 63 L10 58 L10 38 Z", "M5 3 L5 31 L10 28 L10 8 Z", "M7 33 L12 30 L28 30 L33 33 L28 36 L12 36 Z",
];
function Digit({ d, x, w = 40 }: { d: string; x: number; w?: number }) {
  const on = SEG[d] ?? SEG[" "];
  return (
    <g transform={`translate(${x} 0) scale(${w / 40}) skewX(-6)`}>
      {PATHS.map((p, i) => (
        <path key={i} d={p} fill="#1b2112" opacity={on[i] ? 0.88 : 0.06} />
      ))}
    </g>
  );
}

// LCD window position inside the photo (percent of image), measured from the generated image.
const LCD = { left: 37.5, top: 46.4, width: 24.8, height: 4.4 };

export default function RetroScrubWatch() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const live = p >= 0.97;
  const minutes = Math.round(p * 24 * 60);
  const shown = live && now ? now : new Date(2026, 0, 1, Math.floor(minutes / 60) % 24, minutes % 60, Math.round(p * 3600) % 60);
  const hh = String(shown.getHours()).padStart(2, " ");
  const mm = String(shown.getMinutes()).padStart(2, "0");
  const ss = String(shown.getSeconds()).padStart(2, "0");
  const colon = !live || shown.getSeconds() % 2 === 0;

  return (
    <section ref={ref} className="relative h-[260svh] bg-[#e9e4dc]">
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1300px] items-center gap-8 px-4 sm:px-8 md:grid-cols-2">
          <div className="order-2 text-[#1c1915] md:order-1">
            <p className="text-[13px] font-semibold tracking-wide text-[#866a3a]">{live ? "עכשיו" : "גללו כדי להריץ את היום"}</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">{live ? "זו השעה אצלך." : "עשרים וארבע שעות."}</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#4a443c]">
              הקלאסיקה הדיגיטלית של שנות השמונים: מסך קטן, מארז פלדה וצמיד שמתיישן יפה. גללו, והיום כולו עובר על המסך.
            </p>
            <div className="mt-8 h-px w-full bg-[#1c1915]/15">
              <div className="h-px bg-[#1c1915]" style={{ width: `${p * 100}%` }} />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[896/1280] h-[min(70svh,640px)]" role="img" aria-label={`שעון דיגיטלי שמראה ${hh.trim()}:${mm}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/retro-watch.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <svg
                className="absolute mix-blend-multiply"
                style={{ left: `${LCD.left}%`, top: `${LCD.top}%`, width: `${LCD.width}%`, height: `${LCD.height}%` }}
                viewBox="0 0 330 80"
                preserveAspectRatio="xMidYMid meet"
                direction="ltr"
                aria-hidden
              >
                <g transform="translate(20 6)">
                  <Digit d={hh[0]} x={0} />
                  <Digit d={hh[1]} x={46} />
                  <g opacity={colon ? 0.88 : 0.08} fill="#1b2112">
                    <rect x="96" y="18" width="7" height="7" />
                    <rect x="94" y="42" width="7" height="7" />
                  </g>
                  <Digit d={mm[0]} x={112} />
                  <Digit d={mm[1]} x={158} />
                  <g transform="translate(212 26)">
                    <Digit d={ss[0]} x={0} w={24} />
                    <Digit d={ss[1]} x={28} w={24} />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
