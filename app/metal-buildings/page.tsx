import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SIZES, formatPrice } from "./size-data";

export const metadata: Metadata = {
  title: "Metal Building Sizes & Prices | Steel Building Kits by Size",
  description:
    "Compare popular metal building sizes and starting prices — from 24x30 garages to 100x100 industrial buildings. Factory-direct steel building kits, delivered nationwide, with a free quote from AAIRE Co.",
  alternates: { canonical: "https://aaireco.com/metal-buildings" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/metal-buildings",
    title: "Metal Building Sizes & Prices",
    description:
      "Compare popular steel building sizes and starting prices. Factory-direct kits delivered nationwide.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function MetalBuildingsHub() {
  return (
    <>
      <Script id="sizes-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Metal Buildings", item: "https://aaireco.com/metal-buildings" },
          ],
        })}
      </Script>

      {/* HERO */}
      <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
              Metal Building Sizes &amp; Prices
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Steel buildings, priced by size
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl font-[family-name:var(--font-inter)]">
            From a compact 24×30 garage to a 100×100 industrial clear-span, browse the most popular
            metal building sizes with starting kit prices. Every AAIRE Co. building is factory-direct,
            engineered to your local loads, and delivered anywhere in the USA.
          </p>
        </div>
      </section>

      {/* SIZE GRID */}
      <section className="bg-[#f7f5f0] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SIZES.map((s) => (
              <Link
                key={s.slug}
                href={`/metal-buildings/${s.slug}`}
                className="group flex flex-col bg-white border border-[#0d1b2a]/10 rounded-sm p-6 hover:border-[#C9A96E] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
                    {s.slug}
                  </span>
                  <span className="text-[#0d1b2a]/50 text-sm font-[family-name:var(--font-inter)]">
                    {s.sqft.toLocaleString()} sq ft
                  </span>
                </div>
                <p className="mt-3 text-[#0d1b2a]/60 text-sm leading-relaxed flex-1 font-[family-name:var(--font-inter)]">
                  {s.tagline}
                </p>
                <div className="mt-4 pt-4 border-t border-[#0d1b2a]/8 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#C9A96E]">
                    From {formatPrice(s.startingFrom)}
                  </span>
                  <svg
                    className="w-4 h-4 text-[#C9A96E] group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-[#0d1b2a]/60 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            Starting prices are for a base open-web-truss building kit, delivered — they exclude
            foundation, assembly, insulation, and finishing. A finished barndominium of the same size
            runs significantly more. Need a different size? We build fully custom — just ask.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0d1b2a] py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            Not sure which size you need?
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Tell us how you&apos;ll use your building and we&apos;ll recommend a size and send a free,
            permit-ready quote — no obligation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:-translate-y-0.5"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="/guides/what-size-metal-building"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/5 text-base font-semibold rounded-sm transition-all duration-200"
            >
              What size do I need?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
