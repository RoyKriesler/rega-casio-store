"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, getProduct, photoUrl } from "@/data/products";
import { FREE_SHIPPING_FROM, lineKey, linePhoto, useCart } from "@/lib/cart";
import { CloseIcon } from "./icons";
import QtyStepper from "./QtyStepper";

export default function CartDrawer() {
  const { lines, subtotal, drawerOpen, setDrawerOpen, setQty, remove } = useCart();
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
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-xl font-semibold">הסל שלך</h2>
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
            <div className="border-b border-line px-6 py-4">
              <p className="text-sm text-ink-soft">
                {remaining > 0 ? `עוד ${formatPrice(remaining)} למשלוח חינם` : "המשלוח עלינו"}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-sm bg-line">
                <div className="h-full bg-ink transition-all" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => {
                const p = getProduct(l.slug)!;
                const ph = linePhoto(l);
                return (
                  <li key={lineKey(l)} className="flex gap-4 py-5">
                    <Image
                      src={photoUrl(ph.id, 200, 200)}
                      alt={ph.alt}
                      width={88}
                      height={88}
                      className="h-22 w-22 shrink-0 rounded-sm bg-sand object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-[17px] leading-tight font-semibold">{p.name}</p>
                          <p className="text-sm text-muted">{l.variant ? `צבע: ${l.variant}` : p.model}</p>
                        </div>
                        <p className="font-medium">{formatPrice(p.price * l.qty)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <QtyStepper value={l.qty} onChange={(q) => setQty(lineKey(l), q)} label={p.name} small />
                        <button
                          type="button"
                          onClick={() => remove(lineKey(l))}
                          className="cursor-pointer text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                        >
                          הסרה
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex justify-between text-lg">
                <span>סכום ביניים</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-sm bg-cta py-4 text-center text-on-cta transition-colors hover:bg-cta-hover"
              >
                למעבר לתשלום
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
