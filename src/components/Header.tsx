"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { CloseIcon, MenuIcon } from "./icons";

const nav = [
  { href: "/shop", c: null, label: "כל השעונים" },
  { href: "/shop?c=sport", c: "sport", label: "ספורט" },
  { href: "/shop?c=field", c: "field", label: "שדה" },
  { href: "/shop?c=dress", c: "dress", label: "אלגנטי" },
  { href: "/shop?c=vintage", c: "vintage", label: "דיגיטלי" },
  { href: "/shop?c=gshock", c: "gshock", label: "ג׳י־שוק" },
  { href: "/shop?c=straps", c: "straps", label: "רצועות" },
  { href: "/brands", c: "__brands", label: "מותגים" },
  { href: "/guides", c: "__guides", label: "מדריכים" },
];

export function Logo() {
  return (
    <Link href="/" className="font-display text-[28px] font-bold tracking-[0.25em]" aria-label="רגע, לדף הבית">
      רגע
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function SearchBox({ onDone, light }: { onDone?: () => void; light?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        router.push(v ? `/shop?q=${encodeURIComponent(v)}` : "/shop");
        onDone?.();
      }}
      className={`flex h-10 w-full items-center gap-2 border-b ${light ? "border-white/50 focus-within:border-white" : "border-line-strong focus-within:border-ink"}`}
    >
      <SearchIcon />
      <label htmlFor="site-search" className="sr-only">
        חיפוש שעון
      </label>
      <input
        id="site-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="חיפוש לפי מותג, דגם או סגנון"
        className={`w-full bg-transparent text-[15px] outline-none ${light ? "placeholder:text-white/70" : "placeholder:text-muted"}`}
      />
    </form>
  );
}

function NavLinks({ mobile, light }: { mobile?: boolean; light?: boolean }) {
  const pathname = usePathname();
  const c = useSearchParams().get("c");
  return (
    <ul className={mobile ? "px-4 py-2" : "flex justify-center gap-7 text-[14px]"}>
      {nav.map((n) => {
        const active =
          n.c === "__brands" ? pathname.startsWith("/brands") : n.c === "__guides" ? pathname.startsWith("/guides") : pathname === "/shop" && c === n.c;
        return (
          <li key={n.href}>
            <Link
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={
                mobile
                  ? "block border-b border-line py-3 text-lg"
                  : `inline-block border-b py-3 transition-colors ${
                      light
                        ? active
                          ? "border-white text-white"
                          : "border-transparent text-white/80 hover:text-white"
                        : active
                          ? "border-ink text-ink"
                          : "border-transparent text-ink-soft hover:text-ink"
                    }`
              }
            >
              {n.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Header() {
  const { count, ready, setDrawerOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = pathname === "/" && !scrolled && !menuOpen;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        light ? "border-white/15 bg-transparent text-white" : "border-line bg-paper text-ink"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-11 w-11 cursor-pointer place-items-center lg:hidden"
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className="hidden w-full max-w-[260px] lg:block">
            <Suspense fallback={null}>
              <SearchBox light={light} />
            </Suspense>
          </div>
        </div>
        <Logo />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="h-11 cursor-pointer px-2 text-[15px] underline-offset-4 hover:underline"
            aria-label={`סל קניות, ${ready ? count : 0} פריטים`}
          >
            סל <span className="font-mono text-sm">({ready ? count : 0})</span>
          </button>
        </div>
      </div>

      <nav aria-label="ראשי" className={`hidden border-t lg:block ${light ? "border-white/15" : "border-line"}`}>
        <Suspense fallback={null}>
          <NavLinks light={light} />
        </Suspense>
      </nav>

      {menuOpen && (
        <nav aria-label="נייד" className="border-t border-line bg-paper lg:hidden">
          <div className="px-4 pt-3">
            <Suspense fallback={null}>
              <SearchBox onDone={() => setMenuOpen(false)} />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <NavLinks mobile />
          </Suspense>
        </nav>
      )}
    </header>
  );
}
