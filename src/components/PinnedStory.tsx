"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// A tall section whose background stays pinned while statements change with scroll.
export default function PinnedStory({ image, lines, cta }: { image: string; lines: string[]; cta: { href: string; label: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      setProgress(p);
      setStep(Math.min(lines.length - 1, Math.floor(p * lines.length * 0.999)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lines.length]);

  return (
    <section ref={ref} className="relative bg-black" style={{ height: `${lines.length * 90 + 40}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ transform: `scale(${1.12 - progress * 0.12})`, transition: "transform 120ms linear" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto grid max-w-3xl px-6 text-center">
          {lines.map((l, i) => (
            <p
              key={i}
              aria-hidden={i !== step}
              className={`col-start-1 row-start-1 font-display text-3xl leading-snug font-semibold text-white transition-all duration-700 sm:text-5xl ${
                i === step ? "translate-y-0 opacity-100" : i < step ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
              }`}
            >
              {l}
            </p>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-6">
          <div className="flex gap-2" aria-hidden>
            {lines.map((_, i) => (
              <span key={i} className={`h-[2px] w-10 transition-colors ${i <= step ? "bg-white" : "bg-white/30"}`} />
            ))}
          </div>
          <Link href={cta.href} className="border border-white/80 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-black">
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
