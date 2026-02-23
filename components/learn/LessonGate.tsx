"use client";

import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";

interface LessonGateProps {
  courseTitle: string;
  lessonTitle: string;
  preview: string;
}

export function LessonGate({
  courseTitle,
  lessonTitle,
  preview,
}: LessonGateProps) {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
      <div className="mb-4 text-sm text-muted-foreground">{courseTitle}</div>
      <h1 className="font-serif text-2xl tracking-tight sm:text-3xl">
        {lessonTitle}
      </h1>

      {preview && (
        <div className="prose mt-8">
          <p className="text-muted-foreground">{preview}</p>
        </div>
      )}

      <div className="relative mt-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mt-12 rounded-2xl border border-dashed p-8 text-center">
        <Lock className="mx-auto h-8 w-8 text-muted-foreground/40" />
        <h2 className="mt-4 text-lg font-medium">
          このレッスンは限定公開です
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          本コースの続きをご覧になるには、ニュースレターにご登録ください。
          登録後、全レッスンへのアクセスリンクをお送りします。
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            <Mail className="h-4 w-4" />
            ニュースレター登録でアクセス
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-xs text-muted-foreground">
            無料 / 配信停止はいつでも可能
          </span>
        </div>
      </div>
    </div>
  );
}
