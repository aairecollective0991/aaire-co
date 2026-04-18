"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Full-bleed hero background image */}
      <Image
        src="/images/hero/hero2.jpg"
        alt="Steel building in the Carolina landscape"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />

      {/* Dark navy overlay at 60% opacity */}
      <div className="absolute inset-0 bg-[#0d1b2a]/60" />

      {/* Background texture pattern on top of overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(201,169,110,0.3) 40px,
              rgba(201,169,110,0.3) 41px
            ), repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(201,169,110,0.3) 40px,
              rgba(201,169,110,0.3) 41px
            )`,
          }}
        />
      </div>

      {/* Gradient accent in corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center gap-3"
            >
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                Certified Worldwide Steel Buildings Distributor
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Built for the land.{" "}
              <span className="text-[#C9A96E]">
                Designed for how you live on it.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-lg font-[family-name:var(--font-inter)]"
            >
              Factory-direct steel buildings delivered anywhere in the USA — from custom barndominiums to heavy-duty
              agricultural structures.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#quote"
                id="hero-quote-button"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Get Your Free Quote
              </a>
              <a
                href="#gallery"
                id="hero-gallery-button"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 hover:border-[#C9A96E] text-white hover:text-[#C9A96E] text-base font-semibold rounded-sm transition-all duration-200 backdrop-blur-sm"
              >
                View Gallery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>

          </div>

          {/* Right: Warranty Badge + Stats */}
          <div className="flex flex-col gap-6 items-start lg:items-end">
            {/* 50 Year Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="relative"
            >
              <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-full border-2 border-[#C9A96E] flex flex-col items-center justify-center text-center p-6 bg-[#0d1b2a] shadow-[0_0_60px_rgba(201,169,110,0.15)]">
                <span className="text-5xl lg:text-6xl font-bold text-[#C9A96E] font-[family-name:var(--font-playfair)] leading-none">
                  50
                </span>
                <span className="text-white text-sm font-semibold uppercase tracking-wider mt-1">
                  Year
                </span>
                <span className="text-white/70 text-xs uppercase tracking-widest">
                  Structural Warranty
                </span>
              </div>
              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[#C9A96E]/20"
                style={{ borderStyle: "dashed" }}
              />
            </motion.div>

            {/* Stats cards */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="grid grid-cols-2 gap-4 w-full max-w-sm"
            >
              {[
                { value: "2hr", label: "Response Time" },
                { value: "Factory", label: "Direct Pricing" },
                { value: "50", label: "States Served" },
                { value: "100%", label: "Custom Builds" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-sm p-4 hover:border-[#C9A96E]/40 transition-colors duration-300"
                >
                  <div className="text-2xl font-bold text-[#C9A96E] font-[family-name:var(--font-playfair)]">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-[#C9A96E]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
