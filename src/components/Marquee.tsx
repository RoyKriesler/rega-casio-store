// Infinite ticker of big outlined words. Pure CSS; pauses on hover and for reduced motion.
export default function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-12 pe-12" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-12">
          <span dir="ltr" className="font-display text-6xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_var(--color-ink-soft)] transition-colors hover:text-ink sm:text-8xl">
            {t}
          </span>
          <span className="h-2 w-2 rounded-full bg-gold" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="group relative flex overflow-hidden py-10" dir="ltr">
      <p className="sr-only">{items.join(", ")}</p>
      <div className="flex animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </div>
  );
}
