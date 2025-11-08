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
      downloads: "2.4K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762580149/zynx-anime/naruto/sb8w6dd18yll3lrwm7hu.jpg",
    },
    {
      id: 2,
      title: "Luffy Gear Fifth",
      anime: "One Piece",
      downloads: "3.1K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538098/zynx-anime/pmptes9hx3ehsxocnqir.jpg",
    },
    {
      id: 3,
      title: "Muzen",
      anime: "Demon slayer",
      downloads: "2.8K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762537348/zynx-anime/b3oddwrpknooa97cl8cm.jpg",
    },
    {
      id: 4,
      title: "kakashi",
      anime: "Naruto",
      downloads: "2.2K",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
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
    { number: "10K+", label: "HD Wallpapers" },
    { number: "50K+", label: "Downloads" },
    { number: "100+", label: "Anime Series" },
    { number: "24/7", label: "New Uploads" },
  ];



  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] relative z-10">
      {/* 📊 Stats Section (Full Width) */}
      <div className="w-full bg-[var(--card)] border-b border-[var(--border)] py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">📈 Zynx Wallpaper Stats</h2>
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
            <h2 className="text-4xl font-bold mb-2">🔥 Trending Now</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredWallpapers.map((wall) => (
            <div
              key={wall.id}
              className="group rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:shadow-2xl hover:scale-[1.04] transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
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
                  <span className="text-white text-lg font-bold tracking-wide">
                    {wall.anime}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 text-[var(--accent)]">
                  {wall.title}
                </h3>
                <div className="flex justify-between items-center text-[var(--muted)] text-sm">
                  <span>{wall.anime}</span>
                  <span>⬇ {wall.downloads}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ Categories Section */}
      <div className="py-20 bg-[var(--card)] border-t border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">✨ Explore by Anime</h2>
          <p className="text-[var(--muted)] text-lg mb-12">
            Choose your favorite series to browse wallpapers
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/anime/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br ${cat.color} text-white font-semibold text-lg text-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <span className="text-3xl mb-3">{cat.icon}</span>
                <span>{cat.name}</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-2xl transition"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
