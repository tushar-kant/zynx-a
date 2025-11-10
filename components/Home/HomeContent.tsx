"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function HomeContent() {
  const featuredWallpapers = [
    {
      id: 1,
      title: "Naruto Uzumaki",
      anime: "Naruto",
      downloads: "1.1K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762668145/gr_pgkvkr.jpg",
    },
    {
      id: 2,
      title: "Luffy Gear Fifth",
      anime: "One Piece",
      downloads: "0.8K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762668204/sgeg_ciahdp.jpg",
    },
    {
      id: 3,
      title: "Muzen",
      anime: "Demon slayer",
      downloads: "2.1K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762668045/b3oddwrpknooa97cl8cm_y9lo5n.jpg",
    },
    {
      id: 4,
      title: "kakashi",
      anime: "Naruto",
      downloads: "1.5K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762668136/u4muofyw343l4nhw7nof_zzcbzk.jpg",
    },
  ];

  const categories = [
    { name: "Naruto", color: "from-orange-500 to-red-600", icon: "🥷" },
    { name: "One Piece", color: "from-blue-500 to-cyan-400", icon: "🏴‍☠️" },
    { name: "Bleach", color: "from-gray-600 to-red-500", icon: "⚔️" },
    { name: "Attack on Titan", color: "from-yellow-700 to-orange-500", icon: "🔥" },
    { name: "Demon Slayer", color: "from-pink-500 to-purple-600", icon: "💫" },
    { name: "Jujutsu Kaisen", color: "from-indigo-500 to-blue-700", icon: "👊" },
    { name: "One Punch Man", color: "from-yellow-400 to-red-600", icon: "💥" },
    { name: "Death Note", color: "from-gray-800 to-black", icon: "☠️" },
    { name: "Fullmetal Alchemist", color: "from-amber-600 to-red-700", icon: "⚗️" },
    { name: "My Hero Academia", color: "from-green-500 to-teal-500", icon: "🦸‍♂️" },
    { name: "Solo Leveling", color: "from-blue-800 to-purple-700", icon: "⚔️" },
    { name: "Dragon Ball", color: "from-yellow-500 to-orange-600", icon: "🐉" },
  ];


  const stats = [
    { number: "1K+", label: "HD Wallpapers" },
    { number: "5K+", label: "Downloads" },
    { number: "10+", label: "Anime Series" },
    { number: "24/7", label: "New Uploads" },
  ];



  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] relative z-10">
      {/* 📊 Stats Section (Full Width) */}
      <div className="w-full bg-[var(--card)] border-b border-[var(--border)] py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Zynx Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl font-extrabold text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-[var(--muted)] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 Trending Wallpapers */}
      <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-2">Trending Now</h2>
            <p className="text-[var(--muted)] text-lg">
              Most downloaded wallpapers this week
            </p>
          </div>

          {/* View All on Right */}
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 bg-white text-[var(--accent)] px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

        </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
  {featuredWallpapers.map((wall) => (
    <div
      key={wall.id}
      className="group rounded-xl md:rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:shadow-2xl hover:scale-[1.02] md:hover:scale-[1.04] transition-all duration-300"
    >
      <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <Image
          src={wall.cover || logo}
          alt={wall.title}
          fill
          className="object-cover group-hover:scale-110 transition"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = logo.src;
          }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="text-white text-sm md:text-lg font-bold tracking-wide px-2 text-center">
            {wall.anime}
          </span>
        </div>
      </div>
      <div className="p-3 md:p-5">
        <h3 className="font-bold text-sm md:text-lg mb-1 text-[var(--accent)] truncate">
          {wall.title}
        </h3>
        <div className="flex justify-between items-center text-[var(--muted)] text-xs md:text-sm">
          <span className="truncate mr-2">{wall.anime}</span>
          <span className="shrink-0">⬇ {wall.downloads}</span>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>

      {/* ✨ Categories Section */}
      <div className="py-20 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-2">
              Browse Anime
            </h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/anime/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:border-[var(--accent)] transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--background)] group-hover:bg-[var(--accent)] transition-colors duration-300">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </span>
                </div>
                <span className="text-sm font-medium text-[var(--foreground)] text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
