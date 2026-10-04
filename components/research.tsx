import { ROUTES } from "@/app/constants";
import publications from "@/data/publications.json";
import PublicationCard from "@/components/publication-card";
import SectionHeaderRow from "@/components/section-header-row";

export default function Research() {
  const published = publications.filter(
    (publication) => publication.status.toLowerCase() === "published",
  );

  if (published.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeaderRow title="Research" viewAllHref={ROUTES.publications} />

        <div className="mt-8 sm:mt-10">
          {published.map((publication) => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  );
}
