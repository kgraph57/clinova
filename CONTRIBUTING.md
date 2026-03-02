# Contributing to Hoshizu

Hoshizuへのコントリビューションを歓迎します。

## 開発環境のセットアップ

```bash
git clone https://github.com/kgraph57/hoshizu.git
cd hoshizu
npm install
npm run dev
```

## コンテンツの追加

### MDX記事を追加する

1. `content/` 配下の適切なディレクトリにMDXファイルを作成します:
   - `content/prompts/` — プロンプトテンプレート
   - `content/tips/` — Tips
   - `content/guides/` — 実践ガイド
   - `content/articles/` — 記事
   - `content/news/` — ニュース

2. frontmatterを設定します:

```yaml
---
title: "記事タイトル"
description: "記事の説明"
category: "diagnosis" # diagnosis | research | clinical | ai-fundamentals | workflow
contentType: "guide" # prompt | tip | guide | article | news
difficulty: "beginner" # beginner | intermediate | advanced
tags: ["タグ1", "タグ2"]
publishedAt: "2026-03-02"
author: "your-name"
featured: false
---
```

3. `npm run dev` で表示を確認します。

### コーディング規約

- TypeScript strict mode
- イミュータブルなデータ更新パターン
- ファイルは800行以下
- 関数は50行以下

## プルリクエスト

1. feature ブランチを作成: `git checkout -b feat/your-feature`
2. Conventional Commits形式: `feat:`, `fix:`, `docs:` 等
3. テストが通ることを確認: `npm test`
4. ビルドが成功することを確認: `npm run build`

## 医療コンテンツに関する注意

- エビデンスに基づく情報を記載してください
- 参考文献がある場合は明記してください
- 診断・治療の最終判断は医師に委ねる旨の免責を含めてください
