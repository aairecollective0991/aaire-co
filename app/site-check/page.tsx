"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  STATES,
  BUILDING_TYPES,
  COUNTIES,
  countiesByState,
  hoaTone,
  extractPhone,
  extractEmail,
  extractDomain,
  type CountyPermit,
  type StateCode,
  type BuildingType,
} from "./permit-data";

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

export default function SiteCheckPage() {
  const [stateCode, setStateCode] = useState<StateCode>("NC");
  const [countySlug, setCountySlug] = useState<string>("");
  const [buildingType, setBuildingType] = useState<BuildingType | "">("");
  const [result, setResult] = useState<{ info: CountyPermit; buildingType: BuildingType } | null>(
    null
  );

  const counties = countiesByState(stateCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const info = counties.find((c) => c.slug === countySlug);
    if (!info || !buildingType) return;
    setResult({ info, buildingType });
  };

  const handleStateChange = (code: StateCode) => {
    setStateCode(code);
    setCountySlug("");
    setResult(null);
  };

  return (
    <>
      <Script id="site-check-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AAIRE Co. Build Site Checker",
          description:
            "Free building permit and site evaluation tool for North Carolina, South Carolina, Virginia, Georgia, Tennessee, and Hawaii. Check county permit requirements, setbacks, wind loads, and HOA considerations for metal building projects.",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "AAIRE Co.", url: "https://aaireco.com" },
          featureList: [
            "County building permit requirements",
            "Wind load and building code requirements",
            "HOA restriction guidance",
            "Setback requirements by county",
          ],
        })}
      </Script>

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
            Build <span className="text-[#C9A96E]">Site Checker</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
          >
            What&apos;s the purpose of your building? What permits, setbacks, and HOA rules apply
            where you&apos;re building? Pick your state and county below to see what to expect — across
            the Carolinas, Virginia, Georgia, Tennessee, and Hawaii.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="mt-4 text-white/50 text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
          >
            Don&apos;t see your county? AAIRE Co. serves customers nationwide — contact us for permit
            and code guidance in any state.
          </motion.p>
        </div>
      </section>

      {/* 2. INTERACTIVE CHECKER */}
      <section className="bg-[#f7f5f0] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#0d1b2a]/10 rounded-sm shadow-sm p-6 sm:p-8 lg:p-10"
            aria-label="Build Site Checker"
          >
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                >
                  State
                </label>
                <select
                  id="state"
                  value={stateCode}
                  onChange={(e) => handleStateChange(e.target.value as StateCode)}
                  className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors"
                >
                  {STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* County */}
              <div>
                <label
                  htmlFor="county"
                  className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                >
                  {stateCode === "HI" ? "Island / County" : "County"}
                </label>
                <select
                  id="county"
                  required
                  value={countySlug}
                  onChange={(e) => setCountySlug(e.target.value)}
                  className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors"
                >
                  <option value="" disabled>
                    Select a county…
                  </option>
                  {counties.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                      {stateCode === "HI" ? "" : " County"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Building Type */}
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
                  onChange={(e) => setBuildingType(e.target.value as BuildingType)}
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
                disabled={!countySlug || !buildingType}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] disabled:bg-[#C9A96E]/40 disabled:cursor-not-allowed text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-md shadow-[#C9A96E]/20 hover:shadow-lg hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
              >
                Check My Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Results */}
          <AnimatePresence mode="wait">
            {result && (
              <Results
                key={result.info.slug + result.buildingType}
                info={result.info}
                buildingType={result.buildingType}
              />
            )}
          </AnimatePresence>

          {/* Quote CTA (shown after results) */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-12 max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-r from-[#C9A96E]/10 to-[#C9A96E]/5 border border-[#C9A96E]/30 rounded-sm p-8 text-center">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a] mb-3">
                  Get a permit-ready quote for {result.info.name}
                  {result.info.state === "HI" ? "" : " County"}
                </h3>
                <p className="text-[#0d1b2a]/70 mb-6 max-w-2xl mx-auto">
                  Every AAIRE Co. building is engineered to your county&apos;s wind and snow
                  requirements, with stamped drawings included for permitting.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/#quote"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Get Your Free Quote
                  </Link>
                  <Link
                    href={`/site-check/${result.info.state.toLowerCase()}/${result.info.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#0d1b2a]/20 text-[#0d1b2a] hover:bg-[#0d1b2a]/5 text-base font-semibold rounded-sm transition-all duration-200"
                  >
                    View full {result.info.name} permit guide →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. DISCLAIMER */}
      <section className="bg-white py-12 lg:py-16 border-t border-[#0d1b2a]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-[#0d1b2a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-[#0d1b2a]/60 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
              This tool provides general guidance based on publicly available county information.
              Requirements change and vary by parcel, zoning district, and building use. Always verify
              current requirements directly with your county before purchasing land or starting
              construction. AAIRE Co. can help you navigate this process — get a free consultation with
              your quote request.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COUNTY DIRECTORY (SEO internal links) */}
      <section className="bg-[#f7f5f0] py-14 lg:py-20 border-t border-[#0d1b2a]/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#0d1b2a]">
            Permit guides by county
          </h2>
          <p className="mt-3 text-[#0d1b2a]/70 max-w-2xl font-[family-name:var(--font-inter)]">
            Detailed permit, setback, wind-load, and HOA guidance for every county we cover.
          </p>

          <div className="mt-8 space-y-8">
            {STATES.map((s) => {
              const list = countiesByState(s.code);
              if (list.length === 0) return null;
              return (
                <div key={s.code}>
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-3 font-[family-name:var(--font-inter)]">
                    {s.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {list.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/site-check/${c.state.toLowerCase()}/${c.slug}`}
                        className="inline-block px-3 py-1.5 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a]/80 text-sm hover:border-[#C9A96E] hover:text-[#0d1b2a] transition-colors font-[family-name:var(--font-inter)]"
                      >
                        {c.name}
                        {s.code === "HI" ? "" : " County"}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="relative bg-[#0d1b2a] py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={0}>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Not sure where to start?
            </h2>
            <p className="mt-6 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
              We&apos;ve helped customers navigate county requirements across the country. Get a free
              quote and we&apos;ll walk you through what your specific site needs.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/#quote"
                id="site-check-cta-quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
              >
                Get Your Free Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Results({ info, buildingType }: { info: CountyPermit; buildingType: BuildingType }) {
  const tone = hoaTone(info.hoaRisk);
  const phone = extractPhone(info.permitContact);
  const email = extractEmail(info.permitContact);
  const domain = extractDomain(info.permitContact);
  const contactLabel = info.permitContact.split(":")[0].trim();
  const noun = info.state === "HI" ? "" : " County";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      className="mt-12 lg:mt-16"
    >
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="text-[#0d1b2a]/70 text-xs font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
            Results for {info.name}{noun} · {buildingType}
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Permit Required */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0} className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">Permit Required</h3>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {info.permitRequired ? "Yes — Required" : "Often Not Required"}
            </span>
          </div>
          <p className="mt-4 text-[#0d1b2a]/75 text-sm leading-relaxed font-[family-name:var(--font-inter)]">{info.permitNotes}</p>
        </motion.div>

        {/* Wind Zone */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={1} className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">Wind Zone</h3>
          <div className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d1b2a]">{info.windZone}</div>
          <p className="mt-2 text-[#0d1b2a]/60 text-xs italic font-[family-name:var(--font-inter)]">Verify with engineer</p>
        </motion.div>

        {/* Snow Load */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={2} className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">Snow Load</h3>
          <div className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d1b2a]">{info.snowLoad}</div>
          <p className="mt-2 text-[#0d1b2a]/60 text-xs italic font-[family-name:var(--font-inter)]">Ground snow load, minimum design</p>
        </motion.div>

        {/* Setbacks */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={3} className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors sm:col-span-2 lg:col-span-1">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">Typical Setbacks</h3>
          <p className="mt-3 text-[#0d1b2a] text-base leading-relaxed font-[family-name:var(--font-inter)]">{info.setbacks}</p>
        </motion.div>

        {/* HOA Risk */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={4} className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">HOA Risk</h3>
          <div className="mt-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-semibold ${tone.chip}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
              {tone.label}
            </span>
          </div>
          <p className="mt-3 text-[#0d1b2a]/75 text-sm leading-relaxed font-[family-name:var(--font-inter)]">{info.hoaRisk}</p>
        </motion.div>

        {/* Permit Contact */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={5} className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E]/50 transition-colors">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">Permit Contact</h3>
          <p className="mt-3 text-[#0d1b2a] text-sm font-semibold font-[family-name:var(--font-inter)]">{contactLabel}</p>
          {phone && (
            <a href={`tel:${phone.replace(/-/g, "")}`} className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-base transition-colors">
              {phone}
            </a>
          )}
          {!phone && email && (
            <a href={`mailto:${email}`} className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-sm break-all transition-colors">
              {email}
            </a>
          )}
          {!phone && !email && domain && (
            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-base transition-colors">
              {domain}
            </a>
          )}
        </motion.div>
      </div>

      {/* Pro Tip */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={6} className="mt-5 sm:mt-6 relative overflow-hidden rounded-sm border border-[#C9A96E]/40 bg-[#C9A96E]/10 p-6 sm:p-8">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#C9A96E]" />
        <h4 className="text-[#0d1b2a] font-[family-name:var(--font-playfair)] text-xl font-bold">Pro Tip</h4>
        <p className="mt-2 text-[#0d1b2a]/85 text-base leading-relaxed font-[family-name:var(--font-inter)]">{info.processTip}</p>
      </motion.div>

      {/* Special Notes */}
      {info.specialNotes && (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={7} className="mt-5 sm:mt-6 relative overflow-hidden rounded-sm border border-blue-400 bg-blue-50 p-6 sm:p-8">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500" />
          <h4 className="text-blue-900 font-[family-name:var(--font-playfair)] text-xl font-bold">Site Notes for {info.name}{noun}</h4>
          <p className="mt-2 text-blue-900/85 text-base leading-relaxed font-[family-name:var(--font-inter)]">{info.specialNotes}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
