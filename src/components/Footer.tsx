import Link from "next/link";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            חנות לשעוני קסיו. דיגיטלי, ג׳י־שוק ואנלוגי, עם משלוח לכל הארץ.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">חנות</h3>
          <ul className="space-y-2 text-[15px] text-ink-soft">
            <li><Link href="/shop" className="hover:text-ink hover:underline">כל השעונים</Link></li>
            <li><Link href="/shop?c=vintage" className="hover:text-ink hover:underline">וינטג׳ דיגיטלי</Link></li>
            <li><Link href="/shop?c=gshock" className="hover:text-ink hover:underline">ג׳י־שוק</Link></li>
            <li><Link href="/shop?c=analog" className="hover:text-ink hover:underline">אנלוגי</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">מידע</h3>
          <ul className="space-y-2 text-[15px] text-ink-soft">
            <li><Link href="/cart" className="hover:text-ink hover:underline">סל קניות</Link></li>
            <li><Link href="/credits" className="hover:text-ink hover:underline">קרדיט לצלמים</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[13px] text-muted sm:px-6">
          אתר הדגמה לתיק עבודות. החנות אינה קיימת ואינה קשורה לקסיו, המחירים בדיוניים ולא מתבצעים חיובים. שמות הדגמים והסימנים המסחריים שייכים לבעליהם.
        </p>
      </div>
    </footer>
  );
}
