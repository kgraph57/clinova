export interface Article {
  slug: string
  title: string
  description: string
  category: string
  contentType: "prompt" | "tip" | "guide" | "article"
  difficulty?: "beginner" | "intermediate" | "advanced"
  tags: string[]
  publishedAt: string
  updatedAt?: string
  author: string
  featured: boolean
  riskLevel?: "high" | "medium" | "low"
  estimatedReadTime: number
  content: string
}

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  topics: string[]
}
