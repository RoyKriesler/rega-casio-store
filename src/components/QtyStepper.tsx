"use client";

import { MinusIcon, PlusIcon } from "./icons";

export default function QtyStepper({
  value,
  onChange,
  label,
  small,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  small?: boolean;
}) {
  const size = small ? "h-9 w-9" : "h-12 w-12";
  return (
    <div className="inline-flex items-center rounded-sm border border-line-strong" role="group" aria-label={`כמות עבור ${label}`}>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 9}
        className={`${size} grid cursor-pointer place-items-center rounded-sm hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="הוספת יחידה"
      >
        <PlusIcon width={16} height={16} />
      </button>
      <span className="min-w-6 text-center tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className={`${size} grid cursor-pointer place-items-center rounded-sm hover:bg-sand`}
        aria-label="הפחתת יחידה"
      >
        <MinusIcon width={16} height={16} />
      </button>
    </div>
  );
}
