export default function DesignTips() {
  const tips = [
    {
      title: "Interior clear height isn't the same as eave height",
      description:
        "Open web trusses take up depth at the eave, which reduces usable clearance inside. If you're parking a tall vehicle or installing equipment, ask us for your truss depth so you know your actual clear height.",
    },
    {
      title: "Roof pitch changes ridge height more than you'd expect",
      description:
        "A 4:12 roof sits several feet higher at the peak than a 1.5:12 on the same building. This matters for HOA height limits, zoning restrictions, and visual impact from the street. Pick your pitch based on your site, not just your preference.",
    },
    {
      title: "Door openings need framing clearance",
      description:
        "A 12×14 roll-up door needs more than 14 feet of clear wall space to install. Factor the framing allowance into your eave height decision — we'll confirm the exact requirement for your configuration.",
    },
    {
      title: "Wind rod bracing and portal frames live in specific bays",
      description:
        "Door and opening placement isn't unlimited — structural bracing is engineered into specific bay locations. Give us your door layout during design, before final engineering, so we can place bracing around your openings instead of the other way around.",
    },
    {
      title: "Overhangs can wrap around corners",
      description:
        "Wrap-around overhangs (covered porches that turn the corner of the building) are a common Worldwide option. If you want a covered entry or a shaded outdoor space, mention it early — it affects your endwall and sidewall framing.",
    },
    {
      title: "Custom bay sizing is easy during design, hard after",
      description:
        "Purlins and girts are pre-cut to bay dimensions. Non-standard bay widths (say, a 12' bay to fit a specific door) are simple to engineer up front and nearly impossible to change once the kit ships. Know your door and window requirements before we finalize drawings.",
    },
    {
      title: "Every surface gets its own color choice",
      description:
        "Roof, walls, and trim can each be a different color from Worldwide's 18-color palette. Galvalume (unpainted steel) is also a legit finish if you want the industrial look. Don't match colors just because it's traditional — a two-tone building often reads better than all-one-color.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-medium text-neutral-900 dark:text-neutral-100">Design Tips</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Things to discuss with us during your consultation — these aren't final specs, just helpful context for planning.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h3 className="mb-2 text-base font-medium text-neutral-900 dark:text-neutral-100">{tip.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
