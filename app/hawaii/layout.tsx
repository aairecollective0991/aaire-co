import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Buildings Hawaii | AAIRE Co. — Certified Worldwide Steel Buildings Distributor",
  description:
    "Factory-direct steel building kits delivered to Hawaii. AAIRE Co. ships Worldwide Steel Buildings to all Hawaiian islands — engineered for Hawaii's climate, wind loads, and building codes.",
};

export default function HawaiiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
