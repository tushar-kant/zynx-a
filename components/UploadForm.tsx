"use client";
import { useState } from "react";
import { FaCloudUploadAlt, FaFileImage, FaVideo } from "react-icons/fa";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    // ✅ Call correct endpoint
    const endpoint =
      uploadType === "image" ? "/api/upload/image" : "/api/upload/video";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        alert("Upload successful ✅");
      } else {
        alert("Upload failed ❌");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setLoading(false);
      alert("Upload failed ❌");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="p-6 text-center">
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-5 border border-[var(--border)] p-8 rounded-2xl bg-[var(--card)] shadow-lg max-w-md mx-auto"
      >
        {/* Upload Type Selector */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            type="button"
            onClick={() => {
              setUploadType("image");
              setPreviewUrl(null);
              setFile(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              uploadType === "image"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white"
            }`}
          >
            <FaFileImage /> Image
          </button>
          <button
            type="button"
            onClick={() => {
              setUploadType("video");
              setPreviewUrl(null);
              setFile(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              uploadType === "video"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white"
            }`}
          >
            <FaVideo /> Video
          </button>
        </div>

        {/* File Input */}
        <input
          type="file"
          accept={uploadType === "image" ? "image/*" : "video/*"}
          onChange={handleFileChange}
          className="cursor-pointer text-[var(--foreground)]"
        />

        {/* Upload Button */}
        <button
          type="submit"
          disabled={loading || !file}
          className="flex items-center justify-center gap-2 bg-[var(--accent)] text-white px-6 py-2 rounded-full hover:bg-[var(--accent-hover)] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaCloudUploadAlt />
          {loading ? "Uploading..." : `Upload ${uploadType === "image" ? "Image" : "Video"}`}
        </button>
      </form>

      {/* Preview Section */}
      {previewUrl && (
        <div className="mt-8">
          <p className="text-[var(--muted)] mb-2">
            Preview ({uploadType.toUpperCase()}):
          </p>
          {uploadType === "image" ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-xl border border-[var(--border)] mx-auto"
            />
          ) : (
            <video
              controls
              src={previewUrl}
              className="w-72 h-48 rounded-xl border border-[var(--border)] mx-auto"
            />
          )}
        </div>
      )}

      {/* Uploaded Cloudinary URL */}
      {uploadedUrl && (
        <div className="mt-6">
          <p className="text-[var(--muted)] mb-2">Uploaded File URL:</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-[var(--accent)] underline hover:text-[var(--accent-hover)]"
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
