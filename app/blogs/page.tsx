import type { Metadata } from "next";

import { ROUTES } from "@/app/constants";
import { buildCollectionPageJsonLd, createPageMetadata, sanitizeJsonLd } from "@/app/seo";
import { getArticlesList } from "@/services/articles";
import BlogList from "@/components/blog-list";
import PageHeader from "@/components/page-header";

const PAGE_LIMIT = 6;
const DESCRIPTION = "Notes and long-form posts on AI research, manufacturing, and building software.";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "Writing on AI, manufacturing research, and software engineering.",
  path: ROUTES.blogs,
});

export default async function BlogsPage() {
  const { articles, meta } = await getArticlesList({ type: "blog", limit: PAGE_LIMIT });
  const hasMore = meta ? meta.page < meta.totalPages : articles.length === PAGE_LIMIT;

  const blogJsonLd = buildCollectionPageJsonLd({
    title: "Blog",
    description: DESCRIPTION,
    path: ROUTES.blogs,
    items: articles.map((post) => ({
      name: post.title,
      path: `${ROUTES.blogs}/${post.slug}`,
      description: post.excerpt,
      image: post.featuredImage,
    })),
  });

  return (
    <section className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(blogJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageHeader kicker="Writing" title="Blog" description={DESCRIPTION} />

        <div className="mt-12 sm:mt-16">
          <BlogList limit={PAGE_LIMIT} infinite initialItems={articles} initialHasMore={hasMore} />
        </div>
      </div>
    </section>
  );
}
