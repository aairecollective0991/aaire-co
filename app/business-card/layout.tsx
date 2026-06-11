import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "AAIRE Co. Digital Business Card" },
  description: "AAIRE Co. Metal Buildings digital business card.",
  robots: { index: false, follow: false },
};

export default function BusinessCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
