"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

function useInView<T extends HTMLElement>(threshold = 0.2, instant = false) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (instant) {
      const t = setTimeout(() => setInView(true), 150);
      return () => clearTimeout(t);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, instant]);
  return [ref, inView] as const;
}

// Headline that rises in word by word when it scrolls into view.
export function SplitHeading({ text, as: Tag = "h2", className = "", delay = 0, instant = false }: { text: string; as?: ElementType; className?: string; delay?: number; instant?: boolean }) {
  const [ref, inView] = useInView<HTMLElement>(0.3, instant);
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <span
            className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={
              instant
                ? { animation: `word-up 900ms cubic-bezier(0.22,1,0.36,1) ${delay + 150 + i * 70}ms both` }
                : { transform: inView ? "translateY(0)" : "translateY(105%)", transitionDelay: `${delay + i * 70}ms` }
            }
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

// Fades and lifts any block into view.
export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)", transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Full-bleed image revealed by an expanding mask, with a gentle parallax while scrolling.
export function MaskReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const el = ref.current;
      const img = inner.current;
      if (!el || !img) return;
      const r = el.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.transform = `translateY(${(-p * 8).toFixed(2)}%) scale(1.12)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className || "relative"}`}
      style={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(12% 8% 12% 8%)" }}
    >
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
