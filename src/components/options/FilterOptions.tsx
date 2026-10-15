import Image from "next/image";
import { brands, collections, type Collection } from "@/data/products";

// Four shop filter-bar directions as static mocks, for comparison only.

const cols = (Object.keys(collections) as Collection[]).map((k) => ({ k, name: collections[k].name }));
const chev = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const sliders = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </svg>
);

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">{children}</div>;
}

function Title() {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h3 className="font-display text-4xl font-bold">כל השעונים</h3>
      <p className="text-[14px] text-muted">127 דגמים</p>
    </div>
  );
}

// SF1: one line. Collection as a segmented control, the rest as dropdown buttons.
function SF1() {
  return (
    <Frame>
      <Title />
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <div className="flex flex-wrap gap-1 rounded-full bg-sand p-1 text-[14px]">
          {[{ k: "all", name: "הכל" }, ...cols].map((c, i) => (
            <span key={c.k} className={`rounded-full px-4 py-1.5 ${i === 0 ? "bg-paper font-semibold shadow-sm" : "text-ink-soft"}`}>
              {c.name}
            </span>
          ))}
        </div>
        <div className="flex gap-2 text-[14px]">
          {["מותג", "מחיר", "מיון: מומלצים"].map((d) => (
            <span key={d} className="flex items-center gap-2 rounded-full border border-line-strong px-4 py-2">
              {d} {chev}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// SF2: a filter sidebar with checkbox groups beside the grid.
function SF2() {
  return (
    <Frame>
      <Title />
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-6 text-[14px]">
          <div>
            <p className="mb-3 text-[12px] font-semibold tracking-wide text-gold">קולקציה</p>
            {cols.slice(0, 5).map((c, i) => (
              <p key={c.k} className="flex items-center gap-3 py-1">
                <span className={`h-4 w-4 border ${i === 1 ? "border-ink bg-ink" : "border-line-strong"}`} />
                {c.name}
              </p>
            ))}
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold tracking-wide text-gold">מותג</p>
            {brands.slice(0, 6).map((b, i) => (
              <p key={b} className="flex items-center justify-between py-1">
                <span className="flex items-center gap-3">
                  <span className={`h-4 w-4 border ${i === 0 ? "border-ink bg-ink" : "border-line-strong"}`} />
                  <span dir="ltr">{b}</span>
                </span>
              </p>
            ))}
            <p className="pt-1 text-[13px] underline underline-offset-4">עוד מותגים</p>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold tracking-wide text-gold">מחיר</p>
            <div className="relative h-1 rounded bg-line">
              <div className="absolute inset-y-0 start-[10%] end-[40%] rounded bg-ink" />
            </div>
            <p className="mt-2 flex justify-between text-[13px] text-muted">
              <span>₪300</span>
              <span>₪6,000</span>
            </p>
          </div>
        </aside>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="aspect-square bg-sand" />
          ))}
        </div>
      </div>
    </Frame>
  );
}

// SF3: a compact toolbar. One "filter" button opens a panel; active filters show as chips.
function SF3() {
  return (
    <Frame>
      <Title />
      <div className="flex items-center justify-between border-y border-line py-3 text-[14px]">
        <span className="flex items-center gap-2 font-semibold">
          {sliders} סינון <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] text-on-cta">2</span>
        </span>
        <span className="flex items-center gap-2 text-ink-soft">
          מיון: <span className="text-ink">מומלצים</span> {chev}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
        {["ספורט יומיומי", "Casio"].map((c) => (
          <span key={c} className="flex items-center gap-2 border border-ink px-3 py-1.5">
            {c} <span aria-hidden>×</span>
          </span>
        ))}
        <span className="px-2 py-1.5 text-muted underline underline-offset-4">ניקוי</span>
      </div>
      <div className="mt-6 rounded-xl border border-line bg-card p-5 text-[14px] shadow-[0_20px_40px_-30px_rgba(0,0,0,0.4)]">
        <p className="mb-3 text-[12px] text-muted">כך נראה הפאנל אחרי לחיצה על סינון</p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-2 font-semibold">קולקציה</p>
            {cols.slice(0, 4).map((c) => (
              <p key={c.k} className="py-0.5 text-ink-soft">{c.name}</p>
            ))}
          </div>
          <div>
            <p className="mb-2 font-semibold">מותג</p>
            {brands.slice(0, 4).map((b) => (
              <p key={b} className="py-0.5 text-ink-soft" dir="ltr">{b}</p>
            ))}
          </div>
          <div>
            <p className="mb-2 font-semibold">מחיר</p>
            {["עד 1,000 ש״ח", "1,000 עד 5,000 ש״ח", "מעל 5,000 ש״ח"].map((b) => (
              <p key={b} className="py-0.5 text-ink-soft">{b}</p>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// SF4: collections as round photo tabs, then two small dropdowns.
function SF4() {
  const art: Record<string, string> = { sport: "col-sport", field: "col-field", dress: "col-dress", vintage: "col-digital", gshock: "col-gshock", straps: "col-straps" };
  return (
    <Frame>
      <Title />
      <div className="flex gap-6 overflow-x-auto pb-2">
        {cols.map((c, i) => (
          <div key={c.k} className="flex w-20 shrink-0 flex-col items-center gap-2 text-center text-[13px]">
            <div className={`relative h-20 w-20 overflow-hidden rounded-full ${i === 0 ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`}>
              <Image src={`/art/${art[c.k]}.jpg`} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <span className={i === 0 ? "font-semibold" : "text-ink-soft"}>{c.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[14px]">
        <div className="flex gap-6">
          <span className="flex items-center gap-1">מותג {chev}</span>
          <span className="flex items-center gap-1">מחיר {chev}</span>
        </div>
        <span className="flex items-center gap-1 text-ink-soft">
          מומלצים {chev}
        </span>
      </div>
    </Frame>
  );
}

export default function FilterOptions() {
  const items = [
    { n: "SF1", name: "שורה אחת עם תפריטים נפתחים", note: "הקולקציה ככפתור מפולח, ומותג, מחיר ומיון כתפריטים קטנים.", C: SF1 },
    { n: "SF2", name: "סרגל צד", note: "תיבות סימון לקולקציה ולמותג, וסרגל מחיר. מתאים לקטלוג גדול.", C: SF2 },
    { n: "SF3", name: "כפתור סינון אחד", note: "שורה נקייה עם כפתור סינון ומיון. הבחירות מופיעות כתגיות שאפשר להסיר.", C: SF3 },
    { n: "SF4", name: "עיגולי תמונה", note: "הקולקציות כעיגולים עם תמונה, ומתחת שני תפריטים קטנים.", C: SF4 },
  ];
  return (
    <div className="space-y-12">
      {items.map(({ n, name, note, C }) => (
        <div key={n}>
          <h3 className="text-xl font-bold">
            <span className="me-2 font-mono text-gold">{n}</span>
            {name}
          </h3>
          <p className="mb-4 text-[15px] text-muted">{note}</p>
          <C />
        </div>
      ))}
    </div>
  );
}
