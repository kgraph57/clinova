import type { Metadata } from "next";
import { BookmarkList } from "@/components/bookmark/BookmarkList";

export const metadata: Metadata = {
  title: "ブックマーク",
  description: "保存した記事の一覧です。",
};

export default function BookmarksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
      <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
        ブックマーク
      </h1>
      <p className="mt-3 text-muted-foreground">
        保存した記事をここから素早くアクセスできます。
      </p>
      <div className="mt-10">
        <BookmarkList />
      </div>
    </div>
  );
}
