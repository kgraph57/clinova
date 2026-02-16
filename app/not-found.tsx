import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Newspaper, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <h1 className="font-serif text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg font-medium">ページが見つかりません</p>
      <p className="mt-2 text-sm text-muted-foreground">
        お探しのページは存在しないか、移動した可能性があります。
      </p>

      <div className="mt-10 grid w-full max-w-md gap-3">
        <Link
          href="/knowledge"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-muted"
        >
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">ナレッジ</p>
            <p className="text-xs text-muted-foreground">
              プロンプト・ガイド・Tipsを探す
            </p>
          </div>
        </Link>
        <Link
          href="/learn"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-muted"
        >
          <GraduationCap className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">学習コース</p>
            <p className="text-xs text-muted-foreground">
              医療AIを体系的に学ぶ
            </p>
          </div>
        </Link>
        <Link
          href="/news"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-muted"
        >
          <Newspaper className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">ニュースレター</p>
            <p className="text-xs text-muted-foreground">
              最新の医療AIニュースを読む
            </p>
          </div>
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-muted"
        >
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">お問い合わせ</p>
            <p className="text-xs text-muted-foreground">
              講演・執筆・監修のご依頼
            </p>
          </div>
        </Link>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        ホームに戻る
      </Link>
    </div>
  );
}
