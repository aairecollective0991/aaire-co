import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Building Permits & Site Checker — Wind & Snow Loads by County",
  description:
    "Free build site checker: metal building permit requirements, setbacks, wind and snow loads, and HOA notes by county across NC, SC, VA, GA, TN, and Hawaii — plus a permit-ready quote from AAIRE Co.",
  alternates: { canonical: "/site-check" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/site-check",
    title: "Metal Building Permits & Site Checker by County",
    description:
      "Permit requirements, setbacks, wind and snow loads, and HOA notes by county — plus a permit-ready quote.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function SiteCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
