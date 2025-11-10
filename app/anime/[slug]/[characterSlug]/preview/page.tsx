"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import { FaArrowLeft, FaDownload, FaShareAlt, FaTimes, FaCheck } from "react-icons/fa";

type Wallpaper = {
  id: string;
  slug: string;
  title: string;
  url: string;
  downloadUrl: string;
  tags: string[];
  live?: boolean;
};

export default function WallpaperPreviewPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const wallSlug = searchParams.get("wallSlug");
  const { slug, characterSlug } = params as { slug: string; characterSlug: string };

  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!wallSlug) return;

    const fetchWallpaper = async () => {
      try {
        const res = await fetch(`/api/wallpapers?slug=${wallSlug}`);
        const data = await res.json();

        if (data.success) {
          setWallpaper(data.data);
        } else {
          setError("Wallpaper not found.");
        }
      } catch (err) {
        console.error("Error fetching wallpaper:", err);
        setError("Failed to fetch wallpaper.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallpaper();
  }, [wallSlug]);

  const handleShare = async () => {
    if (navigator.share && wallpaper) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: "Check out this wallpaper on Zynx Wallpapers!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("Sharing is not supported on this device.");
      }
    }
  };

  const isVideoUrl = (url: string) => /\.(mp4|webm|mov|m4v)$/i.test(url);

  // 🔥 FIXED: Proper video download with Cloudinary support
  const handleDownload = async (size: string) => {
    if (!wallpaper?.downloadUrl) return;
    setShowModal(false);

    const url = wallpaper.downloadUrl;

    try {
      // Detect if it's a video from URL
      const isVideo = isVideoUrl(url);
      
      // Get extension from URL if possible
      const urlExtension = url.match(/\.([^./?#]+)(?:[?#]|$)/)?.[1]?.toLowerCase() || '';
      
      // Determine file extension
      let extension = "jpg";
      if (isVideo) {
        extension = urlExtension || "mp4"; // Use URL extension or default to mp4
      } else {
        extension = urlExtension || "jpg";
      }

      // 🎯 Build filename with size and correct extension
      const filename = `${wallpaper.title.replace(/\s+/g, "_")}_${size}.${extension}`;

      // For Cloudinary and other CORS-enabled URLs, try direct download first
      if (url.includes('cloudinary.com') || url.includes('res.cloudinary')) {
        // Direct download link approach
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // Fallback: Fetch and create blob for other URLs
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      
      const blob = await res.blob();

      // 📥 Trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download wallpaper. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[var(--muted)] text-sm">Loading wallpaper...</p>
      </main>
    );
  }

  if (error || !wallpaper) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-6xl opacity-20">🖼️</div>
        <p className="text-[var(--muted)] text-base">{error || "Wallpaper not found."}</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
        >
          <FaArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 w-full bg-[var(--card)] border-b border-[var(--border)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-2 rounded-lg hover:bg-[var(--accent)] hover:text-white transition active:scale-95"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline text-sm font-medium">Back</span>
          </button>

          <h1 className="hidden sm:block text-lg font-bold text-[var(--accent)] truncate flex-1 text-center">
            {wallpaper.title}
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[var(--accent)] text-white px-3 py-2 rounded-lg hover:brightness-110 transition active:scale-95"
            >
              <FaDownload className="w-4 h-4" />
              <span className="hidden xs:inline text-sm font-medium">Download</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-2 rounded-lg hover:bg-[var(--accent)] hover:text-white transition active:scale-95"
            >
              {copied ? <FaCheck className="w-4 h-4" /> : <FaShareAlt className="w-4 h-4" />}
              <span className="hidden xs:inline text-sm font-medium">
                {copied ? "Copied" : "Share"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Wallpaper or Video */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-5xl w-full bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden">
          <div className="relative w-full h-[390px] sm:h-[485px] md:h-[580px] lg:h-[670px] bg-[var(--background)] flex items-center justify-center">
            {isVideoUrl(wallpaper.url) ? (
              <video
                src={wallpaper.url}
                autoPlay
                loop
                
                playsInline
                
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <Image
                src={wallpaper.url || logo}
                alt={wallpaper.title}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* Info Section */}
          <div className="p-4 sm:p-6">
            <h1 className="sm:hidden text-xl font-bold text-[var(--accent)] mb-3 text-center">
              {wallpaper.title}
            </h1>
            {wallpaper.tags && wallpaper.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {wallpaper.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[var(--background)] border border-[var(--border)] rounded-full px-3 py-1 text-[var(--muted)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

{showModal && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
    onClick={() => setShowModal(false)}
  >
    <div
      className="relative bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden max-w-md w-full text-center transform transition-all animate-slideUp"
      onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
    >
      {/* Glowing gradient edge (non-interactive) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-pink-500 to-[var(--accent)] opacity-25 blur-2xl animate-pulse pointer-events-none"></div>

      {/* Modal Content Layer */}
      <div className="relative p-8 z-20">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--accent)] transition p-1"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-3 tracking-wide">
          {isVideoUrl(wallpaper.downloadUrl)
            ? "Download Live Wallpaper"
            : "Download Wallpaper"}
        </h2>

        {/* Description */}
        <p className="text-[var(--muted)] mb-6 text-sm">
          {isVideoUrl(wallpaper.downloadUrl)
            ? "Choose your  format  (MP4)."
            : "Select the size best suited for you"}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {[
            {
              type: "pc",
              label: isVideoUrl(wallpaper.downloadUrl)
                ? " PC (1080p MP4)"
                : " PC (4K Image)",
            },
            {
              type: "phone",
              label: isVideoUrl(wallpaper.downloadUrl)
                ? " Phone (Vertical MP4)"
                : " Phone (Vertical Image)",
            },
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => handleDownload(type)}
              className="relative flex items-center justify-center gap-3 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[var(--accent)] to-pink-600 hover:brightness-110 transition active:scale-95 shadow-lg group"
            >
              <FaDownload className="w-4 h-4 opacity-80 group-hover:translate-y-[2px] transition-transform" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)}



    </main>
  );
}