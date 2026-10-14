"use client";

import { useEffect, useRef } from "react";

// A small cursor ring that trails the pointer and grows over links and buttons (desktop mice only).
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const el = ring.current!;
    el.style.display = "block";
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      big = false,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      big = !!t.closest("a, button, [role=button], input, label");
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${big ? 2.2 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ring}
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden h-6 w-6 rounded-full border border-white mix-blend-difference transition-[width,height] duration-200"
      style={{ transition: "transform 80ms linear" }}
      aria-hidden
    />
  );
}
