import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideBySlug, guides } from "@/data/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  return g ? { title: g.title, description: g.summary } : {};
}

const relatedLabel: Record<string, string> = {
  "/shop?c=sport": "לשעוני ספורט",
  "/shop?c=dress": "לשעונים אלגנטיים",
  "/shop?c=field": "לשעוני שדה",
  "/shop?c=straps": "לרצועות",
  "/shop?c=gshock": "לג׳י־שוק",
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const others = guides.filter((x) => x.slug !== g.slug);

  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-14">
      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">בית</Link>
        <span className="mx-2" aria-hidden>‹</span>
        <Link href="/guides" className="hover:text-ink">מדריכים</Link>
      </nav>
      <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight">{g.title}</h1>
      <p className="mt-4 text-xl leading-relaxed text-ink-soft">{g.summary}</p>

      <div className="mt-10 space-y-8 border-t border-line pt-8">
        {g.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold">{s.heading}</h2>
            <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-6">
        {g.related.map((r) => (
          <Link key={r} href={r} className="bg-cta px-5 py-3 text-[15px] font-semibold text-on-cta hover:bg-cta-hover">
            {relatedLabel[r] ?? "לחנות"}
          </Link>
        ))}
      </div>

      <aside className="mt-14">
        <h2 className="text-sm font-semibold text-muted">מדריכים נוספים</h2>
        <ul className="mt-3 space-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/guides/${o.slug}`} className="underline underline-offset-4 hover:text-ink-soft">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
