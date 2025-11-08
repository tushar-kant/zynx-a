"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

type CharacterCardProps = {
  id: string;
  slug: string;
  animeSlug: string;
  name: string;
  description: string;
  image: string;
  live?: boolean; // ✅ optional flag for live route
};

export default function CharacterCard({
  id,
  slug,
  animeSlug,
  name,
  description,
  image,
  live = false,
}: CharacterCardProps) {
  // ✅ dynamic route: if live → /anime-live/... else → /anime/...
  const href = live
    ? `/anime-live/${animeSlug}/${slug}`
    : `/anime/${animeSlug}/${slug}`;

  return (
    <Link
      href={href}
      key={id}
      className="group block rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={image || logo}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = logo.src;
          }}
        />

        {/* 🔥 Optional LIVE badge */}
        {live && (
          <span className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            LIVE
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{name}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 text-left">
        <h2 className="text-xl font-semibold mb-2 text-[var(--accent)]">
          {name}
        </h2>
        <p className="text-[var(--muted)] text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
