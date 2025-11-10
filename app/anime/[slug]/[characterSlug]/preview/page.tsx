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
  live?: boolean; // 🔥 add this field to mark as live (video)
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

  const handleDownload = async (size: string) => {
    if (!wallpaper?.downloadUrl) return;
    setShowModal(false);

    const sizeMap: Record<string, string> = {
      pc: `${wallpaper.downloadUrl}`,
  
      phone: `${wallpaper.downloadUrl}`,
    };

    const url = sizeMap[size];
    if (!url) return;

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const extension = blob.type.split("/")[1] || "jpg";
      link.download = `${wallpaper.title.replace(/\s+/g, "_")}_${size}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download wallpaper. Please try again.");
    }
  };

  // 🔹 Helper — check if URL is a video
  const isVideoUrl = (url: string) => /\.(mp4|webm|mov|m4v)$/i.test(url);

if (loading) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
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
      {/* Top Action Bar */}
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

      {/* Wallpaper / Video Display */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-5xl w-full bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden">
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-[var(--background)] flex items-center justify-center">
            {isVideoUrl(wallpaper.url) ? (
              <video
                src={wallpaper.url}
                autoPlay
                loop
                muted
                playsInline
                controls
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

      {/* Download Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-[var(--card)] p-6 rounded-xl shadow-2xl text-center max-w-sm w-full border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--accent)] transition p-1"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-[var(--accent)] mb-6 pr-6">
              Choose Download Size
            </h2>

            <div className="flex flex-col gap-3">
              {[
                { type: "pc", label: "PC (4K)", icon: "🖥️" },
         
                { type: "phone", label: "Phone (Vertical)", icon: "📱" },
              ].map(({ type, label, icon }) => (
                <button
                  key={type}
                  onClick={() => handleDownload(type)}
                  className="flex items-center justify-center gap-3 bg-[var(--accent)] text-white py-3 rounded-lg hover:brightness-110 transition active:scale-95"
                >
                  <span className="text-lg">{icon}</span>
                  <span className="font-medium">{label}</span>
                  <FaDownload className="w-4 h-4 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
