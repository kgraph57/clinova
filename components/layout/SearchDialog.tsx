"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  FileText,
  Newspaper,
  Search,
  Sparkles,
} from "lucide-react";

interface SearchEntry {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly contentType: string;
  readonly tags: readonly string[];
  readonly href: string;
}

const TYPE_ICONS: Record<string, typeof BookOpen> = {
  prompt: Sparkles,
  tip: Lightbulb,
  guide: BookOpen,
  article: FileText,
  news: Newspaper,
  course: GraduationCap,
};

const TYPE_LABELS: Record<string, string> = {
  prompt: "プロンプト",
  tip: "Tips",
  guide: "ガイド",
  article: "記事",
  news: "ニュース",
  course: "コース",
};

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<readonly SearchEntry[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!open || entries.length > 0) return;

    const basePath =
      process.env.NODE_ENV === "production" ? "/hoshizu" : "";

    fetch(`${basePath}/search-index.json`)
      .then((res) => res.json())
      .then((data: SearchEntry[]) => setEntries(data))
      .catch(() => {});
  }, [open, entries.length]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const select = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const grouped = useMemo(() => {
    const groups: Record<string, SearchEntry[]> = {};
    for (const entry of entries) {
      const type = entry.contentType;
      const list = groups[type] ?? [];
      groups[type] = [...list, entry];
    }
    return groups;
  }, [entries]);

  return (
    <>
      {/* Desktop trigger: テキスト + ⌘K ヒント */}
      <button
        onClick={() => setOpen(true)}
        aria-label="検索"
        className="hidden items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:inline-flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span>検索</span>
        <kbd className="pointer-events-none ml-2 hidden select-none rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium lg:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Mobile trigger: アイコンのみ */}
      <button
        onClick={() => setOpen(true)}
        aria-label="検索"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
      >
        <Search className="h-4 w-4" />
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />
          <div className="fixed left-1/2 top-[10%] w-full max-w-lg -translate-x-1/2 px-4 sm:top-[15%]">
            <Command
              className="overflow-hidden rounded-xl border bg-popover shadow-2xl"
              shouldFilter={true}
            >
              <div className="flex items-center gap-2 border-b px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  onKeyDown={(e) => e.key === "Escape" && close()}
                  placeholder="記事・プロンプト・コースを検索..."
                  className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd
                  onClick={close}
                  className="cursor-pointer select-none rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  見つかりませんでした
                </Command.Empty>

                {Object.entries(grouped).map(([type, items]) => {
                  const Icon = TYPE_ICONS[type] ?? FileText;
                  const label = TYPE_LABELS[type] ?? type;

                  return (
                    <Command.Group
                      key={type}
                      heading={label}
                      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                    >
                      {items.map((entry) => (
                        <Command.Item
                          key={`${type}-${entry.slug}`}
                          value={`${entry.title} ${entry.description} ${entry.tags.join(" ")}`}
                          onSelect={() => select(entry.href)}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-sm data-[selected=true]:bg-accent"
                        >
                          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{entry.title}</p>
                            {entry.description && (
                              <p className="truncate text-xs text-muted-foreground">
                                {entry.description}
                              </p>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
