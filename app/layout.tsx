import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LetsTalkFAB } from "@/components/layout/LetsTalkFAB";
import { SITE } from "@/lib/data";
import { personJsonLd } from "@/lib/seo/jsonld";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Full-Stack Developer, Shopify Expert & AI Solutions Engineer`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Aitzaaz Hussain is a full-stack developer, Shopify specialist, and AI solutions engineer helping businesses ship conversion-focused websites, Shopify stores, and AI-powered products.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — Full-Stack Developer, Shopify Expert & AI Solutions Engineer`,
    description: SITE.tagline,
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: SITE.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Full-Stack Developer, Shopify Expert & AI Solutions Engineer`,
    description: SITE.tagline,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "oeW6sCmW0k3jTsD93Y3cG2AkN_PmE1p_NXBuCiApT4U",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        {/* Blocking theme-init script — runs before hydration/paint so the
            correct light/dark class is on <html> from the first frame.
            A client-side useEffect alone would still flash; this can't. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LetsTalkFAB />
        </ThemeProvider>
      </body>
    </html>
  );
}
