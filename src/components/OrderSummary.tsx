"use client";

import { formatPrice } from "@/data/products";
import { FREE_SHIPPING_FROM, SHIPPING_FEE, useCart } from "@/lib/cart";

export function useTotals() {
  const { subtotal } = useCart();
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}

export default function OrderSummary({ children }: { children?: React.ReactNode }) {
  const { subtotal, shipping, total } = useTotals();
  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <h2 className="font-display text-2xl font-bold">סיכום</h2>
      <dl className="mt-5 space-y-3 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-ink-soft">סכום ביניים</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">משלוח</dt>
          <dd>{shipping === 0 ? "חינם" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-lg font-medium">
          <dt>סה״כ</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {children}
    </div>
  );
}
