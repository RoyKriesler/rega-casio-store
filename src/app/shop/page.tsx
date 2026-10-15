import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { brandByName } from "@/data/brands";
import { brands, collections, products, type Collection } from "@/data/products";


const sorts = {
  featured: "מומלצים",
  "price-asc": "מחיר עולה",
  "price-desc": "מחיר יורד",
} as const;
type Sort = keyof typeof sorts;

const bands = {
  low: { label: "עד 1,000 ש״ח", test: (n: number) => n <= 1000 },
  mid: { label: "1,000 עד 5,000 ש״ח", test: (n: number) => n > 1000 && n <= 5000 },
  high: { label: "מעל 5,000 ש״ח", test: (n: number) => n > 5000 },
} as const;
type Band = keyof typeof bands;

type Params = { c?: string; s?: string; p?: string; b?: string; q?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const { c, b, q } = await searchParams;
  if (q) return { title: `חיפוש: ${q}` };
  if (b && brands.includes(b)) return { title: b };
  if (c && c in collections) return { title: collections[c as Collection].name };
  return { title: "כל השעונים" };
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<Params> }) {
  const { c, s, p, b, q } = await searchParams;
  const query = q?.trim().toLowerCase() || undefined;
  const active = c && c in collections ? (c as Collection) : undefined;
  const sort: Sort = s && s in sorts ? (s as Sort) : "featured";
  const band = p && p in bands ? (p as Band) : undefined;
  const brand = b && brands.includes(b) ? b : undefined;

  let list = products.filter((x) => (!active || x.collection === active) && (!band || bands[band].test(x.price)) && (!brand || x.brand === brand) && (!query || [x.brand, brandByName(x.brand)?.he ?? "", x.name, x.model, x.tagline, collections[x.collection].name].join(" ").toLowerCase().includes(query)));
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const href = (next: Params) => {
    const merged = { c: active, s: sort === "featured" ? undefined : sort, p: band, b: brand, q: q?.trim() || undefined, ...next };
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v && v !== "featured") qs.set(k, v);
    const str = qs.toString();
    return str ? `/shop?${str}` : "/shop";
  };

  const tab = (on: boolean) =>
    `inline-block border-b-2 pb-1 transition-colors ${on ? "border-ink font-semibold" : "border-transparent text-ink-soft hover:text-ink"}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">בית</Link>
        <span className="mx-2" aria-hidden>‹</span>
        <span className="text-ink">{active ? collections[active].name : "כל השעונים"}</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        {query ? (
          <>תוצאות עבור „{q}”</>
        ) : brand ? (
          <span dir="ltr">{brand}</span>
        ) : active ? (
          collections[active].name
        ) : (
          "כל השעונים"
        )}
      </h1>
      {active && <p className="mt-2 max-w-lg text-[17px] text-ink-soft">{collections[active].blurb}</p>}

      <div className="mt-8 space-y-4 border-y border-line py-4">
        <nav aria-label="קטגוריה">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <li>
              <Link href={href({ c: undefined })} className={tab(!active)} aria-current={!active ? "page" : undefined}>
                הכל
              </Link>
            </li>
            {(Object.keys(collections) as Collection[]).map((k) => (
              <li key={k}>
                <Link href={href({ c: k })} className={tab(active === k)} aria-current={active === k ? "page" : undefined}>
                  {collections[k].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 text-sm lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <nav aria-label="מותג" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-muted">מותג:</span>
            <Link href={href({ b: undefined })} className={!brand ? "font-semibold underline underline-offset-4" : "text-ink-soft hover:text-ink"}>
              הכל
            </Link>
            {brands.map((k) => (
              <Link key={k} href={href({ b: k })} dir="ltr" className={brand === k ? "font-semibold underline underline-offset-4" : "text-ink-soft hover:text-ink"}>
                {k}
              </Link>
            ))}
          </nav>
          <nav aria-label="מחיר" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-muted">מחיר:</span>
            <Link href={href({ p: undefined })} className={!band ? "font-semibold underline underline-offset-4" : "text-ink-soft hover:text-ink"}>
              הכל
            </Link>
            {(Object.keys(bands) as Band[]).map((k) => (
              <Link key={k} href={href({ p: k })} className={band === k ? "font-semibold underline underline-offset-4" : "text-ink-soft hover:text-ink"}>
                {bands[k].label}
              </Link>
            ))}
          </nav>
          <nav aria-label="מיון" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-muted">מיון:</span>
            {(Object.keys(sorts) as Sort[]).map((k) => (
              <Link key={k} href={href({ s: k })} className={sort === k ? "font-semibold underline underline-offset-4" : "text-ink-soft hover:text-ink"}>
                {sorts[k]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">{list.length} דגמים</p>
      {list.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          אין דגמים שמתאימים לסינון הזה. <Link href="/shop" className="underline underline-offset-4">לניקוי הסינון</Link>
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {list.map((x, i) => (
            <ProductCard key={x.slug} product={x} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
