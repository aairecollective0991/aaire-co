"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/app/lib/animations";

const trustItems = [
  "Factory Direct Pricing",
  "Serving All 50 States",
  "Response Within 2 Hours",
  "50-Year Structural Warranty",
];

export default function TrustStrip() {
  return (
    <section
      id="trust"
      className="bg-[#f7f5f0] py-6 border-y border-[#0d1b2a]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Worldwide Steel Buildings trust badge */}
          <motion.div
            id="trust-worldwide-badge"
            className="flex flex-col items-center gap-1.5 group"
            variants={fadeUp}
            custom={0}
          >
            <Image
              src="/images/logos/worldwide-logo.png"
              alt="Worldwide Steel Buildings"
              height={48}
              width={140}
              className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="text-[#0d1b2a]/50 text-xs font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
              Certified Distributor
            </span>
          </motion.div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-[#0d1b2a]/15" />

          {trustItems.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-3 group"
              id={`trust-item-${i + 1}`}
              variants={fadeUp}
              custom={0.1 + i * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A96E] flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
              <span className="text-[#0d1b2a] text-sm font-semibold tracking-wide whitespace-nowrap font-[family-name:var(--font-inter)]">
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
