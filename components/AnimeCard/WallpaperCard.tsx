"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

type WallpaperCardProps = {
  id: string;
  title: string;
  slug: string;
  url: string;
  tags: string[];
  live?: boolean; // ✅ optional flag for live wallpapers
};

export default function WallpaperCard({
  id,
  title,
  slug,
  url,
  tags,
  live = false,
}: WallpaperCardProps) {
  // ✅ Safe extraction of route segments
  let animeSlug = "";
  let characterSlug = "";

  if (typeof window !== "undefined") {
    const parts = window.location.pathname.split("/");
    animeSlug = parts[2];
    characterSlug = parts[3];
  }

  // ✅ Dynamic route depending on "live"
  const previewPath = live
    ? `/anime-live/${animeSlug}/${characterSlug}/preview`
    : `/anime/${animeSlug}/${characterSlug}/preview`;

  return (
    <Link
      href={{
        pathname: previewPath,
        query: { wallSlug: slug },
      }}
      key={id}
      className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      {/* Media Preview */}
      <div className="relative w-full h-64 overflow-hidden">
        {live ? (
          // 🎥 Video Preview for Live Wallpapers
          <video
            src={url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.error("Video failed to load:", e);
            }}
          />
        ) : (
          // 🖼 Static Image for Normal Wallpapers
          <Image
            src={url || logo}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = logo.src;
            }}
          />
        )}

        {/* 🔥 LIVE Badge for Video Wallpapers */}
        {live && (
          <span className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            LIVE
          </span>
        )}

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* Info Section */}
      <div className="p-4 text-left">
        <h2 className="text-lg font-semibold text-[var(--accent)]">
          {live ? `${title} (Live)` : title}
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-[var(--background)] border border-[var(--border)] rounded-full px-2 py-1 text-[var(--muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
