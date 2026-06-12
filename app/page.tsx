import type { Metadata } from "next";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import WhyAAIRE from "./components/WhyAAIRE";
import BuildingGrid from "./components/BuildingGrid";
import QuoteSection from "./components/QuoteSection";
import GuideDownloadCTA from "./components/GuideDownloadCTA";
import HomepageBackground from "./components/HomepageBackground";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomepageBackground />
      <Hero />
      <TrustStrip />
      <WhyAAIRE />
      <BuildingGrid />
      <QuoteSection />
      <GuideDownloadCTA />
    </>
  );
}
