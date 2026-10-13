"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Photo } from "@/data/products";

export type CartLine = { slug: string; qty: number; variant?: string };

export const lineKey = (l: CartLine) => (l.variant ? `${l.slug}::${l.variant}` : l.slug);

export function linePhoto(l: CartLine): Photo {
  const p = getProduct(l.slug)!;
  return p.variants?.find((v) => v.name === l.variant)?.photo ?? p.photos[0];
}

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, qty?: number, variant?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartState | null>(null);
const KEY = "rega-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        setLines(parsed.filter((l) => getProduct(l.slug) && l.qty > 0));
      }
    } catch {
      // storage unavailable: start with an empty cart
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1, variant?: string) => {
    const key = lineKey({ slug, qty, variant });
    setLines((prev) => {
      const found = prev.find((l) => lineKey(l) === key);
      if (found) return prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + qty, 9) } : l));
      return [...prev, variant ? { slug, qty, variant } : { slug, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => lineKey(l) !== key) : prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(qty, 9) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => lineKey(l) !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return { lines, count, subtotal, ready, add, setQty, remove, clear, drawerOpen, setDrawerOpen };
  }, [lines, ready, add, setQty, remove, clear, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const FREE_SHIPPING_FROM = 500;
export const SHIPPING_FEE = 35;
