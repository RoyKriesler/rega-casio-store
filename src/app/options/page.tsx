import type { Metadata } from "next";
import MenuOptions from "@/components/options/MenuOptions";

export const metadata: Metadata = { title: "אפשרויות לבחירה" };

export default function OptionsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8">
      <h1 className="font-display text-5xl font-extralight tracking-tight">תפריט הקולקציות</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">ארבע דרכים להציג את הקולקציות כשלוחצים על קולקציות בפס העליון. עברו עם העכבר ותגידו לי לפי הקוד.</p>
      <div className="mt-14">
        <MenuOptions />
      </div>
    </div>
  );
}
