import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Building Types & Steel Framing Options",
  description:
    "Compare steel building framing — open web truss, flush mount, and rigid frame — and the structures AAIRE Co. builds: barndominiums, garages, workshops, and agricultural buildings. Clear-span widths up to 80 ft, factory-direct nationwide.",
  alternates: { canonical: "/construction" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/construction",
    title: "Metal Building Types & Steel Framing Options",
    description:
      "Compare steel building framing and the structures AAIRE Co. builds — barndominiums, garages, workshops, and agricultural buildings.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
