"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";

const menu = [
  { href: "/shop", label: "כל השעונים", image: "/art/col-sport.jpg" },
  { href: "/shop?c=sport", label: "ספורט יומיומי", image: "/art/col-sport.jpg" },
  { href: "/shop?c=field", label: "שדה וטייסים", image: "/art/col-field.jpg" },
  { href: "/shop?c=dress", label: "אלגנטי", image: "/art/col-dress.jpg" },
  { href: "/shop?c=vintage", label: "דיגיטלי", image: "/art/col-digital.jpg" },
  { href: "/shop?c=gshock", label: "ג׳י־שוק", image: "/art/col-gshock.jpg" },
  { href: "/shop?c=straps", label: "רצועות", image: "/art/col-straps.jpg" },
];
const secondary = [
  { href: "/brands", label: "מותגים" },
  { href: "/guides", label: "מדריכים" },
  { href: "/cart", label: "סל קניות" },
  { href: "/credits", label: "קרדיטים" },
];

export function Logo() {
  return (
    <Link href="/" className="font-display text-[24px] font-semibold tracking-[0.3em]" aria-label="רגע, לדף הבית">
      רגע
    </Link>
  );
}

const Icon = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  bag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  ),
};

export default function Header() {
  const { count, ready, setDrawerOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [preview, setPreview] = useState(menu[0].image);
  const lastY = useRef(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOpen(false);
    setSearching(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearching(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (searching) searchRef.current?.focus();
  }, [searching]);

  const transparent = pathname === "/" && atTop && !open && !searching;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${transparent ? "border-b border-white/25 bg-transparent text-white" : "border-b border-line bg-paper/95 text-ink backdrop-blur-sm"}`}
      >
        {/* HD2 (Roy, 2026-10-16): one quiet line. Wordmark at the start, links in the middle,
            search, bag and (on phones) the menu at the end. Hairline under it. */}
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-8">
          <Logo />
          <nav aria-label="ראשי" className="hidden md:block">
            <ul className="flex items-center gap-9 text-[15px]">
              <li><Link href="/shop" className="opacity-85 transition-opacity hover:opacity-100">שעונים</Link></li>
              <li>
                <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" className="cursor-pointer opacity-85 transition-opacity hover:opacity-100">
                  קולקציות
                </button>
              </li>
              <li><Link href="/brands" className="opacity-85 transition-opacity hover:opacity-100">מותגים</Link></li>
              <li><Link href="/shop?c=straps" className="opacity-85 transition-opacity hover:opacity-100">רצועות</Link></li>
              <li><Link href="/guides" className="opacity-85 transition-opacity hover:opacity-100">מדריכים</Link></li>
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setSearching((s) => !s)} className="grid h-11 w-11 cursor-pointer place-items-center" aria-label="חיפוש">
              {Icon.search}
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative grid h-11 w-11 cursor-pointer place-items-center"
              aria-label={`סל קניות, ${ready ? count : 0} פריטים`}
            >
              {Icon.bag}
              {ready && count > 0 && (
                <span className="absolute end-1 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] font-semibold text-paper">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "סגירת התפריט" : "תפריט"}
              className="grid h-11 w-11 cursor-pointer place-items-center md:hidden"
            >
              <span className="relative block h-3 w-6" aria-hidden>
                <span className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`grid overflow-hidden bg-paper text-ink transition-[grid-template-rows] duration-500 ${searching ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <form
            role="search"
            className="min-h-0"
            onSubmit={(e) => {
              e.preventDefault();
              const v = q.trim();
              router.push(v ? `/shop?q=${encodeURIComponent(v)}` : "/shop");
              setSearching(false);
            }}
          >
            <div className="mx-auto flex max-w-[1600px] items-center gap-4 border-t border-line px-4 py-6 sm:px-8">
              <label htmlFor="site-search" className="sr-only">
                חיפוש שעון
              </label>
              <input
                id="site-search"
                ref={searchRef}
                tabIndex={searching ? 0 : -1}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="מה מחפשים? מותג, דגם או סגנון"
                className="w-full bg-transparent font-display text-2xl text-ink outline-none placeholder:text-muted sm:text-3xl"
              />
              <button type="submit" tabIndex={searching ? 0 : -1} className="shrink-0 border border-line-strong px-5 py-2 text-[14px] hover:bg-ink hover:text-paper">
                חיפוש
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 bg-paper text-ink transition-[opacity,visibility] duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="mx-auto grid h-full max-w-[1600px] gap-10 px-4 pt-[104px] pb-10 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <nav aria-label="קולקציות" className="flex flex-col justify-between overflow-y-auto [scrollbar-width:none]">
            <ul>
              {menu.map((m, i) => (
                <li key={m.href} className="overflow-hidden">
                  <Link
                    href={m.href}
                    tabIndex={open ? 0 : -1}
                    onMouseEnter={() => setPreview(m.image)}
                    onFocus={() => setPreview(m.image)}
                    className={`group flex items-baseline gap-5 py-2 font-display text-4xl font-bold transition-all duration-700 sm:text-6xl ${
                      open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  >
                    <span className="font-mono text-xs font-normal text-muted">0{i + 1}</span>
                    <span className="text-ink/55 transition-colors group-hover:text-ink">{m.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-[15px] text-ink-soft">
              {secondary.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} tabIndex={open ? 0 : -1} className="hover:text-ink">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li className="text-muted">משלוח חינם מעל 500 ש״ח · 14 יום להחזרה</li>
            </ul>
          </nav>
          <div className="relative hidden overflow-hidden lg:block">
            {menu.map((m) => (
              <Image
                key={m.label}
                src={m.image}
                alt=""
                fill
                sizes="45vw"
                className={`object-cover transition-all duration-700 ${preview === m.image ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
