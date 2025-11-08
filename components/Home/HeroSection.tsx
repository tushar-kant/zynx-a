"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const pathname = usePathname();
  const isLive = pathname.startsWith("/anime-live");

  // ⏳ Debounce input — wait 400ms after typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔍 Search logic
  const handleSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const animeRes = await fetch("/api/anime");
      const animeData = await animeRes.json();

      const characterPromises = animeData.data.map((a: any) =>
        fetch(`/api/characters?animeSlug=${a.slug}`).then((r) => r.json())
      );
      const characterResults = await Promise.all(characterPromises);

      const allCharacters = characterResults.flatMap((r) =>
        r.success ? r.data.map((c: any) => ({ ...c, animeSlug: r.data.animeSlug })) : []
      );

      const wallpaperPromises = allCharacters.slice(0, 6).map((c: any) =>
        fetch(`/api/wallpapers?characterSlug=${c.slug}`).then((r) => r.json())
      );
      const wallpaperResults = await Promise.all(wallpaperPromises);
      const allWallpapers = wallpaperResults.flatMap((r) =>
        r.success ? r.data : []
      );

      const animeResults = animeData.data
        .filter((a: any) => a.name.toLowerCase().includes(query.toLowerCase()))
        .map((a: any) => ({
          type: "Anime",
          name: a.name,
          slug: `/anime/${a.slug}`,
        }));

      const charResults = allCharacters
        .filter((c: any) => c.name.toLowerCase().includes(query.toLowerCase()))
        .map((c: any) => ({
          type: "Character",
          name: c.name,
          slug: `/anime/${c.animeSlug || "naruto"}/${c.slug}`,
        }));

      const wallResults = allWallpapers
        .filter((w: any) => w.title.toLowerCase().includes(query.toLowerCase()))
        .map((w: any) => ({
          type: w.live ? "Live Wallpaper" : "Wallpaper",
          name: w.title,
          slug: `/wallpaper/${w.slug}`,
        }));

      setSearchResults([...animeResults, ...charResults, ...wallResults]);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run search when debounced query updates
  useEffect(() => {
    if (debouncedQuery) handleSearch(debouncedQuery);
  }, [debouncedQuery, handleSearch]);

  return (
    <section className="relative h-[100vh] flex flex-col justify-center text-center px-6 overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--accent)] opacity-20 blur-[130px] animate-float" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600 opacity-20 blur-[150px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-500 opacity-15 blur-[140px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-gradient" />
      </div>

      {/* 🖋 Title */}
      <div className="relative -translate-y-12">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
          <span className="text-[var(--accent)]">Zy</span>
          <span className="text-[var(--foreground)] relative inline-block">
            nx
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--accent)] animate-underline-repeat"></span>
          </span>
          <span className="text-[var(--foreground)]"> Anime</span>
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

      {/* 🔍 Search + Breadcrumb */}
      <div className="max-w-3xl mx-auto w-full relative -translate-y-8">
        {/* Search Input */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative w-full md:w-[70%]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          </div>

          {/* 🌐 Breadcrumb Buttons */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <div className="inline-flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-full px-2 py-1.5 shadow-sm">
              <Link
                href="/anime"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isLive
                    ? "bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white shadow-[0_0_12px_var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--accent)]"
                }`}
              >
                /anime
              </Link>
              <span className="text-[var(--muted)]">|</span>
              <Link
                href="/anime-live"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isLive
                    ? "bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white shadow-[0_0_12px_var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--accent)]"
                }`}
              >
                /anime-live
              </Link>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {search && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl z-20 overflow-hidden backdrop-blur-md animate-fadeIn">
            <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border)]">
              {searchResults.map((item, index) => (
                <Link
                  key={index}
                  href={item.slug}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[var(--accent)] hover:text-white transition-all duration-200 group"
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

        {/* Loading */}
        {loading && (
          <div className="absolute top-full left-0 w-full mt-3 p-4 text-center text-[var(--muted)] text-sm bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg animate-pulse">
            Searching...
          </div>
        )}
      </div>

      {/* 🎞️ Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }

        @keyframes gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes underline-repeat {
          0%, 100% { width: 0; left: 0; opacity: 1; }
          50% { width: 100%; left: 0; opacity: 1; }
          51% { width: 100%; left: 0; opacity: 0; }
        }

        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
        .animate-gradient { animation: gradient 30s linear infinite; }
        .animate-underline-repeat { animation: underline-repeat 2s ease-in-out infinite; }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}