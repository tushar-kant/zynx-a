import { NextResponse } from "next/server";

export async function GET() {
  const animeList = [
    {
      id: 1,
      name: "Naruto 🌀",
      slug: "naruto",
      description: "A young ninja, Naruto Uzumaki, dreams of becoming the Hokage to earn the respect of his village.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
    },
    {
      id: 2,
      name: "One Piece 🏴‍☠️",
      slug: "one-piece",
      description: "Monkey D. Luffy and his pirate crew sail the Grand Line seeking the legendary treasure — the One Piece.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538098/zynx-anime/pmptes9hx3ehsxocnqir.jpg",
    },
    {
      id: 3,
      name: "Bleach ⚔️",
      slug: "bleach",
      description: "Ichigo Kurosaki gains the powers of a Soul Reaper and battles Hollows to protect both the living and the dead.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584209/zynx-anime/naruto/cmylqsrnmu5koturo3aa.jpg",
    },
    {
      id: 4,
      name: "Attack on Titan 🔥",
      slug: "attack-on-titan",
      description: "Eren Yeager and his friends fight for humanity’s survival against the monstrous Titans that threaten their world.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584301/zynx-anime/naruto/aybnqy8qlvchludpogxc.jpg",
    },
    {
      id: 5,
      name: "Demon Slayer 💫",
      slug: "demon-slayer",
      description: "Tanjiro Kamado embarks on a dangerous quest to save his sister Nezuko and eliminate demons plaguing the world.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762537348/zynx-anime/b3oddwrpknooa97cl8cm.jpg",
    },
    {
      id: 6,
      name: "Jujutsu Kaisen 👊",
      slug: "jujutsu-kaisen",
      description: "Yuji Itadori joins Tokyo Jujutsu High to battle curses after consuming a powerful cursed object.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584742/zynx-anime/eoxrwnrwrdrshdefsvws.jpg",
    },
    {
      id: 7,
      name: "One Punch Man 💥",
      slug: "one-punch-man",
      description: "Saitama can defeat any opponent with a single punch, but struggles to find a worthy challenge.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584809/zynx-anime/psoxwjwfhlmcahlq2tjx.jpg",
    },
    {
      id: 8,
      name: "Death Note ☠️",
      slug: "death-note",
      description: "A high school student discovers a supernatural notebook that grants the power to kill anyone by writing their name.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593535/zynx-anime/bdetgyzqkwrwuxejw1t8.jpg",
    },
    {
      id: 9,
      name: "Fullmetal Alchemist ⚗️",
      slug: "fullmetal-alchemist",
      description: "Two brothers use alchemy to search for the Philosopher’s Stone after a tragic accident costs them their bodies.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584959/zynx-anime/w3g6n9obbape6bogwrku.jpg",
    },
    {
      id: 10,
      name: "My Hero Academia 🦸‍♂️",
      slug: "my-hero-academia",
      description: "In a world full of heroes and quirks, Izuku Midoriya dreams of becoming the greatest hero of all time.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593655/zynx-anime/b5absj90ap6gaac7kcj6.jpg",
    },
    {
      id: 11,
      name: "Solo Leveling ⚔️",
      slug: "solo-leveling",
      description: "Sung Jinwoo, the weakest hunter, gains a mysterious system that lets him level up beyond human limits.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593839/zynx-anime/sooptr23alloix5qgb9g.jpg",
    },
    {
      id: 12,
      name: "Dragon Ball 🐉",
      slug: "dragon-ball",
      description: "Goku and his friends embark on thrilling adventures to find the Dragon Balls and defend Earth from powerful foes.",
      cover: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593722/zynx-anime/q9off5ji03mzvrnh79be.jpg",
    },
  ];

  return NextResponse.json({ success: true, data: animeList });
}
