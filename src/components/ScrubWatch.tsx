"use client";

import { useEffect, useRef, useState } from "react";
import WristWatch from "./WristWatch";

// Pinned section: scrolling turns the watch hands through twelve hours, then hands back to live time.
export default function ScrubWatch() {
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

  const live = p >= 0.98;
  const minutes = Math.round(p * 12 * 60);
  const at = new Date(2026, 0, 14, 10 + Math.floor(minutes / 60), minutes % 60, 0);
  const hh = String(at.getHours() % 12 || 12).padStart(2, "0");
  const mm = String(at.getMinutes()).padStart(2, "0");

  return (
    <section ref={ref} className="relative h-[260svh] bg-[#e6e4df] text-[#151515]">
      <div className="sticky top-0 grid h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 px-4 sm:px-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="text-[13px] font-semibold tracking-wide text-[#866a3a]">{live ? "עכשיו" : "גללו כדי לסובב את הזמן"}</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">
              {live ? "זו השעה אצלך." : "כל רגע נמדד."}
            </h2>
            <p dir="ltr" className="mt-6 text-end font-mono text-6xl tabular-nums text-[#151515]/80 sm:text-8xl">
              {live ? "LIVE" : `${hh}:${mm}`}
            </p>
            <div className="mt-8 h-px w-full bg-[#151515]/15">
              <div className="h-px bg-[#151515]" style={{ width: `${p * 100}%` }} />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <WristWatch at={live ? undefined : at} />
          </div>
        </div>
      </div>
    </section>
  );
}
