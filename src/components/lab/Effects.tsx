"use client";

import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useNow(ms = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

/* 1. Particles: a ring of particles that forms a dial and scatters away from the cursor */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const W = (c.width = c.offsetWidth * 2);
    const H = (c.height = c.offsetHeight * 2);
    const N = 420;
    const R = Math.min(W, H) * 0.36;
    const pts = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      const tick = i % 35 === 0;
      const r = tick ? R * (0.82 + Math.random() * 0.1) : R + (Math.random() - 0.5) * 18;
      const hx = W / 2 + Math.cos(a) * r,
        hy = H / 2 + Math.sin(a) * r;
      return { hx, hy, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, big: tick };
    });
    let mx = -9999,
      my = -9999,
      raf = 0;
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = (e.clientX - r.left) * 2;
      my = (e.clientY - r.top) * 2;
    };
    const leave = () => (mx = my = -9999);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerleave", leave);
    const loop = () => {
      ctx.fillStyle = "rgba(10,10,10,0.35)";
      ctx.fillRect(0, 0, W, H);
      for (const p of pts) {
        const dx = p.x - mx,
          dy = p.y - my,
          d2 = dx * dx + dy * dy;
        if (d2 < 22000) {
          const f = 900 / (d2 + 50);
          p.vx += dx * f * 0.05;
          p.vy += dy * f * 0.05;
        }
        p.vx += (p.hx - p.x) * 0.012;
        p.vy += (p.hy - p.y) * 0.012;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.big ? "#c9ab74" : "rgba(243,241,237,0.85)";
        ctx.fillRect(p.x, p.y, p.big ? 5 : 2.5, p.big ? 5 : 2.5);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <canvas ref={ref} className="h-full w-full cursor-crosshair" aria-label="חלקיקים שיוצרים לוח שעון ומתפזרים מהעכבר" />;
}

/* 2. Liquid morph: gooey blobs merging (SVG filter) */
export function LiquidMorph() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" />
        </filter>
      </svg>
      <div className="relative h-56 w-56" style={{ filter: "url(#goo)" }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-[#c9ab74]"
            style={{ animation: `goo${i} ${5 + i}s ease-in-out infinite alternate`, marginLeft: -48, marginTop: -48 }}
          />
        ))}
      </div>
      <style>{`
        @keyframes goo0{to{transform:translate(60px,-40px) scale(1.2)}}
        @keyframes goo1{to{transform:translate(-70px,30px) scale(.8)}}
        @keyframes goo2{to{transform:translate(20px,70px) scale(1.1)}}
        @keyframes goo3{to{transform:translate(-30px,-70px) scale(.9)}}
      `}</style>
      <p className="absolute bottom-4 text-sm text-white/60">מתכת נוזלית שמתמזגת</p>
    </div>
  );
}

/* 3. Holographic: iridescent sheen following the mouse */
export function Holographic() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    ref.current!.style.setProperty("--x", `${x * 100}%`);
    ref.current!.style.setProperty("--y", `${y * 100}%`);
    ref.current!.style.transform = `perspective(700px) rotateY(${(x - 0.5) * 18}deg) rotateX(${(0.5 - y) * 18}deg)`;
  };
  return (
    <div className="grid h-full place-items-center">
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
        className="relative h-64 w-44 overflow-hidden rounded-2xl bg-[#1c1c1c] transition-transform duration-200"
        style={{ ["--x" as string]: "50%", ["--y" as string]: "50%" }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-28 w-28 rounded-full border-[6px] border-white/80" />
        </div>
        <div
          className="absolute inset-0 mix-blend-color-dodge"
          style={{
            background:
              "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,.55), transparent 40%), linear-gradient(115deg, #ff0080, #ffb300, #00ffa3, #00b3ff, #a100ff, #ff0080)",
            backgroundSize: "100% 100%, 300% 300%",
            backgroundPosition: "center, var(--x) var(--y)",
            opacity: 0.55,
          }}
        />
        <p className="absolute inset-x-0 bottom-3 text-center text-xs tracking-[0.3em] text-white/80">LIMITED</p>
      </div>
    </div>
  );
}

/* 4. Neon glow: glowing digital time */
export function NeonGlow() {
  const now = useNow();
  const t = now ? now.toTimeString().slice(0, 5) : "--:--";
  return (
    <div className="grid h-full place-items-center bg-[#05060a]">
      <p
        dir="ltr"
        className="font-mono text-7xl font-bold tracking-widest text-[#7dfcff]"
        style={{ textShadow: "0 0 6px #7dfcff, 0 0 18px #00e1ff, 0 0 42px #00a6ff, 0 0 80px #0066ff", animation: "flick 4s infinite" }}
      >
        {t}
      </p>
      <style>{`@keyframes flick{0%,92%,100%{opacity:1}93%{opacity:.55}95%{opacity:1}97%{opacity:.7}}`}</style>
    </div>
  );
}

