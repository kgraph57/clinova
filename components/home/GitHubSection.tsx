"use client"

import { motion } from "framer-motion"
import { Github, Star, ExternalLink } from "lucide-react"
import { containerVariants, fadeInUp } from "@/lib/animations"
import type { GitHubRepo } from "@/lib/types"

interface GitHubSectionProps {
  repos: GitHubRepo[]
}

export function GitHubSection({ repos }: GitHubSectionProps) {
  if (repos.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          <h2 className="text-2xl font-bold tracking-tight">
            GitHub プロジェクト
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          オープンソースの医療AI関連プロジェクト
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              variants={fadeInUp}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold group-hover:text-primary">
                  {repo.name}
                </h3>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                {repo.description ?? "No description"}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
