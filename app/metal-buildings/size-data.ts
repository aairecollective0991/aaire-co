// Size & pricing data for the AAIRE Co. metal building size pages.
// Single source of truth — consumed by the /metal-buildings hub and the
// per-size SEO pages at /metal-buildings/[size].
//
// Pricing note: `startingFrom` is the entry price for a BASE open-web-truss
// building KIT, delivered (trusses, secondary framing, sheeting, fasteners,
// and stamped engineered plans). It does NOT include foundation, assembly,
// insulation, doors, windows, or residential/barndominium finishing — a
// finished barndominium of the same footprint runs significantly more.
//
// Anchors: calibrated against real Worldwide Steel dealer quotes
// (12x20 ~$43/sqft loaded, 30x40 ~$38/sqft loaded, 40x44 residential
// flush-column ~$25-83/sqft loaded) plus 2026 market data. Base web-truss
// floors land ~$15-28/sqft depending on size.

export type BuildingSize = {
  slug: string; // e.g. "40x60"
  width: number;
  length: number;
  sqft: number;
  startingFrom: number; // base web-truss kit, delivered (USD)
  eaveOptions: string; // typical eave height range
  // One-line positioning used in hero subhead + meta description.
  tagline: string;
  // Longer intro paragraph for the page body.
  intro: string;
  // "What fits / what it's good for" bullets — the content that ranks.
  whatFits: string[];
  // Building types this size is most commonly ordered as.
  popularFor: string[];
};

// Format a price like 46900 -> "$46,900"
export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

// Rough installed/turnkey context for the disclaimer (kit + erection + slab).
// Not displayed as a headline number — used in the explanatory copy only.
export function pricePerSqft(s: BuildingSize): number {
  return Math.round(s.startingFrom / s.sqft);
}

