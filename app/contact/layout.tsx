import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact AAIRE Co. Metal Buildings for a free, no-obligation quote on a steel building, barndominium, garage, or agricultural structure. Factory-direct, delivered nationwide, with a fast response.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/contact",
    title: "Contact AAIRE Co. Metal Buildings",
    description:
      "Get a free, no-obligation quote on a steel building, barndominium, garage, or agricultural structure.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
