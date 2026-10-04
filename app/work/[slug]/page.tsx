import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ROUTES } from "@/app/constants";
import { createPageMetadata } from "@/app/seo";
import { getArticleAssets, getProjectBySlug } from "@/services/articles";
import ArticlePage from "@/components/article-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getProjectBySlug(slug);

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt || `${article.title} — a project by Veda Salkar.`,
    path: `${ROUTES.work}/${slug}`,
    image: article.featuredImage,
    imageAlt: article.featuredImageAlt || article.title,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    section: "Work",
    tags: article.tagsText,
    keywords: article.tagsText,
  });
}

export default async function ProjectArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getProjectBySlug(slug);

  if (!article) {
    notFound();
  }

  const assets = await getArticleAssets(slug);

  return <ArticlePage article={article} assets={assets} basePath={ROUTES.work} sectionLabel="Work" />;
}
