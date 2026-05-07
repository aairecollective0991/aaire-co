import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Why Open Web Truss | AAIRE Co. Metal Buildings",
  description: "Discover why open web truss design is superior to traditional metal building systems. Stronger, more versatile, and easier to build.",
};

export default function WhyWebTruss() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0d1b2a] via-[#0d1b2a] to-[#1b2a3a] py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                Building Technology
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Why Open Web Truss Design is Superior
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Not all metal buildings are created equal. Open web truss construction delivers unmatched strength,
              versatility, and value that traditional systems simply can't match.
            </p>
            <Link
              href="/configure"
              className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#0d1b2a] px-8 py-4 rounded-sm font-semibold hover:bg-[#b8965d] transition-colors"
            >
              Design Your Building
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Open Web Truss */}
      <section className="py-20 lg:py-28 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                  The Technology
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-[#0d1b2a] mb-6">
                What is Open Web Truss Construction?
              </h2>
              <p className="text-[#0d1b2a]/70 text-lg leading-relaxed mb-6">
                Open web truss construction uses a triangular steel framework where top chords, bottom chords,
                web members, diagonal members, and vertical members work together to create the strongest truss
                system available. This engineered design distributes loads efficiently across the entire structure.
              </p>
              <p className="text-[#0d1b2a]/70 text-lg leading-relaxed mb-6">
                Unlike traditional bolt-together systems or rigid frame designs, open web trusses optimize material
                distribution — delivering maximum strength with less steel, resulting in a lighter, stronger, and
                more cost-effective building.
              </p>
              <div className="bg-white border-l-4 border-[#C9A96E] p-6 rounded-sm">
                <p className="text-[#0d1b2a] font-semibold mb-2">Industry-Leading Warranty</p>
                <p className="text-[#0d1b2a]/70">
                  Every Worldwide Steel open web truss building comes with a 50-year structural warranty on
                  materials and workmanship — backed by 100% American steel manufactured in AISC-MB certified facilities.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/agriculture-barn-1.jpg"
                alt="Open web truss construction detail"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                The Advantages
              </span>
              <div className="h-px w-10 bg-[#C9A96E]" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-[#0d1b2a]">
              Why Open Web Truss Wins
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="bg-white border border-[#0d1b2a]/10 p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-3">
                Superior Strength
              </h3>
              <p className="text-[#0d1b2a]/70 leading-relaxed">
                Triangular design distributes loads efficiently across the structure. Handles clear spans up to 225 feet
                and withstands heavy snow, wind, and ice loads that other systems can't match.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white border border-[#0d1b2a]/10 p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-3">
                Better Value
              </h3>
              <p className="text-[#0d1b2a]/70 leading-relaxed">
                Uses 30-40% less steel than rigid frame systems while delivering equal or greater strength. Lower material
                costs mean more building for your budget without sacrificing quality.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white border border-[#0d1b2a]/10 p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-3">
                Easier Installation
              </h3>
              <p className="text-[#0d1b2a]/70 leading-relaxed">
                No heavy equipment needed to set trusses. Pre-punched, pre-welded components bolt together easily.
                Reduces construction time by up to 33% compared to traditional methods.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white border border-[#0d1b2a]/10 p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-3">
                Maximum Flexibility
              </h3>
              <p className="text-[#0d1b2a]/70 leading-relaxed">
                Open web design creates space for HVAC, electrical, plumbing, and sprinkler systems to run through the
                structure. Easier to customize and modify than closed systems.
              </p>
            </div>

            {/* Advantage 5 */}
            <div className="bg-white border border-[#0d1b2a]/10 p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-3">
                Code Compliant
              </h3>
              <p className="text-[#0d1b2a]/70 leading-relaxed">
                Engineered to meet local wind and snow building codes. Designed using MBS software with certified
                stamped plans for permitting. Built to last in North Carolina's climate.
              </p>
            </div>

            {/* Advantage 6 */}
            <div className="bg-white border border-[#0d1b2a]/10 p-8 rounded-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-3">
                Premium Materials
              </h3>
              <p className="text-[#0d1b2a]/70 leading-relaxed">
                100% American steel with 80,000 PSI tensile strength. Double submersion rust-proof coating.
                Class 4 impact rating for severe weather. Quality you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-28 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                The Comparison
              </span>
              <div className="h-px w-10 bg-[#C9A96E]" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-[#0d1b2a] mb-4">
              Open Web Truss vs. Traditional Systems
            </h2>
            <p className="text-[#0d1b2a]/70 text-lg max-w-3xl mx-auto">
              See how open web truss construction stacks up against bolt-together systems like VersaTube
              and traditional rigid frame buildings.
            </p>
          </div>

          <div className="bg-white rounded-sm shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0d1b2a] text-white">
                    <th className="text-left py-4 px-6 font-semibold">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold bg-[#C9A96E] text-[#0d1b2a]">
                      Open Web Truss
                      <div className="text-xs font-normal mt-1">(Worldwide Steel)</div>
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      Bolt-Together
                      <div className="text-xs font-normal mt-1">(VersaTube)</div>
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      Rigid Frame
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0d1b2a]/10">
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Clear Span Capability</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">Up to 225 ft</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Limited to ~40 ft</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Up to 300 ft</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Heavy Snow Loads (70+ PSF)</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">✓ Engineered</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Limited</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">✓ Yes</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Installation Equipment</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">No crane needed</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">No crane needed</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Crane required</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Material Efficiency</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">Optimized design</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Standard</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Heavy steel</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">HVAC/Electrical Integration</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">✓ Built-in space</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Limited</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Surface mount</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Wall Hanging Capability</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">✓ Structural</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">✗ Not recommended</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">✓ Yes</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Structural Warranty</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">50 years</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Limited</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">Varies</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#0d1b2a]">Cost Efficiency</td>
                    <td className="py-4 px-6 text-center bg-[#C9A96E]/5">
                      <span className="text-[#C9A96E] font-semibold">$$</span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">$</td>
                    <td className="py-4 px-6 text-center text-[#0d1b2a]/60">$$$</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-white border-l-4 border-[#C9A96E] p-6 rounded-sm">
            <p className="text-[#0d1b2a] font-semibold mb-2">Why This Matters for North Carolina</p>
            <p className="text-[#0d1b2a]/70">
              North Carolina experiences diverse weather — from coastal hurricanes to mountain snow loads. Open web truss
              buildings are engineered to meet local codes and handle our climate's demands. VersaTube-style systems often
              require customization for our snow loads, and many homeowners discover too late their building isn't rated
              for local conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
                The Specs
              </span>
              <div className="h-px w-10 bg-[#C9A96E]" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-[#0d1b2a]">
              Built to Last
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b2a3a] p-8 rounded-sm text-white">
              <div className="text-4xl font-bold text-[#C9A96E] mb-2">80,000</div>
              <div className="text-sm uppercase tracking-wider text-white/60">PSI Tensile Strength</div>
              <p className="mt-3 text-sm text-white/80">Premium American steel exceeds industry standards</p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b2a3a] p-8 rounded-sm text-white">
              <div className="text-4xl font-bold text-[#C9A96E] mb-2">225 ft</div>
              <div className="text-sm uppercase tracking-wider text-white/60">Maximum Clear Span</div>
              <p className="mt-3 text-sm text-white/80">Wide-open spaces for any application</p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b2a3a] p-8 rounded-sm text-white">
              <div className="text-4xl font-bold text-[#C9A96E] mb-2">Class 4</div>
              <div className="text-sm uppercase tracking-wider text-white/60">Impact Rating</div>
              <p className="mt-3 text-sm text-white/80">Severe weather and hail resistance</p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b2a3a] p-8 rounded-sm text-white">
              <div className="text-4xl font-bold text-[#C9A96E] mb-2">50 yr</div>
              <div className="text-sm uppercase tracking-wider text-white/60">Warranty</div>
              <p className="mt-3 text-sm text-white/80">Structural materials & workmanship guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0d1b2a] via-[#0d1b2a] to-[#1b2a3a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build with Superior Technology?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Experience the difference of open web truss construction. Get a custom quote for your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/configure"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A96E] text-[#0d1b2a] px-8 py-4 rounded-sm font-semibold hover:bg-[#b8965d] transition-colors"
            >
              Design Your Building
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/build-site-check"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Site Evaluation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
