import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Your Metal Building Online",
  description:
    "Use the AAIRE Co. online configurator to design your steel building — choose size, style, doors, windows, and colors, then request a free factory-direct quote.",
  alternates: { canonical: "/configure" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/configure",
    title: "Design Your Metal Building Online",
    description:
      "Design your steel building — size, style, doors, windows, and colors — then request a free quote.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
