import Image from "next/image";
import { formatPrice, getProduct, isCommons, photoUrl, type Product } from "@/data/products";

// Four cart-drawer directions as static panels, for comparison only.

const X = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

function Thumb({ p, className }: { p: Product; className: string }) {
  const ph = p.photos[0];
  return (
    <div className={`relative shrink-0 overflow-hidden bg-sand ${className}`}>
      <Image src={photoUrl(ph.id, 400, 400)} unoptimized={isCommons(ph.id)} alt="" fill sizes="160px" className="object-cover" />
    </div>
  );
}

function Panel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`flex h-[620px] flex-col overflow-hidden rounded-2xl border ${dark ? "border-[#2a2622] bg-[#141210] text-[#efe6d6]" : "border-line bg-paper text-ink"}`}>{children}</div>;
}

// CD1: editorial. Larger photos, serif names, quiet quantity, full summary.
function CD1({ a, b }: { a: Product; b: Product }) {
  const total = a.price + b.price;
  return (
    <Panel>
      <div className="flex items-center justify-between px-6 py-5">
        <p className="font-display text-2xl font-bold">הסל · 2</p>
        {X}
      </div>
      <p className="px-6 text-[13px] text-ink-soft">המשלוח עלינו. נשאר רק לבחור.</p>
      <div className="mx-6 mt-3 h-px bg-gold" />
      <ul className="flex-1 space-y-6 overflow-hidden px-6 py-6">
        {[a, b].map((p) => (
          <li key={p.slug} className="flex gap-4">
            <Thumb p={p} className="h-28 w-24" />
            <div className="flex flex-1 flex-col">
              <p className="font-mono text-[11px] text-muted" dir="ltr">
                {p.brand.toUpperCase()} · {p.model}
              </p>
              <p className="font-display text-lg font-bold">{p.name}</p>
              <p className="mt-auto flex justify-between text-[14px]">
                <span className="text-ink-soft">כמות 1 · הסרה</span>
                <span>{formatPrice(p.price)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-2 border-t border-line px-6 py-5 text-[14px]">
        <p className="flex justify-between text-ink-soft">
          <span>משלוח</span>
          <span>חינם</span>
        </p>
        <p className="flex justify-between text-lg font-semibold">
          <span>סך הכול</span>
          <span>{formatPrice(total)}</span>
        </p>
        <span className="mt-3 block bg-cta py-4 text-center text-[15px] font-semibold text-on-cta">לתשלום</span>
      </div>
    </Panel>
  );
}

// CD2: cards with a small upsell row of straps.
function CD2({ a, s1, s2 }: { a: Product; s1: Product; s2: Product }) {
  return (
    <Panel>
      <div className="flex items-center justify-between px-6 py-5">
        <p className="text-xl font-semibold">הסל שלך</p>
        {X}
      </div>
      <div className="px-6">
        <div className="rounded-xl bg-card p-3">
          <p className="text-[13px]">עוד {formatPrice(500 - a.price)} למשלוח חינם</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
            <div className="h-full rounded-full bg-gold" style={{ width: `${(a.price / 500) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-6 py-4">
        <div className="flex gap-3 rounded-xl bg-card p-3 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.4)]">
          <Thumb p={a} className="h-20 w-20 rounded-lg" />
          <div className="flex flex-1 flex-col">
            <p className="font-semibold">{a.name}</p>
            <p className="text-[13px] text-muted">{a.model}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-3 rounded-full border border-line px-3 py-0.5 text-[14px]">
                <span>−</span>1<span>+</span>
              </span>
              <span className="text-[15px]">{formatPrice(a.price)}</span>
            </div>
          </div>
        </div>
        <p className="mt-6 text-[13px] font-semibold text-gold">משלים את השעון</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[s1, s2].map((s) => (
            <div key={s.slug} className="rounded-xl bg-card p-2">
              <Thumb p={s} className="aspect-square w-full rounded-lg" />
              <p className="mt-2 truncate text-[13px] font-semibold">{s.name}</p>
              <p className="flex items-center justify-between text-[13px]">
                {formatPrice(s.price)} <span className="rounded-full border border-ink px-2 text-[12px]">הוספה</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line px-6 py-5">
        <span className="block rounded-full bg-cta py-4 text-center text-[15px] font-semibold text-on-cta">לתשלום · {formatPrice(a.price)}</span>
      </div>
    </Panel>
  );
}

// CD3: dark and quiet, gold accents, outline call to action.
function CD3({ a }: { a: Product }) {
  return (
    <Panel dark>
      <div className="flex items-center justify-between px-6 py-6">
        <p className="font-display text-2xl tracking-[0.2em] text-[#c9a96a]">הסל</p>
        {X}
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96a]/50 to-transparent" />
      <div className="flex-1 px-6 py-8">
        <Thumb p={a} className="mx-auto aspect-square w-44" />
        <p className="mt-5 text-center font-display text-2xl">{a.name}</p>
        <p className="mt-1 text-center font-mono text-[12px] text-[#efe6d6]/60" dir="ltr">
          {a.brand.toUpperCase()} · {a.model}
        </p>
        <p className="mt-3 text-center text-lg">{formatPrice(a.price)}</p>
        <p className="mt-4 text-center text-[13px] text-[#efe6d6]/60">כמות 1 · הסרה</p>
      </div>
      <div className="space-y-3 px-6 pb-6">
        <p className="text-center text-[13px] text-[#efe6d6]/70">עוד {formatPrice(500 - a.price)} ומשלוח חינם</p>
        <span className="block border border-[#c9a96a] py-4 text-center text-[15px] tracking-[0.1em] text-[#c9a96a]">לתשלום</span>
        <span className="block text-center text-[13px] text-[#efe6d6]/60">להמשך קנייה</span>
      </div>
    </Panel>
  );
}

// CD4: a short confirmation sheet right after adding, instead of the full drawer.
function CD4({ a }: { a: Product }) {
  return (
    <div className="flex h-[620px] flex-col justify-start rounded-2xl border border-line bg-sand/50 p-4">
      <div className="rounded-xl border border-line bg-paper p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)]">
        <p className="flex items-center gap-2 text-[14px] font-semibold">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="m5 12 4.5 4.5L19 7" />
          </svg>
          נוסף לסל
        </p>
        <div className="mt-4 flex gap-4">
          <Thumb p={a} className="h-20 w-20" />
          <div>
            <p className="font-semibold">{a.name}</p>
            <p className="text-[13px] text-muted">{a.model}</p>
            <p className="mt-1 text-[15px]">{formatPrice(a.price)}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-[14px] font-semibold">
          <span className="border border-ink py-3 text-center">לסל (1)</span>
          <span className="bg-cta py-3 text-center text-on-cta">לתשלום</span>
        </div>
      </div>
      <p className="mt-4 px-1 text-[13px] text-muted">חלון קטן שנפתח מתחת לסל בראש הדף ונסגר לבד אחרי כמה שניות. הסל המלא נשאר בעמוד משלו.</p>
    </div>
  );
}

export default function CartOptions() {
  const a = getProduct("dw5600-red")!;
  const b = getProduct("prx-powermatic-80")!;
  const s1 = getProduct("strap-nato")!;
  const s2 = getProduct("strap-leather")!;
  const items = [
    { n: "CD1", name: "מגזין", note: "תמונות גדולות, שמות בסריף, כמות שקטה וסיכום מלא עם משלוח.", el: <CD1 a={a} b={b} /> },
    { n: "CD2", name: "כרטיסים והצעה משלימה", note: "כל פריט בכרטיס, פס התקדמות זהוב, ורצועות שמתאימות לשעון.", el: <CD2 a={a} s1={s1} s2={s2} /> },
    { n: "CD3", name: "כהה עם זהב", note: "רקע כהה, פריט אחד במרכז, כפתור במסגרת זהב.", el: <CD3 a={a} /> },
    { n: "CD4", name: "אישור קצר", note: "במקום מגירה, חלון קטן של נוסף לסל עם שני כפתורים.", el: <CD4 a={a} /> },
  ];
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((it) => (
        <div key={it.n}>
          <h3 className="text-lg font-bold">
            <span className="me-2 font-mono text-gold">{it.n}</span>
            {it.name}
          </h3>
          <p className="mb-3 min-h-[44px] text-[14px] text-muted">{it.note}</p>
          {it.el}
        </div>
      ))}
    </div>
  );
}
