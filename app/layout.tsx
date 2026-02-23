import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ProgressProvider } from "@/components/learn/ProgressProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipNavigation } from "@/components/layout/SkipNavigation";
import { ThemeColorMeta } from "@/components/layout/ThemeColorMeta";
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
    "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行うHoshizuの公式サイト。",
  metadataBase: new URL("https://kgraph57.github.io/hoshizu"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Hoshizu",
    title: "Hoshizu - 散らばる星を、星座にする",
    description:
      "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行うHoshizuの公式サイト。",
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
      "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行うHoshizuの公式サイト。",
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
        <GoogleAnalytics />
        <ThemeProvider>
          <ThemeColorMeta />
          <ProgressProvider>
            <SkipNavigation />
            <div className="relative flex min-h-svh flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
              <Footer />
            </div>
            <ScrollToTop />
            <Toaster position="bottom-right" />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
