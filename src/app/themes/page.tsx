"use client";

import Link from "next/link";
import { applyTheme, useTheme } from "@/components/ThemeSwitcher";
import { themes } from "@/data/themes";

// Each card is a miniature of the home page rendered in that theme's own colors.
export default function ThemesPage() {
  const current = useTheme();
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
      <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">אפשרויות עיצוב</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        שש פלטות, חמש בהירות ואחת כהה. לחצו על אחת כדי להחיל אותה על כל האתר, ואז הסתובבו בחנות. אפשר להחליף בכל רגע מהכפתור הצף בפינה.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {themes.map((t) => {
          const [bg, ink, accent] = t.swatch;
          const font = t.font === "serif" ? "var(--font-frank)" : "var(--font-heebo)";
          const on = current === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => applyTheme(t.id)}
                className={`block w-full cursor-pointer overflow-hidden rounded-2xl text-start ring-2 transition ${on ? "ring-gold" : "ring-transparent hover:ring-line-strong"}`}
                aria-pressed={on}
              >
                <div style={{ background: bg, color: ink }} className="p-6">
                  <div className="flex items-center justify-between text-[11px] opacity-70">
                    <span>תפריט</span>
                    <span style={{ fontFamily: font, letterSpacing: "0.3em", fontSize: 16, fontWeight: 700, opacity: 1 }}>רגע</span>
                    <span>סל</span>
                  </div>
                  <div className="mt-6 h-36 overflow-hidden rounded-lg bg-cover bg-center" style={{ backgroundImage: "url(/art/col-dress.jpg)" }} />
                  <p className="mt-5 text-3xl leading-tight" style={{ fontFamily: font, fontWeight: t.font === "serif" ? 500 : 800 }}>
                    שעונים שבחרנו אחד אחד
                  </p>
                  <p className="mt-2 text-sm opacity-75">מקסיו של 79 שקל ועד גרנד סייקו.</p>
                  <div className="mt-5 flex items-center gap-4">
                    <span className="px-4 py-2 text-xs font-semibold" style={{ background: t.dark ? ink : accent === "#c8102e" ? ink : accent, color: t.dark ? bg : "#fff" }}>
                      לכל השעונים
                    </span>
                    <span className="text-xs font-semibold" style={{ color: accent }}>
                      חדש
                    </span>
                  </div>
                </div>
                <div className="border-t border-line bg-card p-5 text-ink">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">{t.name}</p>
                    <span className="text-xs text-muted">{on ? "פעיל עכשיו" : "לחצו להחלה"}</span>
                  </div>
                  <p className="mt-1 text-[15px] text-ink-soft">{t.mood}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/" className="bg-cta px-6 py-3 text-[15px] font-semibold text-on-cta hover:bg-cta-hover">
          לראות את דף הבית בעיצוב הנבחר
        </Link>
        <Link href="/shop" className="border border-line-strong px-6 py-3 text-[15px] font-semibold hover:border-ink">
          לראות את החנות
        </Link>
      </div>
    </div>
  );
}
