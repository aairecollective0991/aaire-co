"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const structureTypes = [
  {
    id: "open-web-truss",
    image: "/images/construction/open-web-truss-tapered.jpg",
    badge: "Most Popular",
    headline: "Open Web Truss",
    subheadline: "The workhorse of residential and light commercial builds",
    description:
      "The open web truss uses interconnected triangular steel members to distribute roof loads to the outer columns — no interior support posts needed. The triangular geometry creates exceptional strength using less material than solid beam systems, keeping costs down without sacrificing performance.",
    pros: [
      "Available widths: 12 to 80 feet clear span",
      "Trusses are 100% pre-welded and pre-punched at the factory",
      "Purlin and girt clips are factory welded",
      "Submerged twice in rust-proof coating before shipping",
      "Available with tapered columns or flush mount configuration",
      "Standard and long bay options available",
      "Half trusses available in 12-40 ft widths for additions",
      "Self-supporting roof overhangs available 1-14 ft widths",
      "26 and 29 gauge sheet metal, 80,000 PSI tensile strength, 18 color options",
    ],
    bestFor: [
      "Garages and workshops",
      "Barndominiums",
      "Agricultural storage",
      "Horse arenas",
      "Light commercial buildings",
      "Any project where DIY assembly is planned",
    ],
    notIdealFor: [
      "Buildings requiring overhead crane systems",
      "Structures wider than 80 feet",
    ],
  },
  {
    id: "open-web-truss-flush",
    image: "/images/construction/open-web-truss-flush.jpg",
    headline: "Open Web Truss — Flush Mount",
    subheadline: "The residential-friendly configuration for attached and low-profile builds",
    description:
      "The flush mount configuration uses the same proven open web truss system but with columns that mount flush to the foundation — no exposed tapered legs. This gives the building a cleaner, more residential appearance and makes it easier to integrate with existing structures, attach to a home, or install on finished concrete. It's the preferred configuration for garages attached to residences, workshop additions, and any project where aesthetics and a finished look matter.",
    pros: [
      "Cleaner exterior profile — no visible tapered column legs",
      "Easier to attach to existing structures and home foundations",
      "Preferred for residential neighborhoods and HOA-sensitive properties",
      "Same structural strength as standard open web truss",
      "Works with all standard door, window, and insulation options",
      "DIY friendly — same pre-punched, pre-welded kit system",
    ],
    bestFor: [
      "Attached garages and workshop additions",
      "Residential builds in HOA communities",
      "Projects requiring a finished architectural appearance",
      "Builds where the structure integrates with existing construction",
    ],
    notIdealFor: [
      "Agricultural builds where appearance is secondary",
      "Very large clear span requirements over 80 feet",
    ],
  },
  {
    id: "rigid-frame",
    image: "/images/construction/Tapered-member-frame.jpg",
    headline: "Rigid Frame — Red Iron",
    subheadline: "Maximum clear span for commercial and industrial applications",
    description:
      "Rigid frame buildings use solid steel I-beams as the primary structure. Strength comes from the thickness of the steel itself rather than geometric design. This makes rigid frame the most robust option for large commercial projects, overhead crane applications, and buildings requiring maximum open interior space.",
    pros: [
      "Clear span up to 225 feet — largest available",
      "Superior lateral load resistance against wind and seismic forces",
      "Supports overhead crane systems",
      "Stiffer system with less deflection under heavy loads",
      "Proven track record in extreme weather conditions",
      "Simpler architectural planning with fewer secondary supports",
    ],
    bestFor: [
      "Large commercial and industrial buildings",
      "Manufacturing facilities and warehouses",
      "Aircraft hangars",
      "Buildings with overhead crane requirements",
      "Structures over 80 feet wide",
    ],
    notIdealFor: [
      "Budget-conscious projects — highest material cost",
      "DIY assembly — typically requires professional installation crew",
    ],
  },
  {
    id: "gambrel",
    image: "/images/construction/designstudio3.jpg",
    headline: "Gambrel Style",
    subheadline: "The barn aesthetic with steel durability",
    description:
      "The gambrel roof style features a two-slope design on each side — a steeper lower slope and a shallower upper slope. This distinctive barn profile maximizes usable interior volume, providing significant loft or upper storage space while maintaining the classic agricultural aesthetic that property owners across the country appreciate.",
    pros: [
      "Maximum interior volume for the footprint",
      "Distinctive barn aesthetic — fits residential and agricultural settings",
      "Upper loft space for storage or living area",
      "Works with open web truss system",
    ],
    bestFor: [
      "Agricultural properties wanting classic barn look",
      "Hobby farms and horse properties",
      "Properties with HOA restrictions on commercial-looking structures",
      "Barndominiums wanting a traditional profile",
    ],
    notIdealFor: [
      "Purely commercial applications",
      "Locations with very high snow load requirements",
    ],
  },
];

