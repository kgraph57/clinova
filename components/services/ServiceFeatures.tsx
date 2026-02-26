"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

export type ServiceFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ServiceFeaturesProps = {
  heading?: string;
  subheading?: string;
  features: ServiceFeature[];
};

export function ServiceFeatures({
  heading = "Features",
  subheading,
  features,
}: ServiceFeaturesProps) {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-muted-foreground">{subheading}</p>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="rounded-2xl border p-8 transition-colors hover:bg-muted/30"
              >
                <Icon className="h-6 w-6 text-foreground/70" />
                <h3 className="mt-4 text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
