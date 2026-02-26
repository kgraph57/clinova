"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

type ServiceCtaProps = {
  title: React.ReactNode;
  description: string;
  demoUrl: string;
  demoLabel?: string;
};

export function ServiceCta({
  title,
  description,
  demoUrl,
  demoLabel = "サイトを見る",
}: ServiceCtaProps) {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl tracking-tight sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              お問い合わせ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              {demoLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
