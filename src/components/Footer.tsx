import Link from "next/link";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
            חנות לשעוני קסיו, מהדיגיטלי הקלאסי ועד הג׳י־שוק הכי קשוח. משלוח מהיר לכל הארץ.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-medium">חנות</h3>
          <ul className="space-y-2 text-ink-soft">
            <li><Link href="/shop" className="hover:text-ink">כל השעונים</Link></li>
            <li><Link href="/shop?c=vintage" className="hover:text-ink">וינטג׳ דיגיטלי</Link></li>
            <li><Link href="/shop?c=gshock" className="hover:text-ink">ג׳י־שוק</Link></li>
            <li><Link href="/shop?c=analog" className="hover:text-ink">אנלוגי ספורטיבי</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-medium">מידע</h3>
          <ul className="space-y-2 text-ink-soft">
            <li><Link href="/cart" className="hover:text-ink">סל קניות</Link></li>
            <li><Link href="/credits" className="hover:text-ink">קרדיט לצלמים</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-muted sm:px-6">
          אתר הדגמה לתיק עבודות. החנות אינה קיימת ואינה קשורה לקסיו, המחירים בדיוניים ולא מתבצעים חיובים. שמות הדגמים והסימנים המסחריים שייכים לבעליהם.
        </p>
      </div>
    </footer>
  );
}
