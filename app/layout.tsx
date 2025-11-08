import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


export const metadata: Metadata = {
  title: "Zynx Wallpapers | Anime PFPs & Wallpapers",
  description: "Free anime wallpapers and PFPs. High quality, fast, and aesthetic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
