import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aaireco.com'),
  title: {
    default: "Metal Buildings & Steel Buildings | Factory-Direct Kits Delivered Nationwide | AAIRE Co.",
    template: "%s | AAIRE Co. Metal Buildings"
  },
  description:
    "Metal buildings and steel building kits delivered factory-direct to all 50 states — barndominiums, garages, workshops, RV covers, and agricultural structures. Prices from $19,900, 50-year structural warranty, stamped engineered plans. Free quote from AAIRE Co.",
  keywords: ["metal buildings", "steel buildings", "barndominiums", "pole barns", "steel garages", "agricultural buildings", "RV covers", "carports", "Worldwide Steel Buildings", "metal building kits", "steel buildings Hawaii", "metal buildings Hawaii", "Hawaii steel buildings", "build site check", "site evaluation", "Hawaii building permits", "Hawaii wind load", "steel buildings Oahu", "steel buildings Maui", "steel buildings Big Island", "Hawaii construction"],
  authors: [{ name: "AAIRE Co." }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aaireco.com',
    siteName: 'AAIRE Co. Metal Buildings',
    title: 'AAIRE Co. Metal Buildings | Factory-Direct Steel Buildings',
    description: 'Factory-direct steel buildings delivered nationwide. 50-year structural warranty. Certified Worldwide Steel Buildings distributor.',
    images: [
      {
        url: '/images/hero/hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'AAIRE Co. Metal Buildings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AAIRE Co. Metal Buildings | Factory-Direct Steel Buildings',
    description: 'Factory-direct steel buildings delivered nationwide. 50-year warranty.',
    images: ['/images/hero/hero2.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Script id="organization-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AAIRE Co. Metal Buildings",
            url: "https://aaireco.com",
            logo: "https://aaireco.com/images/logos/aaire-logo-white.jpg",
            sameAs: [
              "https://www.facebook.com/profile.php?id=61589918392904",
              "https://share.google/xopA6oArzJ3WaFTIh",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kannapolis",
              addressRegion: "NC",
              addressCountry: "US",
            },
            description:
              "Certified Worldwide Steel Buildings distributor selling factory-direct metal and steel building kits — barndominiums, garages, workshops, RV covers, and agricultural structures — delivered nationwide.",
            areaServed: {
              "@type": "Country",
              name: "United States",
            },
            brand: {
              "@type": "Brand",
              name: "Worldwide Steel Buildings",
            },
            knowsAbout: [
              "Metal buildings",
              "Steel buildings",
              "Barndominiums",
              "Steel building kits",
              "Pre-engineered metal buildings",
            ],
          })}
        </Script>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
