"use client";

import UploadForm from "@/components/UploadForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function FileUploadPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 py-16 transition-colors duration-300">
      {/* ✅ Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[var(--border)] pb-4 mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 py-2 rounded-lg text-sm hover:bg-[var(--accent)] hover:text-white transition"
          title="Go Back"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <h1 className="text-3xl font-extrabold text-[var(--accent)]">
            File Upload
          </h1>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-1">
            Upload your anime wallpapers or short clips directly to Cloudinary.
          </p>
        </div>
      </div>

      {/* ✅ Upload Form Section */}
      <section className="flex justify-center items-center">
        <div className="w-full max-w-lg">
          <UploadForm />
        </div>
      </section>
    </main>
  );
}
