import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import WristWatch from "@/components/WristWatch";
import { brandInfo, productsOfBrand } from "@/data/brands";
import { guides } from "@/data/guides";
import { collectionCovers, collections, photoUrl, products, type Collection } from "@/data/products";

const info = [
  { title: "משלוח", text: "חינם בהזמנה מעל 500 ש״ח. עד שלושה ימי עסקים לכל הארץ." },
  { title: "אחריות", text: "שנתיים אחריות יבואן על כל שעון, עם קופסה ותעודה." },
  { title: "החזרות", text: "14 יום להחזרה, בתנאי שהשעון לא נענד והמדבקות במקומן." },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export default function Home() {
  const watches = products.filter((p) => p.collection !== "straps");
  const brands = brandInfo.filter((b) => productsOfBrand(b.name).length > 0);
  const picks = ["prx-powermatic-80", "hamilton-khaki-field", "seiko-spb143", "orient-bambino"].map((s) => products.find((p) => p.slug === s)!);
  const fresh = products.filter((p) => p.badge === "חדש" || p.compareAt).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.2em] text-muted">
              {watches.length} שעונים · {brands.length} מותגים
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              שעונים שבחרנו
              <br />
              אחד אחד.
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft">
              טיסו עם צמיד משולב, המילטון על נאטו, גרנד סייקו לרגעים הגדולים וקסיו לכל יום. רק דגמים שהיינו עונדים בעצמנו.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/shop" className="bg-cta px-7 py-3.5 text-[15px] font-semibold text-on-cta hover:bg-cta-hover">
                לכל השעונים
              </Link>
              <Link href="/guides" className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline">
                איך בוחרים שעון <Arrow />
              </Link>
            </div>
          </div>
          <figure className="min-w-0">
            <WristWatch />
            <figcaption className="mt-3 text-center text-[13px] text-muted">השעה אצלך עכשיו</figcaption>
          </figure>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">הקולקציות</h2>
        <p className="mt-2 text-[15px] text-ink-soft">שש משפחות של שעונים, לפי איך שאתם חיים.</p>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {(Object.keys(collections) as Collection[]).map((c) => {
            const n = products.filter((p) => p.collection === c).length;
            return (
              <Link key={c} href={`/shop?c=${c}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={photoUrl(collectionCovers[c].id, 800, 1000)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/55 to-transparent p-5 pb-12">
                    <h3 className="text-xl font-semibold text-white">{collections[c].name}</h3>
                    <p className="mt-1 text-[13px] text-white/85">{n} דגמים</p>
                  </div>
                </div>
                <p className="mt-3 hidden text-[15px] text-ink-soft sm:block">{collections[c].blurb}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-accent">
                  לגלות את הקולקציה <Arrow />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Picks */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">הבחירות שלנו</h2>
              <p className="mt-2 text-[15px] text-ink-soft">ארבעה שעונים שהיינו קונים היום.</p>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline">
              לכל השעונים <Arrow />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {picks.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight">מותגים</h2>
            <Link href="/brands" className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline">
              על המותגים <Arrow />
            </Link>
          </div>
          <ul className="grid grid-cols-2 border-s border-t border-line sm:grid-cols-4 lg:grid-cols-6">
            {brands.map((b) => (
              <li key={b.slug} className="border-e border-b border-line">
                <Link href={`/brands/${b.slug}`} className="block px-3 py-6 text-center hover:bg-sand">
                  <span dir="ltr" className="block font-mono text-sm tracking-wide">{b.name.toUpperCase()}</span>
                  <span className="mt-1 block text-xs text-muted">מאז {b.founded}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* New */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight">חדש ובמבצע</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {fresh.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="border-t border-line bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight">מדריכים</h2>
            <Link href="/guides" className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline">
              לכל המדריכים <Arrow />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col border border-line bg-card p-5 hover:border-ink">
                  <h3 className="text-lg font-semibold leading-snug">{g.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{g.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
                    לקריאה <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Info */}
      <section className="border-t border-line">
        <dl className="mx-auto grid max-w-6xl gap-8 px-4 pt-12 sm:grid-cols-3 sm:px-6">
          {info.map((i) => (
            <div key={i.title}>
              <dt className="font-semibold">{i.title}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-ink-soft">{i.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
