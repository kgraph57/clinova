"use client";

import {
  Brain,
  Crown,
  Heartbeat,
  Microscope,
  Sparkle,
  Stethoscope,
  TreeStructure,
  TrendUp,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

/**
 * Icon map for CATEGORIES and LEVELS.
 * Separated from constants.ts to avoid importing Phosphor
 * (which uses createContext) in server components.
 */
export const ICON_MAP: Record<string, Icon> = {
  Stethoscope,
  Microscope,
  Heartbeat,
  Brain,
  TreeStructure,
  Sparkle,
  TrendUp,
  Crown,
};
