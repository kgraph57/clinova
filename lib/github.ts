import type { GitHubRepo } from "./types";

const GITHUB_USER = "kgraph57";
const EXCLUDED_REPOS = ["kgraph57"]; // profile repo

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20&type=public`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: false },
      },
    );

    if (!res.ok) return [];

    const data: GitHubRepo[] = await res.json();
    return data
      .filter((r) => !r.fork && !EXCLUDED_REPOS.includes(r.name))
      .slice(0, 10);
  } catch {
    return [];
  }
}
