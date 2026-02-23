import { describe, it, expect } from "vitest";
import { slugify, extractToc } from "../toc";

describe("slugify", () => {
  it("converts a simple English string", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("handles Japanese text", () => {
    expect(slugify("診断支援ガイド")).toBe("診断支援ガイド");
  });

  it("handles mixed Japanese and English", () => {
    expect(slugify("AI の基礎")).toBe("ai-の基礎");
  });

  it("collapses multiple spaces into one hyphen", () => {
    expect(slugify("too   many    spaces")).toBe("too-many-spaces");
  });

  it("strips leading and trailing hyphens", () => {
    expect(slugify(" -hello- ")).toBe("hello");
  });

  it("removes special characters but keeps unicode letters", () => {
    expect(slugify("Step 1: Do this!")).toBe("step-1-do-this");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("extractToc", () => {
  it("extracts h2 and h3 headings", () => {
    const mdx = `
## Introduction

Some text here.

### Sub Section

More text.

## Another Section
    `.trim();

    const toc = extractToc(mdx);
    expect(toc).toEqual([
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "sub-section", text: "Sub Section", level: 3 },
      { id: "another-section", text: "Another Section", level: 2 },
    ]);
  });

  it("ignores headings inside code blocks", () => {
    const mdx = `
## Real Heading

\`\`\`markdown
## This is in a code block
\`\`\`

## Another Real Heading
    `.trim();

    const toc = extractToc(mdx);
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe("Real Heading");
    expect(toc[1].text).toBe("Another Real Heading");
  });

  it("ignores h1 and h4+ headings", () => {
    const mdx = `
# Title (h1)

## Section (h2)

### Subsection (h3)

#### Deep (h4)
    `.trim();

    const toc = extractToc(mdx);
    expect(toc).toHaveLength(2);
  });

  it("returns empty array for content without headings", () => {
    expect(extractToc("Just some text without headings.")).toEqual([]);
  });

  it("handles Japanese headings", () => {
    const mdx = `## 診断支援の基礎\n\n### プロンプトの書き方`;
    const toc = extractToc(mdx);
    expect(toc).toEqual([
      { id: "診断支援の基礎", text: "診断支援の基礎", level: 2 },
      { id: "プロンプトの書き方", text: "プロンプトの書き方", level: 3 },
    ]);
  });
});
