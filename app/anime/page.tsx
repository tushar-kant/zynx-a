"use client";
import React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import AnimeCard from "@/components/AnimeCard/AnimeCard";

type Anime = {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover: string;
};

 function AnimePage() {
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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Enhanced Responsive Header */}
      <div className="
        w-full flex flex-col sm:flex-row 
        sm:items-center sm:justify-between 
        gap-4 
        px-4 sm:px-6 md:px-10 lg:px-12
        py-4 sm:py-5 md:py-6 
        border-b border-[var(--border)] 
        bg-[var(--card)]
      ">
        {/* Back Button - Always left aligned */}
        <div className="flex justify-start">
          <Link
            href="/"
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
            <span className="font-medium">Back</span>
          </Link>
        </div>

        {/* Title + Description - Responsive alignment */}
        <div className="
          flex flex-col 
          items-start sm:items-end 
          text-left sm:text-right
          mt-2 sm:mt-0
        ">
          <h1 className="
            text-xl xs:text-2xl sm:text-3xl md:text-4xl 
            font-extrabold 
            text-[var(--accent)] 
            leading-tight
          ">
            Anime Series
          </h1>
          <p className="
            text-[var(--muted)] 
            text-xs xs:text-sm sm:text-base 
            mt-1 
            max-w-[90vw] xs:max-w-[320px] sm:max-w-none
            line-clamp-2 sm:line-clamp-none
          ">
            Explore your favorite anime worlds and their iconic characters.
          </p>
        </div>
      </div>

      {/* Enhanced Responsive Content Grid */}
      <section className="
        w-full
        max-w-7xl 
        mx-auto 
        px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10
        py-8 sm:py-12 md:py-16
      ">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="
              w-12 h-12 
              border-4 border-[var(--accent)] border-t-transparent 
              rounded-full 
              animate-spin
            "></div>
            <p className="text-[var(--muted)] text-sm sm:text-base">
              Loading anime...
            </p>
          </div>
        ) : animeList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--muted)] text-base sm:text-lg">
              No anime found. Check back later!
            </p>
          </div>
        ) : (
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
      </section>
    </main>
  );
}
export default React.memo(AnimePage);
