"use client";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.secure_url) {
      setImageUrl(data.secure_url);
      alert("Upload successful ✅");
    } else {
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="p-6 text-center">
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-4 border border-[var(--border)] p-6 rounded-xl bg-[var(--card)]"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="cursor-pointer text-[var(--foreground)]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--accent)] text-white px-5 py-2 rounded-full hover:bg-[var(--accent-hover)] transition"
        >
          {loading ? "Uploading..." : "Upload to Cloudinary"}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-6">
          <p className="text-[var(--muted)] mb-2">Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-xl border border-[var(--border)] mx-auto"
          />
          <p className="mt-2 text-sm break-all text-[var(--muted)]">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
