"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const viewportOnce = { once: true, amount: 0.25 } as const;

const sitePrepSteps = [
  {
    title: "Permits & Engineered Drawings",
    description:
      "Secure building permits and review engineered plans specific to your site's requirements and local building codes.",
  },
  {
    title: "Soil & Geotechnical Evaluation",
    description:
      "Assess soil composition and load-bearing capacity to ensure a stable foundation for your structure.",
  },
  {
    title: "Site Clearing",
    description:
      "Remove vegetation, roots, debris, and any existing structures to create a clean working area.",
  },
  {
    title: "Rough Grading for Drainage",
    description:
      "Shape the land to direct water away from your building, preventing future foundation issues.",
  },
  {
    title: "Utility Runs to Site",
    description:
      "Bring essential services — gas, electric, and water — to where your building will stand.",
  },
  {
    title: "Excavation for Footings",
    description:
      "Dig trenches to the required depth for your foundation footings, following engineered specifications.",
  },
  {
    title: "Footing Forms, Rebar & Pour",
    description:
      "Set forms, install reinforcing steel, pour concrete footings, and precisely place anchor bolts for column attachment.",
  },
  {
    title: "Sub-Base Preparation",
    description:
      "Lay compacted gravel and vapor barrier to create a stable, moisture-resistant base beneath your slab.",
  },
  {
    title: "Rough Plumbing Under Slab",
    description:
      "Install sanitary lines, water supply, and drains — sleeved where they penetrate the concrete — before the pour.",
  },
  {
    title: "Slab Reinforcement",
    description:
      "Position rebar or wire mesh to strengthen the concrete and prevent cracking under load.",
  },
  {
    title: "Pour Concrete Slab",
    description:
      "Place, level, and finish the slab that will serve as your building's floor and structural base.",
  },
  {
    title: "Cure Period",
    description:
      "Allow 7–28 days for concrete to reach full strength before assembly begins. Patience here pays off.",
  },
];

const assemblySteps = [
  {
    title: "Inventory Components",
    description:
      "Unload and organize all steel components on-site, verifying against your kit's bill of materials.",
  },
  {
    title: "Set Sidewall Columns",
    description:
      "Anchor vertical columns to the slab using the pre-set bolts, establishing the building's perimeter.",
  },
  {
    title: "Lift & Position Trusses",
    description:
      "Raise the engineered steel trusses into place and bolt them securely to the sidewall columns.",
  },
  {
    title: "Install Eave Struts, Ridge Beam & Roof Purlins",
    description:
      "Add the horizontal framing members that support roof panels and tie the structure together.",
  },
  {
    title: "Install Wind & X-Bracing",
    description:
      "Diagonal bracing ensures your building can withstand lateral forces from wind and seismic activity.",
  },
  {
    title: "Install Wall Girts",
    description:
      "Attach secondary framing to columns, creating the structure for wall panels and openings.",
  },
  {
    title: "Frame Door & Window Openings",
    description:
      "Reinforce openings according to engineered drawings to maintain structural integrity.",
  },
  {
    title: "Install Roof Panels",
    description:
      "Working from eave to ridge, fasten steel panels to purlins with exposed-fastener or standing-seam systems.",
  },
  {
    title: "Install Wall Panels",
    description:
      "Attach steel sheeting to wall girts, sealing the building envelope and adding insulation if specified.",
  },
  {
    title: "Install Trim",
    description:
      "Apply eave fascia, rake trim, corner trim, ridge cap, and gable closures for a finished, weather-tight appearance.",
  },
  {
    title: "Install Doors & Windows",
    description:
      "Fit and seal all entry points, ensuring proper operation and energy efficiency.",
  },
  {
    title: "Final Walkthrough",
    description:
      "Inspect every detail, verify all fasteners are tight, and confirm the building is ready for its intended use.",
  },
];

