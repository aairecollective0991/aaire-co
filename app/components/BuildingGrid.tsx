import Image from "next/image";

const buildings = [
  {
    id: "barndominiums",
    name: "Barndominiums",
    description:
      "Combination living quarters and functional workspace in one premium steel structure. Fully customizable floor plans for the modern rural lifestyle.",
    price: "Starting from $45,000",
    image: "/images/gallery/barndominium-southern-b-1.jpeg",
    imageAlt: "Barndominium steel building with living quarters",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    accentGradient: "from-[#C9A96E]/20 to-transparent",
  },
  {
    id: "garages",
    name: "Garages & Workshops",
    description:
      "Heavy-gauge steel garages and workshops built to last. Custom sizing for any vehicle fleet, equipment, or hobby workspace.",
    price: "Starting from $12,000",
    image: "/images/gallery/garage-workshop-carolina-1.jpg",
    imageAlt: "Custom steel garage and workshop building",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    accentGradient: "from-[#C9A96E]/15 to-transparent",
  },
  {
    id: "rv-covers",
    name: "RV Covers & Carports",
    description:
      "Protect your investment from the elements. Open or enclosed designs with custom heights for any motorhome, trailer, or boat.",
    price: "Starting from $8,000",
    image: "/images/gallery/rv-render-1.jpg",
    imageAlt: "Steel RV cover and carport structure",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    accentGradient: "from-[#C9A96E]/20 to-transparent",
  },
  {
    id: "agricultural",
    name: "Agricultural & Commercial",
    description:
      "Heavy-duty structures for farming, livestock, and commercial applications. Built to withstand the demands of real working operations.",
    price: "Get custom quote",
    priceIsCustom: true,
    image: "/images/gallery/agriculture-barn-1.jpg",
    imageAlt: "Large agricultural steel barn building",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accentGradient: "from-[#C9A96E]/10 to-transparent",
  },
];

export default function BuildingGrid() {
  return (
    <section
      id="buildings"
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-sm font-semibold tracking-widest uppercase">
              What We Build
            </span>
            <div className="h-px w-10 bg-[#C9A96E]" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1b2a] leading-tight">
            Steel structures for every purpose
          </h2>
          <p className="mt-4 text-[#0d1b2a]/60 text-lg max-w-2xl mx-auto">
            Factory-direct pricing means you get more building for your budget — no middlemen, no markup.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildings.map((building) => (
            <div
              key={building.id}
              id={`building-card-${building.id}`}
              className="group relative flex flex-col overflow-hidden rounded-sm cursor-pointer hover:-translate-y-1.5 transition-transform duration-300"
            >
              {/* Card image area — real photo with overlay */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={building.image}
                  alt={building.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0d1b2a]/50 group-hover:bg-[#0d1b2a]/30 transition-colors duration-500" />
                {/* Accent radial glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${building.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10 text-[#C9A96E] group-hover:scale-110 transition-transform duration-300">
                    {building.icon}
                  </div>
                </div>
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#C9A96E]/40 group-hover:border-[#C9A96E]/80 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#C9A96E]/40 group-hover:border-[#C9A96E]/80 transition-colors duration-300" />
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 bg-white border border-[#0d1b2a]/8 border-t-0 p-5">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-2 group-hover:text-[#0d1b2a] transition-colors">
                  {building.name}
                </h3>
                <p className="text-[#0d1b2a]/60 text-sm leading-relaxed flex-1">
                  {building.description}
                </p>
                {/* Price footer */}
                <div className="mt-4 pt-4 border-t border-[#0d1b2a]/8 flex items-center justify-between">
                  <span
                    className={`text-sm font-bold ${
                      building.priceIsCustom
                        ? "text-[#0d1b2a]"
                        : "text-[#C9A96E]"
                    }`}
                  >
                    {building.price}
                  </span>
                  <svg
                    className="w-4 h-4 text-[#C9A96E] group-hover:translate-x-1 transition-transform duration-200"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
