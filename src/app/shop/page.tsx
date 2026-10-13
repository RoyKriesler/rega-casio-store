import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { collections, products, type Collection } from "@/data/products";

export const metadata: Metadata = { title: "כל השעונים" };

const sorts = {
  featured: "מומלצים",
  "price-asc": "מחיר, מהנמוך",
  "price-desc": "מחיר, מהגבוה",
} as const;
type Sort = keyof typeof sorts;

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ c?: string; s?: string }> }) {
  const { c, s } = await searchParams;
  const active = c && c in collections ? (c as Collection) : undefined;
  const sort: Sort = s && s in sorts ? (s as Sort) : "featured";

  let list = active ? products.filter((p) => p.collection === active) : [...products];
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const href = (next: { c?: string; s?: string }) => {
    const q = new URLSearchParams();
    const cc = "c" in next ? next.c : active;
    const ss = "s" in next ? next.s : sort;
    if (cc) q.set("c", cc);
    if (ss && ss !== "featured") q.set("s", ss);
    const str = q.toString();
    return str ? `/shop?${str}` : "/shop";
  };

  const chip = (on: boolean) =>
    `inline-block rounded-full border px-5 py-2.5 text-[15px] transition-colors ${
      on ? "border-ink bg-cta text-on-cta" : "border-line-strong hover:border-ink"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="font-display text-5xl font-black tracking-tight">
        {active ? collections[active].name : "כל השעונים"}
      </h1>
      <p className="mt-3 max-w-lg text-lg text-ink-soft">
        {active ? collections[active].blurb : "כל השעונים שלנו במקום אחד. בחרו סגנון או מיינו לפי מחיר."}
      </p>

      <div className="mt-10 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
        <nav aria-label="סינון לפי קולקציה">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href={href({ c: undefined })} className={chip(!active)} aria-current={!active ? "page" : undefined}>
                הכל
              </Link>
            </li>
            {(Object.keys(collections) as Collection[]).map((k) => (
              <li key={k}>
                <Link href={href({ c: k })} className={chip(active === k)} aria-current={active === k ? "page" : undefined}>
                  {collections[k].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="מיון" className="flex items-center gap-3 text-[15px]">
          <span className="text-muted">מיון:</span>
          {(Object.keys(sorts) as Sort[]).map((k) => (
            <Link
              key={k}
              href={href({ s: k })}
              className={`underline-offset-4 ${sort === k ? "font-medium underline" : "text-ink-soft hover:text-ink"}`}
              aria-current={sort === k ? "true" : undefined}
            >
              {sorts[k]}
            </Link>
          ))}
        </nav>
      </div>

      <p className="mt-6 text-sm text-muted">{list.length} שעונים</p>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
