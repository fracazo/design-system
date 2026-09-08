import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeSync } from "@/components/ThemeSync";
import "./globals.css";

// The brand file maps --font-sans to --font-geist-sans. Swap the family here
// and the variable name there together. `display: "optional"` keeps text from
// blocking on the webfont: if it is not ready within the browser's window,
// the metric-matched fallback stays for this page view.
const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "Starter",
  description: "A product on @fracazo/design-system. Replace this.",
};

// viewport-fit=cover lets env(safe-area-inset-*) resolve on iOS, so fixed
// bottom bars clear the home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {/* Follow the OS colour scheme before first paint, no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}})();",
          }}
        />
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
