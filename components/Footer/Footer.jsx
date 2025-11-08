"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaDiscord, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] text-[var(--muted)] mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        
        {/* 🌸 Logo + Text */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-[var(--accent)] mb-2">
            Zynx<span className="text-[var(--foreground)]">Anime</span>
          </h2>
          <p className="text-sm max-w-sm text-[var(--muted)]">
            Free Anime Wallpapers, PFPs, and Live Backgrounds — 
            crafted with love for otakus worldwide 💫
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm">
          <Link href="/" className="hover:text-[var(--accent)] transition">Home</Link>
          <Link href="/anime" className="hover:text-[var(--accent)] transition">Anime</Link>
          <Link href="/anime-live" className="hover:text-[var(--accent)] transition">Live Anime</Link>
          <Link href="/about" className="hover:text-[var(--accent)] transition">About</Link>
          {/* <Link href="/fileupload" className="hover:text-[var(--accent)] transition">Upload</Link> */}
        </div>
      </div>

      {/* 🌐 Social Links */}
      <div className="border-t border-[var(--border)] py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6 sm:px-10 gap-4">
          
          {/* 💬 Social Icons */}
          <div className="flex items-center gap-5 text-[var(--muted)]">
            <a
              href="https://instagram.com/zynx.v1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] hover:scale-110 transition-all"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] hover:scale-110 transition-all"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] hover:scale-110 transition-all"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
          </div>

          {/* ❤️ Copyright */}
          <p className="text-xs text-[var(--muted)] text-center sm:text-right">
            Made with <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-1 animate-pulse" /> 
            by <span className="text-[var(--accent)] font-medium">Zynx Innovations</span> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
