"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Buildings", href: "/construction" },
    { label: "Gallery", href: "/gallery" },
    { label: "Build Site Check", href: "/site-check" },
    { label: "Configure", href: "/configure" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1b2a]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-[#0d1b2a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            id="nav-logo"
          >
            <Image
              src="/images/logos/aaire-logo-white.jpg"
              alt="AAIRE Co. Metal Buildings"
              height={48}
              width={160}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-white/80 hover:text-[#C9A96E] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-200 hover:after:w-full pb-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/#quote"
              id="nav-cta-button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-sm font-semibold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="nav-mobile-menu-button"
            className="lg:hidden p-2 text-white hover:text-[#C9A96E] transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-[#C9A96E] hover:bg-white/5 transition-colors duration-200 px-2 py-3 rounded"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#quote"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A96E] hover:bg-[#b8954f] text-[#0d1b2a] text-sm font-semibold rounded-sm transition-colors duration-200"
            >
              Get Free Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
