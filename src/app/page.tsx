import Image from "next/image";
import Link from "next/link";
import LcdClock from "@/components/LcdClock";
import ProductCard from "@/components/ProductCard";
import { collectionCovers, collections, photoUrl, products, type Collection } from "@/data/products";

const priceBands = [
  { key: "low", label: "עד 250 ש״ח" },
  { key: "mid", label: "250 עד 600 ש״ח" },
  { key: "high", label: "מעל 600 ש״ח" },
];

const info = [
  { title: "משלוח", text: "חינם בהזמנה מעל 500 ש״ח. עד שלושה ימי עסקים לכל הארץ." },
  { title: "אחריות", text: "שנתיים אחריות יבואן על כל שעון, עם קופסה ותעודה." },
  { title: "החזרות", text: "14 יום להחזרה, בתנאי שהשעון לא נענד והמדבקות במקומן." },
];

export default function Home() {
  const fresh = products.filter((p) => p.badge === "חדש" || p.compareAt);
  const popular = ["f91w", "ga2100", "a168", "mtp-1175e"].map((s) => products.find((p) => p.slug === s)!);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.1fr] md:py-16">
          <div className="min-w-0">
            <p className="text-sm text-muted">{products.length} דגמים במלאי</p>
            <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              שעוני קסיו.
              <br />
              מהקלאסי של 89 שקל ועד הג׳י־שוק ממתכת.
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">
              דיגיטלי, אנלוגי וג׳י־שוק, עם אחריות יבואן ומשלוח לכל הארץ.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/shop" className="bg-cta px-6 py-3.5 text-[15px] font-semibold text-on-cta hover:bg-cta-hover">
                לכל השעונים
              </Link>
              <Link href="/shop?c=gshock" className="text-[15px] underline underline-offset-4 hover:text-ink-soft">
                ג׳י־שוק
              </Link>
              <Link href="/shop?c=vintage" className="text-[15px] underline underline-offset-4 hover:text-ink-soft">
                וינטג׳ דיגיטלי
              </Link>
            </div>
          </div>

          <figure className="min-w-0 bg-sand px-6 py-10 sm:px-10">
            <LcdClock />
            <figcaption className="mt-5 text-center text-[13px] text-muted">השעה אצלך עכשיו, על מסך של שעון דיגיטלי</figcaption>
          </figure>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 font-display text-2xl font-semibold">קטגוריות</h2>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
          {(Object.keys(collections) as Collection[]).map((c) => {
            const n = products.filter((p) => p.collection === c).length;
            return (
              <Link key={c} href={`/shop?c=${c}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={photoUrl(collectionCovers[c].id, 800, 600)}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold group-hover:underline group-hover:underline-offset-4">{collections[c].name}</h3>
                  <span className="text-sm text-muted">{n} דגמים</span>
                </div>
                <p className="mt-1 text-[15px] text-ink-soft">{collections[c].blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold">הנמכרים</h2>
            <Link href="/shop" className="text-[15px] underline underline-offset-4">
              לכל השעונים
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {popular.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* New + price bands */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">חדש ובמבצע</h2>
            <nav aria-label="קנייה לפי מחיר" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
              <span className="text-muted">לפי מחיר:</span>
              {priceBands.map((b) => (
                <Link key={b.key} href={`/shop?p=${b.key}`} className="underline underline-offset-4 hover:text-ink-soft">
                  {b.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {fresh.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
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
