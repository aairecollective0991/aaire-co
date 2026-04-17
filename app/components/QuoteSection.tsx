"use client";

import { useEffect } from "react";

const trustCards = [
  {
    id: "trust-response",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Response in 2 Hours",
    desc: "Submit your info and we'll reach out the same day — usually within 2 hours.",
  },
  {
    id: "trust-warranty",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "50-Year Warranty",
    desc: "Every structure backed by a 50-year structural warranty. We stand behind what we build.",
  },
  {
    id: "trust-local",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Locally Rooted",
    desc: "Based in the Lake Norman area. We know the land, the codes, and the community.",
  },
];

export default function QuoteSection() {
  useEffect(() => {
    // Load GHL embed script dynamically to comply with Next.js client boundaries
    if (document.getElementById("ghl-embed-script")) return;
    const script = document.createElement("script");
    script.id = "ghl-embed-script";
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="quote"
      className="bg-white py-20 lg:py-28 border-t border-[#0d1b2a]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Copy */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                  Get Started
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight">
                Two steps.{" "}
                <span className="text-[#0d1b2a]/50">No pressure.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  step: "01",
                  title: "Tell us what you're building",
                  desc: "Share your idea, land size, and intended use. No blueprints required — just a vision.",
                },
                {
                  step: "02",
                  title: "We deliver a no-obligation quote",
                  desc: "Within 2 hours, you'll have a real price — factory-direct, no inflated middleman costs.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-[#0d1b2a] flex items-center justify-center group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <span className="text-[#C9A96E] group-hover:text-[#0d1b2a] text-sm font-bold font-[family-name:var(--font-playfair)] transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0d1b2a] mb-1">{item.title}</h3>
                    <p className="text-[#0d1b2a]/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust cards */}
            <div className="flex flex-col gap-3 mt-2">
              {trustCards.map((card) => (
                <div
                  key={card.id}
                  id={card.id}
                  className="flex items-start gap-4 p-4 rounded-sm bg-[#f7f5f0] border border-[#0d1b2a]/8 hover:border-[#C9A96E]/40 transition-colors duration-300 group"
                >
                  <div className="text-[#C9A96E] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    {card.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0d1b2a] text-sm mb-0.5">
                      {card.title}
                    </div>
                    <div className="text-[#0d1b2a]/55 text-sm leading-relaxed">
                      {card.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: GHL Survey Iframe */}
          <div className="relative">
            <div className="rounded-sm overflow-hidden border border-[#0d1b2a]/10 shadow-xl shadow-[#0d1b2a]/5">
              <div className="bg-[#0d1b2a] px-5 py-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                <span className="text-white/80 text-sm font-medium">
                  Free Quote Request
                </span>
              </div>
              <iframe
                src="https://api.leadconnectorhq.com/widget/survey/BDwEFta1ikJd7NU8wGB9"
                style={{ border: "none", width: "100%", minHeight: "600px" }}
                scrolling="no"
                id="BDwEFta1ikJd7NU8wGB9"
                title="Free Quote Survey"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
