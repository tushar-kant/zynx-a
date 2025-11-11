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
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

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

    // 🎯 Case 2: GLOBAL SEARCH (no characterSlug or characterId)
    if (!characterId && !characterSlug) {
      let allWallpapers = wallpapers.flatMap((group) =>
        group.list.map((w) => ({
          ...w,
          characterId: group.characterId,
          characterSlug: group.characterSlug,
        }))
      );

      // 🔥 Apply live/static filter
      if (liveParam === "true") {
        allWallpapers = allWallpapers.filter((w) => w.live);
      } else if (liveParam === "false") {
        allWallpapers = allWallpapers.filter((w) => !w.live);
      }

      // 🔍 Apply global search
      if (searchQuery) {
        allWallpapers = allWallpapers.filter((w) => {
          const titleMatch = w.title?.toLowerCase().includes(searchQuery);
          const idMatch = w.id?.toLowerCase().includes(searchQuery);
          const tagMatch = Array.isArray(w.tags)
            ? w.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
            : false;
          return titleMatch || idMatch || tagMatch;
        });
      }

      // 🧭 Pagination
      const page = parseInt(pageParam || "1", 10);
      const limit = parseInt(limitParam || "12", 10);
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = allWallpapers.slice(start, end);
      const hasMore = end < allWallpapers.length;

      return NextResponse.json({
        success: true,
        global: true,
        total: allWallpapers.length,
        page,
        limit,
        hasMore,
        data: paginated,
      });
    }

    // 🎯 Case 3: Fetch wallpapers by characterId or characterSlug
    const result =
      wallpapers.find((w) => w.characterId === characterId) ||
      wallpapers.find((w) => w.characterSlug === characterSlug);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No wallpapers found for this character." },
        { status: 404 }
      );
    }

    // 🔥 Apply live/static filter
    let filteredList = result.list;
    if (liveParam === "true") {
      filteredList = filteredList.filter((w) => w.live);
    } else if (liveParam === "false") {
      filteredList = filteredList.filter((w) => !w.live);
    }

    // 🔍 Apply search across title, id, and tags
    if (searchQuery) {
      filteredList = filteredList.filter((w) => {
        const titleMatch = w.title?.toLowerCase().includes(searchQuery);
        const idMatch = w.id?.toLowerCase().includes(searchQuery);
        const tagMatch = Array.isArray(w.tags)
          ? w.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
          : false;
        return titleMatch || idMatch || tagMatch;
      });
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
