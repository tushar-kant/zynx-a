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
};

export default function CharacterCard({
  id,
  slug,
  animeSlug,
  name,
  description,
  image,
}: CharacterCardProps) {
  return (
    <Link
      href={`/anime/${animeSlug}/${slug}`}
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