export default function BuildProcessPage() {
  return (
    <>
        {/* HERO */}
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
                The Build Process
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
              From Ground to{" "}
              <span className="text-[#C9A96E]">Steel-Framed Reality.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-[family-name:var(--font-inter)]"
            >
              Building a metal structure is a carefully sequenced process —
              from site preparation through final assembly. Here's what to
              expect when your AAIRE Co. project takes shape.
            </motion.p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="bg-[#C9A96E]/10 border-y border-[#C9A96E]/30 py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              className="flex gap-4 items-start"
            >
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-5 h-5 text-[#C9A96E]"
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
              <p className="text-[#0d1b2a]/80 text-sm lg:text-base leading-relaxed font-[family-name:var(--font-inter)]">
                <strong className="font-semibold text-[#0d1b2a]">
                  Important:
                </strong>{" "}
                Always follow the engineered drawings provided with your
                building kit. Consult a licensed contractor for site preparation
                and assembly. The information below is general guidance and not
                a substitute for engineered specifications or professional
                expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 1: SITE PREP */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              className="max-w-3xl mb-14 lg:mb-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#C9A96E]">
                  01
                </span>
                <div className="h-px flex-1 bg-[#C9A96E]/30" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight tracking-tight">
                Site Preparation
              </h2>
              <p className="mt-6 text-[#0d1b2a]/70 text-base lg:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                A solid foundation begins with proper site work. This phase
                transforms raw land into a level, code-compliant base ready to
                support decades of use.
              </p>
            </motion.div>

            {/* Site Prep Video */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0.1}
              className="mb-16 lg:mb-20"
            >
              <div className="relative aspect-video w-full max-w-4xl mx-auto bg-[#0d1b2a] rounded-sm overflow-hidden shadow-2xl">
                <video
                  controls
                  poster="/videos/site_prep_poster.jpg"
                  className="w-full h-full object-contain"
                  preload="metadata"
                >
                  <source src="/videos/site_prep_web.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="mt-4 text-center text-[#0d1b2a]/60 text-sm font-[family-name:var(--font-inter)]">
                30-second site preparation sequence — see how the foundation takes shape
              </p>
            </motion.div>

            {/* Site Prep Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {sitePrepSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  custom={0.05 * i}
                  className="relative bg-[#f7f5f0] border border-[#0d1b2a]/10 rounded-sm p-6 lg:p-8 hover:border-[#C9A96E] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#C9A96E]/20 text-[#0d1b2a] text-sm font-bold font-[family-name:var(--font-inter)]">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg lg:text-xl font-bold text-[#0d1b2a] leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#0d1b2a]/70 text-sm lg:text-base leading-relaxed font-[family-name:var(--font-inter)]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: BUILDING ASSEMBLY */}
        <section className="bg-[#f7f5f0] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              className="max-w-3xl mb-14 lg:mb-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#C9A96E]">
                  02
                </span>
                <div className="h-px flex-1 bg-[#C9A96E]/30" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight tracking-tight">
                Building Assembly
              </h2>
              <p className="mt-6 text-[#0d1b2a]/70 text-base lg:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                Once your foundation has cured, the steel kit arrives. Each
                component is engineered to fit precisely — a methodical assembly
                that transforms raw materials into a standing structure.
              </p>
            </motion.div>

            {/* Embedded Video */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0.1}
              className="mb-16 lg:mb-20"
            >
              <div className="relative aspect-video w-full max-w-4xl mx-auto bg-[#0d1b2a] rounded-sm overflow-hidden shadow-2xl">
                <video
                  controls
                  poster="/videos/donald_ryan_poster.jpg"
                  className="w-full h-full object-contain"
                  preload="metadata"
                >
                  <source src="/videos/donald_ryan_web.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="mt-4 text-center text-[#0d1b2a]/60 text-sm font-[family-name:var(--font-inter)]">
                30-second assembly animation — see how the structure comes
                together
              </p>
            </motion.div>

            {/* Assembly Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {assemblySteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  custom={0.05 * i}
                  className="relative bg-white border border-[#0d1b2a]/10 rounded-sm p-6 lg:p-8 hover:border-[#C9A96E] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#C9A96E]/20 text-[#0d1b2a] text-sm font-bold font-[family-name:var(--font-inter)]">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg lg:text-xl font-bold text-[#0d1b2a] leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#0d1b2a]/70 text-sm lg:text-base leading-relaxed font-[family-name:var(--font-inter)]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
                Ready to Start Your Build?
              </h2>
              <p className="mt-6 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
                From permits to final walkthrough, we'll guide you through every
                phase. Let's talk about your project.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#quote"
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
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Download Guide CTA */}
        <section className="bg-[#f7f5f0] py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <div className="bg-white border border-[#0d1b2a]/10 rounded-sm shadow-lg p-8 lg:p-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A96E]/20 mb-6">
                  <svg className="w-7 h-7 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-[#0d1b2a] mb-4">
                  Want the Complete Build Process Checklist?
                </h3>
                <p className="text-[#0d1b2a]/70 text-lg mb-6 max-w-2xl mx-auto">
                  Download our free buyer's guide with detailed assembly instructions, foundation specs, and DIY best practices.
                </p>
                <a
                  href="/download"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Download Free Guide
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
    </>
  );
}
