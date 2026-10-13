export type Collection = "sport" | "field" | "dress" | "vintage" | "gshock" | "straps";

export type Photo = {
  id: string;
  alt: string;
  credit: string;
};

export type Variant = { name: string; swatch: string; photo: Photo };

export type Product = {
  slug: string;
  brand: string;
  name: string;
  model: string;
  tagline: string;
  collection: Collection;
  price: number;
  // "market": seen on Israeli price comparison (zap.co.il) on priceDate; otherwise an estimate.
  priceSource?: "market";
  compareAt?: number;
  badge?: string;
  photos: Photo[];
  variants?: Variant[];
  description: string;
  specs: { label: string; value: string }[];
};

export const collections: Record<Collection, { name: string; blurb: string }> = {
  sport: {
    name: "ספורט יומיומי",
    blurb: "צמידי מתכת, לוחות שמשחקים עם האור ועמידות במים לכל יום",
  },
  field: {
    name: "שדה וטייסים",
    blurb: "ספרות גדולות, מחוגים זוהרים ורצועות בד. נבנו לקריאה מהירה בחוץ",
  },
  dress: {
    name: "אלגנטי",
    blurb: "לוחות נקיים, עור וזהב. לחתונה, לפגישה ולכל ערב שצריך",
  },
  vintage: {
    name: "דיגיטלי",
    blurb: "מסכי ליקוויד קריסטל ונוסטלגיה של שנות השמונים",
  },
  gshock: {
    name: "ג׳י־שוק",
    blurb: "עמידים בנפילות, במים ובכל מה שהיום יזרוק עליכם",
  },
  straps: {
    name: "רצועות",
    blurb: "נאטו, גומי ועור. הדרך הכי זולה להרגיש שיש לכם שעון חדש",
  },
};

export function photoUrl(id: string, w: number, h?: number) {
  const size = h ? `&h=${h}&fit=crop` : "";
  return `https://images.unsplash.com/${id}?auto=format&q=80&w=${w}${size}`;
}

const f91Black: Photo = { id: "photo-1599673476987-ca50550c4b9d", alt: "שעון דיגיטלי שחור עם רצועת גומי", credit: "Adriano Pucciarelli" };
const f91Pink: Photo = { id: "photo-1669906858258-790e754a98e5", alt: "שעון דיגיטלי ורוד עם רצועת גומי", credit: "Bagzhan Sadvakassov" };
const gaBlack: Photo = { id: "photo-1759166447139-b816226ca312", alt: "שעון ג׳י־שוק מתומן שחור עם לוח לבן", credit: "Reinis Brūzītis" };
const gaPurple: Photo = { id: "photo-1700762151241-ea2e6d9a6c6b", alt: "שעון ג׳י־שוק מתומן בצבע סגול", credit: "Dmitry Spravko" };
const gaGreen: Photo = { id: "photo-1700762118431-ee3a19c75ebc", alt: "שעון ג׳י־שוק מתומן בצבע ירוק זית", credit: "Dmitry Spravko" };
const gaClear: Photo = { id: "photo-1641979731464-297f60d076ab", alt: "שעון ג׳י־שוק מתומן עם רצועה שקופה", credit: "WELCHEUHR" };

