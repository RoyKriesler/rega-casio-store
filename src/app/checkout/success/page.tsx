"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GlyphField, { type GlyphFieldHandle } from "@/components/GlyphField";
import { CheckIcon } from "@/components/icons";

type LastOrder = { order: string; firstName: string };

export default function SuccessPage() {
  const [data, setData] = useState<LastOrder | null>(null);
  const field = useRef<GlyphFieldHandle>(null);

  // G4 (Roy, 2026-10-16): a ring of glyphs, then they settle into the order number.
  useEffect(() => {
    if (!data) return;
    const t = setTimeout(() => {
      field.current?.burst(undefined, undefined, 1.4);
      field.current?.spell(data.order);
    }, 350);
    return () => clearTimeout(t);
  }, [data]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("rega-last-order");
      if (raw) setData(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div>
      <div className="relative mx-auto h-56 max-w-4xl" aria-hidden>
        <GlyphField ref={field} base={0.3} cell={16} interactive={false} />
      </div>
    <div className="relative mx-auto max-w-xl px-4 pb-24 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-ink">
        <CheckIcon width={30} height={30} />
      </span>
      <h1 className="mt-6 font-display text-4xl font-extralight">{data ? `תודה, ${data.firstName}` : "תודה"}</h1>
      <p className="mt-4 text-lg text-ink-soft">ההזמנה התקבלה. בחנות אמיתית הייתם מקבלים עכשיו אישור במייל.</p>
      {data && <p className="mt-6 text-muted">מספר הזמנה {data.order}</p>}
      <Link href="/shop" className="mt-10 inline-block rounded-sm bg-cta px-7 py-4 text-on-cta hover:bg-cta-hover">
        להמשך קנייה
      </Link>
    </div>
    </div>
  );
}
