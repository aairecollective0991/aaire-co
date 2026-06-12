"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp } from "@/app/lib/animations";

export default function GuideDownloadCTA() {
  return (
    <section className="bg-[#0d1b2a] py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#C9A96E]/10 to-[#C9A96E]/5 border border-[#C9A96E]/20 rounded-sm p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-10 h-10 text-[#C9A96E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                  Free Resource
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-white mb-4">
                Not Ready to Buy? Get Our Free Buyer's Guide
              </h2>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                Download our complete metal building buyer's guide covering site prep, permits,
                foundations, and DIY assembly best practices.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C9A96E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Complete pre-purchase checklist</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C9A96E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Foundation & site prep guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C9A96E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Common mistakes to avoid</span>
                </li>
              </ul>
            </motion.div>

            {/* Right: CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 w-full">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-4">
                  Download Free Guide
                </h3>
                <p className="text-white/70 mb-6">
                  Enter your email for instant access
                </p>
                <Link
                  href="/download"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-lg font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5 w-full"
                >
                  Download Now
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </Link>
                <p className="text-white/50 text-xs mt-4">
                  Free • No credit card required
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
