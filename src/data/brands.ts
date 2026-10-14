import { products } from "./products";

export type Brand = {
  slug: string;
  name: string; // as used in Product.brand
  he: string;
  country: string;
  founded: number;
  story: string;
};

// Founding facts are the commonly published ones for each maker. Keep copy factual.
export const brandInfo: Brand[] = [
  {
    slug: "tissot",
    name: "Tissot",
    he: "טיסו",
    country: "שווייץ",
    founded: 1853,
    story:
      "נוסדה בעיירה לה לוקל שבהרי היורה השוויצריים. טיסו ידועה בשעונים שוויצריים במחיר נגיש, והקולקציה עם הצמיד המשולב החזירה אותה לשיחה של חובבי השעונים.",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    he: "המילטון",
    country: "שווייץ, במקור ארצות הברית",
    founded: 1892,
    story:
      "נוסדה בלנקסטר שבפנסילבניה וסיפקה שעונים לצבא האמריקאי. שעון השדה שלה הוא צאצא ישיר של השעונים האלה. היום המותג מייצר בשווייץ.",
  },
  {
    slug: "seiko",
    name: "Seiko",
    he: "סייקו",
    country: "יפן",
    founded: 1881,
    story:
      "התחילה כחנות שעונים בטוקיו והפכה לאחת מיצרניות השעונים הגדולות בעולם. סייקו מייצרת בעצמה כמעט כל חלק, מהקפיץ ועד הזכוכית, ומכסה כל טווח מחירים.",
  },
  {
    slug: "grand-seiko",
    name: "Grand Seiko",
    he: "גרנד סייקו",
    country: "יפן",
    founded: 1960,
    story:
      "הקו היוקרתי של סייקו, שהפך למותג עצמאי. ידוע בגימור ידני של מחוגים ומארזים ובלוחות בהשראת הטבע היפני, ובמנגנון ספרינג דרייב שבו מחוג השניות זורם בלי תקתוק.",
  },
  {
    slug: "citizen",
    name: "Citizen",
    he: "סיטיזן",
    country: "יפן",
    founded: 1918,
    story:
      "נוסדה בטוקיו. סיטיזן ידועה בטכנולוגיית אקו־דרייב, שעונים שנטענים מכל מקור אור ולא צריכים החלפת סוללה.",
  },
  {
    slug: "casio",
    name: "Casio",
    he: "קסיו",
    country: "יפן",
    founded: 1946,
    story:
      "התחילה כיצרנית מחשבונים ונכנסה לשעונים דיגיטליים בשנות השבעים. הג׳י־שוק הראשון יצא ב־1983, ומאז הוא אחד השעונים הנמכרים בעולם.",
  },
  {
    slug: "orient",
    name: "Orient",
    he: "אוריינט",
    country: "יפן",
    founded: 1950,
    story: "יצרנית יפנית שמתמחה בשעונים אוטומטיים במחירים נמוכים. הבמבינו שלה הוא אחד משעוני הערב המומלצים ביותר למתחילים.",
  },
  {
    slug: "mido",
    name: "Mido",
    he: "מידו",
    country: "שווייץ",
    founded: 1918,
    story: "נוסדה בביל שבשווייץ. מידו מייצרת שעונים אוטומטיים בלבד, עם עיצוב שמושפע מארכיטקטורה מפורסמת.",
  },
  {
    slug: "bulova",
    name: "Bulova",
    he: "בולובה",
    country: "ארצות הברית",
    founded: 1875,
    story: "נוסדה בניו יורק. לבולובה היסטוריה ארוכה בשעוני טייסים וצבא, ושחזורים של דגמים היסטוריים הם חלק מרכזי בקולקציה שלה.",
  },
  {
    slug: "timex",
    name: "Timex",
    he: "טיימקס",
    country: "ארצות הברית",
    founded: 1854,
    story: "שורשיה בווטרברי שבקונטיקט. טיימקס ידועה בשעונים אמינים וזולים, ושעון השדה שלה הוא נקודת כניסה מצוינת לעולם השעונים.",
  },
  {
    slug: "certina",
    name: "Certina",
    he: "סרטינה",
    country: "שווייץ",
    founded: 1888,
    story: "נוסדה בגרנכן שבשווייץ. ידועה במערכת ההגנה הכפולה שלה, שנועדה להגן על המנגנון מזעזועים ומים.",
  },
  {
    slug: "oris",
    name: "Oris",
    he: "אוריס",
    country: "שווייץ",
    founded: 1904,
    story: "נוסדה בהולשטיין שבשווייץ. אוריס מייצרת רק שעונים מכניים, וידועה בצוללנים ובשעוני טייסים בסגנון וינטג׳.",
  },
  {
    slug: "rado",
    name: "Rado",
    he: "ראדו",
    country: "שווייץ",
    founded: 1917,
    story: "נוסדה בלנגנאו שבשווייץ. ראדו ידועה בשימוש בקרמיקה וחומרים עמידים לשריטות ובעיצובים נקיים.",
  },
];

export function brandBySlug(slug: string) {
  return brandInfo.find((b) => b.slug === slug);
}

export function brandByName(name: string) {
  return brandInfo.find((b) => b.name === name);
}

export function productsOfBrand(name: string) {
  return products.filter((p) => p.brand === name);
}
