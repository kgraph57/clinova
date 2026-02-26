"use client";

import { motion } from "framer-motion";
import {
  Baby,
  MapPin,
  Stethoscope,
  Coins,
  BookOpen,
  Search,
  ClipboardCheck,
  Calculator,
  BookOpenCheck,
  CalendarCheck,
  Phone,
  FileText,
  Brain,
  BarChart3,
  Target,
  Repeat,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";

const ICON_MAP: Record<string, LucideIcon> = {
  Baby,
  MapPin,
  Stethoscope,
  Coins,
  BookOpen,
  Search,
  ClipboardCheck,
  Calculator,
  BookOpenCheck,
  CalendarCheck,
  Phone,
  FileText,
  Brain,
  BarChart3,
  Target,
  Repeat,
  Trophy,
};

export type ServiceFeature = {
  title: string;
  description: string;
  iconName: string;
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
            const Icon = ICON_MAP[feature.iconName];
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="rounded-2xl border p-8 transition-colors hover:bg-muted/30"
              >
                {Icon && <Icon className="h-6 w-6 text-foreground/70" />}
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
