"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

interface MobileTocProps {
  readonly items: readonly TocItem[];
}

export function MobileToc({ items }: MobileTocProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  if (items.length === 0) return null;

  return (
    <div className="mb-8 rounded-xl border lg:hidden">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <List className="h-4 w-4" />
        <span>目次を見る</span>
        <ChevronDown
          className={cn(
            "ml-auto h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="space-y-0.5 border-t px-4 py-3">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                      item.level === 3 && "pl-4 text-xs",
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
