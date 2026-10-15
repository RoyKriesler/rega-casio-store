import { Assistant, Bellefair, David_Libre, Frank_Ruhl_Libre, Heebo, IBM_Plex_Sans_Hebrew, Karantina, Noto_Sans_Hebrew, Noto_Serif_Hebrew, Rubik, Suez_One } from "next/font/google";

// Font pairings to compare; loaded only on /options.
const frank = Frank_Ruhl_Libre({ subsets: ["hebrew", "latin"], weight: ["400", "700"] });
const assistant = Assistant({ subsets: ["hebrew", "latin"], weight: ["400", "600"] });
const bellefair = Bellefair({ subsets: ["hebrew", "latin"], weight: "400" });
const notoSerif = Noto_Serif_Hebrew({ subsets: ["hebrew", "latin"], weight: ["300", "600"] });
const notoSans = Noto_Sans_Hebrew({ subsets: ["hebrew", "latin"], weight: ["400", "600"] });
const david = David_Libre({ subsets: ["hebrew", "latin"], weight: ["400", "700"] });
const heebo = Heebo({ subsets: ["hebrew", "latin"], weight: ["300", "400", "700", "800"] });
const plex = IBM_Plex_Sans_Hebrew({ subsets: ["hebrew", "latin"], weight: ["200", "400", "600"] });
const suez = Suez_One({ subsets: ["hebrew", "latin"], weight: "400" });
const rubik = Rubik({ subsets: ["hebrew", "latin"], weight: ["300", "400", "600"] });
const karantina = Karantina({ subsets: ["hebrew", "latin"], weight: ["400", "700"] });

export type Pairing = { n: string; name: string; note: string; display: string; displayWeight: string; body: string; tracking?: string };

export const pairings: Pairing[] = [
  { n: "F0", name: "הנוכחי: פרנק רוהל ואסיסטנט", note: "סריף ספרותי עם גוף נקי.", display: frank.className, displayWeight: "font-bold", body: assistant.className },
  { n: "F1", name: "בלפייר ואסיסטנט", note: "סריף דק וגבוה, הכי קרוב לתחושת בית אופנה.", display: bellefair.className, displayWeight: "font-normal", body: assistant.className, tracking: "tracking-wide" },
  { n: "F2", name: "נוטו סריף ונוטו סאנס", note: "סריף עדין ומודרני, משפחה אחת עקבית.", display: notoSerif.className, displayWeight: "font-light", body: notoSans.className },
  { n: "F3", name: "דוד ליברה וחיבו", note: "סריף קלאסי ישראלי עם גוף גאומטרי.", display: david.className, displayWeight: "font-bold", body: heebo.className },
  { n: "F4", name: "פלקס עברי, דק ועבה", note: "בלי סריף, שוויצרי וטכני, כמו שעון כלי.", display: plex.className, displayWeight: "font-extralight", body: plex.className },
  { n: "F5", name: "חיבו כבד וחיבו", note: "כותרות עבות ובולטות בסגנון פאנריי.", display: heebo.className, displayWeight: "font-extrabold", body: heebo.className, tracking: "tracking-tight" },
  { n: "F6", name: "סואץ ורוביק", note: "סריף כבד ומעוגל, חם ויומיומי.", display: suez.className, displayWeight: "font-normal", body: rubik.className },
  { n: "F7", name: "קרנטינה ואסיסטנט", note: "כותרות צרות וגבוהות, דרמטיות.", display: karantina.className, displayWeight: "font-bold", body: assistant.className, tracking: "tracking-wide" },
];

export default function FontOptions() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {pairings.map((p) => (
        <div key={p.n} className={`rounded-2xl border border-line bg-card p-7 ${p.body}`}>
          <p className="font-mono text-xs text-gold">
            {p.n} <span className={`ms-2 text-muted ${p.body}`}>{p.name}</span>
          </p>
          <p className="mt-6 text-[13px] font-semibold tracking-wide text-gold">קולקציה חדשה</p>
          <h3 className={`mt-2 text-5xl leading-[1.05] ${p.display} ${p.displayWeight} ${p.tracking ?? ""}`}>שעונים שבחרנו אחד אחד</h3>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            משעון ספורט עם צמיד משולב ועד שעון ערב עם זכוכית קמורה. כל דגם נבחר כי הוא שווה את המקום על היד.
          </p>
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-4">
            <div>
              <p className={`text-2xl ${p.display} ${p.displayWeight}`}>פי־אר־איקס אוטומטי</p>
              <p className="mt-1 text-[15px]">3,150 ₪</p>
            </div>
            <span className="bg-cta px-5 py-3 text-[14px] font-semibold text-on-cta">הוספה לסל</span>
          </div>
          <p className="mt-4 text-[13px] text-muted">{p.note}</p>
        </div>
      ))}
    </div>
  );
}
