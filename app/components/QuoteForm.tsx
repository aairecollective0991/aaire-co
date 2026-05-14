"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    buildingType: "",
    consentNonMarketing: false,
    consentMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const buildingTypes = [
    "Residential Garage",
    "Commercial Warehouse",
    "Agricultural Barn",
    "Workshop",
    "Storage Building",
    "Retail Space",
    "Other",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone || !formData.email) {
      alert("Please fill in all required fields (Phone and Email)");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus("success");
      setShowSuccessModal(true);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        buildingType: "",
        consentNonMarketing: false,
        consentMarketing: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="space-y-5">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#0d1b2a] mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-3 border border-[#0d1b2a]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#0d1b2a] mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-3 border border-[#0d1b2a]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#0d1b2a] mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full px-4 py-3 border border-[#0d1b2a]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#0d1b2a] mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-[#0d1b2a]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
          />
        </div>

        {/* Building Type */}
        <div>
          <label htmlFor="buildingType" className="block text-sm font-medium text-[#0d1b2a] mb-2">
            Building Type
          </label>
          <select
            id="buildingType"
            name="buildingType"
            value={formData.buildingType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#0d1b2a]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230d1b2a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="">Select Building Type</option>
            {buildingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentNonMarketing"
              name="consentNonMarketing"
              checked={formData.consentNonMarketing}
              onChange={handleChange}
              className="mt-1 w-4 h-4 border-[#0d1b2a]/30 rounded focus:ring-[#C9A96E] text-[#C9A96E]"
            />
            <label htmlFor="consentNonMarketing" className="text-sm text-[#0d1b2a]/70 leading-relaxed">
              By checking this box, I consent to receive non-marketing text messages from{" "}
              <span className="font-semibold text-[#0d1b2a]">AAIRE Co. Metal Buildings</span> about steel
              building quote requests and project updates. Message frequency varies, message & data rates may
              apply. Text HELP for assistance, reply STOP to opt out.
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentMarketing"
              name="consentMarketing"
              checked={formData.consentMarketing}
              onChange={handleChange}
              className="mt-1 w-4 h-4 border-[#0d1b2a]/30 rounded focus:ring-[#C9A96E] text-[#C9A96E]"
            />
            <label htmlFor="consentMarketing" className="text-sm text-[#0d1b2a]/70 leading-relaxed">
              By checking this box, I consent to receive marketing and promotional messages including special
              offers, discounts, new product updates among others from{" "}
              <span className="font-semibold text-[#0d1b2a]">AAIRE Co. Metal Buildings</span> at the phone
              number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance,
              reply STOP to opt out.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C9A96E] hover:bg-[#b89760] text-[#0d1b2a] font-semibold py-3.5 px-6 rounded-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Get Free Quote"}
          </button>
        </div>

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-sm text-sm">
            Something went wrong. Please try again or call us directly.
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-[#0d1b2a]/40 hover:text-[#0d1b2a] text-2xl font-bold"
            >
              ×
            </button>

            {/* AAIRE Logo */}
            <div className="text-center mb-6">
              <img
                src="/images/logos/aaire-logo-black.png"
                alt="AAIRE Co."
                className="h-16 mx-auto mb-4"
              />
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0d1b2a] mb-2">Thank You!</h3>
              <p className="text-[#0d1b2a]/70 text-lg mb-4">
                We'll respond within 2 hours during business hours.
              </p>
            </div>

            {/* Design Tool Section */}
            <div className="bg-[#f7f5f0] p-6 rounded-sm mb-6">
              <p className="text-[#0d1b2a] mb-4 text-center font-medium">
                AAIRE Co. specializes in thorough pre-planning that helps you select the design you want.
              </p>

              <a
                href="https://www.worldwidesteelbuildings.com/designer/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#C9A96E] hover:bg-[#b89760] text-[#0d1b2a] font-bold py-4 px-6 rounded-sm text-center transition-colors duration-200 mb-3"
              >
                🏗️ Design Your Building Here
              </a>

              <p className="text-[#0d1b2a]/70 text-sm text-center mb-4">
                Use the manufacturer's design tool and be sure to click Save and send us the results!
              </p>

              {/* Worldwide Steel Logo */}
              <div className="flex items-center justify-center gap-2 pt-3 border-t border-[#0d1b2a]/10">
                <img
                  src="/images/logos/worldwide-logo.png"
                  alt="Worldwide Steel Buildings"
                  className="h-8"
                />
                <span className="text-xs text-[#0d1b2a]/60">Official Dealer</span>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full text-[#0d1b2a]/40 hover:text-[#0d1b2a]/60 font-medium py-3 px-6 transition-colors duration-200 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
