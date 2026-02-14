<p align="center">
  <img src="public/logo.svg" alt="Hoshizu" width="80" height="80" />
</p>

<h1 align="center">Hoshizu（ホシズ）</h1>

<p align="center">
  <strong>散らばる星を、星座にする</strong><br/>
  医療従事者のための AI ナレッジポータル
</p>

<p align="center">
  <a href="https://kgraph57.github.io/hoshizu/">Live Demo</a>
</p>

---

## Overview

**Hoshizu** は、医療現場で AI を活用するための実践的なナレッジを体系的に整理・提供するポータルサイトです。プロンプトテンプレート、テクニック解説、ガイド、記事を MDX 形式で管理し、Next.js の静的サイトとして配信しています。

## Features

### Prompt Templates

臨床で即使える AI プロンプトテンプレートを提供します。

| カテゴリ | テンプレート |
|---------|------------|
| 診断支援 | 鑑別診断ジェネレーター、症状分析 OPQRST |
| 文書作成 | 紹介状作成支援 |
| 研究・論文 | 文献レビュー支援、論文要約 |

### Tips & Techniques

プロンプトエンジニアリングの基礎テクニックを医療文脈で解説します。

- Zero-shot / Few-shot プロンプティング
- Chain-of-Thought（思考の連鎖）
- ロールプレイングプロンプト
- 出力フォーマット制御

### Guides

医療 AI 活用の実践ガイドを提供します。

- 症例報告の書き方
- 英語論文の校正ガイド
- 論文読解ガイド

### Articles

医療 AI に関する記事を掲載しています。

- 医療 AI の安全性
- 医療 AI 入門

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Language | TypeScript |
| Content | MDX + gray-matter + next-mdx-remote |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + shadcn/ui |
| Animation | Framer Motion |
| Deployment | GitHub Pages (Static Export) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
hoshizu/
├── app/                  # Next.js App Router pages
│   ├── knowledge/        # Knowledge base pages
│   ├── about/            # About page
│   └── contact/          # Contact page
├── components/           # React components
│   ├── article/          # Article display components
│   ├── home/             # Homepage sections
│   ├── knowledge/        # Knowledge base components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # shadcn/ui base components
├── content/              # MDX content files
│   ├── articles/         # Long-form articles
│   ├── guides/           # Practical guides
│   ├── prompts/          # Prompt templates
│   └── tips/             # Prompting techniques
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Content Authoring

コンテンツは `content/` 配下に MDX ファイルとして管理されています。新しいコンテンツを追加するには：

1. 対応するディレクトリに `.mdx` ファイルを作成
2. frontmatter にメタデータを記述
3. MDX で本文を執筆

```mdx
---
title: "テンプレートタイトル"
description: "簡潔な説明"
category: "diagnosis"
tags: ["診断", "AI"]
---

本文をここに記述...
```

## Related Projects

- [HELIX](https://github.com/kgraph57/Helix) — 医療 AI プロンプトライブラリ & 学習プラットフォーム

## License

MIT
