<p align="center">
  <img src="public/logo.svg" alt="Hoshizu" width="80" height="80" />
</p>

<h1 align="center">Hoshizu（ホシズ）</h1>

<p align="center">
  <strong>散らばる星を、星座にする</strong><br/>
  医療従事者のための AI ナレッジポータル
</p>

<p align="center">
  <a href="https://kgraph57.github.io/hoshizu/">https://kgraph57.github.io/hoshizu/</a>
</p>

---

## Overview

**Hoshizu** は、医療現場で AI を活用するための実践的なナレッジを体系的に整理・提供するポータルサイトです。プロンプトテンプレート、テクニック解説、ガイド、記事、コース学習を MDX 形式で管理し、Next.js の静的サイトとして配信しています。

## Features

### Content

| カテゴリ | 内容 |
|---------|------|
| Prompt Templates | 臨床で即使える AI プロンプトテンプレート（診断支援・文書作成・研究） |
| Tips & Techniques | Zero-shot / Few-shot / CoT 等のプロンプティング技法を医療文脈で解説 |
| Guides | 症例報告・論文校正・論文読解の実践ガイド |
| Articles | 医療 AI の安全性・入門・最新動向 |
| Courses | AI 基礎・プロンプトエンジニアリング等の体系的学習コース |
| News | 医療 AI ニュースの自動収集・配信 |

### Interactive Features

- **Prompt Playground** — `{{変数}}` 形式のプロンプトをその場でカスタマイズ・コピー
- **Bookmark** — 記事のブックマーク保存（localStorage）
- **Reading Tracker** — 既読記事の自動追跡・既読バッジ表示
- **Quiz** — コース学習の理解度チェッククイズ（Claude API で自動生成可能）
- **Weekly Pickup** — 週替わりの注目コンテンツ
- **Glossary** — 医療 AI 用語集（検索・カテゴリフィルタ対応）
- **Tool Comparison** — 医療向け AI ツール比較表（カード / テーブル表示）
- **Chat Widget** — AI チャットによるコンテンツ検索（API 未設定時はローカル検索）
- **Comments** — Giscus による GitHub Discussions コメント

### Infrastructure

- **PWA** — オフライン対応の Service Worker
- **OG Images** — ビルド時に satori で自動生成
- **RSS Feed** — `/feed.xml` で記事配信
- **Search Index** — 全記事の検索インデックス自動生成
- **Newsletter** — 週次ニュースレターの自動生成・Resend 配信
- **Analytics** — Google Analytics / Umami 対応
- **i18n** — 日英辞書ファイル基盤

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Static Export) |
| Language | TypeScript |
| Content | MDX + gray-matter + next-mdx-remote |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + shadcn/ui |
| Animation | Framer Motion |
| Deployment | GitHub Pages + GitHub Actions |
| Testing | Vitest |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（静的エクスポート） |
| `npm test` | テスト実行 |
| `npm run fetch-news` | 医療 AI ニュース取得 |
| `npm run newsletter:generate` | ニュースレター生成 |
| `npm run newsletter:send` | ニュースレター配信 |

## Project Structure

```
hoshizu/
├── app/                  # Next.js App Router pages
│   ├── knowledge/        # Knowledge base (169+ articles)
│   ├── learn/            # Course learning
│   ├── book/             # Book chapters
│   ├── bookmarks/        # Bookmarked articles
│   ├── glossary/         # AI terminology glossary
│   ├── tools/            # AI tool comparison
│   ├── news/             # Medical AI news
│   └── contact/          # Contact page
├── components/           # React components
│   ├── article/          # Article display (PromptPlayground, ReadTracker, Quiz)
│   ├── bookmark/         # Bookmark button & list
│   ├── chat/             # AI chat widget
│   ├── glossary/         # Glossary search & cards
│   ├── home/             # Homepage sections (WeeklyPickup, Hero)
│   ├── knowledge/        # Knowledge base components
│   ├── layout/           # Layout (Header, Footer, ServiceWorker)
│   ├── tools/            # Tool comparison (Card, Table)
│   └── ui/               # shadcn/ui base components
├── content/              # MDX content files
│   ├── articles/         # Long-form articles
│   ├── courses/          # Learning courses
│   ├── guides/           # Practical guides
│   ├── news/             # News articles
│   ├── prompts/          # Prompt templates
│   ├── tips/             # Prompting techniques
│   ├── glossary.json     # AI terminology data
│   └── tool-comparison.json  # AI tool data
├── lib/                  # Utility functions & data layer
├── scripts/              # Build & content generation scripts
├── public/               # Static assets (OG images, SW, feed)
└── .github/workflows/    # CI/CD (deploy, news, newsletter)
```

## Content Authoring

コンテンツは `content/` 配下に MDX ファイルとして管理しています。

```mdx
---
title: "テンプレートタイトル"
description: "簡潔な説明"
category: "diagnosis"
contentType: "prompt"
tags: ["診断", "AI"]
publishedAt: "2026-03-02"
---

本文をここに記述...
```

プロンプトテンプレートで `{{変数名}}` を使うと、Prompt Playground で自動的にインタラクティブ入力フィールドが表示されます。

## Deployment

`main` ブランチへの push で GitHub Actions が自動的にビルド・デプロイします。

1. `npm run prebuild` — 検索インデックスと RSS フィード生成
2. `npm run build` — Next.js 静的エクスポート (`out/`)
3. GitHub Pages にデプロイ

## Related Projects

- [HELIX](https://github.com/kgraph57/Helix) — 医療 AI プロンプトライブラリ & 学習プラットフォーム

## License

MIT
