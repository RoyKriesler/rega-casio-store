import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SmoothScroll from "@/components/SmoothScroll";

// F4 (Roy, 2026-10-16): IBM Plex Sans Hebrew for headlines (extra light) and body.
const plexHebrew = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-plex-hebrew",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "רגע | חנות שעונים", template: "%s | רגע" },
  description: "חנות שעונים נבחרת: טיסו, המילטון, סייקו, סיטיזן, קסיו ועוד, עם רצועות להחלפה. אתר הדגמה לתיק עבודות.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${plexHebrew.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Champagne is the only theme now; drop any theme a visitor picked earlier. */}
        <script dangerouslySetInnerHTML={{ __html: `try{localStorage.removeItem("rega-theme")}catch(e){}` }} />
      </head>
      <body className="min-h-dvh">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-cta focus:px-4 focus:py-2 focus:text-on-cta"
          >
            דילוג לתוכן
          </a>
          <Header />
          <main id="main" className="pt-[72px]">{children}</main>
          <Footer />
          <CartDrawer />
          <SmoothScroll />
        </CartProvider>
      </body>
    </html>
  );
}
