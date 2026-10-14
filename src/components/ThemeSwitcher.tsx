"use client";

import { useEffect, useState } from "react";
import { defaultTheme, themes, type ThemeId } from "@/data/themes";

export function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem("rega-theme", id);
  } catch {
    // storage unavailable: theme still applies for this visit
  }
  window.dispatchEvent(new CustomEvent("rega-theme", { detail: id }));
}

export function useTheme() {
  const [id, setId] = useState<ThemeId>(defaultTheme);
  useEffect(() => {
    setId((document.documentElement.dataset.theme as ThemeId) || defaultTheme);
    const on = (e: Event) => setId((e as CustomEvent<ThemeId>).detail);
    window.addEventListener("rega-theme", on);
    return () => window.removeEventListener("rega-theme", on);
  }, []);
  return id;
}

// Floating design picker: switches the palette and type of the whole site live.
export default function ThemeSwitcher() {
  const current = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 left-5 z-[60]" dir="rtl">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-line bg-card p-4 text-ink shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">עיצוב האתר</p>
            <a href="/themes" className="text-xs text-muted underline underline-offset-4 hover:text-ink">
              לכל האפשרויות
            </a>
          </div>
          <ul className="space-y-1.5">
            {themes.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => applyTheme(t.id)}
                  aria-pressed={current === t.id}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-start transition-colors ${
                    current === t.id ? "bg-sand" : "hover:bg-sand"
                  }`}
                >
                  <span className="flex shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
                    {t.swatch.map((c) => (
                      <span key={c} className="h-6 w-3" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="flex-1 text-sm">{t.name}</span>
                  <span className="text-[11px] text-muted">{t.font === "serif" ? "סריף" : "סנס"}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-12 cursor-pointer items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink shadow-lg"
      >
        <span className="flex overflow-hidden rounded-full">
          {(themes.find((t) => t.id === current) ?? themes[0]).swatch.map((c) => (
            <span key={c} className="h-4 w-2" style={{ background: c }} />
          ))}
        </span>
        עיצוב
      </button>
    </div>
  );
}
