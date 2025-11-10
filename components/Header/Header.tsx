"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when window resizes beyond mobile width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideUnderline {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          25%, 75% {
            opacity: 1;
          }
          50% {
            transform: translateX(0);
          }
        }
        
        .animated-underline {
          position: relative;
          display: inline-block;
        }
        
        .animated-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent);
          animation: slideUnderline 2s ease-in-out infinite;
        }
      `}</style>
      
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md shadow-md bg-[var(--card)]/80 border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] transition"
          >
            Zy<span className="animated-underline">nx</span>
            <span className="text-[var(--foreground)]">Anime</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-[var(--muted)]">
            {/* <Link href="/" className="hover:text-[var(--foreground)] transition">
              Home
            </Link> */}

            <Link
              href="/anime"
              className="hover:text-[var(--foreground)] transition"
            >
              Anime
            </Link>
            {/* <Link
              href="/anime-live"
              className="hover:text-[var(--foreground)] transition"
            >
              Live anime
            </Link> */}
          </nav>

          {/* Right Side (Theme + Mobile Button) */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[var(--foreground)] text-3xl focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          } bg-[var(--card)] border-t border-[var(--border)]`}
        >
          <nav className="flex flex-col px-6 py-4 space-y-4 text-[var(--muted)]">
            {[
              // { href: "/", label: "Home" },
              // { href: "/anime-live", label: "Live anime" },
              { href: "/anime", label: "Anime" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)} // close menu after clicking
                className="hover:text-[var(--foreground)] transition"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}