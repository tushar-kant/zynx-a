"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
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
  const [filteredList, setFilteredList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch("/api/anime");
        const data = await res.json();
        if (data.success) {
          setAnimeList(data.data);
          setFilteredList(data.data);
        }
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  // 🔍 Handle search
  useEffect(() => {
    if (!query.trim()) {
      setFilteredList(animeList);
    } else {
      const filtered = animeList.filter((anime) =>
        anime.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [query, animeList]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ✅ Header */}
      <div
        className="
        w-full flex items-center justify-between 
        px-4 sm:px-6 md:px-10 
        py-3 sm:py-5 
        border-b border-[var(--border)] 
        bg-[var(--card)] sticky top-0 z-20
      "
      >
        {/* 🔙 Back Button (Left) */}
        <Link
          href="/"
          className="
            flex items-center gap-2 
            bg-[var(--card)] border border-[var(--border)] 
            px-3 py-2 rounded-lg 
            text-sm 
            text-[var(--accent)] 
            hover:bg-[var(--accent)] hover:text-white 
            transition-all duration-200
            active:scale-95
          "
          title="Go Back"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="font-medium hidden xs:inline">Back</span>
        </Link>

        {/* 🔍 Search Area (Right) */}
        <div className="flex items-center gap-2 relative">
          {/* Expandable Input */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              searchOpen ? "w-40 sm:w-60 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Search anime..."
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

          {/* Search Toggle Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
          >
            {searchOpen ? (
              <FaTimes className="w-4 h-4" />
            ) : (
              <FaSearch className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Anime Grid */}
      <section
        className="
        w-full
        max-w-7xl 
        mx-auto 
        px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10
        py-8 sm:py-12 md:py-16
      "
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div
              className="
              w-12 h-12 
              border-4 border-[var(--accent)] border-t-transparent 
              rounded-full animate-spin
            "
            ></div>
            <p className="text-[var(--muted)] text-sm sm:text-base">
              Loading anime...
            </p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--muted)] text-base sm:text-lg">
              No anime found.
            </p>
          </div>
        ) : (
          <div
            className="
            grid 
            grid-cols-1 
            xs:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            gap-4 xs:gap-5 sm:gap-6 md:gap-8
            auto-rows-fr
          "
          >
            {filteredList.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default React.memo(AnimePage);
