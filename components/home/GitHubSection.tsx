"use client"

import { motion } from "framer-motion"
import { Github, Star, ArrowUpRight } from "lucide-react"
import { containerVariants, fadeInUp } from "@/lib/animations"
import type { GitHubRepo } from "@/lib/types"

interface GitHubSectionProps {
  repos: GitHubRepo[]
}

export function GitHubSection({ repos }: GitHubSectionProps) {
  if (repos.length === 0) return null

  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center gap-3">
          <Github className="h-5 w-5" />
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            GitHub
          </h2>
        </div>
        <p className="mt-3 text-muted-foreground">
          オープンソースの医療AI関連プロジェクト
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              variants={fadeInUp}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl bg-muted/50 p-6 transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{repo.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {repo.description ?? "No description"}
              </p>

              <div className="mt-auto flex items-center gap-4 pt-6 text-sm text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
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
