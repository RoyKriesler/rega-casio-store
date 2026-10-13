export type Collection = "vintage" | "gshock" | "analog";

export type Photo = {
  id: string;
  alt: string;
  credit: string;
};

export type Variant = { name: string; swatch: string; photo: Photo };

export type Product = {
  slug: string;
  name: string;
  model: string;
  tagline: string;
  collection: Collection;
  price: number;
  compareAt?: number;
  badge?: string;
  photos: Photo[];
  variants?: Variant[];
  description: string;
  specs: { label: string; value: string }[];
};

export const collections: Record<Collection, { name: string; blurb: string }> = {
  vintage: {
    name: "וינטג׳ דיגיטלי",
    blurb: "מסכי ליקוויד קריסטל, רצועות מתכת ונוסטלגיה של שנות השמונים",
  },
  gshock: {
    name: "ג׳י־שוק",
    blurb: "עמידים בנפילות, במים ובכל מה שהיום יזרוק עליכם",
  },
  analog: {
    name: "אנלוגי ספורטיבי",
    blurb: "מחוגים זוהרים ומארז חזק, ליום עבודה ולסוף שבוע בחוץ",
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
    name: "הקלאסי",
    model: "F-91W",
    tagline: "דיגיטלי, קל ופשוט, בשחור או בוורוד",
    collection: "vintage",
    price: 89,
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
    name: "וינטג׳ כסוף",
    model: "A168WA",
    tagline: "רצועת מתכת ומסך מואר",
    collection: "vintage",
    price: 229,
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
    name: "וינטג׳ דק",
    model: "A158WA",
    tagline: "הגרסה הדקה והקלה",
    collection: "vintage",
    price: 179,
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
    name: "שעון עולמי",
    model: "AE-1200WHD",
    tagline: "מפת עולם על פרק היד",
    collection: "vintage",
    price: 299,
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
    name: "המרובע האדום",
    model: "DW-5600",
    tagline: "הצורה המקורית, בצבע שאי אפשר לפספס",
    collection: "gshock",
    price: 449,
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
    name: "המרובע ממתכת",
    model: "GMW-B5000",
    tagline: "הקשוח, בגרסה הכי יוקרתית",
    collection: "gshock",
    price: 2890,
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
    name: "הצוללן",
    model: "100M",
    tagline: "מחוגים זוהרים ובזל מסתובב",
    collection: "analog",
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
    name: "המרובע הספורטיבי",
    model: "GBD-200",
    tagline: "ג׳י־שוק שסופר צעדים",
    collection: "gshock",
    price: 749,
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
    name: "טייס",
    model: "EDIFICE",
    tagline: "כרונוגרף עם בזל חישוב",
    collection: "analog",
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
    name: "דו־גווני",
    model: "MTP-1314SG",
    tagline: "זהב ופלדה, לוח שחור",
    collection: "analog",
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
    name: "סטנדרט",
    model: "MTP-1175E",
    tagline: "לוח לבן, עור חום",
    collection: "analog",
    price: 249,
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
    name: "כחול עמוק",
    model: "MTP-VD200B",
    tagline: "לוח כחול, מארז שחור",
    collection: "analog",
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
    name: "כרונוגרף עור",
    model: "CHRONOGRAPH",
    tagline: "שלושה תת־לוחות על עור שחור",
    collection: "analog",
    price: 449,
    photos: [{ id: "photo-1669214053030-2f732954afcb", alt: "שעון כרונוגרף עם לוח שחור ורצועת עור שחורה", credit: "Alvin Rahul" }],
    description: "לוח שחור עם שלושה תת־לוחות ומחוג שניות אדום. רצועת עור שחורה שמתאימה גם לג׳ינס וגם לחליפה.",
    specs: [
      { label: "מארז", value: "פלדת אל־חלד" },
      { label: "רצועה", value: "עור" },
      { label: "פונקציות", value: "כרונוגרף, תאריך" },
    ],
  },
];

export const storyPhoto: Photo = {
  id: "photo-1660827851942-74e42ff00966",
  alt: "שעון דיגיטלי כסוף על פרק יד",
  credit: "Pavlo Talpa",
};

export const collectionCovers: Record<Collection, Photo> = {
  vintage: products[1].photos[0],
  gshock: products[5].photos[0],
  analog: products[13].photos[0],
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function allPhotos() {
  const list: Photo[] = [storyPhoto];
  for (const p of products) {
    list.push(...p.photos);
    for (const v of p.variants ?? []) list.push(v.photo);
  }
  return [...new Map(list.map((ph) => [ph.id, ph])).values()];
}

export function formatPrice(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}
