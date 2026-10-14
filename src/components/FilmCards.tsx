"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Film = { key: string; title: string; caption: string; poster: string; src: string; still?: boolean };

// Soft, rounded "film" cards with a caption in the corner and a small watch button.
// Hovering a card previews the clip; clicking opens it full screen.
export default function FilmCards({ films }: { films: Film[] }) {
  const [open, setOpen] = useState<Film | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {films.map((f, i) => (
          <FilmCard key={f.key} film={f} wide={i === 0} onOpen={() => setOpen(f)} />
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto w-[min(92vw,1100px)] bg-transparent p-0 backdrop:bg-black/85"
        aria-label={open?.title}
      >
        {open && (
          <div className="relative">
            {open.still ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={open.src} alt="" className="h-full w-full object-cover" style={{ animation: "kenburnsA 9000ms linear both" }} />
              </div>
            ) : (
              <video src={open.src} poster={open.poster} autoPlay loop muted playsInline controls className="aspect-video w-full rounded-2xl bg-black object-cover" />
            )}
            <div className="mt-4 flex items-center justify-between gap-4 text-white">
              <p className="text-lg font-semibold">{open.title}</p>
              <button type="button" onClick={() => setOpen(null)} className="cursor-pointer border border-white/60 px-4 py-2 text-[13px] hover:bg-white hover:text-black">
                סגירה
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function FilmCard({ film, wide, onOpen }: { film: Film; wide: boolean; onOpen: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (hover && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    else v.pause();
  }, [hover]);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={`group relative flex cursor-pointer flex-col justify-start overflow-hidden rounded-2xl bg-[#e6e4df] text-start text-[#1a1a1a] ${
        wide ? "aspect-[4/3] md:col-span-2 md:aspect-auto md:min-h-[460px]" : "aspect-[4/3] md:aspect-auto md:min-h-[460px]"
      }`}
      aria-label={`${film.title}, לצפייה בסרט`}
    >
      {film.still ? (
        <Image
          src={film.poster}
          alt=""
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          className="object-cover transition-transform duration-[6000ms] ease-out will-change-transform group-hover:scale-[1.12]"
        />
      ) : (
        <>
          <Image src={film.poster} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-0" />
          <video ref={vid} src={film.src} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
        </>
      )}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#e6e4df] via-[#e6e4df]/70 to-transparent" />
      <div className="relative flex w-full items-start justify-between gap-6 p-6 md:p-8">
        <p className="max-w-sm text-[17px] leading-snug md:text-xl">
          <span className="font-semibold">{film.title}:</span> {film.caption}
        </p>
        <span className="shrink-0 border border-[#1a1a1a]/50 px-2.5 py-1 text-[12px] transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white">
          לצפייה
        </span>
      </div>
    </button>
  );
}
