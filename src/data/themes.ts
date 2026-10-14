export type ThemeId = "champagne" | "marble" | "atelier" | "swiss" | "ice" | "night";

export const themes: { id: ThemeId; name: string; mood: string; font: "serif" | "sans"; swatch: [string, string, string]; dark?: boolean }[] = [
  { id: "champagne", name: "שמפניה", mood: "שנהב חם וזהב עמום. יוקרה רכה, כמו בוטיק תכשיטים.", font: "serif", swatch: ["#f7f3ec", "#1c1915", "#8c6d3f"] },
  { id: "marble", name: "שיש וירוק", mood: "לבן קר וירוק עמוק. קלאסי ושקט, בהשראת בתי שעונים שוויצריים.", font: "serif", swatch: ["#fbfbf9", "#1b1e1d", "#1f4d3a"] },
  { id: "atelier", name: "אטלייה", mood: "נייר חול ובורדו. חם, אומנותי, כמו סדנה של שען.", font: "serif", swatch: ["#efe8dc", "#2a231f", "#7a1f2b"] },
  { id: "swiss", name: "שוויצרי נקי", mood: "לבן מוחלט, שחור ואדום. חד, מודרני ומינימלי.", font: "sans", swatch: ["#ffffff", "#111111", "#c8102e"] },
  { id: "ice", name: "תכלת קרח", mood: "אפור תכלכל וכחול צי. רענן וטכני, כמו לוח תכלת.", font: "sans", swatch: ["#f1f4f6", "#13233a", "#2f6690"] },
  { id: "night", name: "לילה", mood: "העיצוב הכהה הנוכחי, בהשראת פאנרי.", font: "sans", swatch: ["#0a0a0a", "#f3f1ed", "#c9ab74"], dark: true },
];

export const defaultTheme: ThemeId = "champagne";
