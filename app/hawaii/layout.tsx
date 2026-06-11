import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Hawaii Steel Buildings | Metal Building Kits for Oahu, Maui & the Big Island",
  },
  description:
    "Steel and metal building kits engineered for Hawaii's salt air, humidity, and high wind loads. AAIRE Co. ships factory-direct to Oahu, Maui, the Big Island, and Kauai — barndominiums, garages, and agricultural buildings with a 50-year structural warranty.",
  alternates: { canonical: "/hawaii" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/hawaii",
    title: "Hawaii Steel Buildings | Metal Building Kits for Oahu, Maui & the Big Island",
    description:
      "Metal building kits engineered for Hawaii's salt air and high wind loads, shipped factory-direct to all islands.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function HawaiiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
