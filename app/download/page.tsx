"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function DownloadPage() {
  const [submitted, setSubmitted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToMarketing) {
      alert('Please agree to receive marketing emails to download the guide.');
      return;
    }

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    // Send via API route
    const response = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSubmitted(true);
      // Trigger download after short delay
      setTimeout(() => {
        setDownloading(true);
        // Open PDF generation API
        window.open('/api/generate-pdf', '_blank');
      }, 1000);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {!submitted ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 lg:p-10">
                  <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-white mb-4">
                    Download Your Free Guide
                  </h1>
                  <p className="text-white/70 text-lg mb-8">
                    Enter your email to instantly download the Complete Metal Building Buyer's Guide.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold tracking-widest uppercase text-white/70 mb-2 font-[family-name:var(--font-inter)]"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full h-12 px-4 rounded-sm border border-white/20 bg-white/10 text-white font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-white/40"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold tracking-widest uppercase text-white/70 mb-2 font-[family-name:var(--font-inter)]"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        className="w-full h-12 px-4 rounded-sm border border-white/20 bg-white/10 text-white font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-white/40"
                      />
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="marketing-consent"
                        checked={agreedToMarketing}
                        onChange={(e) => setAgreedToMarketing(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/10 text-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 focus:ring-offset-0 cursor-pointer"
                      />
                      <label
                        htmlFor="marketing-consent"
                        className="text-white/70 text-sm leading-relaxed cursor-pointer font-[family-name:var(--font-inter)]"
                      >
                        I agree to receive marketing emails from AAIRE Co. in exchange for this free guide. You can unsubscribe anytime.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-md shadow-[#C9A96E]/20 hover:shadow-lg hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
                    >
                      Download Free Guide
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
                    </button>

                    <p className="text-white/50 text-xs text-center mt-4">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 backdrop-blur-sm border border-[#C9A96E]/30 rounded-sm p-8 lg:p-10 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A96E]/20 mb-6">
                    <svg
                      className="w-8 h-8 text-[#C9A96E]"
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
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white mb-4">
                    {downloading ? "Download Starting..." : "Success!"}
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    {downloading
                      ? "Your guide is downloading now. Check your downloads folder."
                      : "Preparing your download..."
                    }
                  </p>
                  <a
                    href="/api/generate-pdf"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold transition-colors"
                  >
                    Click here if download doesn't start →
                  </a>
                </motion.div>
              )}
            </motion.div>

            {/* Right: Benefits */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                  Free Resource
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                The Complete Metal Building Buyer's Guide
              </h2>

              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Everything you need to know before purchasing and building your metal structure. Based on industry best practices and real-world experience.
              </p>

              <div className="space-y-4">
                {[
                  "Pre-purchase checklist with all critical considerations",
                  "Complete site preparation & foundation guide",
                  "DIY assembly best practices from industry experts",
                  "Common mistakes to avoid (save thousands)",
                  "Permit & zoning requirements explained",
                  "Budget planning & realistic cost breakdowns",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#C9A96E] flex-shrink-0 mt-0.5"
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
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-[#f7f5f0] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a] mb-4">
            Trusted by Metal Building Buyers Nationwide
          </h3>
          <p className="text-[#0d1b2a]/70 text-lg max-w-2xl mx-auto">
            AAIRE Co. is a certified Worldwide Steel Buildings distributor serving all 50 states.
            We've helped hundreds of customers successfully plan and build their metal structures.
          </p>
        </div>
      </section>
    </>
  );
}
