"use client";

import type { Article } from "@/types/blogs";
import { useArticleFeed } from "@/hooks/use-article-feed";
import { useLoadMoreSentinel } from "@/hooks/use-load-more-sentinel";
import BlogPostItem from "@/components/blog-post-item";

const INITIAL_SKELETON_COUNT = 4;
const MORE_SKELETON_COUNT = 2;

type BlogListProps = {
  limit: number;
  infinite?: boolean;
  /** Page 1, server-fetched by the parent so crawlers see real content. */
  initialItems?: Article[];
  initialHasMore?: boolean;
};

export default function BlogList({
  limit,
  infinite = false,
  initialItems,
  initialHasMore,
}: BlogListProps) {
  const { items, loading, error, initialLoad, hasMore, loadMore } = useArticleFeed({
    type: "blog",
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
    return <BlogListSkeleton count={INITIAL_SKELETON_COUNT} />;
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">More posts coming soon.</p>;
  }

  return (
    <div>
      <div className="divide-y divide-border">
        {items.map((post) => (
          <BlogPostItem key={post.id} post={post} />
        ))}
      </div>

      {infinite ? <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" /> : null}

      {infinite && loading ? <BlogListSkeleton count={MORE_SKELETON_COUNT} /> : null}

      {infinite && !hasMore && items.length > 0 ? (
        <p className="py-8 text-center text-xs tracking-wide text-muted-foreground uppercase">
          You&apos;ve reached the end
        </p>
      ) : null}
    </div>
  );
}

function BlogListSkeleton({ count }: { count: number }) {
  return (
    <div className="divide-y divide-border" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex animate-pulse items-start gap-4 py-5 first:pt-0 last:pb-0 sm:gap-6">
          <div className="h-28 w-28 shrink-0 rounded-lg bg-surface sm:h-40 sm:w-40" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-2/3 rounded bg-border" />
            <div className="mt-2 h-3 w-full rounded bg-border" />
            <div className="mt-1 h-3 w-4/5 rounded bg-border" />
          </div>
        </div>
      ))}
    </div>
  );
}
