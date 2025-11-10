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

const LIMIT = 6; // Number of anime per page

function AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredList, setFilteredList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch Anime (supports pagination or full list)
  const fetchAnime = useCallback(async (pageNum: number) => {
    try {
      setLoadingMore(true);
      const res = await fetch(`/api/anime?page=${pageNum}&limit=${LIMIT}`);
      const data = await res.json();

      if (data.success) {
        // If backend supports pagination
        if (Array.isArray(data.data)) {
          if (data.data.length === 0) {
            setHasMore(false);
          } else {
            setAnimeList((prev) => [...prev, ...data.data]);
            setFilteredList((prev) => [...prev, ...data.data]);
          }
        } else {
          // Fallback: if backend returns full list without pagination
          setAnimeList(data.data || []);
          setFilteredList(data.data || []);
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error fetching anime:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // 🔹 Initial fetch
  useEffect(() => {
    fetchAnime(1);
  }, [fetchAnime]);

  // 🔍 Search filter
  useEffect(() => {
    if (!query.trim()) {
      setFilteredList(animeList);
    } else {
      const filtered = animeList.filter((anime) =>
        anime.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [query, animeList]);

  // 🔹 Auto focus search
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  // 🔹 Infinite Scroll Observer
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loadingMore]);

  // 🔹 Fetch when page changes
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
                className="
                  w-full border border-[var(--border)] bg-[var(--background)] 
                  text-[var(--foreground)] placeholder-[var(--muted)] 
                  px-3 py-2 rounded-lg text-sm 
                  focus:outline-none focus:border-[var(--accent)] 
                  transition-all duration-200
                "
              />
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
              title={searchOpen ? "Close Search" : "Search"}
            >
              {searchOpen ? <FaTimes className="w-4 h-4" /> : <FaSearch className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Anime Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {loading && animeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            <p className="text-[var(--muted)] text-sm sm:text-base">Loading anime...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--muted)] text-base sm:text-lg">No anime found.</p>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8 auto-rows-fr"
            >
              {filteredList.map((anime) => (
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
