"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

type AnimeCardProps = {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover: string;
};

export default function AnimeCard({ id, name, slug, description, cover }: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${slug}`}
      key={id}
      className="group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={cover || logo}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = logo.src;
          }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="text-white text-lg font-bold">{name}</span>
        </div>
      </div>

      {/* Text Content */}
      <div className="p-5 text-left">
        <h2 className="text-xl font-semibold mb-2 text-[var(--accent)]">
          {name}
        </h2>
        <p className="text-[var(--muted)] text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
