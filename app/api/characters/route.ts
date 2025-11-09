import { NextResponse } from "next/server";


import { narutoCharacters } from "./data/naruto";
import { onePieceCharacters } from "./data/one-piece";
import { attackOnTitanCharacters } from "./data/aot";
import { bleachCharacters } from "./data/bleach";
import { demonSlayerCharacters } from "./data/demonslayer";
import { jujutsuKaisenCharacters } from "./data/jjk";
import { onePunchManCharacters } from "./data/onepunch";
import { soloLevelingCharacters } from "./data/sololeveling";
import { myHeroAcademiaCharacters } from "./data/myheroaccademia";
import { fullmetalAlchemistCharacters } from "./data/fullmetalalchemist";
import { dragonBallCharacters } from "./data/dragonballl";
import { deathNoteCharacters } from "./data/deathnote";


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
