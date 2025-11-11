"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import AnimeCard from "@/components/AnimeCard/AnimeCard";

type Anime = {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover: string;
};

const LIMIT = 6;

function AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const initialLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Fetch Anime (with pagination + search)
  const fetchAnime = useCallback(
    async (pageNum: number, searchTerm = query) => {
      try {
        setLoadingMore(true);
        const searchParam = searchTerm
          ? `&search=${encodeURIComponent(searchTerm)}`
          : "";
        const res = await fetch(`/api/anime?page=${pageNum}&limit=${LIMIT}${searchParam}`);
        const data = await res.json();

        if (data.success) {
          const fetched = Array.isArray(data.data) ? data.data : [];
          if (fetched.length === 0) {
            setHasMore(false);
            if (pageNum === 1) setAnimeList([]);
          } else {
            if (pageNum === 1) {
              setAnimeList(fetched);
            } else {
              // Deduplicate to avoid duplicates when scrolling
              setAnimeList((prev) => {
                const all = [...prev, ...fetched];
                return all.filter(
                  (item, index, self) =>
                    index === self.findIndex((a) => a.id === item.id)
                );
              });
            }
            setHasMore(data.hasMore);
          }
        }
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [query]
  );

  // 🔹 Initial fetch (prevent double fetch on StrictMode)
  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;
    fetchAnime(1);
  }, [fetchAnime]);

  // 🔹 Handle search with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      setAnimeList([]);
      fetchAnime(1, query);
    }, 400); // debounce delay 400ms
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchAnime]);

  // 🔹 Auto-focus search
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  // 🔹 Infinite Scroll Observer
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
      observer.disconnect();
    };
  }, [hasMore, loadingMore]);

  // 🔹 Fetch next page when page changes
  useEffect(() => {
    if (page > 1) fetchAnime(page);
  }, [page, fetchAnime]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ✅ Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-20 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-5">
          {/* 🔙 Back */}
          <Link
            href="/"
            className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 sm:px-4 py-2 rounded-lg text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 active:scale-95"
            title="Go Back"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="font-medium hidden xs:inline">Back</span>
          </Link>

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
                placeholder="Search anime..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-all duration-200"
              />
            </div>

            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) setTimeout(() => inputRef.current?.focus(), 200);
              }}
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

        {/* 🎬 Anime Count */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-4">
          {!loading && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-xs sm:text-sm text-[var(--accent)] font-medium">
              🎬 {animeList.length}{" "}
              {animeList.length === 1 ? "Anime" : "Animes"}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Anime Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {loading && animeList.length === 0 ? (
          // 🌀 Skeleton Loader
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8 auto-rows-fr">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="relative h-64 sm:h-72 md:h-80 rounded-xl bg-[var(--card)] overflow-hidden border border-[var(--border)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--muted)]/10 via-[var(--muted)]/30 to-[var(--muted)]/10 animate-[shimmer_1.6s_infinite_linear]" />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--background)]/80 to-transparent" />
              </div>
            ))}
          </div>
        ) : animeList.length === 0 ? (
          // ❌ No Results
          <div className="text-center py-16">
            <p className="text-[var(--muted)] text-base sm:text-lg">
              No anime found.
            </p>
          </div>
        ) : (
          <>
            {/* ✅ Anime Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8 auto-rows-fr">
              {animeList.map((anime) => (
                <AnimeCard key={anime.id} {...anime} />
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

export default React.memo(AnimePage);
