import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  allCountyParams,
  countiesByState,
  getCounty,
  hoaTone,
  extractPhone,
  extractEmail,
  extractDomain,
} from "../../permit-data";

type Params = { state: string; county: string };

export function generateStaticParams() {
  return allCountyParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state, county } = await params;
  const info = getCounty(state, county);
  if (!info) return {};

  const noun = info.state === "HI" ? "" : " County";
  const title = `Metal Building Permits in ${info.name}${noun}, ${info.state} | AAIRE Co.`;
  const description = `Do you need a permit for a metal building in ${info.name}${noun}, ${info.stateName}? Permit requirements, setbacks, ${info.windZone} wind load, HOA considerations, and the ${info.seat} permitting office — plus a free, permit-ready quote from AAIRE Co.`;
  const url = `https://aaireco.com/site-check/${info.state.toLowerCase()}/${info.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "AAIRE Co. Metal Buildings",
    },
  };
}

export default async function CountyPermitPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state, county } = await params;
  const info = getCounty(state, county);
  if (!info) notFound();

  const noun = info.state === "HI" ? "" : " County";
  const tone = hoaTone(info.hoaRisk);
  const phone = extractPhone(info.permitContact);
  const email = extractEmail(info.permitContact);
  const domain = extractDomain(info.permitContact);
  const contactLabel = info.permitContact.split(":")[0].trim();
  const siblings = countiesByState(info.state).filter((c) => c.slug !== info.slug);
  const url = `https://aaireco.com/site-check/${info.state.toLowerCase()}/${info.slug}`;

  return (
    <>
      <Script id="county-faq-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `Do you need a permit for a metal building in ${info.name}${noun}, ${info.state}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: info.permitNotes,
              },
            },
            {
              "@type": "Question",
              name: `What is the design wind speed for a metal building in ${info.name}${noun}, ${info.state}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `The ultimate design wind speed used for ${info.name}${noun} is ${info.windZone}. Always confirm the engineered value for your specific site.`,
              },
            },
            {
              "@type": "Question",
              name: `Who issues building permits in ${info.name}${noun}, ${info.state}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: info.permitContact,
              },
            },
          ],
        })}
      </Script>
      <Script id="county-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Build Site Checker", item: "https://aaireco.com/site-check" },
            { "@type": "ListItem", position: 2, name: info.stateName, item: `https://aaireco.com/site-check#${info.state.toLowerCase()}` },
            { "@type": "ListItem", position: 3, name: `${info.name}${noun}`, item: url },
          ],
        })}
      </Script>

      {/* HERO */}
      <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-white/50 text-sm mb-6 font-[family-name:var(--font-inter)]">
            <Link href="/site-check" className="hover:text-[#C9A96E] transition-colors">
              Build Site Checker
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{info.stateName}</span>
            <span className="mx-2">/</span>
            <span className="text-white">{info.name}{noun}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
              Permit & Site Guide
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Metal Building Permits in {info.name}{noun}, {info.state}
          </h1>

          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl font-[family-name:var(--font-inter)]">
            Planning a barndominium, steel garage, workshop, or agricultural building in{" "}
            {info.seat} or anywhere in {info.name}{noun}? Here&apos;s what to expect on permits,
            setbacks, wind and snow loads, and HOA rules — plus a free, permit-ready quote from AAIRE Co.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-[#f7f5f0] py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Permit Required */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Permit Required
              </h2>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {info.permitRequired ? "Yes — Required" : "Often Not Required"}
                </span>
              </div>
              <p className="mt-4 text-[#0d1b2a]/75 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                {info.permitNotes}
              </p>
            </div>

            {/* Wind Zone */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Wind Zone
              </h2>
              <div className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
                {info.windZone}
              </div>
              <p className="mt-2 text-[#0d1b2a]/60 text-xs italic font-[family-name:var(--font-inter)]">
                Ultimate design wind speed — verify with engineer
              </p>
            </div>

            {/* Snow Load */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Snow Load
              </h2>
              <div className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
                {info.snowLoad}
              </div>
              <p className="mt-2 text-[#0d1b2a]/60 text-xs italic font-[family-name:var(--font-inter)]">
                Ground snow load, minimum design
              </p>
            </div>

            {/* Setbacks */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 sm:col-span-2 lg:col-span-1">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Typical Setbacks
              </h2>
              <p className="mt-3 text-[#0d1b2a] text-base leading-relaxed font-[family-name:var(--font-inter)]">
                {info.setbacks}
              </p>
            </div>

            {/* HOA Risk */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                HOA Risk
              </h2>
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-semibold ${tone.chip}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                  {tone.label}
                </span>
              </div>
              <p className="mt-3 text-[#0d1b2a]/75 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                {info.hoaRisk}
              </p>
            </div>

            {/* Permit Contact */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Permit Contact
              </h2>
              <p className="mt-3 text-[#0d1b2a] text-sm font-semibold font-[family-name:var(--font-inter)]">
                {contactLabel}
              </p>
              {phone && (
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-base transition-colors"
                >
                  {phone}
                </a>
              )}
              {!phone && email && (
                <a
                  href={`mailto:${email}`}
                  className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-sm break-all transition-colors"
                >
                  {email}
                </a>
              )}
              {!phone && !email && domain && (
                <a
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#b8954f] font-semibold text-base transition-colors"
                >
                  {domain}
                </a>
              )}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-sm border border-[#C9A96E]/40 bg-[#C9A96E]/10 p-6 sm:p-8">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#C9A96E]" />
            <h2 className="text-[#0d1b2a] font-[family-name:var(--font-playfair)] text-xl font-bold">
              Pro Tip for {info.name}{noun}
            </h2>
            <p className="mt-2 text-[#0d1b2a]/85 text-base leading-relaxed font-[family-name:var(--font-inter)]">
              {info.processTip}
            </p>
          </div>

          {/* Special Notes */}
          {info.specialNotes && (
            <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-sm border border-blue-400 bg-blue-50 p-6 sm:p-8">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500" />
              <h2 className="text-blue-900 font-[family-name:var(--font-playfair)] text-xl font-bold">
                Site Notes for {info.name}{noun}
              </h2>
              <p className="mt-2 text-blue-900/85 text-base leading-relaxed font-[family-name:var(--font-inter)]">
                {info.specialNotes}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LEAD-CAPTURE CTA */}
      <section className="relative bg-[#0d1b2a] py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            Get a permit-ready quote for {info.name}{noun}
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Every AAIRE Co. steel building is engineered to your county&apos;s {info.windZone} wind
            requirements, with stamped drawings included for permitting. Tell us about your project
            and we&apos;ll send a free quote and walk you through what {info.name}{noun} needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:-translate-y-0.5"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="/site-check"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/5 text-base font-semibold rounded-sm transition-all duration-200"
            >
              Check another county
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER + INTERNAL LINKS */}
      <section className="bg-white py-12 lg:py-16 border-t border-[#0d1b2a]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#0d1b2a]/60 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            This guide provides general information based on publicly available county sources.
            Requirements change and vary by parcel, zoning district, and building use. Always verify
            current requirements directly with {info.name}{noun} before purchasing land or starting
            construction. AAIRE Co. serves customers nationwide and can help you navigate the process.
          </p>

          {siblings.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-4 font-[family-name:var(--font-inter)]">
                More {info.stateName} permit guides
              </h2>
              <div className="flex flex-wrap gap-2">
                {siblings.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/site-check/${c.state.toLowerCase()}/${c.slug}`}
                    className="inline-block px-3 py-1.5 rounded-sm border border-[#0d1b2a]/15 text-[#0d1b2a]/80 text-sm hover:border-[#C9A96E] hover:text-[#0d1b2a] transition-colors font-[family-name:var(--font-inter)]"
                  >
                    {c.name}{info.state === "HI" ? "" : " County"}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
