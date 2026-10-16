"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { brandInfo } from "@/data/brands";
import { products } from "@/data/products";

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

// Model counts per menu entry, for the M1 mega menu.
const countFor = (href: string) => {
  const c = new URLSearchParams(href.split("?")[1] ?? "").get("c");
  return products.filter((p) => (c ? p.collection === c : p.collection !== "straps")).length;
};
const megaItems = menu.map((m) => ({ ...m, count: countFor(m.href) }));
const megaBrands = brandInfo.filter((b) => products.some((p) => p.brand === b.name));

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
  const [mega, setMega] = useState(false);
  const [megaHover, setMegaHover] = useState(0);
  const megaTimer = useRef(0);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [preview, setPreview] = useState(menu[0].image);
  const lastY = useRef(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOpen(false);
    setMega(false);
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
        setMega(false);
        setSearching(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (searching) searchRef.current?.focus();
  }, [searching]);

  const transparent = pathname === "/" && atTop && !open && !searching && !mega;
  const megaEnter = () => {
    clearTimeout(megaTimer.current);
    setMega(true);
  };
  const megaLeave = () => {
    clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setMega(false), 180);
  };

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
                <button
                  type="button"
                  // Hover already opened it for mouse users, so a mouse click keeps it open;
                  // keyboard activation (detail 0) toggles.
                  onClick={(e) => (e.detail === 0 ? setMega((m) => !m) : megaEnter())}
                  onMouseEnter={megaEnter}
                  onMouseLeave={megaLeave}
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  className={`cursor-pointer border-b pb-0.5 transition-[opacity,border-color] ${mega ? "border-current opacity-100" : "border-transparent opacity-85 hover:opacity-100"}`}
                >
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

        {/* M1 (Roy, 2026-10-16): mega menu under the bar. Collections with counts, brands, and a
            photo that follows the hovered collection. Desktop only; phones keep the full-screen menu. */}
        <div
          id="mega-menu"
          onMouseEnter={megaEnter}
          onMouseLeave={megaLeave}
          className={`absolute inset-x-0 top-full hidden border-b border-line bg-paper text-ink shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)] transition-[opacity,transform,visibility] duration-300 md:block ${
            mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1600px] gap-12 px-8 py-10 md:grid-cols-[1fr_1fr_1.3fr]">
            <div>
              <p className="mb-4 text-[12px] font-semibold tracking-wide text-gold">קולקציות</p>
              <ul className="space-y-2 text-[17px]">
                {megaItems.map((m, i) => (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      tabIndex={mega ? 0 : -1}
                      onMouseEnter={() => setMegaHover(i)}
                      onFocus={() => setMegaHover(i)}
                      className={`flex justify-between gap-6 ${megaHover === i ? "text-ink" : "text-ink-soft"}`}
                    >
                      <span className={megaHover === i ? "underline underline-offset-4" : ""}>{m.label}</span>
                      <span className="text-[13px] text-muted">{m.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[12px] font-semibold tracking-wide text-gold">מותגים</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[16px]">
                {megaBrands.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}`} tabIndex={mega ? 0 : -1} className="text-ink-soft hover:text-ink">
                      {b.he}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/brands" tabIndex={mega ? 0 : -1} className="mt-6 inline-block border-b border-ink/40 pb-0.5 text-[14px] hover:border-ink">
                כל המותגים
              </Link>
            </div>
            <Link href={megaItems[megaHover].href} tabIndex={-1} className="relative block aspect-[4/3] overflow-hidden" aria-hidden>
              {megaItems.map((m, i) => (
                <Image
                  key={m.label}
                  src={m.image}
                  alt=""
                  fill
                  sizes="35vw"
                  className={`object-cover transition-opacity duration-500 ${megaHover === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                <p className="font-display text-2xl font-light">{megaItems[megaHover].label}</p>
                <p className="text-[13px] opacity-85">{megaItems[megaHover].count} דגמים · לגלות</p>
              </div>
            </Link>
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