/* 5. Wireframe 3D: a rotating wireframe watch case drawn on canvas */
export function Wireframe() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const W = (c.width = c.offsetWidth * 2),
      H = (c.height = c.offsetHeight * 2);
    let a = 0,
      raf = 0,
      mx = 0;
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    };
    c.addEventListener("pointermove", move);
    const proj = (x: number, y: number, z: number, ry: number, rx: number) => {
      const cy = Math.cos(ry),
        sy = Math.sin(ry),
        cx = Math.cos(rx),
        sx = Math.sin(rx);
      const x1 = x * cy - z * sy,
        z1 = x * sy + z * cy;
      const y1 = y * cx - z1 * sx,
        z2 = y * sx + z1 * cx;
      const f = 900 / (900 + z2);
      return [W / 2 + x1 * f, H / 2 + y1 * f];
    };
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(125,252,255,0.75)";
      ctx.lineWidth = 1.4;
      const ry = a + mx,
        rx = 0.5;
      const R = Math.min(W, H) * 0.28,
        seg = 40;
      for (const z of [-30, 0, 30]) {
        ctx.beginPath();
        for (let i = 0; i <= seg; i++) {
          const t = (i / seg) * Math.PI * 2;
          const [x, y] = proj(Math.cos(t) * R, Math.sin(t) * R, z, ry, rx);
          if (i) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      for (let i = 0; i < seg; i += 2) {
        const t = (i / seg) * Math.PI * 2;
        const [x1, y1] = proj(Math.cos(t) * R, Math.sin(t) * R, -30, ry, rx);
        const [x2, y2] = proj(Math.cos(t) * R, Math.sin(t) * R, 30, ry, rx);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      for (const s of [-1, 1]) {
        ctx.beginPath();
        for (const [x, y] of [
          [-R * 0.45, s * R],
          [-R * 0.38, s * R * 1.7],
          [R * 0.38, s * R * 1.7],
          [R * 0.45, s * R],
        ]) {
          const [px, py] = proj(x, y, 0, ry, rx);
          ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      const [hx, hy] = proj(0, -R * 0.6, -30, ry, rx);
      const [cx0, cy0] = proj(0, 0, -30, ry, rx);
      ctx.beginPath();
      ctx.moveTo(cx0, cy0);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      if (!reduced()) a += 0.008;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={ref} className="h-full w-full bg-[#04080c]" aria-label="מודל תלת־ממד של מארז שעון בקווים" />;
}

/* 6. Glassmorphism: frosted panel over a photo */
export function Glass() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/art/col-sport.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative w-64 rounded-2xl border border-white/30 bg-white/15 p-6 text-white shadow-2xl backdrop-blur-xl">
        <p className="text-xs tracking-widest text-white/80">TISSOT · PRX</p>
        <p className="mt-2 text-2xl font-bold">פי־אר־איקס</p>
        <p className="mt-1 text-sm text-white/85">₪1,649</p>
        <span className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black">הוספה לסל</span>
      </div>
    </div>
  );
}

/* 7. Kinetic type: big words that slide with the mouse */
export function KineticType() {
  const [x, setX] = useState(0);
  return (
    <div
      className="flex h-full flex-col justify-center overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setX((e.clientX - r.left) / r.width - 0.5);
      }}
    >
      {["זמן", "רגע", "דיוק"].map((w, i) => (
        <p
          key={w}
          className="font-display text-8xl leading-[0.9] font-black whitespace-nowrap transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${x * (i % 2 ? -260 : 260)}px)`,
            color: i === 1 ? "#c9ab74" : "transparent",
            WebkitTextStroke: i === 1 ? undefined : "1.5px #f3f1ed",
          }}
        >
          {w} {w} {w} {w}
        </p>
      ))}
    </div>
  );
}

/* 8. Split-flap: airport board clock */
function Flap({ ch }: { ch: string }) {
  const [shown, setShown] = useState(ch);
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    if (ch === shown) return;
    setFlip(true);
    const t = setTimeout(() => {
      setShown(ch);
      setFlip(false);
    }, 300);
    return () => clearTimeout(t);
  }, [ch, shown]);
  return (
    <span className="relative inline-grid h-24 w-16 place-items-center overflow-hidden rounded-md bg-[#1b1b1b] font-mono text-6xl font-bold text-[#f3f1ed] shadow-inner">
      {shown}
      <span className="absolute inset-x-0 top-1/2 h-px bg-black" />
      <span
        className="absolute inset-x-0 top-0 h-1/2 origin-bottom bg-[#232323] transition-transform duration-300"
        style={{ transform: flip ? "rotateX(-90deg)" : "rotateX(0deg)", opacity: flip ? 1 : 0 }}
      />
    </span>
  );
}
export function SplitFlap() {
  const now = useNow();
  const s = now ? now.toTimeString().slice(0, 8).replace(/:/g, "") : "000000";
  return (
    <div dir="ltr" className="flex h-full items-center justify-center gap-1.5 bg-[#0e0e0e]">
      {s.split("").map((c, i) => (
        <span key={i} className={i === 2 || i === 4 ? "ms-3" : ""}>
          <Flap ch={c} />
        </span>
      ))}
    </div>
  );
}