export const SIZES: BuildingSize[] = [
  {
    slug: "24x30",
    width: 24,
    length: 30,
    sqft: 720,
    startingFrom: 19900,
    eaveOptions: "9–14 ft",
    tagline: "A compact 720 sq ft steel building — perfect for a 2-car garage or backyard workshop.",
    intro:
      "A 24x30 metal building gives you 720 square feet of clear-span space — enough for a comfortable two-car garage, a home workshop, or storage for a tractor and equipment. It is one of the most popular small steel building sizes because it fits most residential lots and rarely needs a complex foundation.",
    whatFits: [
      "2 full-size vehicles with room for storage along the walls",
      "A single-bay workshop with a workbench and tool storage",
      "A tractor, mower, and basic farm equipment",
      "A hobby garage or she-shed / man-cave conversion",
    ],
    popularFor: ["Garage / Workshop", "Storage", "Hobby space"],
  },
  {
    slug: "24x40",
    width: 24,
    length: 40,
    sqft: 960,
    startingFrom: 24900,
    eaveOptions: "9–14 ft",
    tagline: "960 sq ft of flexible steel — a deep garage, workshop, or small shop in one.",
    intro:
      "A 24x40 metal building offers 960 square feet — a deep, versatile footprint that works as a three-bay garage, a workshop with a parking bay, or a small commercial shop. The extra length over a 24x30 makes room for a vehicle lift or a dedicated work area without crowding your parking.",
    whatFits: [
      "3 vehicles, or 2 vehicles plus a full workshop",
      "A garage with a car lift and storage mezzanine",
      "A small business shop or service bay",
      "An RV plus a daily driver with a tall eave option",
    ],
    popularFor: ["Garage / Workshop", "Small commercial shop", "RV + vehicle"],
  },
  {
    slug: "30x40",
    width: 30,
    length: 40,
    sqft: 1200,
    startingFrom: 28500,
    eaveOptions: "10–16 ft",
    tagline: "The most popular metal building size — 1,200 sq ft for a garage, shop, or starter barndominium.",
    intro:
      "The 30x40 metal building is the best-selling size in the country, and for good reason: 1,200 square feet of column-free space is enough for a four-car garage, a serious workshop, a small barndominium shell, or a commercial shop. With a taller eave it easily handles a vehicle lift or RV storage.",
    whatFits: [
      "Up to 4 vehicles, or 2 vehicles plus a large workshop",
      "A barndominium shell with living quarters and a shop bay",
      "A workshop with a car lift and a loft mezzanine",
      "Light commercial, contractor, or agricultural use",
    ],
    popularFor: ["Garage / Workshop", "Barndominium", "Commercial shop"],
  },
  {
    slug: "30x50",
    width: 30,
    length: 50,
    sqft: 1500,
    startingFrom: 33900,
    eaveOptions: "10–16 ft",
    tagline: "1,500 sq ft of clear span — a roomy workshop, shop-with-office, or barndominium.",
    intro:
      "A 30x50 metal building delivers 1,500 square feet — a step up that gives you room for a workshop plus a finished office or living area, or a barndominium with a generous shop. The 50-foot length suits a layout split between work space and finished space.",
    whatFits: [
      "A workshop bay plus a finished office or apartment",
      "A barndominium with separate living and shop zones",
      "5–6 vehicles or a small fleet",
      "Agricultural storage with equipment access at both ends",
    ],
    popularFor: ["Barndominium", "Workshop + office", "Agricultural"],
  },
  {
    slug: "30x60",
    width: 30,
    length: 60,
    sqft: 1800,
    startingFrom: 38900,
    eaveOptions: "12–18 ft",
    tagline: "1,800 sq ft — a full-size shop, multi-bay garage, or live-work barndominium.",
    intro:
      "A 30x60 metal building gives you 1,800 square feet of clear-span steel — long enough for a multi-bay garage, a full commercial shop, or a live-work barndominium with comfortable living quarters and a working shop under one roof.",
    whatFits: [
      "6+ vehicles or a multi-bay service shop",
      "A barndominium with full living quarters and a 2-bay shop",
      "An RV bay with a tall eave plus a standard garage",
      "Agricultural or contractor equipment storage",
    ],
    popularFor: ["Barndominium", "Commercial shop", "RV storage"],
  },
  {
    slug: "40x60",
    width: 40,
    length: 60,
    sqft: 2400,
    startingFrom: 46900,
    eaveOptions: "12–20 ft",
    tagline: "2,400 sq ft of column-free space — the go-to size for shops, barns, and barndominiums.",
    intro:
      "The 40x60 metal building is a workhorse: 2,400 square feet of completely column-free space. It is the most requested size for commercial shops, equestrian and agricultural barns, and full-size barndominiums because it offers genuine clear-span flexibility for almost any layout.",
    whatFits: [
      "A full barndominium with living quarters and a large shop",
      "A commercial shop with multiple service bays",
      "Equestrian barn, hay storage, or equipment housing",
      "8+ vehicles, RVs, or boats with tall eave heights",
    ],
    popularFor: ["Barndominium", "Commercial / agricultural", "RV / boat storage"],
  },
  {
    slug: "40x80",
    width: 40,
    length: 80,
    sqft: 3200,
    startingFrom: 59900,
    eaveOptions: "14–20 ft",
    tagline: "3,200 sq ft — a large commercial shop, riding arena, or estate barndominium.",
    intro:
      "A 40x80 metal building provides 3,200 square feet of clear-span space — ideal for a large commercial shop, a small covered riding arena, warehouse storage, or an estate-scale barndominium with room to spare. The 80-foot length supports long pull-through bays.",
    whatFits: [
      "A large commercial or fabrication shop",
      "Pull-through RV / semi bays with tall eaves",
      "A covered riding or training area",
      "An estate barndominium with a substantial shop wing",
    ],
    popularFor: ["Commercial shop", "Riding arena", "Warehouse"],
  },
  {
    slug: "50x80",
    width: 50,
    length: 80,
    sqft: 4000,
    startingFrom: 69900,
    eaveOptions: "14–22 ft",
    tagline: "4,000 sq ft of clear span — built for commercial, agricultural, and warehouse use.",
    intro:
      "A 50x80 metal building gives you 4,000 square feet of column-free space, a size that moves squarely into commercial and agricultural territory: warehouses, machine shops, equipment barns, and large covered work areas that need wide, unobstructed floors.",
    whatFits: [
      "A commercial warehouse or distribution space",
      "A machine shop or fabrication floor",
      "Large agricultural equipment and hay storage",
      "A covered arena or multi-use event space",
    ],
    popularFor: ["Warehouse", "Commercial shop", "Agricultural"],
  },
  {
    slug: "50x100",
    width: 50,
    length: 100,
    sqft: 5000,
    startingFrom: 84900,
    eaveOptions: "16–24 ft",
    tagline: "5,000 sq ft — a serious commercial, warehouse, or agricultural steel building.",
    intro:
      "A 50x100 metal building delivers 5,000 square feet of clear-span steel — a true commercial-scale footprint for warehouses, manufacturing, large equipment storage, or agricultural operations that need a long, wide, column-free floor.",
    whatFits: [
      "A full warehouse or distribution center",
      "Manufacturing or assembly floor space",
      "A large equipment barn or grain / hay storage",
      "Indoor riding arena with viewing and tack areas",
    ],
    popularFor: ["Warehouse", "Manufacturing", "Agricultural"],
  },
  {
    slug: "60x100",
    width: 60,
    length: 100,
    sqft: 6000,
    startingFrom: 94900,
    eaveOptions: "16–26 ft",
    tagline: "6,000 sq ft of clear span — commercial, industrial, and large agricultural builds.",
    intro:
      "A 60x100 metal building offers 6,000 square feet of completely column-free space, engineered for industrial and large agricultural use: warehouses, manufacturing plants, distribution hubs, and equipment barns where a wide clear span is essential.",
    whatFits: [
      "Industrial manufacturing or warehouse operations",
      "A distribution or logistics facility",
      "Large-scale equipment and livestock housing",
      "A regulation-friendly indoor riding arena",
    ],
    popularFor: ["Industrial", "Warehouse", "Agricultural"],
  },
  {
    slug: "80x100",
    width: 80,
    length: 100,
    sqft: 8000,
    startingFrom: 119900,
    eaveOptions: "18–28 ft",
    tagline: "8,000 sq ft — heavy commercial and industrial steel built to your loads.",
    intro:
      "An 80x100 metal building provides 8,000 square feet of clear-span space for heavy commercial and industrial applications. Engineered to your local wind and snow loads, it suits manufacturing, large warehousing, aircraft hangars, and major agricultural operations.",
    whatFits: [
      "Heavy manufacturing or industrial production",
      "Large warehouse and distribution operations",
      "Aircraft hangar with a tall clear-height door",
      "Major agricultural equipment and storage",
    ],
    popularFor: ["Industrial", "Hangar", "Warehouse"],
  },
  {
    slug: "100x100",
    width: 100,
    length: 100,
    sqft: 10000,
    startingFrom: 149900,
    eaveOptions: "18–30 ft",
    tagline: "10,000 sq ft of column-free steel — the largest standard clear-span size.",
    intro:
      "A 100x100 metal building gives you 10,000 square feet of clear-span space — the largest of the standard sizes and a genuine industrial footprint. It is engineered for manufacturing plants, large warehouses, hangars, and commercial operations that demand maximum unobstructed floor area.",
    whatFits: [
      "Large-scale manufacturing or industrial plants",
      "Major warehouse and logistics facilities",
      "Aircraft hangars and large equipment housing",
      "Commercial agricultural and processing operations",
    ],
    popularFor: ["Industrial", "Warehouse", "Hangar"],
  },
];

export function getSize(slug: string): BuildingSize | undefined {
  return SIZES.find((s) => s.slug === slug.toLowerCase());
}

export function allSizeParams(): { size: string }[] {
  return SIZES.map((s) => ({ size: s.slug }));
}

// Siblings for internal linking — everything except the current size.
export function otherSizes(slug: string): BuildingSize[] {
  return SIZES.filter((s) => s.slug !== slug.toLowerCase());
}
