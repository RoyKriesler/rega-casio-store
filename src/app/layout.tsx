import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Heebo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-frank",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heebo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "רגע | חנות שעונים", template: "%s | רגע" },
  description: "חנות שעונים נבחרת: טיסו, המילטון, סייקו, סיטיזן, קסיו ועוד, עם רצועות להחלפה. אתר הדגמה לתיק עבודות.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${frank.variable} ${heebo.variable} ${assistant.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("rega-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
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
          <Cursor />
          <ThemeSwitcher />
        </CartProvider>
      </body>
    </html>
  );
}
