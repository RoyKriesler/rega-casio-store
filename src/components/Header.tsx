"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { BagIcon, CloseIcon, MenuIcon } from "./icons";

const nav = [
  { href: "/shop", label: "כל השעונים" },
  { href: "/shop?c=vintage", label: "וינטג׳" },
  { href: "/shop?c=gshock", label: "ג׳י־שוק" },
  { href: "/shop?c=analog", label: "אנלוגי" },
];

export function Logo() {
  return (
    <Link href="/" className="font-display text-2xl font-black tracking-tight" aria-label="רגע, לדף הבית">
      רגע<span className="text-accent">.</span>
    </Link>
  );
}

export default function Header() {
  const { count, ready, setDrawerOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="ראשי" className="hidden md:block">
            <ul className="flex gap-7 text-[15px] text-ink-soft">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
            aria-label={`סל קניות, ${count} פריטים`}
          >
            <BagIcon />
            {ready && count > 0 && (
              <span className="absolute end-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cta px-1 text-[11px] font-semibold text-on-cta">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand md:hidden"
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="נייד" className="border-t border-line bg-paper md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-3 text-lg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
