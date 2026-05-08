import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import BuildingGrid from "./components/BuildingGrid";
import QuoteSection from "./components/QuoteSection";
import GuideDownloadCTA from "./components/GuideDownloadCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BuildingGrid />
      <QuoteSection />
      <GuideDownloadCTA />
    </>
  );
}
