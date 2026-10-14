"use client";

import { useEffect, useRef, useState } from "react";

// A photo drawn as characters; the real photo shows through a soft circle that follows the cursor.
export default function AsciiReveal({ src, label }: { src: string; label: string }) {
  const [txt, setTxt] = useState("");
  const wrap = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const cols = 180,
        rows = 64;
      const c = document.createElement("canvas");
      c.width = cols;
      c.height = rows;
      const ctx = c.getContext("2d")!;
      const ar = img.width / img.height;
      const target = (cols / rows) * 0.55;
      let sw = img.width,
        sh = img.height,
        sx = 0,
        sy = 0;
      if (ar > target) {
        sw = img.height * target;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / target;
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
      setTxt(out);
    };
  }, [src]);

  const move = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const m = `radial-gradient(circle 170px at ${x}px ${y}px, #000 55%, transparent 100%)`;
    photo.current!.style.maskImage = m;
    photo.current!.style.webkitMaskImage = m;
  };
  const leave = () => {
    photo.current!.style.maskImage = "radial-gradient(circle 0 at 50% 50%, #000, transparent)";
    photo.current!.style.webkitMaskImage = "radial-gradient(circle 0 at 50% 50%, #000, transparent)";
  };

  return (
    <div ref={wrap} onPointerMove={move} onPointerLeave={leave} className="relative h-[70svh] min-h-[420px] cursor-none overflow-hidden bg-black" role="img" aria-label={label}>
      <pre dir="ltr" className="absolute inset-0 grid place-items-center overflow-hidden font-mono text-[5px] leading-[6.2px] text-[#c9ab74]/85 select-none sm:text-[7px] sm:leading-[8.6px]" aria-hidden>
        {txt}
      </pre>
      <div
        ref={photo}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, maskImage: "radial-gradient(circle 0 at 50% 50%, #000, transparent)", WebkitMaskImage: "radial-gradient(circle 0 at 50% 50%, #000, transparent)" }}
        aria-hidden
      />
    </div>
  );
}
