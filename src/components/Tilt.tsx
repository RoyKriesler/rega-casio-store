"use client";

import { useRef, type ReactNode } from "react";

// Subtle 3D tilt with a moving light sheen on hover (mouse only).
export default function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
    if (shine.current) shine.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.18), transparent 55%)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
    if (shine.current) shine.current.style.background = "transparent";
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`relative transition-transform duration-300 ease-out motion-reduce:transform-none ${className}`}>
      {children}
      <div ref={shine} className="pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
