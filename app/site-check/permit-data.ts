// Permit & site data for the AAIRE Co. Build Site Checker.
// Single source of truth — consumed by both the interactive /site-check page
// and the per-county SEO pages at /site-check/[state]/[county].
//
// Accuracy note: phone numbers, departments, and portals were verified against
// official county .gov/.us sources. Wind speeds follow each state's building
// code (ASCE 7 ultimate design wind). Snow loads are typical regional design
// values — mountain/high-elevation parcels can require a site-specific
// (engineered) value. Setbacks are genuinely zoning-dependent everywhere.

export type StateCode = "NC" | "SC" | "VA" | "GA" | "TN" | "HI";

export type BuildingType =
  | "Barndominium"
  | "Garage / Workshop"
  | "RV Cover / Carport"
  | "Agricultural"
  | "Commercial";

export const BUILDING_TYPES: BuildingType[] = [
  "Barndominium",
  "Garage / Workshop",
  "RV Cover / Carport",
  "Agricultural",
  "Commercial",
];

export type CountyPermit = {
  slug: string;
  name: string;
  state: StateCode;
  stateName: string;
  seat: string;
  majorCities: string[];
  permitRequired: boolean;
  permitNotes: string;
  setbacks: string;
  windZone: string;
  snowLoad: string;
  hoaRisk: string;
  permitContact: string;
  processTip: string;
  /** Coastal/island/mountain considerations — shown as an extra card when present. */
  specialNotes?: string;
};

export const STATES: { code: StateCode; name: string }[] = [
  { code: "NC", name: "North Carolina" },
  { code: "SC", name: "South Carolina" },
  { code: "VA", name: "Virginia" },
  { code: "GA", name: "Georgia" },
  { code: "TN", name: "Tennessee" },
  { code: "HI", name: "Hawaii" },
];

