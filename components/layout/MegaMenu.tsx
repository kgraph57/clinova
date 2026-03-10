"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, CONTENT_TYPES, LEVELS } from "@/lib/constants";
import { ICON_MAP } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  ChartBar,
  Envelope,
  GraduationCap,
  MagnifyingGlass,
  Microphone,
  Newspaper,
  PenNib,
  User,
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { href: "/knowledge", label: "Knowledge" },
  { href: "/learn", label: "Learn" },
  { href: "/book", label: "Book" },
  { href: "/news", label: "News" },
  { href: "/glossary", label: "Glossary" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
] as const;

const megaVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

function PanelShell({
  children,
  width = "w-[640px]",
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <motion.div
      variants={megaVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-2xl border bg-background/95 p-6 shadow-xl backdrop-blur-xl",
        width,
      )}
    >
      {children}
    </motion.div>
  );
}

function PanelLink({
  href,
  onClick,
  icon: Icon,
  label,
  sub,
}: {
  href: string;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
    >
      {Icon && <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </Link>
  );
}

function PanelCta({
  href,
  onClick,
  label,
}: {
  href: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="mt-6 flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted/80"
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

/* ─── Knowledge Panel ─── */
function KnowledgePanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Category
          </p>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.iconName];
              return (
                <Link
                  key={cat.id}
                  href={`/knowledge?category=${cat.id}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      cat.bgColor,
                      cat.darkBgColor,
                    )}
                  >
                    <Icon className={cn("h-4 w-4", cat.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{cat.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {cat.labelEn}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Content Type
          </p>
          <div className="space-y-1">
            {CONTENT_TYPES.map((ct) => (
              <Link
                key={ct.id}
                href={`/knowledge?type=${ct.id}`}
                onClick={onClose}
                className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
              >
                <span className="font-medium">{ct.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {ct.labelEn}
                </span>
              </Link>
            ))}
          </div>
          <PanelCta
            href="/knowledge"
            onClick={onClose}
            label="すべてのナレッジを見る"
          />
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── Learn Panel ─── */
function LearnPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell width="w-[480px]">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Level
          </p>
          <div className="space-y-1">
            {LEVELS.map((lv) => {
              const Icon = ICON_MAP[lv.iconName];
              return (
                <Link
                  key={lv.id}
                  href={`/learn?level=${lv.id}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      lv.bgColor,
                      lv.darkBgColor,
                    )}
                  >
                    <Icon className={cn("h-4 w-4", lv.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lv.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {lv.labelEn}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Quick Access
          </p>
          <div className="space-y-1">
            <PanelLink
              href="/learn"
              onClick={onClose}
              icon={GraduationCap}
              label="全コース一覧"
            />
            <PanelLink
              href="/learn#paths"
              onClick={onClose}
              icon={ArrowRight}
              label="学習パス"
              sub="目的別おすすめコース"
            />
          </div>
          <PanelCta href="/learn" onClick={onClose} label="学習をはじめる" />
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── Book Panel ─── */
function BookPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell width="w-[360px]">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Books
      </p>
      <div className="space-y-1">
        <PanelLink
          href="/book"
          onClick={onClose}
          icon={BookOpen}
          label="書籍ライブラリ"
          sub="医療AI関連の書籍コレクション"
        />
      </div>
      <PanelCta href="/book" onClick={onClose} label="書籍一覧を見る" />
    </PanelShell>
  );
}

/* ─── News Panel ─── */
function NewsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell width="w-[400px]">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        News Categories
      </p>
      <div className="space-y-1">
        <PanelLink
          href="/news?type=weekly"
          onClick={onClose}
          icon={Newspaper}
          label="週刊まとめ"
          sub="Weekly Digest"
        />
        <PanelLink
          href="/news?type=paper"
          onClick={onClose}
          icon={BookOpen}
          label="論文レビュー"
          sub="Paper Review"
        />
        <PanelLink
          href="/news?type=regulation"
          onClick={onClose}
          icon={ChartBar}
          label="規制・ガイドライン"
          sub="Regulation"
        />
        <PanelLink
          href="/news?type=product"
          onClick={onClose}
          icon={ArrowRight}
          label="プロダクト"
          sub="Product Launch"
        />
      </div>
      <PanelCta href="/news" onClick={onClose} label="すべてのニュースを見る" />
    </PanelShell>
  );
}

