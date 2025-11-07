"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import WallpaperCard from "@/components/AnimeCard/WallpaperCard";

type Wallpaper = {
  id: string;
  slug: string;
  title: string;
  url: string;
  downloadUrl: string;
  tags: string[];
};

// Map character slug → API ID
const characterIdMap: Record<string, string> = {
  "naruto-uzumaki": "101",
  "itachi-uchiha": "102",
  "kakashi-hatake": "103",
  "monkey-d-luffy": "201",
  "roronoa-zoro": "202",
  "sanji-vinsmoke": "203",
};

export default function CharacterWallpapersPage() {
  const params = useParams();
  const slug = params.slug as string;
  const characterSlug = params.characterSlug as string;
  const characterId = characterIdMap[characterSlug];

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId) return;

    const fetchWallpapers = async () => {
      try {
        const res = await fetch(`/api/wallpapers?characterId=${characterId}`);
        const data = await res.json();
        if (data.success) setWallpapers(data.data);
        else setError("No wallpapers found for this character.");
      } catch (err) {
        console.error("Error fetching wallpapers:", err);
        setError("Failed to load wallpapers.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, [characterId]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[var(--accent)] mb-6 capitalize">
          {characterSlug.replace(/-/g, " ")} Wallpapers
        </h1>

        <Link
          href={`/anime/${slug}`}
          className="inline-block text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] mb-8"
        >
          ← Back to Characters
        </Link>

        {loading && <p className="text-[var(--muted)]">Loading wallpapers...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && wallpapers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallpapers.map((wall) => (
              <WallpaperCard
                key={wall.id}
                id={wall.id}
                title={wall.title}
                url={wall.url}
                downloadUrl={wall.downloadUrl}
                tags={wall.tags}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
