import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");
  const slug = searchParams.get("slug");
  const liveParam = searchParams.get("live"); // "true" or "false"

  // 🧩 Mock data (add 'live' property for filtering)
  const wallpapers = [
    {
      characterId: "101",
      list: [
        {
          id: "naruto-001",
          slug: "naruto-sage-mode",
          title: "Naruto Sage Mode",
          url: "",
          downloadUrl: "",
          live: false,
          tags: ["Naruto", "Sage Mode", "Anime", "Wallpaper", "4K"],
        },
        {
          id: "naruto-002",
          slug: "naruto-kurama-mode",
          title: "Naruto Kurama Mode",
          url: "https://res.cloudinary.com/dk0sslz1q/video/upload/v1762574176/zynx-anime/videos/hu1w5c36cv9zopu570ea.mp4",
          downloadUrl:
            "https://res.cloudinary.com/dk0sslz1q/video/upload/v1762574176/zynx-anime/videos/hu1w5c36cv9zopu570ea.mp4",
          live: true,
          tags: ["Naruto", "Kurama", "Anime", "Glow", "Power"],
        },
      ],
    },
    {
      characterId: "102",
      list: [
        {
          id: "itachi-001",
          slug: "itachi-red-moon",
          title: "Itachi Red Moon",
          url: "",
          downloadUrl: "",
          live: false,
          tags: ["Itachi", "Red Moon", "Sharingan", "Anime", "4K"],
        },
        {
          id: "itachi-002",
          slug: "itachi-crow-genjutsu",
          title: "Itachi Crow Genjutsu",
          url: "",
          downloadUrl: "",
          live: false,
          tags: ["Itachi", "Crow", "Genjutsu", "Aesthetic", "Dark"],
        },
      ],
    },
  ];

  try {
    // ✅ Case 1: Fetch single wallpaper by slug
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

    // ✅ Case 2: Fetch all wallpapers for a character (with optional filtering)
    if (characterId) {
      const result = wallpapers.find((w) => w.characterId === characterId);

      if (!result) {
        return NextResponse.json(
          { success: false, message: "No wallpapers found for this character." },
          { status: 404 }
        );
      }

      // 🔥 Filtering logic
      let filteredList = result.list;

      if (liveParam === "true") {
        filteredList = result.list.filter((w) => w.live === true);
      } else if (liveParam === "false" || !liveParam) {
        // Default: static only
        filteredList = result.list.filter((w) => w.live === false);
      }

      return NextResponse.json({
        success: true,
        total: filteredList.length,
        data: filteredList,
      });
    }

    // ✅ Case 3: No valid query provided
    return NextResponse.json(
      {
        success: false,
        message:
          "Please provide either characterId or slug as query parameter.",
      },
      { status: 400 }
    );
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
