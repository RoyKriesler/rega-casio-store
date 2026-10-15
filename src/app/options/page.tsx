import type { Metadata } from "next";
import GlyphDemos from "@/components/GlyphDemos";
import FontOptions from "@/components/options/FontOptions";
import HeaderOptions from "@/components/options/HeaderOptions";
import FilterOptions from "@/components/options/FilterOptions";
import CartOptions from "@/components/options/CartOptions";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "אפשרויות לבחירה" };

export default function OptionsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8">
      <h1 className="font-display text-5xl font-bold tracking-tight">אפשרויות לבחירה</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">חמישה נושאים. עברו על כל אחד ותגידו לי לפי הקודים מה נכנס לאתר.</p>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold">הדר</h2>
        <p className="mt-2 mb-8 text-ink-soft">חמישה כיוונים שונים לפס העליון.</p>
        <HeaderOptions />
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">פונטים</h2>
        <p className="mt-2 mb-8 text-ink-soft">כל כרטיס מראה כותרת, פסקה, שם מוצר וכפתור באותו זוג פונטים.</p>
        <FontOptions />
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">סינון בחנות</h2>
        <p className="mt-2 mb-8 text-ink-soft">ארבע דרכים לסדר את הקולקציה, המותג, המחיר והמיון.</p>
        <FilterOptions />
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">מגירת הסל</h2>
        <p className="mt-2 mb-8 text-ink-soft">ארבעה עיצובים לחלון שנפתח אחרי הוספה לסל.</p>
        <CartOptions />
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">שדה האותיות</h2>
        <p className="mt-2 mb-8 text-ink-soft">האפקט מהשיחה, בארבעה מקומות אפשריים.</p>
        <GlyphDemos product={getProduct("prx-powermatic-80")!} />
      </section>
    </div>
  );
}
