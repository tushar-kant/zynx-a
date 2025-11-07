import Link from "next/link";

export const metadata = {
  title: "About | Zynx Wallpapers",
  description:
    "Learn more about Zynx Wallpapers — your free anime wallpaper and PFP hub for all otakus. Discover our mission, vision, and story.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* 🏠 Hero Section */}
      <section className="text-center py-24 px-6 bg-[var(--card)] border-b border-[var(--border)]">
        <h1 className="text-5xl font-extrabold text-[var(--accent)] mb-4">
          About Zynx Wallpapers
        </h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Bringing anime worlds closer to your screen 🎌
        </p>
      </section>

      {/* 💫 Story Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 leading-relaxed text-center">
        <h2 className="text-3xl font-semibold mb-6 text-[var(--accent)]">
          🌸 Our Story
        </h2>
        <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto mb-8">
          Zynx Wallpapers was born out of passion for anime art and the beauty
          of every frame. We wanted to create a free, accessible platform where
          anime lovers could find, download, and share high-quality wallpapers
          and profile pictures of their favorite characters — all optimized for
          today’s screens.
        </p>
        <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto">
          From epic battles to peaceful moments, our wallpapers are curated to
          capture the soul of anime — vibrant, emotional, and powerful. We’re
          continuously expanding to include games, abstract art, and aesthetic
          digital vibes.
        </p>
      </section>

      {/* 🚀 Mission Section */}
      <section className="bg-[var(--card)] py-16 px-6 text-center border-y border-[var(--border)] transition-colors duration-300">
        <h2 className="text-3xl font-semibold mb-6 text-[var(--accent)]">
          🚀 Our Mission
        </h2>
        <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto mb-6">
          Our mission is simple — to become the ultimate destination for anime
          enthusiasts to express their identity through art. Whether it’s a PFP
          that matches your mood or a wallpaper that defines your vibe, Zynx
          Wallpapers is here to make your screen feel alive.
        </p>
        <div className="flex justify-center mt-8">
          <Link
            href="/wallpapers"
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Explore Wallpapers →
          </Link>
        </div>
      </section>

      {/* 🤝 Values Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10 text-[var(--accent)]">
          💖 What We Believe In
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 border border-[var(--border)] rounded-2xl bg-[var(--card)] hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">
              Creativity
            </h3>
            <p className="text-[var(--muted)]">
              Every wallpaper tells a story. We believe in celebrating artistic
              expression and giving creators the spotlight they deserve.
            </p>
          </div>

          <div className="p-6 border border-[var(--border)] rounded-2xl bg-[var(--card)] hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">
              Community
            </h3>
            <p className="text-[var(--muted)]">
              We’re not just a site — we’re a growing community of anime lovers
              worldwide, united by passion and creativity.
            </p>
          </div>

          <div className="p-6 border border-[var(--border)] rounded-2xl bg-[var(--card)] hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">
              Free Access
            </h3>
            <p className="text-[var(--muted)]">
              We believe that art should be accessible to everyone. All our
              wallpapers are free — forever.
            </p>
          </div>
        </div>
      </section>

      {/* 📸 Social Section */}
      <section className="py-20 text-center border-t border-[var(--border)] bg-[var(--background)]">
        <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
        <p className="text-[var(--muted)] mb-6">
          Join our journey on Instagram for daily anime drops and behind-the-scenes updates.
        </p>

        <a
          href="https://instagram.com/zynx.v1"
          target="_blank"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zM12 8.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.25-.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            />
          </svg>
          @zynx.v1
        </a>
      </section>
    </main>
  );
}
