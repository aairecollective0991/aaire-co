"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type Category =
  | "Barndominiums"
  | "Garages & Workshops"
  | "Agricultural"
  | "Special Use";

type GalleryItem = {
  src: string;
  alt: string;
  category: Category;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const viewportOnce = { once: true, amount: 0.2 } as const;

const FILTERS: ("All" | Category)[] = [
  "All",
  "Barndominiums",
  "Garages & Workshops",
  "Agricultural",
  "Special Use",
];

const ITEMS: GalleryItem[] = [
  // Barndominiums — files on disk use .jpeg
  { src: "/images/gallery/barndominium-southern-b-1.jpeg", alt: "Southern barndominium exterior", category: "Barndominiums" },
  { src: "/images/gallery/barndominium-southern-b-2.jpeg", alt: "Southern barndominium front view", category: "Barndominiums" },
  { src: "/images/gallery/barndominium-southern-b-3.jpeg", alt: "Southern barndominium side elevation", category: "Barndominiums" },
  { src: "/images/gallery/barndominium-southern-b-4.jpeg", alt: "Southern barndominium porch detail", category: "Barndominiums" },
  { src: "/images/gallery/barndominium-southern-b-5.jpeg", alt: "Southern barndominium rear view", category: "Barndominiums" },
  { src: "/images/gallery/barndominium-southern-b-6.jpeg", alt: "Southern barndominium at dusk", category: "Barndominiums" },
  { src: "/images/gallery/barndominium-southern-b-7.jpeg", alt: "Southern barndominium landscape", category: "Barndominiums" },

  // Garages & Workshops — parkwood files are .png
  { src: "/images/gallery/garage-gambrel-1.jpg", alt: "Gambrel-roof garage exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-gambrel-2.jpg", alt: "Gambrel-roof garage side view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-gambrel-3.jpg", alt: "Gambrel-roof garage rear", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-gambrel-4.jpg", alt: "Gambrel-roof garage detail", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-parkwood-1.png", alt: "Parkwood garage exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-parkwood-2.png", alt: "Parkwood garage angled view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-parkwood-3.png", alt: "Parkwood garage side elevation", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-parkwood-4.png", alt: "Parkwood garage with drive", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-parkwood-5.png", alt: "Parkwood garage landscape", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-water-1.jpg", alt: "Lakefront garage exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-water-2.jpg", alt: "Lakefront garage angled view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-water-3.jpg", alt: "Lakefront garage dock side", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-water-4.jpg", alt: "Lakefront garage landscape", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-backyard-1.jpg", alt: "Backyard workshop exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-backyard-2.jpg", alt: "Backyard workshop side view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-backyard-3.jpg", alt: "Backyard workshop detail", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-carolina-1.jpg", alt: "Carolina workshop exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-carolina-2.jpg", alt: "Carolina workshop angled view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-carolina-3.jpg", alt: "Carolina workshop side", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-carolina-4.jpg", alt: "Carolina workshop landscape", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-hickory-1.jpg", alt: "Hickory workshop exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-hickory-2.jpg", alt: "Hickory workshop angled view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-hickory-3.jpg", alt: "Hickory workshop side", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-hickory-4.jpg", alt: "Hickory workshop landscape", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-lanthrop-1.jpg", alt: "Lanthrop workshop exterior", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-lanthrop-2.jpg", alt: "Lanthrop workshop angled view", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-lanthrop-3.jpg", alt: "Lanthrop workshop side", category: "Garages & Workshops" },
  { src: "/images/gallery/garage-workshop-lanthrop-4.jpg", alt: "Lanthrop workshop landscape", category: "Garages & Workshops" },

  // Agricultural
  { src: "/images/gallery/agriculture-barn-1.jpg", alt: "Agricultural barn exterior", category: "Agricultural" },
  { src: "/images/gallery/agriculture-barn-2.jpg", alt: "Agricultural barn side", category: "Agricultural" },
  { src: "/images/gallery/agriculture-barn-3.jpg", alt: "Agricultural barn angled view", category: "Agricultural" },
  { src: "/images/gallery/agriculture-barn-4.jpg", alt: "Agricultural barn landscape", category: "Agricultural" },
  { src: "/images/gallery/arena-9000-1.jpg", alt: "9,000 sq ft riding arena", category: "Agricultural" },

  // Special Use
  { src: "/images/gallery/pool1.jpg", alt: "Pool enclosure structure", category: "Special Use" },
  { src: "/images/gallery/venue.jpg", alt: "Event venue build", category: "Special Use" },
  { src: "/images/gallery/rv-render-1.jpg", alt: "RV cover rendering", category: "Special Use" },
  { src: "/images/gallery/01-2.jpg", alt: "Custom special-use structure", category: "Special Use" },
  { src: "/images/gallery/01-5.jpg", alt: "Custom special-use structure", category: "Special Use" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");

  const visibleItems = useMemo(
    () =>
      activeFilter === "All"
        ? ITEMS
        : ITEMS.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  return (
    <>
      <Nav />
      <main>
        {/* 1. PAGE HERO */}
        <section className="relative bg-[#0d1b2a] overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,169,110,0.3) 40px, rgba(201,169,110,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,169,110,0.3) 40px, rgba(201,169,110,0.3) 41px)`,
              }}
            />
          </div>

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
                Our Work
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
              Built Across the{" "}
              <span className="text-[#C9A96E]">Carolinas.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
            >
              Every structure in our gallery is a real completed project.
              Browse by category to find something close to your vision.
            </motion.p>
          </div>
        </section>

        {/* 2. FILTERED GRID */}
        <section className="bg-[#f7f5f0] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 lg:mb-16"
              role="tablist"
              aria-label="Gallery filters"
            >
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 sm:px-5 py-2.5 text-sm font-semibold tracking-wide uppercase rounded-sm border transition-all duration-200 font-[family-name:var(--font-inter)] ${
                      isActive
                        ? "bg-[#0d1b2a] border-[#0d1b2a] text-[#C9A96E] shadow-md"
                        : "bg-white border-[#0d1b2a]/15 text-[#0d1b2a]/75 hover:border-[#C9A96E] hover:text-[#0d1b2a]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </motion.div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item) => (
                  <motion.figure
                    key={item.src}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.92,
                      transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
                    }}
                    className="group relative aspect-square overflow-hidden rounded-sm bg-[#0d1b2a]/5 border border-transparent hover:border-[#C9A96E] transition-[border-color,transform,box-shadow] duration-300 hover:shadow-xl hover:shadow-[#0d1b2a]/15 hover:-translate-y-0.5"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d1b2a]/80 via-[#0d1b2a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <figcaption className="text-white text-xs sm:text-sm font-medium tracking-wide uppercase font-[family-name:var(--font-inter)]">
                        {item.category}
                      </figcaption>
                    </div>
                  </motion.figure>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleItems.length === 0 && (
              <p className="text-center text-[#0d1b2a]/60 py-16 font-[family-name:var(--font-inter)]">
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* 3. CTA */}
        <section className="relative bg-[#0d1b2a] py-20 lg:py-28 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={0}
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Don&apos;t see exactly what you need?
              </h2>
              <p className="mt-6 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
                Every build is custom. Get a free quote and we&apos;ll design
                something around your vision.
              </p>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/#quote"
                  id="gallery-cta-quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-base font-bold rounded-sm transition-all duration-200 shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
                >
                  Get Your Free Quote
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
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
