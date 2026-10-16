import Link from "next/link";
import { Ascii } from "@/components/lab/Effects";

export default function NotFound() {
  return (
    <div className="relative">
      <div className="h-[70svh] min-h-[420px] opacity-70">
        <Ascii src="/art/film-gears.jpg" />
      </div>
      <div className="absolute inset-0 grid place-items-center px-4 text-center">
        <div className="bg-black/70 px-8 py-10 backdrop-blur-sm">
          <p className="font-mono text-sm text-gold" dir="ltr">404</p>
          <h1 className="mt-3 font-display text-4xl font-extralight">הגלגל הזה לא קיים</h1>
          <p className="mt-3 text-ink-soft">העמוד שחיפשתם לא נמצא. אולי הוא זז, ואולי מעולם לא היה.</p>
          <Link href="/shop" className="mt-6 inline-block bg-cta px-6 py-3 text-[14px] font-semibold text-on-cta hover:bg-cta-hover">
            לכל השעונים
          </Link>
        </div>
      </div>
    </div>
  );
}
