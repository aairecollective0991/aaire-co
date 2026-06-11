// Buyer-intent guide content for the AAIRE Co. resource hub.
// Single source of truth — consumed by the /guides hub and the per-article
// pages at /guides/[slug]. Pure data so pages can statically generate.
//
// Pricing references are grounded in real Worldwide Steel dealer quotes and
// 2026 market data, and are deliberately given as ranges. AAIRE Co. sells the
// engineered building KIT (delivered); foundation, assembly, and finishing are
// additional and are called out as such.

export type GuideSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type GuideFaq = { q: string; a: string };

export type Guide = {
  slug: string;
  title: string; // on-page H1
  metaTitle: string;
  description: string;
  excerpt: string; // hub card summary
  readMinutes: number;
  updated: string; // ISO date, stamped manually
  sections: GuideSection[];
  faqs?: GuideFaq[];
  relatedSizes?: string[]; // size slugs to cross-link
};

export const GUIDES: Guide[] = [
  {
    slug: "metal-building-cost",
    title: "How Much Does a Metal Building Cost? (2026 Price Guide)",
    metaTitle: "How Much Does a Metal Building Cost? 2026 Price Guide",
    description:
      "What a metal building really costs in 2026 — kit price vs. installed price, cost per square foot, and what drives the number. Real ranges by size from a certified steel building distributor.",
    excerpt:
      "Kit price vs. installed price, cost per square foot, and the factors that actually move the number — with real 2026 ranges by size.",
    readMinutes: 7,
    updated: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "Metal building pricing confuses a lot of buyers because two very different numbers get quoted as \"the cost.\" One is the building kit — the engineered steel package delivered to your site. The other is the finished, installed building with a foundation, assembly, insulation, doors, and interior work. Knowing which number you are looking at is the single most important thing when comparing quotes.",
        ],
      },
      {
        heading: "Kit price vs. installed price",
        paragraphs: [
          "A steel building kit includes the trusses, secondary framing, sheeting, fasteners, and stamped engineered plans — everything you need to erect the shell. In 2026, base open-web-truss kits typically run about $15 to $28 per square foot delivered, with smaller buildings costing more per square foot because fixed costs are spread over less area.",
          "The installed, turnkey cost is higher. Once you add a concrete slab (roughly $4 to $8 per square foot) and professional erection (roughly $5 to $10 per square foot), a finished shell commonly lands in the $24 to $45 per square foot range — and a fully finished barndominium with insulation, windows, plumbing, and interior buildout climbs well beyond that.",
        ],
      },
      {
        heading: "What drives the price",
        bullets: [
          "Size and clear span — bigger footprints cost less per square foot, but more in total.",
          "Wind and snow loads — a coastal 130+ mph wind zone or a heavy-snow region needs more steel.",
          "Eave height — taller walls add material and matter for RV or equipment bays.",
          "Frame type — a base web-truss shop kit is far cheaper than a residential flush-column barndominium frame.",
          "Openings and options — overhead doors, windows, insulation, and thermal breaks add up quickly.",
          "Delivery location — freight and local sales tax are calculated to your site.",
        ],
      },
      {
        heading: "A realistic example",
        paragraphs: [
          "A base 30x40 building kit — the most popular size — starts around $28,500 delivered. Load that same building with multiple overhead doors, windows, thermal-break insulation, and a mezzanine and the kit alone can reach the mid-$40,000s before you ever pour concrete. The lesson: the starting price is a floor, and your options determine where you actually land.",
        ],
      },
      {
        heading: "How to get an accurate number",
        paragraphs: [
          "Because price depends on your loads, height, and options, the only way to know your real cost is a custom quote. AAIRE Co. quotes are engineered to your county's wind and snow requirements and include stamped drawings for permitting, so the number you get is the number you build to.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a metal building cost per square foot in 2026?",
        a: "Base steel building kits run about $15 to $28 per square foot delivered. A finished, installed building — with slab and erection — typically runs $24 to $45 per square foot, and a fully finished barndominium runs more.",
      },
      {
        q: "Does the kit price include the concrete slab?",
        a: "No. The kit price is the delivered building package only. The foundation/slab (about $4 to $8 per square foot) and assembly are separate costs.",
      },
      {
        q: "Why are smaller buildings more per square foot?",
        a: "Fixed costs like engineering, freight setup, and minimum material runs are spread over fewer square feet, so the per-square-foot price is higher on small buildings even though the total price is lower.",
      },
    ],
    relatedSizes: ["30x40", "40x60", "30x50"],
  },
  {
    slug: "barndominium-cost",
    title: "Barndominium Cost Breakdown (2026)",
    metaTitle: "Barndominium Cost Breakdown 2026 | What You'll Really Pay",
    description:
      "What a barndominium actually costs in 2026 — the steel shell vs. the finished home, cost per square foot, and where the money goes. From a certified steel building distributor.",
    excerpt:
      "The steel shell is only part of the story. Here's where barndominium money actually goes — and why the finished number is so different from the kit price.",
    readMinutes: 6,
    updated: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "A barndominium — a steel building that combines living quarters with a shop or garage — is one of the most popular ways to build today. But the cost range you see online is huge, because people mix up the price of the steel shell with the price of a finished, move-in-ready home.",
        ],
      },
      {
        heading: "The shell vs. the finished home",
        paragraphs: [
          "The steel building kit is the smaller number. A residential-grade barndominium frame (a flush-column design that keeps interior walls clear) costs more than a basic shop kit, but it is still only the shell. The bigger spend is everything inside: foundation, insulation, plumbing, electrical, HVAC, windows, doors, kitchen, baths, and finishes.",
          "As a rule of thumb in 2026, the steel shell is often 20 to 35 percent of the total finished cost. The interior buildout is where most of the budget goes — and it is the part that varies most with your taste and finish level.",
        ],
      },
      {
        heading: "Typical cost ranges",
        bullets: [
          "Steel shell (residential frame, delivered kit): a meaningful premium over a basic shop kit of the same size.",
          "Foundation/slab: roughly $4 to $8 per square foot.",
          "Shell erection: roughly $5 to $10 per square foot.",
          "Interior finishing: the widest variable — modest finishes vs. high-end can differ by 2–3x.",
          "Finished barndominiums commonly land anywhere from the $130s per square foot for modest builds to well over $200 per square foot fully finished.",
        ],
      },
      {
        heading: "How to control the cost",
        bullets: [
          "Keep the footprint efficient — a smart 40x60 often beats an oversized plan.",
          "Finish in phases: dry-in the shell now, complete the interior as budget allows.",
          "Do some of the interior work yourself if you are able.",
          "Lock the structural design early so you are not paying to re-engineer.",
        ],
      },
      {
        heading: "Start with the right shell",
        paragraphs: [
          "Everything inside a barndominium depends on a sound, properly engineered shell. AAIRE Co. supplies residential-grade steel building kits engineered to your local loads with stamped plans, so your builder can finish the interior with confidence. Get a free quote on the shell and you will have a firm foundation for the rest of your budget.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a barndominium cost in 2026?",
        a: "Finished barndominiums commonly run from roughly $130 per square foot for modest builds to well over $200 per square foot fully finished. The steel shell itself is typically only 20–35% of that total.",
      },
      {
        q: "Is the steel shell the biggest cost?",
        a: "Usually not. The interior buildout — insulation, plumbing, electrical, HVAC, and finishes — is normally the largest part of a finished barndominium budget.",
      },
    ],
    relatedSizes: ["40x60", "30x50", "30x60"],
  },
  {
    slug: "metal-building-vs-pole-barn",
    title: "Metal Building vs. Pole Barn: Which Is Right for You?",
    metaTitle: "Metal Building vs. Pole Barn: Cost, Strength & Lifespan",
    description:
      "Steel building vs. pole barn compared on cost, strength, lifespan, maintenance, and permitting — so you can choose the right structure for your project.",
    excerpt:
      "Steel vs. post-frame, compared honestly on cost, strength, lifespan, and maintenance — and when each one actually makes sense.",
    readMinutes: 6,
    updated: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "\"Pole barn\" (post-frame, built around wood posts set in or on the ground) and \"metal building\" (a steel-framed structure) are the two most common ways to put up a large, affordable building. Both can be clad in steel sheeting, so they look similar from the outside — but they are very different underneath.",
        ],
      },
      {
        heading: "Strength and lifespan",
        paragraphs: [
          "A steel frame does not rot, warp, or attract termites, and a quality open-web-truss building carries a structural warranty measured in decades. Wood post-frame buildings are proven and economical, but the posts are the weak point over time — especially where they meet the ground and where moisture and insects do their work.",
        ],
      },
      {
        heading: "Cost",
        paragraphs: [
          "Up front, a basic pole barn can be slightly cheaper for simple agricultural use. But the gap narrows fast once you add engineering, clear-span width, higher wind or snow loads, or a finished interior. For anything you plan to insulate, heat, or live in, steel's durability and clear-span flexibility usually win on lifetime cost.",
        ],
      },
      {
        heading: "Clear span and layout",
        paragraphs: [
          "Steel clear-span framing gives you a completely column-free interior, which matters for shops, equipment, and open living space. Post-frame buildings often need interior posts on wide spans, which can get in the way of your layout.",
        ],
      },
      {
        heading: "Permitting",
        paragraphs: [
          "Both can be permitted, but engineered steel buildings ship with stamped engineered plans that make the permit process smoother in most jurisdictions. That is a real advantage in higher wind and snow zones where officials want to see the engineering.",
        ],
      },
      {
        heading: "Which should you choose?",
        bullets: [
          "Choose post-frame for simple, low-cost agricultural storage where longevity is less critical.",
          "Choose steel for shops, garages, commercial use, barndominiums, and anything you will insulate or finish.",
          "Choose steel anywhere you need a wide clear span or face demanding wind/snow loads.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a metal building better than a pole barn?",
        a: "For durability, clear-span layout, and anything you plan to finish or live in, a steel building generally outperforms a pole barn. Post-frame can be slightly cheaper up front for simple agricultural use.",
      },
      {
        q: "Do steel buildings last longer than pole barns?",
        a: "Yes. Steel framing does not rot, warp, or attract termites and typically carries a multi-decade structural warranty, while wood posts are the long-term weak point in post-frame construction.",
      },
    ],
    relatedSizes: ["30x40", "40x60", "30x60"],
  },
  {
    slug: "do-steel-buildings-rust",
    title: "Do Steel Buildings Rust? How We Prevent It",
    metaTitle: "Do Steel Buildings Rust? How Modern Coatings Prevent It",
    description:
      "Do steel buildings rust? Learn how modern coatings, galvalume, and painted panels protect steel buildings for decades — and what warranty to look for.",
    excerpt:
      "The honest answer, plus how modern coatings, galvalume, and painted panels keep a steel building rust-free for decades.",
    readMinutes: 5,
    updated: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "It is the most common worry buyers have about steel: won't it rust? The short answer is that bare steel can corrode, but modern building steel is not bare — it is protected by coatings engineered to resist corrosion for decades, and quality manufacturers back that protection with a warranty.",
        ],
      },
      {
        heading: "How modern steel is protected",
        bullets: [
          "Structural trusses are dipped in a rust-proof coating and inspected before they ship.",
          "Steel sheeting is either galvalume (a galvanized aluminum-zinc coating) or factory-painted with long-life finishes.",
          "Fasteners use neoprene washers to seal each penetration against water intrusion.",
          "Stamped engineering ensures panels shed water correctly so moisture never sits on the steel.",
        ],
      },
      {
        heading: "What the warranty tells you",
        paragraphs: [
          "Coating quality shows up in the warranty. Quality painted panels can carry a lifetime warranty, and galvalume panels commonly carry a 25-year warranty, while the structural steel itself can be backed by a 50-year structural warranty. If a building's panels only carry a short warranty, that is a signal about the coating.",
        ],
      },
      {
        heading: "How to keep your building rust-free",
        bullets: [
          "Choose painted or galvalume panels with a strong panel warranty.",
          "Keep gutters and drainage clear so water moves away from the base.",
          "Touch up any field-cut edges or scratches promptly.",
          "Avoid trapping debris or organic material against the panels.",
        ],
      },
      {
        paragraphs: [
          "Bottom line: a properly coated, properly engineered steel building should not rust through in your lifetime. AAIRE Co. buildings use rust-proof-coated trusses and warrantied panels, with a 50-year structural warranty on the framing.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do metal buildings rust over time?",
        a: "Bare steel can corrode, but modern building steel is protected by rust-proof coatings, galvalume or painted panels, and sealed fasteners. With quality panels and good drainage, a steel building should not rust through in your lifetime.",
      },
      {
        q: "What is the best rust protection for a steel building?",
        a: "Factory-painted panels with a lifetime finish warranty or galvalume panels with a 25-year warranty, combined with rust-proof-coated structural steel and neoprene-sealed fasteners.",
      },
    ],
    relatedSizes: ["24x30", "30x40", "40x60"],
  },
  {
    slug: "metal-building-foundation",
    title: "Concrete Slab & Foundation Guide for Metal Buildings",
    metaTitle: "Metal Building Foundation & Concrete Slab Guide (2026)",
    description:
      "Foundation options for metal buildings — concrete slab, piers, and footings — plus typical slab thickness, cost per square foot, and what your engineered plans require.",
    excerpt:
      "Slab vs. piers, typical thickness and cost, and why your stamped plans dictate the foundation — a practical guide before you pour.",
    readMinutes: 6,
    updated: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "Your steel building is only as solid as what it sits on. The foundation is a separate cost from the building kit, and getting it right is essential — both for the structure and for passing inspection. Here is what you need to know before you pour.",
        ],
      },
      {
        heading: "Common foundation types",
        bullets: [
          "Concrete slab-on-grade: the most common choice for garages, shops, and barndominiums — a monolithic pour that serves as both foundation and finished floor.",
          "Pier foundation: concrete piers at column locations, often used for open structures, carports, and sloped or remote sites.",
          "Perimeter footing with stem wall: used where frost depth or grade requires it.",
        ],
      },
      {
        heading: "Slab thickness and cost",
        paragraphs: [
          "A typical metal building slab is 4 to 6 inches thick, with thickened edges and footings sized to your building's column loads. Expect roughly $4 to $8 per square foot for a standard slab in 2026, varying with site prep, rebar, thickness, and local concrete prices.",
          "Heavier buildings, tall eaves, and high wind or snow loads increase the anchor and footing requirements — which is exactly why the engineering matters.",
        ],
      },
      {
        heading: "Why your stamped plans matter",
        paragraphs: [
          "A quality steel building kit includes stamped engineered plans, and many include elevation and pier placement plans — even foundation/slab plans. That is a real advantage: your concrete contractor pours to the engineer's anchor-bolt layout and load requirements, so the building bolts down exactly as designed and your inspector sees the engineering they need.",
        ],
      },
      {
        heading: "Before you pour: a checklist",
        bullets: [
          "Confirm the slab plan matches your stamped anchor-bolt layout.",
          "Verify frost depth and drainage for your site.",
          "Set anchor bolts precisely — small errors are expensive to fix later.",
          "Let concrete cure adequately before erection begins.",
        ],
      },
    ],
    faqs: [
      {
        q: "How thick should a metal building concrete slab be?",
        a: "A typical metal building slab is 4 to 6 inches thick with thickened edges and footings sized to the building's column loads. Your engineered plans specify the exact requirements.",
      },
      {
        q: "How much does a foundation for a metal building cost?",
        a: "A standard concrete slab runs roughly $4 to $8 per square foot in 2026, depending on site prep, thickness, rebar, and local concrete prices. It is a separate cost from the building kit.",
      },
    ],
    relatedSizes: ["30x40", "40x60", "50x80"],
  },
  {
    slug: "what-size-metal-building",
    title: "What Size Metal Building Do I Need?",
    metaTitle: "What Size Metal Building Do I Need? Sizing Guide by Use",
    description:
      "A practical guide to choosing a metal building size by use — garages, workshops, RV storage, barndominiums, and commercial — with the most popular dimensions for each.",
    excerpt:
      "Match the building to the job. Popular sizes for garages, RV storage, shops, and barndominiums — and how to leave room to grow.",
    readMinutes: 5,
    updated: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "Picking a size is the first real decision in any steel building project. Too small and you will wish you had gone bigger within a year; too big and you pay for space you do not use. Here is how to match the building to the job.",
        ],
      },
      {
        heading: "Start with the use, then add room to grow",
        paragraphs: [
          "Figure out what has to fit — vehicles, equipment, work areas, living space — then add 15 to 25 percent. Almost nobody regrets a slightly larger building; plenty of owners regret a tight one. Eave height matters too: lifts, RVs, and equipment need taller walls.",
        ],
      },
      {
        heading: "Popular sizes by use",
        bullets: [
          "Two-car garage or backyard workshop: 24x30 (720 sq ft).",
          "Deep garage or small shop: 24x40 (960 sq ft).",
          "The all-purpose best-seller — garage, shop, or starter barndominium: 30x40 (1,200 sq ft).",
          "Shop with an office or living area: 30x50 (1,500 sq ft).",
          "Live-work barndominium or multi-bay garage: 30x60 (1,800 sq ft).",
          "Full barndominium, commercial shop, or barn: 40x60 (2,400 sq ft).",
          "Large commercial, warehouse, or agricultural: 50x80 and up.",
        ],
      },
      {
        heading: "Don't forget clearances",
        bullets: [
          "Allow turning and door-swing room around vehicles and equipment.",
          "Size overhead doors for your tallest vehicle plus margin.",
          "Plan eave height for lifts, RVs, and mezzanines before you order.",
          "Check setbacks and lot coverage for your county before finalizing footprint.",
        ],
      },
      {
        heading: "Still unsure?",
        paragraphs: [
          "Tell AAIRE Co. how you will use the building and we will recommend a size and send a free quote. Because every building is custom-engineered, we can dial in the exact width, length, and eave height for your project — and your county's loads.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the most popular metal building size?",
        a: "The 30x40 (1,200 sq ft) is the best-selling size because it works as a four-car garage, a serious workshop, a starter barndominium, or a small commercial shop.",
      },
      {
        q: "How much extra space should I plan for?",
        a: "Figure out what must fit, then add about 15 to 25 percent. Owners rarely regret a slightly larger building, but a tight one is a common regret.",
      },
    ],
    relatedSizes: ["24x30", "30x40", "40x60"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug.toLowerCase());
}

export function allGuideParams(): { slug: string }[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function otherGuides(slug: string): Guide[] {
  return GUIDES.filter((g) => g.slug !== slug.toLowerCase());
}
