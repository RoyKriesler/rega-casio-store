import Image from "next/image";
import Link from "next/link";
import { formatPrice, photoUrl, type Product } from "@/data/products";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const photo = product.photos[0];
  const badge = product.compareAt ? "במבצע" : product.badge;
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand ring-1 ring-line transition-shadow group-hover:ring-accent/60">
        <Image
          src={photoUrl(photo.id, 800, 1000)}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {badge && (
          <span
            className={`absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              product.compareAt ? "bg-cta text-on-cta" : "bg-black/70 text-ink backdrop-blur"
            }`}
          >
            {badge}
          </span>
        )}
        {product.variants && (
          <span className="absolute end-3 bottom-3 flex gap-1 rounded-full bg-black/60 p-1.5 backdrop-blur">
            {product.variants.map((v) => (
              <span key={v.name} className="h-3 w-3 rounded-full ring-1 ring-white/30" style={{ background: v.swatch }} />
            ))}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p dir="ltr" className="text-end font-display text-xs font-bold tracking-widest text-accent">
            {product.model}
          </p>
          <h3 className="mt-1 font-display text-lg leading-tight font-bold">{product.name}</h3>
        </div>
        <div className="text-end">
          <p className="font-display font-bold">{formatPrice(product.price)}</p>
          {product.compareAt && <p className="text-sm text-muted line-through">{formatPrice(product.compareAt)}</p>}
        </div>
      </div>
    </Link>
  );
}
