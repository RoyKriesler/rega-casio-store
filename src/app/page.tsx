import Image from "next/image";
import Link from "next/link";
import HeroPlaylist, { type Clip } from "@/components/HeroPlaylist";
import Marquee from "@/components/Marquee";
import { FadeIn, MaskReveal, SplitHeading } from "@/components/Reveal";
import RetroScrubWatch from "@/components/RetroScrubWatch";
import Exploded3D from "@/components/anatomy/Exploded3D";
import AsciiReveal from "@/components/AsciiReveal";
import CollectionsAccordion, { type Panel } from "@/components/CollectionsAccordion";
import FilmCards, { type Film } from "@/components/FilmCards";
import PinnedStory from "@/components/PinnedStory";
import ProductCard from "@/components/ProductCard";
import { brandInfo, productsOfBrand } from "@/data/brands";
import { guides } from "@/data/guides";
import { collections, getProduct, products, type Collection } from "@/data/products";

const panelArt: Record<Collection, string> = {
  sport: "/art/col-sport.jpg",
  field: "/art/col-field.jpg",
  dress: "/art/col-dress.jpg",
  vintage: "/art/col-digital.jpg",
  gshock: "/art/col-gshock.jpg",
  straps: "/art/col-straps.jpg",
};

const heroClips: Clip[] = [
  { src: "/video/movement-1080.mp4", small: "/video/movement-540.mp4", poster: "/video/movement-poster.jpg" },
  { src: "/art/film-rain.jpg", poster: "/art/film-rain.jpg", still: true },
  { src: "/video/dial-1080.mp4", small: "/video/dial-540.mp4", poster: "/video/dial-poster.jpg" },
  { src: "/art/film-bezel.jpg", poster: "/art/film-bezel.jpg", still: true },
  { src: "/art/film-gears.jpg", poster: "/art/film-gears.jpg", still: true },
  { src: "/art/film-bracelet.jpg", poster: "/art/film-bracelet.jpg", still: true },
  { src: "/art/film-dial.jpg", poster: "/art/film-dial.jpg", still: true },
];

const films: Film[] = [
  { key: "movement", title: "המנגנון", caption: "מאות חלקים זעירים שעובדים יחד, ועדיין אפשר לראות כל אחד מהם זז.", poster: "/video/movement-poster.jpg", src: "/video/movement-1080.mp4" },
  { key: "gears", title: "גלגלי שיניים", caption: "פליז, פלדה ואבני מסב אדומות, מקרוב.", poster: "/art/film-gears.jpg", src: "/art/film-gears.jpg", still: true },
  { key: "dial", title: "הלוח", caption: "ספרות רומיות, מופע ירח ומחוגים כחולים.", poster: "/video/dial-poster.jpg", src: "/video/dial-1080.mp4" },
  { key: "crown", title: "הכתר", caption: "החלק הקטן שאיתו מכוונים את הזמן.", poster: "/art/film-crown.jpg", src: "/art/film-crown.jpg", still: true },
  { key: "strap", title: "הרצועה", caption: "עור שנתפר ביד, תפר אחרי תפר.", poster: "/art/film-strap.jpg", src: "/art/film-strap.jpg", still: true },
];

