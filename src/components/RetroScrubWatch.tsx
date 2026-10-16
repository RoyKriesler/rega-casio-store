"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { casioHeroPhoto, photoUrl } from "@/data/products";

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

// LCD window inside the photo, in percent of the square image (measured by colour scan of the
// 960px thumbnail: x 276-692, y 365-547). The SVG viewBox uses those same pixels (417 x 183).
const LCD = { left: 28.75, top: 38.02, width: 43.44, height: 19.06 };
const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

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
    <section ref={ref} className="relative h-[260svh] bg-[#ebe6de]">
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] items-center overflow-hidden bg-[#ebe6de]">
        <div className="mx-auto grid w-full max-w-[1300px] items-center gap-8 px-4 sm:px-8 md:grid-cols-2">
          <div className="order-2 text-[#1c1915] md:order-1">
            <p className="text-[13px] font-semibold tracking-wide text-[#866a3a]">{live ? "עכשיו" : "גללו כדי להריץ את היום"}</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] font-extralight tracking-tight sm:text-7xl">{live ? "זו השעה אצלך." : "עשרים וארבע שעות."}</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#4a443c]">
              הדיגיטלי הקלאסי של קסיו: מסך קטן, מארז שרף ורצועת גומי. גללו, והיום כולו עובר על המסך.
            </p>
            <div className="mt-8 h-px w-full bg-[#1c1915]/15">
              <div className="h-px bg-[#1c1915]" style={{ width: `${p * 100}%` }} />
            </div>
            <Link href="/product/f91w" className="mt-8 inline-block bg-cta px-7 py-3.5 text-[15px] font-semibold text-on-cta transition-opacity hover:opacity-85">
              לדגם הזה
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-[min(62svh,620px)] mix-blend-multiply" role="img" aria-label={`שעון קסיו דיגיטלי שמראה ${hh.trim()}:${mm}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl(casioHeroPhoto.id, 1280)} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <svg
                className="absolute"
                style={{ left: `${LCD.left}%`, top: `${LCD.top}%`, width: `${LCD.width}%`, height: `${LCD.height}%` }}
                viewBox="0 0 417 183"
                preserveAspectRatio="none"
                direction="ltr"
                aria-hidden
              >
                <defs>
                  <radialGradient id="lcd-bg" cx="50%" cy="55%" r="65%">
                    <stop offset="0" stopColor="#eef6cb" />
                    <stop offset="0.75" stopColor="#e9f1c6" />
                    <stop offset="1" stopColor="#dde5ba" />
                  </radialGradient>
                  <filter id="lcd-soft" x="-5%" y="-5%" width="110%" height="110%">
                    <feGaussianBlur stdDeviation="1.6" />
                  </filter>
                  <filter id="lcd-ink" x="-5%" y="-5%" width="110%" height="110%">
                    <feGaussianBlur stdDeviation="0.5" />
                  </filter>
                </defs>
                {/* cover the digits printed in the photo */}
                <rect x="9" y="10" width="399" height="164" rx="5" fill="url(#lcd-bg)" filter="url(#lcd-soft)" />
                <g filter="url(#lcd-ink)">
                  {/* top row: 24H, day, date */}
                  <text x="30" y="100" fontFamily="var(--font-plex-mono), monospace" fontWeight="700" fontSize="17" fill="#1b2112" opacity="0.85">
                    24H
                  </text>
                  <text x="108" y="64" fontFamily="var(--font-plex-mono), monospace" fontWeight="700" fontSize="44" fill="#1b2112" opacity="0.88" transform="skewX(-6)" letterSpacing="3">
                    {DAYS[shown.getDay()]}
                  </text>
                  <g transform="translate(330 22)">
                    <Digit d={String(shown.getDate()).padStart(2, " ")[0]} x={0} w={26} />
                    <Digit d={String(shown.getDate()).padStart(2, " ")[1]} x={32} w={26} />
                  </g>
                  {/* main row: HH:MM and small seconds */}
                  <g transform="translate(70 76)">
                    <Digit d={hh[0]} x={0} w={52} />
                    <Digit d={hh[1]} x={60} w={52} />
                    <g opacity={colon ? 0.88 : 0.08} fill="#1b2112">
                      <rect x="124" y="22" width="9" height="9" />
                      <rect x="121" y="55" width="9" height="9" />
                    </g>
                    <Digit d={mm[0]} x={144} w={52} />
                    <Digit d={mm[1]} x={204} w={52} />
                    <g transform="translate(266 40)">
                      <Digit d={ss[0]} x={0} w={28} />
                      <Digit d={ss[1]} x={33} w={28} />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <p className="mt-2 text-center text-[11px] text-[#6e675d]" dir="ltr">
              Photo: Multicherry, CC BY-SA 4.0, Wikimedia Commons
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
