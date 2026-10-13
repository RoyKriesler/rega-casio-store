"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
];

export function Logo() {
  return (
    <Link href="/" className="font-display text-[22px] font-semibold tracking-tight" aria-label="רגע, לדף הבית">
      רגע
    </Link>
  );
}

function NavLinks({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname();
  const c = useSearchParams().get("c");
  return (
    <ul className={mobile ? "mx-auto max-w-6xl px-4 py-2" : "flex gap-6 text-[15px]"}>
      {nav.map((n) => {
        const active = pathname === "/shop" && c === n.c;
        return (
          <li key={n.href}>
            <Link
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={
                mobile
                  ? "block border-b border-line py-3 text-lg"
                  : `border-b py-1 transition-colors ${active ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"}`
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
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="ראשי" className="hidden lg:block">
            <Suspense fallback={null}>
              <NavLinks />
            </Suspense>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="h-11 cursor-pointer px-2 text-[15px] underline-offset-4 hover:underline"
            aria-label={`סל קניות, ${ready ? count : 0} פריטים`}
          >
            סל <span className="font-mono text-sm">({ready ? count : 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-11 w-11 cursor-pointer place-items-center lg:hidden"
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="נייד" className="border-t border-line bg-paper lg:hidden">
          <Suspense fallback={null}>
            <NavLinks mobile />
          </Suspense>
        </nav>
      )}
    </header>
  );
}
