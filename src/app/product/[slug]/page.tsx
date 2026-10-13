import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
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
