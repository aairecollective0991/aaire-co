import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  allSizeParams,
  getSize,
  otherSizes,
  formatPrice,
} from "../size-data";

type Params = { size: string };

export function generateStaticParams() {
  return allSizeParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { size } = await params;
  const info = getSize(size);
  if (!info) return {};

  const title = `${info.slug} Metal Building | Prices, Sizes & Uses`;
  const description = `${info.slug} steel building kits from ${formatPrice(
    info.startingFrom
  )}, delivered. ${info.sqft.toLocaleString()} sq ft of clear-span space. ${info.tagline} Get a free, permit-ready quote from AAIRE Co.`;
  const url = `https://aaireco.com/metal-buildings/${info.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${info.slug} Metal Building — from ${formatPrice(info.startingFrom)}`,
      description,
      siteName: "AAIRE Co. Metal Buildings",
    },
  };
}

export default async function SizePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { size } = await params;
  const info = getSize(size);
  if (!info) notFound();

  const url = `https://aaireco.com/metal-buildings/${info.slug}`;
  const siblings = otherSizes(info.slug);

  const priceQ = `How much does a ${info.slug} metal building cost?`;
  const priceA = `A base ${info.slug} open-web-truss building kit starts from ${formatPrice(
    info.startingFrom
  )}, delivered. That price covers the engineered building package — trusses, secondary framing, sheeting, fasteners, and stamped plans. Foundation, assembly, insulation, doors, windows, and any residential or barndominium finishing are additional, so a fully finished ${info.slug} can run several times the base kit price. Final cost depends on your wind and snow loads, eave height, and options.`;

  return (
    <>
      <Script id="size-product-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${info.slug} Metal Building Kit`,
          description: info.tagline,
          brand: { "@type": "Brand", name: "Worldwide Steel Buildings" },
          category: "Steel Building Kit",
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "USD",
            price: info.startingFrom,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "AAIRE Co." },
          },
        })}
      </Script>
      <Script id="size-faq-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: priceQ,
              acceptedAnswer: { "@type": "Answer", text: priceA },
            },
            {
              "@type": "Question",
              name: `How many square feet is a ${info.slug} building?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `A ${info.slug} metal building is ${info.sqft.toLocaleString()} square feet (${info.width} ft wide by ${info.length} ft long) of column-free, clear-span space.`,
              },
            },
            {
              "@type": "Question",
              name: `What can you use a ${info.slug} metal building for?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${info.slug} steel buildings are commonly used as ${info.popularFor.join(", ").toLowerCase()}. ${info.whatFits[0]}.`,
              },
            },
          ],
        })}
      </Script>
      <Script id="size-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Metal Buildings", item: "https://aaireco.com/metal-buildings" },
            { "@type": "ListItem", position: 2, name: `${info.slug} Metal Building`, item: url },
          ],
        })}
      </Script>

      {/* HERO */}
      <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-white/50 text-sm mb-6 font-[family-name:var(--font-inter)]">
            <Link href="/metal-buildings" className="hover:text-[#C9A96E] transition-colors">
              Metal Buildings
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{info.slug}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
              {info.sqft.toLocaleString()} sq ft · Clear Span
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {info.slug} Metal Building
          </h1>

          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl font-[family-name:var(--font-inter)]">
            {info.intro}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:-translate-y-0.5"
            >
              Get a Free {info.slug} Quote
            </Link>
            <Link
              href="/configure"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/5 text-base font-semibold rounded-sm transition-all duration-200"
            >
              Design It Online
            </Link>
          </div>
        </div>
      </section>

      {/* SPEC + PRICE CARDS */}
      <section className="bg-[#f7f5f0] py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Starting price */}
            <div className="bg-[#0d1b2a] rounded-sm p-6 sm:col-span-2 lg:col-span-1">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] font-[family-name:var(--font-inter)]">
                Starting From
              </h2>
              <div className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                {formatPrice(info.startingFrom)}
              </div>
              <p className="mt-2 text-white/50 text-xs font-[family-name:var(--font-inter)]">
                Base kit, delivered — install &amp; finishing extra
              </p>
            </div>

            {/* Dimensions */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Dimensions
              </h2>
              <div className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
                {info.width}&prime; × {info.length}&prime;
              </div>
              <p className="mt-2 text-[#0d1b2a]/60 text-xs font-[family-name:var(--font-inter)]">
                Width × length
              </p>
            </div>

            {/* Square footage */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Floor Area
              </h2>
              <div className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
                {info.sqft.toLocaleString()} sq ft
              </div>
              <p className="mt-2 text-[#0d1b2a]/60 text-xs font-[family-name:var(--font-inter)]">
                Column-free clear span
              </p>
            </div>

            {/* Eave height */}
            <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 font-[family-name:var(--font-inter)]">
                Eave Height
              </h2>
              <div className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
                {info.eaveOptions}
              </div>
              <p className="mt-2 text-[#0d1b2a]/60 text-xs font-[family-name:var(--font-inter)]">
                Typical options
              </p>
            </div>
          </div>

          {/* What fits / uses */}
          <div className="mt-8 bg-white border border-[#0d1b2a]/10 rounded-sm p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a]">
              What fits in a {info.slug}?
            </h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {info.whatFits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#0d1b2a]/80 text-base font-[family-name:var(--font-inter)]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-[#0d1b2a]/8">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/50 font-[family-name:var(--font-inter)]">
                Most popular as
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {info.popularFor.map((p) => (
                  <span
                    key={p}
                    className="inline-block px-3 py-1.5 rounded-sm bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#0d1b2a]/80 text-sm font-[family-name:var(--font-inter)]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing explainer / disclaimer */}
          <div className="mt-6 relative overflow-hidden rounded-sm border border-[#C9A96E]/40 bg-[#C9A96E]/10 p-6 sm:p-8">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#C9A96E]" />
            <h2 className="text-[#0d1b2a] font-[family-name:var(--font-playfair)] text-xl font-bold">
              What&apos;s in the {formatPrice(info.startingFrom)} starting price?
            </h2>
            <p className="mt-3 text-[#0d1b2a]/85 text-base leading-relaxed font-[family-name:var(--font-inter)]">
              That figure is for a base open-web-truss building <strong>kit, delivered</strong> to your
              site — engineered trusses, secondary framing, steel sheeting, fasteners, and stamped
              engineered plans, all backed by a 50-year structural warranty. Site prep, foundation,
              assembly, insulation, doors, windows, and any residential or barndominium finishing are
              additional. A fully finished {info.slug} barndominium runs significantly more than the base
              kit. Your exact price depends on your county&apos;s wind and snow loads, eave height, and the
              options you choose — which is why every quote is custom.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0d1b2a] hover:bg-[#0d1b2a]/90 text-white text-sm font-bold rounded-sm transition-all duration-200"
              >
                Get an exact {info.slug} quote
              </Link>
              <Link
                href="/guides/metal-building-cost"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#0d1b2a]/20 text-[#0d1b2a] hover:bg-white text-sm font-semibold rounded-sm transition-all duration-200"
              >
                Read the cost guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD-CAPTURE CTA */}
      <section className="relative bg-[#0d1b2a] py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            Get your free {info.slug} steel building quote
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Every AAIRE Co. building is engineered to your local wind and snow loads with stamped
            drawings included for permitting. Tell us about your project and we&apos;ll send a free,
            no-obligation quote for your {info.slug}.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:-translate-y-0.5"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="/metal-buildings"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/5 text-base font-semibold rounded-sm transition-all duration-200"
            >
              Browse other sizes
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-12 lg:py-16 border-t border-[#0d1b2a]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-4 font-[family-name:var(--font-inter)]">
            Other popular metal building sizes
          </h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/metal-buildings/${s.slug}`}
                className="inline-block px-3 py-1.5 rounded-sm border border-[#0d1b2a]/15 text-[#0d1b2a]/80 text-sm hover:border-[#C9A96E] hover:text-[#0d1b2a] transition-colors font-[family-name:var(--font-inter)]"
              >
                {s.slug}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-[#0d1b2a]/60 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            Starting prices are for a base open-web-truss building kit, delivered, and exclude
            foundation, assembly, and finishing. AAIRE Co. is a certified Worldwide Steel Buildings
            distributor serving all 50 states. Final pricing is always confirmed with a custom,
            permit-ready quote.
          </p>
        </div>
      </section>
    </>
  );
}
