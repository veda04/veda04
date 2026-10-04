import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  EyeIcon,
  Linkedin02Icon,
  MailAtSign01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";

import { PROFILE, ROUTES } from "@/app/constants";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
  sanitizeJsonLd,
} from "@/app/seo";
import { getTagColorClass } from "@/lib/tag-colors";
import { formatDate } from "@/lib/utils";
import type { ArticleAsset, ArticleWithContent } from "@/services/articles";
import ArticleContentRenderer from "@/components/article-content-renderer";
import ArticleTocNav from "@/components/article-toc-nav";
import AddonLink from "@/components/addon-link";
import CopyUrlButton from "@/components/copy-url-button";
import IconCircleLink from "@/components/icon-circle-link";
import ProjectGallery from "@/components/project-gallery";

type ArticlePageProps = {
  article: ArticleWithContent;
  assets: ArticleAsset[];
  basePath: string;
  sectionLabel: string;
};

export default function ArticlePage({ article, assets, basePath, sectionLabel }: ArticlePageProps) {
  const updatedDate = formatDate(article.updatedAt) ?? formatDate(article.publishedAt);
  const shareUrl = `${PROFILE.websiteCanonicalUrl}${basePath}/${article.slug}`;
  const breadcrumbLabel = article.tagsData[0]?.name ?? sectionLabel;
  const addonLinks = article.addonLinks ?? [];

  const hasToc = article.parsedContent.toc.length > 0;
  const hasAddonLinks = addonLinks.length > 0;
  const hasSidebar = hasToc || hasAddonLinks;

  const articlePath = `${basePath}/${article.slug}`;
  const articleDescription =
    article.excerpt || `${article.title} — a ${sectionLabel.toLowerCase()} by ${PROFILE.name}.`;
  const isBlog = basePath === ROUTES.blogs;
  const articleJsonLdInput = {
    title: article.title,
    description: articleDescription,
    path: articlePath,
    image: article.featuredImage,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    keywords: article.tagsText,
  };
  const articleJsonLd = isBlog
    ? buildBlogPostingJsonLd(articleJsonLdInput)
    : buildCreativeWorkJsonLd(articleJsonLdInput);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: ROUTES.home },
    { name: sectionLabel, path: basePath },
    { name: article.title, path: articlePath },
  ]);

  return (
    <article className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbJsonLd) }}
      />
      <div className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase"
          >
            <Link href={ROUTES.home} className="transition-colors hover:text-accent">
              Home
            </Link>
            <HugeiconsIcon icon={ArrowRight01Icon} className="h-3 w-3" aria-hidden="true" />
            <Link href={basePath} className="transition-colors hover:text-accent">
              {sectionLabel}
            </Link>
            <HugeiconsIcon icon={ArrowRight01Icon} className="h-3 w-3" aria-hidden="true" />
            <span className="max-w-[200px] truncate font-semibold text-foreground">
              {breadcrumbLabel}
            </span>
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-12">
            <div>
              <h1 className="text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface">
                  <Image
                    src="/images/hero_image.png"
                    alt={PROFILE.profileImageAlt}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{PROFILE.name}</span>
                  {updatedDate ? (
                    <>
                      {" "}
                      <span aria-hidden="true">|</span> Last updated on {updatedDate}
                    </>
                  ) : null}
                </p>
              </div>

              {article.tagsData.length > 0 || article.readCount != null ? (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {article.tagsData.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {article.tagsData.map((tag) => (
                        <span
                          key={tag.slug}
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getTagColorClass(tag.name)}`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {article.readCount != null ? (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <HugeiconsIcon icon={EyeIcon} className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.readCount} reads
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>

            {article.featuredImage ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface sm:aspect-video lg:aspect-[4/3]">
                <Image
                  src={article.featuredImage}
                  alt={article.featuredImageAlt || article.title}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className={hasSidebar ? "grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]" : ""}>
          {hasSidebar ? (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
                    Share this Article
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <IconCircleLink
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
                      icon={NewTwitterIcon}
                      label="Share on X"
                    />
                    <IconCircleLink
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      icon={Linkedin02Icon}
                      label="Share on LinkedIn"
                    />
                    <IconCircleLink
                      href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
                      icon={MailAtSign01Icon}
                      label="Share by email"
                    />
                    <CopyUrlButton path={`${basePath}/${article.slug}`} />
                  </div>
                </div>

                {hasToc ? (
                  <div className="rounded-xl border border-border bg-surface p-5">
                    <p className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
                      In this Article
                    </p>
                    <div className="mt-4">
                      <ArticleTocNav items={article.parsedContent.toc} />
                    </div>
                  </div>
                ) : null}

                {hasAddonLinks ? (
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
                      Links
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      {addonLinks.map((link, index) => (
                        <AddonLink key={`${link.url}-${index}`} item={link} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          ) : null}

          <div className="min-w-0 max-w-3xl">
            {article.parsedContent.blocks.length > 0 ? (
              <ArticleContentRenderer blocks={article.parsedContent.blocks} />
            ) : article.excerpt ? (
              <p className="text-[15px] leading-8 text-foreground">{article.excerpt}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Content coming soon.</p>
            )}
          </div>
        </div>

        {assets.length > 0 ? (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-lg font-bold tracking-[0.2em] text-foreground uppercase">Gallery</h2>
            <div className="mt-8">
              <ProjectGallery assets={assets} projectTitle={article.title} />
            </div>
          </div>
        ) : null}

        {article.relatedItems.length > 0 ? (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-lg font-bold tracking-[0.2em] text-foreground uppercase">Related</h2>
            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {article.relatedItems.map((related) => {
                const relatedBasePath = related.type === "project" ? ROUTES.work : ROUTES.blogs;
                return (
                  <Link
                    key={related.id}
                    href={`${relatedBasePath}/${related.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                      {related.featuredImage ? (
                        <Image
                          src={related.featuredImage}
                          alt={related.featuredImageAlt || related.title}
                          fill
                          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {related.title}
                    </h3>
                    {related.excerpt ? (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{related.excerpt}</p>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