export const COUNTIES: CountyPermit[] = [
  // ── North Carolina ─────────────────────────────────────────────
  {
    slug: "mecklenburg",
    name: "Mecklenburg",
    state: "NC",
    stateName: "North Carolina",
    seat: "Charlotte",
    majorCities: ["Charlotte", "Matthews", "Huntersville", "Cornelius"],
    permitRequired: true,
    permitNotes:
      "A building permit is required for accessory structures with any dimension greater than 12 feet. Mecklenburg runs everything through its Code Enforcement (LUESA) division and the Code Info & Resource Center online tools; smaller multi-trade accessory projects under $40K are handled by a dedicated residential group.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with the City of Charlotte or your town's zoning office before applying, since most of the county is inside a municipal jurisdiction.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "High — dense suburban subdivisions across Charlotte and the north-county towns where covenants commonly restrict outbuilding type and materials",
    permitContact: "Mecklenburg County Code Enforcement: 704-336-8000",
    processTip:
      "Get your zoning sign-off from the right municipality first. Most Mecklenburg addresses fall under Charlotte, Huntersville, Matthews or another town's zoning even though the county handles the building inspection, so verify the jurisdiction before you submit.",
  },
  {
    slug: "iredell",
    name: "Iredell",
    state: "NC",
    stateName: "North Carolina",
    seat: "Statesville",
    majorCities: ["Statesville", "Mooresville", "Troutman"],
    permitRequired: true,
    permitNotes:
      "Apply through Iredell County Central Permitting, which consolidates Building Standards, Planning/Zoning and Environmental Health review. Depending on the project you'll be contacted for an in-office review or scheduled for a site visit.",
    setbacks:
      "Varies by zoning district; the Building Standards Center can confirm front, side and rear setbacks for your specific parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "High — rapid growth around Mooresville and Lake Norman has produced many subdivisions with covenants limiting accessory buildings",
    permitContact: "Iredell County Building Standards: 704-878-3113",
    processTip:
      "Lake Norman parcels often trigger watershed and septic-setback review on top of the standard building permit, so flag any waterfront or septic-served lot to Central Permitting early to avoid a second round of plan checks.",
  },
  {
    slug: "cabarrus",
    name: "Cabarrus",
    state: "NC",
    stateName: "North Carolina",
    seat: "Concord",
    majorCities: ["Concord", "Kannapolis", "Harrisburg", "Mount Pleasant"],
    permitRequired: true,
    permitNotes:
      "Cabarrus County Construction Standards handles plan review, permitting and inspections, all available 24/7 through the Accela Citizen Access portal. A building permit is required for new accessory structures.",
    setbacks:
      "Varies by zoning district; confirm with Construction Standards or the local zoning office, as much of the county lies inside Concord, Kannapolis or Harrisburg limits.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "High — fast-growing suburban subdivisions around Concord and Harrisburg frequently carry covenants on outbuildings",
    permitContact: "Cabarrus County Construction Standards: 704-920-2128",
    processTip:
      "Set up your Accela Citizen Access account before you start and upload a clean site plan showing setbacks the first time; Cabarrus processes those applications quickly online when the dimensioned plot plan is complete.",
  },
  {
    slug: "gaston",
    name: "Gaston",
    state: "NC",
    stateName: "North Carolina",
    seat: "Gastonia",
    majorCities: ["Gastonia", "Mount Holly", "Belmont", "Cherryville"],
    permitRequired: true,
    permitNotes:
      "Gaston County Building & Development Services enforces the NC State Building Code for unincorporated areas and most of the county's towns. A building permit is required for new accessory structures.",
    setbacks:
      "Varies by zoning district; verify side and rear setbacks with Building & Development Services for your parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — a mix of established and newer subdivisions; covenants are common nearer Charlotte (Belmont, Mount Holly) but lighter in rural areas",
    permitContact: "Gaston County Building & Development Services: 704-866-3155",
    processTip:
      "Confirm whether your address is county or town jurisdiction first — Gaston handles inspections for many of its towns, but a few (and Charlotte-adjacent areas) have their own rules. Calling the department with your parcel number saves a wasted trip.",
  },
  {
    slug: "rowan",
    name: "Rowan",
    state: "NC",
    stateName: "North Carolina",
    seat: "Salisbury",
    majorCities: ["Salisbury", "Kannapolis", "China Grove", "Spencer"],
    permitRequired: true,
    permitNotes:
      "Rowan County Building Inspections issues building permits and conducts plan review for accessory structures; zoning approval from Planning & Development is part of the process. Permits and plan reviews are accepted from 8 a.m. to 4 p.m.",
    setbacks:
      "Varies by zoning district — accessory structures typically require about 10 ft side and rear yards, with front setbacks ranging from 10 to 50 ft depending on the district. Confirm with Planning.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — growth along the Kannapolis/Cabarrus edge brings subdivision covenants, but much of the county remains rural",
    permitContact: "Rowan County Building Inspections: 704-216-8619",
    processTip:
      "Clear zoning with Planning & Development (704-216-8588) before you submit for the building permit; getting the setback and use confirmation up front keeps the inspections review from stalling.",
  },
  {
    slug: "union",
    name: "Union",
    state: "NC",
    stateName: "North Carolina",
    seat: "Monroe",
    majorCities: ["Monroe", "Waxhaw", "Indian Trail", "Stallings"],
    permitRequired: true,
    permitNotes:
      "Union County Building Code Enforcement issues permits everywhere in the county except Monroe and Waxhaw, which run their own. Applications, plan review and inspection scheduling go through the county's online Evolve permitting portal.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Development Services, and note that Monroe and Waxhaw have separate zoning rules.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "High — Union is one of NC's fastest-growing suburban counties, and subdivisions in Waxhaw, Weddington and Indian Trail routinely restrict outbuildings",
    permitContact: "Union County Building Code Enforcement: unioncountync.gov",
    processTip:
      "Check whether your address is in Monroe or Waxhaw before applying — those two cities permit independently of the county. For everywhere else, the Evolve portal handles plan review and inspection requests in one place.",
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    state: "NC",
    stateName: "North Carolina",
    seat: "Lincolnton",
    majorCities: ["Lincolnton", "Denver", "Maiden"],
    permitRequired: true,
    permitNotes:
      "Lincoln County Planning & Inspections issues building permits and enforces the state building code and local land-use ordinances. The county publishes homeowner guides for simple residential accessory projects.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Planning & Inspections for your parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — lake-area growth around Denver and the East Lincoln corridor brings covenants, while the rest of the county stays rural",
    permitContact: "Lincoln County Planning & Inspections: 704-736-8436",
    processTip:
      "Use the county's residential accessory-project guides as your application checklist — Planning & Inspections publishes them specifically to walk homeowners through shed and detached-garage permits, which keeps your submittal complete the first time.",
  },
  {
    slug: "stanly",
    name: "Stanly",
    state: "NC",
    stateName: "North Carolina",
    seat: "Albemarle",
    majorCities: ["Albemarle", "Locust", "Oakboro", "Norwood"],
    permitRequired: true,
    permitNotes:
      "Stanly County Central Permitting consolidates Building Inspections, Planning/Zoning and Environmental Health. Accessory buildings larger than 12 ft x 12 ft require a building permit; structures 12 ft or under can file a non-required permit if you want inspections.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Central Permitting before building.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Low — largely rural and small-town county with fewer covenant-controlled subdivisions, though Locust and the Charlotte-commuter edge are growing",
    permitContact: "Stanly County Central Permitting: 704-986-3667",
    processTip:
      "If your metal building has any dimension over 12 feet you'll need the full building permit with inspections — size it and your slab plan accordingly, and email centralpermitting@stanlycountync.gov ahead of time to confirm what your zoning requires.",
  },
  {
    slug: "wake",
    name: "Wake",
    state: "NC",
    stateName: "North Carolina",
    seat: "Raleigh",
    majorCities: ["Raleigh", "Cary", "Apex", "Wake Forest"],
    permitRequired: true,
    permitNotes:
      "Accessory buildings with any dimension greater than 12 ft require a building permit; smaller ones may still need a Land Use Permit from Planning & Zoning. Applications, plans and inspections run through the Wake County Permit Portal (EnerGov/Tyler).",
    setbacks:
      "Varies by zoning district; septic-served lots must also keep the structure clear of required septic setbacks. Confirm with Planning & Zoning.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "High — one of the most subdivision-heavy counties in the state, with covenants on outbuildings common throughout the Raleigh metro",
    permitContact: "Wake County Permits & Inspections: Wake.Permitting@wake.gov",
    processTip:
      "Many Wake addresses sit inside Raleigh, Cary or Apex, which permit on their own systems — verify jurisdiction before you use the county portal. On septic-served lots, get the building located against the drainfield setbacks early.",
  },
  {
    slug: "durham",
    name: "Durham",
    state: "NC",
    stateName: "North Carolina",
    seat: "Durham",
    majorCities: ["Durham", "Bahama", "Rougemont"],
    permitRequired: true,
    permitNotes:
      "The joint City-County Building & Safety Department issues accessory-structure permits; two copies of a site plan are required, plus structural drawings if any side exceeds 12 ft. Fee payments and inspection requests go through the Land Development Office (LDO) portal.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with the City-County Building & Safety / Planning office for your parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — established city neighborhoods are mixed, but newer suburban subdivisions in the county carry covenants on outbuildings",
    permitContact: "Durham City-County Building & Safety: 919-560-4144",
    processTip:
      "If any wall of your metal building is longer than 12 feet, plan to submit stamped or manufacturer structural drawings with two copies of your site plan up front — Durham asks for those specifically once you cross the 12-foot threshold.",
  },
  {
    slug: "guilford",
    name: "Guilford",
    state: "NC",
    stateName: "North Carolina",
    seat: "Greensboro",
    majorCities: ["Greensboro", "High Point", "Jamestown", "Summerfield"],
    permitRequired: true,
    permitNotes:
      "Guilford County Inspections permits accessory structures for unincorporated areas and several contract towns; the Civic Access Public Portal handles permits, plan review and inspections. Zoning, watershed and erosion approvals may also be required from Planning & Development.",
    setbacks:
      "Varies by zoning district; verify use and setbacks with Guilford County Planning & Development, or the relevant town if inside city limits.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "High — the Greensboro/High Point metro and growing towns like Summerfield and Oak Ridge have many covenant-controlled subdivisions",
    permitContact: "Guilford County Inspections: 336-641-3707",
    processTip:
      "Greensboro and High Point permit through their own city offices — Guilford County only covers unincorporated areas and its contract towns. Confirm jurisdiction, then run zoning/watershed approval through Planning before opening the building permit in Civic Access.",
  },
  {
    slug: "forsyth",
    name: "Forsyth",
    state: "NC",
    stateName: "North Carolina",
    seat: "Winston-Salem",
    majorCities: ["Winston-Salem", "Kernersville", "Clemmons", "Lewisville"],
    permitRequired: true,
    permitNotes:
      "The joint Winston-Salem/Forsyth City-County Inspections Division permits and inspects across the county except inside High Point, Kernersville and King. Residential applications, including accessory buildings, are submitted through the GeoCivix portal.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with the City-County Inspections / zoning office for your parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — suburban subdivisions around Clemmons, Lewisville and the Winston-Salem fringe commonly restrict outbuildings; older and rural areas less so",
    permitContact: "Winston-Salem/Forsyth City-County Inspections: 336-727-2624",
    processTip:
      "Submit residential accessory permits through the GeoCivix portal, and note Kernersville and King run their own offices. The permit counter closes the first Wednesday of each month from 7:45-9:45 a.m., so time any in-person visit accordingly.",
  },
  {
    slug: "buncombe",
    name: "Buncombe",
    state: "NC",
    stateName: "North Carolina",
    seat: "Asheville",
    majorCities: ["Asheville", "Black Mountain", "Weaverville", "Woodfin"],
    permitRequired: true,
    permitNotes:
      "Buncombe County Permits & Inspections enforces the NC State Building Code for unincorporated areas and contract towns (Biltmore Forest, Weaverville, Woodfin) and handles plan review and permitting for new accessory structures.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Permits & Inspections, and expect grading/erosion review on sloped mountain lots.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — Asheville-area subdivisions and mountain developments often have covenants, especially in gated or view-lot communities",
    permitContact: "Buncombe County Permits & Inspections: 828-250-5360",
    processTip:
      "This is mountain terrain — steep or graded lots can trigger additional foundation and erosion-control review, and high-elevation sites may carry heavier snow-load design than the valley's 15 psf. Have your site's grade and elevation ready when you call.",
    specialNotes:
      "Higher-elevation Buncombe parcels can require a site-specific (case-study) snow load above the 15 psf valley value. Verify the design snow load for your exact elevation with Permits & Inspections before ordering your roof package.",
  },
  {
    slug: "new-hanover",
    name: "New Hanover",
    state: "NC",
    stateName: "North Carolina",
    seat: "Wilmington",
    majorCities: ["Wilmington", "Carolina Beach", "Wrightsville Beach", "Kure Beach"],
    permitRequired: true,
    permitNotes:
      "New Hanover County Building Safety permits and inspects accessory structures, with applications and inspections managed through the COAST online portal. Coastal wind design and engineered drawings are typically required for metal buildings here.",
    setbacks:
      "Varies by zoning district; confirm setbacks with Building Safety/Planning, and note coastal and flood-zone overlays may add requirements near the water.",
    windZone: "150 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "High — coastal subdivisions and beach communities commonly restrict outbuildings, and HOAs are widespread across the Wilmington area",
    permitContact: "New Hanover County Building Safety: 910-798-7311",
    processTip:
      "This is high-wind coastal country — the NC code sets 150 mph east of Hwy 17 (140 mph west), so order your metal building with an engineered, county-specific wind package. Flood-zone parcels will also need elevation and tie-down details, so flag those before you submit through COAST.",
    specialNotes:
      "Coastal high-wind zone (140-150 mph) plus salt-air exposure. Specify an engineered wind package and corrosion-resistant coatings, and expect flood-zone elevation and tie-down requirements near the water.",
  },
  {
    slug: "catawba",
    name: "Catawba",
    state: "NC",
    stateName: "North Carolina",
    seat: "Newton",
    majorCities: ["Hickory", "Newton", "Conover", "Maiden"],
    permitRequired: true,
    permitNotes:
      "Catawba County Building Services handles permitting, plan review and inspections; scheduling and applications run through the ePermits public portal. A building permit is required for new accessory structures.",
    setbacks:
      "Varies by zoning district; accessory structures cannot sit within a required front setback, and side/rear setbacks depend on your zone — confirm with the Permit Center.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — subdivisions around Hickory, Conover and Lake Norman's north end carry covenants; rural areas are lighter",
    permitContact: "Catawba County Building Services: 828-465-8399",
    processTip:
      "Position the building outside the required front setback before you draw your site plan — Catawba calls that out specifically for accessory structures. The ePermits portal lets you schedule inspections online once your permit is issued.",
  },
  {
    slug: "cleveland",
    name: "Cleveland",
    state: "NC",
    stateName: "North Carolina",
    seat: "Shelby",
    majorCities: ["Shelby", "Kings Mountain", "Boiling Springs"],
    permitRequired: true,
    permitNotes:
      "Cleveland County Building Inspections issues permits for new accessory structures and posts a flat fee schedule (around $125 for 400 sq ft or less, $200 for larger). Inspection status is available online with your permit number.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Building Inspections or the local zoning office for your parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Low — predominantly rural and small-town county with relatively few covenant-controlled subdivisions",
    permitContact: "Cleveland County Building Inspections: 980-484-4997",
    processTip:
      "Accessory-structure permit fees here are flat and tied to square footage, so confirm your building's footprint up front. Email Permits.Office@clevelandcountync.gov with your plan to get the application moving before you visit the Fallston Road office.",
  },
  {
    slug: "davidson",
    name: "Davidson",
    state: "NC",
    stateName: "North Carolina",
    seat: "Lexington",
    majorCities: ["Lexington", "Thomasville", "Welcome", "Midway"],
    permitRequired: true,
    permitNotes:
      "Davidson County Inspections/Central Permitting accepts plans and issues building, electrical, plumbing and mechanical permits, with online applications through the OpenGov portal. Permits are issued between 8:30 a.m. and 4:30 p.m.",
    setbacks:
      "Varies by zoning district; verify your accessory-structure setbacks with Planning & Zoning before applying.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Low — mostly rural and small-town, with limited covenant-controlled subdivisions outside the Lexington/Thomasville fringe",
    permitContact: "Davidson County Inspections/Central Permitting: 336-242-2230",
    processTip:
      "Start with a Planning & Zoning permit, then open the building permit through the OpenGov portal. Get your inspection requests in before the 4 p.m. cutoff if you want next-day service.",
  },
  {
    slug: "randolph",
    name: "Randolph",
    state: "NC",
    stateName: "North Carolina",
    seat: "Asheboro",
    majorCities: ["Asheboro", "Archdale", "Randleman", "Trinity"],
    permitRequired: true,
    permitNotes:
      "In Randolph County the first step is a Zoning Permit from Planning, then the building permit and any environmental health/inspections approvals through Central Permitting. Applications can be filed via the county's eSuite Permits portal.",
    setbacks:
      "Varies by zoning district under the county's Unified Development Ordinance; confirm setbacks with the Planning Department.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Low — largely rural county; subdivision covenants are uncommon outside the Archdale/Trinity area near High Point",
    permitContact: "Randolph County Inspections: 336-318-6595",
    processTip:
      "Pull your zoning permit from Planning first — Randolph requires it before the building permit can be issued. Inspectors are easiest to reach by phone between 8-9 a.m. or 4-5 p.m. if you need to talk through your accessory structure.",
  },
  {
    slug: "alamance",
    name: "Alamance",
    state: "NC",
    stateName: "North Carolina",
    seat: "Graham",
    majorCities: ["Burlington", "Graham", "Mebane", "Elon"],
    permitRequired: true,
    permitNotes:
      "Alamance County Inspections permits and inspects accessory structures for unincorporated areas and several towns, with an online permits/inspections portal and electronic plan-review intake at planreview@alamance-nc.com.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Inspections or the relevant town zoning office.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — growing subdivisions around Mebane, Elon and the Burlington fringe carry covenants; rural areas are lighter",
    permitContact: "Alamance County Inspections: 336-290-0404",
    processTip:
      "Confirm whether your address is county jurisdiction or one of the towns Alamance contracts for — Burlington and a few others handle their own permitting. You can email plans to planreview@alamance-nc.com to start the review without a counter visit.",
  },
  {
    slug: "johnston",
    name: "Johnston",
    state: "NC",
    stateName: "North Carolina",
    seat: "Smithfield",
    majorCities: ["Smithfield", "Clayton", "Selma", "Benson"],
    permitRequired: true,
    permitNotes:
      "Johnston County Building Inspections requires a permit for accessory structures with any dimension greater than 12 ft, or any that get electrical, plumbing or mechanical work. Permit records and applications are available through the department's online tools.",
    setbacks:
      "Varies by zoning district; confirm setbacks with Planning & Zoning, especially as Clayton-area growth pushes more parcels into town jurisdictions.",
    windZone: "120 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — fast suburban growth around Clayton and the Raleigh-commuter corridor brings covenant-controlled subdivisions; eastern county stays rural",
    permitContact: "Johnston County Building Inspections: 919-989-5060",
    processTip:
      "Johnston sits in the 120 mph wind band, higher than the piedmont's 115 — order your metal building with the matching engineered wind package. A truly small shed (no dimension over 12 ft and no utilities) can skip the permit, but anything larger needs the full application.",
  },
  {
    slug: "cumberland",
    name: "Cumberland",
    state: "NC",
    stateName: "North Carolina",
    seat: "Fayetteville",
    majorCities: ["Fayetteville", "Hope Mills", "Spring Lake", "Stedman"],
    permitRequired: true,
    permitNotes:
      "Cumberland County Planning & Inspections provides permitting and inspections for the county outside Fayetteville, Hope Mills and Spring Lake, using EnerGov and Citizen Self Service (CSS) for online applications, plans and inspections.",
    setbacks:
      "Varies by zoning district; confirm side and rear setbacks with Planning & Inspections for your parcel.",
    windZone: "130 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — newer subdivisions around Fayetteville and Hope Mills carry covenants; much of the rural county does not",
    permitContact: "Cumberland County Central Permitting: 910-321-6636",
    processTip:
      "Wind speed steps up across the county — the NC code sets 130 mph east of I-95 and 120 mph west — so confirm which side of the interstate your site is on and spec the building's engineering to match. Fayetteville, Hope Mills and Spring Lake permit separately from the county.",
  },
  {
    slug: "caldwell",
    name: "Caldwell",
    state: "NC",
    stateName: "North Carolina",
    seat: "Lenoir",
    majorCities: ["Lenoir", "Hudson", "Granite Falls", "Sawmills"],
    permitRequired: true,
    permitNotes:
      "Caldwell County Building Inspections issues permits for accessory buildings and detached garages and enforces the NC State Building Code. Applications are available at the Morganton Blvd. office and by email to buildinginspections@caldwellcountync.org.",
    setbacks:
      "Varies by zoning district; confirm setbacks with Building Inspections or the Planning Department, and expect grading review on sloped foothill lots.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "Low — predominantly rural foothills county with limited covenant-controlled subdivisions",
    permitContact: "Caldwell County Building Inspections: 828-426-8585",
    processTip:
      "Caldwell climbs from foothills into the mountains, so ground snow load runs higher than the piedmont and is elevation-dependent — higher parcels may require a site-specific (case study) snow load. Verify the design snow load with Building Inspections before ordering your metal building's roof package.",
    specialNotes:
      "Foothills-to-mountain elevations mean snow load is elevation-dependent; higher parcels can require a site-specific (case-study) value above 20 psf. Confirm before ordering your roof package.",
  },

  // ── South Carolina ─────────────────────────────────────────────
  {
    slug: "greenville",
    name: "Greenville",
    state: "SC",
    stateName: "South Carolina",
    seat: "Greenville",
    majorCities: ["Greenville", "Greer", "Mauldin", "Simpsonville"],
    permitRequired: true,
    permitNotes:
      "Building permits for accessory and metal structures are required in unincorporated Greenville County and are submitted online through the eTrakit portal. Pre-engineered metal buildings need signed/sealed design and erection drawings for plan review.",
    setbacks:
      "Varies by zoning district; a site plan showing setbacks from all property lines is required at application.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — many newer Greenville/Greer/Simpsonville subdivisions have HOAs with accessory-structure and material restrictions; rural tracts are largely unrestricted.",
    permitContact: "Greenville County Building Safety: 864-467-5660",
    processTip:
      "Set up your eTrakit account before applying and have the manufacturer's stamped engineering package ready; metal buildings move through review fastest when the foundation/anchorage details are included up front.",
  },
  {
    slug: "spartanburg",
    name: "Spartanburg",
    state: "SC",
    stateName: "South Carolina",
    seat: "Spartanburg",
    majorCities: ["Spartanburg", "Boiling Springs", "Greer", "Duncan"],
    permitRequired: true,
    permitNotes:
      "Spartanburg County requires building permits for accessory and metal structures, handled through the EnerGov Citizen Self Service (CSS) online portal for planning, engineering, and building-codes approvals.",
    setbacks:
      "Varies by zoning district; confirm with Building Codes since portions of the county have limited zoning.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — growth corridors like Boiling Springs and Duncan have HOA-governed neighborhoods; outlying rural areas typically have no HOA.",
    permitContact: "Spartanburg County Building Codes: 864-596-2727",
    processTip:
      "Submit through the CSS portal and ask Building Codes whether your parcel falls in a zoned area first — that one question up front avoids a setback surprise later.",
  },
  {
    slug: "york",
    name: "York",
    state: "SC",
    stateName: "South Carolina",
    seat: "York",
    majorCities: ["Rock Hill", "Fort Mill", "York", "Clover"],
    permitRequired: true,
    permitNotes:
      "Detached accessory structures over 200 sq ft require a building permit in unincorporated York County, applied for and paid online through the county permitting system, with a plat showing setbacks required.",
    setbacks:
      "Varies by zoning; see Zoning Code Sec. 155.058 (Setbacks & Height). A plat labeling distances from all four property lines is required.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — the fast-growing Fort Mill and Rock Hill areas have many HOA communities with strict accessory-building rules; rural western York is more open.",
    permitContact: "York County Permit Services: 803-909-7200",
    processTip:
      "Anything over 200 sq ft needs a permit here, so pull the Residential Accessory Structure Permit Packet and have a stamped plat with all four setbacks marked before you apply.",
  },
  {
    slug: "anderson",
    name: "Anderson",
    state: "SC",
    stateName: "South Carolina",
    seat: "Anderson",
    majorCities: ["Anderson", "Williamston", "Belton", "Pendleton"],
    permitRequired: true,
    permitNotes:
      "Anderson County requires building permits for accessory and metal structures through its Building & Codes Department, with applications handled via the county's online permitting portal.",
    setbacks:
      "Varies by zoning district; portions of the county have limited zoning, so verify setbacks with Building & Codes for your parcel.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — lakefront and newer subdivisions near Lake Hartwell often carry HOA restrictions; much of rural Anderson County is unrestricted.",
    permitContact: "Anderson County Building & Codes: 864-260-4158",
    processTip:
      "Email permitting@andersoncountysc.org with your parcel number first to confirm zoning and setbacks — the county is a mix of zoned and unzoned areas, and that detail drives where your building can sit.",
  },
  {
    slug: "pickens",
    name: "Pickens",
    state: "SC",
    stateName: "South Carolina",
    seat: "Pickens",
    majorCities: ["Easley", "Clemson", "Pickens", "Liberty"],
    permitRequired: true,
    permitNotes:
      "Pickens County requires building permits for accessory and metal structures through its Building Codes Administration; pre-assembled storage buildings used as a residential accessory may be exempt if not served by utilities.",
    setbacks:
      "Varies by zoning; confirm with Building Codes, as some of the county has limited zoning.",
    windZone: "115 mph",
    snowLoad: "12 psf",
    hoaRisk:
      "Moderate — Clemson-area and lake communities commonly have HOAs; the more rural northern county toward the Blue Ridge is generally open.",
    permitContact: "Pickens County Building Codes: 864-898-5950",
    processTip:
      "If your metal building will have power or plumbing it needs a permit, so call Building Codes to confirm utility plans early — that's the line between an exempt shed and a permitted structure here.",
  },
  {
    slug: "cherokee",
    name: "Cherokee",
    state: "SC",
    stateName: "South Carolina",
    seat: "Gaffney",
    majorCities: ["Gaffney", "Blacksburg"],
    permitRequired: true,
    permitNotes:
      "Cherokee County requires building permits for accessory and metal structures through its Building Safety Department, working under the 2021 South Carolina (ICC) code editions.",
    setbacks:
      "Varies by zoning; confirm with the Building Safety / Zoning office, as parts of the county have limited zoning.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Low — Cherokee County is largely rural with few HOA-governed subdivisions outside small pockets near Gaffney.",
    permitContact: "Cherokee County Building Safety: 864-487-2561",
    processTip:
      "Call inspections in before 9 a.m. and you'll usually get same-day service; keep your permit number handy when you call.",
  },
  {
    slug: "lancaster",
    name: "Lancaster",
    state: "SC",
    stateName: "South Carolina",
    seat: "Lancaster",
    majorCities: ["Lancaster", "Indian Land", "Kershaw"],
    permitRequired: true,
    permitNotes:
      "Lancaster County requires a building permit for accessory structures (two sets of construction details), and stand-alone structures also need a separate zoning permit from the county Zoning Department.",
    setbacks:
      "Varies by zoning; the Zoning Department sets accessory-structure setbacks when issuing the zoning permit.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — the booming Indian Land/Panhandle area near Charlotte is full of HOA communities with tight rules; southern rural Lancaster is more open.",
    permitContact: "Lancaster County Building Services: 803-285-1969",
    processTip:
      "Plan for two approvals here — secure the zoning permit (803-416-9777) before or alongside the building permit, since a stand-alone metal building needs both.",
  },
  {
    slug: "charleston",
    name: "Charleston",
    state: "SC",
    stateName: "South Carolina",
    seat: "Charleston",
    majorCities: ["Charleston", "North Charleston", "Mount Pleasant", "Summerville"],
    permitRequired: true,
    permitNotes:
      "Charleston County requires permits for accessory and metal structures through Building Inspection Services, paid via the Customer Self Service (CSS) portal; coastal wind/seismic design criteria and the county Wind/Seismic Map apply.",
    setbacks:
      "Varies by zoning; coastal flood-zone and wind-borne-debris requirements often govern placement and tie-down.",
    windZone: "140 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "High — most Mount Pleasant, Daniel Island, and suburban communities have active HOAs/ARBs, and coastal towns add strict design review on top of county rules.",
    permitContact: "Charleston County Building Inspection Services: 843-202-6930",
    processTip:
      "Coastal wind loads are real here — make sure your metal building's engineering reflects the county Wind/Seismic Map (commonly 140 mph) and proper anchorage, or plan review will bounce it.",
    specialNotes:
      "Coastal high-wind and seismic design criteria apply. Reflect the county Wind/Seismic Map (commonly 140 mph) and proper anchorage in your engineering, and expect flood-zone and wind-borne-debris requirements near the water.",
  },
  {
    slug: "richland",
    name: "Richland",
    state: "SC",
    stateName: "South Carolina",
    seat: "Columbia",
    majorCities: ["Columbia", "Forest Acres", "Blythewood", "Dentsville"],
    permitRequired: true,
    permitNotes:
      "Richland County requires a building permit to build a detached garage or storage building, submitted through the county's eTRAKiT online system.",
    setbacks:
      "Varies by zoning district; confirm accessory-structure setbacks for your zone with Building Inspections.",
    windZone: "115 mph",
    snowLoad: "8 psf",
    hoaRisk:
      "Moderate — Blythewood and many newer Columbia-area subdivisions have HOAs with accessory-building limits; older and rural parcels are less restricted.",
    permitContact: "Richland County One-Call Response Center: 803-929-6000",
    processTip:
      "Apply through the eTRAKiT portal (etrakit.rcgov.us) and confirm your zoning district up front, since detached garages and storage buildings clearly require a permit here.",
  },
  {
    slug: "lexington",
    name: "Lexington",
    state: "SC",
    stateName: "South Carolina",
    seat: "Lexington",
    majorCities: ["Lexington", "West Columbia", "Cayce", "Irmo"],
    permitRequired: true,
    permitNotes:
      "Lexington County requires permits for accessory and metal structures, though one-story detached storage buildings accessory to a one/two-family dwelling may be exempt; a site plan with setbacks is required when a permit applies.",
    setbacks:
      "Varies by zoning; a site plan showing building setbacks must accompany accessory-structure permit applications.",
    windZone: "115 mph",
    snowLoad: "8 psf",
    hoaRisk:
      "Moderate — Lake Murray communities and newer subdivisions near Irmo/Lexington often have HOAs; rural western county parcels are typically unrestricted.",
    permitContact: "Lexington County Building Permits: 803-785-8130",
    processTip:
      "A small detached storage shed may be exempt, but a larger or utility-served metal building isn't — bring a site plan with setbacks to Community Development so they can tell you which side of the line you're on.",
  },
  {
    slug: "horry",
    name: "Horry",
    state: "SC",
    stateName: "South Carolina",
    seat: "Conway",
    majorCities: ["Myrtle Beach", "Conway", "North Myrtle Beach", "Socastee"],
    permitRequired: true,
    permitNotes:
      "Horry County Code Enforcement issues building permits and inspects new construction in the unincorporated county; coastal wind design and wind-borne-debris rules apply, and requirements increase closer to the coast.",
    setbacks:
      "Varies by zoning; coastal flood-zone and wind-borne-debris provisions also affect placement and anchoring.",
    windZone: "140 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "High — the Myrtle Beach/Grand Strand area is dense with HOA and POA communities that regulate or prohibit metal accessory buildings; inland Conway/Aynor areas are more flexible.",
    permitContact: "Horry County Code Enforcement: 843-915-5090",
    processTip:
      "Wind requirements jump as you near the ocean — a building within a mile of mean high water hits the highest zone (up to ~150 mph), so confirm your site's design wind speed with Code Enforcement before ordering steel.",
    specialNotes:
      "Coastal wind speed increases toward the ocean — within a mile of mean high water it can reach ~150 mph. Confirm your site's design wind speed and wind-borne-debris requirements before ordering steel.",
  },
  {
    slug: "greenwood",
    name: "Greenwood",
    state: "SC",
    stateName: "South Carolina",
    seat: "Greenwood",
    majorCities: ["Greenwood", "Ninety Six", "Ware Shoals"],
    permitRequired: true,
    permitNotes:
      "Greenwood County requires building permits for accessory and metal structures through its Building & Code Enforcement office, with an online permitting system that requires an account before applying.",
    setbacks:
      "Varies by zoning; setbacks are set by the county Zoning ordinance (Title 6, Ch. 3) for your district.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Low — Greenwood County is largely rural and small-town; HOA restrictions are limited mostly to a few Lake Greenwood and newer subdivisions.",
    permitContact: "Greenwood County Building & Code Enforcement: 864-942-8424",
    processTip:
      "Create your online permitting account before you apply — Greenwood requires the account first — and check the Title 6 zoning setbacks for your district while you're at it.",
  },

  // ── Virginia ───────────────────────────────────────────────────
  {
    slug: "henry",
    name: "Henry",
    state: "VA",
    stateName: "Virginia",
    seat: "Collinsville",
    majorCities: ["Collinsville", "Bassett", "Ridgeway", "Fieldale"],
    permitRequired: true,
    permitNotes:
      "A building permit from Henry County Building Inspection is required for most metal and accessory structures; permitting follows the Virginia Uniform Statewide Building Code (USBC). Note the city of Martinsville is an independent city and handles its own permitting.",
    setbacks:
      "Varies by zoning district; confirm with the Planning, Zoning & Inspections office before siting.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "Low — predominantly rural and unincorporated; HOA-governed subdivisions are uncommon.",
    permitContact: "Henry County Building Inspection: 276-634-4615",
    processTip:
      "Henry County combines Planning, Zoning and Inspections in one office, so confirm your setback/zoning sign-off and your building permit in the same visit to avoid a second trip.",
  },
  {
    slug: "pittsylvania",
    name: "Pittsylvania",
    state: "VA",
    stateName: "Virginia",
    seat: "Chatham",
    majorCities: ["Chatham", "Gretna", "Hurt", "Brosville"],
    permitRequired: true,
    permitNotes:
      "Pittsylvania County Building Inspections issues building permits for metal and accessory structures and enforces the Virginia Uniform Statewide Building Code (USBC); applications can be submitted in person, by fax, or by email to permits@pittgov.org. The independent city of Danville handles its own permitting separately.",
    setbacks:
      "Varies by zoning district; verify with Community Development before placement.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "Low — largely rural and agricultural; few HOA-governed neighborhoods.",
    permitContact: "Pittsylvania County Building Inspections: 434-432-7755",
    processTip:
      "Check the county's 'Do I Need a Permit' page first — small agricultural-use structures can be treated differently from accessory buildings, which affects whether a permit is required.",
  },
  {
    slug: "patrick",
    name: "Patrick",
    state: "VA",
    stateName: "Virginia",
    seat: "Stuart",
    majorCities: ["Stuart", "Patrick Springs", "Meadows of Dan", "Ararat"],
    permitRequired: true,
    permitNotes:
      "Patrick County Building Inspections issues building permits for accessory and metal structures under the Virginia Uniform Statewide Building Code (USBC). Permit applications can be emailed to the building office in Stuart.",
    setbacks:
      "Varies by zoning; confirm with the Building Inspections office in Stuart before construction.",
    windZone: "115 mph",
    snowLoad: "30 psf",
    hoaRisk:
      "Low — rural Blue Ridge county; HOAs largely limited to a few resort/mountain communities (e.g., near Meadows of Dan).",
    permitContact: "Patrick County Building Inspections: 276-694-4143",
    processTip:
      "Inspection requests are only taken between 8 and 10 a.m., so call early in the day to get on the schedule and avoid bumping your timeline.",
    specialNotes:
      "High Blue Ridge elevations carry heavy snow loads (~30 psf or more by site). Confirm the required ground snow load with Building Inspections before ordering your roof package.",
  },
  {
    slug: "halifax",
    name: "Halifax",
    state: "VA",
    stateName: "Virginia",
    seat: "Halifax",
    majorCities: ["South Boston", "Halifax", "Clover", "Scottsburg"],
    permitRequired: true,
    permitNotes:
      "Halifax County Building Code Enforcement issues building permits for metal and accessory structures and enforces the Virginia Uniform Statewide Building Code (USBC). South Boston, as an incorporated town, may have additional local zoning requirements.",
    setbacks:
      "Varies by zoning district; confirm with Planning & Zoning before siting.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "Low — rural Southside county; HOA-governed subdivisions are uncommon.",
    permitContact: "Halifax County Building Code Enforcement: 434-476-3300",
    processTip:
      "Call ahead (ext. 3304) to confirm your fee total before you come in — Halifax adds the state-mandated 2% USBC levy on top of the local permit fee, so it pays to know the full amount in advance.",
  },
  {
    slug: "carroll",
    name: "Carroll",
    state: "VA",
    stateName: "Virginia",
    seat: "Hillsville",
    majorCities: ["Hillsville", "Cana", "Woodlawn", "Laurel Fork"],
    permitRequired: true,
    permitNotes:
      "Carroll County's Building Official issues permits for metal and accessory structures and enforces the Virginia Uniform Statewide Building Code (USBC), including the state's 2% permit-fee assessment. Galax is an adjacent independent city with separate permitting.",
    setbacks:
      "Varies by zoning; confirm with the Building Official's office in Hillsville before construction.",
    windZone: "115 mph",
    snowLoad: "30 psf",
    hoaRisk:
      "Low — rural Blue Ridge county; few HOA-governed neighborhoods.",
    permitContact: "Carroll County Building Official: 276-730-3016",
    processTip:
      "At higher Blue Ridge elevations the building official may require an engineered design for snow load, so confirm the site-specific ground snow load with the office before ordering a kit.",
    specialNotes:
      "Higher Blue Ridge elevations can require an engineered, site-specific snow load above 30 psf. Confirm the value with the Building Official before ordering a kit.",
  },
  {
    slug: "franklin",
    name: "Franklin",
    state: "VA",
    stateName: "Virginia",
    seat: "Rocky Mount",
    majorCities: ["Rocky Mount", "Boones Mill", "Ferrum", "Smith Mountain Lake"],
    permitRequired: true,
    permitNotes:
      "Franklin County's Department of Building Inspections issues building permits for metal and accessory structures under the Virginia Uniform Statewide Building Code (USBC). Note this is Franklin County (Rocky Mount), distinct from the independent city of Franklin in southeastern Virginia.",
    setbacks:
      "Varies by zoning district; verify with Building Inspections in Rocky Mount before siting.",
    windZone: "115 mph",
    snowLoad: "25 psf",
    hoaRisk:
      "Moderate — generally rural, but Smith Mountain Lake communities frequently carry HOA covenants and architectural review.",
    permitContact: "Franklin County Building Inspections: 540-483-3047",
    processTip:
      "If your site is near Smith Mountain Lake, check for HOA architectural-review approval before applying — county permits and HOA sign-off are separate, and the HOA step is the one most often missed.",
  },
  {
    slug: "bedford",
    name: "Bedford",
    state: "VA",
    stateName: "Virginia",
    seat: "Bedford",
    majorCities: ["Bedford", "Forest", "Moneta", "Huddleston"],
    permitRequired: true,
    permitNotes:
      "Bedford County's Division of Building Inspections (within Community Development) issues permits for metal and accessory structures under the Virginia Uniform Statewide Building Code (USBC); inspections can be scheduled through the online Citizen Self-Service (CSS) portal.",
    setbacks:
      "Varies by zoning district; confirm with Community Development before construction.",
    windZone: "115 mph",
    snowLoad: "25 psf",
    hoaRisk:
      "Moderate — Forest and Smith Mountain Lake (Moneta) areas include HOA-governed subdivisions; outlying areas are largely rural.",
    permitContact: "Bedford County Community Development: 540-586-7616",
    processTip:
      "New permit applications stop being accepted at 4 p.m. even though the office is open until 4:30 — submit earlier in the day, and use the CSS portal to schedule inspections.",
  },
  {
    slug: "roanoke",
    name: "Roanoke",
    state: "VA",
    stateName: "Virginia",
    seat: "Salem",
    majorCities: ["Cave Spring", "Hollins", "Vinton", "Salem"],
    permitRequired: true,
    permitNotes:
      "Roanoke County's Office of Building Safety issues permits for metal and accessory structures and enforces the Virginia Uniform Statewide Building Code (USBC), with an online Public Access Portal for applications. The city of Roanoke and the city of Salem are independent cities that permit separately from the county.",
    setbacks:
      "Varies by zoning district; confirm with Building Safety / Planning before siting.",
    windZone: "115 mph",
    snowLoad: "25 psf",
    hoaRisk:
      "Moderate — suburban areas like Cave Spring and Hollins include established HOA subdivisions.",
    permitContact: "Roanoke County Office of Building Safety: 540-772-2065",
    processTip:
      "Use the county's Public Access Portal to apply and track your permit online, and confirm up front whether your address is in the county versus the city of Roanoke or Salem — they are separate jurisdictions.",
  },
  {
    slug: "montgomery",
    name: "Montgomery",
    state: "VA",
    stateName: "Virginia",
    seat: "Christiansburg",
    majorCities: ["Blacksburg", "Christiansburg", "Riner", "Shawsville"],
    permitRequired: true,
    permitNotes:
      "Montgomery County's Building Permits & Inspections office issues permits for metal and accessory structures under the Virginia Uniform Statewide Building Code (USBC). The towns of Blacksburg and Christiansburg administer their own zoning, so a structure inside town limits may have added requirements.",
    setbacks:
      "Varies by zoning; a separate zoning permit may be needed in addition to the building permit — confirm with the county.",
    windZone: "115 mph",
    snowLoad: "25 psf",
    hoaRisk:
      "Moderate — Blacksburg/Christiansburg suburban subdivisions commonly have HOAs; rural areas (Riner, Shawsville) less so.",
    permitContact: "Montgomery County Building Inspections: 540-382-5750",
    processTip:
      "Call about 36 hours ahead to schedule inspections — the office advises this due to workload — and check whether your parcel needs a separate zoning permit alongside the building permit.",
  },
  {
    slug: "chesterfield",
    name: "Chesterfield",
    state: "VA",
    stateName: "Virginia",
    seat: "Chesterfield",
    majorCities: ["Midlothian", "Chester", "Bon Air", "Matoaca"],
    permitRequired: true,
    permitNotes:
      "Chesterfield County's Department of Building Inspection issues permits for metal and accessory structures and enforces the Virginia Uniform Statewide Building Code (currently the 2021 edition), with online permit and inspection services available. An 18-inch frost depth applies to footings.",
    setbacks:
      "Varies by zoning district; verify with Building Inspection / Planning before siting.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "High — a heavily suburban county where most subdivisions (Midlothian, Chester, Bon Air) are HOA-governed with architectural controls.",
    permitContact: "Chesterfield County Building Inspection: 804-748-1057",
    processTip:
      "Apply through the county's online permit portal, and budget for HOA architectural-review approval first — in Chesterfield's suburban neighborhoods that step is almost always required and is separate from the county permit.",
  },
  {
    slug: "campbell",
    name: "Campbell",
    state: "VA",
    stateName: "Virginia",
    seat: "Rustburg",
    majorCities: ["Rustburg", "Altavista", "Brookneal", "Concord"],
    permitRequired: true,
    permitNotes:
      "Campbell County's Community Development (Permits & Inspections) office issues building permits for metal and accessory structures under the Virginia Uniform Statewide Building Code (USBC); the county publishes local design criteria for structural loads. The independent city of Lynchburg borders the county and permits separately.",
    setbacks:
      "Varies by zoning district; confirm with Community Development before construction.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "Low — mostly rural with some HOA subdivisions near the Lynchburg/Forest fringe.",
    permitContact: "Campbell County Community Development: 434-332-9596",
    processTip:
      "Review the county's published Design Criteria page before ordering a building so your engineering package matches the local snow, wind, and frost-depth values the inspector will check against.",
  },
  {
    slug: "grayson",
    name: "Grayson",
    state: "VA",
    stateName: "Virginia",
    seat: "Independence",
    majorCities: ["Independence", "Fries", "Troutdale", "Whitetop"],
    permitRequired: true,
    permitNotes:
      "Grayson County's Building Department issues permits for metal and accessory structures under the Virginia Uniform Statewide Building Code (USBC) and also covers the towns of Independence, Fries, and Troutdale. Galax is an adjacent independent city with its own permitting.",
    setbacks:
      "Varies by zoning; confirm with the Building Department in Independence before siting.",
    windZone: "115 mph",
    snowLoad: "30 psf",
    hoaRisk:
      "Low — sparsely populated high-elevation county; HOA-governed neighborhoods are rare.",
    permitContact: "Grayson County Building Department: 276-773-2322",
    processTip:
      "This is one of Virginia's highest, snowiest counties (near Mount Rogers/Whitetop), so confirm the required ground snow load with the Building Department up front — high-elevation sites can demand a stronger roof design than a standard piedmont kit.",
    specialNotes:
      "One of Virginia's highest, snowiest counties (near Mount Rogers/Whitetop). High-elevation sites can require a stronger roof design than 30 psf — confirm the ground snow load before ordering.",
  },

  // ── Georgia ────────────────────────────────────────────────────
  {
    slug: "rabun",
    name: "Rabun",
    state: "GA",
    stateName: "Georgia",
    seat: "Clayton",
    majorCities: ["Clayton", "Tiger", "Dillard", "Sky Valley"],
    permitRequired: true,
    permitNotes:
      "Rabun County requires a building permit for accessory structures, handled through the Planning & Zoning office; the county adopted zoning (Code Ch. 56) so a site plan showing setbacks and any water bodies is required. Land-disturbance review can also apply on the steep mountain lots common here.",
    setbacks:
      "Varies by zoning district; site plan with property-line and water-body setbacks required at application.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — many mountain and Sky Valley resort/lake subdivisions carry HOA covenants, though rural acreage often does not.",
    permitContact: "Rabun County Planning & Zoning: 706-782-1579",
    processTip:
      "Bring a recorded plat and a site plan marking setbacks up front — on Rabun's sloped lots the office often flags grading/erosion control before issuing, so addressing it early saves a trip.",
  },
  {
    slug: "towns",
    name: "Towns",
    state: "GA",
    stateName: "Georgia",
    seat: "Hiawassee",
    majorCities: ["Hiawassee", "Young Harris"],
    permitRequired: true,
    permitNotes:
      "Towns County requires a building permit for new structures under Code Ch. 10, Article V, issued through the county building department; this rural mountain county has historically lighter countywide zoning than metro counties. Properties inside Hiawassee city limits permit through City Hall instead.",
    setbacks:
      "Set at the building-permit/site-plan stage; confirm with the county building department for your parcel.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — Lake Chatuge and mountain-view subdivisions around Hiawassee and Young Harris commonly have covenants, but open rural tracts often have none.",
    permitContact: "Towns County Building Department: townscountyga.org",
    processTip:
      "If your site is just outside Hiawassee, confirm whether you fall under county or city jurisdiction before applying — it determines whether you file at the county building office or city hall.",
  },
  {
    slug: "union",
    name: "Union",
    state: "GA",
    stateName: "Georgia",
    seat: "Blairsville",
    majorCities: ["Blairsville", "Suches"],
    permitRequired: true,
    permitNotes:
      "Union County's Building & Development Department issues building permits for accessory structures and conducts inspections; a recorded plat plus a site plan showing setbacks from property lines and any water bodies is required (Code Ch. 18). Land-disturbance permits may also apply.",
    setbacks:
      "Varies by zoning district; recorded plat and site plan with property-line/water setbacks required at application.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — Blairsville-area lake and mountain subdivisions often carry covenants, while larger rural parcels frequently do not.",
    permitContact: "Union County Building & Development: 706-439-6045",
    processTip:
      "Have your recorded plat ready before you visit at 46 Hughes Street — the department won't issue without it, and the office closes for lunch from noon to 12:30.",
  },
  {
    slug: "habersham",
    name: "Habersham",
    state: "GA",
    stateName: "Georgia",
    seat: "Clarkesville",
    majorCities: ["Clarkesville", "Cornelia", "Demorest", "Baldwin"],
    permitRequired: true,
    permitNotes:
      "Habersham County requires building permits for accessory structures through the Planning & Development / Building Department (Code Ch. 14); the zoning code addresses accessory structures and setbacks but does not separately spell out ADUs, so confirm your plan with Planning. Permits can be initiated in person or by contacting building staff.",
    setbacks:
      "Varies by zoning district; confirm accessory-structure setbacks with the Planning office for your parcel.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Low — much of Habersham is rural/agricultural with limited covenant communities, though some lake and newer subdivisions have HOAs.",
    permitContact: "Habersham County Planning & Development: 706-754-1740",
    processTip:
      "Call the Planning office at 451 Roper Drive first to confirm setbacks and whether your specific structure triggers a review — it prevents resubmittals on the accessory packet.",
  },
  {
    slug: "white",
    name: "White",
    state: "GA",
    stateName: "Georgia",
    seat: "Cleveland",
    majorCities: ["Cleveland", "Helen", "Sautee Nacoochee"],
    permitRequired: true,
    permitNotes:
      "White County requires a building permit for accessory structures through the Building Department under Community & Economic Development; setbacks are part of the minimum development standards in the zoning ordinance. Properties inside Cleveland or Helen city limits permit through the respective city.",
    setbacks:
      "Varies by zoning district per the minimum development standards in the county zoning ordinance.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — resort and cabin subdivisions around Helen and Sautee often carry covenants; open rural tracts generally do not.",
    permitContact: "White County Building Department: 706-865-6496",
    processTip:
      "Verify your zoning classification with the office at 1241 Helen Highway before submitting — White's setbacks key directly off zoning, so knowing your district up front pins down placement.",
  },
  {
    slug: "hall",
    name: "Hall",
    state: "GA",
    stateName: "Georgia",
    seat: "Gainesville",
    majorCities: ["Gainesville", "Flowery Branch", "Oakwood", "Clermont"],
    permitRequired: true,
    permitNotes:
      "Hall County requires building permits for accessory structures through the Building Inspections Division, with applications via the Accela Citizen Access online portal or in person. A recorded plat, deed copy, contractor/business license, and septic documents (if applicable) are required.",
    setbacks:
      "Varies by zoning district; per the county zoning ordinance and approved site plan.",
    windZone: "115 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "Moderate — Lake Lanier and the fast-growing south-county subdivisions near Flowery Branch and Oakwood frequently have HOAs.",
    permitContact: "Hall County Building Inspections: 770-531-6809",
    processTip:
      "Use the Accela Citizen Access portal and have your recorded plat and deed ready — even small accessory buildings with utilities require them, so assembling the packet first speeds approval.",
  },
  {
    slug: "cherokee",
    name: "Cherokee",
    state: "GA",
    stateName: "Georgia",
    seat: "Canton",
    majorCities: ["Canton", "Woodstock", "Holly Springs", "Ball Ground"],
    permitRequired: true,
    permitNotes:
      "Cherokee County requires building permits for accessory structures through the Development Service Center, with online submittal and inspection scheduling via the CityView portal. Detached accessory storage buildings under 200 sq ft may be exempt from the building permit, but setbacks and erosion control still apply (Zoning Ord. Sec. 5.6).",
    setbacks:
      "Per Zoning Ordinance Sec. 5.6; varies by district, with height/size/location limits on accessory structures.",
    windZone: "115 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "High — Cherokee is a fast-growing metro-Atlanta county where most Woodstock, Canton, and Holly Springs subdivisions are HOA-governed with covenant restrictions on outbuildings.",
    permitContact: "Cherokee County Building Inspections: 678-493-6220",
    processTip:
      "Even if your building is under 200 sq ft and permit-exempt, call the Development Service Center first to confirm setbacks and erosion control — and check your HOA covenants, which here are often stricter than county code.",
  },
  {
    slug: "forsyth",
    name: "Forsyth",
    state: "GA",
    stateName: "Georgia",
    seat: "Cumming",
    majorCities: ["Cumming", "Suwanee", "Coal Mountain"],
    permitRequired: true,
    permitNotes:
      "Forsyth County requires building permits for accessory structures through the Department of Building & Licensing (Code Ch. 18). Accessory buildings may encroach up to 50% into required front/rear setbacks in residential/agricultural/mixed-use districts, and height cannot exceed the principal building.",
    setbacks:
      "Varies by zoning district; accessory structures may encroach up to 50% of the required front/rear setback per UDC standards.",
    windZone: "115 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "High — Forsyth is one of Georgia's fastest-growing counties and the great majority of subdivisions near Cumming and Lake Lanier are HOA-controlled with covenant limits on outbuildings.",
    permitContact: "Forsyth County Building & Licensing: 770-781-2114",
    processTip:
      "Confirm your zoning district's setback and whether the 50% accessory encroachment applies before finalizing placement — and clear the design with your HOA, which in Forsyth typically governs metal-building appearance.",
  },
  {
    slug: "bartow",
    name: "Bartow",
    state: "GA",
    stateName: "Georgia",
    seat: "Cartersville",
    majorCities: ["Cartersville", "Adairsville", "Emerson", "Euharlee"],
    permitRequired: true,
    permitNotes:
      "Bartow County requires building permits for accessory structures through Building Inspections under Community Development, using a Residential Accessory Building permit application submitted by email. Setback and zoning questions are handled by the separate Planning & Zoning office.",
    setbacks:
      "Varies by zoning district; confirm with Planning & Zoning for your parcel.",
    windZone: "115 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "Moderate — newer Cartersville and Emerson subdivisions carry HOAs, but much of Bartow remains rural/agricultural without covenants.",
    permitContact: "Bartow County Building Inspections: 770-387-5005",
    processTip:
      "Submit the Residential Accessory Building application by email to permits@bartowcountyga.gov, but call Planning & Zoning at 770-387-5067 first if you're unsure of your setbacks — they're a separate office from Inspections.",
  },
  {
    slug: "floyd",
    name: "Floyd",
    state: "GA",
    stateName: "Georgia",
    seat: "Rome",
    majorCities: ["Rome", "Cave Spring", "Lindale"],
    permitRequired: true,
    permitNotes:
      "Floyd County requires building permits for accessory structures (including detached garages and storage buildings) through the joint Rome-Floyd County Building Inspection Department. Required setbacks are confirmed via the Zoning Department's zoning verification, which is a separate office.",
    setbacks:
      "Varies by zoning district; confirmed through Rome-Floyd zoning verification for the parcel.",
    windZone: "115 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "Low — Floyd is largely rural/agricultural around Rome with relatively few covenant subdivisions.",
    permitContact: "Rome-Floyd County Building Inspection: 706-236-4481",
    processTip:
      "Get a zoning verification from the Zoning Department (706-236-4675) confirming your setbacks before applying for the structure permit — Inspections and Zoning are separate desks at 607 Broad Street.",
  },
  {
    slug: "whitfield",
    name: "Whitfield",
    state: "GA",
    stateName: "Georgia",
    seat: "Dalton",
    majorCities: ["Dalton", "Tunnel Hill", "Varnell", "Cohutta"],
    permitRequired: true,
    permitNotes:
      "Whitfield County requires building permits for accessory structures through the Building Inspection Department, with a standard application for residential, commercial, and accessory work. The zoning office researches the deed/tax card and requires property lines and the proposed structure location to be marked before approval.",
    setbacks:
      "Varies by zoning classification, road adjacency, and any zoning conditions; see Unified Zoning Ordinance Chart 3-7.",
    windZone: "115 mph",
    snowLoad: "5 psf",
    hoaRisk:
      "Low — Whitfield is largely rural and small-town around Dalton, with relatively few HOA-governed subdivisions.",
    permitContact: "Whitfield County Building Inspection: 706-275-7474",
    processTip:
      "Mark your property lines and the structure's planned location before applying — Whitfield's zoning office verifies placement against the deed, so staking it saves a return visit.",
  },
  {
    slug: "gilmer",
    name: "Gilmer",
    state: "GA",
    stateName: "Georgia",
    seat: "Ellijay",
    majorCities: ["Ellijay", "East Ellijay", "Cherry Log"],
    permitRequired: true,
    permitNotes:
      "Gilmer County permits and inspects all phases of construction including accessory structures through the Planning & Zoning Department (Code Ch. 66). Properties inside Ellijay city limits permit through the City of Ellijay instead.",
    setbacks:
      "Varies by zoning district; confirm accessory-structure setbacks with Planning & Zoning for your parcel.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — Cherry Log and the many mountain-cabin and resort subdivisions around Ellijay commonly carry covenants, while rural acreage often does not.",
    permitContact: "Gilmer County Planning & Zoning: 706-635-3406",
    processTip:
      "Confirm whether your parcel is county or City of Ellijay jurisdiction before applying — in-city properties permit through the city (706-635-4711), and the offices are separate.",
  },

  // ── Tennessee ──────────────────────────────────────────────────
  {
    slug: "knox",
    name: "Knox",
    state: "TN",
    stateName: "Tennessee",
    seat: "Knoxville",
    majorCities: ["Knoxville", "Farragut", "Powell", "Halls"],
    permitRequired: true,
    permitNotes:
      "Knox County Codes Administration issues building permits for accessory structures; one-story detached buildings under 120 sq ft are exempt from a building permit but must still meet zoning. Detached accessory structures are capped at 3,000 sq ft and 2 stories. Online permitting is available.",
    setbacks:
      "Varies by zoning district; verify with Codes Administration and zoning before placement.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — many West Knox/Farragut subdivisions have active HOAs with their own accessory-structure rules; rural tracts mostly do not.",
    permitContact: "Knox County Codes Administration: 865-215-2325",
    processTip:
      "A site plan showing the structure's distance to property lines, septic, and easements is expected up front; bringing one to your first visit avoids a return trip.",
  },
  {
    slug: "sevier",
    name: "Sevier",
    state: "TN",
    stateName: "Tennessee",
    seat: "Sevierville",
    majorCities: ["Sevierville", "Pigeon Forge", "Gatlinburg", "Seymour"],
    permitRequired: true,
    permitNotes:
      "Sevier County Building Inspections requires a permit for all new construction including accessory structures, additions, and remodels; the county moved to online permitting in 2023. A separate Short-Term Rental Unit program applies to cabins used as rentals.",
    setbacks:
      "Varies by zoning; confirm with Building Inspections, and note tighter rules near floodways and in resort/overlay areas.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "High — heavy cabin/resort development means many parcels sit in HOAs or rental-community covenants that restrict outbuildings; verify your deed.",
    permitContact: "Sevier County Fire Prevention / Permitting: 865-774-3603",
    processTip:
      "Higher-elevation mountain lots can carry larger snow and site-specific structural loads than the valley floor, so confirm the design criteria for your exact elevation before ordering steel.",
    specialNotes:
      "Higher-elevation mountain lots carry larger, site-specific snow and structural loads than the valley floor. Confirm the design criteria for your exact elevation before ordering steel.",
  },
  {
    slug: "blount",
    name: "Blount",
    state: "TN",
    stateName: "Tennessee",
    seat: "Maryville",
    majorCities: ["Maryville", "Alcoa", "Townsend", "Friendsville"],
    permitRequired: true,
    permitNotes:
      "Blount County Development Services accepts applications for all construction permits, collects fees, issues permits, and schedules inspections for accessory structures.",
    setbacks:
      "Varies by zoning district; verify with Development Services before siting.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — newer Maryville/Alcoa subdivisions often have HOAs; rural foothill parcels toward Townsend generally do not.",
    permitContact: "Blount County Development Services: 865-681-9301",
    processTip:
      "Development Services handles permits, fees, and inspection scheduling in one office, so coordinate your site plan and inspection timeline with them early to keep the build on schedule.",
  },
  {
    slug: "sullivan",
    name: "Sullivan",
    state: "TN",
    stateName: "Tennessee",
    seat: "Blountville",
    majorCities: ["Kingsport", "Bristol", "Blountville", "Bluff City"],
    permitRequired: true,
    permitNotes:
      "Sullivan County Planning & Codes requires building permits for accessory structures including carports, garages, storage buildings, gazebos, decks, and roofs. The county enforces the 2018 IRC and 2018 energy code.",
    setbacks:
      "Varies by zoning district per the county zoning resolution; verify with Planning & Codes.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — established Kingsport/Bristol neighborhoods may have covenants; much of the rural county does not.",
    permitContact: "Sullivan County Planning & Codes: 423-323-6440",
    processTip:
      "Because this is in the upper-East-TN seismic zone, confirm the seismic and anchorage details with Planning & Codes so your foundation and base plates meet local requirements.",
  },
  {
    slug: "washington",
    name: "Washington",
    state: "TN",
    stateName: "Tennessee",
    seat: "Jonesborough",
    majorCities: ["Johnson City", "Jonesborough", "Gray"],
    permitRequired: true,
    permitNotes:
      "The Washington County Zoning, Planning & Building Codes office issues zoning-compliance and building permits for accessory structures; a site plan/plot plan is required with the application.",
    setbacks:
      "Varies by zoning district; the zoning office reviews setback compliance as part of the permit.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Moderate — newer Johnson City/Gray subdivisions often have HOAs; older town and rural parcels typically do not.",
    permitContact: "Washington County Zoning, Planning & Building Codes: 423-753-1753",
    processTip:
      "Submit a clear plot plan showing the structure relative to property lines and any easements with your application, since the zoning office checks compliance before issuing the permit.",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    state: "TN",
    stateName: "Tennessee",
    seat: "Chattanooga",
    majorCities: ["Chattanooga", "East Ridge", "Soddy-Daisy", "Collegedale"],
    permitRequired: true,
    permitNotes:
      "Hamilton County Building Inspection requires a permit for any new structure, alteration, or addition. Storage buildings 10' x 20' or smaller with no plumbing or electrical are exempt. Properties inside city limits permit through the relevant municipality.",
    setbacks:
      "Varies by zoning district; confirm with Building Inspection / Development Services before placement.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — many suburban and master-planned communities (Collegedale, Ooltewah) have HOAs; older Chattanooga and rural areas vary.",
    permitContact: "Hamilton County Building Inspection: 423-209-7860",
    processTip:
      "Confirm first whether your parcel is in unincorporated county or inside a city, since that determines whether you permit with Hamilton County or the municipality.",
  },
  {
    slug: "bradley",
    name: "Bradley",
    state: "TN",
    stateName: "Tennessee",
    seat: "Cleveland",
    majorCities: ["Cleveland", "Charleston", "McDonald"],
    permitRequired: true,
    permitNotes:
      "Bradley County Building Inspections, under the Planning Office, issues residential and accessory-structure permits and enforces the adopted 2018 international codes. Permits are obtained at the Planning & Inspections office at the Courthouse Annex.",
    setbacks:
      "Varies by zoning district per the Bradley County zoning resolution; verify with the Planning Office.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Moderate — newer Cleveland subdivisions may have covenants; rural parcels generally do not.",
    permitContact: "Bradley County Building Inspections: 423-728-7106",
    processTip:
      "Permit packets and forms can be emailed to the Planning Office in advance, which speeds up your counter visit when you go to pay and pull the permit.",
  },
  {
    slug: "cocke",
    name: "Cocke",
    state: "TN",
    stateName: "Tennessee",
    seat: "Newport",
    majorCities: ["Newport", "Parrottsville", "Cosby"],
    permitRequired: true,
    permitNotes:
      "Cocke County has no local building-permit program; residential building permits are issued by the TN State Fire Marshal's Office (Dept of Commerce & Insurance). The county does require a zoning/floodplain development permit through its Zoning Department before building.",
    setbacks:
      "Varies by zoning district; the county Zoning Department reviews placement and floodplain compliance.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "Low — predominantly rural county with few HOAs, though some cabin developments near the Smokies carry covenants.",
    permitContact: "Cocke County Zoning Department: 423-237-7600",
    processTip:
      "Clear local zoning/floodplain approval with the county first, then obtain the state building permit from the TN State Fire Marshal — handling both in that order prevents rework.",
    specialNotes:
      "No local building-permit program — residential building permits come from the TN State Fire Marshal's Office (615-741-7170), while the county handles zoning/floodplain. Plan for two separate approvals.",
  },
  {
    slug: "greene",
    name: "Greene",
    state: "TN",
    stateName: "Tennessee",
    seat: "Greeneville",
    majorCities: ["Greeneville", "Tusculum", "Mosheim"],
    permitRequired: true,
    permitNotes:
      "Greene County's Building Commissioner enforces the zoning regulations and issues building permits for accessory structures; doing work before the permit is issued doubles the fee. Applications require the 911 address and a site plan/sketch with dimensions.",
    setbacks:
      "Varies by zoning district per the Greene County zoning resolution; verify with the Building Commissioner.",
    windZone: "115 mph",
    snowLoad: "15 psf",
    hoaRisk:
      "Low — largely rural and agricultural county with relatively few HOAs.",
    permitContact: "Greene County Zoning / Building Commissioner: 423-798-1724",
    processTip:
      "Pull the permit before any site work begins — Greene County doubles the permit fee for construction started without one.",
  },
  {
    slug: "carter",
    name: "Carter",
    state: "TN",
    stateName: "Tennessee",
    seat: "Elizabethton",
    majorCities: ["Elizabethton", "Watauga", "Roan Mountain"],
    permitRequired: true,
    permitNotes:
      "The Carter County Planning Office reviews and administers residential building permits including accessory structures, alongside zoning, subdivision, and critical-area regulations. Building-permit counter hours are limited to mornings.",
    setbacks:
      "Varies by zoning district; confirmed by the Planning Office at permit review.",
    windZone: "115 mph",
    snowLoad: "20 psf",
    hoaRisk:
      "Low — mostly rural county; few HOAs outside some lake and mountain developments.",
    permitContact: "Carter County Planning Office: 423-518-4103",
    processTip:
      "Building permits are typically issued only during morning hours, so plan your visit early; higher-elevation sites near Roan Mountain carry heavier snow loads to design for.",
    specialNotes:
      "Higher-elevation sites near Roan Mountain carry heavier snow loads than the 20 psf valley value. Confirm the design snow load for your elevation before ordering your roof package.",
  },
  {
    slug: "davidson",
    name: "Davidson",
    state: "TN",
    stateName: "Tennessee",
    seat: "Nashville",
    majorCities: ["Nashville", "Belle Meade", "Goodlettsville", "Antioch"],
    permitRequired: true,
    permitNotes:
      "Metro Nashville Department of Codes and Building Safety requires a permit for detached accessory structures (garages, sheds, pole barns, carports, pool houses). Applications need a site plan with distances to property lines, elevations, and floor plans; e-permits are available.",
    setbacks:
      "Varies by zoning district; the Zoning Help Desk reviews accessory-structure placement and coverage limits.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "High — extensive HOA and historic/overlay-district coverage across Metro Nashville frequently restricts outbuildings.",
    permitContact: "Metro Codes Zoning Help Desk: 615-862-6510",
    processTip:
      "Check your parcel for historic, urban-design, or contextual overlays at the Zoning Help Desk first — overlays in Davidson County can change what's allowed and add design review.",
  },
  {
    slug: "rutherford",
    name: "Rutherford",
    state: "TN",
    stateName: "Tennessee",
    seat: "Murfreesboro",
    majorCities: ["Murfreesboro", "Smyrna", "La Vergne", "Eagleville"],
    permitRequired: true,
    permitNotes:
      "Rutherford County Building Codes requires a permit for accessory structures; one-story detached storage buildings 120 sq ft or smaller with no concrete foundation are exempt, but anything 120 sq ft or larger or on a permanent foundation needs a permit. A plot plan is required and structures can't sit in easements.",
    setbacks:
      "Varies by zoning; accessory structures must meet the minimum setback from property lines and avoid drainage/utility easements.",
    windZone: "115 mph",
    snowLoad: "10 psf",
    hoaRisk:
      "High — one of TN's fastest-growing counties with extensive HOA-governed subdivisions in Murfreesboro, Smyrna, and La Vergne.",
    permitContact: "Rutherford County Building Codes: 615-898-7734",
    processTip:
      "Bring a plot plan showing the building relative to the septic system, existing structures, property lines, and easements — applications without one won't be accepted.",
  },

  // ── Hawaii ─────────────────────────────────────────────────────
  {
    slug: "honolulu",
    name: "Honolulu",
    state: "HI",
    stateName: "Hawaii",
    seat: "Honolulu",
    majorCities: ["Honolulu", "Kailua", "Kaneohe", "Kapolei"],
    permitRequired: true,
    permitNotes:
      "Building permit required for all new structures. Submit through the Department of Planning and Permitting (DPP). Online permitting available through the city's eBUILD system.",
    setbacks:
      "Varies by zoning district. Residential zones typically require 5-20 ft setbacks. Verify with DPP before purchasing land.",
    windZone: "105-130 mph depending on location and elevation",
    snowLoad: "N/A — no snow load requirement",
    hoaRisk: "High — many Oahu subdivisions have active HOAs",
    permitContact: "Honolulu Department of Planning and Permitting: 808-768-8000",
    processTip:
      "Honolulu has one of the most complex permitting processes in Hawaii. Budget extra time — plan review can take 3-6 months for new structures. Hire a local expediter if timeline matters.",
    specialNotes:
      "Salt air and high humidity environment — specify corrosion-resistant coatings. High wind zone on north and east shores.",
  },
  {
    slug: "maui",
    name: "Maui",
    state: "HI",
    stateName: "Hawaii",
    seat: "Wailuku",
    majorCities: ["Kahului", "Wailuku", "Lahaina", "Kihei"],
    permitRequired: true,
    permitNotes:
      "Building permit required through Maui County Department of Public Works. Permits required for all new structures regardless of size.",
    setbacks:
      "Varies by zoning district and island location. Agricultural zones may have more flexibility.",
    windZone: "110-130 mph — higher on exposed ridges and coastal areas",
    snowLoad: "N/A at sea level — snow possible above 10,000 ft on Haleakala only",
    hoaRisk: "Moderate — common in resort areas and planned communities",
    permitContact: "Maui County Department of Public Works: 808-270-7745",
    processTip:
      "Agricultural zoning is common on Maui — verify your parcel's zoning before designing. AG-zoned properties have different use and setback rules than residential.",
    specialNotes:
      "Wind exposure varies dramatically by location. Kihei and south Maui are drier — north shore and upcountry have more rainfall. Design accordingly.",
  },
  {
    slug: "hawaii-county",
    name: "Hawaii County",
    state: "HI",
    stateName: "Hawaii",
    seat: "Hilo",
    majorCities: ["Hilo", "Kailua-Kona", "Waimea", "Pahoa"],
    permitRequired: true,
    permitNotes:
      "Building permit required through Hawaii County Department of Public Works. The Big Island has the most agricultural land of any Hawaiian island — AG zoning is very common.",
    setbacks:
      "Varies by zone. Agricultural zones often allow more flexibility than residential.",
    windZone: "105-120 mph — higher on exposed Kohala and Kona coasts",
    snowLoad: "N/A at sea level",
    hoaRisk: "Low to Moderate — less common than Oahu but exists in resort subdivisions",
    permitContact: "Hawaii County Department of Public Works: 808-961-8321",
    processTip:
      "Hawaii County is the most DIY-friendly island for steel building projects. Large agricultural lots, flexible AG zoning, and fewer HOA restrictions make it the easiest permit environment in the state.",
    specialNotes:
      "Lava zone designation matters — check your property's lava zone (1-9) before purchasing. Zones 1-2 may affect insurability and financing. Volcanic air (vog) and laze near active vents require additional corrosion protection.",
  },
  {
    slug: "kauai",
    name: "Kauai",
    state: "HI",
    stateName: "Hawaii",
    seat: "Lihue",
    majorCities: ["Lihue", "Kapaa", "Princeville", "Waimea"],
    permitRequired: true,
    permitNotes:
      "Building permit required through Kauai County Department of Public Works. Kauai has strict environmental and visual impact regulations.",
    setbacks:
      "Varies by zone. Coastal setbacks are strictly enforced — Special Management Area (SMA) rules apply near shorelines.",
    windZone: "110-130 mph — highest wind exposure of all major islands",
    snowLoad: "N/A",
    hoaRisk: "Moderate",
    permitContact: "Kauai County Department of Public Works: 808-241-4864",
    processTip:
      "Kauai has the strictest environmental review process in Hawaii. If your property is near the coast or in a Special Management Area, expect additional review time and requirements. Start permit process early.",
    specialNotes:
      "Kauai receives the most rainfall in Hawaii — drainage and foundation design are critical. North shore gets 400+ inches of rain per year in some areas. Specify enhanced corrosion protection for all hardware.",
  },
];

