"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons";

type LastOrder = { order: string; firstName: string };

export default function SuccessPage() {
  const [data, setData] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("rega-last-order");
      if (raw) setData(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-ink">
        <CheckIcon width={30} height={30} />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold">{data ? `תודה, ${data.firstName}` : "תודה"}</h1>
      <p className="mt-4 text-lg text-ink-soft">ההזמנה התקבלה. בחנות אמיתית הייתם מקבלים עכשיו אישור במייל.</p>
      {data && <p className="mt-6 text-muted">מספר הזמנה {data.order}</p>}
      <Link href="/shop" className="mt-10 inline-block rounded-sm bg-cta px-7 py-4 text-on-cta hover:bg-cta-hover">
        להמשך קנייה
      </Link>
    </div>
  );
}
