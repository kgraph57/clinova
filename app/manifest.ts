import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hoshizu - 医療AI ナレッジポータル",
    short_name: "Hoshizu",
    description:
      "散らばる星を、星座にする。医療AIの知識を体系的に学べるポータル。",
    start_url: "/hoshizu/",
    display: "standalone",
    background_color: "#fcfcf4",
    theme_color: "#141413",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/hoshizu/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/hoshizu/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["education", "medical", "productivity"],
    lang: "ja",
    dir: "ltr",
    shortcuts: [
      {
        name: "ナレッジベース",
        url: "/hoshizu/knowledge",
        description: "プロンプト・ガイド・Tipsを探す",
      },
      {
        name: "学習コース",
        url: "/hoshizu/learn",
        description: "医療AIを体系的に学ぶ",
      },
    ],
  };
}
