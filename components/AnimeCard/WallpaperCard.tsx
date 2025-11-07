"use client";

import Image from "next/image";
import logo from "@/public/logo.png";

type WallpaperCardProps = {
  id: string;
  title: string;
  url: string;
  downloadUrl: string;
  tags: string[];
};

export default function WallpaperCard({
  id,
  title,
  url,
  downloadUrl,
  tags,
}: WallpaperCardProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: "Check out this anime wallpaper from Zynx Wallpapers!",
          url: window.location.href,
        })
        .catch(() => console.log("Share canceled or failed."));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div
      key={id}
      className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      {/* Wallpaper Image */}
      <div className="relative w-full h-64 overflow-hidden">
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

        {/* Hover Overlay with Actions */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
  <div className="flex gap-3">
    <a
      href={downloadUrl || url}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--accent)] text-white font-semibold hover:brightness-110 hover:shadow-lg px-4 py-2 rounded-full text-sm transition"
    >
      Download
    </a>
    <button
      onClick={handleShare}
      className="bg-white/90 text-black font-semibold hover:bg-white px-4 py-2 rounded-full text-sm transition shadow-md hover:shadow-lg"
    >
      Share
    </button>
  </div>
</div>

      </div>

      {/* Wallpaper Info */}
      <div className="p-4 text-left">
        <h2 className="text-lg font-semibold text-[var(--accent)]">
          {title}
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
    </div>
  );
}
