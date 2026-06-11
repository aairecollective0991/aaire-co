import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Metal Building Buyer's Guide",
  description:
    "Download the free AAIRE Co. metal building buyer's guide — sizing, costs, foundations, and what to look for before you buy a steel building or barndominium.",
  alternates: { canonical: "/download" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/download",
    title: "Free Metal Building Buyer's Guide",
    description:
      "Sizing, costs, foundations, and what to look for before you buy a steel building or barndominium.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
