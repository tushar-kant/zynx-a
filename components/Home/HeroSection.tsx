"use client";

import { useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Unified Search Logic
  const handleSearch = async (query: string) => {
    setSearch(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const [animeRes, charRes, wallRes] = await Promise.all([
        fetch("/api/anime").then((r) => r.json()),
        fetch("/api/characters?animeId=1").then((r) => r.json()),
        fetch("/api/wallpapers?characterId=101").then((r) => r.json()),
      ]);

      const animeResults = animeRes.data
        ?.filter((a: any) =>
          a.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((a: any) => ({
          type: "Anime",
          name: a.name,
          slug: `/anime/${a.slug}`,
        }));

      const charResults = charRes.data
        ?.filter((c: any) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((c: any) => ({
          type: "Character",
          name: c.name,
          slug: `/anime/naruto/${c.slug}`,
        }));

      const wallResults = wallRes.data
        ?.filter((w: any) =>
          w.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((w: any) => ({
          type: "Wallpaper",
          name: w.title,
          slug: `/wallpaper/${w.slug}`,
        }));

      setSearchResults([...animeResults, ...charResults, ...wallResults]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[100vh] flex flex-col justify-center text-center px-6 overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* 🌈 Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--accent)] opacity-20 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600 opacity-20 blur-[150px]" />
      </div>

      {/* 🖋 Title and Subtitle */}
      <div className="relative -translate-y-12">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-[var(--accent)] tracking-tight drop-shadow-lg">
          Zynx <span className="text-[var(--foreground)]">Anime</span>
        </h1>

        <p className="text-[var(--muted)] text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore breathtaking{" "}
          <span className="text-[var(--accent)] font-medium">Anime Art</span>,{" "}
          Characters, and Wallpapers — <br />
          <span className="text-[var(--accent)] font-medium">
            All free for every anime fan 💫
          </span>
        </p>
      </div>

      {/* 🔍 Enhanced Search Bar */}
      <div className="max-w-2xl mx-auto relative -translate-y-8">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Anime, Characters, or Wallpapers..."
          className="w-full p-5 pl-14 text-lg rounded-full bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-4 focus:ring-[var(--accent)] shadow-lg transition-all duration-300 placeholder:text-[var(--muted)]"
        />
        <svg
          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* 🧠 Search Dropdown */}
        {search && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl z-20 overflow-hidden backdrop-blur-md">
            <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border)]">
              {searchResults.map((item, index) => (
                <Link
                  key={index}
                  href={item.slug}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-base">{item.name}</span>
                    <span className="text-xs text-[var(--muted)] group-hover:text-white/70">
                      {item.type}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 opacity-50 group-hover:opacity-100"
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
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="absolute top-full left-0 w-full mt-3 p-4 text-center text-[var(--muted)] text-sm bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg animate-pulse">
            Searching...
          </div>
        )}
      </div>
    </section>
  );
}
