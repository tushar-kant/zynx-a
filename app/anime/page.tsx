"use client";

import { useEffect, useState } from "react";
import AnimeCard from "@/components/AnimeCard/AnimeCard";

type Anime = {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover: string;
};

export default function AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch("/api/anime");
        const data = await res.json();
        if (data.success) setAnimeList(data.data);
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[var(--accent)] mb-8">
          Anime Series
        </h1>
        <p className="text-[var(--muted)] max-w-2xl mx-auto mb-12">
          Explore your favorite anime worlds and their iconic characters.
        </p>

        {loading ? (
          <p className="text-[var(--muted)]">Loading anime...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {animeList.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                name={anime.name}
                slug={anime.slug}
                description={anime.description}
                cover={anime.cover}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
