"use client";

import { useEffect, useState } from "react";
import { isArticleRead } from "@/lib/storage";
import {
  CheckCircle,
} from "@phosphor-icons/react";

interface ReadStatusBadgeProps {
  readonly slug: string;
}

export function ReadStatusBadge({ slug }: ReadStatusBadgeProps) {
  const [read, setRead] = useState(false);

  useEffect(() => {
    setRead(isArticleRead(slug));
  }, [slug]);

  if (!read) return null;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"
      aria-label="既読"
    >
      <CheckCircle className="h-3.5 w-3.5" />
      既読
    </span>
  );
}
