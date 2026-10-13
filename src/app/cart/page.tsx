"use client";

import Image from "next/image";
import Link from "next/link";
import OrderSummary from "@/components/OrderSummary";
import QtyStepper from "@/components/QtyStepper";
import { formatPrice, getProduct, photoUrl } from "@/data/products";
import { lineKey, linePhoto, useCart } from "@/lib/cart";

export default function CartPage() {
  const { lines, ready, setQty, remove } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="font-display text-5xl font-black tracking-tight">סל קניות</h1>

      {!ready ? null : lines.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line-strong py-20 text-center">
          <p className="text-lg text-muted">הסל ריק כרגע</p>
          <Link href="/shop" className="mt-6 inline-block rounded-full bg-cta px-7 py-4 text-on-cta hover:bg-cta-hover">
            לכל השעונים
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((l) => {
              const p = getProduct(l.slug)!;
                const ph = linePhoto(l);
              return (
                <li key={lineKey(l)} className="flex gap-5 py-6">
                  <Link href={`/product/${p.slug}`} className="shrink-0">
                    <Image
                      src={photoUrl(ph.id, 260, 320)}
                      alt={ph.alt}
                      width={112}
                      height={138}
                      className="h-[138px] w-28 rounded-xl bg-sand object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link href={`/product/${p.slug}`} className="font-display text-2xl font-bold hover:underline">
                          {p.name}
                        </Link>
                        <p className="text-muted">{l.variant ? `צבע: ${l.variant}` : p.model}</p>
                      </div>
                      <p className="text-lg font-medium">{formatPrice(p.price * l.qty)}</p>
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
          <div className="lg:sticky lg:top-24 lg:self-start">
            <OrderSummary>
              <Link
                href="/checkout"
                className="mt-6 block rounded-full bg-cta py-4 text-center text-on-cta transition-colors hover:bg-cta-hover"
              >
                למעבר לתשלום
              </Link>
            </OrderSummary>
          </div>
        </div>
      )}
    </div>
  );
}
