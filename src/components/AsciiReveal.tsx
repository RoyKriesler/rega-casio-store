"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

// A photo drawn as characters; the real photo shows through a soft circle under the pointer.
// Until the visitor moves the pointer (or on touch devices), the circle drifts on its own.
export default function AsciiReveal({
  src,
  label,
  className = "h-[70svh] min-h-[420px]",
  radius = 170,
  children,
}: {
  src: string;
  label: string;
  className?: string;
  radius?: number;
  children?: ReactNode;
}) {
  const [txt, setTxt] = useState("");
  const [metrics, setMetrics] = useState({ fs: 7, lh: 8.6 });
  const wrap = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const idleTimer = useRef(0);

  const setSpot = useCallback(
    (x: number, y: number, r = radius) => {
      const m = `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 55%, transparent 100%)`;
      if (photo.current) {
        photo.current.style.maskImage = m;
        photo.current.style.webkitMaskImage = m;
      }
    },
    [radius],
  );

  // Build the character grid to fill the box.
  useEffect(() => {
    const img = new Image();
    img.src = src;
    let disposed = false;
    const build = () => {
      const el = wrap.current;
      if (!el || !img.complete || disposed) return;
      const W = el.clientWidth,
        H = el.clientHeight;
      const fs = W < 640 ? 5.5 : W < 1100 ? 7.5 : 9.5;
      const lh = Math.round(fs * 1.22 * 10) / 10;
      const cw = fs * 0.6;
      const cols = Math.max(40, Math.floor(W / cw));
      const rows = Math.max(20, Math.floor(H / lh));
      const c = document.createElement("canvas");
      c.width = cols;
      c.height = rows;
      const ctx = c.getContext("2d")!;
      const ar = img.width / img.height,
        box = W / H;
      let sw = img.width,
        sh = img.height,
        sx = 0,
        sy = 0;
      if (ar > box) {
        sw = img.height * box;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / box;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const d = ctx.getImageData(0, 0, cols, rows).data;
      const ramp = " .,:;-=+*#%@";
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
          out += ramp[Math.min(ramp.length - 1, Math.floor(l * ramp.length))];
        }
        out += "\n";
      }
      setMetrics({ fs, lh });
      setTxt(out);
    };
    img.onload = build;
    const ro = new ResizeObserver(() => build());
    if (wrap.current) ro.observe(wrap.current);
    return () => {
      disposed = true;
      ro.disconnect();
    };
  }, [src]);

  // Drifting spotlight while the visitor is not steering it.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      const el = wrap.current;
      if (el && !manual.current) {
        const W = el.clientWidth,
          H = el.clientHeight;
        const s = (t - t0) / 1000;
        const x = W * (0.5 + 0.28 * Math.sin(s * 0.35)) ;
        const y = H * (0.45 + 0.18 * Math.sin(s * 0.53 + 1));
        setSpot(x, y, Math.min(radius * 1.25, W * 0.28));
      }
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [radius, setSpot]);

  const move = (e: React.PointerEvent) => {
    manual.current = true;
    clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => (manual.current = false), 2500);
    const r = wrap.current!.getBoundingClientRect();
    setSpot(e.clientX - r.left, e.clientY - r.top);
  };

  return (
    <div
      ref={wrap}
      onPointerMove={move}
      onPointerDown={move}
      className={`relative touch-pan-y overflow-hidden bg-black ${className}`}
      role="img"
      aria-label={label}
    >
      <pre
        dir="ltr"
        className="absolute inset-0 m-0 overflow-hidden font-mono text-[#c9ab74]/85 select-none"
        style={{ fontSize: metrics.fs, lineHeight: `${metrics.lh}px`, letterSpacing: 0 }}
        aria-hidden
      >
        {txt}
      </pre>
      <div
        ref={photo}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, maskImage: "radial-gradient(circle 0 at 50% 50%, #000, transparent)", WebkitMaskImage: "radial-gradient(circle 0 at 50% 50%, #000, transparent)" }}
        aria-hidden
      />
      {children}
    </div>
  );
}
