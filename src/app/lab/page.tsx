import type { Metadata } from "next";
import {
  Ascii,
  Blueprint,
  Glass,
  GradientMesh,
  Halftone,
  Holographic,
  KineticType,
  LiquidMorph,
  NeonGlow,
  Particles,
  SplitFlap,
  Wireframe,
} from "@/components/lab/Effects";

export const metadata: Metadata = { title: "מעבדת אפקטים" };

const items = [
  { n: 1, name: "חלקיקים", en: "Particles", idea: "לוח שעון שבנוי מחלקיקים ומתפזר כשמעבירים עליו את העכבר. מתאים לפתיחה של דף הבית.", C: Particles },
  { n: 13, name: "לוח מתהפך", en: "Split-flap", idea: "השעה האמיתית על לוח של שדה תעופה. מתאים לשעון החי במקום שעון היד, או לספירה לאחור למבצע.", C: SplitFlap },
  { n: 5, name: "תלת־ממד בקווים", en: "Wireframe 3D", idea: "מארז שעון שמסתובב בקווי מתאר וזז עם העכבר. מתאים לדף מוצר, להראות מבנה.", C: Wireframe },
  { n: 18, name: "שרטוט טכני", en: "Blueprint", idea: "שרטוט של השעון שמצייר את עצמו, עם קוטר ורוחב רצועה. מתאים למדריך הגדלים ולמפרט.", C: Blueprint },
  { n: 3, name: "הולוגרפי", en: "Holographic", idea: "כרטיס מוצר עם ברק של קשת שזז עם העכבר. מתאים לדגמים במהדורה מוגבלת.", C: Holographic },
  { n: 4, name: "ניאון", en: "Neon glow", idea: "שעה זוהרת עם הבהוב עדין. מתאים לקולקציה הדיגיטלית ולג׳י־שוק.", C: NeonGlow },
  { n: 7, name: "טיפוגרפיה בתנועה", en: "Kinetic type", idea: "מילים ענקיות שזזות עם העכבר. מתאים כמעבר בין קטעים בדף הבית.", C: KineticType },
  { n: 6, name: "זכוכית חלבית", en: "Glassmorphism", idea: "כרטיס מוצר שקוף מעל תמונת אווירה. מתאים לחלון קופץ של הוספה לסל.", C: Glass },
  { n: 10, name: "אמנות תווים", en: "ASCII art", idea: "תמונת מנגנון שבנויה מתווים. מתאים לקטע הסרטים או לעמוד שגיאה.", C: Ascii },
  { n: 15, name: "הדפסת נקודות", en: "Halftone", idea: "תמונת אווירה בסגנון של עיתון ישן. מתאים לכתבות ולמדריכים.", C: Halftone },
  { n: 2, name: "מתכת נוזלית", en: "Liquid morph", idea: "גושים של זהב שמתמזגים זה בזה. מתאים לרקע של מסך טעינה.", C: LiquidMorph },
  { n: 11, name: "צבעים זורמים", en: "Gradient mesh", idea: "שדות צבע איטיים בצבעי הלוחות של השעונים. מתאים לרקע של קטע המותגים.", C: GradientMesh },
];

export default function LabPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
      <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">מעבדת אפקטים</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        שתים עשרה דוגמאות חיות מתוך הרשימה, כל אחת עם רעיון איך לשלב אותה בחנות. נסו להזיז את העכבר מעליהן, ובחרו לפי המספרים מה נכנס לאתר.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ n, name, en, idea, C }) => (
          <li key={en} className="overflow-hidden rounded-2xl border border-line bg-card">
            <div className="h-72 overflow-hidden bg-black">
              <C />
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-xl font-bold">
                  <span className="me-2 font-mono text-sm text-gold">{String(n).padStart(2, "0")}</span>
                  {name}
                </h2>
                <span dir="ltr" className="font-mono text-xs text-muted">{en}</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{idea}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
