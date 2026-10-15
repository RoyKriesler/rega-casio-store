import Image from "next/image";
import Link from "next/link";
import { formatPrice, photoUrl, isCommons, type Product } from "@/data/products";
import Tilt from "./Tilt";

export type HoverStyle = "current" | "still" | "zoom" | "swap" | "lift" | "reveal";

// Product card with selectable hover behaviour, for comparing options side by side.
export default function HoverCard({ product, style }: { product: Product; style: HoverStyle }) {
  const a = product.photos[0];
  const b = product.photos[1] ?? product.photos[0];
  const img = (
    <div className="relative aspect-square overflow-hidden bg-sand">
      <Image
        src={photoUrl(a.id, 800, 800)} unoptimized={isCommons(a.id)}
        alt={a.alt}
        fill
        sizes="25vw"
        className={`object-cover ${
          style === "current"
            ? "transition-transform duration-700 group-hover:scale-[1.04]"
            : style === "zoom"
              ? "transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"
              : style === "still"
                ? "transition-[filter] duration-500 group-hover:brightness-[1.04]"
                : style === "swap"
                  ? "transition-opacity duration-700 group-hover:opacity-0"
                  : ""
        }`}
      />
      {style === "swap" && <Image src={photoUrl(b.id, 800, 800)} unoptimized={isCommons(b.id)} alt="" fill sizes="25vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />}
      {style === "reveal" && (
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-paper/95 py-3 text-center text-[13px] font-semibold transition-transform duration-500 ease-out group-hover:translate-y-0">
          לצפייה בדגם
        </div>
      )}
    </div>
  );
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block ${style === "lift" ? "rounded-sm transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]" : ""}`}
    >
      {style === "current" ? <Tilt>{img}</Tilt> : img}
      <div className="mt-3 space-y-1">
        <p dir="ltr" className="truncate font-mono text-xs text-muted">
          {product.brand.toUpperCase()} · {product.model}
        </p>
        <h3 className={`text-[17px] font-semibold ${style === "still" ? "underline-offset-4 group-hover:underline" : ""}`}>{product.name}</h3>
        <p className="text-[15px]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
