"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pdf } from "@react-pdf/renderer";
import { QuotePDF } from "./QuotePDF";

type Consultant = {
  name: string;
  phone: string;
  email: string;
};

const CONSULTANTS: Record<string, Consultant> = {
  alex: {
    name: "Alex Esposito",
    phone: "(919) 219-6199",
    email: "aairecollective@gmail.com",
  },
  chris: {
    name: "Chris Page",
    phone: "(919) 219-6199",
    email: "aairecollective@gmail.com",
  },
};

type QuoteData = {
  // Header
  quoteNumber: string;
  date: string;
  buildingType: string;
  consultant: "alex" | "chris";

  // Customer
  customerName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;

  // Building Dimensions
  width: string;
  length: string;
  eaveHeight: string;
  roofPitch: string;

  // Loads
  windSpeed: string;
  groundSnow: string;
  collateralLoad: string;
  style: string;
  trussType: string;

  // Stamped Plans
  buildingPlans: string;
  foundationPlans: string;
  buildingTypeWood: string;

  // Colors
  roofColor: string;
  wallsColor: string;
  wainscotColor: string;
  doorsColor: string;
  trimColor: string;
  soffitColor: string;

  // Package Includes
  packageIncludes: string[];

  // Included Options
  includedOptions: string[];

  // Must Ship By
  mustShipBy: string;

  // FAQs
  faqs: string[];

  // Warranty
  steelTrussWarranty: string;
  steelSheetingWarranty: string;

  // Pricing
  buildingPrice: number;
  dealerDiscount: number; // Hidden from customer
  salesTax: number;
  pricingGoodThru: string;
  initialPaymentDue: number;

  // Optional discount
  additionalDiscount: number; // 0 or 5%

  // Extracted images/renders
  images: string[]; // Base64 encoded
};

const INITIAL_QUOTE: QuoteData = {
  quoteNumber: "",
  date: new Date().toLocaleDateString(),
  buildingType: "",
  consultant: "alex",
  customerName: "",
  street: "",
  city: "",
  state: "NC",
  zip: "",
  phone: "",
  width: "",
  length: "",
  eaveHeight: "",
  roofPitch: "",
  windSpeed: "111 Mph",
  groundSnow: "10 lb.",
  collateralLoad: "2 PSF",
  style: "Single Slope",
  trussType: "Web Truss",
  buildingPlans: "YES",
  foundationPlans: "YES",
  buildingTypeWood: "Wood",
  roofColor: "TBD",
  wallsColor: "TBD",
  wainscotColor: "TBD",
  doorsColor: "TBD",
  trimColor: "TBD",
  soffitColor: "TBD",
  packageIncludes: [
    "Trusses And Truss Hardware",
    "Pre-Cut Sheeting (30, 000 PSI)",
    "Self-Drilling Sheeting Screws With Neoprene Washers",
    "Elevation & Pier Placement Plans",
    "Hybrid Wood Cut List Edge Mounted On 2 Centers",
    "PJ Complimentary Window Frames & Trim Kits",
  ],
  includedOptions: [],
  mustShipBy: "",
  faqs: [],
  steelTrussWarranty: "50 Years",
  steelSheetingWarranty: "Lifetime",
  buildingPrice: 0,
  dealerDiscount: 0,
  salesTax: 0,
  pricingGoodThru: "",
  initialPaymentDue: 0,
  additionalDiscount: 0,
  images: [],
};