export const products: Product[] = [
  {
    slug: "f91w",
    brand: "Casio",
    name: "הקלאסי",
    model: "F-91W",
    tagline: "דיגיטלי, קל ופשוט, בשחור או בוורוד",
    collection: "vintage",
    price: 79,
    priceSource: "market",
    badge: "רב מכר",
    photos: [f91Black],
    variants: [
      { name: "שחור", swatch: "#1a1a1a", photo: f91Black },
      { name: "ורוד", swatch: "#e8418f", photo: f91Pink },
    ],
    description:
      "קל, פשוט ובלתי נגמר. רצועת שרף, מסך דיגיטלי עם תאורה, שעון מעורר וסטופר. סוללה אחת מחזיקה שנים.",
    specs: [
      { label: "מארז", value: "שרף" },
      { label: "תצוגה", value: "דיגיטלית עם תאורה" },
      { label: "פונקציות", value: "שעון מעורר, סטופר, לוח שנה" },
      { label: "עמידות במים", value: "התזות וגשם" },
    ],
  },
  {
    slug: "a168",
    brand: "Casio",
    name: "וינטג׳ כסוף",
    model: "A168WA",
    tagline: "רצועת מתכת ומסך מואר",
    collection: "vintage",
    price: 170,
    priceSource: "market",
    photos: [{ id: "photo-1725710578302-49bca45aa60c", alt: "שעון דיגיטלי כסוף עם רצועת מתכת ליד מצלמה", credit: "Ilias Gainutdinov" }],
    description:
      "האייקון הכסוף של שנות השמונים, עם תאורה שמאירה את כל המסך בלחיצה. נראה טוב עם חולצה מכופתרת ולא פחות עם טישירט.",
    specs: [
      { label: "מארז", value: "שרף בציפוי מתכתי" },
      { label: "רצועה", value: "פלדת אל־חלד" },
      { label: "פונקציות", value: "שעון מעורר, סטופר, תאורה" },
      { label: "עמידות במים", value: "התזות וגשם" },
    ],
  },
  {
    slug: "a158",
    brand: "Casio",
    name: "וינטג׳ דק",
    model: "A158WA",
    tagline: "הגרסה הדקה והקלה",
    collection: "vintage",
    price: 114,
    priceSource: "market",
    photos: [{ id: "photo-1684823026928-a4c4e160bec2", alt: "שעון דיגיטלי כסוף על משטח אדום", credit: "Divyang Parmar" }],
    description: "פרופיל דק במיוחד שנעלם מתחת לשרוול ומופיע בדיוק כשצריך. כל מה שאתם אוהבים בווינטג׳, במשקל נוצה.",
    specs: [
      { label: "מארז", value: "שרף בציפוי מתכתי" },
      { label: "רצועה", value: "פלדת אל־חלד" },
      { label: "פונקציות", value: "שעון מעורר, סטופר" },
      { label: "עמידות במים", value: "התזות וגשם" },
    ],
  },
  {
    slug: "ae1200",
    brand: "Casio",
    name: "שעון עולמי",
    model: "AE-1200WHD",
    tagline: "מפת עולם על פרק היד",
    collection: "vintage",
    price: 220,
    priceSource: "market",
    badge: "חדש",
    photos: [{ id: "photo-1579116971616-ea6ab3fff959", alt: "שעון דיגיטלי עם מפת עולם ורצועת מתכת", credit: "Gabriel Tovar" }],
    description:
      "מפה קטנה שמראה איפה בעולם אתם, ושעון שיודע מה השעה בכל עיר גדולה. מושלם למי שחולם על הטיסה הבאה.",
    specs: [
      { label: "מארז", value: "שרף" },
      { label: "רצועה", value: "פלדת אל־חלד" },
      { label: "פונקציות", value: "שעון עולמי, חמישה שעונים מעוררים, סטופר" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "ga2100",
    brand: "Casio",
    name: "המתומן",
    model: "GA-2100",
    tagline: "ארבעה צבעים, אותו כוח",
    collection: "gshock",
    price: 549,
    badge: "רב מכר",
    photos: [gaPurple],
    variants: [
      { name: "סגול", swatch: "#6d4bd8", photo: gaPurple },
      { name: "ירוק זית", swatch: "#5b6b55", photo: gaGreen },
      { name: "שקוף", swatch: "#cfd4d8", photo: gaClear },
      { name: "שחור", swatch: "#1a1a1a", photo: gaBlack },
    ],
    description:
      "מארז מתומן דק שהפך לסמל, עם מבנה פנימי מסיבי שעומד בנפילות. מחוגים אנלוגיים מעל מסך דיגיטלי, כדי שלא תצטרכו לבחור.",
    specs: [
      { label: "מארז", value: "שרף עם ליבת סיבי פחמן" },
      { label: "תצוגה", value: "אנלוגית ודיגיטלית" },
      { label: "עמידות", value: "בזעזועים" },
      { label: "עמידות במים", value: "200 מטר" },
    ],
  },
  {
    slug: "dw5600-red",
    brand: "Casio",
    name: "המרובע האדום",
    model: "DW-5600",
    tagline: "הצורה המקורית, בצבע שאי אפשר לפספס",
    collection: "gshock",
    price: 415,
    priceSource: "market",
    photos: [{ id: "photo-1704723440024-452ae49e0d58", alt: "שעון דיגיטלי מרובע אדום על מעמד שקוף", credit: "Bagzhan Sadvakassov" }],
    description:
      "המרובע שהתחיל הכל, עכשיו באדום מלא. קשוח מספיק לאתר בנייה, ובולט מספיק לכל מקום אחר.",
    specs: [
      { label: "מארז", value: "שרף" },
      { label: "תצוגה", value: "דיגיטלית עם תאורה" },
      { label: "עמידות", value: "בזעזועים" },
      { label: "עמידות במים", value: "200 מטר" },
    ],
  },
  {
    slug: "gmw-b5000",
    brand: "Casio",
    name: "המרובע ממתכת",
    model: "GMW-B5000",
    tagline: "הקשוח, בגרסה הכי יוקרתית",
    collection: "gshock",
    price: 2750,
    priceSource: "market",
    photos: [{ id: "photo-1624608291203-c0efcb41cab6", alt: "שעון דיגיטלי מרובע ממתכת כסופה על רקע שחור", credit: "Peng Productions" }],
    description:
      "אותו מרובע אגדי, במארז ורצועה של פלדה מלאה. נטען מאור, מסתנכרן עם הטלפון ונראה כאילו נבנה להחזיק לנצח.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "טעינה", value: "סולארית" },
      { label: "חיבור", value: "סנכרון עם הטלפון" },
      { label: "עמידות במים", value: "200 מטר" },
    ],
  },
  {
    slug: "gshock-orange",
    brand: "Casio",
    name: "שחור כתום",
    model: "G-SHOCK",
    tagline: "אנלוגי־דיגיטלי, גדול ונועז",
    collection: "gshock",
    price: 599,
    compareAt: 699,
    photos: [{ id: "photo-1543956872-37cfc5474a71", alt: "שעון ג׳י־שוק שחור עם פרטים כתומים", credit: "Alexandru-Bogdan Ghita" }],
    description: "מארז גדול, פרטים כתומים ומחוגים שרואים מרחוק. לא שעון לאנשים שמנסים להיעלם.",
    specs: [
      { label: "מארז", value: "שרף" },
      { label: "תצוגה", value: "אנלוגית ודיגיטלית" },
      { label: "עמידות", value: "בזעזועים" },
      { label: "עמידות במים", value: "200 מטר" },
    ],
  },
  {
    slug: "diver",
    brand: "Casio",
    name: "הצוללן",
    model: "100M",
    tagline: "מחוגים זוהרים ובזל מסתובב",
    collection: "sport",
    price: 349,
    photos: [{ id: "photo-1706381239626-de81e586141c", alt: "שעון אנלוגי שחור עם לוח זוהר ובזל מסתובב", credit: "Irfan Zaini" }],
    description:
      "בזל מסתובב למדידת זמן, מחוגים שזוהרים בחושך ולוח שחור שקל לקרוא. לים, לבריכה ולכל השאר.",
    specs: [
      { label: "מארז", value: "שרף ופלדה" },
      { label: "תצוגה", value: "אנלוגית עם תאורה" },
      { label: "בזל", value: "מסתובב" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "a-blue",
    brand: "Casio",
    name: "וינטג׳ כחול",
    model: "VINTAGE",
    tagline: "מסגרת כחולה למסך הקלאסי",
    collection: "vintage",
    price: 249,
    photos: [{ id: "photo-1709140493144-4600d13e98c1", alt: "שעון דיגיטלי כסוף עם מסגרת כחולה סביב המסך", credit: "Alexandra Dobrin" }],
    description: "אותו מסך דיגיטלי שאוהבים, עם מסגרת כחולה שנותנת לו קצת צבע. רצועת מתכת ותאורה שמאירה את המסך.",
    specs: [
      { label: "מארז", value: "שרף בציפוי מתכתי" },
      { label: "רצועה", value: "פלדת אל־חלד" },
      { label: "תצוגה", value: "דיגיטלית עם תאורה" },
    ],
  },
  {
    slug: "gbd-200",
    brand: "Casio",
    name: "המרובע הספורטיבי",
    model: "GBD-200",
    tagline: "ג׳י־שוק שסופר צעדים",
    collection: "gshock",
    price: 675,
    priceSource: "market",
    badge: "חדש",
    photos: [{ id: "photo-1737223899798-209dd4b31391", alt: "שעון ג׳י־שוק מרובע עם מסך דיגיטלי גדול", credit: "Aswin Karuvally" }],
    description:
      "מסך דיגיטלי גדול וברור, מד צעדים וסנכרון עם הטלפון. שעון לריצה בבוקר שנשאר על היד גם בשאר היום.",
    specs: [
      { label: "מארז", value: "שרף" },
      { label: "חיבור", value: "סנכרון עם הטלפון" },
      { label: "פונקציות", value: "מד צעדים, שעון עולמי, סטופר" },
      { label: "עמידות במים", value: "200 מטר" },
    ],
  },
  {
    slug: "edifice-aviator",
    brand: "Casio",
    name: "טייס",
    model: "EDIFICE",
    tagline: "כרונוגרף עם בזל חישוב",
    collection: "sport",
    price: 899,
    photos: [{ id: "photo-1703505841379-2f863b201212", alt: "שעון כרונוגרף ממתכת עם לוח שחור ובזל מסתובב", credit: "Jayanth Muppaneni" }],
    description:
      "קו המתכת של קסיו, בגרסת טייס. כרונוגרף, בזל מסתובב עם סקאלת חישוב ורצועת פלדה כבדה שמרגישה רצינית על היד.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "רצועה", value: "פלדת אל־חלד" },
      { label: "פונקציות", value: "כרונוגרף, תאריך" },
      { label: "בזל", value: "סקאלת חישוב מסתובבת" },
    ],
  },
  {
    slug: "mtp-1314",
    brand: "Casio",
    name: "דו־גווני",
    model: "MTP-1314SG",
    tagline: "זהב ופלדה, לוח שחור",
    collection: "dress",
    price: 329,
    photos: [{ id: "photo-1680509246036-ce5f09e1f51f", alt: "שעון אנלוגי בגווני זהב ופלדה עם לוח שחור", credit: "SOLEEs TIME" }],
    description: "רצועה בשני גוונים ולוח שחור עם ספרות גדולות. שעון לעבודה שלא נראה כמו שעון לעבודה.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "רצועה", value: "פלדה בשני גוונים" },
      { label: "תצוגה", value: "אנלוגית עם תאריך ויום" },
    ],
  },
  {
    slug: "mtp-1175e",
    brand: "Casio",
    name: "סטנדרט",
    model: "MTP-1175E",
    tagline: "לוח לבן, עור חום",
    collection: "dress",
    price: 145,
    photos: [{ id: "photo-1587466412525-87497b34fc88", alt: "שעון אנלוגי כסוף עם לוח לבן", credit: "Hiroshi Tsubono" }],
    description: "השעון הכי פשוט בחנות, ואולי הכי אלגנטי. לוח לבן נקי, מחוגים דקים ותאריך קטן.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "רצועה", value: "עור" },
      { label: "תצוגה", value: "אנלוגית עם תאריך" },
    ],
  },
  {
    slug: "mtp-vd200",
    brand: "Casio",
    name: "כחול עמוק",
    model: "MTP-VD200B",
    tagline: "לוח כחול, מארז שחור",
    collection: "dress",
    price: 299,
    badge: "חדש",
    photos: [{ id: "photo-1679716887633-7a2e2f0fd521", alt: "שעון אנלוגי עם לוח כחול ומחוגים מוזהבים", credit: "SOLEEs TIME" }],
    description: "לוח כחול מבריק שמשנה גוון לפי האור, עם מחוגים מוזהבים ומארז שחור. נראה יקר יותר ממה שהוא.",
    specs: [
      { label: "מארז", value: "פלדה בציפוי שחור" },
      { label: "רצועה", value: "פלדה בציפוי שחור" },
      { label: "תצוגה", value: "אנלוגית" },
    ],
  },
  {
    slug: "chrono-leather",
    brand: "Casio",
    name: "כרונוגרף עור",
    model: "CHRONOGRAPH",
    tagline: "שלושה תת־לוחות על עור שחור",
    collection: "dress",
    price: 449,
    photos: [{ id: "photo-1669214053030-2f732954afcb", alt: "שעון כרונוגרף עם לוח שחור ורצועת עור שחורה", credit: "Alvin Rahul" }],
    description: "לוח שחור עם שלושה תת־לוחות ומחוג שניות אדום. רצועת עור שחורה שמתאימה גם לג׳ינס וגם לחליפה.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "רצועה", value: "עור" },
      { label: "פונקציות", value: "כרונוגרף, תאריך" },
    ],
  },
  {
    slug: "prx-40",
    brand: "Tissot",
    name: "פי־אר־איקס",
    model: "PRX 40",
    tagline: "הצמיד המשולב שכולם מדברים עליו",
    collection: "sport",
    price: 1649,
    priceSource: "market",
    badge: "רב מכר",
    photos: [{ id: "photo-1768572746807-47eceecd25fb", alt: "שעון טיסו פי־אר־איקס עם לוח כחול על משטח עץ", credit: "djebi abraham philippe" }],
    description:
      "עיצוב משנות השבעים שחזר בגדול. מארז פלדה שזורם ישר לתוך הצמיד, לוח כחול שמשנה גוון לפי האור, ומנגנון קוורץ שוויצרי שלא צריך לחשוב עליו.",
    specs: [
      { label: "קוטר", value: "40 מ״מ" },
      { label: "מנגנון", value: "קוורץ שוויצרי" },
      { label: "צמיד", value: "פלדת אל־חלד משולב" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "prx-powermatic-80",
    brand: "Tissot",
    name: "פי־אר־איקס אוטומטי",
    model: "PRX POWERMATIC 80",
    tagline: "לוח מחורץ ושמונים שעות רזרבה",
    collection: "sport",
    price: 3150,
    priceSource: "market",
    photos: [{ id: "photo-1715776384730-4c6336bb6738", alt: "שעון טיסו פי־אר־איקס עם לוח כחול מחורץ וצמיד משולב", credit: "Eric van Dijk" }, { id: "photo-1715776314938-c7b1ab69ad80", alt: "טיסו פי־אר־איקס כחול מזווית צד", credit: "Eric van Dijk" }, { id: "photo-1715777197224-71e0cacd6cac", alt: "הגב השקוף של טיסו פי־אר־איקס עם המנגנון האוטומטי", credit: "Eric van Dijk" }],
    variants: [
      { name: "כחול", swatch: "#1f3a68", photo: { id: "photo-1715776384730-4c6336bb6738", alt: "שעון טיסו פי־אר־איקס עם לוח כחול מחורץ וצמיד משולב", credit: "Eric van Dijk" } },
      { name: "לבן וזהב אדום", swatch: "#e9dccd", photo: { id: "photo-1773414998447-61c38c9f5626", alt: "טיסו פי־אר־איקס עם לוח לבן ובזל בגוון זהב אדום", credit: "Phước Sang" } },
    ],
    description:
      "אותו מארז אייקוני, עם לוח מחורץ ומנגנון אוטומטי שמחזיק שמונים שעות בלי לענוד. דרך הגב השקוף רואים את המנגנון עובד.",
    specs: [
      { label: "קוטר", value: "40 מ״מ" },
      { label: "מנגנון", value: "אוטומטי, רזרבה של 80 שעות" },
      { label: "גב", value: "שקוף" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "citizen-tsuyosa",
    brand: "Citizen",
    name: "צוּיוֹסָה",
    model: "TSUYOSA",
    tagline: "צמיד משולב ולוח ירוק",
    collection: "sport",
    price: 1461,
    priceSource: "market",
    badge: "חדש",
    photos: [{ id: "photo-1673737082316-9bc5c799520f", alt: "שעון סיטיזן עם לוח ירוק וצמיד משולב על פולי קפה", credit: "Bya" }],
    description:
      "התשובה היפנית לצמיד המשולב. לוח ירוק עמוק, מנגנון אוטומטי וזכוכית ספיר, במחיר שקשה להתווכח איתו.",
    specs: [
      { label: "קוטר", value: "40 מ״מ" },
      { label: "מנגנון", value: "אוטומטי" },
      { label: "זכוכית", value: "ספיר" },
      { label: "עמידות במים", value: "50 מטר" },
    ],
  },
  {
    slug: "seiko-5-srpd53",
    brand: "Seiko",
    name: "סייקו 5 ספורט",
    model: "SRPD53K1",
    tagline: "הצוללן האוטומטי שמתחילים איתו",
    collection: "sport",
    price: 1290,
    priceSource: "market",
    photos: [{ id: "photo-1708647585543-bee62dc16136", alt: "שעון סייקו 5 ספורט עם לוח כחול ובזל כחול", credit: "Lewis Hayden" }, { id: "photo-1708647585699-7d13c646e50c", alt: "סייקו 5 ספורט על בד שחור", credit: "Lewis Hayden" }, { id: "photo-1708647585535-c3f3317e9088", alt: "סייקו 5 ספורט מקרוב", credit: "Lewis Hayden" }],
    description:
      "השעון האוטומטי הראשון של הרבה אנשים, ובצדק. בזל מסתובב, מחוגים זוהרים וגב שקוף, בגודל שעובד כמעט לכל יד.",
    specs: [
      { label: "קוטר", value: "42.5 מ״מ" },
      { label: "מנגנון", value: "אוטומטי 4R36" },
      { label: "גב", value: "שקוף" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "seiko-5-gmt",
    brand: "Seiko",
    name: "סייקו 5 ג׳י־אם־טי",
    model: "SSK035",
    tagline: "אזור זמן שני על צמיד ג׳ובילי",
    collection: "sport",
    price: 1850,
    priceSource: "market",
    photos: [{ id: "photo-1731000898953-325a3404110f", alt: "שעון סייקו ג׳י־אם־טי עם לוח ירוק וצמיד ג׳ובילי", credit: "Paul Cuoco" }, { id: "photo-1731000898919-ae2a8919dd40", alt: "סייקו ג׳י־אם־טי ירוק על פולי קפה", credit: "Paul Cuoco" }],
    description:
      "מחוג רביעי שמראה שעה במדינה אחרת, בזל ירוק וצמיד ג׳ובילי שמבריק בכל תנועה. בשביל מי שחצי מהלב שלו בחו״ל.",
    specs: [
      { label: "מנגנון", value: "אוטומטי עם ג׳י־אם־טי" },
      { label: "צמיד", value: "ג׳ובילי מפלדה" },
      { label: "בזל", value: "24 שעות" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "seiko-speedtimer",
    brand: "Seiko",
    name: "ספידטיימר",
    model: "SSC813",
    tagline: "כרונוגרף פנדה סולארי",
    collection: "sport",
    price: 2720,
    priceSource: "market",
    photos: [{ id: "photo-1661030420771-245b957d331c", alt: "שעון סייקו ספידטיימר עם לוח לבן ותת־לוחות שחורים", credit: "Paul Cuoco" }],
    description:
      "לוח לבן עם תת־לוחות שחורים, הסגנון שקוראים לו פנדה. נטען מאור, כך שלא צריך להחליף סוללה.",
    specs: [
      { label: "מנגנון", value: "כרונוגרף סולארי" },
      { label: "צמיד", value: "פלדת אל־חלד" },
      { label: "לוח", value: "פנדה" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "certina-ds-caimano",
    brand: "Certina",
    name: "די־אס קאימנו",
    model: "DS CAIMANO",
    tagline: "שוויצרי שקט על צמיד מתכת",
    collection: "sport",
    price: 1990,
    photos: [{ id: "photo-1573152416688-41316d295ed9", alt: "שעון סרטינה עם לוח כהה וצמיד מתכת על רקע שחור", credit: "Radoslaw Prekurat" }],
    description:
      "שעון שוויצרי בלי רעש, עם מערכת ההגנה הכפולה שסרטינה ידועה בה. נראה טוב עם חליפה ולא מתלונן בים.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "צמיד", value: "פלדת אל־חלד" },
      { label: "הגנה", value: "מערכת הגנה כפולה" },
    ],
  },
  {
    slug: "hamilton-khaki-field",
    brand: "Hamilton",
    name: "חאקי פילד",
    model: "KHAKI FIELD MECHANICAL",
    tagline: "שעון שדה צבאי על רצועת נאטו",
    collection: "field",
    price: 2160,
    badge: "רב מכר",
    photos: [{ id: "photo-1666345382684-c0c5101a0dc7", alt: "שעון המילטון חאקי פילד עם לוח לבן על רצועת נאטו", credit: "Maks Makarov" }],
    description:
      "שעון השדה שנולד בצבא האמריקאי, בגרסה מכנית שמכוונים ביד. ספרות גדולות, מחוגים זוהרים ורצועת נאטו. פשוט, קשוח ויפה.",
    specs: [
      { label: "קוטר", value: "38 מ״מ" },
      { label: "מנגנון", value: "מכני בכיוון ידני, רזרבה של 80 שעות" },
      { label: "רצועה", value: "נאטו" },
      { label: "עמידות במים", value: "50 מטר" },
    ],
  },
  {
    slug: "bulova-a15",
    brand: "Bulova",
    name: "A-15 טייס",
    model: "A-15 PILOT",
    tagline: "שלושה כתרים ובזל פנימי",
    collection: "field",
    price: 2490,
    photos: [{ id: "photo-1727391484073-8d37dd702e13", alt: "שעון בולובה טייס עם לוח שחור", credit: "Mackenzie Criswell" }, { id: "photo-1727391484253-1f51d0503f6e", alt: "בולובה טייס על שולחן עץ", credit: "Mackenzie Criswell" }, { id: "photo-1727391484069-f999ba9c0a82", alt: "בולובה טייס מקרוב", credit: "Mackenzie Criswell" }],
    description:
      "שחזור של שעון טייסים צבאי, עם שלושה כתרים שמסובבים שתי טבעות פנימיות. שעון שיש מה לעשות איתו.",
    specs: [
      { label: "מנגנון", value: "אוטומטי" },
      { label: "כתרים", value: "שלושה" },
      { label: "בזל", value: "פנימי מסתובב" },
      { label: "רצועה", value: "עור" },
    ],
  },
  {
    slug: "citizen-nighthawk",
    brand: "Citizen",
    name: "נייטהוק",
    model: "NIGHTHAWK",
    tagline: "שעון טייסים עם סרגל חישוב",
    collection: "field",
    price: 1690,
    photos: [{ id: "photo-1611353230196-d43954b19316", alt: "שעון סיטיזן טייס עם לוח שחור וצמיד מתכת", credit: "Paul Cuoco" }],
    description:
      "סרגל חישוב טייסים סביב הלוח ומחוג לאזור זמן שני. נטען מכל אור, גם מנורה בחדר.",
    specs: [
      { label: "מנגנון", value: "אקו־דרייב, נטען מאור" },
      { label: "בזל", value: "סרגל חישוב" },
      { label: "צמיד", value: "פלדת אל־חלד" },
    ],
  },
  {
    slug: "timex-expedition",
    brand: "Timex",
    name: "אקספדישן",
    model: "EXPEDITION",
    tagline: "כרונוגרף שטח במחיר נגיש",
    collection: "field",
    price: 590,
    photos: [{ id: "photo-1617265860128-e23ad88cf98d", alt: "שעון טיימקס כרונוגרף עם לוח שחור", credit: "YearOne" }, { id: "photo-1617265860257-f4fb62bf38c8", alt: "טיימקס אקספדישן מזווית צד", credit: "YearOne" }, { id: "photo-1617265859824-46910d1ad447", alt: "טיימקס אקספדישן מקרוב", credit: "YearOne" }],
    description:
      "שעון שטח עם כרונוגרף ולוח שחור שקל לקרוא. מתאים לטיול, לעבודה ולכל מי שלא רוצה לפחד לשרוט.",
    specs: [
      { label: "מנגנון", value: "קוורץ" },
      { label: "פונקציות", value: "כרונוגרף" },
      { label: "רצועה", value: "בד" },
    ],
  },
  {
    slug: "orient-bambino",
    brand: "Orient",
    name: "במבינו",
    model: "BAMBINO SMALL SECONDS",
    tagline: "זכוכית קמורה ושניות קטנות",
    collection: "dress",
    price: 790,
    photos: [{ id: "photo-1580122888707-eab28666e56c", alt: "שעון אוריינט במבינו עם לוח כסוף ורצועת עור שחורה", credit: "Roy P." }, { id: "photo-1580131732386-4c8a0d83edfe", alt: "אוריינט במבינו על לוח שחמט", credit: "Roy P." }],
    description:
      "שעון ערב קלאסי עם זכוכית קמורה שנראית כמו משנות החמישים, ותת־לוח קטן לשניות. אוטומטי, במחיר של שעון קוורץ.",
    specs: [
      { label: "מנגנון", value: "אוטומטי" },
      { label: "זכוכית", value: "קמורה" },
      { label: "רצועה", value: "עור" },
      { label: "עמידות במים", value: "30 מטר" },
    ],
  },
  {
    slug: "mido-baroncelli",
    brand: "Mido",
    name: "ברונצ׳לי",
    model: "BARONCELLI BIG DATE",
    tagline: "זהב אדום ותאריך גדול",
    collection: "dress",
    price: 3900,
    badge: "חדש",
    photos: [{ id: "photo-1768062251769-64a728ae8773", alt: "שעון מידו ברונצ׳לי בגוון זהב אדום עם תאריך גדול", credit: "Omar Al-Ghosson" }, { id: "photo-1768062251819-651433f1108b", alt: "מידו ברונצ׳לי מקרוב", credit: "Omar Al-Ghosson" }],
    description:
      "מארז בגוון זהב אדום, לוח שמנת וחלון תאריך גדול. שעון שוויצרי אוטומטי לאירועים שבהם רוצים להיראות הכי טוב.",
    specs: [
      { label: "מנגנון", value: "אוטומטי שוויצרי" },
      { label: "תאריך", value: "חלון גדול" },
      { label: "רצועה", value: "עור" },
    ],
  },
  {
    slug: "seiko-sarb033",
    brand: "Seiko",
    name: "סייקו SARB033",
    model: "SARB033",
    tagline: "השעון שכולם ממליצים עליו",
    collection: "dress",
    price: 2200,
    photos: [{ id: "photo-1612817159949-195b6eb9e31a", alt: "שעון סייקו עם לוח שחור ורצועת עור", credit: "Paul Cuoco" }, { id: "photo-1612817159623-0399784fd0ce", alt: "סייקו SARB033 על רצועת עור חומה", credit: "Paul Cuoco" }, { id: "photo-1612817159576-986a0b7a4165", alt: "סייקו SARB033 עם תיק עור", credit: "Paul Cuoco" }],
    description:
      "לוח שחור נקי, מחוגים מלוטשים וזכוכית ספיר, בגודל קטן ומדויק. שעון אחד שהולך עם הכל.",
    specs: [
      { label: "קוטר", value: "38 מ״מ" },
      { label: "מנגנון", value: "אוטומטי 6R15" },
      { label: "זכוכית", value: "ספיר" },
      { label: "עמידות במים", value: "100 מטר" },
    ],
  },
  {
    slug: "strap-rubber",
    brand: "רגע",
    name: "רצועת גומי",
    model: "FKM 20MM",
    tagline: "גומי רך שלא נסדק",
    collection: "straps",
    price: 149,
    photos: [{ id: "photo-1787386543051-e2fb5374bb60", alt: "שש רצועות גומי צבעוניות על רקע לבן", credit: "royal watchstrap" }],
    variants: [
      { name: "שחור", swatch: "#1a1a1a", photo: { id: "photo-1787386543239-c7df1e76d91c", alt: "רצועת גומי שחורה עם אבזם כסוף", credit: "royal watchstrap" } },
      { name: "חום", swatch: "#6b4a2f", photo: { id: "photo-1787386543219-0dc6c5c89513", alt: "רצועת גומי חומה עם אבזם כסוף", credit: "royal watchstrap" } },
      { name: "אפור", swatch: "#8a8d8f", photo: { id: "photo-1787386543193-245d8fba77d2", alt: "רצועת גומי אפורה עם אבזם מתכת", credit: "royal watchstrap" } },
      { name: "אדום", swatch: "#b3261e", photo: { id: "photo-1787386543231-18be8d909c80", alt: "רצועת גומי אדומה עם אבזם כסוף", credit: "royal watchstrap" } },
    ],
    description:
      "רצועת גומי איכותית שלא מתקשה ולא נסדקת, עם אבזם פלדה. מתאימה לכל שעון עם רוחב חיבור של 20 מילימטר, ומחליפים אותה בדקה.",
    specs: [
      { label: "רוחב", value: "20 מ״מ" },
      { label: "חומר", value: "גומי FKM" },
      { label: "אבזם", value: "פלדת אל־חלד" },
      { label: "החלפה", value: "פינים מהירים" },
    ],
  },
  {
    slug: "strap-nato",
    brand: "רגע",
    name: "רצועת נאטו",
    model: "NATO 20MM",
    tagline: "הרצועה של שעוני השדה",
    collection: "straps",
    price: 89,
    photos: [{ id: "photo-1566486198725-4b2fbd5a4ffe", alt: "שעון על רצועת נאטו בפסים אדום, לבן וכחול", credit: "Lai Man Nung" }],
    variants: [
      { name: "פסים", swatch: "#a8322d", photo: { id: "photo-1566486198725-4b2fbd5a4ffe", alt: "שעון על רצועת נאטו בפסים אדום, לבן וכחול", credit: "Lai Man Nung" } },
      { name: "שחור", swatch: "#1a1a1a", photo: { id: "photo-1511463394364-68d07d119d95", alt: "שעון על רצועת ניילון שחורה ארוגה", credit: "Alexander Andrews" } },
    ],
    description:
      "רצועת ניילון שעוברת מתחת לשעון, כך שגם אם פין נשבר השעון נשאר על היד. נראית מעולה על שעוני שדה וצוללנים.",
    specs: [
      { label: "רוחב", value: "20 מ״מ" },
      { label: "חומר", value: "ניילון ארוג" },
      { label: "טבעות", value: "פלדת אל־חלד" },
    ],
  },
  {
    slug: "strap-leather",
    brand: "רגע",
    name: "רצועת עור",
    model: "LEATHER 20MM",
    tagline: "עור שמתיישן יפה",
    collection: "straps",
    price: 229,
    badge: "חדש",
    photos: [{ id: "photo-1783422674730-0e40178566ea", alt: "רצועות עור כחולה ושחורה ליד שעון על עץ", credit: "QUENTIN Mahe" }, { id: "photo-1783422674708-e18727b0779f", alt: "שעון עם שתי רצועות עור בקופסה", credit: "QUENTIN Mahe" }, { id: "photo-1783422674785-699ab9a75b37", alt: "רצועות עור בקופסה שחורה", credit: "QUENTIN Mahe" }],
    description:
      "עור מעובד ביד שמקבל אופי עם השנים, עם אבזם פלדה. הופכת כל שעון ספורטיבי למשהו שאפשר ללבוש לערב.",
    specs: [
      { label: "רוחב", value: "20 מ״מ" },
      { label: "חומר", value: "עור" },
      { label: "אבזם", value: "פלדת אל־חלד" },
      { label: "החלפה", value: "פינים מהירים" },
    ],
  },
];

export const storyPhoto: Photo = {
  id: "photo-1660827851942-74e42ff00966",
  alt: "שעון דיגיטלי כסוף על פרק יד",
  credit: "Pavlo Talpa",
};


export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const collectionCovers: Record<Collection, Photo> = {
  sport: getProduct("prx-40")!.photos[0],
  field: getProduct("hamilton-khaki-field")!.photos[0],
  dress: getProduct("orient-bambino")!.photos[0],
  vintage: getProduct("a168")!.photos[0],
  gshock: getProduct("dw5600-red")!.photos[0],
  straps: getProduct("strap-rubber")!.photos[0],
};

export const brands = [...new Set(products.filter((p) => p.collection !== "straps").map((p) => p.brand))];

export function allPhotos() {
  const list: Photo[] = [storyPhoto];
  for (const p of products) {
    list.push(...p.photos);
    for (const v of p.variants ?? []) list.push(v.photo);
  }
  return [...new Map(list.map((ph) => [ph.id, ph])).values()];
}

export const priceDate = "אוקטובר 2026";

export function formatPrice(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}
