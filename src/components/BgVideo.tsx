"use client";

import { useEffect, useRef } from "react";

// Muted looping background video with a poster. Pauses for prefers-reduced-motion
// and serves a lighter file on small screens.
export default function BgVideo({ name, className = "" }: { name: "movement" | "dial"; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)").matches;
    v.src = `/video/${name}-${small ? 540 : 1080}.mp4`;
    if (reduce.matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {
      // autoplay blocked: the poster stays visible
    });
  }, [name]);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      poster={`/video/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
