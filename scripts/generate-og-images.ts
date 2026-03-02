import fs from "fs";
import path from "path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "public", "og");
const CONTENT_DIRS = ["prompts", "tips", "guides", "articles", "news"];

const CATEGORY_COLORS: Record<string, string> = {
  diagnosis: "#e11d48",
  research: "#2563eb",
  clinical: "#16a34a",
  "ai-fundamentals": "#9333ea",
  workflow: "#d97706",
};

interface ArticleMeta {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly contentType: string;
}

function getArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = [];
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      articles.push({
        slug: path.basename(file, ".mdx"),
        title: data.title ?? "",
        category: data.category ?? "ai-fundamentals",
        contentType: data.contentType ?? "article",
      });
    }
  }
  return articles;
}

async function loadFont(): Promise<ArrayBuffer> {
  const fontPath = path.join(
    process.cwd(),
    "scripts",
    "data",
    "NotoSansJP-Bold.otf",
  );
  if (fs.existsSync(fontPath)) {
    return fs.readFileSync(fontPath).buffer as ArrayBuffer;
  }
  // Fallback: download Noto Sans JP Bold
  const url =
    "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-700-normal.woff";
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.mkdirSync(path.dirname(fontPath), { recursive: true });
  fs.writeFileSync(fontPath, Buffer.from(buffer));
  return buffer;
}

function createOGElement(article: ArticleMeta): Record<string, unknown> {
  const accentColor = CATEGORY_COLORS[article.category] ?? "#9333ea";

  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        backgroundColor: "#141413",
        color: "#f0ede6",
        fontFamily: "Noto Sans JP",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          width: "4px",
                          height: "24px",
                          backgroundColor: accentColor,
                          borderRadius: "2px",
                        },
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "20px",
                          color: accentColor,
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        },
                        children: article.contentType,
                      },
                    },
                  ],
                },
              },
              {
                type: "h1",
                props: {
                  style: {
                    fontSize: article.title.length > 40 ? "40px" : "52px",
                    lineHeight: 1.3,
                    fontWeight: 700,
                    maxWidth: "1000px",
                  },
                  children: article.title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "28px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                  },
                  children: "Hoshizu",
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "16px",
                    color: "#a0a09a",
                  },
                  children: "散らばる星を、星座にする",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  console.log("Generating OG images...");
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const articles = getArticles();
  let fontData: ArrayBuffer;

  try {
    fontData = await loadFont();
  } catch (e) {
    console.warn("Failed to load font, skipping OG generation:", e);
    return;
  }

  let generated = 0;
  let skipped = 0;

  for (const article of articles) {
    const outputPath = path.join(OUTPUT_DIR, `${article.slug}.png`);

    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    try {
      const element = createOGElement(article);
      const svg = await satori(element as unknown as React.ReactNode, {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Noto Sans JP",
            data: fontData,
            weight: 700,
            style: "normal",
          },
        ],
      });

      const resvg = new Resvg(svg);
      const pngData = resvg.render();
      fs.writeFileSync(outputPath, pngData.asPng());
      generated++;
    } catch (e) {
      console.warn(`Failed to generate OG for ${article.slug}:`, e);
    }
  }

  console.log(`Done: ${generated} generated, ${skipped} skipped (cached)`);
}

main();
