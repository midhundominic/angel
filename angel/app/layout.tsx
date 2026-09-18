import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { StructuredData } from "@/components/seo/StructuredData";
import { primaryLocation, siteConfig } from "@/data/site";
import { allKeywords } from "@/data/seo";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// The brand name is deliberately left out: Google derives the site name for a
// homepage from the WebSite/Organization schema and shows it above the title,
// so these 64 characters are spent on the keyword and both shop locations.
const TITLE =
  "Heaven Funeral Services in Wayanad | Payyampally & Chennalode";

const DESCRIPTION =
  "Heaven Funeral Services from two shops in Wayanad — Payyampally and Chennalode. Coffins, mortuary freezer box, hearse van and long-distance dead body transport, 24 hours a day.";

export const metadata: Metadata = {
  // metadataBase is what turns every relative OG/canonical URL below into an
  // absolute one. Without it Next emits relative og:image paths, which most
  // crawlers and social scrapers silently drop.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: "%s | Heaven Funeral Services",
  },
  description: DESCRIPTION,
  keywords: allKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.parentOrganization,
  category: "Funeral Services",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteConfig.url,
    type: "website",
    locale: "en_IN",
    alternateLocale: ["ml_IN"],
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/showroom/heaven-storefront.jpg",
        width: 1200,
        height: 630,
        alt: "Heaven Funeral Services shop in Payyampally, Wayanad, with hearse van and mobile freezer unit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/showroom/heaven-storefront.jpg"],
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  // Paste the token from Search Console → Settings → Ownership verification
  // into GOOGLE_SITE_VERIFICATION. Until it is set, nothing is emitted.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    // Legacy geo tags. Minor signals today, but harmless and still parsed by
    // some local directories and aggregators. They take a single point, so they
    // carry the Payyampally shop; both shops are in the structured data.
    "geo.region": "IN-KL",
    "geo.placename": `Payyampally and Chennalode, ${primaryLocation.district}, ${primaryLocation.addressRegion}`,
    "geo.position": `${primaryLocation.geo.latitude};${primaryLocation.geo.longitude}`,
    ICBM: `${primaryLocation.geo.latitude}, ${primaryLocation.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#173940",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${geist.variable} antialiased`}>
      <body>
        <StructuredData />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
