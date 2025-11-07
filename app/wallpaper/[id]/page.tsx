import Image from "next/image";
import { Metadata } from "next";

type Props = { params: { id: string } };

// 🧠 Dynamic SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.id.replace(/-/g, " ").toUpperCase()} | Zynx Wallpapers`,
    description: `Download ${params.id.replace(/-/g, " ")} in high quality. Free anime wallpapers by Zynx.`,
  };
}

export default async function WallpaperPage({ params }: Props) {
  const wallpaper = {
    id: params.id,
    title: params.id.replace(/-/g, " ").toUpperCase(),
    url: `https://res.cloudinary.com/demo/image/upload/v1723456789/${params.id}.jpg`,
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold text-[var(--accent)] mb-6">
        {wallpaper.title}
      </h1>
      <Image
        src={wallpaper.url}
        alt={wallpaper.title}
        width={900}
        height={500}
        className="rounded-xl shadow-lg border border-[var(--border)]"
      />

      <div className="flex gap-4 mt-8">
        <a
          href={wallpaper.url}
          download
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Download
        </a>
        <button
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: wallpaper.title,
                  url: window.location.href,
                })
              : alert("Sharing not supported on this device.")
          }
          className="border border-[var(--border)] px-6 py-3 rounded-full hover:bg-[var(--card)] transition"
        >
          Share
        </button>
      </div>
    </main>
  );
}
