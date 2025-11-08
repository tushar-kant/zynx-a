import Link from "next/link";

export const metadata = {
  title: "About | Zynx Wallpapers",
  description:
    "Learn more about Zynx Wallpapers — your free anime wallpaper and PFP hub for all otakus. Discover our mission, vision, and story.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* 🌸 Hero Section */}
      <section className="relative text-center py-28 px-6 overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--card)] to-transparent">
        {/* Animated Glow Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-10 blur-[160px] animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-500">
          About Zynx Wallpapers
        </h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Bringing anime worlds closer to your screen 🎌
        </p>
      </section>

      {/* 💫 Our Story */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-400">
          🌸 Our Story
        </h2>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-3xl mx-auto mb-8">
          Zynx Wallpapers was born out of pure passion for anime artistry — from
          breathtaking battle scenes to peaceful moments of serenity. Our goal
          was simple: to create a free, accessible hub for fans to find
          high-quality anime wallpapers, PFPs, and aesthetic visuals that speak
          to the heart of every otaku.
        </p>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-3xl mx-auto">
          Whether it’s the fierce determination of Naruto or the serenity of
          Tanjiro’s journey, we believe every wallpaper should carry the same
          emotion as the anime it came from — vibrant, soulful, and inspiring.
        </p>
      </section>

      {/* 🚀 Mission Section */}
      <section className="relative bg-[var(--card)] py-20 px-6 text-center border-y border-[var(--border)]">
        {/* Animated gradient glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[var(--accent)]/10 to-transparent opacity-30" />

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-400">
            🚀 Our Mission
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Our mission is to make every anime fan’s device a reflection of
            their personality. Whether you crave high-energy battle scenes,
            calm aesthetic vibes, or dark mysterious edits — Zynx Wallpapers is
            your gateway to the world of art and fandom, powered by community
            and creativity.
          </p>
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300"
          >
            Explore Wallpapers →
          </Link>
        </div>
      </section>

      {/* 💖 Values Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-400">
          💖 What We Believe In
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Creativity",
              desc: "Every wallpaper tells a story. We celebrate artistic expression and give creators the spotlight they deserve.",
              icon: "🎨",
            },
            {
              title: "Community",
              desc: "We’re not just a site — we’re a global community of anime fans united by creativity and shared passion.",
              icon: "🌍",
            },
            {
              title: "Free Access",
              desc: "Art should be for everyone. All wallpapers here are 100% free — forever. Because fandom should never have a paywall.",
              icon: "💎",
            },
          ].map((val, i) => (
            <div
              key={i}
              className="group relative p-8 border border-[var(--border)] rounded-2xl bg-[var(--card)] hover:shadow-[0_0_25px_var(--accent)] transition-all duration-300 hover:scale-[1.03]"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{val.icon}</span>
                <h3 className="text-xl font-semibold mb-3 text-[var(--accent)]">
                  {val.title}
                </h3>
                <p className="text-[var(--muted)] text-base">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📸 Follow Section */}
      <section className="relative py-24 text-center border-t border-[var(--border)] bg-[var(--background)] overflow-hidden">
        {/* Moving glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[var(--accent)] to-purple-700 opacity-10 blur-[180px] animate-pulse -translate-x-1/2 -translate-y-1/2" />
        </div>

        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-400">
          Follow Our Journey 🌌
        </h2>
        <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto text-lg">
          Join us on Instagram for daily anime drops, wallpaper previews, and
          behind-the-scenes of the Zynx creative process.
        </p>

        <a
          href="https://instagram.com/zynx.v1"
          target="_blank"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-110 hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300"
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
          <span>@zynx.v1</span>
        </a>
      </section>
    </main>
  );
}
