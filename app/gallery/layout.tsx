import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Building Gallery — Barndominiums, Garages & Shops",
  description:
    "Browse real steel building projects from AAIRE Co. — barndominiums, garages, workshops, RV covers, and agricultural buildings. See finishes, colors, and designs, then request a free factory-direct quote.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/gallery",
    title: "Metal Building Gallery — Barndominiums, Garages & Shops",
    description:
      "Real steel building projects — barndominiums, garages, workshops, RV covers, and agricultural buildings.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
