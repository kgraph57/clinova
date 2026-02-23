"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

interface State {
  readonly hasError: boolean;
  readonly message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error?.message ?? "不明なエラー",
    };
  }

  componentDidCatch(error: Error, info: { componentStack: string }): void {
    // 本番では Sentry 等に送信するとよい
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  private readonly handleReset = (): void => {
    this.setState({ hasError: false, message: "" });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
          <AlertTriangle className="h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 font-serif text-2xl">
            表示できませんでした
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            予期しないエラーが発生しました。ページを再読み込みするか、ホームに戻ってください。
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              再試行
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              ホームへ
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
