import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animeId = searchParams.get("animeId");

  const characters = [
    {
      animeId: "1",
      list: [
        {
          id: "101",
          slug: "naruto-uzumaki",
          name: "Naruto Uzumaki",
          description: "The energetic ninja with dreams of becoming Hokage.",
          image:
            "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
        },
        {
          id: "102",
          slug: "itachi-uchiha",
          name: "Itachi Uchiha",
          description: "A mysterious genius from the Uchiha clan.",
          image:
            "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
        },
        {
          id: "103",
          slug: "kakashi-hatake",
          name: "Kakashi Hatake",
          description: "The Copy Ninja of Konoha, known for his Sharingan eye.",
          image:
            "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
        },
      ],
    },
    {
      animeId: "2",
      list: [
        {
          id: "201",
          slug: "monkey-d-luffy",
          name: "Monkey D. Luffy",
          description: "The carefree rubber pirate captain.",
          image:
            "",
        },
        {
          id: "202",
          slug: "roronoa-zoro",
          name: "Roronoa Zoro",
          description: "The swordsman with a dream to be the world’s best.",
          image:
            "",
        },
        {
          id: "203",
          slug: "sanji-vinsmoke",
          name: "Sanji Vinsmoke",
          description: "The Straw Hat cook with unmatched kick techniques.",
          image:
            "",
        },
      ],
    },
  ];

  const result = characters.find((c) => c.animeId === animeId);

  if (!result)
    return NextResponse.json({
      success: false,
      message: "No characters found for this anime.",
    });

  return NextResponse.json({
    success: true,
    total: result.list.length,
    data: result.list,
  });
}
