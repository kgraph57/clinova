"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  GraduationCap,
  Microscope,
  Stethoscope,
  ArrowRight,
  Clock,
  Target,
} from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { LearningPath } from "@/lib/learning-paths";

const ICON_MAP = {
  Zap,
  Shield,
  GraduationCap,
  Microscope,
  Stethoscope,
} as const;

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/hoshizu" : "";

interface LearningPathCardProps {
  readonly path: LearningPath;
}

export function LearningPathCard({ path }: LearningPathCardProps) {
  const Icon = ICON_MAP[path.iconName];
  const firstCourseId = path.courseIds[0];
  const coverImageSrc = `${BASE_PATH}/images/paths/${path.id}.png`;

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/learn/${firstCourseId}`}
        className="group flex h-full flex-col rounded-2xl border overflow-hidden transition-colors hover:bg-muted/50"
      >
        {/* カバー画像 */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={coverImageSrc}
            alt={path.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* コンテンツ */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-start gap-3">
            <span className={cn("rounded-lg bg-muted p-2 shrink-0", path.color)}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold leading-snug">
                {path.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {path.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {path.description}
          </p>

          {path.goals.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {path.goals.map((goal) => (
                <li
                  key={goal}
                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                >
                  <Target className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                  {goal}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {path.estimatedHours}時間
              </span>
              <span>{path.courseIds.length}コース</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
