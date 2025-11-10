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

// 🧩 Combine all into a single lookup object
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

// ✅ API route with optional pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const animeSlug = searchParams.get("animeSlug");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    // 🧠 Validate input
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

    // ⚙️ Pagination logic (optional)
    if (!pageParam && !limitParam) {
      return NextResponse.json({
        success: true,
        total: result.length,
        data: result,
      });
    }

    const page = parseInt(pageParam || "1", 10);
    const limit = parseInt(limitParam || "10", 10);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = result.slice(start, end);
    const hasMore = end < result.length;

    return NextResponse.json({
      success: true,
      anime: animeSlug,
      total: result.length,
      page,
      limit,
      hasMore,
      data: paginated,
    });
  } catch (error) {
    console.error("Error in /api/characters:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
