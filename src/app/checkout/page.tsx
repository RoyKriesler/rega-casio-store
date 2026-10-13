"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OrderSummary, { useTotals } from "@/components/OrderSummary";
import { formatPrice, getProduct } from "@/data/products";
import { lineKey, useCart } from "@/lib/cart";

type Field = { name: string; label: string; type?: string; autoComplete: string; half?: boolean; pattern?: string; hint?: string };

const fields: Field[] = [
  { name: "firstName", label: "שם פרטי", autoComplete: "given-name", half: true },
  { name: "lastName", label: "שם משפחה", autoComplete: "family-name", half: true },
  { name: "email", label: "אימייל", type: "email", autoComplete: "email" },
  { name: "phone", label: "טלפון", type: "tel", autoComplete: "tel", pattern: "0[0-9]{8,9}", hint: "מספר ישראלי, ספרות בלבד" },
  { name: "street", label: "רחוב ומספר בית", autoComplete: "street-address" },
  { name: "city", label: "עיר", autoComplete: "address-level2", half: true },
  { name: "zip", label: "מיקוד", autoComplete: "postal-code", half: true, pattern: "[0-9]{7}", hint: "שבע ספרות" },
];

export default function CheckoutPage() {
  const { lines, ready, clear } = useCart();
  const { total } = useTotals();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">אין מה לשלם</h1>
        <p className="mt-3 text-muted">הסל ריק. אפשר לחזור לחנות ולבחור שעון.</p>
        <Link href="/shop" className="mt-8 inline-block rounded-sm bg-cta px-7 py-4 text-on-cta hover:bg-cta-hover">
          לכל השעונים
        </Link>
      </div>
    );
  }

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const el = form.elements.namedItem(f.name) as HTMLInputElement;
      if (!el.value.trim()) next[f.name] = "שדה חובה";
      else if (!el.checkValidity()) next[f.name] = f.hint ?? "הערך לא תקין";
    }
    return next;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLInputElement).focus();
      return;
    }
    setSubmitting(true);
    const order = Math.floor(100000 + Math.random() * 900000).toString();
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
    try {
      sessionStorage.setItem("rega-last-order", JSON.stringify({ order, firstName, total }));
    } catch {
      // ignore
    }
    setTimeout(() => {
      clear();
      router.push(`/checkout/success?o=${order}`);
    }, 700);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">תשלום</h1>

      <div className="mt-6 border border-line bg-sand px-5 py-4 text-[15px] text-ink">
        זהו אתר הדגמה. לא נדרשים פרטי אשראי ולא מתבצע שום חיוב, וההזמנה לא נשלחת לשום מקום.
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-4 gap-y-5">
          <h2 className="col-span-2 text-xl font-semibold">פרטי משלוח</h2>
          {fields.map((f) => (
            <div key={f.name} className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
              <label htmlFor={f.name} className="mb-1.5 block text-[15px] font-medium">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                pattern={f.pattern}
                required
                dir={f.type === "email" || f.type === "tel" || f.name === "zip" ? "ltr" : undefined}
                aria-invalid={!!errors[f.name]}
                aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
                onBlur={() =>
                  errors[f.name] &&
                  setErrors((prev) => {
                    const rest = { ...prev };
                    delete rest[f.name];
                    return rest;
                  })
                }
                className={`h-12 w-full rounded-sm border bg-card px-4 text-base outline-none transition-colors focus:border-ink ${
                  errors[f.name] ? "border-red-500" : "border-line-strong"
                } ${f.type === "email" || f.type === "tel" || f.name === "zip" ? "text-end" : ""}`}
              />
              {errors[f.name] && (
                <p id={`${f.name}-err`} className="mt-1.5 text-sm text-red-400">
                  {errors[f.name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="col-span-2 mt-4 cursor-pointer rounded-sm bg-cta py-4 text-lg text-on-cta transition-colors hover:bg-cta-hover disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "שולחים..." : `ביצוע הזמנה, ${formatPrice(total)}`}
          </button>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary>
            <ul className="mt-6 space-y-2 border-t border-line pt-4 text-sm text-ink-soft">
              {lines.map((l) => {
                const p = getProduct(l.slug)!;
                return (
                  <li key={lineKey(l)} className="flex justify-between">
                    <span>
                      {p.name}{l.variant ? `, ${l.variant}` : ""} &times; {l.qty}
                    </span>
                    <span>{formatPrice(p.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
