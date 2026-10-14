import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brandInfo, productsOfBrand } from "@/data/brands";
import { photoUrl } from "@/data/products";

export const metadata: Metadata = { title: "מותגים" };

export default function BrandsPage() {
  const list = brandInfo.filter((b) => productsOfBrand(b.name).length > 0);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">מותגים</h1>
      <p className="mt-2 max-w-xl text-[17px] text-ink-soft">כל מותג בחנות נבחר בגלל שעון אחד לפחות שהיינו עונדים בעצמנו.</p>
      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => {
          const items = productsOfBrand(b.name);
          return (
            <li key={b.slug}>
              <Link href={`/brands/${b.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image src={photoUrl(items[0].photos[0].id, 800, 600)} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-opacity group-hover:opacity-90" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h2 dir="ltr" className="font-mono text-sm tracking-wide">{b.name.toUpperCase()}</h2>
                  <span className="text-sm text-muted">{items.length} דגמים</span>
                </div>
                <p className="mt-1 text-[15px] text-ink-soft">
                  {b.country}, מאז {b.founded}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
