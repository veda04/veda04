import type { Metadata } from "next";

import { ROUTES } from "@/app/constants";
import { buildScholarlyArticlesJsonLd, createPageMetadata, sanitizeJsonLd } from "@/app/seo";
import publications from "@/data/publications.json";
import PageHeader from "@/components/page-header";
import PublicationCard from "@/components/publication-card";

const DESCRIPTION =
  "Academic papers and ongoing research spanning machine learning, precision manufacturing, and software engineering.";

const PUBLICATION_KEYWORDS = Array.from(
  new Set(publications.flatMap((publication) => publication.domains)),
);

export const metadata: Metadata = createPageMetadata({
  title: "Publications",
  description: "Academic publications spanning machine learning, precision manufacturing, and software engineering.",
  path: ROUTES.publications,
  keywords: PUBLICATION_KEYWORDS,
});

export default function PublicationsPage() {
  const publicationsJsonLd = buildScholarlyArticlesJsonLd(publications, ROUTES.publications);

  return (
    <section className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(publicationsJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageHeader kicker="Research" title="Publications" description={DESCRIPTION} />

        <div className="mt-12 sm:mt-16">
          {publications.map((publication) => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  );
}
