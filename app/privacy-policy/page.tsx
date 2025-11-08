"use client";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-6">Privacy Policy</h1>
        <p className="text-[var(--muted)] mb-10">Last updated: November 2025</p>

        <p className="mb-6 leading-relaxed">
          At <strong>Zynx Anime</strong>, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our website.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">1. Information We Collect</h2>
        <p className="mb-6">
          We may collect information you provide directly (such as when you contact us) and technical information like your browser type, device, and usage data through analytics tools.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">2. How We Use Your Information</h2>
        <p className="mb-6">
          Your information is used to improve our website experience, personalize content, and ensure smooth operation. We never sell your personal data.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">3. Cookies</h2>
        <p className="mb-6">
          We use cookies to remember preferences and analyze website traffic. You can disable cookies in your browser settings if you prefer.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">4. Third-Party Services</h2>
        <p className="mb-6">
          Our site may include links or integrations from third-party platforms such as analytics tools or social media. Each service has its own privacy practices.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">5. Your Rights</h2>
        <p className="mb-6">
          You have the right to request access, correction, or deletion of your data. Contact us at <a href="/contact" className="text-[var(--accent)] hover:underline">here</a> to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">6. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy occasionally. The updated version will be posted on this page with a new “Last updated” date.
        </p>

        <p>
          If you have questions, please contact us at{" "}
          <a href="/contact" className="text-[var(--accent)] hover:underline">Zynx Anime Contact</a>.
        </p>
      </div>
    </main>
  );
}
