"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaDownload, FaImages } from "react-icons/fa";
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
  const router = useRouter();
  const slug = params.slug as string;
  const characterSlug = params.characterSlug as string;
  const characterId = characterIdMap[characterSlug];

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId) {
      setError("Character not found");
      setLoading(false);
      return;
    }

    const fetchWallpapers = async () => {
      try {
        const res = await fetch(`/api/wallpapers?characterId=${characterId}&live=${true}`);
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

  // Format character name for display
  const characterName = characterSlug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Enhanced Sticky Header */}
      <div className="
        w-full 
        border-b border-[var(--border)] 
        bg-[var(--card)]
        sticky top-0 z-10
        backdrop-blur-sm
        shadow-sm
      ">
        <div className="
          max-w-7xl mx-auto
          flex flex-col gap-3
          px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10
          py-4 sm:py-5 md:py-6
        ">
          {/* Top Row: Back Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="
                flex items-center gap-2 
                bg-[var(--card)] border border-[var(--border)] 
                px-3 sm:px-4 py-2 
                rounded-lg 
                text-xs sm:text-sm 
                text-[var(--accent)] 
                hover:bg-[var(--accent)] hover:text-white 
                transition-all duration-200
                active:scale-95
              "
              title="Go Back"
            >
              <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium hidden xs:inline">Back to Characters</span>
              <span className="font-medium xs:hidden">Back</span>
            </button>

            {/* Wallpaper Count Badge */}
            {!loading && !error && wallpapers.length > 0 && (
              <div className="
                flex items-center gap-2
                px-3 py-1.5
                bg-[var(--accent)]/10
                border border-[var(--accent)]/20
                rounded-full
                text-xs sm:text-sm
                text-[var(--accent)]
                font-medium
              ">
                <FaImages className="w-3 h-3" />
                <span>{wallpapers.length} {wallpapers.length === 1 ? 'Wallpaper' : 'Wallpapers'}</span>
              </div>
            )}
          </div>

          {/* Bottom Row: Title & Description */}
          <div className="flex flex-col items-start text-left">
            <h1 className="
              text-xl xs:text-2xl sm:text-3xl md:text-4xl 
              font-extrabold 
              text-[var(--accent)] 
              leading-tight
            ">
              {characterName}
            </h1>
            <p className="
              text-[var(--muted)] 
              text-xs xs:text-sm sm:text-base 
              mt-1
            ">
              High-quality wallpapers and artwork
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="
        w-full
        max-w-7xl 
        mx-auto 
        px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10
        py-8 sm:py-12 md:py-16
      ">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="
              w-12 h-12 
              border-4 border-[var(--accent)] border-t-transparent 
              rounded-full 
              animate-spin
            "></div>
            <p className="text-[var(--muted)] text-sm sm:text-base">
              Loading wallpapers...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="
            flex flex-col items-center justify-center 
            min-h-[60vh] gap-6
            px-4
          ">
            <div className="
              text-5xl sm:text-6xl 
              opacity-20
            ">
              🖼️
            </div>
            <div className="
              p-4 sm:p-6
              bg-red-500/10 
              border border-red-500/20 
              rounded-lg
              max-w-md
              text-center
            ">
              <p className="text-red-500 text-sm sm:text-base font-medium mb-2">
                {error}
              </p>
              <p className="text-[var(--muted)] text-xs sm:text-sm">
                Try going back and selecting another character.
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="
                flex items-center gap-2
                px-4 sm:px-6 py-2 sm:py-3
                bg-[var(--accent)] text-white 
                rounded-lg 
                text-sm sm:text-base
                font-medium
                hover:opacity-90
                transition-all
                active:scale-95
              "
            >
              <FaArrowLeft className="w-3 h-3" />
              Go Back
            </button>
          </div>
        )}

        {/* Wallpapers Grid */}
        {!loading && !error && wallpapers.length > 0 && (
          <div className="
            grid 
            grid-cols-1 
            xs:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            gap-4 xs:gap-5 sm:gap-6 md:gap-8
            auto-rows-fr
          ">
            {wallpapers.map((wall) => (
              <WallpaperCard
                key={wall.id}
                slug={wall.slug}
                id={wall.id}
                title={wall.title}
                url={wall.url}
                tags={wall.tags}
                live={true}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && wallpapers.length === 0 && (
          <div className="
            flex flex-col items-center justify-center 
            min-h-[60vh] gap-6
            text-center
            px-4
          ">
            <div className="
              text-6xl sm:text-8xl 
              opacity-20
            ">
              🎨
            </div>
            <div className="max-w-md">
              <h2 className="
                text-lg sm:text-xl 
                font-bold 
                text-[var(--foreground)] 
                mb-2
              ">
                No wallpapers yet
              </h2>
              <p className="text-[var(--muted)] text-sm sm:text-base mb-6">
                We're working on adding wallpapers for {characterName}. Check back soon!
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="
                flex items-center gap-2
                px-4 sm:px-6 py-2 sm:py-3
                bg-[var(--accent)] text-white 
                rounded-lg 
                text-sm sm:text-base
                font-medium
                hover:opacity-90
                transition-all
                active:scale-95
              "
            >
              <FaArrowLeft className="w-3 h-3" />
              Browse Other Characters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}