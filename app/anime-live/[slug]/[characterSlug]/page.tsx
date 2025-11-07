"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

type Wallpaper = {
  id: string;
  slug: string;
  title: string;
  url: string;
  downloadUrl: string;
  tags: string[];
};

// Map character slug → ID used in /api/wallpapers
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
        if (data.success) {
          setWallpapers(data.data);
        } else {
          setError("No wallpapers found for this character.");
        }
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
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-[var(--accent)] mb-6 capitalize">
          {characterSlug.replace(/-/g, " ")} Wallpapers
        </h1>

        <Link
          href={`/anime/${slug}`}
          className="inline-block text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] mb-8"
        >
          ← Back to Characters
        </Link>

        {/* States */}
        {loading && <p className="text-[var(--muted)]">Loading wallpapers...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Wallpaper Grid */}
        {!loading && !error && wallpapers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallpapers.map((wall) => (
              <div
                key={wall.id}
                className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={wall.url || logo}
                    alt={wall.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = logo.src;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <div className="flex gap-3">
                      <a
                        href={wall.downloadUrl || wall.url}
                        download
                        target="_blank"
                        className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-full text-sm font-medium transition"
                      >
                        Download
                      </a>
                      <button
                        onClick={() =>
                          navigator.share
                            ? navigator.share({
                                title: wall.title,
                                url: window.location.href,
                              })
                            : alert("Sharing not supported on this device.")
                        }
                        className="border border-[var(--border)] hover:bg-[var(--card)] text-sm px-4 py-2 rounded-full transition"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 text-left">
                  <h2 className="text-lg font-semibold text-[var(--accent)]">
                    {wall.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {wall.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[var(--card)] border border-[var(--border)] rounded-full px-2 py-1 text-[var(--muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
