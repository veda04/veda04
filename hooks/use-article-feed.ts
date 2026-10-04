"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Article, ArticlesResponse } from "@/types/blogs";
import { ApiError, api } from "@/services/api";

type UseArticleFeedOptions = {
  type: "blog" | "project";
  limit: number;
  /** Infinite-scroll pagination vs. a single fixed-size fetch. */
  infinite?: boolean;
  /**
   * Page 1, fetched server-side by the caller so the initial HTML has real
   * content instead of a skeleton. When provided, the hook skips its own
   * mount fetch and only fetches client-side for subsequent "load more".
   */
  initialItems?: Article[];
  initialHasMore?: boolean;
};

type UseArticleFeedResult = {
  items: Article[];
  loading: boolean;
  error: string | null;
  initialLoad: boolean;
  hasMore: boolean;
  loadMore: () => void;
};

export function useArticleFeed({
  type,
  limit,
  infinite = false,
  initialItems,
  initialHasMore,
}: UseArticleFeedOptions): UseArticleFeedResult {
  const hasInitialData = initialItems !== undefined;

  const [items, setItems] = useState<Article[]>(initialItems ?? []);
  const [page, setPage] = useState(hasInitialData ? 1 : 0);
  const [hasMore, setHasMore] = useState(hasInitialData ? Boolean(initialHasMore) : infinite);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(!hasInitialData);
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadMore = useCallback(() => {
    if (loadingRef.current) {
      return;
    }
    if (infinite && !hasMore) {
      return;
    }
    if (!infinite && page > 0) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    const nextPage = page + 1;

    api
      .get<ArticlesResponse>("/api/articles", {
        query: infinite ? { type, page: nextPage, limit } : { type, limit },
      })
      .then((response) => {
        if (!mountedRef.current) {
          return;
        }

        const data = response.data ?? [];
        setItems((prev) => (infinite ? [...prev, ...data] : data));
        setPage(nextPage);

        if (infinite) {
          const totalPages = response.meta?.totalPages;
          setHasMore(totalPages !== undefined ? nextPage < totalPages : data.length === limit);
        }
      })
      .catch((err) => {
        if (!mountedRef.current) {
          return;
        }

        setError(
          err instanceof ApiError ? err.message : "Something went wrong while loading.",
        );
        setHasMore(false);
      })
      .finally(() => {
        loadingRef.current = false;
        if (mountedRef.current) {
          setLoading(false);
          setInitialLoad(false);
        }
      });
  }, [hasMore, infinite, limit, page, type]);

  useEffect(() => {
    if (hasInitialData) {
      return;
    }
    // Only run once on mount to fetch the first page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, loading, error, initialLoad, hasMore, loadMore };
}
