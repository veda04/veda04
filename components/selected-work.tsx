import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import { ROUTES } from "@/app/constants";
import { getArticlesList } from "@/services/articles";
import ProjectList from "@/components/project-list";

const PROJECT_LIMIT = 3;

export default async function SelectedWork() {
  const { articles, meta } = await getArticlesList({ type: "project", limit: PROJECT_LIMIT });
  const hasMore = meta ? meta.page < meta.totalPages : articles.length === PROJECT_LIMIT;

  return (
    <section className="w-full border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="flex flex-col">
            {/* Mobile/tablet: title and link share a row, description follows below. */}
            <div className="flex items-start justify-between gap-6 lg:hidden">
              <h2 className="text-lg leading-snug font-bold tracking-[0.2em] text-foreground uppercase">
                Selected Projects
              </h2>
              <Link
                href={ROUTES.work}
                className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase transition-colors hover:text-foreground"
              >
                View all projects
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground lg:hidden">
              A selection of work that reflects strategy, clarity, and impact.
            </p>

            {/* Desktop: original stacked sidebar layout. */}
            <div className="hidden lg:block">
              <h2 className="text-lg leading-snug font-bold tracking-[0.2em] text-foreground uppercase">
                Selected
                <br />
                Projects
              </h2>
              <p className="mt-4 max-w-[220px] text-sm text-muted-foreground">
                A selection of work that reflects strategy, clarity, and impact.
              </p>
            </div>
            <Link
              href={ROUTES.work}
              className="mt-auto hidden items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase transition-colors hover:text-foreground lg:inline-flex"
            >
              View all projects
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ProjectList limit={PROJECT_LIMIT} initialItems={articles} initialHasMore={hasMore} />
        </div>
      </div>
    </section>
  );
}
