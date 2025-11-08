import { NextResponse } from "next/server";

// 🌀 Naruto Uzumaki Wallpapers
const narutoWallpapers = {
  characterId: "101",
  characterSlug: "naruto-uzumaki",
  list: [
    {
      id: "naruto-001",
      slug: "naruto-sage-mode",
      title: "Naruto Sage Mode",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762580149/zynx-anime/naruto/sb8w6dd18yll3lrwm7hu.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762580149/zynx-anime/naruto/sb8w6dd18yll3lrwm7hu.jpg",
      live: false,
      tags: ["Naruto", "Sage Mode", "Anime", "Wallpaper", "4K"],
    },
  ],
};

// 🌙 Itachi Uchiha Wallpapers
const itachiWallpapers = {
  characterId: "102",
  characterSlug: "itachi-uchiha",
  list: [
    {
      id: "itachi-001",
      slug: "itachi-red-moon",
      title: "Itachi Red Moon",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762594600/itachi-saringan-uchiha_xtpvcq.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762594600/itachi-saringan-uchiha_xtpvcq.jpg",
      live: false,
      tags: ["Itachi", "Red Moon", "Sharingan", "Anime", "4K"],
    },
    {
      id: "itachi-002",
      slug: "itachi-crow-genjutsu",
      title: "Itachi Crow Genjutsu",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762594600/itachi-saringan_opymb4.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762594600/itachi-saringan_opymb4.jpg",
      live: false,
      tags: ["Itachi", "Crow", "Genjutsu", "Aesthetic", "Dark"],
    },
  ],
};

// ⚡ Kakashi Hatake Wallpapers
const kakashiWallpapers = {
  characterId: "103",
  characterSlug: "kakashi-hatake",
  list: [
    {
      id: "kakashi-001",
      slug: "kakashi-lightning-blade",
      title: "Kakashi Lightning Blade",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538047/zynx-anime/u4muofyw343l4nhw7nof.jpg",
      live: false,
      tags: ["Kakashi", "Lightning Blade", "Chidori", "Anime", "4K"],
    },
  ],
};

// 🏴‍☠️ Monkey D. Luffy Wallpapers
const luffyWallpapers = {
  characterId: "201",
  characterSlug: "monkey-d-luffy",
  list: [
    {
      id: "luffy-001",
      slug: "luffy-gear-5",
      title: "Luffy Gear 5",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538098/zynx-anime/pmptes9hx3ehsxocnqir.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762538098/zynx-anime/pmptes9hx3ehsxocnqir.jpg",
      live: false,
      tags: ["Luffy", "Gear 5", "One Piece", "Anime", "Wallpaper"],
    },
    {
      id: "luffy-002",
      slug: "luffy-red-hawk",
      title: "Luffy Red Hawk",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762594762/luffy-hat_gysf0p.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762594762/luffy-hat_gysf0p.jpg",
      live: false,
      tags: ["Luffy", "Fire Fist", "Action", "One Piece", "4K"],
    },
    {
      id: "luffy-003",
      slug: "luffy-gear-4-bounce-man",
      title: "Luffy Gear 4 Bounce Man",
      url: "https://res.cloudinary.com/dk0sslz1q/video/upload/v1762574176/zynx-anime/videos/hu1w5c36cv9zopu570ea.mp4",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/video/upload/v1762574176/zynx-anime/videos/hu1w5c36cv9zopu570ea.mp4",
      live: true,
      tags: ["Luffy", "Gear 4", "Bounce Man", "One Piece", "Live Wallpaper"],
    },
  ],
};

// ⚔️ Roronoa Zoro Wallpapers
const zoroWallpapers = {
  characterId: "202",
  characterSlug: "roronoa-zoro",
  list: [
    {
      id: "zoro-001",
      slug: "zoro-santoryu-stance",
      title: "Zoro Santoryu Stance",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762595280/zoro_gnel6f.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762595280/zoro_gnel6f.jpg",
      live: false,
      tags: ["Zoro", "Santoryu", "One Piece", "Swordsman", "Anime", "4K"],
    },
    

  ],
};

// 💋 Boa Hancock Wallpapers
const boaHancockWallpapers = {
  characterId: "203",
  characterSlug: "boa-hancock",
  list: [
    {
      id: "boa-001",
      slug: "boa-hancock-empress-glare",
      title: "Boa Hancock Empress Glare",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762612968/boa_ygelug.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762612968/boa_ygelug.jpg",
      live: false,
      tags: ["Boa Hancock", "One Piece", "Empress", "Pirate Empress", "Anime", "4K"],
    },
    
  ],
};

// ⚔️ Sung Jin-Woo Wallpapers
const sungJinWooWallpapers = {
  characterId: "1101",
  characterSlug: "sung-jin-woo",
  list: [
    {
      id: "jinwoo-001",
      slug: "sung-jinwoo-shadow-monarch",
      title: "Sung Jin-Woo Shadow Monarch",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593839/zynx-anime/sooptr23alloix5qgb9g.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593839/zynx-anime/sooptr23alloix5qgb9g.jpg",
      live: false,
      tags: ["Sung Jin-Woo", "Shadow Monarch", "Solo Leveling", "Anime", "Wallpaper", "4K"],
    },
   
  ],
};


