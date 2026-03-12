# hoshizu Design Specification

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion 12
- **CMS**: MDX (将来的にSanity移行検討)
- **Deploy**: GitHub Pages (将来的にVercel移行検討)
- **Analytics**: Google Analytics 4

---

## 1. Design Direction

### Concept: "Editorial Luxury"

医療×AI×テクノロジーの知のポータルとして、学術誌のような信頼感とラグジュアリーブランドのような洗練を融合。

### Tone

- **知的で落ち着いた** — ではなく — テック系スタートアップのような軽薄さ
- **エディトリアルな品格** — ではなく — ブログのようなカジュアルさ
- **静かな自信** — ではなく — 過度な装飾や主張
- **余白で語る** — ではなく — 情報の詰め込み

### Color Scheme

| Role | Light | Dark | HEX |
|------|-------|------|-----|
| Background | Warm Cream | Deep Charcoal | `#fcfcf4` / `#0f0f0e` |
| Foreground | Near Black | Warm White | `#141413` / `#e8e5dc` |
| Accent | Muted Gold | Soft Gold | `#b8a88a` / `#c4b498` |
| Hero BG | Deep Navy | — | `#080810` |
| Subtle | Mid Tone | — | `#6b6b66` / `#8a8a84` |

### Typography

- **Headings**: Cormorant Garamond (serif) — weight 300-500, tracking tight
- **Body**: Inter (sans-serif) — weight 400, line-height 1.8
- **Labels/Caps**: Inter — weight 500, uppercase, tracking `0.2em`
- **Numbers/Stats**: Cormorant Garamond — weight 300, large size
- 欧文・和文の混植: 見出しはセリフ、本文はサンセリフを基本とする

---

## 2. Section Layout

### 2-1. Hero Section

```
┌─────────────────────────────────────────────┐
│                                             │
│  [Gradient Orb / Liquid Background]         │
│                                             │
│  Healthcare × AI × Technology    (eyebrow)  │
│                                             │
│  散らばる星を、                              │
│  星座にする。         (character reveal)      │
│                                             │
│  医療とテクノロジーの      [Explore]  (CTA)  │
│  交差点で...                                 │
│                                             │
│              ↓  (scroll indicator)           │
└─────────────────────────────────────────────┘
```

**Background Effect**: グラデーションオーブ（放射状グラデーション球体）
- 2-3個の大きなぼかしオーブがゆっくりと浮遊
- マウス追従でわずかにパララックス反応
- カラー: deep navy → purple → teal のグラデーション
- CSS `backdrop-filter: blur()` と `mix-blend-mode` を活用

**Interaction**:
- テキストは1文字ずつ reveal（現行維持）
- CTAボタンはMagnetic effect（現行維持）
- スクロールインジケーターは控えめなpulse

### 2-2. Statement Section

```
┌─────────────────────────────────────────────┐
│                                             │
│     169+          10+          500K+        │
│   Articles      Courses       Reads         │
│                                             │
│  "医療AIの知識を、体系化し、実装する。"        │
│                                             │
└─────────────────────────────────────────────┘
```

- 数字はAnimatedCounter（大きなセリフ体）
- スクロールトリガーでカウントアップ
- 下部のステートメントはfadeInUpでゆっくり出現

### 2-3. Philosophy Section (3 Domains)

```
┌─────────────────────────────────────────────┐
│                                             │
│        Medicine  ●───● AI                   │
│              ╲   │   ╱                      │
│               ╲  │  ╱                       │
│                ● Technology                  │
│                                             │
│  左カラム: 説明テキスト                       │
│  右カラム: ベン図（SVG or Canvas）            │
│                                             │
└─────────────────────────────────────────────┘
```

- ベン図はスクロール連動で段階的にreveal
- 各円がintersection observerで順次出現

### 2-4. Marquee Banner

```
┌─────────────────────────────────────────────┐
│ ← Evidence Based · AI Native · Open ...  →  │
└─────────────────────────────────────────────┘
```