const comparisonData = [
  {
    frameType: "Open Web Truss",
    bestFor: "Garages, barndominiums, ag",
    maxClearSpan: "80 ft",
    diyFriendly: "Yes",
    relativeCost: "$",
  },
  {
    frameType: "Flush Mount",
    bestFor: "Attached garages, residential",
    maxClearSpan: "80 ft",
    diyFriendly: "Yes",
    relativeCost: "$$",
  },
  {
    frameType: "Rigid Frame",
    bestFor: "Commercial, industrial, hangars",
    maxClearSpan: "225 ft",
    diyFriendly: "No",
    relativeCost: "$$$",
  },
  {
    frameType: "Gambrel",
    bestFor: "Agricultural, residential",
    maxClearSpan: "150 ft",
    diyFriendly: "Yes",
    relativeCost: "$$",
  },
];

export default function ConstructionPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#0d1b2a] text-white pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
              >
                <p className="text-[#C9A96E] text-sm font-semibold tracking-wide uppercase mb-4">
                  Understanding Your Build
                </p>
              </motion.div>

              <motion.h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
                variants={fadeUp}
              >
                Choose the Right Structure for Your Project
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-white/80 leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                variants={fadeUp}
              >
                Not all steel buildings are built the same way. The frame type
                you choose affects your cost, your clear span, your assembly
                difficulty, and how the building performs over time. Here's
                what you need to know.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Structure Types Sections */}
        {structureTypes.map((structure, index) => (
          <section
            key={structure.id}
            className={index % 2 === 0 ? "bg-[#f7f5f0]" : "bg-white"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                  variants={fadeUp}
                >
                  <Image
                    src={structure.image}
                    alt={structure.headline}
                    fill
                    className="object-cover"
                  />
                  {structure.badge && (
                    <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0d1b2a] px-4 py-2 rounded-sm font-semibold text-sm">
                      {structure.badge}
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1}
                  variants={fadeUp}
                >
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] mb-3">
                    {structure.headline}
                  </h2>
                  <p className="text-[#C9A96E] text-lg font-semibold mb-4">
                    {structure.subheadline}
                  </p>
                  <p className="text-[#0d1b2a]/80 text-lg leading-relaxed mb-8">
                    {structure.description}
                  </p>

                  {/* Pros */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#0d1b2a] mb-3">
                      Key Advantages:
                    </h3>
                    <ul className="space-y-2">
                      {structure.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-[#0d1b2a]/80">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#0d1b2a] mb-3">
                      Best For:
                    </h3>
                    <ul className="space-y-2">
                      {structure.bestFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-[#0d1b2a]/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Ideal For */}
                  <div>
                    <h3 className="font-semibold text-[#0d1b2a] mb-3">
                      Not Ideal For:
                    </h3>
                    <ul className="space-y-2">
                      {structure.notIdealFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-[#0d1b2a]/40 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-[#0d1b2a]/60">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* Assembly Overview Section */}
        <section className="bg-[#0d1b2a] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 lg:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Every Kit Ships Ready to Build
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
                Whether you choose open web truss or rigid frame, every
                Worldwide Steel Buildings kit arrives pre-punched, pre-welded,
                and numbered for assembly. Each kit includes a comprehensive
                step-by-step manual — and AAIRE Co. specialists are available
                throughout your build.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
                variants={fadeUp}
              >
                <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#0d1b2a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">
                  Pre-engineered
                </h3>
                <p className="text-white/80">
                  Every component is designed to your local wind and snow load
                  requirements before it ships
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                variants={fadeUp}
              >
                <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#0d1b2a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">
                  Factory Direct
                </h3>
                <p className="text-white/80">
                  Kits ship directly from the Worldwide Steel manufacturing
                  facility to your property
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
                variants={fadeUp}
              >
                <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#0d1b2a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">
                  Supported Build
                </h3>
                <p className="text-white/80">
                  AAIRE Co. provides support from design through final assembly
                  — you're never building alone
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="bg-[#f7f5f0] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] mb-4">
                Quick Comparison
              </h2>
            </motion.div>

            <motion.div
              className="overflow-x-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              variants={fadeUp}
            >
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-[#0d1b2a] text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold">
                      Frame Type
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      Best For
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      Max Clear Span
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      DIY Friendly
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      Relative Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#f7f5f0] transition-colors"
                    >
                      <td className="px-4 py-4 font-semibold text-[#0d1b2a]">
                        {row.frameType}
                      </td>
                      <td className="px-4 py-4 text-[#0d1b2a]/80">
                        {row.bestFor}
                      </td>
                      <td className="px-4 py-4 text-[#0d1b2a]/80">
                        {row.maxClearSpan}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-sm font-medium ${
                            row.diyFriendly === "Yes"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {row.diyFriendly}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#C9A96E] font-bold text-lg">
                        {row.relativeCost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p
              className="text-sm text-[#0d1b2a]/60 text-center mt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              variants={fadeUp}
            >
              Scroll horizontally to view full table on mobile devices
            </motion.p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0d1b2a] text-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Not sure which frame type is right for your project?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Tell us what you're building and we'll recommend the right
                structure for your site, your budget, and your county's
                requirements.
              </p>
              <a
                href="/#quote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-lg font-semibold rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Your Free Quote
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
