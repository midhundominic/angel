import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Heaven Funeral Services | Mortuary & Decedent Transport",
    template: "%s | Heaven Funeral Services",
  },
  description:
    "Respectful, professional mortuary and decedent transport coordination available around the clock.",
  keywords: [
    "decedent transport",
    "mortuary transport",
    "hospital transfer",
    "airport transfer",
    "long distance transport",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Heaven Funeral Services | Mortuary & Decedent Transport",
    description:
      "Professional transport coordination delivered with compassion, discretion, and care.",
    type: "website",
    locale: "en_IN",
    siteName: "Heaven Funeral Services",
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
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
