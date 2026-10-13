"use client";

import { useEffect, useState } from "react";

// Seven-segment map: a b c d e f g
const DIGITS: Record<string, number[]> = {
  " ": [0, 0, 0, 0, 0, 0, 0],
  "0": [1, 1, 1, 1, 1, 1, 0],
  "1": [0, 1, 1, 0, 0, 0, 0],
  "2": [1, 1, 0, 1, 1, 0, 1],
  "3": [1, 1, 1, 1, 0, 0, 1],
  "4": [0, 1, 1, 0, 0, 1, 1],
  "5": [1, 0, 1, 1, 0, 1, 1],
  "6": [1, 0, 1, 1, 1, 1, 1],
  "7": [1, 1, 1, 0, 0, 0, 0],
  "8": [1, 1, 1, 1, 1, 1, 1],
  "9": [1, 1, 1, 1, 0, 1, 1],
};

// Slightly slanted segments, like a classic LCD.
const SEGS = [
  "M6 2 L34 2 L29 7 L11 7 Z", // a
  "M35 3 L35 31 L30 28 L30 8 Z", // b
  "M35 35 L35 63 L30 58 L30 38 Z", // c
  "M6 64 L34 64 L29 59 L11 59 Z", // d
  "M5 35 L5 63 L10 58 L10 38 Z", // e
  "M5 3 L5 31 L10 28 L10 8 Z", // f
  "M7 33 L12 30 L28 30 L33 33 L28 36 L12 36 Z", // g
];

function Digit({ d, small }: { d: string; small?: boolean }) {
  const on = DIGITS[d] ?? DIGITS["8"];
  return (
    <svg viewBox="0 0 40 66" className={small ? "h-[0.55em]" : "h-[1em]"} style={{ transform: "skewX(-6deg)" }} aria-hidden>
      {SEGS.map((path, i) => (
        <path key={i} d={path} fill="currentColor" opacity={on[i] ? 1 : 0.08} />
      ))}
    </svg>
  );
}

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export default function LcdClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = now ? String(now.getHours()).padStart(2, "0") : "88";
  const mm = now ? String(now.getMinutes()).padStart(2, "0") : "88";
  const ss = now ? String(now.getSeconds()).padStart(2, "0") : "88";
  const day = now ? DAYS[now.getDay()] : "--";
  const date = now ? String(now.getDate()).padStart(2, " ") : "88";
  const blink = now ? now.getSeconds() % 2 === 0 : true;

  return (
    <div
      dir="ltr"
      role="img"
      aria-label={now ? `השעה עכשיו ${hh}:${mm}` : "שעון דיגיטלי"}
      className="relative mx-auto w-full max-w-[460px] select-none"
    >
      {/* Case */}
      <div className="rounded-[2.4rem] bg-zinc-800 p-3 ring-1 ring-black/20">
        <div className="rounded-[1.9rem] bg-zinc-950 p-4 ring-1 ring-black sm:p-5">
          {/* Bezel text */}
          <div className="mb-3 flex items-center justify-between gap-2 px-1 font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-zinc-400">
            <span>LIGHT</span>
            <span className="text-accent">ALARM CHRONOGRAPH</span>
            <span>MODE</span>
          </div>

          {/* Screen */}
          <div className="relative overflow-hidden rounded-sm bg-lcd px-5 pt-3 pb-4 text-lcd-ink shadow-[inset_0_2px_10px_rgba(0,0,0,0.35)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10" />
            <div className="relative flex items-center justify-between text-[13px] font-bold tracking-widest">
              <span>{day}</span>
              <span className="flex items-center gap-[2px] text-[28px]">
                <Digit d={date[0]} small />
                <Digit d={date[1]} small />
              </span>
            </div>
            <div className="relative mt-1 flex items-end justify-center gap-1 text-[58px] leading-none min-[420px]:text-[72px] sm:text-[96px] md:text-[78px] lg:text-[100px]">
              <Digit d={hh[0]} />
              <Digit d={hh[1]} />
              <span className={`mx-0.5 flex flex-col gap-2 pb-3 sm:gap-3 sm:pb-4 transition-opacity ${blink ? "opacity-100" : "opacity-15"}`}>
                <span className="h-2 w-2 bg-current sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 bg-current sm:h-2.5 sm:w-2.5" />
              </span>
              <Digit d={mm[0]} />
              <Digit d={mm[1]} />
              <span className="ms-1 flex items-end gap-[2px] pb-1 text-[30px] sm:text-[44px] md:text-[36px] lg:text-[44px]">
                <Digit d={ss[0]} small />
                <Digit d={ss[1]} small />
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-1 font-sans text-[10px] font-bold tracking-[0.2em] text-zinc-500">
            <span>WATER RESIST</span>
            <span>START·STOP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
