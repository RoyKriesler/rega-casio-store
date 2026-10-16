"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export type DropdownOption = { href: string; label: string; active: boolean; ltr?: boolean };

// Pill button that opens a small list of filter links (SF1 shop toolbar). Built on <details>,
// so it works before hydration; closes on outside click and Escape.
export default function FilterDropdown({ label, value, options }: { label: string; value?: string; options: DropdownOption[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      const el = ref.current;
      if (!el?.open) return;
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <details ref={ref} className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors [&::-webkit-details-marker]:hidden ${
          value ? "border-ink bg-ink text-paper" : "border-line-strong hover:border-ink"
        }`}
      >
        {label}
        {value && <span className="opacity-80">· {value}</span>}
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <ul className="absolute end-0 z-20 mt-2 max-h-80 min-w-48 overflow-y-auto rounded-xl border border-line bg-card p-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]">
        {options.map((o) => (
          <li key={o.href}>
            <Link
              href={o.href}
              scroll={false}
              onClick={() => ref.current && (ref.current.open = false)}
              dir={o.ltr ? "ltr" : undefined}
              className={`block rounded-lg px-3 py-2 text-[14px] ${o.ltr ? "text-end" : ""} ${o.active ? "bg-sand font-semibold" : "text-ink-soft hover:bg-sand hover:text-ink"}`}
            >
              {o.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
