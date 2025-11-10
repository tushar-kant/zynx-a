"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaImages, FaSearch, FaTimes } from "react-icons/fa";
import WallpaperCard from "@/components/AnimeCard/WallpaperCard";

type Wallpaper = {
  id: string;
  slug: string;
  title: string;
  url: string;
  downloadUrl: string;
  tags: string[];
  live?: boolean;
};

function CharacterWallpapersPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const characterSlug = params.characterSlug as string;

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!characterSlug) {
      setError("Character not found");
      setLoading(false);
      return;
    }

    const fetchWallpapers = async () => {
      try {
        const res = await fetch(`/api/wallpapers?characterSlug=${characterSlug}&live=true`);
        const data = await res.json();

        if (data.success) {
          setWallpapers(data.data);
          setFilteredWallpapers(data.data);
        } else {
          setError("No wallpapers found for this character.");
        }
      } catch (err) {
        console.error("Error fetching wallpapers:", err);
        setError("Failed to load wallpapers.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, [characterSlug]);

  // 🔍 Handle search filtering
  useEffect(() => {
    if (!query.trim()) {
      setFilteredWallpapers(wallpapers);
    } else {
      const filtered = wallpapers.filter(
        (wall) =>
          wall.title.toLowerCase().includes(query.toLowerCase()) ||
          wall.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredWallpapers(filtered);
    }
  }, [query, wallpapers]);

  // Autofocus input when search expands
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Format character name
  const characterName = characterSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ✅ Sticky Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-20 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6">
          {/* 🔝 Header Top Row */}
          <div className="flex items-center justify-between">
            {/* 🔙 Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 active:scale-95"
              title="Go Back"
            >
              <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium hidden xs:inline">Back to Characters</span>
            </button>

            {/* 🔍 Search Section */}
            <div className="flex items-center gap-2 relative">
              {/* Expanding Input */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  searchOpen ? "w-40 sm:w-60 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search wallpapers..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="
                    w-full border border-[var(--border)] bg-[var(--background)] 
                    text-[var(--foreground)] placeholder-[var(--muted)] 
                    px-3 py-2 rounded-lg text-sm 
                    focus:outline-none focus:border-[var(--accent)] 
                    transition-all duration-200
                  "
                />
              </div>

              {/* Search Icon Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                title={searchOpen ? "Close Search" : "Search"}
              >
                {searchOpen ? (
                  <FaTimes className="w-4 h-4" />
                ) : (
                  <FaSearch className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Title Row */}
          <div className="flex flex-col items-start text-left">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--accent)] leading-tight">
              {characterName}
            </h1>
            <p className="text-[var(--muted)] text-xs sm:text-base mt-1">
              High-quality wallpapers and live artwork
            </p>

            {!loading && !error && filteredWallpapers.length > 0 && (
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-xs sm:text-sm text-[var(--accent)] font-medium">
                <FaImages className="w-3 h-3" />
                <span>
                  {filteredWallpapers.length}{" "}
                  {filteredWallpapers.length === 1 ? "Wallpaper" : "Wallpapers"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Main Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            <p className="text-[var(--muted)] text-sm sm:text-base">Loading wallpapers...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="text-6xl sm:text-8xl opacity-20">🎨</div>
            <div className="max-w-md">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-2">
                No wallpapers yet
              </h2>
              <p className="text-[var(--muted)] text-sm sm:text-base mb-6">
                We're working on adding wallpapers for {characterName}. Check back soon!
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--accent)] text-white rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all active:scale-95"
            >
              <FaArrowLeft className="w-3 h-3" /> Browse Other Characters
            </button>
          </div>
        )}

        {/* Wallpaper Grid */}
        {!loading && !error && filteredWallpapers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
            {filteredWallpapers.map((wall) => (
              <WallpaperCard
                key={wall.id}
                id={wall.id}
                slug={wall.slug}
                title={wall.title}
                url={wall.url}
                tags={wall.tags}
                live={true}
              />
            ))}
          </div>
        )}

        {/* Empty Search Result */}
        {!loading && !error && filteredWallpapers.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="text-6xl sm:text-8xl opacity-20">🎨</div>
            <p className="text-[var(--muted)] text-base sm:text-lg">
              No matching wallpapers found.
            </p>
            <button
              onClick={() => setQuery("")}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default React.memo(CharacterWallpapersPage);
