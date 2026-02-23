import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getArticleBySlug,
  getAllSlugs,
  getArticlesByCategory,
} from "@/lib/content";
import { getRelatedCourses } from "@/lib/courses";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleFooter } from "@/components/article/ArticleFooter";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { PromptTemplate } from "@/components/article/PromptTemplate";
import { Warning } from "@/components/article/Warning";
import { Callout } from "@/components/article/Callout";
import { H2, H3 } from "@/components/article/HeadingWithId";
import { TableOfContents } from "@/components/learn/TableOfContents";
import { MobileToc } from "@/components/learn/MobileToc";
import { extractToc } from "@/lib/toc";
import { SITE_CONFIG } from "@/lib/constants";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/hoshizu" : "";

function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const rawSrc = typeof props.src === "string" ? props.src : undefined;
  const src =
    rawSrc && rawSrc.startsWith("/") ? `${basePath}${rawSrc}` : rawSrc;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src}
      alt={props.alt ?? ""}
      className="w-full h-auto rounded-lg shadow-md my-8"
      loading="lazy"
    />
  );
}

const mdxComponents = {
  h2: H2,
  h3: H3,
  PromptTemplate,
  Warning,
  Callout,
  img: MdxImage,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/knowledge/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      ...(article.updatedAt && { modifiedTime: article.updatedAt }),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const relatedCourses = getRelatedCourses(article.category);

  const tocItems = extractToc(article.content);
  const isNewsletter = article.contentType === "news";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      {tocItems.length > 0 && <TableOfContents items={tocItems} />}
      <div className="mx-auto max-w-[720px] px-6 py-12 sm:py-20">
        <ArticleHeader article={article} />
        {tocItems.length > 0 && <MobileToc items={tocItems} />}

        <article className={`prose ${isNewsletter ? "newsletter-prose" : ""}`}>
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <ArticleFooter
          article={article}
          relatedArticles={related}
          relatedCourses={relatedCourses}
        />
      </div>
    </>
  );
}
