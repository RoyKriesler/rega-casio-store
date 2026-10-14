import Image from "next/image";
import Link from "next/link";
import BgVideo from "@/components/BgVideo";
import ProductCard from "@/components/ProductCard";
import WristWatch from "@/components/WristWatch";
import { brandInfo, productsOfBrand } from "@/data/brands";
import { guides } from "@/data/guides";
import { getProduct, photoUrl, products } from "@/data/products";

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function Discover({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 border-b pb-1 text-[13px] font-semibold tracking-[0.12em] transition-colors ${
        light ? "border-white/60 text-white hover:border-white" : "border-ink/40 text-ink hover:border-ink"
      }`}
    >
      {children} <Arrow />
    </Link>
  );
}

const stories = [
  {
    slug: "prx-powermatic-80",
    eyebrow: "ספורט יומיומי",
    title: "הצמיד שזורם מהמארז.",
    text: "עיצוב משנות השבעים שחזר בגדול, עם לוח מחורץ ושמונים שעות רזרבה. השעון שהכי הרבה אנשים מבקשים לראות.",
    href: "/shop?c=sport",
    cta: "לשעוני הספורט",
  },
  {
    slug: "hamilton-khaki-field",
    eyebrow: "שדה וטייסים",
    title: "נבנה לשטח. נשאר לעיר.",
    text: "שעון השדה שנולד בצבא האמריקאי, בגרסה מכנית שמכוונים ביד, על רצועת נאטו.",
    href: "/shop?c=field",
    cta: "לשעוני השדה",
  },
];

export default function Home() {
  const watches = products.filter((p) => p.collection !== "straps");
  const brands = brandInfo.filter((b) => productsOfBrand(b.name).length > 0);
  const picks = ["seiko-spb143", "orient-bambino", "citizen-tsuyosa", "oris-divers-65", "grand-seiko-skyflake", "prx-40", "seiko-5-gmt", "mido-baroncelli"].map(
    (s) => getProduct(s)!,
  );

  return (
    <>
      {/* Hero: full-bleed video under the transparent header */}
      <section className="relative -mt-[65px] flex h-[100svh] min-h-[560px] items-end overflow-hidden bg-night text-white lg:-mt-[112px]">
        <BgVideo name="movement" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
          <p className="text-[13px] font-semibold tracking-wide text-white">
            {watches.length} שעונים · {brands.length} מותגים
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] font-normal [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-7xl">שעונים שבחרנו אחד אחד.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            שוויצרים, יפנים ואמריקאים. מהקלאסי של 79 שקל ועד גרנד סייקו. רק דגמים שהיינו עונדים בעצמנו.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="bg-white px-8 py-4 text-[15px] font-semibold text-ink transition-colors hover:bg-white/85">
              לכל השעונים
            </Link>
            <Link href="/brands" className="border border-white/70 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
              המותגים
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 md:py-32">
        <p className="text-[13px] font-semibold tracking-wide text-gold">רגע</p>
        <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">
          שעון טוב לא צריך להיות יקר. הוא צריך להיות נכון לך, ולהחזיק מספיק זמן כדי שיתחיל לספר את הסיפור שלך.
        </p>
      </section>

      {/* Story banners */}
      {stories.map((st, i) => {
        const p = getProduct(st.slug)!;
        return (
          <section key={st.slug} className="grid bg-sand md:grid-cols-2">
            <div className={`relative aspect-square md:aspect-auto md:min-h-[640px] ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={photoUrl(p.photos[0].id, 1400, 1400)} alt={p.photos[0].alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex items-center px-6 py-16 sm:px-12 md:px-16">
              <div className="max-w-md">
                <p className="text-[13px] font-semibold tracking-wide text-gold">{st.eyebrow}</p>
                <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{st.title}</h2>
                <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">{st.text}</p>
                <div className="mt-8 flex flex-wrap gap-8">
                  <Discover href={`/product/${p.slug}`}>לדגם</Discover>
                  <Discover href={st.href}>{st.cta}</Discover>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Picks rail */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold tracking-wide text-gold">הבחירות שלנו</p>
              <h2 className="mt-4 font-display text-4xl">שמונה שעונים שהיינו קונים היום</h2>
            </div>
            <div className="hidden sm:block">
              <Discover href="/shop">לכל השעונים</Discover>
            </div>
          </div>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {picks.map((p) => (
            <div key={p.slug} className="w-[64vw] shrink-0 snap-start sm:w-[300px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Full-bleed dial video */}
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-night text-white">
        <BgVideo name="dial" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/55 to-black/30" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
          <div className="max-w-lg">
            <p className="text-[13px] font-semibold tracking-wide text-white/75">אלגנטי</p>
            <h2 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">לרגעים שזוכרים.</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              במבינו עם זכוכית קמורה, ברונצ׳לי בזהב אדום וגרנד סייקו עם לוח של שלג טרי. שעונים לחתונה, לפגישה החשובה ולכל ערב שצריך.
            </p>
            <div className="mt-10">
              <Discover href="/shop?c=dress" light>
                לשעונים האלגנטיים
              </Discover>
            </div>
          </div>
        </div>
      </section>

      {/* Live watch */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 sm:px-6 md:grid-cols-2">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold tracking-wide text-gold">עכשיו</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">זו השעה אצלך, ממש עכשיו.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft">
              כל שנייה שעוברת היא רגע. לא מצאתם עדיין את השעון שימדוד אותם? המדריכים שלנו יעזרו לבחור מנגנון, גודל ורצועה.
            </p>
            <div className="mt-8">
              <Discover href="/guides">למדריכים</Discover>
            </div>
          </div>
          <div className="min-w-0">
            <WristWatch />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl">המותגים</h2>
          <Discover href="/brands">על המותגים</Discover>
        </div>
        <ul className="mt-10 grid grid-cols-2 border-s border-t border-line sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => (
            <li key={b.slug} className="border-e border-b border-line">
              <Link href={`/brands/${b.slug}`} className="group block px-4 py-8 text-center transition-colors hover:bg-sand">
                <span dir="ltr" className="block font-display text-xl tracking-[0.12em]">{b.name.toUpperCase()}</span>
                <span className="mt-2 block text-xs text-muted">
                  {b.country.split(",")[0]} · {b.founded}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Guides */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold tracking-wide text-gold">מדריכים</p>
              <h2 className="mt-4 font-display text-4xl">לפני שבוחרים</h2>
            </div>
            <Discover href="/guides">לכל המדריכים</Discover>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g, i) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group block border-t border-ink pt-5">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl leading-snug group-hover:underline group-hover:underline-offset-4">{g.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{g.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
