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

const gaPurple: Photo = { id: "photo-1700762151241-ea2e6d9a6c6b", alt: "שעון ג׳י־שוק מתומן בצבע סגול", credit: "Dmitry Spravko" };
const gaGreen: Photo = { id: "photo-1700762118431-ee3a19c75ebc", alt: "שעון ג׳י־שוק מתומן בצבע ירוק זית", credit: "Dmitry Spravko" };
const gaClear: Photo = { id: "photo-1641979731464-297f60d076ab", alt: "שעון ג׳י־שוק מתומן עם רצועה שקופה", credit: "WELCHEUHR" };

export const products: Product[] = [
  {
    slug: "f91w",
    name: "הקלאסי השחור",
    model: "F-91W",
    tagline: "השעון הדיגיטלי הכי מזוהה בעולם",
    collection: "vintage",
    price: 89,
    badge: "רב מכר",
    photos: [{ id: "photo-1599673476987-ca50550c4b9d", alt: "שעון דיגיטלי שחור עם רצועת גומי", credit: "Adriano Pucciarelli" }],
    description:
      "קל, פשוט ובלתי נגמר. רצועת שרף שחורה, מסך דיגיטלי עם תאורה, שעון מעורר וסטופר. סוללה אחת מחזיקה שנים.",
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
    tagline: "שלושה צבעים, אותו כוח",
    collection: "gshock",
    price: 549,
    badge: "רב מכר",
    photos: [gaPurple],
    variants: [
      { name: "סגול", swatch: "#6d4bd8", photo: gaPurple },
      { name: "ירוק זית", swatch: "#5b6b55", photo: gaGreen },
      { name: "שקוף", swatch: "#cfd4d8", photo: gaClear },
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
];

export const storyPhoto: Photo = {
  id: "photo-1660827851942-74e42ff00966",
  alt: "שעון דיגיטלי כסוף על פרק יד",
  credit: "Pavlo Talpa",
};

export const collectionCovers: Record<Collection, Photo> = {
  vintage: products[2].photos[0],
  gshock: gaPurple,
  analog: products[8].photos[0],
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
