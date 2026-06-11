import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About AAIRE Co. | Metal & Steel Building Distributor" },
  description:
    "AAIRE Co. is a certified Worldwide Steel Buildings distributor delivering factory-direct metal buildings nationwide — barndominiums, garages, workshops, and agricultural structures backed by a 50-year structural warranty.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/about",
    title: "About AAIRE Co. | Metal & Steel Building Distributor",
    description:
      "A certified Worldwide Steel Buildings distributor delivering factory-direct metal buildings nationwide, backed by a 50-year structural warranty.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
