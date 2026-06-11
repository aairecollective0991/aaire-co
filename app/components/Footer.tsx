const navLinks = [
  { label: "Buildings", href: "/construction" },
  { label: "Sizes & Prices", href: "/metal-buildings" },
  { label: "Guides", href: "/guides" },
  { label: "Why Web Truss", href: "/why-web-truss" },
  { label: "Build Process", href: "/build-process" },
  { label: "Gallery", href: "/gallery" },
  { label: "Build Site Check", href: "/site-check" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
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
            {/* Social */}
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://www.facebook.com/profile.php?id=61589918392904"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AAIRE Co. Metal Buildings on Facebook"
                className="text-white/60 hover:text-[#C9A96E] transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://share.google/xopA6oArzJ3WaFTIh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AAIRE Co. Metal Buildings on Google"
                className="text-white/60 hover:text-[#C9A96E] transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
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
