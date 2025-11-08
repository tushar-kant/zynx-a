"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCharacters = async () => {
      try {
        const res = await fetch(`/api/characters?animeSlug=${slug}`);
        const data = await res.json();

        if (data.success) {
          setCharacters(data.data);
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

  // Format anime title for display
  const animeTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* 🔙 Header Section with Back Button */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 active:scale-95 w-fit"
            title="Go Back"
          >
            <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">Back</span>
          </button>

          {/* Title */}
          <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--accent)] leading-tight">
              {animeTitle}
            </h1>
            <p className="text-[var(--muted)] text-xs sm:text-base mt-1">
              Meet the iconic characters
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[var(--muted)] text-sm sm:text-base">
              Loading characters...
            </p>
          </div>
        )}

        {/* Error State */}
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
        {!loading && !error && characters.length > 0 && (
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
                live={true}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && characters.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="text-6xl opacity-20">🎭</div>
            <p className="text-[var(--muted)] text-base sm:text-lg">
              No characters found for this anime yet.
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Explore Other Anime
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
export default React.memo(AnimeCharactersPage);