"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CharacterCard from "@/components/AnimeCard/CharacterCard";

type Character = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

const animeIdMap: Record<string, string> = {
  "naruto": "1",
  "one-piece": "2",
  "demon-slayer": "3",
};

export default function AnimeCharactersPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const animeId = animeIdMap[slug];

  useEffect(() => {
    if (!animeId) return;

    const fetchCharacters = async () => {
      try {
        const res = await fetch(`/api/characters?animeId=${animeId}`);
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
  }, [animeId]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[var(--accent)] mb-6 capitalize">
          {slug.replace("-", " ")} Characters
        </h1>

        {loading && <p className="text-[var(--muted)]">Loading characters...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
        )}
      </div>
    </main>
  );
}
