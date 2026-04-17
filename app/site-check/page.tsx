"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type County =
  | "Mecklenburg"
  | "Iredell"
  | "Cabarrus"
  | "Gaston"
  | "Rowan"
  | "Union"
  | "Lincoln"
  | "Stanly";

type BuildingType =
  | "Barndominium"
  | "Garage / Workshop"
  | "RV Cover / Carport"
  | "Agricultural"
  | "Commercial";

type CountyInfo = {
  permitRequired: boolean;
  permitNotes: string;
  setbacks: string;
  windZone: string;
  snowLoad: string;
  hoaRisk: string;
  permitContact: string;
  processTip: string;
};

const COUNTIES: County[] = [
  "Mecklenburg",
  "Iredell",
  "Cabarrus",
  "Gaston",
  "Rowan",
  "Union",
  "Lincoln",
  "Stanly",
];

const BUILDING_TYPES: BuildingType[] = [
  "Barndominium",
  "Garage / Workshop",
  "RV Cover / Carport",
  "Agricultural",
  "Commercial",
];

const countyData: Record<County, CountyInfo> = {
  Mecklenburg: {
    permitRequired: true,
    permitNotes:
      "Building permit + zoning permit required. Submit through Accela Citizen Access portal at mecknc.gov. Strictest review in the region.",
    setbacks: "Varies by zoning district — contact LUESA at 980-314-2633",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "High — HOA restrictions very common in Mecklenburg subdivisions",
    permitContact: "Mecklenburg County LUESA: 980-314-2633",
    processTip:
      "Get zoning use permit approved before submitting building permit — Code Enforcement won't open plan review until zoning is cleared.",
  },
  Iredell: {
    permitRequired: true,
    permitNotes:
      "Zoning permit required for ALL accessory buildings including pole sheds. Building permit required if any dimension exceeds 12 feet.",
    setbacks:
      "Typically 10 ft from all property lines. Lake lots and corner lots differ — verify with county.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "Moderate — common in Lake Norman waterfront communities",
    permitContact: "Iredell County Building Standards: 704-878-3113",
    processTip:
      "Health department must approve location if property has septic system before building permit is issued.",
  },
  Cabarrus: {
    permitRequired: true,
    permitNotes:
      "Permits required for all accessory structures not attached to primary building. Apply through Accela Citizen Access portal.",
    setbacks: "Varies by zoning district — contact Construction Standards Division",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "Moderate — growing suburban county with active HOAs",
    permitContact: "Cabarrus County Construction Standards: 704-920-2128",
    processTip:
      "Contact construction2222@cabarruscounty.us before submitting to confirm current requirements.",
  },
  Gaston: {
    permitRequired: true,
    permitNotes:
      "Building permit required before starting any construction. Separate trade permits needed for electrical, plumbing, or HVAC.",
    setbacks: "Varies by zoning district",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "Low to Moderate",
    permitContact: "Gaston County Building & Development Services: 704-866-3155",
    processTip:
      "Call before submitting — Gaston County team can clarify requirements for your specific parcel.",
  },
  Rowan: {
    permitRequired: true,
    permitNotes:
      "Two-step process: get municipal permit first if in a municipality, then county permit. Requirements vary by city (Salisbury, Spencer, China Grove, etc.)",
    setbacks: "Setback rules vary — check property line distances and utility easements",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "Low to Moderate",
    permitContact: "Rowan County Permitting: rowancountync.gov",
    processTip:
      "If you're inside a municipality boundary, you need the municipal permit first before the county permit.",
  },
  Union: {
    permitRequired: true,
    permitNotes:
      "Building and zoning permits required. Check your specific zoning district first as requirements vary significantly across Union County.",
    setbacks: "Varies by zoning district",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "High — Union County has significant suburban growth with active HOAs",
    permitContact: "Union County Building Code Enforcement: unioncountync.gov",
    processTip:
      "Union County is one of the fastest growing counties in NC — verify current zoning before purchasing land for a build.",
  },
  Lincoln: {
    permitRequired: true,
    permitNotes:
      "Building permit required for new structures. Contact Lincoln County Inspections directly for current requirements.",
    setbacks: "Varies by zoning district",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "Low to Moderate",
    permitContact: "Lincoln County Inspections: lincolncounty.org",
    processTip:
      "Lincoln County is more rural — requirements may be more flexible than Mecklenburg but always verify.",
  },
  Stanly: {
    permitRequired: true,
    permitNotes:
      "Building permit required. Contact Stanly County Inspections for specific requirements for your parcel.",
    setbacks: "Varies by zoning district",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk: "Low",
    permitContact: "Stanly County Inspections: stanlycountync.gov",
    processTip:
      "Stanly is among the more rural counties in the region — agricultural builds typically face fewer restrictions.",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const viewportOnce = { once: true, amount: 0.2 } as const;

function hoaTone(hoa: string): { dot: string; chip: string; label: string } {
  const leading = hoa.trim().split(/[\s—-]/)[0].toLowerCase();
  if (leading === "high") {
    return {
      dot: "bg-amber-500",
      chip: "bg-amber-50 text-amber-900 border-amber-300",
      label: "High",
    };
  }
  if (leading === "moderate") {
    return {
      dot: "bg-yellow-400",
      chip: "bg-yellow-50 text-yellow-900 border-yellow-300",
      label: "Moderate",
    };
  }
  return {
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-900 border-emerald-300",
    label: "Low",
  };
}

function extractPhone(s: string): string | null {
  const match = s.match(/(\d{3})[-.\s](\d{3})[-.\s](\d{4})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

function extractDomain(s: string): string | null {
  const match = s.match(/([a-z0-9-]+\.(?:gov|org|com|us))/i);
  return match ? match[1] : null;
}

function extractEmail(s: string): string | null {
  const match = s.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  return match ? match[0] : null;
}

export default function SiteCheckPage() {
  const [county, setCounty] = useState<County | "">("");
  const [buildingType, setBuildingType] = useState<BuildingType | "">("");
  const [result, setResult] = useState<
    | { county: County; buildingType: BuildingType; info: CountyInfo }
    | null
  >(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!county || !buildingType) return;
    setResult({ county, buildingType, info: countyData[county] });
  };

  return (
    <>
      <Nav />
      <main>
        {/* 1. HERO */}
        <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,169,110,0.3) 40px, rgba(201,169,110,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,169,110,0.3) 40px, rgba(201,169,110,0.3) 41px)`,
              }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                Know Before You Build
              </span>
              <div className="h-px w-10 bg-[#C9A96E]" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              NC Build <span className="text-[#C9A96E]">Site Checker</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
            >
              Everything begins with a few key questions: What&apos;s the purpose
              of this building? What restrictions or HOA rules apply in your
              area? Enter your county and building type below to see what to
              expect.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mt-4 text-white/50 text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
            >
              Note: While this tool currently covers North Carolina counties, AAIRE Co. serves customers nationwide. Contact us for permit and code requirements in any state.
            </motion.p>
          </div>
        </section>

        {/* 2. INTERACTIVE CHECKER */}
        <section className="bg-[#f7f5f0] py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Form card */}
            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              onSubmit={handleSubmit}
              className="bg-white border border-[#0d1b2a]/10 rounded-sm shadow-sm p-6 sm:p-8 lg:p-10"
              aria-label="NC Build Site Checker"
            >
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="county"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                  >
                    County
                  </label>
                  <select
                    id="county"
                    required
                    value={county}
                    onChange={(e) => setCounty(e.target.value as County)}
                    className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors"
                  >
                    <option value="" disabled>
                      Select a county…
                    </option>
                    {COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="buildingType"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                  >
                    Building Type
                  </label>
                  <select
                    id="buildingType"
                    required
                    value={buildingType}
                    onChange={(e) =>
                      setBuildingType(e.target.value as BuildingType)
                    }
                    className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors"
                  >
                    <option value="" disabled>
                      Select a building type…
                    </option>
                    {BUILDING_TYPES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={!county || !buildingType}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] disabled:bg-[#C9A96E]/40 disabled:cursor-not-allowed text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-md shadow-[#C9A96E]/20 hover:shadow-lg hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
                >
                  Check My Site
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </motion.form>

            {/* Results */}
            <AnimatePresence mode="wait">
              {result && <Results key={result.county + result.buildingType} result={result} />}
            </AnimatePresence>
          </div>
        </section>

        {/* 3. DISCLAIMER */}
        <section className="bg-white py-12 lg:py-16 border-t border-[#0d1b2a]/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-[#0d1b2a]/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-[#0d1b2a]/60 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                This tool provides general guidance based on publicly available
                county information. Requirements change and vary by parcel,
                zoning district, and building use. Always verify current
                requirements directly with your county before purchasing land
                or starting construction. AAIRE Co. can help you navigate this
                process — get a free consultation with your quote request.
              </p>
            </div>
          </div>
        </section>

        {/* 4. CTA */}
        <section className="relative bg-[#0d1b2a] py-20 lg:py-28 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Not sure where to start?
              </h2>
              <p className="mt-6 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
                We&apos;ve helped customers navigate county requirements across
                the country. Get a free quote and we&apos;ll walk you
                through what your specific site needs.
              </p>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/#quote"
                  id="site-check-cta-quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
                >
                  Get Your Free Quote
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Results({
  result,
}: {
  result: { county: County; buildingType: BuildingType; info: CountyInfo };
}) {
  const { county, buildingType, info } = result;
  const tone = hoaTone(info.hoaRisk);
  const phone = extractPhone(info.permitContact);
  const email = extractEmail(info.permitContact);
  const domain = extractDomain(info.permitContact);

  const contactLabel = info.permitContact.split(":")[0].trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      className="mt-12 lg:mt-16"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-3">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="text-[#0d1b2a]/70 text-xs font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
            Results for {county} County · {buildingType}
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Permit Required */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
            Permit Required
          </h3>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Yes — Required
            </span>
          </div>
          <p className="mt-4 text-[#0d1b2a]/75 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            {info.permitNotes}
          </p>
        </motion.div>

        {/* Wind Zone */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
            Wind Zone
          </h3>
          <div className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d1b2a]">
            {info.windZone}
          </div>
          <p className="mt-2 text-[#0d1b2a]/60 text-xs italic font-[family-name:var(--font-inter)]">
            Verify with engineer
          </p>
        </motion.div>

        {/* Snow Load */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
            Snow Load
          </h3>
          <div className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d1b2a]">
            {info.snowLoad}
          </div>
          <p className="mt-2 text-[#0d1b2a]/60 text-xs italic font-[family-name:var(--font-inter)]">
            Ground snow load, minimum design
          </p>
        </motion.div>

        {/* Setbacks */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors sm:col-span-2 lg:col-span-1"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
            Typical Setbacks
          </h3>
          <p className="mt-3 text-[#0d1b2a] text-base leading-relaxed font-[family-name:var(--font-inter)]">
            {info.setbacks}
          </p>
        </motion.div>

        {/* HOA Risk */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={4}
          className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
            HOA Risk
          </h3>
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-semibold ${tone.chip}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
              {tone.label}
            </span>
          </div>
          <p className="mt-3 text-[#0d1b2a]/75 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            {info.hoaRisk}
          </p>
        </motion.div>

        {/* Permit Contact */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={5}
          className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
            Permit Contact
          </h3>
          <p className="mt-3 text-[#0d1b2a] text-sm font-semibold font-[family-name:var(--font-inter)]">
            {contactLabel}
          </p>
          {phone && (
            <a
              href={`tel:${phone.replace(/-/g, "")}`}
              className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-base transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
          )}
          {!phone && email && (
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-sm break-all transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </a>
          )}
          {!phone && !email && domain && (
            <a
              href={`https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-base transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {domain}
            </a>
          )}
        </motion.div>
      </div>

      {/* Pro Tip */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={6}
        className="mt-5 sm:mt-6 relative overflow-hidden rounded-sm border border-[#C9A96E]/40 bg-[#C9A96E]/10 p-6 sm:p-8"
      >
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#C9A96E]" />
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E]/25 border border-[#C9A96E]/50 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#b8954f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="text-[#0d1b2a] font-[family-name:var(--font-playfair)] text-xl font-bold">
              Pro Tip
            </h4>
            <p className="mt-2 text-[#0d1b2a]/85 text-base leading-relaxed font-[family-name:var(--font-inter)]">
              {info.processTip}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