export default function QuoteBuilderPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState<QuoteData>(INITIAL_QUOTE);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Call API to parse PDF
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-quote", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse PDF");
      }

      const parsedData = await response.json();

      // Update quote with parsed data
      setQuote({
        ...quote,
        ...parsedData,
        consultant: quote.consultant, // Keep current consultant selection
        additionalDiscount: 0, // Reset discount
      });
    } catch (error) {
      console.error("Error parsing PDF:", error);
      alert("Failed to parse PDF. Please check the file and try again.");
    }
  };

  const updateQuote = (field: keyof QuoteData, value: any) => {
    setQuote((prev) => ({ ...prev, [field]: value }));
  };

  const calculateFinalPrice = () => {
    const discountAmount = quote.buildingPrice * (quote.additionalDiscount / 100);
    return quote.buildingPrice - discountAmount + quote.salesTax;
  };

  const calculateDeposit = () => {
    const deposit = calculateFinalPrice() * 0.25; // 25% deposit
    return Math.round(deposit * 100) / 100; // Round to 2 decimal places
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-sm shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d1b2a]">
              AAIRE Co.
            </h1>
            <p className="text-[#0d1b2a]/60 text-sm mt-2 font-[family-name:var(--font-inter)]">
              Quote Builder — Admin Access
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <label
              htmlFor="password"
              className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2 font-[family-name:var(--font-inter)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-sm border border-[#0d1b2a]/15 bg-white text-[#0d1b2a] font-medium font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
              placeholder="Enter password"
              autoFocus
            />
            <button
              type="submit"
              className="w-full mt-6 h-12 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] font-bold rounded-sm transition-colors"
            >
              Access Quote Builder
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <header className="bg-[#0d1b2a] border-b border-[#C9A96E]/20 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              AAIRE Co. <span className="text-[#C9A96E]">Quote Builder</span>
            </h1>
            <p className="text-white/60 text-sm mt-1 font-[family-name:var(--font-inter)]">
              Convert Worldwide Steel quotes to AAIRE Co. branded quotes
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-4">
            1. Upload Worldwide Steel Quote
          </h2>
          <div className="border-2 border-dashed border-[#C9A96E]/40 rounded-sm p-8 text-center hover:border-[#C9A96E] transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <svg
                className="w-12 h-12 text-[#C9A96E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div>
                <span className="text-[#0d1b2a] font-semibold">
                  Click to upload PDF
                </span>
                <p className="text-[#0d1b2a]/60 text-sm mt-1">
                  or drag and drop
                </p>
              </div>
              {uploadedFile && (
                <p className="text-[#C9A96E] text-sm font-medium mt-2">
                  ✓ {uploadedFile.name}
                </p>
              )}
            </label>
          </div>
          <p className="text-[#0d1b2a]/60 text-xs mt-3 font-[family-name:var(--font-inter)]">
            PDF parsing will extract quote data and building renders automatically.
          </p>
        </div>

        {/* Building Renders */}
        {quote.images.length > 0 && (
          <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6 mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0d1b2a] mb-4">
              Building Renders
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quote.images.map((img, i) => (
                <div key={i} className="border border-[#0d1b2a]/10 rounded-sm overflow-hidden">
                  <img
                    src={img}
                    alt={`Building render ${i + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-Panel Editor */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Edit Fields */}
          <div className="space-y-6">
            <EditorPanel quote={quote} updateQuote={updateQuote} />
          </div>

          {/* RIGHT: Preview */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <QuotePreview quote={quote} finalPrice={calculateFinalPrice()} deposit={calculateDeposit()} />
          </div>
        </div>
      </main>
    </div>
  );
}

function EditorPanel({
  quote,
  updateQuote,
}: {
  quote: QuoteData;
  updateQuote: (field: keyof QuoteData, value: any) => void;
}) {
  return (
    <>
      {/* Header Info */}
      <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a] mb-4">
          Quote Header
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Quote #
            </label>
            <input
              type="text"
              value={quote.quoteNumber}
              onChange={(e) => updateQuote("quoteNumber", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Date
            </label>
            <input
              type="text"
              value={quote.date}
              onChange={(e) => updateQuote("date", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Building Type
            </label>
            <input
              type="text"
              value={quote.buildingType}
              onChange={(e) => updateQuote("buildingType", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Building Consultant
            </label>
            <select
              value={quote.consultant}
              onChange={(e) => updateQuote("consultant", e.target.value as "alex" | "chris")}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            >
              <option value="alex">Alex Esposito</option>
              <option value="chris">Chris Page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a] mb-4">
          Customer Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Name
            </label>
            <input
              type="text"
              value={quote.customerName}
              onChange={(e) => updateQuote("customerName", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Street
            </label>
            <input
              type="text"
              value={quote.street}
              onChange={(e) => updateQuote("street", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                City
              </label>
              <input
                type="text"
                value={quote.city}
                onChange={(e) => updateQuote("city", e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                State
              </label>
              <input
                type="text"
                value={quote.state}
                onChange={(e) => updateQuote("state", e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                Zip
              </label>
              <input
                type="text"
                value={quote.zip}
                onChange={(e) => updateQuote("zip", e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={quote.phone}
                onChange={(e) => updateQuote("phone", e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Building Dimensions */}
      <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a] mb-4">
          Building Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Width
            </label>
            <input
              type="text"
              value={quote.width}
              onChange={(e) => updateQuote("width", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Length
            </label>
            <input
              type="text"
              value={quote.length}
              onChange={(e) => updateQuote("length", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Eave Height
            </label>
            <input
              type="text"
              value={quote.eaveHeight}
              onChange={(e) => updateQuote("eaveHeight", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Roof Pitch
            </label>
            <input
              type="text"
              value={quote.roofPitch}
              onChange={(e) => updateQuote("roofPitch", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Loads */}
      <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a] mb-4">
          Loads & Specs
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Wind Speed
            </label>
            <input
              type="text"
              value={quote.windSpeed}
              onChange={(e) => updateQuote("windSpeed", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Ground Snow
            </label>
            <input
              type="text"
              value={quote.groundSnow}
              onChange={(e) => updateQuote("groundSnow", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Collateral Load
            </label>
            <input
              type="text"
              value={quote.collateralLoad}
              onChange={(e) => updateQuote("collateralLoad", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Style
            </label>
            <input
              type="text"
              value={quote.style}
              onChange={(e) => updateQuote("style", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Truss Type
            </label>
            <input
              type="text"
              value={quote.trussType}
              onChange={(e) => updateQuote("trussType", e.target.value)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a] mb-4">
          Steel Sheeting Colors
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {(["roofColor", "wallsColor", "wainscotColor", "doorsColor", "trimColor", "soffitColor"] as const).map(
            (field) => (
              <div key={field}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                  {field.replace("Color", "").replace(/([A-Z])/g, " $1").trim()}
                </label>
                <select
                  value={quote[field]}
                  onChange={(e) => updateQuote(field, e.target.value)}
                  className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
                >
                  <option value="">--</option>
                  <option value="TBD">TBD</option>
                  <option value="Galvalume">Galvalume</option>
                  <option value="Black">Black</option>
                  <option value="Charcoal">Charcoal</option>
                  <option value="Taupe">Taupe</option>
                  <option value="Gray">Gray</option>
                  <option value="Alamo">Alamo</option>
                  <option value="Brilliant Arctic">Brilliant Arctic</option>
                  <option value="Forest">Forest</option>
                  <option value="Crimson">Crimson</option>
                  <option value="Rustic">Rustic</option>
                  <option value="Burgundy">Burgundy</option>
                  <option value="Gallery">Gallery</option>
                  <option value="Ivory">Ivory</option>
                  <option value="Light Stone">Light Stone</option>
                  <option value="Tan">Tan</option>
                  <option value="Brown">Brown</option>
                  <option value="Burnished Slate">Burnished Slate</option>
                </select>
              </div>
            )
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white border border-[#0d1b2a]/10 rounded-sm p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0d1b2a] mb-4">
          Pricing
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Building Price (Pre-Discount)
            </label>
            <input
              type="number"
              step="0.01"
              value={quote.buildingPrice}
              onChange={(e) => updateQuote("buildingPrice", parseFloat(e.target.value) || 0)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Dealer Discount (Hidden from customer)
            </label>
            <input
              type="number"
              step="0.01"
              value={quote.dealerDiscount}
              onChange={(e) => updateQuote("dealerDiscount", parseFloat(e.target.value) || 0)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm bg-gray-50"
              disabled
            />
            <p className="text-xs text-[#0d1b2a]/60 mt-1">
              Not shown on AAIRE Co. quote
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Additional Discount
            </label>
            <select
              value={quote.additionalDiscount}
              onChange={(e) => updateQuote("additionalDiscount", parseFloat(e.target.value))}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            >
              <option value={0}>No Discount</option>
              <option value={5}>5% Discount</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
              Sales Tax
            </label>
            <input
              type="number"
              step="0.01"
              value={quote.salesTax}
              onChange={(e) => updateQuote("salesTax", parseFloat(e.target.value) || 0)}
              className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                Pricing Good Thru
              </label>
              <input
                type="text"
                value={quote.pricingGoodThru}
                onChange={(e) => updateQuote("pricingGoodThru", e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/70 mb-2">
                Initial Payment Due
              </label>
              <input
                type="number"
                step="0.01"
                value={quote.initialPaymentDue}
                onChange={(e) => updateQuote("initialPaymentDue", parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-sm border border-[#0d1b2a]/15 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function QuotePreview({
  quote,
  finalPrice,
  deposit,
}: {
  quote: QuoteData;
  finalPrice: number;
  deposit: number;
}) {
  const consultant = CONSULTANTS[quote.consultant];

  return (
    <div className="bg-white border border-[#0d1b2a]/10 rounded-sm shadow-lg overflow-hidden">
      <div className="bg-[#0d1b2a] text-white p-6 border-b-4 border-[#C9A96E]">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          AAIRE Co.
        </h2>
        <p className="text-white/80 text-sm mt-1 font-[family-name:var(--font-inter)]">
          Metal Buildings
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider">Quote #</p>
            <p className="font-semibold mt-1">{quote.quoteNumber || "—"}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider">Date</p>
            <p className="font-semibold mt-1">{quote.date}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Extracted Renders */}
        {quote.images && quote.images.length > 0 && (
          <div className="pb-6 border-b border-[#0d1b2a]/10">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
              Building Renders
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quote.images.slice(0, 4).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-sm overflow-hidden border border-[#0d1b2a]/10">
                  <img
                    src={img}
                    alt={`Building render ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {quote.images.length > 4 && (
              <p className="text-xs text-[#0d1b2a]/60 mt-2">
                + {quote.images.length - 4} more images
              </p>
            )}
          </div>
        )}

        {/* Customer & Consultant */}
        <div className="grid sm:grid-cols-2 gap-6 pb-6 border-b border-[#0d1b2a]/10">
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-2">
              Customer
            </h3>
            <p className="font-semibold text-[#0d1b2a]">{quote.customerName || "—"}</p>
            <p className="text-sm text-[#0d1b2a]/70">{quote.street}</p>
            <p className="text-sm text-[#0d1b2a]/70">
              {quote.city}, {quote.state} {quote.zip}
            </p>
            <p className="text-sm text-[#0d1b2a]/70 mt-1">{quote.phone}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#0d1b2a]/60 mb-2">
              Building Consultant
            </h3>
            <p className="font-semibold text-[#0d1b2a]">{consultant.name}</p>
            <p className="text-sm text-[#0d1b2a]/70">{consultant.phone}</p>
            <p className="text-sm text-[#0d1b2a]/70">{consultant.email}</p>
          </div>
        </div>

        {/* Building Specs */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
            Building Specifications
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Type:</span>
              <span className="font-medium">{quote.buildingType || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Width:</span>
              <span className="font-medium">{quote.width || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Length:</span>
              <span className="font-medium">{quote.length || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Eave Height:</span>
              <span className="font-medium">{quote.eaveHeight || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Roof Pitch:</span>
              <span className="font-medium">{quote.roofPitch || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Wind Speed:</span>
              <span className="font-medium">{quote.windSpeed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Snow Load:</span>
              <span className="font-medium">{quote.groundSnow}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Truss Type:</span>
              <span className="font-medium">{quote.trussType}</span>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="pt-4 border-t border-[#0d1b2a]/10">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
            Steel Sheeting Colors
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Roof:</span>
              <span className="font-medium">{quote.roofColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Walls:</span>
              <span className="font-medium">{quote.wallsColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Wainscot:</span>
              <span className="font-medium">{quote.wainscotColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Doors:</span>
              <span className="font-medium">{quote.doorsColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Trim:</span>
              <span className="font-medium">{quote.trimColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0d1b2a]/60">Soffit:</span>
              <span className="font-medium">{quote.soffitColor}</span>
            </div>
          </div>
        </div>

        {/* Package Includes */}
        <div className="pt-4 border-t border-[#0d1b2a]/10">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
            Package Includes
          </h3>
          <ul className="space-y-1.5 text-sm text-[#0d1b2a]/80">
            {quote.packageIncludes.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#C9A96E] mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Included Options */}
        {quote.includedOptions.length > 0 && (
          <div className="pt-4 border-t border-[#0d1b2a]/10">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
              Included Options
            </h3>
            <ul className="space-y-1.5 text-sm text-[#0d1b2a]/80">
              {quote.includedOptions.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {quote.mustShipBy && (
              <p className="text-sm text-[#0d1b2a]/80 mt-2">
                <strong>Must ship by:</strong> {quote.mustShipBy}
              </p>
            )}
          </div>
        )}

        {/* AAIRE Co. Differentiators */}
        <div className="pt-4 border-t border-[#0d1b2a]/10 bg-[#C9A96E]/5 -mx-6 px-6 py-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
            What's Included with AAIRE Co.
          </h3>
          <ul className="space-y-2 text-sm text-[#0d1b2a]/80">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#C9A96E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Local Code Compliance Review</strong> — We verify your design meets NC building codes before ordering</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#C9A96E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Permitting Assistance</strong> — Available for additional fees to help navigate county requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#C9A96E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Shipping Included</strong> — Delivery to your site is included in the price</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span><strong>Unloading Not Included</strong> — Customer is responsible for unloading materials at delivery site</span>
            </li>
          </ul>
        </div>

        {/* Warranty */}
        <div className="pt-4 border-t border-[#0d1b2a]/10">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
            Warranty
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#0d1b2a]/60">Steel Truss</p>
              <p className="font-semibold text-[#0d1b2a]">{quote.steelTrussWarranty}</p>
              <p className="text-xs text-[#0d1b2a]/60 mt-1">(Manufacturer's Warranty)</p>
            </div>
            <div>
              <p className="text-[#0d1b2a]/60">Steel Sheeting</p>
              <p className="font-semibold text-[#0d1b2a]">{quote.steelSheetingWarranty}</p>
              <p className="text-xs text-[#0d1b2a]/60 mt-1">(Manufacturer's Warranty)</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        {quote.faqs.length > 0 && (
          <div className="pt-4 border-t border-[#0d1b2a]/10">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-3">
              Frequently Asked Questions
            </h3>
            <ul className="space-y-2 text-sm text-[#0d1b2a]/80">
              {quote.faqs.map((faq, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C9A96E] mt-1">•</span>
                  <span>{faq}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#0d1b2a]/60 mt-3 italic">
              Contact us for detailed answers to these questions and more.
            </p>
          </div>
        )}

        {/* Pricing */}
        <div className="pt-4 border-t-2 border-[#C9A96E]">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-4">
            Investment
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#0d1b2a]/70">Building Price</span>
              <span className="font-semibold">${quote.buildingPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {quote.additionalDiscount > 0 && (
              <div className="flex justify-between text-sm text-[#C9A96E]">
                <span>Discount ({quote.additionalDiscount}%)</span>
                <span className="font-semibold">-${(quote.buildingPrice * (quote.additionalDiscount / 100)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-[#0d1b2a]/70">Sales Tax</span>
              <span className="font-semibold">${quote.salesTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#0d1b2a]/10">
              <span className="text-[#0d1b2a]">Total Investment</span>
              <span className="text-[#C9A96E]">${finalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm pt-2">
              <span className="text-[#0d1b2a]/70">Initial Payment Due (25%)</span>
              <span className="font-semibold">${deposit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {quote.pricingGoodThru && (
              <p className="text-xs text-[#0d1b2a]/60 pt-2">
                Pricing valid through {quote.pricingGoodThru}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="bg-[#f7f5f0] p-6 border-t border-[#0d1b2a]/10">
        <button
          onClick={async () => {
            try {
              console.log("Generating PDF with", quote.images.length, "images");
              console.log("Image data preview:", quote.images[0]?.substring(0, 100));

              const blob = await pdf(
                <QuotePDF
                  quote={{
                    ...quote,
                    consultant,
                  }}
                />
              ).toBlob();
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `AAIRE-Co-Quote-${quote.quoteNumber || "draft"}.pdf`;
              link.click();
              URL.revokeObjectURL(url);
            } catch (error) {
              console.error("PDF generation error:", error);
              alert("Failed to generate PDF. Please try again.");
            }
          }}
          className="w-full h-12 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] font-bold rounded-sm transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download AAIRE Co. Quote (PDF)
        </button>
        <p className="text-xs text-center text-[#0d1b2a]/60 mt-3">
          Generates a professional AAIRE Co. branded quote with all your edits
        </p>
      </div>
    </div>
  );
}
