"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import Link from "next/link";
import { FaArrowLeft, FaCloudUploadAlt, FaLock } from "react-icons/fa";

export default function FileUploadPage() {
  // 🔹 Toggle this variable: 1 = show upload; 0 = show "Coming Soon"
  const uploadEnabled = 0;

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#11121a] to-[#0a0a0f] text-white overflow-hidden">
      {/* 🔹 Animated Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,150,0.15),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(0,180,255,0.15),transparent_60%)] animate-pulse-slow"></div>

      {/* 🔹 Top Navigation Bar */}
      <header className="sticky top-0 z-20 w-full border-b border-white/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2 rounded-lg text-sm hover:bg-[var(--accent)] hover:text-white transition active:scale-95"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            {uploadEnabled ? "Upload Portal" : "Coming Soon"}
          </h1>
        </div>
      </header>

      {/* 🔹 Main Content */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20">
        {uploadEnabled ? (
          <>
            {/* 🌸 Upload Header */}
            <div className="mb-10 flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg animate-float">
                <FaCloudUploadAlt className="w-10 h-10" />
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                Upload Your Anime Wallpaper
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-md">
                Share your favorite anime wallpapers or short video clips directly to Cloudinary. Supported: JPG, PNG, MP4, WEBM.
              </p>
            </div>

            {/* 🌸 Upload Card */}
            <div className="w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_0_40px_-10px_rgba(255,0,150,0.3)] p-6 sm:p-8 transition-all hover:shadow-[0_0_60px_-10px_rgba(255,0,200,0.4)]">
              <UploadForm />
            </div>
          </>
        ) : (
          <>
            {/* 🌙 Coming Soon Section */}
            <div className="flex flex-col items-center justify-center mt-16">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white shadow-lg animate-float">
                <FaLock className="w-10 h-10 opacity-70" />
              </div>

              <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">
                Coming Soon
              </h2>

              <p className="mt-3 text-gray-400 max-w-sm text-sm sm:text-base">
                The upload portal is currently locked. Stay tuned — something exciting is on the way!
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm sm:text-base font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 active:scale-95 transition"
              >
                <FaArrowLeft className="w-4 h-4" />
                Go Back
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
