"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Submit to Vercel Forms
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    });

    setSubmitted(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />

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
              Get In Touch
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
            Contact <span className="text-[#C9A96E]">AAIRE Co.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-[family-name:var(--font-inter)]"
          >
            Have questions about your metal building project? We're here to help.
            Send us a message and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="bg-[#f7f5f0] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="bg-white border border-[#0d1b2a]/10 rounded-sm shadow-xl p-8 lg:p-12"
            >
              <form
                onSubmit={handleSubmit}
                data-vercel-form="contact"
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-[#0d1b2a]/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-[#0d1b2a]/40"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(123) 456-7890"
                    className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-[#0d1b2a]/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="What can we help you with?"
                    className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-[#0d1b2a]/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-colors placeholder:text-[#0d1b2a]/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-md shadow-[#C9A96E]/20 hover:shadow-lg hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
                >
                  Send Message
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
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-[#C9A96E]/30 rounded-sm shadow-xl p-8 lg:p-12 text-center"
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
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d1b2a] mb-4">
                Message Sent!
              </h2>
              <p className="text-[#0d1b2a]/70 text-lg leading-relaxed mb-8 font-[family-name:var(--font-inter)]">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold transition-colors"
              >
                ← Back to Home
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-white py-16 lg:py-20 border-t border-[#0d1b2a]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a] mb-6">
            Other Ways to Reach Us
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:aairecollective@gmail.com"
                className="text-[#0d1b2a]/70 hover:text-[#C9A96E] transition-colors font-medium"
              >
                aairecollective@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
