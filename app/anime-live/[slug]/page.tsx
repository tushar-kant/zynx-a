"use client";
import React, { useEffect, useState, useRef } from "react";
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

function AnimeCharactersPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCharacters = async () => {
      try {
        const res = await fetch(`/api/characters?animeSlug=${slug}`);
        const data = await res.json();

        if (data.success) {
          setCharacters(data.data);
          setFilteredCharacters(data.data);
        } else {
          setError("No characters found for this anime.");
        }
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [slug]);

  // 🔍 Handle character search
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

  // Autofocus when expanding search bar
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Format anime title
  const animeTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ✅ Header Section */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
          {/* 🔙 Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 sm:px-4 py-2 rounded-lg text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 active:scale-95"
            title="Go Back"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="font-medium hidden xs:inline">Back</span>
          </button>

          {/* 🔍 Search Bar (Right Side) */}
          <div className="flex items-center gap-2 relative">
            {/* Expandable Input */}
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
                className="
                  w-full border border-[var(--border)] bg-[var(--background)] 
                  text-[var(--foreground)] placeholder-[var(--muted)] 
                  px-3 py-2 rounded-lg text-sm 
                  focus:outline-none focus:border-[var(--accent)] 
                  transition-all duration-200
                "
              />
            </div>

            {/* Search / Close Icon */}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--accent)] leading-tight">
            {animeTitle}
          </h1>
         
        </div>
      </div>

      {/* ✅ Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[var(--muted)] text-sm sm:text-base">
              Loading characters...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg max-w-md">
              <p className="text-red-500 text-sm sm:text-base font-medium">
                {error}
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Character Grid */}
        {!loading && !error && filteredCharacters.length > 0 && (
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
        )}

        {/* Empty Search Result */}
        {!loading && !error && filteredCharacters.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="text-6xl opacity-20">🎭</div>
            <p className="text-[var(--muted)] text-base sm:text-lg">
              No matching characters found.
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

export default React.memo(AnimeCharactersPage);
