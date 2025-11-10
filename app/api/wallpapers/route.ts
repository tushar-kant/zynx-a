import { NextResponse } from "next/server";
import { wallpapers } from "./index";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");
  const characterSlug = searchParams.get("characterSlug");
  const slug = searchParams.get("slug");
  const liveParam = searchParams.get("live");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  try {
    // 🎯 Case 1: Fetch single wallpaper by slug
    if (slug) {
      const found = wallpapers
        .flatMap((group) => group.list)
        .find((w) => w.slug === slug);

      if (!found) {
        return NextResponse.json(
          { success: false, message: "Wallpaper not found for this slug." },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: found });
    }

    // 🎯 Case 2: Fetch wallpapers by characterId or characterSlug
    const result =
      wallpapers.find((w) => w.characterId === characterId) ||
      wallpapers.find((w) => w.characterSlug === characterSlug);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No wallpapers found for this character." },
        { status: 404 }
      );
    }

    // 🔥 Live/static filter
    let filteredList = result.list;
    if (liveParam === "true") {
      filteredList = filteredList.filter((w) => w.live);
    } else if (liveParam === "false") {
      filteredList = filteredList.filter((w) => !w.live);
    }

    // 🧭 Pagination
    const page = parseInt(pageParam || "1", 10);
    const limit = parseInt(limitParam || "12", 10);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filteredList.slice(start, end);
    const hasMore = end < filteredList.length;

    // ✅ Final structured response
    return NextResponse.json({
      success: true,
      characterId: result.characterId,
      characterSlug: result.characterSlug,
      total: filteredList.length,
      page,
      limit,
      hasMore,
      data: paginated,
    });
  } catch (error) {
    console.error("Error in /api/wallpapers:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
