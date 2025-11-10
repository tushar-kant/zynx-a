"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
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

const LIMIT = 8;

function CharacterWallpapersPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const characterSlug = params.characterSlug as string;

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const initialLoad = useRef(false); // ⛔ prevent duplicate first fetch (StrictMode)

  // ✅ Fetch wallpapers with pagination
  const fetchWallpapers = useCallback(
    async (pageNum: number) => {
      if (!characterSlug) return;
      try {
        setLoadingMore(true);
        const res = await fetch(
          `/api/wallpapers?characterSlug=${characterSlug}&page=${pageNum}&limit=${LIMIT}&live=${liveOnly}`
        );
        const data = await res.json();

        if (data.success) {
          if (data.data.length === 0) {
            setHasMore(false);
          } else {
            // ✅ Deduplicate wallpapers
            setWallpapers((prev) => {
              const all = [...prev, ...data.data];
              return all.filter(
                (item, index, self) =>
                  index === self.findIndex((w) => w.id === item.id)
              );
            });

            setFilteredWallpapers((prev) => {
              const all = [...prev, ...data.data];
              return all.filter(
                (item, index, self) =>
                  index === self.findIndex((w) => w.id === item.id)
              );
            });
          }
        } else {
          setError(data.message || "No wallpapers found for this character.");
        }
      } catch (err) {
        console.error("Error fetching wallpapers:", err);
        setError("Failed to load wallpapers.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [characterSlug, liveOnly]
  );

  // 🔹 Initial fetch (guarded)
  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;

    setWallpapers([]);
    setFilteredWallpapers([]);
    setPage(1);
    setHasMore(true);
    fetchWallpapers(1);
  }, [fetchWallpapers, characterSlug, liveOnly]);

  // 🔹 Reset and refetch when live/static toggled
  useEffect(() => {
    setWallpapers([]);
    setFilteredWallpapers([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchWallpapers(1);
  }, [liveOnly, fetchWallpapers]);

  // 🔹 Infinite scroll
  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasMore, loadingMore]);

  // 🔹 Load next page
  useEffect(() => {
    if (page > 1) fetchWallpapers(page);
  }, [page, fetchWallpapers]);

  // 🔍 Search filter
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

  // Autofocus when search expands
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const characterName = characterSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ✅ Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-20 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6">
          {/* 🔝 Top Row */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 active:scale-95"
            >
              <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium hidden xs:inline">Back to Characters</span>
            </button>

            {/* 🔍 Search */}
            <div className="flex items-center gap-2 relative">
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
                  className="w-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-all duration-200"
                />
              </div>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
              >
                {searchOpen ? <FaTimes className="w-4 h-4" /> : <FaSearch className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Title + Live Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--accent)] leading-tight">
                {characterName}
              </h1>

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

            {/* 🟢 Live Filter */}
            <button
              onClick={() => setLiveOnly((prev) => !prev)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                liveOnly
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "border-[var(--border)] hover:bg-[var(--accent)] hover:text-white"
              }`}
            >
              {liveOnly ? "Show Static Wallpapers" : "Show Live Wallpapers"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Main Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* 🌀 Skeletons */}
        {loading && wallpapers.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-[var(--card)] overflow-hidden relative">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[var(--muted)]/20 via-[var(--muted)]/40 to-[var(--muted)]/20"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="text-6xl sm:text-8xl opacity-20">🎨</div>
            <p className="text-[var(--muted)] text-base sm:text-lg">{error}</p>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--accent)] text-white rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all active:scale-95"
            >
              <FaArrowLeft className="w-3 h-3" /> Go Back
            </button>
          </div>
        ) : filteredWallpapers.length === 0 ? (
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
        ) : (
          <>
            {/* Wallpapers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
              {filteredWallpapers.map((wall) => (
                <WallpaperCard key={wall.id || wall.slug} {...wall} />
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-10">
                {loadingMore && (
                  <div className="w-10 h-10 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default React.memo(CharacterWallpapersPage);
