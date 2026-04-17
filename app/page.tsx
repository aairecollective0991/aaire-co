import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import BuildingGrid from "./components/BuildingGrid";
import QuoteSection from "./components/QuoteSection";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <BuildingGrid />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
