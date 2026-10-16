import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = { title: "מדריכים" };

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <h1 className="font-display text-4xl font-extralight tracking-tight">מדריכים</h1>
      <p className="mt-2 text-[17px] text-ink-soft">כל מה שכדאי לדעת לפני שקונים שעון, בלי ז׳רגון.</p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="group block py-6">
              <h2 className="text-xl font-semibold group-hover:underline group-hover:underline-offset-4">{g.title}</h2>
              <p className="mt-1 text-ink-soft">{g.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
