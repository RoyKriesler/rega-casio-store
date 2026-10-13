import type { Metadata } from "next";
import { allPhotos } from "@/data/products";

export const metadata: Metadata = { title: "קרדיט לצלמים" };

export default function CreditsPage() {
  const all = allPhotos();
  const byCredit = new Map<string, number>();
  for (const ph of all) byCredit.set(ph.credit, (byCredit.get(ph.credit) ?? 0) + 1);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">קרדיט לצלמים</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        כל התמונות באתר מגיעות מאתר תמונות חופשי, ברישיון שמתיר שימוש ללא תשלום. תודה לצלמים:
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {[...byCredit].map(([name, n]) => (
          <li key={name} className="flex justify-between py-4">
            <span dir="ltr">{name}</span>
            <span className="text-muted">{n === 1 ? "תמונה אחת" : `${n} תמונות`}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted" dir="ltr">
        Photos from unsplash.com under the Unsplash License.
      </p>
    </div>
  );
}