// ── Lookups & helpers ────────────────────────────────────────────

export function countiesByState(state: StateCode): CountyPermit[] {
  return COUNTIES.filter((c) => c.state === state);
}

export function getCounty(state: string, slug: string): CountyPermit | undefined {
  const code = state.toUpperCase();
  return COUNTIES.find((c) => c.state === code && c.slug === slug);
}

/** All { state, county } slug pairs for static generation. State is lowercased for URLs. */
export function allCountyParams(): { state: string; county: string }[] {
  return COUNTIES.map((c) => ({ state: c.state.toLowerCase(), county: c.slug }));
}

export function stateName(code: StateCode): string {
  return STATES.find((s) => s.code === code)?.name ?? code;
}

/** Leading-word HOA tone for chips/dots. */
export function hoaTone(hoa: string): { dot: string; chip: string; label: string } {
  const leading = hoa.trim().split(/[\s—-]/)[0].toLowerCase();
  if (leading === "high") {
    return {
      dot: "bg-amber-500",
      chip: "bg-amber-50 text-amber-900 border-amber-300",
      label: "High",
    };
  }
  if (leading === "moderate") {
    return {
      dot: "bg-yellow-400",
      chip: "bg-yellow-50 text-yellow-900 border-yellow-300",
      label: "Moderate",
    };
  }
  return {
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-900 border-emerald-300",
    label: "Low",
  };
}

export function extractPhone(s: string): string | null {
  const match = s.match(/(\d{3})[-.\s](\d{3})[-.\s](\d{4})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

export function extractDomain(s: string): string | null {
  const match = s.match(/([a-z0-9-]+\.(?:gov|org|com|us))/i);
  return match ? match[1] : null;
}

export function extractEmail(s: string): string | null {
  const match = s.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  return match ? match[0] : null;
}
