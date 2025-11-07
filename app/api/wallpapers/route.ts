import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("characterId");

  const wallpapers = [
    {
      characterId: "101",
      list: [
        {
          id: "naruto-001",
          slug: "naruto-sage-mode",
          title: "Naruto Sage Mode",
          url: "",
          downloadUrl:
            "",
          tags: ["Naruto", "Sage Mode", "Anime", "Wallpaper", "4K"],
        },
        {
          id: "naruto-002",
          slug: "naruto-kurama-mode",
          title: "Naruto Kurama Mode",
          url: "",
          downloadUrl:
            "",
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
          downloadUrl:
            "",
          tags: ["Itachi", "Red Moon", "Sharingan", "Anime", "4K"],
        },
        {
          id: "itachi-002",
          slug: "itachi-crow-genjutsu",
          title: "Itachi Crow Genjutsu",
          url: "",
          downloadUrl:
            "",
          tags: ["Itachi", "Crow", "Genjutsu", "Aesthetic", "Dark"],
        },
      ],
    },
  ];

  const result = wallpapers.find((w) => w.characterId === characterId);

  if (!result)
    return NextResponse.json({
      success: false,
      message: "No wallpapers found for this character.",
    });

  return NextResponse.json({
    success: true,
    total: result.list.length,
    data: result.list,
  });
}
