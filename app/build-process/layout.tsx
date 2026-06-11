import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How a Steel Building Is Built — Our Process",
  description:
    "From permits and stamped engineered plans to delivery and assembly, see how AAIRE Co. takes your steel building from first quote to final walkthrough — factory-direct and engineered to your local codes.",
  alternates: { canonical: "/build-process" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/build-process",
    title: "How a Steel Building Is Built — Our Process",
    description:
      "From permits and engineered plans to delivery and assembly — how AAIRE Co. builds your steel building.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function BuildProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
