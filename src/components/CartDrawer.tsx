"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, getProduct, photoUrl, isCommons } from "@/data/products";
import { FREE_SHIPPING_FROM, lineKey, linePhoto, useCart } from "@/lib/cart";
import { CloseIcon } from "./icons";
import QtyStepper from "./QtyStepper";

export default function CartDrawer() {
  const { lines, count, subtotal, drawerOpen, setDrawerOpen, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, setDrawerOpen]);

  const remaining = Math.max(FREE_SHIPPING_FROM - subtotal, 0);
  const progress = Math.min(subtotal / FREE_SHIPPING_FROM, 1);

  return (
    <div className={`fixed inset-0 z-50 ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="סל הקניות"
        className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-paper border-s border-line transition-transform duration-300 ease-out ${
          drawerOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        {/* CD1 (Roy, 2026-10-16): editorial drawer. Larger photos, quiet quantity, full summary. */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="font-display text-2xl font-light">הסל{count > 0 ? ` · ${count}` : ""}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-sm hover:bg-sand"
            aria-label="סגירת הסל"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg text-muted">הסל עדיין ריק</p>
            <Link
              href="/shop"
              onClick={() => setDrawerOpen(false)}
              className="rounded-sm bg-cta px-6 py-3 text-on-cta transition-colors hover:bg-cta-hover"
            >
              לכל השעונים
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6">
              <p className="text-[13px] text-ink-soft">
                {remaining > 0 ? `עוד ${formatPrice(remaining)} והמשלוח עלינו` : "המשלוח עלינו. נשאר רק לבחור."}
              </p>
              <div className="mt-3 h-px bg-line">
                <div className="h-px bg-gold transition-all duration-500" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <ul className="mt-2 flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => {
                const p = getProduct(l.slug)!;
                const ph = linePhoto(l);
                return (
                  <li key={lineKey(l)} className="flex gap-4 py-6">
                    <Image
                      src={photoUrl(ph.id, 300, 360)} unoptimized={isCommons(ph.id)}
                      alt={ph.alt}
                      width={96}
                      height={116}
                      className="h-[116px] w-24 shrink-0 bg-sand object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p dir="ltr" className="truncate text-end font-mono text-[11px] text-muted">
                        {p.brand === "רגע" ? p.model : `${p.brand.toUpperCase()} · ${p.model}`}
                      </p>
                      <p className="font-display text-lg leading-snug font-light">{p.name}</p>
                      {l.variant && <p className="text-[13px] text-muted">צבע: {l.variant}</p>}
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <div className="flex items-center gap-4">
                          <QtyStepper value={l.qty} onChange={(q) => setQty(lineKey(l), q)} label={p.name} small />
                          <button
                            type="button"
                            onClick={() => remove(lineKey(l))}
                            className="cursor-pointer text-[13px] text-muted underline-offset-4 hover:text-ink hover:underline"
                          >
                            הסרה
                          </button>
                        </div>
                        <p className="text-[15px]">{formatPrice(p.price * l.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="space-y-2 text-[14px]">
                <p className="flex justify-between text-ink-soft">
                  <span>משלוח</span>
                  <span>{remaining > 0 ? "יחושב בתשלום" : "חינם"}</span>
                </p>
                <p className="flex justify-between text-lg font-semibold">
                  <span>סך הכול</span>
                  <span>{formatPrice(subtotal)}</span>
                </p>
              </div>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="mt-4 block bg-cta py-4 text-center text-[15px] font-semibold text-on-cta transition-colors hover:bg-cta-hover"
              >
                לתשלום
              </Link>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="mt-3 block text-center text-sm text-ink-soft underline-offset-4 hover:underline"
              >
                לצפייה בסל המלא
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
