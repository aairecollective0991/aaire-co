import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { GUIDES } from "./guides-data";

export const metadata: Metadata = {
  title: "Metal Building Guides | Costs, Sizing & Planning",
  description:
    "Practical guides to buying a metal building — costs, barndominium budgets, sizing, foundations, and steel vs. pole barn. Straight answers from a certified steel building distributor.",
  alternates: { canonical: "https://aaireco.com/guides" },
  openGraph: {
    type: "website",
    url: "https://aaireco.com/guides",
    title: "Metal Building Guides",
    description:
      "Practical guides to buying a metal building — costs, sizing, foundations, and more.",
    siteName: "AAIRE Co. Metal Buildings",
  },
};

export default function GuidesHub() {
  return (
    <>
      <Script id="guides-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Guides", item: "https://aaireco.com/guides" },
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
              Buyer&apos;s Guides
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Metal building guides
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl font-[family-name:var(--font-inter)]">
            Straight answers to the questions buyers actually ask — what a metal building costs, how to
            size it, what the foundation involves, and how steel stacks up against a pole barn.
          </p>
        </div>
      </section>

      {/* GUIDE GRID */}
      <section className="bg-[#f7f5f0] py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col bg-white border border-[#0d1b2a]/10 rounded-sm p-6 sm:p-7 hover:border-[#C9A96E] hover:-translate-y-1 transition-all duration-200"
              >
                <span className="text-[#C9A96E] text-xs font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
                  {g.readMinutes} min read
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] leading-snug">
                  {g.title}
                </h2>
                <p className="mt-3 text-[#0d1b2a]/60 text-sm leading-relaxed flex-1 font-[family-name:var(--font-inter)]">
                  {g.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[#C9A96E] text-sm font-semibold">
                  Read guide
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0d1b2a] py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            Ready for real numbers?
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Get a free, no-obligation quote engineered to your project and your county&apos;s loads.
          </p>
          <div className="mt-10">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:-translate-y-0.5"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
