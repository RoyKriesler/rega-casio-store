import Image from "next/image";
import Link from "next/link";
import { formatPrice, photoUrl, isCommons, type Product } from "@/data/products";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const photo = product.photos[0];
  // Hover (H3, Roy 2026-10-15): soft crossfade to a second angle; a very slow zoom when there is none.
  const second = product.photos[1] ?? product.variants?.find((v) => v.photo.id !== photo.id)?.photo;
  const size = product.specs.find((s) => s.label === "קוטר" || s.label === "רוחב")?.value;
  const label = product.compareAt ? "מבצע" : product.badge ?? (product.condition === "vintage" ? "וינטג׳" : undefined);
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-sand">
        <Image
          src={photoUrl(photo.id, 800, 800)} unoptimized={isCommons(photo.id)}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={`object-cover ${second ? "transition-opacity duration-700 group-hover:opacity-0" : "transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"}`}
        />
        {second && (
          <Image
            src={photoUrl(second.id, 800, 800)} unoptimized={isCommons(second.id)}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p dir="ltr" className="truncate font-mono text-xs text-muted">
            {product.brand === "רגע" ? product.model : `${product.brand.toUpperCase()} · ${product.model}`}
          </p>
          {label && <p className={`shrink-0 whitespace-nowrap text-xs font-semibold ${label === "וינטג׳" ? "text-gold" : "text-accent"}`}>{label}</p>}
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