/* ─── Glossary Panel ─── */
function GlossaryPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell width="w-[360px]">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        用語辞典
      </p>
      <div className="space-y-1">
        <PanelLink
          href="/glossary"
          onClick={onClose}
          icon={MagnifyingGlass}
          label="用語を検索"
          sub="LLM, RAG, プロンプトなど"
        />
      </div>
      <PanelCta href="/glossary" onClick={onClose} label="用語辞典を開く" />
    </PanelShell>
  );
}

/* ─── Tools Panel ─── */
function ToolsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell width="w-[360px]">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        AI Tools
      </p>
      <div className="space-y-1">
        <PanelLink
          href="/tools"
          onClick={onClose}
          icon={ChartBar}
          label="ツール比較表"
          sub="ChatGPT, Claude, Geminiなど"
        />
      </div>
      <PanelCta href="/tools" onClick={onClose} label="ツール比較を見る" />
    </PanelShell>
  );
}

/* ─── About Panel ─── */
function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell width="w-[400px]">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        About Hoshizu
      </p>
      <div className="space-y-1">
        <PanelLink
          href="/about"
          onClick={onClose}
          icon={User}
          label="Hoshizuについて"
          sub="Mission / Vision / Founder"
        />
        <PanelLink
          href="/about#services"
          onClick={onClose}
          icon={Microphone}
          label="講演・セミナー"
          sub="登壇・研修のご依頼"
        />
        <PanelLink
          href="/about#publications"
          onClick={onClose}
          icon={PenNib}
          label="書籍・連載"
          sub="執筆実績"
        />
        <PanelLink
          href="/contact"
          onClick={onClose}
          icon={Envelope}
          label="お問い合わせ"
          sub="お仕事のご依頼・ご相談"
        />
      </div>
    </PanelShell>
  );
}

/* ─── Panel router ─── */
const PANELS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  "/knowledge": KnowledgePanel,
  "/learn": LearnPanel,
  "/book": BookPanel,
  "/news": NewsPanel,
  "/glossary": GlossaryPanel,
  "/tools": ToolsPanel,
  "/about": AboutPanel,
};

/* ─── MegaMenu ─── */
export function MegaMenu({ scrolled = true }: { scrolled?: boolean }) {
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpenMega(null);
    setPinned(false);
  }, []);

  function handleClick(href: string, e: React.MouseEvent) {
    e.preventDefault();
    if (pinned && openMega === href) {
      close();
    } else {
      setOpenMega(href);
      setPinned(true);
    }
  }

  // Close on outside click
  useEffect(() => {
    if (!pinned) return;
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("click", onClickOutside, true);
    return () => document.removeEventListener("click", onClickOutside, true);
  }, [pinned, close]);

  // Close on Escape
  useEffect(() => {
    if (!openMega) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMega, close]);

  // Close on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  const Panel = openMega ? PANELS[openMega] : null;

  return (
    <nav ref={navRef} className="hidden items-center gap-8 md:flex">
      {NAV_ITEMS.map((item) => (
        <div key={item.href} className="relative">
          <Link
            href={item.href}
            onClick={(e) => handleClick(item.href, e)}
            className={cn(
              "text-sm transition-colors",
              !scrolled
                ? "text-white/70 hover:text-white"
                : pathname === item.href || pathname.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              openMega === item.href &&
                (scrolled ? "text-foreground" : "text-white"),
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}

      <AnimatePresence mode="wait">
        {Panel && <Panel key={openMega} onClose={close} />}
      </AnimatePresence>
    </nav>
  );
}
