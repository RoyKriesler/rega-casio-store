"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// A clip is either a real video, or a still image (`still`) that gets a slow GPU zoom.
// Stills are animated with CSS transforms, which are sub-pixel smooth; baking the zoom into
// a video made it step pixel by pixel and visibly shake.
export type Clip = { src: string; small?: string; poster: string; still?: boolean };

const STILL_MS = 6500;
const FADE_MS = 1400;

export default function HeroPlaylist({ clips }: { clips: Clip[] }) {
  const [order, setOrder] = useState<Clip[]>(clips);
  const [slots, setSlots] = useState<[number, number]>([0, 1]);
  const [front, setFront] = useState<0 | 1>(0);
  const [cycle, setCycle] = useState(0);
  const [small, setSmall] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const advancing = useRef(false);
  // Per-layer animation name; flipping between two identical keyframes restarts the zoom
  // when a layer comes to the front, without remounting it (which would skip the fade).
  const anim = useRef<[string, string]>(["kenburnsA", "kenburnsA"]);
  const seen = useRef<[number, number]>([-1, -1]);

  useEffect(() => {
    setSmall(window.matchMedia("(max-width: 767px)").matches);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setOrder([...clips].sort(() => Math.random() - 0.5));
    setReady(true);
  }, [clips]);

  const advance = useCallback(() => {
    if (advancing.current) return;
    advancing.current = true;
    setFront((f) => (f ^ 1) as 0 | 1);
    setCycle((c) => c + 1);
  }, []);

  // When a layer comes to the front: start it, schedule the next switch, and preload the back layer.
  useEffect(() => {
    if (!ready || reduce) return;
    const clip = order[slots[front]];
    const vid = (front === 0 ? v0 : v1).current;
    let timer = 0;
    if (clip.still) {
      timer = window.setTimeout(advance, STILL_MS);
    } else if (vid) {
      vid.currentTime = 0;
      vid.playbackRate = 0.85;
      vid.play().catch(() => {});
    }
    const preload = window.setTimeout(() => {
      advancing.current = false;
      setSlots((s) => {
        const n: [number, number] = [s[0], s[1]];
        n[front ^ 1] = (s[front] + 1) % order.length;
        return n;
      });
      const back = (front === 0 ? v1 : v0).current;
      back?.pause();
    }, FADE_MS + 50);
    return () => {
      clearTimeout(timer);
      clearTimeout(preload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front, ready, reduce]);

  const onTime = (layer: 0 | 1) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (layer === front && v.duration && v.duration - v.currentTime < FADE_MS / 1000) advance();
  };

  const layer = (i: 0 | 1) => {
    const clip = order[slots[i]];
    const shown = i === front;
    if (shown && seen.current[i] !== cycle) {
      seen.current[i] = cycle;
      anim.current[i] = cycle % 2 ? "kenburnsB" : "kenburnsA";
    }
    const base = `absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${shown ? "opacity-100" : "opacity-0"}`;
    if (reduce || clip.still) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${i}-${slots[i]}`}
          src={clip.src}
          alt=""
          className={base}
          style={{
            transitionDuration: `${FADE_MS}ms`,
            animation: reduce ? undefined : `${anim.current[i]} ${STILL_MS + FADE_MS * 2}ms linear both`,
            willChange: "transform, opacity",
          }}
        />
      );
    }
    return (
      <video
        ref={i === 0 ? v0 : v1}
        src={small && clip.small ? clip.small : clip.src}
        poster={clip.poster}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={onTime(i)}
        className={base}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      />
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      {layer(0)}
      {layer(1)}
    </div>
  );
}
