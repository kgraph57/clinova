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
    <section className="border-t py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5">
            <Github className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              GitHub プロジェクト
            </h2>
          </div>
        </div>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
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
              className="group relative flex flex-col rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <ExternalLink className="absolute right-4 top-4 h-3.5 w-3.5 text-muted-foreground/0 transition-all duration-200 group-hover:text-primary/60" />

              <h3 className="text-[0.9375rem] font-semibold group-hover:text-primary">
                {repo.name}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {repo.description ?? "No description"}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-4 text-[10px] text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
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