export default function Home() {
  const watches = products.filter((p) => p.collection !== "straps");
  const brands = brandInfo.filter((b) => productsOfBrand(b.name).length > 0);
  const anatomyParts = [
    { label: "זכוכית", detail: "שכבה שקופה ששומרת על הלוח. בשעונים רבים היא מספיר, שעמיד מאוד בשריטות." },
    { label: "בזל", detail: "הטבעת שמסגרת את הזכוכית ומחזיקה אותה במקום." },
    { label: "מחוגים", detail: "שעות, דקות ושניות, על ציר אחד במרכז." },
    { label: "לוח", detail: "הפנים של השעון, עם האינדקסים וחלון התאריך." },
    { label: "מנגנון", detail: "גלגלי שיניים, גלגל איזון ואבני מסב שמודדים את הזמן." },
    { label: "מארז", detail: "גוף הפלדה, עם הזיזים לרצועה והכתר לכיוון." },
    { label: "גב ורוטור", detail: "במנגנון אוטומטי, הרוטור מסתובב עם תנועת היד ומותח את הקפיץ." },
  ];
  const picks = ["prx-powermatic-80", "seiko-spb143", "hamilton-khaki-field", "orient-bambino", "citizen-tsuyosa", "oris-divers-65", "seiko-5-gmt"].map(
    (s) => getProduct(s)!,
  );
  const panels: Panel[] = (Object.keys(collections) as Collection[]).map((c) => ({
    key: c,
    title: collections[c].name,
    blurb: collections[c].blurb,
    image: panelArt[c],
    href: `/shop?c=${c}`,
    count: products.filter((p) => p.collection === c).length,
  }));

  return (
    <>
      {/* Hero: ASCII movement, the real photo shows under the cursor */}
      <section className="relative -mt-[72px] text-white">
        <AsciiReveal src="/art/film-gears.jpg" label="מנגנון של שעון מצויר בתווים, והתמונה האמיתית נחשפת מתחת לסמן" className="h-[100svh] min-h-[600px]" radius={210}>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent pt-40">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-14 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-20">
              <div className="max-w-2xl">
                <p className="text-[13px] font-semibold tracking-wide text-[#c9ab74]">הזיזו את העכבר כדי לראות את המנגנון</p>
                <SplitHeading
                  as="h1"
                  instant
                  text="שעונים שבחרנו אחד אחד"
                  className="mt-4 font-display text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-8xl"
                />
                <p className="mt-5 text-lg text-white/90">
                  {watches.length} שעונים מ־{brands.length} מותגים, מקסיו של 79 שקל ועד אוריס.
                </p>
              </div>
              <Link href="/shop" className="pointer-events-auto self-start bg-white px-8 py-4 text-[15px] font-semibold text-black transition-colors hover:bg-white/85 md:self-auto">
                לגלות את הקולקציה
              </Link>
            </div>
          </div>
        </AsciiReveal>
      </section>

      {/* Lifestyle full-bleed */}
      <section className="relative flex h-[95svh] min-h-[520px] items-end text-white">
        <MaskReveal className="absolute inset-0">
          <Image src="/art/hero-sea.jpg" alt="אדם בחליפת צלילה עומד על סלע מול ים סוער" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </MaskReveal>
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-8 md:pb-20">
          <SplitHeading text="נבנו לעומק, ענודים ביום־יום" className="font-display text-4xl font-bold tracking-tight sm:text-7xl" />
          <p className="mt-4 max-w-xl text-lg text-white/85">צוללנים, שעוני שדה ושעונים שעומדים בכל מה שתעשו איתם.</p>
          <Link href="/shop?c=sport" className="mt-8 inline-block bg-white px-7 py-3.5 text-[14px] font-semibold text-black hover:bg-white/85">
            לשעוני הספורט
          </Link>
        </div>
      </section>

      {/* Collections accordion */}
      <section className="bg-paper px-1 pt-24 pb-1">
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center">
          <SplitHeading text="הקולקציות" className="font-display text-5xl font-bold tracking-tight sm:text-7xl" />
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            משעון ספורט עם צמיד משולב, דרך שעון שדה על נאטו ועד שעון ערב עם זכוכית קמורה. שש משפחות, כל אחת לחיים אחרים.
          </p>
        </div>
        <CollectionsAccordion panels={panels} />
      </section>

      {/* Films */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[13px] font-semibold tracking-wide text-gold">סרטים</p>
            <SplitHeading text="החלקים הקטנים הם הכוכבים" className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl" />
          </div>
          <p className="max-w-sm text-[15px] text-ink-soft">עברו עם העכבר על סרט כדי לראות אותו זז, או לחצו כדי לצפות במסך מלא.</p>
        </div>
        <FadeIn>
          <FilmCards films={films} />
        </FadeIn>
      </section>

      {/* Moving pictures: crossfading clips and slow-zoom stills */}
      <section className="relative flex h-[85svh] min-h-[520px] items-end overflow-hidden bg-black text-white">
        <HeroPlaylist clips={heroClips} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-8 md:pb-20">
          <p className="text-[13px] font-semibold tracking-wide text-[#c9ab74]">בתנועה</p>
          <SplitHeading text="כל שנייה, מקרוב." className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-7xl" />
        </div>
      </section>

      {/* Pinned story */}
      <PinnedStory
        image="/art/statement.jpg"
        lines={["מאחורי כל שעון יש מישהו שהרכיב אותו.", "חלק אחרי חלק, בורג אחרי בורג.", "אנחנו בוחרים רק את אלה שהיינו עונדים בעצמנו."]}
        cta={{ href: "/brands", label: "להכיר את המותגים" }}
      />

      {/* Picks rail */}
      <section className="py-24">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 sm:px-8">
          <SplitHeading text="הבחירות שלנו" className="font-display text-4xl font-bold tracking-tight sm:text-6xl" />
          <Link href="/shop" className="border-b border-ink/50 pb-1 text-[14px] font-semibold hover:border-ink">
            לכל השעונים
          </Link>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {picks.map((p) => (
            <div key={p.slug} className="w-[66vw] shrink-0 snap-start sm:w-[300px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Exploded automatic watch */}
      <section className="pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <p className="text-[13px] font-semibold tracking-wide text-gold">מה יש בפנים</p>
          <SplitHeading text="שבע שכבות, שעון אחד" className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl" />
        </div>
        <Exploded3D parts={anatomyParts} />
      </section>

      {/* Scroll-driven Casio */}
      <RetroScrubWatch />

      {/* Brands */}
      <section className="border-y border-line">
        <Marquee items={brands.map((b) => b.name.toUpperCase())} />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <SplitHeading text="המותגים" className="font-display text-4xl font-bold tracking-tight sm:text-6xl" />
        <ul className="mt-10 grid grid-cols-2 border-s border-t border-line sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => (
            <li key={b.slug} className="border-e border-b border-line">
              <Link href={`/brands/${b.slug}`} className="block px-4 py-9 text-center transition-colors hover:bg-sand">
                <span dir="ltr" className="block font-display text-lg font-semibold tracking-[0.18em]">{b.name.toUpperCase()}</span>
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
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
          <SplitHeading text="לפני שבוחרים" className="font-display text-4xl font-bold tracking-tight sm:text-6xl" />
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g, i) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group block border-t border-ink pt-5">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <h3 className="mt-3 text-2xl leading-snug font-semibold group-hover:underline group-hover:underline-offset-4">{g.title}</h3>
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