- 横スクロール marquee（CSS animation）
- ホバーで速度変化
- テキスト間にドット or ダイアモンド

### 2-5. Services Overview (01-04)

```
┌─────────────────────────────────────────────┐
│                                             │
│  01 ──────  Knowledge Portal                │
│  大きめテキスト + 短い説明                    │
│                                             │
│  02 ──────  Learning Paths                  │
│  ...                                        │
│                                             │
│  03 ──────  Products & Tools                │
│  ...                                        │
│                                             │
│  04 ──────  Research & Writing              │
│  ...                                        │
│                                             │
└─────────────────────────────────────────────┘
```

- ナンバーはゴールドアクセント
- ホバーでライン展開 + テキスト微移動
- スクロールでstaggered fadeInUp

### 2-6. Editorial Picks

```
┌─────────────────────────────────────────────┐
│                                             │
│  Featured                                   │
│                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ Card │  │ Card │  │ Card │              │
│  │      │  │      │  │      │              │
│  └──────┘  └──────┘  └──────┘              │
│                                             │
└─────────────────────────────────────────────┘
```

- カードホバーでTiltCard effect
- サムネイルオーバーレイにグラデーション
- タグはpill badge

### 2-7. Credentials (Books & Track Record)

```
┌─────────────────────────────────────────────┐
│  [Dark background section]                  │
│                                             │
│  Books & Media    日経メディカル連載          │
│  ┌────┐           セミナー・学会多数          │
│  │Book│                                     │
│  │Cover│          活動実績リスト              │
│  └────┘                                     │
│                                             │
└─────────────────────────────────────────────┘
```

- ダークセクション背景
- 書籍画像はホバーで微拡大

### 2-8. Products

```
┌─────────────────────────────────────────────┐
│                                             │
│  Products & Skills                          │
│                                             │
│  ┌────────────┐  ┌────────────┐            │
│  │sukusuku-   │  │ hoshizu    │            │
│  │navi        │  │            │            │
│  └────────────┘  └────────────┘            │
│                                             │
└─────────────────────────────────────────────┘
```

- カードはグラスモーフィズム or 微妙なボーダー
- ホバーでスケールアップ + シャドウ

### 2-9. Note Articles

```
┌─────────────────────────────────────────────┐
│                                             │
│  Latest from Note                           │
│                                             │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐                      │
│  │  │ │  │ │  │ │  │  (horizontal scroll)  │
│  └──┘ └──┘ └──┘ └──┘                      │
│                                             │
└─────────────────────────────────────────────┘
```

- 横スクロールカルーセル
- カードホバーで画像ズーム

### 2-10. Category Overview

- グリッドレイアウト
- 各カテゴリはアイコン + 件数 + 説明

### 2-11. Creator Section (CTA)

```
┌─────────────────────────────────────────────┐
│  [Dark background]                          │
│                                             │
│  Created by                                 │
│  岡本 賢                                    │
│  小児科医 / AI × Healthcare                  │
│                                             │
│  [CTA: コンテンツを探す]                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 3. Global Interaction Specs

### Scroll Animation
- **Default entrance**: fadeInUp (y: 24px → 0, opacity: 0 → 1)
- **Duration**: 0.6-0.8s
- **Easing**: `[0.16, 1, 0.3, 1]` (custom smooth)
- **Stagger**: 0.1s between siblings
- **Trigger**: `whileInView` with `viewport={{ once: true, margin: "-10%" }}`

### Hover Effects
- **Cards**: translateY(-4px) + subtle shadow increase
- **Buttons**: magnetic effect on primary CTAs
- **Links**: underline color transition
- **Images**: scale(1.03) with overflow hidden

### Page Transitions
- Cross-fade between pages (0.3s)
- Content fadeInUp on entry

### Responsive
- PC-first design（記事に従い）
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Mobile: ハンバーガーメニュー、タッチデバイスはホバー無効化
- Max content width: `1200px`

### Reduced Motion
- `prefers-reduced-motion: reduce` で全アニメーション無効化
