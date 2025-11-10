"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import CharacterCard from "@/components/AnimeCard/CharacterCard";

type Character = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

const LIMIT = 8;

function AnimeCharactersPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch Characters (with pagination)
  const fetchCharacters = useCallback(
    async (pageNum: number) => {
      if (!slug) return;
      try {
        setLoadingMore(true);
        const res = await fetch(
          `/api/characters?animeSlug=${slug}&page=${pageNum}&limit=${LIMIT}`
        );
        const data = await res.json();

        if (data.success) {
          if (Array.isArray(data.data)) {
            if (data.data.length === 0) {
              setHasMore(false);
            } else {
              setCharacters((prev) => [...prev, ...data.data]);
              setFilteredCharacters((prev) => [...prev, ...data.data]);
            }
          } else {
            setCharacters(data.data || []);
            setFilteredCharacters(data.data || []);
            setHasMore(false);
          }
        } else {
          setError(data.message || "No characters found for this anime.");
        }
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load characters.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [slug]
  );

  // 🔹 Initial fetch
  useEffect(() => {
    fetchCharacters(1);
  }, [fetchCharacters]);

  // 🔹 Infinite scroll trigger
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

  // 🔹 Load next page
  useEffect(() => {
    if (page > 1) fetchCharacters(page);
  }, [page, fetchCharacters]);

  // 🔍 Search
  useEffect(() => {
    if (!query.trim()) {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter((char) =>
        char.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [query, characters]);

  // Autofocus
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const animeTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ✅ Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 sm:px-4 py-2 rounded-lg text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 active:scale-95"
            title="Go Back"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="font-medium hidden xs:inline">Back</span>
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
                placeholder="Search characters..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-all duration-200"
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

        {/* Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--accent)] leading-tight">
            {animeTitle}
          </h1>
        </div>
      </div>

      {/* ✅ Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Skeleton Shimmer */}
        {loading && characters.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-[var(--card)] overflow-hidden relative">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[var(--muted)]/20 via-[var(--muted)]/40 to-[var(--muted)]/20"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg max-w-md">
              <p className="text-red-500 text-sm sm:text-base font-medium">{error}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Go Back
            </button>
          </div>
        ) : filteredCharacters.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="text-6xl opacity-20">🎭</div>
            <p className="text-[var(--muted)] text-base sm:text-lg">No matching characters found.</p>
            <button
              onClick={() => setQuery("")}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            {/* Character Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
              {filteredCharacters.map((char) => (
                <CharacterCard
                  key={char.id}
                  id={char.id}
                  slug={char.slug}
                  animeSlug={slug}
                  name={char.name}
                  description={char.description}
                  image={char.image}
                  live={true}
                />
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

export default React.memo(AnimeCharactersPage);
