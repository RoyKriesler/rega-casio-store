import type { Metadata } from "next";
import ExplodedView from "@/components/anatomy/ExplodedView";
import InkBlueprint from "@/components/anatomy/InkBlueprint";
import Watch3D from "@/components/anatomy/Watch3D";
import HoverCard, { type HoverStyle } from "@/components/HoverCard";
import RetroScrubWatch from "@/components/RetroScrubWatch";
import ScrubWatch from "@/components/ScrubWatch";
import WatchAnatomy from "@/components/WatchAnatomy";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "אפשרויות לבחירה" };

const hovers: { id: HoverStyle; n: string; name: string; note: string }[] = [
  { id: "current", n: "H0", name: "הנוכחי", note: "הטיה בתלת־ממד, ברק וזום. להשוואה בלבד." },
  { id: "still", n: "H1", name: "כמעט כלום", note: "התמונה מתבהרת מעט והשם מקבל קו תחתון." },
  { id: "zoom", n: "H2", name: "זום איטי", note: "התקרבות קטנה מאוד ואיטית." },
  { id: "swap", n: "H3", name: "תמונה שנייה", note: "מעבר רך לזווית אחרת של הדגם, כמו בחנויות יוקרה." },
  { id: "lift", n: "H4", name: "הרמה", note: "הכרטיס עולה מעט עם צל רך." },
  { id: "reveal", n: "H5", name: "כפתור נחשף", note: "פס עם קישור לדגם עולה מתחתית התמונה." },
];

export default function OptionsPage() {
  const p = getProduct("prx-powermatic-80")!;
  const diameter = "40";
  const parts = [
    { label: "זכוכית ספיר", detail: "עמידה בשריטות, עם ציפוי נגד השתקפות." },
    { label: "בזל מלוטש", detail: "טבעת הפלדה שמסגרת את הלוח." },
    { label: "לוח כחול מחורץ", detail: "מחוגים ואינדקסים מלוטשים." },
    { label: "מנגנון אוטומטי", detail: "רזרבה של 80 שעות, נטען מתנועת היד." },
    { label: "מארז פלדה", detail: `קוטר ${diameter} מ״מ, עמידות 100 מטר.` },
    { label: "גב שקוף", detail: "רואים את המנגנון עובד." },
  ];
  return (
    <>
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
      <h1 className="font-display text-5xl font-bold tracking-tight">אפשרויות לבחירה</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">כל קטע כאן מציג כמה גרסאות של אותו דבר. עברו עליהן ותגידו לי לפי הקוד איזו נכנסת לאתר.</p>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold">ריחוף על כרטיס מוצר</h2>
        <p className="mt-2 text-ink-soft">העבירו את העכבר מעל כל כרטיס.</p>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-6">
          {hovers.map((h) => (
            <li key={h.id}>
              <HoverCard product={p} style={h.id} />
              <p className="mt-4 text-sm font-bold">
                <span className="me-2 font-mono text-gold">{h.n}</span>
                {h.name}
              </p>
              <p className="text-[13px] text-muted">{h.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">המבנה בעמוד המוצר</h2>
        <p className="mt-2 text-ink-soft">שלוש גרסאות חדשות, ואחריהן הגרסה הנוכחית להשוואה.</p>

        <h3 className="mt-10 text-xl font-bold">
          <span className="me-2 font-mono text-gold">S1</span>שעון תלת־ממד אמיתי
        </h3>
        <p className="text-[15px] text-muted">מארז פלדה, לוח כחול, צמיד משולב ומחוגים בשעה שלכם. אפשר לגרור כדי לסובב.</p>
        <div className="mt-4">
          <Watch3D dial="#1f3a68" />
        </div>

        <h3 className="mt-16 text-xl font-bold">
          <span className="me-2 font-mono text-gold">S2</span>תצוגה מפורקת בגלילה
        </h3>
        <p className="text-[15px] text-muted">גללו, והשעון נפתח לשכבות: זכוכית, בזל, לוח, מנגנון, מארז וגב.</p>
        <ExplodedView parts={parts} dial="#1f3a68" />

        <h3 className="mt-16 text-xl font-bold">
          <span className="me-2 font-mono text-gold">S3</span>שרטוט דיו על נייר
        </h3>
        <p className="text-[15px] text-muted">מבט חזית ומבט צד שמצטיירים לאט, עם מספרים שמוסברים בצד.</p>
        <div className="mt-4">
          <InkBlueprint
            diameter={diameter}
            callouts={[
              { label: "בזל וזכוכית", detail: "זכוכית ספיר מעל לוח כחול מחורץ." },
              { label: "לוח ומחוגים", detail: "אינדקסים מלוטשים, חלון תאריך בשלוש." },
              { label: "כתר", detail: "מכוונים בו את השעה ואת התאריך." },
              { label: "פרופיל", detail: "מארז דק שזורם ישר לתוך הצמיד." },
            ]}
          />
        </div>

        <h3 className="mt-16 text-xl font-bold text-muted">
          <span className="me-2 font-mono">S0</span>הגרסה הנוכחית
        </h3>
        <WatchAnatomy diameter={diameter} />
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">השעון שמסתובב בגלילה</h2>
        <h3 className="mt-6 text-xl font-bold">
          <span className="me-2 font-mono text-gold">W1</span>דיגיטלי רטרו מציאותי
        </h3>
        <p className="text-[15px] text-muted">צילום של שעון דיגיטלי מפלדה, והמסך מריץ את השעות בזמן גלילה. בסוף מופיעה השעה האמיתית.</p>
      </section>
    </div>
    <RetroScrubWatch />
    <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-8">
      <h3 className="text-xl font-bold text-muted">
        <span className="me-2 font-mono">W0</span>הגרסה הנוכחית
      </h3>
    </div>
    <ScrubWatch />
    <div className="h-24" />
    </>
  );
}