/* 9. ASCII art: a photo rendered as characters, live */
export function Ascii() {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const img = new Image();
    img.src = "/art/film-gears.jpg";
    img.onload = () => {
      const cols = 110,
        rows = 42;
      const c = document.createElement("canvas");
      c.width = cols;
      c.height = rows;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0, cols, rows);
      const d = ctx.getImageData(0, 0, cols, rows).data;
      const ramp = " .:-=+*#%@";
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
          out += ramp[Math.min(ramp.length - 1, Math.floor(l * ramp.length))];
        }
        out += "\n";
      }
      setTxt(out);
    };
  }, []);
  return (
    <pre dir="ltr" className="grid h-full place-items-center overflow-hidden bg-black font-mono text-[6px] leading-[6px] text-[#c9ab74] sm:text-[7px] sm:leading-[7px]" aria-label="תמונת גלגלי שיניים בתווים">
      {txt}
    </pre>
  );
}

/* 10. Blueprint: technical drawing that draws itself */
export function Blueprint() {
  return (
    <div className="grid h-full place-items-center bg-[#0b2a4a] bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:24px_24px]">
      <svg viewBox="0 0 300 300" className="h-[85%]" fill="none" stroke="#cfe6ff" strokeWidth="1.2">
        <g style={{ strokeDasharray: 1200, strokeDashoffset: 1200, animation: "draw 4s ease forwards infinite alternate" }}>
          <circle cx="150" cy="150" r="90" />
          <circle cx="150" cy="150" r="76" />
          <rect x="120" y="20" width="60" height="40" />
          <rect x="120" y="240" width="60" height="40" />
          <rect x="240" y="140" width="16" height="20" />
          <line x1="150" y1="150" x2="150" y2="90" />
          <line x1="150" y1="150" x2="195" y2="150" />
          <line x1="40" y1="150" x2="60" y2="150" />
          <line x1="40" y1="60" x2="40" y2="240" strokeDasharray="4 4" />
        </g>
        <text x="20" y="150" fill="#cfe6ff" stroke="none" fontSize="9" transform="rotate(-90 20 150)" textAnchor="middle">⌀ 40 mm</text>
        <text x="150" y="295" fill="#cfe6ff" stroke="none" fontSize="9" textAnchor="middle">LUG 20 mm</text>
      </svg>
      <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
    </div>
  );
}

/* 11. Gradient mesh: slow moving color fields */
export function GradientMesh() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0a0a0a]">
      {[
        ["#c9ab74", "10%", "20%", 18],
        ["#1f3a68", "60%", "10%", 22],
        ["#5b6b55", "30%", "60%", 26],
        ["#6d4bd8", "70%", "65%", 20],
      ].map(([c, l, t, d], i) => (
        <span
          key={i}
          className="absolute h-72 w-72 rounded-full opacity-70 blur-3xl"
          style={{ background: c as string, left: l as string, top: t as string, animation: `mesh${i} ${d}s ease-in-out infinite alternate` }}
        />
      ))}
      <style>{`
        @keyframes mesh0{to{transform:translate(120px,80px)}}
        @keyframes mesh1{to{transform:translate(-100px,120px)}}
        @keyframes mesh2{to{transform:translate(140px,-90px)}}
        @keyframes mesh3{to{transform:translate(-130px,-60px)}}
      `}</style>
      <p className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-white">רגע</p>
    </div>
  );
}

/* 12. Halftone: photo as printed dots */
export function Halftone() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const W = (c.width = c.offsetWidth * 2),
      H = (c.height = c.offsetHeight * 2);
    const img = new Image();
    img.src = "/art/col-dress.jpg";
    img.onload = () => {
      const s = 12;
      const t = document.createElement("canvas");
      t.width = Math.ceil(W / s);
      t.height = Math.ceil(H / s);
      const tc = t.getContext("2d")!;
      const ar = img.width / img.height,
        car = W / H;
      let sw = img.width,
        sh = img.height,
        sx = 0,
        sy = 0;
      if (ar > car) {
        sw = img.height * car;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / car;
        sy = (img.height - sh) / 2;
      }
      tc.drawImage(img, sx, sy, sw, sh, 0, 0, t.width, t.height);
      const d = tc.getImageData(0, 0, t.width, t.height).data;
      ctx.fillStyle = "#f3efe6";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#111";
      for (let y = 0; y < t.height; y++)
        for (let x = 0; x < t.width; x++) {
          const i = (y * t.width + x) * 4;
          const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
          const r = (1 - l) * s * 0.62;
          ctx.beginPath();
          ctx.arc(x * s + s / 2, y * s + s / 2, r, 0, Math.PI * 2);
          ctx.fill();
        }
    };
  }, []);
  return <canvas ref={ref} className="h-full w-full" aria-label="תמונה בסגנון הדפסת נקודות" />;
}
