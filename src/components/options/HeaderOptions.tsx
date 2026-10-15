"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

// Five header directions shown as static bars over a sample hero, for comparison only.

const Icon = {
  search: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 8h18M3 16h18" />
    </svg>
  ),
};

const nav = ["שעונים", "קולקציות", "מותגים", "רצועות", "מדריכים"];

function Stage({ children, dark = false, hero = true }: { children: ReactNode; dark?: boolean; hero?: boolean }) {
  return (
    <div className="relative h-[340px] overflow-hidden rounded-2xl border border-line">
      {hero && (
        <>
          <Image src="/art/hero-sea.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className={`absolute inset-0 ${dark ? "bg-black/35" : "bg-black/15"}`} />
        </>
      )}
      {children}
    </div>
  );
}

// HD1: two tiers like the big maisons. Thin announcement line, then a centred wordmark with
// navigation underneath.
function HD1() {
  return (
    <Stage>
      <div className="absolute inset-x-0 top-0 bg-paper text-ink">
        <p className="bg-ink py-1.5 text-center text-[12px] tracking-wide text-on-cta">משלוח חינם בהזמנה מעל 500 ₪ · החזרה עד 14 יום</p>
        <div className="grid grid-cols-3 items-center px-8 pt-5">
          <div className="flex gap-4 text-ink-soft">{Icon.search}</div>
          <p className="text-center font-display text-[34px] font-bold tracking-[0.45em]">רגע</p>
          <div className="flex justify-end gap-4 text-ink-soft">
            {Icon.user}
            {Icon.bag}
          </div>
        </div>
        <nav className="flex justify-center gap-9 pt-3 pb-4 text-[14px]">
          {nav.map((n) => (
            <span key={n} className="border-b border-transparent pb-1 hover:border-ink">
              {n}
            </span>
          ))}
        </nav>
        <div className="h-px bg-line" />
      </div>
    </Stage>
  );
}

// HD2: one quiet line. Wordmark at the start, links in the middle, icons at the end, hairline below.
function HD2() {
  return (
    <Stage>
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/30 px-8 py-5 text-white">
        <p className="font-display text-[26px] font-bold tracking-[0.3em]">רגע</p>
        <nav className="hidden gap-8 text-[14px] md:flex">
          {nav.map((n) => (
            <span key={n} className="opacity-85 hover:opacity-100">
              {n}
            </span>
          ))}
        </nav>
        <div className="flex gap-5">
          {Icon.search}
          {Icon.bag}
        </div>
      </div>
    </Stage>
  );
}

// HD3: a floating glass capsule that sits over the page.
function HD3() {
  return (
    <Stage>
      <div className="absolute inset-x-0 top-5 flex justify-center px-4">
        <div className="flex w-full max-w-3xl items-center justify-between rounded-full border border-white/40 bg-white/55 px-6 py-3 text-ink shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            {Icon.menu}
            <p className="font-display text-[22px] font-bold tracking-[0.25em]">רגע</p>
          </div>
          <nav className="hidden gap-6 text-[14px] md:flex">
            {nav.slice(0, 4).map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {Icon.search}
            <span className="relative">
              {Icon.bag}
              <span className="absolute -end-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] text-on-cta">2</span>
            </span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// HD4: a dark band with a gold wordmark and spaced small links, like a jeweller's.
function HD4() {
  return (
    <Stage dark>
      <div className="absolute inset-x-0 top-0 bg-[#141210] text-[#efe6d6]">
        <div className="flex items-center justify-between px-8 py-4">
          <nav className="hidden gap-7 text-[13px] tracking-[0.15em] md:flex">
            {nav.slice(0, 3).map((n) => (
              <span key={n} className="opacity-80">
                {n}
              </span>
            ))}
          </nav>
          <p className="font-display text-[30px] font-bold tracking-[0.5em] text-[#c9a96a]">רגע</p>
          <div className="flex items-center gap-5 text-[13px] tracking-[0.15em]">
            <span className="hidden opacity-80 md:inline">{nav[3]}</span>
            {Icon.search}
            {Icon.bag}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96a]/60 to-transparent" />
      </div>
    </Stage>
  );
}

// HD5: editorial. A thin utility line, then the wordmark set huge across the page; it shrinks
// into the bar when you scroll (toggle to preview).
function HD5() {
  const [small, setSmall] = useState(false);
  return (
    <Stage hero={false}>
      <div className="absolute inset-0 bg-paper text-ink">
        <div className="flex items-center justify-between border-b border-line px-8 py-3 text-[13px]">
          <div className="flex gap-6">
            {nav.slice(0, 4).map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {small && <span className="font-display text-[20px] font-bold tracking-[0.3em]">רגע</span>}
            {Icon.search}
            {Icon.bag}
          </div>
        </div>
        <div className={`overflow-hidden border-b border-line transition-[max-height] duration-700 ${small ? "max-h-0" : "max-h-[220px]"}`}>
          <p className="py-2 text-center font-display text-[150px] leading-none font-bold tracking-[0.2em]">רגע</p>
        </div>
        <div className="flex items-center justify-between px-8 py-6">
          <p className="max-w-sm text-[15px] text-ink-soft">שעונים שבחרנו אחד אחד. ספורט, שדה, ערב ודיגיטלי.</p>
          <button type="button" onClick={() => setSmall((s) => !s)} className="border border-ink px-4 py-2 text-[13px] font-semibold">
            {small ? "בחזרה למעלה" : "הדמיית גלילה"}
          </button>
        </div>
      </div>
    </Stage>
  );
}

const items = [
  { n: "HD1", name: "שתי קומות, לוגו במרכז", note: "פס הודעה דק, לוגו גדול במרכז ותפריט מתחתיו. כמו אתרי הבתים הגדולים.", C: HD1 },
  { n: "HD2", name: "שורה אחת שקטה", note: "לוגו בצד, קישורים באמצע, אייקונים בצד השני. שקוף מעל תמונה, עם קו דק.", C: HD2 },
  { n: "HD3", name: "קפסולה צפה", note: "פס מעוגל מזכוכית חלבית שמרחף מעל הדף.", C: HD3 },
  { n: "HD4", name: "פס כהה עם לוגו זהב", note: "רקע כמעט שחור, לוגו זהוב וקישורים מרווחים, כמו חנות תכשיטים.", C: HD4 },
  { n: "HD5", name: "מגזין, לוגו ענק", note: "שם החנות בגודל ענק לרוחב הדף, ומתכווץ לתוך הפס בגלילה.", C: HD5 },
];

export default function HeaderOptions() {
  return (
    <div className="space-y-12">
      {items.map(({ n, name, note, C }) => (
        <div key={n}>
          <h3 className="text-xl font-bold">
            <span className="me-2 font-mono text-gold">{n}</span>
            {name}
          </h3>
          <p className="mb-4 text-[15px] text-muted">{note}</p>
          <C />
        </div>
      ))}
    </div>
  );
}
