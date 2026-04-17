const navLinks = [
  { label: "Buildings", href: "#buildings" },
  { label: "Gallery", href: "#gallery" },
  { label: "Build Site Check", href: "#quote" },
  { label: "About", href: "#about" },
];

const locationLinks = [
  { label: "Hawaii", href: "/hawaii" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="bg-[#0d1b2a]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)] tracking-tight">
              AAIRE Co.
            </span>
            <p className="text-white/50 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Certified Worldwide Steel Buildings Distributor serving all 50 states.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs font-medium">Nationwide Delivery</span>
            </div>
          </div>

          {/* Main Nav links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Navigation
            </h3>
            <nav
              className="flex flex-col items-center md:items-start gap-3"
              aria-label="Footer navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`footer-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/60 hover:text-[#C9A96E] text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Locations
            </h3>
            <nav
              className="flex flex-col items-center md:items-start gap-3"
              aria-label="Location pages"
            >
              {locationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-[#C9A96E] text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Get Started
            </h3>
            <a
              href="#quote"
              id="footer-cta-button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-sm font-bold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Copyright bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <span className="text-white/30 text-xs">
            © {currentYear} AAIRE Co. Metal Buildings. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-white/20">·</span>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
