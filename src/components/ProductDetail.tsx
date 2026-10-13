"use client";

import Image from "next/image";
import { useState } from "react";
import { collections, formatPrice, photoUrl, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import QtyStepper from "./QtyStepper";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [variant, setVariant] = useState(product.variants?.[0]);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const photos = variant ? [variant.photo] : product.photos;
  const current = photos[Math.min(photoIdx, photos.length - 1)];

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-square overflow-hidden bg-sand">
          <Image
            key={current.id}
            src={photoUrl(current.id, 1400, 1400)}
            alt={current.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        {photos.length > 1 && (
          <div className="mt-4 flex gap-3">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPhotoIdx(idx)}
                className={`relative h-20 w-20 cursor-pointer overflow-hidden border-2 transition-colors ${
                  idx === photoIdx ? "border-ink" : "border-transparent hover:border-line-strong"
                }`}
                aria-label={`תמונה ${idx + 1} מתוך ${photos.length}`}
                aria-pressed={idx === photoIdx}
              >
                <Image src={photoUrl(p.id, 200, 200)} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-muted">
          צילום: <span dir="ltr">{current.credit}</span>, מאתר תמונות חופשי
        </p>
      </div>

      <div className="md:sticky md:top-24 md:self-start">
        <p className="text-sm text-muted">{collections[product.collection].name}</p>
        <p dir="ltr" className="mt-3 text-end font-mono text-sm text-muted">
          {product.model}
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight">{product.name}</h1>
        <p className="mt-2 text-lg text-ink-soft">{product.tagline}</p>

        <div className="mt-6 flex items-baseline gap-3">
          <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
          {product.compareAt && <p className="text-lg text-muted line-through">{formatPrice(product.compareAt)}</p>}
        </div>

        <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

        {product.variants && (
          <fieldset className="mt-7">
            <legend className="mb-3 text-[15px]">
              צבע: <span className="font-semibold">{variant?.name}</span>
            </legend>
            <div className="flex gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => {
                    setVariant(v);
                    setPhotoIdx(0);
                  }}
                  aria-pressed={variant?.name === v.name}
                  aria-label={v.name}
                  className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full ring-1 ring-offset-2 ring-offset-paper transition ${
                    variant?.name === v.name ? "ring-ink" : "ring-transparent hover:ring-line-strong"
                  }`}
                >
                  <span className="h-8 w-8 rounded-full ring-1 ring-black/15" style={{ background: v.swatch }} />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-8 flex gap-3">
          <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} label={product.name} />
          <button
            type="button"
            onClick={() => add(product.slug, qty, variant?.name)}
            className="flex-1 cursor-pointer bg-cta px-6 py-3 text-[17px] font-semibold text-on-cta transition-colors hover:bg-cta-hover"
          >
            הוספה לסל
          </button>
        </div>

        <ul className="mt-8 list-inside list-disc space-y-2 border-y border-line py-5 text-[15px] text-ink-soft">
          <li>משלוח חינם בהזמנה מעל 500 ש״ח</li>
          <li>אחריות יבואן לשנתיים</li>
          <li>14 יום להחזרה</li>
        </ul>

        <h2 className="mt-8 font-semibold">מפרט</h2>
        <dl className="mt-3 divide-y divide-line">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between gap-4 py-3 text-[15px]">
              <dt className="text-muted">{s.label}</dt>
              <dd className="text-end">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
