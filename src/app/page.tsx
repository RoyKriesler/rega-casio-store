import Image from "next/image";
import Link from "next/link";
import LcdClock from "@/components/LcdClock";
import ProductCard from "@/components/ProductCard";
import { ArrowIcon, ReturnIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { collectionCovers, collections, photoUrl, products, storyPhoto, type Collection } from "@/data/products";

const perks = [
  { icon: TruckIcon, title: "משלוח חינם", text: "בכל הזמנה מעל 500 שקלים, עד הבית תוך שלושה ימי עסקים" },
  { icon: ShieldIcon, title: "אחריות יבואן", text: "שנתיים על כל שעון, עם תעודה וקופסה מקורית" },
  { icon: ReturnIcon, title: "14 יום להחזרה", text: "לא התחברתם? מחזירים ומקבלים את הכסף בחזרה" },
];

const stats = [
  { value: "₪89", label: "המחיר של הקלאסי" },
  { value: "200M", label: "עמידות במים בג׳י־שוק" },
  { value: "1989", label: "השנה שהקלאסי נולד" },
];

export default function Home() {
  const featured = ["f91w", "ga2100", "a168", "gmw-b5000"].map((s) => products.find((p) => p.slug === s)!);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 start-1/2 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 md:grid-cols-2 md:pt-20 md:pb-28">
          <div className="min-w-0 animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-sm text-ink-soft">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              קולקציית הג׳י־שוק החדשה כבר כאן
            </p>
            <h1 className="font-display text-5xl leading-[1.02] font-black tracking-tight text-balance sm:text-6xl lg:text-7xl">
              קשוח. אייקוני.
              <br />
              <span className="text-accent">בדיוק בזמן.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              כל קסיו שאהבתם, מהדיגיטלי של שנות השמונים ועד הג׳י־שוק שעומד בכל דבר. השעה בשעון שכאן לידכם היא
              השעה האמיתית שלכם, עכשיו.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-cta px-7 py-4 font-display font-bold text-on-cta transition-colors hover:bg-cta-hover"
              >
                לכל השעונים
                <ArrowIcon width={18} height={18} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/shop?c=gshock"
                className="inline-flex items-center rounded-full border border-line-strong px-7 py-4 font-display font-bold transition-colors hover:border-ink"
              >
                ג׳י־שוק
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd dir="ltr" className="text-end font-display text-2xl font-black">{s.value}</dd>
                  <dd className="mt-1 text-xs text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 animate-fade-up [animation-delay:150ms]">
            <LcdClock />
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="scroll-mt-20 border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-black tracking-tight">בחרו את הסגנון</h2>
            <p className="hidden max-w-xs text-ink-soft sm:block">שלוש משפחות, אותו דיוק יפני.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {(Object.keys(collections) as Collection[]).map((c) => (
              <Link
                key={c}
                href={`/shop?c=${c}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-sand ring-1 ring-line transition-shadow hover:ring-accent/60"
              >
                <Image
                  src={photoUrl(collectionCovers[c].id, 700, 930)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-3xl font-black">{collections[c].name}</h3>
                  <p className="mt-2 max-w-[26ch] text-ink-soft">{collections[c].blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    לקולקציה
                    <ArrowIcon width={16} height={16} className="transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-black tracking-tight">הכי נמכרים</h2>
          <Link href="/shop" className="group inline-flex items-center gap-2 text-ink-soft hover:text-ink">
            לכל השעונים
            <ArrowIcon width={18} height={18} className="transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center overflow-hidden rounded-[2rem] bg-card ring-1 ring-line md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[440px]">
            <Image src={photoUrl(storyPhoto.id, 1000, 900)} alt={storyPhoto.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-6 py-12 md:px-12">
            <p className="mb-4 text-sm font-bold text-accent">למה קסיו</p>
            <h2 className="font-display text-4xl leading-tight font-black">
              שעון שלא צריך
              <br />
              להוכיח כלום.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              יש שעונים שעולים כמו רכב, ויש שעונים שפשוט עובדים. מסך שקל לקרוא, סוללה שמחזיקה שנים ומבנה שעומד
              בנפילות. בגלל זה רואים אותם על הידיים של חיילים, ילדים בני עשר ומעצבים בתל אביב.
            </p>
            <Link href="/shop?c=vintage" className="mt-8 inline-flex items-center gap-2 font-display font-bold text-accent hover:underline">
              לווינטג׳ הדיגיטלי
              <ArrowIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <ul className="grid gap-8 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Icon />
              </span>
              <div>
                <h3 className="font-display font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
