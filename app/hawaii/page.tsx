"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

const whyCards = [
  {
    title: "Salt and Moisture Resistance",
    body: "Worldwide Steel trusses are double-dipped in a rust-proof coating — essential in Hawaii's high-humidity, salt-air coastal environment. Steel outperforms wood in every climate category Hawaii throws at it.",
  },
  {
    title: "Wind and Storm Rated",
    body: "Every Worldwide Steel kit is engineered to your local wind load requirements. Hawaii's high wind zones and hurricane exposure are factored into the structural design before your kit ships.",
  },
  {
    title: "No Rot, No Termites",
    body: "Hawaii has some of the most aggressive termite populations in the US. Steel is completely immune — no fumigation, no rot, no structural compromise over time.",
  },
  {
    title: "50-Year Structural Warranty",
    body: "Every building ships with an industry-leading 50-year structural warranty. In Hawaii's demanding climate, that's peace of mind that wood-frame construction simply cannot match.",
  },
];

const deliverySteps = [
  {
    num: "01",
    title: "Design & Order",
    body: "You work with AAIRE Co. to design your building and place your order. Every component is engineered to meet Hawaii's specific building codes and wind load requirements.",
  },
  {
    num: "02",
    title: "Factory Manufacturing",
    body: "Your kit is manufactured at Worldwide Steel's facility in Peculiar, Missouri using 100% American steel. Every component is pre-punched, pre-welded, and numbered for assembly.",
  },
  {
    num: "03",
    title: "Continental Freight to Port",
    body: "Your building ships via freight truck from the Midwest factory to a West Coast port — typically a California port for Hawaii-bound shipments.",
  },
  {
    num: "04",
    title: "Ocean Freight to Hawaii",
    body: "Components are loaded into shipping containers and transported across the Pacific. We coordinate with freight forwarding partners to get your kit to the Hawaiian port of your choice — Honolulu, Maui, Hilo, or others.",
  },
  {
    num: "05",
    title: "Port to Your Property",
    body: "From the port, your building is transported to your property via local freight. We help coordinate this final leg so you're not navigating Hawaiian logistics alone.",
  },
];

const codeCards = [
  {
    title: "High Wind Zones",
    body: "Hawaii's wind exposure varies by island and location. Coastal and elevated properties face significant wind loads. Every kit is custom-engineered to your specific site's wind requirements.",
  },
  {
    title: "Seismic Considerations",
    body: "Hawaii sits in an active seismic zone due to volcanic activity. Steel frame construction provides excellent seismic resistance compared to wood or concrete block.",
  },
  {
    title: "Humidity and Corrosion",
    body: "The combination of high humidity, salt air, and tropical rainfall demands corrosion-resistant materials. Worldwide Steel's rust-proof coating process and galvanized components are designed for exactly these conditions.",
  },
  {
    title: "County Permitting",
    body: "Each Hawaiian county has its own permitting requirements. AAIRE Co. will help you understand what's needed in your county — from Honolulu to Hawaii County to Maui County to Kauai County.",
  },
];

const buildingTypes = [
  {
    title: "Agricultural Storage",
    body: "Protect equipment, livestock feed, and vehicles on working farms across the Big Island, Maui, and Kauai.",
  },
  {
    title: "Residential Garage",
    body: "Add a steel garage to your property — durable, low maintenance, and built to handle the elements.",
  },
  {
    title: "Workshop & Studio",
    body: "Create a dedicated workspace, art studio, or business facility that holds up to Hawaii's climate year after year.",
  },
  {
    title: "Commercial Storage",
    body: "Cost-effective commercial storage buildings for island businesses — built faster and cheaper than concrete block construction.",
  },
  {
    title: "Agricultural Arena",
    body: "Horse arenas and riding facilities that withstand Hawaii's rain and wind without the maintenance burden of wood.",
  },
  {
    title: "Barndominium",
    body: "Live-work steel structures are growing in popularity on Hawaii's rural properties — particularly on the Big Island's agricultural lots.",
  },
];

const faqs = [
  {
    q: "How much does shipping to Hawaii add to the cost?",
    a: "Shipping costs vary based on building size, island destination, and port logistics. We provide a complete delivered price — including ocean freight — when you request your quote so there are no surprises.",
  },
  {
    q: "Which Hawaiian islands do you ship to?",
    a: "We ship to all major Hawaiian islands including Oahu, Maui, the Big Island (Hawaii County), Kauai, Molokai, and Lanai. Port availability varies by island — we'll coordinate the best route for your location.",
  },
  {
    q: "How long does delivery take to Hawaii?",
    a: "Typical lead time is 10-14 weeks from order placement to delivery at your Hawaiian port. This includes manufacturing time, continental freight, and ocean transit.",
  },
  {
    q: "Do your buildings meet Hawaii's building codes?",
    a: "Yes. Every Worldwide Steel kit is custom-engineered to meet local wind load, seismic, and structural requirements. We provide stamped engineering drawings required for Hawaiian building permits.",
  },
  {
    q: "Can I assemble the building myself in Hawaii?",
    a: "Yes. Worldwide Steel kits are designed for DIY assembly — all components are pre-punched, pre-welded, and numbered with a step-by-step manual. Many Hawaii customers assemble with local labor. AAIRE Co. provides support throughout the process.",
  },
];

