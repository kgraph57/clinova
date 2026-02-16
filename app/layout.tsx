import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hoshizu - 散らばる星を、星座にする",
    template: "%s | Hoshizu",
  },
  description:
    "散らばるデータをつなぎ、使えるナレッジに。プロンプト、ワークフロー、ガイドを1箇所に集約。",
  metadataBase: new URL("https://kgraph57.github.io/hoshizu"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Hoshizu",
    title: "Hoshizu - 散らばる星を、星座にする",
    description:
      "医療AI実践ナレッジポータル。プロンプト、ワークフロー、学習コースを1箇所に集約。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hoshizu - 散らばる星を、星座にする",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kgraph_",
    creator: "@kgraph_",
    title: "Hoshizu - 散らばる星を、星座にする",
    description:
      "医療AI実践ナレッジポータル。プロンプト、ワークフロー、学習コースを1箇所に集約。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-svh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
