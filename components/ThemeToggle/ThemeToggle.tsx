"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "light", label: "☀️ Light" },
  { id: "dark", label: "🌙 Dark" },
  { id: "cyber", label: "💠 Cyber" },
  { id: "sakura", label: "🌸 Sakura" },
  { id: "violet", label: "💜 Violet" },
  { id: "ember", label: "🔥 Ember" },
  { id: "midnight", label: "🌪️ Midnight" },
  { id: "ocean", label: "🌊 Ocean" },
  { id: "forest", label: "🍃 Forest" },
  { id: "crimson", label: "🩸 Crimson" },
  { id: "galaxy", label: "🌌 Galaxy" },
  { id: "sunset", label: "🌅 Sunset" },
  { id: "ice", label: "❄️ Ice" },
  { id: "monochrome", label: "🎭 Monochrome" },
  { id: "tropical", label: "🌺 Tropical" },
  { id: "retro", label: "👾 Retro" },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Change theme handler
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theme-toggle-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative inline-block text-left theme-toggle-container">
      {/* Current Theme Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border border-[var(--border)] rounded-full bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
        aria-label="Select Theme"
      >
        {themes.find((t) => t.id === theme)?.label || "🎨 Theme"}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-md max-h-80 overflow-y-auto">
          <div className="py-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`block w-full text-left px-4 py-2.5 text-sm transition-all ${
                  theme === t.id
                    ? "bg-[var(--accent)] text-white font-semibold"
                    : "hover:bg-[var(--accent)] hover:text-white text-[var(--foreground)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}