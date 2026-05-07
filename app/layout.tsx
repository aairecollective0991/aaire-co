import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
    default: "AAIRE Co. Metal Buildings | Factory-Direct Steel Buildings Nationwide",
    template: "%s | AAIRE Co. Metal Buildings"
  },
  description:
    "Factory-direct steel buildings delivered across all 50 states. Barndominiums, garages, RV covers, agricultural structures. 50-year structural warranty. Certified Worldwide Steel Buildings distributor.",
  keywords: ["metal buildings", "steel buildings", "barndominiums", "pole barns", "steel garages", "agricultural buildings", "RV covers", "carports", "Worldwide Steel Buildings", "metal building kits"],
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
