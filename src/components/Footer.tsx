import Link from "next/link";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            שעונים שבחרנו אחד אחד, מקסיו של 79 שקל ועד טיסו אוטומטי, ורצועות שמחליפות להם את האופי.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">חנות</h3>
          <ul className="space-y-2 text-[15px] text-ink-soft">
            <li><Link href="/shop" className="hover:text-ink hover:underline">כל השעונים</Link></li>
            <li><Link href="/shop?c=sport" className="hover:text-ink hover:underline">ספורט יומיומי</Link></li>
            <li><Link href="/shop?c=field" className="hover:text-ink hover:underline">שדה וטייסים</Link></li>
            <li><Link href="/shop?c=dress" className="hover:text-ink hover:underline">אלגנטי</Link></li>
            <li><Link href="/shop?c=straps" className="hover:text-ink hover:underline">רצועות</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">מידע</h3>
          <ul className="space-y-2 text-[15px] text-ink-soft">
            <li><Link href="/brands" className="hover:text-ink hover:underline">מותגים</Link></li>
            <li><Link href="/guides" className="hover:text-ink hover:underline">מדריכים</Link></li>
            <li><Link href="/cart" className="hover:text-ink hover:underline">סל קניות</Link></li>
            <li><Link href="/credits" className="hover:text-ink hover:underline">קרדיט לצלמים</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[13px] text-muted sm:px-6">
          אתר הדגמה לתיק עבודות. החנות אינה קיימת ואינה קשורה לאף אחד מהיצרנים, ולא מתבצעים חיובים. חלק מהמחירים נלקחו מהשוואת מחירים בישראל באוקטובר 2026, והשאר משוערים. שמות הדגמים והסימנים המסחריים שייכים לבעליהם.
        </p>
      </div>
    </footer>
  );
}
