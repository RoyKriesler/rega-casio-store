"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type Panel = { key: string; title: string; blurb: string; image: string; href: string; count: number };

// Horizontal accordion in the style of luxury watch homepages: the active panel widens,
// the others collapse to slim strips. Hover, focus or tap a panel to open it.
export default function CollectionsAccordion({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[78svh] min-h-[520px] flex-col gap-1 md:flex-row" role="list">
      {panels.map((p, i) => {
        const open = i === active;
        return (
          <div
            key={p.key}
            role="listitem"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group relative min-h-0 min-w-0 cursor-pointer overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "flex-[5]" : "flex-[1]"
            }`}
          >
            <Image src={p.image} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
            <div className={`absolute inset-0 transition-colors duration-500 ${open ? "bg-black/25" : "bg-black/55"}`} />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <h3
                className={`font-display font-bold text-white transition-all duration-500 ${
                  open ? "text-3xl md:text-4xl" : "text-lg md:text-xl md:[writing-mode:vertical-rl] md:rotate-180"
                }`}
              >
                {p.title}
              </h3>
              <div className={`grid transition-all duration-500 ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="max-w-md text-[15px] leading-relaxed text-white/85">{p.blurb}</p>
                  <div className="mt-5 flex items-center gap-5">
                    <Link
                      href={p.href}
                      tabIndex={open ? 0 : -1}
                      className="bg-white px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white/85"
                    >
                      לגלות
                    </Link>
                    <span className="text-[13px] text-white/70">{p.count} דגמים</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
