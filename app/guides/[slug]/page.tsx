import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { allGuideParams, getGuide, otherGuides } from "../guides-data";
import { getSize, formatPrice } from "../../metal-buildings/size-data";

type Params = { slug: string };

export function generateStaticParams() {
  return allGuideParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `https://aaireco.com/guides/${g.slug}`;
  return {
    title: g.metaTitle,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: g.title,
      description: g.description,
      siteName: "AAIRE Co. Metal Buildings",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const url = `https://aaireco.com/guides/${g.slug}`;
  const related = (g.relatedSizes ?? [])
    .map((s) => getSize(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const moreGuides = otherGuides(g.slug).slice(0, 3);

  return (
    <>
      <Script id="guide-article-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          datePublished: g.updated,
          dateModified: g.updated,
          author: { "@type": "Organization", name: "AAIRE Co." },
          publisher: {
            "@type": "Organization",
            name: "AAIRE Co. Metal Buildings",
            logo: {
              "@type": "ImageObject",
              url: "https://aaireco.com/images/logos/aaire-logo-white.jpg",
            },
          },
          mainEntityOfPage: url,
        })}
      </Script>
      <Script id="guide-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Guides", item: "https://aaireco.com/guides" },
            { "@type": "ListItem", position: 2, name: g.title, item: url },
          ],
        })}
      </Script>
      {g.faqs && g.faqs.length > 0 && (
        <Script id="guide-faq-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: g.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </Script>
      )}

      {/* HERO */}
      <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-white/50 text-sm mb-6 font-[family-name:var(--font-inter)]">
            <Link href="/guides" className="hover:text-[#C9A96E] transition-colors">
              Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{g.metaTitle}</span>
          </nav>
          <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">
            {g.readMinutes} min read
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
            {g.title}
          </h1>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {g.sections.map((section, i) => (
            <div key={i} className={i === 0 ? "" : "mt-10"}>
              {section.heading && (
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a] mb-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="text-[#0d1b2a]/80 text-base leading-relaxed mb-4 font-[family-name:var(--font-inter)]"
                >
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 mt-2">
                  {section.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[#0d1b2a]/80 text-base leading-relaxed font-[family-name:var(--font-inter)]"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* FAQ */}
          {g.faqs && g.faqs.length > 0 && (
            <div className="mt-12 pt-10 border-t border-[#0d1b2a]/10">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d1b2a] mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {g.faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-[#0d1b2a] text-base font-[family-name:var(--font-inter)]">
                      {f.q}
                    </h3>
                    <p className="mt-2 text-[#0d1b2a]/75 text-base leading-relaxed font-[family-name:var(--font-inter)]">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related sizes */}
          {related.length > 0 && (
            <div className="mt-12 pt-10 border-t border-[#0d1b2a]/10">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-4 font-[family-name:var(--font-inter)]">
                Related building sizes
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/metal-buildings/${s.slug}`}
                    className="group flex items-center justify-between bg-[#f7f5f0] border border-[#0d1b2a]/10 rounded-sm px-4 py-3 hover:border-[#C9A96E] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a]">
                      {s.slug}
                    </span>
                    <span className="text-[#C9A96E] text-sm font-semibold">
                      from {formatPrice(s.startingFrom)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* LEAD CTA */}
      <section className="relative bg-[#0d1b2a] py-16 lg:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-white leading-[1.1] tracking-tight">
            Get a free, permit-ready quote
          </h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Engineered to your project and your county&apos;s wind and snow loads — no obligation.
          </p>
          <div className="mt-8">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:-translate-y-0.5"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* MORE GUIDES */}
      <section className="bg-white py-12 lg:py-16 border-t border-[#0d1b2a]/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-4 font-[family-name:var(--font-inter)]">
            More guides
          </h2>
          <div className="flex flex-col gap-3">
            {moreGuides.map((mg) => (
              <Link
                key={mg.slug}
                href={`/guides/${mg.slug}`}
                className="group flex items-center justify-between gap-4 border border-[#0d1b2a]/10 rounded-sm px-4 py-3 hover:border-[#C9A96E] transition-colors"
              >
                <span className="text-[#0d1b2a]/80 text-sm font-medium font-[family-name:var(--font-inter)] group-hover:text-[#0d1b2a]">
                  {mg.title}
                </span>
                <svg
                  className="w-4 h-4 text-[#C9A96E] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
