import { describe, it, expect } from "vitest";
import {
  getAllArticles,
  getArticlesByCategory,
  getFeaturedArticles,
  getArticleBySlug,
  searchArticles,
  getAllSlugs,
  getNewsArticles,
  getLatestNews,
  getArticleCount,
} from "../content";

describe("getAllArticles", () => {
  it("returns an array", () => {
    const articles = getAllArticles();
    expect(Array.isArray(articles)).toBe(true);
  });

  it("returns articles with required fields", () => {
    const articles = getAllArticles();
    expect(articles.length).toBeGreaterThan(0);
    for (const article of articles.slice(0, 5)) {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.contentType).toBeTruthy();
      expect(typeof article.estimatedReadTime).toBe("number");
    }
  });

  it("articles are sorted by date descending", () => {
    const articles = getAllArticles();
    for (let i = 1; i < articles.length; i++) {
      const prev = new Date(articles[i - 1].publishedAt).getTime();
      const curr = new Date(articles[i].publishedAt).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });
});

describe("getArticlesByCategory", () => {
  it("filters by category", () => {
    const articles = getArticlesByCategory("diagnosis");
    for (const article of articles) {
      expect(article.category).toBe("diagnosis");
    }
  });

  it("returns empty array for nonexistent category", () => {
    expect(getArticlesByCategory("nonexistent")).toEqual([]);
  });
});

describe("getFeaturedArticles", () => {
  it("returns at most 6 articles", () => {
    const featured = getFeaturedArticles();
    expect(featured.length).toBeLessThanOrEqual(6);
  });

  it("all returned articles are marked featured", () => {
    for (const article of getFeaturedArticles()) {
      expect(article.featured).toBe(true);
    }
  });
});

describe("getArticleBySlug", () => {
  it("returns an article for a valid slug", () => {
    const slugs = getAllSlugs();
    if (slugs.length === 0) return;
    const article = getArticleBySlug(slugs[0]);
    expect(article).not.toBeNull();
    expect(article?.slug).toBe(slugs[0]);
  });

  it("returns null for nonexistent slug", () => {
    expect(getArticleBySlug("definitely-not-a-real-slug")).toBeNull();
  });
});

describe("searchArticles", () => {
  it("finds articles by title keyword", () => {
    const results = searchArticles("AI");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns empty for nonsense query", () => {
    expect(searchArticles("xyzzy999qwerty")).toEqual([]);
  });

  it("search is case-insensitive", () => {
    const lower = searchArticles("ai");
    const upper = searchArticles("AI");
    expect(lower.length).toBe(upper.length);
  });
});

describe("getAllSlugs", () => {
  it("returns unique slugs", () => {
    const slugs = getAllSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getNewsArticles", () => {
  it("returns only news type articles", () => {
    for (const article of getNewsArticles()) {
      expect(article.contentType).toBe("news");
    }
  });
});

describe("getLatestNews", () => {
  it("respects count parameter", () => {
    const news = getLatestNews(2);
    expect(news.length).toBeLessThanOrEqual(2);
  });
});

describe("getArticleCount", () => {
  it("returns counts with all key", () => {
    const counts = getArticleCount();
    expect(counts.all).toBeGreaterThan(0);
  });

  it("category counts sum to total", () => {
    const counts = getArticleCount();
    const categoryKeys = Object.keys(counts).filter(
      (k) => k !== "all" && !k.startsWith("type:"),
    );
    const sum = categoryKeys.reduce((acc, k) => acc + counts[k], 0);
    expect(sum).toBe(counts.all);
  });
});
