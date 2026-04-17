"use client";

import BuildingConfigurator from "@/components/BuildingConfigurator";

export default function ConfigurePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-medium">Design your building</h1>
      <BuildingConfigurator
        onQuoteRequest={(spec) => {
          console.log("Quote requested:", spec);
          alert("Quote submitted — backend wiring comes next session.");
        }}
      />
    </div>
  );
}
