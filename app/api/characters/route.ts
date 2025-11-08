import { NextResponse } from "next/server";


import { narutoCharacters } from "./data/naruto";
import { onePieceCharacters } from "./data/one-piece";


// ⚔️ Bleach
const bleachCharacters = [
  {
    id: "301",
    slug: "ichigo-kurosaki",
    name: "Ichigo Kurosaki",
    description: "A substitute Soul Reaper who protects the living and the dead.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584209/zynx-anime/naruto/cmylqsrnmu5koturo3aa.jpg",
  },
];

// 💥 Attack on Titan
const attackOnTitanCharacters = [
  {
    id: "401",
    slug: "eren-yeager",
    name: "Eren Yeager",
    description: "A determined soldier who vows to destroy all Titans.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584301/zynx-anime/naruto/aybnqy8qlvchludpogxc.jpg",
  },
];

// 🔥 Demon Slayer
const demonSlayerCharacters = [
  {
    id: "501",
    slug: "tanjiro-kamado",
    name: "Tanjiro Kamado",
    description: "A kind-hearted demon slayer on a quest to save his sister Nezuko.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762613786/Tanjiro_Kamado_jxatz6.jpg",
  },
];

// 💫 Jujutsu Kaisen
const jujutsuKaisenCharacters = [
  {
    id: "601",
    slug: "satoru-gojo",
    name: "Satoru Gojo",
    description: "A brave student who becomes host to the powerful Sukuna.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584742/zynx-anime/eoxrwnrwrdrshdefsvws.jpg",
  },
];

// 💥 One Punch Man
const onePunchManCharacters = [
  {
    id: "701",
    slug: "saitama",
    name: "Saitama",
    description: "The hero who can defeat anyone with a single punch.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584809/zynx-anime/psoxwjwfhlmcahlq2tjx.jpg",
  },
];

// ☠️ Death Note
const deathNoteCharacters = [
  {
    id: "801",
    slug: "l-lawliet",
    name: "L Lawliet",
    description: "A genius student who discovers the deadly Death Note.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593535/zynx-anime/bdetgyzqkwrwuxejw1t8.jpg",
  },
];

// ⚗️ Fullmetal Alchemist
const fullmetalAlchemistCharacters = [
  {
    id: "901",
    slug: "edward-elric",
    name: "Edward Elric",
    description: "The young alchemist who seeks to restore his brother’s body.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584959/zynx-anime/w3g6n9obbape6bogwrku.jpg",
  },
];

// 🦸‍♂️ My Hero Academia
const myHeroAcademiaCharacters = [
  {
    id: "1001",
    slug: "izuku-midoriya",
    name: "Izuku Midoriya",
    description: "A powerless boy who inherits the mighty One For All quirk.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593655/zynx-anime/b5absj90ap6gaac7kcj6.jpg",
  },
];

// ⚔️ Solo Leveling
const soloLevelingCharacters = [
  {
    id: "1101",
    slug: "sung-jin-woo",
    name: "Sung Jin-Woo",
    description: "The weakest hunter who rises to become the strongest of all.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593839/zynx-anime/sooptr23alloix5qgb9g.jpg",
  },
];




// 🐉 Dragon Ball
const dragonBallCharacters = [
  {
    id: "1201",
    slug: "goku",
    name: "Goku",
    description: "The Saiyan warrior who constantly seeks to push his limits.",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593722/zynx-anime/q9off5ji03mzvrnh79be.jpg",
  },
];

// 🧩 Combine into one object
const characters = {
  "naruto": narutoCharacters,
  "one-piece": onePieceCharacters,
  "bleach": bleachCharacters,
  "attack-on-titan": attackOnTitanCharacters,
  "demon-slayer": demonSlayerCharacters,
  "jujutsu-kaisen": jujutsuKaisenCharacters,
  "one-punch-man": onePunchManCharacters,
  "death-note": deathNoteCharacters,
  "fullmetal-alchemist": fullmetalAlchemistCharacters,
  "my-hero-academia": myHeroAcademiaCharacters,
  "solo-leveling": soloLevelingCharacters,
  "dragon-ball": dragonBallCharacters,
};

// ✅ API route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animeSlug = searchParams.get("animeSlug");

  try {
    if (!animeSlug) {
      return NextResponse.json(
        { success: false, message: "Missing animeSlug parameter." },
        { status: 400 }
      );
    }

    const result = characters[animeSlug as keyof typeof characters];

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No characters found for this anime." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      total: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error in /api/characters:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
