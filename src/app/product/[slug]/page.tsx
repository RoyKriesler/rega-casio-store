import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { brandByName } from "@/data/brands";
import { collections, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.brand === "רגע" ? p.name : `${p.brand} ${p.model}`, description: p.description } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const same = products.filter((p) => p.slug !== product.slug && p.collection === product.collection);
  const others = products.filter((p) => p.slug !== product.slug && p.collection !== product.collection);
  const more = [...same, ...others].slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <nav aria-label="פירורי לחם" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/" className="hover:text-ink">בית</Link></li>
          <li aria-hidden>‹</li>
          <li><Link href={`/shop?c=${product.collection}`} className="hover:text-ink">{collections[product.collection].name}</Link></li>
          <li aria-hidden>‹</li>
          <li aria-current="page" className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      {brandByName(product.brand) && (
        <section className="mt-16 grid gap-6 border-y border-line py-8 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm text-muted">על המותג</p>
            <p dir="ltr" className="mt-1 text-end font-mono text-xl tracking-wide">{product.brand.toUpperCase()}</p>
            <p className="mt-1 text-sm text-muted">
              {brandByName(product.brand)!.country}, מאז {brandByName(product.brand)!.founded}
            </p>
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-ink-soft">{brandByName(product.brand)!.story}</p>
            <Link href={`/brands/${brandByName(product.brand)!.slug}`} className="mt-3 inline-block text-[15px] font-semibold text-accent hover:underline">
              לכל הדגמים של המותג
            </Link>
          </div>
        </section>
      )}

      <section className="mt-24">
        <h2 className="mb-8 font-display text-2xl font-semibold">אולי תאהבו גם</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {more.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
