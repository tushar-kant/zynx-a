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
const DEBOUNCE_MS = 350;

function AnimeCharactersPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const initialLoad = useRef(false); // prevents double fetch in StrictMode
  const debounceRef = useRef<number | null>(null);
  const lastSlugRef = useRef<string | null>(null);

  // Fetch characters (page + optional search)
  const fetchCharacters = useCallback(
    async (pageNum: number, searchTerm = query) => {
      if (!slug) return;
      try {
        setLoadingMore(true);
        setError(null);

        const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "";
        const res = await fetch(
          `/api/characters?animeSlug=${encodeURIComponent(slug)}&page=${pageNum}&limit=${LIMIT}${searchParam}`
        );

        const data = await res.json();

        if (!data.success) {
          setError(data.message || "No characters found for this anime.");
          // if first page and no success, clear list
          if (pageNum === 1) setCharacters([]);
          setHasMore(false);
          return;
        }

        const fetched: Character[] = Array.isArray(data.data) ? data.data : [];

        // If first page, replace; otherwise append + dedupe
        if (pageNum === 1) {
          setCharacters(fetched);
        } else {
          setCharacters((prev) => {
            const all = [...prev, ...fetched];
            return all.filter((item, index, self) => index === self.findIndex((a) => a.id === item.id));
          });
        }

        // server-provided hasMore preferred, fallback to array length
        if (typeof data.hasMore === "boolean") {
          setHasMore(data.hasMore);
        } else {
          setHasMore(fetched.length === LIMIT);
        }
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load characters.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [slug, query]
  );

  // Initial fetch guarded for StrictMode and when slug changes
  useEffect(() => {
    // if slug changed, reset state
    if (lastSlugRef.current !== slug) {
      lastSlugRef.current = slug;
      setCharacters([]);
      setPage(1);
      setHasMore(true);
      setQuery("");
      setError(null);
      setLoading(true);
      initialLoad.current = false; // allow initial fetch for new slug
    }

    if (initialLoad.current) return;
    initialLoad.current = true;
    fetchCharacters(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, fetchCharacters]);

  // Debounced search: resets pagination & fetches first page
  useEffect(() => {
    if (!slug) return;

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      // Reset pagination & list, then fetch first page with searchTerm
      setPage(1);
      setHasMore(true);
      setCharacters([]);
      setLoading(true);
      fetchCharacters(1, query);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, slug]);

  // Infinite scroll observer
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

  // Fetch next page when page increments
  useEffect(() => {
    if (page > 1) {
      fetchCharacters(page);
    }
  }, [page, fetchCharacters]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  // Format title from slug
  const animeTitle = slug
    ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "";

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Header */}
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

          {/* Search Box */}
          <div className="flex items-center gap-2 relative">
            <div className={`transition-all duration-300 overflow-hidden ${searchOpen ? "w-40 sm:w-60 opacity-100" : "w-0 opacity-0"}`}>
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
              onClick={() => {
                setSearchOpen((s) => !s);
                if (!searchOpen) setTimeout(() => inputRef.current?.focus(), 150);
              }}
              className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
              title={searchOpen ? "Close Search" : "Search"}
            >
              {searchOpen ? <FaTimes className="w-4 h-4" /> : <FaSearch className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title & Count */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-4">
          {!loading && !error && (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-xs sm:text-sm text-[var(--accent)] font-medium">
              👥 {characters.length} {animeTitle} {characters.length === 1 ? "Character" : "Characters"}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Skeleton */}
        {loading && characters.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative h-64 sm:h-72 md:h-80 rounded-xl bg-[var(--card)] overflow-hidden border border-[var(--border)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--muted)]/10 via-[var(--muted)]/30 to-[var(--muted)]/10 animate-[shimmer_1.6s_infinite_linear]" />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--background)]/80 to-transparent" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg max-w-md">
              <p className="text-red-500 text-sm sm:text-base font-medium">{error}</p>
            </div>
            <button onClick={() => router.back()} className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity">
              Go Back
            </button>
          </div>
        ) : characters.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="text-6xl opacity-20">🎭</div>
            <p className="text-[var(--muted)] text-base sm:text-lg">No matching characters found.</p>
            <button
              onClick={() => {
                setQuery("");
                setCharacters([]);
                setPage(1);
                setHasMore(true);
                setLoading(true);
                fetchCharacters(1, "");
              }}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  id={char.id}
                  slug={char.slug}
                  animeSlug={slug}
                  name={char.name}
                  description={char.description}
                  image={char.image}
                />
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-10">
                {loadingMore && <div className="w-10 h-10 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default React.memo(AnimeCharactersPage);