export default function HawaiiPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero Section */}
        <section className="relative bg-[#0d1b2a] text-white pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
              >
                <p className="text-[#C9A96E] text-sm font-semibold tracking-wide uppercase mb-4">
                  Delivering to the Hawaiian Islands
                </p>
              </motion.div>

              <motion.h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
                variants={fadeUp}
              >
                Steel Buildings Built for Hawaii.
              </motion.h1>

              <motion.p
                className="text-[#C9A96E] text-xl sm:text-2xl font-semibold mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                variants={fadeUp}
              >
                We ship anywhere in the islands.
              </motion.p>

              <motion.p
                className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
                variants={fadeUp}
              >
                Most steel building companies stop at the continental US. AAIRE Co. — as a certified Worldwide Steel Buildings distributor — ships factory-direct to Hawaii. Get the same premium American-made steel building kit delivered to your island, engineered specifically for Hawaii's climate, wind loads, and building codes.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.4}
                variants={fadeUp}
              >
                <a
                  href="/#quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-lg font-semibold rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Get Your Hawaii Quote
                </a>
                <a
                  href="#delivery"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 hover:border-[#C9A96E] text-white hover:text-[#C9A96E] text-lg font-semibold rounded-sm transition-all duration-200"
                >
                  How Delivery Works
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Why Steel for Hawaii */}
        <section className="bg-[#f7f5f0] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 lg:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] mb-4">
                Why Steel is the Smart Choice for Hawaiian Properties
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 lg:p-8 hover:border-[#C9A96E] transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1 + i * 0.1}
                  variants={fadeUp}
                >
                  <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#0d1b2a] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#0d1b2a]/80 leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How Delivery Works */}
        <section id="delivery" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 lg:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] mb-4">
                How We Get Your Building to Hawaii
              </h2>
              <p className="text-lg text-[#0d1b2a]/70 max-w-2xl mx-auto">
                Shipping to Hawaii is simpler than most people think. Here's the process step by step.
              </p>
            </motion.div>

            <div className="space-y-6">
              {deliverySteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="bg-[#f7f5f0] border border-[#0d1b2a]/10 rounded-sm p-6 lg:p-8 hover:border-[#C9A96E] transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1 + i * 0.1}
                  variants={fadeUp}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center">
                        <span className="font-serif text-xl font-bold text-[#0d1b2a]">
                          {step.num}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#0d1b2a] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#0d1b2a]/80 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.6}
              variants={fadeUp}
            >
              <p className="text-[#0d1b2a]/60 italic">
                Lead times for Hawaii shipments are typically 10-14 weeks from order to delivery. We'll give you a precise timeline when you request your quote.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4. Hawaii Building Codes */}
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
                Built to Hawaii's Standards
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Hawaii has some of the most stringent building codes in the United States — and for good reason. Every Worldwide Steel kit delivered to Hawaii is engineered to meet or exceed these requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {codeCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="bg-white/5 border border-white/10 rounded-sm p-6 lg:p-8 hover:border-[#C9A96E]/50 hover:bg-white/[0.07] transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1 + i * 0.1}
                  variants={fadeUp}
                >
                  <h3 className="font-serif text-xl lg:text-2xl font-bold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. What You Can Build */}
        <section className="bg-[#f7f5f0] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 lg:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a]">
                What Hawaii Customers Are Building
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {buildingTypes.map((type, i) => (
                <motion.div
                  key={type.title}
                  className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 lg:p-8 hover:border-[#C9A96E] transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1 + i * 0.05}
                  variants={fadeUp}
                >
                  <h3 className="font-serif text-xl font-bold text-[#0d1b2a] mb-3">
                    {type.title}
                  </h3>
                  <p className="text-[#0d1b2a]/80 leading-relaxed">
                    {type.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 lg:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a]">
                Common Questions from Hawaii Customers
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="border border-[#0d1b2a]/10 rounded-sm overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1 + i * 0.05}
                  variants={fadeUp}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full text-left px-6 py-5 bg-[#f7f5f0] hover:bg-[#ebe8df] transition-colors duration-200 flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold text-[#0d1b2a] text-lg">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[#C9A96E] flex-shrink-0 transition-transform duration-200 ${
                        openFaqIndex === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaqIndex === i ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-5 bg-white border-t border-[#0d1b2a]/10">
                      <p className="text-[#0d1b2a]/80 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA Section */}
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
                Ready to Build in Hawaii?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Get a free quote on your Hawaii steel building project. We'll handle the logistics — you focus on your build.
              </p>
              <a
                href="/#quote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-lg font-semibold rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-4"
              >
                Get Your Free Hawaii Quote
              </a>
              <p className="text-white/60 text-sm">
                Questions? Call or text us directly.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
