import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import WhyAAIRE from "./components/WhyAAIRE";
import BuildingGrid from "./components/BuildingGrid";
import QuoteSection from "./components/QuoteSection";
import GuideDownloadCTA from "./components/GuideDownloadCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhyAAIRE />
      <BuildingGrid />
      <QuoteSection />
      <GuideDownloadCTA />
    </>
  );
}