// 🦸‍♂️ Izuku Midoriya Wallpaper
const izukuMidoriyaWallpapers = {
  characterId: "1001",
  characterSlug: "izuku-midoriya",
  list: [
    {
      id: "deku-001",
      slug: "izuku-midoriya-one-for-all",
      title: "Izuku Midoriya One For All",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593655/zynx-anime/b5absj90ap6gaac7kcj6.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593655/zynx-anime/b5absj90ap6gaac7kcj6.jpg",
      live: false,
      tags: ["Izuku Midoriya", "Deku", "One For All", "My Hero Academia", "Anime", "4K"],
    },
  ],
};


// ⚡ Goku Wallpapers
const gokuWallpapers = {
  characterId: "1201",
  characterSlug: "goku",
  list: [
    {
      id: "goku-001",
      slug: "goku-ultra-instinct",
      title: "Goku Ultra Instinct",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593722/zynx-anime/q9off5ji03mzvrnh79be.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593722/zynx-anime/q9off5ji03mzvrnh79be.jpg",
      live: false,
      tags: [
        "Goku",
        "Ultra Instinct",
        "Dragon Ball",
        "Saiyan",
        "Anime",
        "4K",
      ],
    },


  ],
};
// ⚗️ Edward Elric Wallpaper
const edwardElricWallpapers = {
  characterId: "901",
  characterSlug: "edward-elric",
  list: [
    {
      id: "edward-001",
      slug: "edward-elric-alchemy-circle",
      title: "Edward Elric Alchemy Circle",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584959/zynx-anime/w3g6n9obbape6bogwrku.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584959/zynx-anime/w3g6n9obbape6bogwrku.jpg",
      live: false,
      tags: ["Edward Elric", "Fullmetal Alchemist", "Alchemy", "Anime", "Wallpaper", "4K"],
    },
  ],
};

// 💥 Saitama Wallpaper
const saitamaWallpapers = {
  characterId: "701",
  characterSlug: "saitama",
  list: [
    {
      id: "saitama-001",
      slug: "saitama-one-punch",
      title: "Saitama One Punch",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584809/zynx-anime/psoxwjwfhlmcahlq2tjx.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584809/zynx-anime/psoxwjwfhlmcahlq2tjx.jpg",
      live: false,
      tags: ["Saitama", "One Punch Man", "Hero", "Anime", "Wallpaper", "4K"],
    },
  ],
};

// ☕ L Lawliet Wallpaper
const lLawlietWallpapers = {
  characterId: "801",
  characterSlug: "l-lawliet",
  list: [
    {
      id: "l-001",
      slug: "l-lawliet-detective-mind",
      title: "L Lawliet Detective Mind",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593535/zynx-anime/bdetgyzqkwrwuxejw1t8.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762593535/zynx-anime/bdetgyzqkwrwuxejw1t8.jpg",
      live: false,
      tags: ["L Lawliet", "Death Note", "Detective", "Anime", "Wallpaper", "4K"],
    },
  ],
};
// 🔥 Eren Yeager Wallpaper
const erenYeagerWallpapers = {
  characterId: "401",
  characterSlug: "eren-yeager",
  list: [
    {
      id: "eren-001",
      slug: "eren-yeager-rage-titan",
      title: "Eren Yeager Rage Titan",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584301/zynx-anime/naruto/aybnqy8qlvchludpogxc.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584301/zynx-anime/naruto/aybnqy8qlvchludpogxc.jpg",
      live: false,
      tags: ["Eren Yeager", "Attack on Titan", "Titan", "Anime", "Wallpaper", "4K"],
    },
  ],
};

// 💫 Satoru Gojo Wallpaper
const gojoWallpapers = {
  characterId: "601",
  characterSlug: "satoru-gojo",
  list: [
    {
      id: "gojo-001",
      slug: "satoru-gojo-limitless-domain",
      title: "Satoru Gojo Limitless Domain",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584742/zynx-anime/eoxrwnrwrdrshdefsvws.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762584742/zynx-anime/eoxrwnrwrdrshdefsvws.jpg",
      live: false,
      tags: [
        "Satoru Gojo",
        "Jujutsu Kaisen",
        "Limitless",
        "Hollow Purple",
        "Anime",
        "4K",
      ],
    },
  ],
};

// 🔥 Tanjiro Kamado Wallpaper
const tanjiroWallpapers = {
  characterId: "501",
  characterSlug: "tanjiro-kamado",
  list: [
    {
      id: "tanjiro-001",
      slug: "tanjiro-water-breathing",
      title: "Tanjiro Water Breathing",
      url: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762613786/Tanjiro_Kamado_jxatz6.jpg",
      downloadUrl:
        "https://res.cloudinary.com/dk0sslz1q/image/upload/v1762613786/Tanjiro_Kamado_jxatz6.jpg",
      live: false,
      tags: [
        "Tanjiro Kamado",
        "Demon Slayer",
        "Water Breathing",
        "Nichirin Sword",
        "Anime",
        "4K",
      ],
    },
  ],
};

// 🧩 Combine All Characters
const wallpapers = [
  gojoWallpapers,
  narutoWallpapers,
  itachiWallpapers,
  kakashiWallpapers,
tanjiroWallpapers,
  luffyWallpapers,
  zoroWallpapers,
  boaHancockWallpapers,
erenYeagerWallpapers,
  lLawlietWallpapers,

  sungJinWooWallpapers,
edwardElricWallpapers,
  izukuMidoriyaWallpapers,
saitamaWallpapers,
  gokuWallpapers
];

// ✅ API Route
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
      filteredList = filteredList.filter((w) => w.live === true);
    } else if (liveParam === "false" || !liveParam) {
      filteredList = filteredList.filter((w) => w.live === false);
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
