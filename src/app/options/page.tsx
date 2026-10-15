import type { Metadata } from "next";
import GlyphDemos from "@/components/GlyphDemos";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "אפשרויות לבחירה" };

export default function OptionsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-8">
      <h1 className="font-display text-5xl font-bold tracking-tight">שדה האותיות</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        האפקט מהשיחה: אותיות שמשתנות כל הזמן, ולחיצה שולחת גל שמערבב אותן. ארבעה מקומות אפשריים באתר. נסו כל אחד ותגידו לי לפי הקוד מה נכנס.
      </p>
      <div className="mt-14">
        <GlyphDemos product={getProduct("prx-powermatic-80")!} />
      </div>
    </div>
  );
}
