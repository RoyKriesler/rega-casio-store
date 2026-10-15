"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import AsciiReveal from "./AsciiReveal";
import GlyphField, { type GlyphFieldHandle } from "./GlyphField";
import { formatPrice, photoUrl, type Product } from "@/data/products";

function Label({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold">
        <span className="me-2 font-mono text-gold">{n}</span>
        {title}
      </h3>
      <p className="text-[15px] text-muted">{note}</p>
    </div>
  );
}

// G1: the home hero, with click ripples over the ASCII movement.
function HeroDemo() {
  return (
    <AsciiReveal src="/art/film-gears.jpg" label="מנגנון שעון" className="h-[420px] rounded-2xl" radius={150}>
      <div className="absolute inset-0">
        <GlyphField base={0} cell={12} color="201,171,116" accent="246,226,180" />
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[14px] text-white/80">לחצו בכל מקום על התמונה</p>
    </AsciiReveal>
  );
}

// G2: add to cart sends a ring from the button across the photo and spells the confirmation.
function CartDemo({ product }: { product: Product }) {
  const field = useRef<GlyphFieldHandle>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div ref={wrap} className="relative aspect-square overflow-hidden bg-sand">
        <Image src={photoUrl(product.photos[0].id, 900, 900)} alt={product.photos[0].alt} fill sizes="50vw" className="object-cover" />
        <div className="absolute inset-0">
          <GlyphField ref={field} base={0} cell={14} color="255,255,255" accent="246,226,180" interactive={false} />
        </div>
      </div>
      <div className="self-center">
        <p className="font-display text-3xl font-bold">{product.name}</p>
        <p className="mt-2 text-xl">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => {
            const w = wrap.current!.getBoundingClientRect();
            field.current?.burst(w.width / 2, w.height, 1.3);
            field.current?.spell("נוסף לסל");
            setAdded(true);
            setTimeout(() => setAdded(false), 2400);
          }}
          className="mt-6 w-full bg-cta px-6 py-4 text-[15px] font-semibold text-on-cta transition-opacity hover:opacity-85"
        >
          {added ? "נוסף לסל" : "הוספה לסל"}
        </button>
      </div>
    </div>
  );
}

// G3: search overlay; the field breathes behind the input and ripples with every key.
function SearchDemo() {
  const field = useRef<GlyphFieldHandle>(null);
  const [q, setQ] = useState("");
  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="absolute inset-0">
        <GlyphField ref={field} base={0.35} cell={13} />
      </div>
      <form
        className="absolute inset-x-6 top-1/2 mx-auto max-w-xl -translate-y-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) field.current?.spell(q.trim().toUpperCase());
        }}
      >
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            field.current?.burst(undefined, undefined, 0.7);
          }}
          placeholder="חיפוש לפי מותג או דגם"
          className="w-full border-b-2 border-ink bg-paper/80 px-2 py-4 text-2xl backdrop-blur-sm outline-none"
        />
      </form>
    </div>
  );
}

// G4: checkout; placing the order resolves the glyphs into the order number.
function OrderDemo() {
  const field = useRef<GlyphFieldHandle>(null);
  const [num, setNum] = useState<string | null>(null);
  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="absolute inset-0">
        <GlyphField ref={field} base={0.25} cell={15} interactive={false} />
      </div>
      <div className="absolute inset-x-0 bottom-8 text-center">
        <button
          type="button"
          onClick={() => {
            const n = `RG-${Math.floor(10000 + Math.random() * 89999)}`;
            field.current?.burst(undefined, undefined, 1.4);
            field.current?.spell(n);
            setNum(n);
          }}
          className="bg-cta px-8 py-4 text-[15px] font-semibold text-on-cta transition-opacity hover:opacity-85"
        >
          {num ? "ההזמנה התקבלה" : "ביצוע הזמנה"}
        </button>
      </div>
    </div>
  );
}

export default function GlyphDemos({ product }: { product: Product }) {
  return (
    <div className="space-y-20">
      <section>
        <Label n="G1" title="דף הבית, לחיצה על המנגנון" note="כל לחיצה על תמונת הפתיחה שולחת גל אותיות זהוב שמתפזר מהנקודה." />
        <HeroDemo />
      </section>
      <section>
        <Label n="G2" title="הוספה לסל" note="הגל יוצא מהכפתור, עובר על התמונה, והאותיות מסתדרות לרגע למילים נוסף לסל." />
        <CartDemo product={product} />
      </section>
      <section>
        <Label n="G3" title="חלון החיפוש" note="שדה האותיות נושם מאחורי תיבת החיפוש, וכל הקשה שולחת גל. אנטר כותב את החיפוש באותיות." />
        <SearchDemo />
      </section>
      <section>
        <Label n="G4" title="סיום הזמנה" note="בלחיצה על ביצוע הזמנה האותיות מסתדרות למספר ההזמנה." />
        <OrderDemo />
      </section>
    </div>
  );
}
