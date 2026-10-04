import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ROUTES } from "@/app/constants";
import { createPageMetadata } from "@/app/seo";
import { getArticleAssets, getBlogBySlug } from "@/services/articles";
import ArticlePage from "@/components/article-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt || `${article.title} — a blog post by Veda Salkar.`,
    path: `${ROUTES.blogs}/${slug}`,
    image: article.featuredImage,
    imageAlt: article.featuredImageAlt || article.title,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    section: "Blog",
    tags: article.tagsText,
    keywords: article.tagsText,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  const assets = await getArticleAssets(slug);

  return <ArticlePage article={article} assets={assets} basePath={ROUTES.blogs} sectionLabel="Blog" />;
}
