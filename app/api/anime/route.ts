import { NextResponse } from "next/server";

export async function GET() {
  const animeList = [
    {
      id: 1,
      name: "Naruto",
      slug: "naruto",
      description: "A young ninja dreams to become Hokage of Konoha.",
      cover:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
    },
    {
      id: 2,
      name: "One Piece",
      slug: "one-piece",
      description:
        "Monkey D. Luffy sets sail to become the Pirate King and find the One Piece.",
      cover:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538098/zynx-anime/pmptes9hx3ehsxocnqir.jpg",
    },
    {
      id: 3,
      name: "Demon Slayer",
      slug: "demon-slayer",
      description:
        "Tanjiro fights demons while protecting his sister Nezuko.",
      cover:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762537348/zynx-anime/b3oddwrpknooa97cl8cm.jpg",
    },
  ];

  return NextResponse.json({ success: true, data: animeList });
}
