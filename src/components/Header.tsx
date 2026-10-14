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
    <Link href="/" className="font-display text-[26px] font-bold tracking-[0.3em]" aria-label="רגע, לדף הבית">
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
        className={`fixed inset-x-0 top-0 z-50 text-white transition-[transform,background-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${transparent ? "bg-transparent" : "bg-black"}`}
      >
        <div className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex h-11 cursor-pointer items-center gap-3"
            >
              <span className="relative block h-3 w-7" aria-hidden>
                <span className={`absolute inset-x-0 top-0 h-px bg-white transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute inset-x-0 bottom-0 h-px bg-white transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
              <span className="hidden text-[14px] tracking-wide sm:inline">{open ? "סגירה" : "תפריט"}</span>
            </button>
            <nav aria-label="קיצורים" className="hidden lg:block">
              <ul className="flex gap-6 text-[14px] text-white/80">
                <li><Link href="/shop" className="hover:text-white">שעונים</Link></li>
                <li><Link href="/brands" className="hover:text-white">מותגים</Link></li>
              </ul>
            </nav>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-2">
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
                <span className="absolute end-1 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`grid overflow-hidden bg-black transition-[grid-template-rows] duration-500 ${searching ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
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
            <div className="mx-auto flex max-w-[1600px] items-center gap-4 border-t border-white/10 px-4 py-6 sm:px-8">
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
                className="w-full bg-transparent font-display text-2xl text-white outline-none placeholder:text-white/40 sm:text-3xl"
              />
              <button type="submit" tabIndex={searching ? 0 : -1} className="shrink-0 border border-white/50 px-5 py-2 text-[14px] hover:bg-white hover:text-black">
                חיפוש
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 bg-black text-white transition-[opacity,visibility] duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="mx-auto grid h-full max-w-[1600px] gap-10 px-4 pt-[104px] pb-10 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <nav aria-label="ראשי" className="flex flex-col justify-between overflow-y-auto [scrollbar-width:none]">
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
                    <span className="font-mono text-xs font-normal text-white/40">0{i + 1}</span>
                    <span className="text-white/60 transition-colors group-hover:text-white">{m.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[15px] text-white/70">
              {secondary.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} tabIndex={open ? 0 : -1} className="hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li className="text-white/40">משלוח חינם מעל 500 ש״ח · 14 יום להחזרה</li>
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
