"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const viewportOnce = { once: true, amount: 0.25 } as const;

const whyPoints = [
  {
    title: "Uncompromising Quality",
    body: "American-made steel, engineered components, and rigorous QA at every stage — the same standard on a 24x30 garage as on a 100-ft clear-span.",
  },
  {
    title: "True Customization",
    body: "Every building is drawn to your site, use case, and aesthetic. Pick the pitch, the trim, the doors, the color — no cookie-cutter kits.",
  },
  {
    title: "Installation You Can Trust",
    body: "Local crews who have framed hundreds of these buildings. Clean work, careful site management, and respect for your property.",
  },
  {
    title: "Honest, Factory-Direct Cost",
    body: "We ship direct from the mill. No middle markups, no surprise change orders — just a straight quote you can actually read.",
  },
  {
    title: "Code-Compliant Engineering",
    body: "Stamped drawings, permit-ready packages, wind and snow loads dialed in for North Carolina. We sweat the paperwork so you don't.",
  },
  {
    title: "Support That Outlasts the Build",
    body: "We're a phone call away years after the ribbon-cutting. Warranty questions, additions, or a second building — same team, same people.",
  },
];

const values = [
  {
    eyebrow: "01",
    title: "Simple Ideas",
    body: "A good building starts with a clear idea. We strip away the jargon and help you design something that actually fits your life and your land.",
  },
  {
    eyebrow: "02",
    title: "Lasting Impact",
    body: "Steel that stands for generations. We build structures meant to outlive the paperwork — passed down, added to, and relied on for decades.",
  },
  {
    eyebrow: "03",
    title: "Nationwide Reach",
    body: "From coast to coast, we deliver the same personal service and attention to detail. Every customer gets the same care, whether you're in North Carolina or Nevada.",
  },
];

const steps = [
  {
    num: "01",
    title: "Tell us what you need",
    body: "A quick conversation — on the phone or on-site — to understand your use, your land, and your budget. No pressure, no pitch deck.",
  },
  {
    num: "02",
    title: "We design around you",
    body: "Custom drawings, real numbers, and clear options. You see the full picture before a single beam is ordered.",
  },
  {
    num: "03",
    title: "We build it right",
    body: "Factory-direct materials, local installation, and one point of contact from first call to final walkthrough.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. HERO */}
        <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
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

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                Our Story
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
              Built on Integrity.{" "}
              <span className="text-[#C9A96E]">Driven by Craftsmanship.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
            >
              AAIRE Co. Metal Buildings is a certified Worldwide Steel Buildings distributor serving customers across all 50 states — turning raw land into barns,
              shops, and homes that are built to last.
            </motion.p>
          </div>
        </section>

        {/* 2. MISSION */}
        <section className="bg-[#f7f5f0] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={0}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-[#C9A96E]" />
                  <span className="text-[#0d1b2a]/70 text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                    Our Mission
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight tracking-tight">
                  Steel the Show
                </h2>
                <div className="mt-6 space-y-5 text-[#0d1b2a]/80 text-base lg:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                  <p>
                    AAIRE Co. was founded on a simple belief: a metal building
                    should be as thoughtful as the people who use it. We are a
                    certified Worldwide Steel Buildings distributor, which
                    means factory-direct pricing, engineered-to-order designs,
                    and a 50-year structural warranty backing every project.
                  </p>
                  <p>
                    What sets us apart isn&apos;t the steel — it&apos;s the
                    service. We take the time to listen, to walk your land, to
                    understand how you actually plan to use the building.
                    Then we design around that. No templates, no shortcuts,
                    just a structure that fits.
                  </p>
                  <p>
                    Whether it&apos;s a barndominium on five acres, a shop for
                    your equipment, or an agricultural building for the farm —
                    we&apos;re here to make the process honest, the craftsmanship
                    visible, and the outcome something you&apos;re proud to own.
                  </p>
                </div>
              </motion.div>

              {/* Right */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={0.15}
                className="lg:pl-8"
              >
                <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-8 lg:p-10 shadow-sm">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-[#0d1b2a] mb-8">
                    Why Choose AAIRE Co.
                  </h3>
                  <ul className="space-y-6">
                    {whyPoints.map((point, i) => (
                      <motion.li
                        key={point.title}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        custom={0.1 + i * 0.05}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/40 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-[#C9A96E]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0d1b2a] text-base lg:text-lg font-[family-name:var(--font-inter)]">
                            {point.title}
                          </h4>
                          <p className="mt-1 text-[#0d1b2a]/70 text-sm lg:text-base leading-relaxed font-[family-name:var(--font-inter)]">
                            {point.body}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. VALUES */}
        <section className="relative bg-[#0d1b2a] py-20 lg:py-28 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              className="max-w-3xl mb-14 lg:mb-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                  What We Stand For
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Three principles shape every project we take on.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  custom={0.1 + i * 0.12}
                  className="group relative bg-white/5 border border-white/10 rounded-sm p-8 lg:p-10 hover:border-[#C9A96E]/50 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#C9A96E]/30 group-hover:text-[#C9A96E]/60 transition-colors duration-300">
                    {v.eyebrow}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-white/70 text-base leading-relaxed font-[family-name:var(--font-inter)]">
                    {v.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROCESS */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="text-[#0d1b2a]/70 text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                  The Process
                </span>
                <div className="h-px w-10 bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight tracking-tight">
                Let&apos;s start by talking about what you really need.
              </h2>
              <p className="mt-6 text-[#0d1b2a]/70 text-base lg:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                No high-pressure quotes, no template pitches. Just a
                conversation, a clear plan, and a building that earns its keep.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  custom={0.1 + i * 0.12}
                  className="relative bg-[#f7f5f0] border border-[#0d1b2a]/10 rounded-sm p-8 lg:p-10 hover:border-[#C9A96E] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#C9A96E]">
                      {step.num}
                    </span>
                    <div className="h-px flex-1 bg-[#C9A96E]/30" />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl font-bold text-[#0d1b2a] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[#0d1b2a]/70 text-base leading-relaxed font-[family-name:var(--font-inter)]">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CREDENTIALS */}
        <section className="bg-[#f7f5f0] py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={0}
                className="flex justify-center md:justify-start"
              >
                <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-10 lg:p-14 shadow-sm w-full max-w-md flex items-center justify-center">
                  <Image
                    src="/images/logos/worldwide-logo.png"
                    alt="Worldwide Steel Buildings — Certified Distributor"
                    width={120}
                    height={120}
                    className="object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={0.15}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-[#C9A96E]" />
                  <span className="text-[#0d1b2a]/70 text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                    Certified Partner
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-[#0d1b2a] leading-tight tracking-tight">
                  Backed by a{" "}
                  <span className="text-[#C9A96E]">50-Year Structural Warranty.</span>
                </h2>
                <p className="mt-6 text-[#0d1b2a]/80 text-base lg:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                  AAIRE Co. is a certified distributor of Worldwide Steel
                  Buildings — an American manufacturer with more than four
                  decades of engineering pedigree. Every frame we deliver is
                  pre-engineered, mill-direct, and covered by an industry-leading
                  50-year structural warranty on primary framing.
                </p>
                <p className="mt-4 text-[#0d1b2a]/80 text-base lg:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                  That means the building you put up today will still be
                  standing — square, true, and warrantied — half a century from
                  now.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. CTA */}
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
                Ready to build?
              </h2>
              <p className="mt-6 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
                Send us the basics about your project and we&apos;ll get back
                within two hours with honest numbers and next steps.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#quote"
                  id="about-cta-quote"
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
