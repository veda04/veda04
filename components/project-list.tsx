"use client";

import type { Article } from "@/types/blogs";
import { useArticleFeed } from "@/hooks/use-article-feed";
import { useLoadMoreSentinel } from "@/hooks/use-load-more-sentinel";
import { ProjectCard, ProjectGrid, ProjectGridSkeleton } from "@/components/project-card";

const MORE_SKELETON_COUNT = 3;

type ProjectListProps = {
  limit: number;
  infinite?: boolean;
  /** Page 1, server-fetched by the parent so crawlers see real content. */
  initialItems?: Article[];
  initialHasMore?: boolean;
};

export default function ProjectList({
  limit,
  infinite = false,
  initialItems,
  initialHasMore,
}: ProjectListProps) {
  const { items, loading, error, initialLoad, hasMore, loadMore } = useArticleFeed({
    type: "project",
    limit,
    infinite,
    initialItems,
    initialHasMore,
  });
  const sentinelRef = useLoadMoreSentinel(loadMore, infinite);

  if (error && items.length === 0) {
    return <p className="text-sm text-muted-foreground">{error}</p>;
  }

  if (initialLoad) {
    return <ProjectGridSkeleton count={limit} />;
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">More projects coming soon.</p>;
  }

  return (
    <div>
      <ProjectGrid>
        {items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </ProjectGrid>

      {infinite ? <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" /> : null}

      {infinite && loading ? (
        <div className="mt-10">
          <ProjectGridSkeleton count={MORE_SKELETON_COUNT} />
        </div>
      ) : null}

      {infinite && !hasMore && items.length > 0 ? (
        <p className="py-8 text-center text-xs tracking-wide text-muted-foreground uppercase">
          You&apos;ve reached the end
        </p>
      ) : null}
    </div>
  );
}
