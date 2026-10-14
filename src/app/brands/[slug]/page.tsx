import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { brandBySlug, brandInfo, productsOfBrand } from "@/data/brands";

export function generateStaticParams() {
  return brandInfo.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = brandBySlug((await params).slug);
  return b ? { title: b.name, description: b.story } : {};
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = brandBySlug((await params).slug);
  if (!b) notFound();
  const items = productsOfBrand(b.name);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">בית</Link>
        <span className="mx-2" aria-hidden>‹</span>
        <Link href="/brands" className="hover:text-ink">מותגים</Link>
        <span className="mx-2" aria-hidden>‹</span>
        <span className="text-ink">{b.he}</span>
      </nav>

      <header className="mt-6 grid gap-8 border-b border-line pb-10 md:grid-cols-[1fr_2fr]">
        <div>
          <h1 dir="ltr" className="text-end font-mono text-3xl tracking-wide">{b.name.toUpperCase()}</h1>
          <dl className="mt-6 space-y-2 text-[15px]">
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-muted">ארץ</dt>
              <dd>{b.country}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-muted">שנת ייסוד</dt>
              <dd>{b.founded}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-muted">דגמים בחנות</dt>
              <dd>{items.length}</dd>
            </div>
          </dl>
        </div>
        <p className="text-xl leading-relaxed text-ink-soft">{b.story}</p>
      </header>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
