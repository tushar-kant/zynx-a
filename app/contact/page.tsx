"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic (send to backend or email service)
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">Contact Us</h1>
        <p className="text-[var(--muted)] mb-10">
          Have a question, suggestion, or collaboration idea? We’d love to hear from you!
        </p>

        {submitted ? (
          <div className="p-6 border border-[var(--border)] rounded-xl text-center bg-[var(--card)]">
            <h2 className="text-2xl font-semibold text-[var(--accent)] mb-2">
              ✅ Thank you!
            </h2>
            <p className="text-[var(--muted)]">
              Your message has been sent successfully. We’ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow-xl flex flex-col gap-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
            />
            <textarea
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="p-4 h-40 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition resize-none"
            ></textarea>
            <button
              type="submit"
              disabled
              className="bg-[var(--accent)] text-white font-semibold py-3 rounded-lg hover:bg-[var(--accent-hover)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
