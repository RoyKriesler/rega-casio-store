"use client";

import { useEffect, useRef, useState } from "react";

export type Clip = { src: string; small?: string; poster: string };

// Two stacked <video> layers that crossfade from clip to clip, so no single short clip
// is ever seen looping. Every page view starts from a random clip in a random order.
export default function HeroPlaylist({ clips }: { clips: Clip[] }) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState<0 | 1>(0);
  const [poster, setPoster] = useState(clips[0].poster);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const order = [...clips].sort(() => Math.random() - 0.5);
    setPoster(order[0].poster);
    if (reduce) return;

    const layers = [a.current!, b.current!];
    let i = 0;
    let cur = 0 as 0 | 1;
    let fading = false;
    const srcOf = (c: Clip) => (small && c.small ? c.small : c.src);

    const load = (v: HTMLVideoElement, c: Clip) => {
      v.src = srcOf(c);
      v.poster = c.poster;
      v.playbackRate = 0.85;
      v.load();
    };

    load(layers[0], order[0]);
    load(layers[1], order[1 % order.length]);
    layers[0].play().catch(() => {});

    const onTime = () => {
      const v = layers[cur];
      if (fading || !v.duration) return;
      if (v.duration - v.currentTime < 1.4) {
        fading = true;
        const next = (cur ^ 1) as 0 | 1;
        layers[next].currentTime = 0;
        layers[next].playbackRate = 0.85;
        layers[next].play().catch(() => {});
        setFront(next);
        window.setTimeout(() => {
          i = (i + 1) % order.length;
          layers[cur].pause();
          load(layers[cur], order[(i + 1) % order.length]);
          cur = next;
          fading = false;
        }, 1400);
      }
    };
    layers.forEach((v) => v.addEventListener("timeupdate", onTime));
    return () => layers.forEach((v) => v.removeEventListener("timeupdate", onTime));
  }, [clips]);

  const cls = "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out";
  return (
    <div className="absolute inset-0 bg-black" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <video ref={a} muted playsInline preload="auto" className={`${cls} ${front === 0 ? "opacity-100" : "opacity-0"}`} />
      <video ref={b} muted playsInline preload="auto" className={`${cls} ${front === 1 ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
