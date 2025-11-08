import { NextResponse } from "next/server";
import { wallpapers } from "./index";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");
  const characterSlug = searchParams.get("characterSlug");
  const slug = searchParams.get("slug");
  const liveParam = searchParams.get("live");

  try {
    // 🎯 Case 1: Fetch by wallpaper slug
    if (slug) {
      const found = wallpapers
        .flatMap((group) => group.list)
        .find((w) => w.slug === slug);

      if (!found)
        return NextResponse.json(
          { success: false, message: "Wallpaper not found for this slug." },
          { status: 404 }
        );

      return NextResponse.json({ success: true, data: found });
    }

    // 🎯 Case 2: Fetch by character ID or Slug
    const result =
      wallpapers.find((w) => w.characterId === characterId) ||
      wallpapers.find((w) => w.characterSlug === characterSlug);

    if (!result)
      return NextResponse.json(
        { success: false, message: "No wallpapers found for this character." },
        { status: 404 }
      );

    // 🔥 Filter by "live" param
    let filteredList = result.list;
    if (liveParam === "true") {
      filteredList = filteredList.filter((w) => w.live);
    } else if (liveParam === "false" || !liveParam) {
      filteredList = filteredList.filter((w) => !w.live);
    }

    return NextResponse.json({
      success: true,
      total: filteredList.length,
      data: filteredList,
    });
  } catch (error) {
    console.error("Error in /api/wallpapers:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
