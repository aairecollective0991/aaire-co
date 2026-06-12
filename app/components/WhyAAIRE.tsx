"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/app/lib/animations";

const supportPhases = [
  {
    title: "Design & Planning",
    description: "Expert guidance on building size, style, and specifications tailored to your needs and budget.",
  },
  {
    title: "Permits & Compliance",
    description: "Navigate local building codes, zoning requirements, and permit processes with confidence.",
  },
  {
    title: "Order of Operations",
    description: "Clear roadmap from site preparation through foundation, ensuring every step is done right.",
  },
  {
    title: "Through Delivery",
    description: "Ongoing support coordinating logistics, answering questions, and keeping your project on track.",
  },
  {
    title: "To Completion",
    description: "Post-delivery guidance on assembly, finishing touches, and achieving a functional finished project.",
  },
];

export default function WhyAAIRE() {
  return (
    <section className="bg-[#0d1b2a] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            custom={0}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Why Choose <span className="text-[#C9A96E]">AAIRE Co.</span>?
          </motion.h2>
          <motion.p
            custom={0.1}
            variants={fadeUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Anyone can sell you a metal building. We guide you through every step of bringing your project to life—from the first design question to the final bolt.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {supportPhases.map((phase, index) => (
            <motion.div
              key={phase.title}
              custom={0.2 + index * 0.1}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#C9A96E]/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A96E] text-[#0d1b2a] font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#C9A96E]">
                    {phase.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            custom={0.7}
            variants={fadeUp}
            className="bg-[#C9A96E] text-[#0d1b2a] rounded-lg p-6 flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Your Partner, Not Just a Supplier</h3>
            <p className="text-lg leading-relaxed">
              We're with you from decision to delivery—and beyond.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.p
            custom={0.8}
            variants={fadeUp}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            As a certified Worldwide Steel Buildings distributor, we combine industry-leading products with personalized expertise—giving you the confidence to build right the first time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
