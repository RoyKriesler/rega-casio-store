"use client";

import Image from "next/image";
import { useState } from "react";

// Four directions for the collections menu, shown as static panels for comparison only.

const items = [
  { label: "כל השעונים", image: "/art/col-sport.jpg", count: 127 },
  { label: "ספורט יומיומי", image: "/art/col-sport.jpg", count: 38 },
  { label: "שדה וטייסים", image: "/art/col-field.jpg", count: 17 },
  { label: "אלגנטי", image: "/art/col-dress.jpg", count: 41 },
  { label: "דיגיטלי", image: "/art/col-digital.jpg", count: 21 },
  { label: "ג׳י־שוק", image: "/art/col-gshock.jpg", count: 7 },
  { label: "רצועות", image: "/art/col-straps.jpg", count: 3 },
];
const brands = ["Casio", "Seiko", "Tissot", "Timex", "Citizen", "Hamilton", "Orient", "Oris", "Bulova"];

function Bar() {
  return (
    <div className="flex h-14 items-center justify-between border-b border-line px-6 text-[14px]">
      <span className="font-display text-[20px] font-semibold tracking-[0.3em]">רגע</span>
      <span className="flex gap-7">
        <span>שעונים</span>
        <span className="border-b border-ink pb-0.5 font-semibold">קולקציות</span>
        <span>מותגים</span>
        <span>מדריכים</span>
      </span>
      <span className="w-10" />
    </div>
  );
}

// M1: mega menu that drops from the bar. Three columns: collections, brands, a featured photo.
function M1() {
  const [hover, setHover] = useState(1);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <Bar />
      <div className="grid gap-8 p-8 md:grid-cols-[1fr_1fr_1.3fr]">
        <div>
          <p className="mb-3 text-[12px] font-semibold tracking-wide text-gold">קולקציות</p>
          <ul className="space-y-1.5 text-[16px]">
            {items.map((m, i) => (
              <li key={m.label} onMouseEnter={() => setHover(i)} className={`flex cursor-pointer justify-between ${hover === i ? "text-ink" : "text-ink-soft"}`}>
                <span className={hover === i ? "underline underline-offset-4" : ""}>{m.label}</span>
                <span className="text-[13px] text-muted">{m.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[12px] font-semibold tracking-wide text-gold">מותגים</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[15px] text-ink-soft" dir="ltr">
            {brands.map((b) => (
              <li key={b} className="text-end">{b}</li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={items[hover].image} alt="" fill sizes="30vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <p className="font-display text-xl font-light">{items[hover].label}</p>
            <p className="text-[13px] opacity-80">לגלות ←</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// M2: full-screen photo cards in a row; the hovered card widens slightly.
function M2() {
  const [hover, setHover] = useState(0);
  const cards = items.slice(1);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <Bar />
      <div className="flex h-[360px] gap-2 p-6">
        {cards.map((m, i) => (
          <div
            key={m.label}
            onMouseEnter={() => setHover(i)}
            className={`relative min-w-0 overflow-hidden transition-[flex-grow] duration-700 ${hover === i ? "flex-[1.8]" : "flex-1"}`}
          >
            <Image src={m.image} alt="" fill sizes="20vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="font-display text-lg leading-tight font-light">{m.label}</p>
              <p className={`text-[12px] opacity-80 transition-opacity ${hover === i ? "opacity-80" : "opacity-0"}`}>{m.count} דגמים</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// M3: a quiet list with thin rules and counts; the photo follows the pointer as a small preview.
function M3() {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <Bar />
      <div
        className="relative p-8"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setHover(null)}
      >
        <ul className="divide-y divide-line border-y border-line">
          {items.map((m, i) => (
            <li key={m.label} onMouseEnter={() => setHover(i)} className="flex cursor-pointer items-baseline justify-between py-3">
              <span className={`font-display text-3xl font-extralight transition-transform duration-300 ${hover === i ? "-translate-x-2" : ""}`}>{m.label}</span>
              <span className="text-[13px] text-muted">{m.count} דגמים</span>
            </li>
          ))}
        </ul>
        {hover !== null && (
          <div className="pointer-events-none absolute h-40 w-32 overflow-hidden shadow-lg" style={{ left: pos.x + 24, top: pos.y - 80 }}>
            <Image src={items[hover].image} alt="" fill sizes="128px" className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

// M4: a side sheet from the start edge: links on top, two featured collections as photos below.
function M4() {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-2xl border border-line bg-sand/60">
      <div className="absolute inset-y-0 start-0 flex w-[380px] max-w-full flex-col bg-paper p-7 shadow-[0_0_60px_-20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[20px] font-semibold tracking-[0.3em]">רגע</span>
          <span className="text-[13px] text-muted">סגירה</span>
        </div>
        <ul className="mt-8 space-y-3 text-[19px]">
          {items.map((m) => (
            <li key={m.label} className="flex items-center justify-between">
              {m.label}
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="m15 6-6 6 6 6" />
              </svg>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid grid-cols-2 gap-3">
          {[items[1], items[3]].map((m) => (
            <div key={m.label}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={m.image} alt="" fill sizes="180px" className="object-cover" />
              </div>
              <p className="mt-2 text-[13px]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const variants = [
  { n: "M1", name: "תפריט נפתח רחב", note: "יורד מתחת לפס: קולקציות עם מספר דגמים, מותגים, ותמונה שמתחלפת לפי הקולקציה.", C: M1 },
  { n: "M2", name: "כרטיסי תמונה", note: "כל קולקציה ככרטיס תמונה, והכרטיס שמתחת לעכבר מתרחב.", C: M2 },
  { n: "M3", name: "רשימה שקטה עם תמונה צפה", note: "שמות דקים עם קווים ומספר דגמים, ותמונה קטנה שעוקבת אחרי העכבר.", C: M3 },
  { n: "M4", name: "מגירת צד", note: "חלון צר שנפתח מהצד עם קישורים, ושתי קולקציות מומלצות בתמונה.", C: M4 },
];

export default function MenuOptions() {
  return (
    <div className="space-y-12">
      {variants.map(({ n, name, note, C }) => (
        <div key={n}>
          <h3 className="text-xl font-semibold">
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
