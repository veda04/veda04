import type { Metadata } from "next";

import { ROUTES } from "@/app/constants";
import { buildCollectionPageJsonLd, createPageMetadata, sanitizeJsonLd } from "@/app/seo";
import { getArticlesList } from "@/services/articles";
import PageHeader from "@/components/page-header";
import ProjectList from "@/components/project-list";

const PAGE_LIMIT = 9;
const DESCRIPTION = "A selection of work that reflects strategy, clarity, and impact.";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description: DESCRIPTION,
  path: ROUTES.work,
});

export default async function WorkPage() {
  const { articles, meta } = await getArticlesList({ type: "project", limit: PAGE_LIMIT });
  const hasMore = meta ? meta.page < meta.totalPages : articles.length === PAGE_LIMIT;

  const workJsonLd = buildCollectionPageJsonLd({
    title: "Selected Work",
    description: DESCRIPTION,
    path: ROUTES.work,
    items: articles.map((project) => ({
      name: project.title,
      path: `${ROUTES.work}/${project.slug}`,
      description: project.excerpt,
      image: project.featuredImage,
    })),
  });

  return (
    <section className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(workJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageHeader kicker="Portfolio" title="Selected Work" description={DESCRIPTION} />

        <div className="mt-12 sm:mt-16">
          <ProjectList limit={PAGE_LIMIT} infinite initialItems={articles} initialHasMore={hasMore} />
        </div>
      </div>
    </section>
  );
}
