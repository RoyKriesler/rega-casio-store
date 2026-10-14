import Image from "next/image";
import Link from "next/link";
import { formatPrice, photoUrl, type Product } from "@/data/products";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const photo = product.photos[0];
  const size = product.specs.find((s) => s.label === "קוטר" || s.label === "רוחב")?.value;
  const label = product.compareAt ? "מבצע" : product.badge;
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-sand">
        <Image
          src={photoUrl(photo.id, 800, 800)}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p dir="ltr" className="truncate font-mono text-xs text-muted">
            {product.brand === "רגע" ? product.model : `${product.brand.toUpperCase()} · ${product.model}`}
          </p>
          {label && <p className="shrink-0 whitespace-nowrap text-xs font-semibold text-accent">{label}</p>}
        </div>
        <h3 className="text-[17px] leading-snug font-semibold group-hover:underline group-hover:underline-offset-4">{product.name}</h3>
        <p className="flex gap-2 text-[15px]">
          <span>{formatPrice(product.price)}</span>
          {product.compareAt && <s className="text-muted">{formatPrice(product.compareAt)}</s>}
        </p>
        {(size || product.variants) && (
          <p className="text-xs text-muted">
            {[size && `⌀ ${size}`, product.variants && `${product.variants.length} צבעים`].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
