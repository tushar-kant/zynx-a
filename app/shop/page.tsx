"use client";
import Link from "next/link";
import { FaArrowLeft, FaStoreAlt } from "react-icons/fa";

export default function ShopPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] overflow-hidden transition-colors duration-300">
      {/* 🌌 Animated background that adapts to theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-transparent,rgba(255,0,150,0.15)),transparent_60%),radial-gradient(circle_at_bottom_left,var(--accent-transparent,rgba(0,180,255,0.15)),transparent_60%)] animate-pulse-slow" />

      {/* 🏬 Content */}
      <div className="relative z-10 text-center px-6">
        {/* Icon */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_0_30px_var(--accent)] animate-float transition-all duration-300">
            <FaStoreAlt className="w-9 h-9" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-[linear-gradient(to_right,var(--accent),var(--accent-light,#00ffff))] drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] transition-all duration-300">
          Shop Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-[var(--muted)] text-base sm:text-lg max-w-md mx-auto transition-colors duration-300">
          We’re crafting an exclusive anime merchandise store for wallpapers,
          posters, and collectibles. Stay tuned!
        </p>

        {/* Back Button */}
        
      </div>
    </main>
  );
}
