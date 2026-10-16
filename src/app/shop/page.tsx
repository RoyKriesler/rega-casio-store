import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FilterDropdown from "@/components/FilterDropdown";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">בית</Link>
        <span className="mx-2" aria-hidden>‹</span>
        <span className="text-ink">{active ? collections[active].name : "כל השעונים"}</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-extralight tracking-tight">
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

      {/* SF1 (Roy, 2026-10-16): collection as a segmented control, the rest as dropdowns. */}
      <div className="mt-8 flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="קטגוריה" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-1 rounded-full bg-sand p-1 text-[14px]">
            {[{ k: undefined, name: "הכל" }, ...(Object.keys(collections) as Collection[]).map((k) => ({ k, name: collections[k].name }))].map((c) => {
              const on = active === c.k;
              return (
                <li key={c.k ?? "all"}>
                  <Link
                    href={href({ c: c.k })}
                    aria-current={on ? "page" : undefined}
                    className={`block rounded-full px-4 py-1.5 whitespace-nowrap transition-colors ${on ? "bg-paper font-semibold shadow-sm" : "text-ink-soft hover:text-ink"}`}
                  >
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label="מותג"
            value={brand}
            options={[{ href: href({ b: undefined }), label: "כל המותגים", active: !brand }, ...brands.map((k) => ({ href: href({ b: k }), label: k, active: brand === k, ltr: true }))]}
          />
          <FilterDropdown
            label="מחיר"
            value={band ? bands[band].label : undefined}
            options={[{ href: href({ p: undefined }), label: "כל המחירים", active: !band }, ...(Object.keys(bands) as Band[]).map((k) => ({ href: href({ p: k }), label: bands[k].label, active: band === k }))]}
          />
          <FilterDropdown label={`מיון: ${sorts[sort]}`} options={(Object.keys(sorts) as Sort[]).map((k) => ({ href: href({ s: k }), label: sorts[k], active: sort === k }))} />
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
