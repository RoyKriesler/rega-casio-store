"use client";

import { useState } from "react";
import { Blueprint, Wireframe } from "./lab/Effects";

// Product-page "structure" block: a rotating wireframe of the case and a self-drawing blueprint.
export default function WatchAnatomy({ diameter }: { diameter?: string }) {
  const [view, setView] = useState<"3d" | "plan">("3d");
  const tab = (on: boolean) => `cursor-pointer border-b-2 pb-1 text-[14px] transition-colors ${on ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`;
  return (
    <section className="mt-16 border-t border-line pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold tracking-wide text-gold">המבנה</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">מה יש בפנים</h2>
        </div>
        <div className="flex gap-6" role="tablist" aria-label="תצוגת מבנה">
          <button type="button" role="tab" aria-selected={view === "3d"} onClick={() => setView("3d")} className={tab(view === "3d")}>
            תלת־ממד
          </button>
          <button type="button" role="tab" aria-selected={view === "plan"} onClick={() => setView("plan")} className={tab(view === "plan")}>
            שרטוט
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className={`h-[380px] overflow-hidden rounded-2xl ${view === "3d" ? "" : "hidden md:block"}`}>
          <Wireframe />
        </div>
        <div className={`h-[380px] overflow-hidden rounded-2xl ${view === "plan" ? "" : "hidden md:block"}`}>
          <Blueprint diameter={diameter} loop={false} />
        </div>
      </div>
      <p className="mt-3 text-[13px] text-muted">המודל והשרטוט להמחשה של מבנה המארז והזיזים. המידות מהמפרט של הדגם.</p>
    </section>
  );
}
