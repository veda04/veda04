import { cache } from "react";

import { ApiError } from "@/services/api";
import { cmsApi } from "@/services/cms";
import type { ArticlesResponse } from "@/types/blogs";

export type ArticleTag = {
  name: string;
  slug: string;
  color?: string;
};

export type ArticleAddonLink = {
  type: string;
  label?: string;
  url: string;
  order?: number;
};

export type RelatedArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  publishedAt?: string;
  type?: string;
};

export type NormalizedTag = {
  name: string;
  slug: string;
  color?: string;
};

export type ArticleDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  contentType?: string | null;
  type?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  tags?: ArticleTag[] | string[] | null;
  readCount?: number | null;
  addonLinks?: ArticleAddonLink[] | null;
  related?: RelatedArticle[] | null;
};

type ArticleDetailResponse = {
  success?: boolean;
  data: ArticleDetail;
};

type ArticleListResponse = {
  success?: boolean;
  data: ArticleDetail[];
};

type RichNode = {
  type?: string;
  text?: string;
  marks?: Array<{ type?: string; attrs?: Record<string, unknown> }>;
  attrs?: Record<string, unknown>;
  content?: RichNode[];
};

type RichDoc = {
  type?: string;
  content?: RichNode[];
};

export type ParsedBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; level: number; text: string; id: string }
  | { kind: "blockquote"; text: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "code_block"; code: string; language?: string }
  | { kind: "bulletList"; items: ParsedBlock[][] }
  | { kind: "orderedList"; items: ParsedBlock[][] };

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export type ParsedArticleContent = {
  blocks: ParsedBlock[];
  toc: TocItem[];
};

function textFromNode(node: RichNode): string {
  if (typeof node.text === "string") {
    return node.text;
  }

  if (!Array.isArray(node.content)) {
    return "";
  }

  return node.content.map(textFromNode).join("").trim();
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseNodeList(
  nodes: RichNode[],
  toc: TocItem[],
  idCounts: Map<string, number>,
): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];

  for (const node of nodes) {
    const type = node.type ?? "paragraph";

    if (type === "heading") {
      const levelRaw = Number(node.attrs?.level ?? 2);
      const level = Number.isFinite(levelRaw)
        ? Math.min(6, Math.max(1, levelRaw))
        : 2;
      const text = textFromNode(node);

      if (!text) {
        continue;
      }

      const baseId = slugifyHeading(text) || "section";
      const count = idCounts.get(baseId) ?? 0;
      idCounts.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

      toc.push({ id, text, level });
      blocks.push({ kind: "heading", level, text, id });
      continue;
    }

    if (type === "paragraph") {
      const text = textFromNode(node);
      if (text) {
        blocks.push({ kind: "paragraph", text });
      }
      continue;
    }

    if (type === "blockquote") {
      const text = textFromNode(node);
      if (text) {
        blocks.push({ kind: "blockquote", text });
      }
      continue;
    }

    if (type === "image") {
      const src = String(node.attrs?.src ?? "").trim();
      if (src) {
        const alt = String(node.attrs?.alt ?? "").trim();
        blocks.push({ kind: "image", src, alt });
      }
      continue;
    }

    if (type === "code_block" || type === "codeBlock") {
      const code = textFromNode(node);
      if (code) {
        const language =
          typeof node.attrs?.language === "string" ? node.attrs.language : undefined;
        blocks.push({ kind: "code_block", code, language });
      }
      continue;
    }

    if (type === "bulletList" || type === "orderedList") {
      const listItems = (node.content ?? [])
        .filter((item) => item.type === "listItem")
        .map((item) => parseNodeList(item.content ?? [], toc, idCounts))
        .filter((itemBlocks) => itemBlocks.length > 0);

      if (listItems.length > 0) {
        blocks.push({
          kind: type === "bulletList" ? "bulletList" : "orderedList",
          items: listItems,
        });
      }
      continue;
    }

    if (Array.isArray(node.content) && node.content.length > 0) {
      blocks.push(...parseNodeList(node.content, toc, idCounts));
    }
  }

  return blocks;
}

export function parseArticleContent(contentRaw?: string | null): ParsedArticleContent {
  if (!contentRaw) {
    return { blocks: [], toc: [] };
  }

  let parsed: RichDoc | null = null;

  try {
    parsed = JSON.parse(contentRaw) as RichDoc;
  } catch {
    return {
      blocks: [{ kind: "paragraph", text: contentRaw }],
      toc: [],
    };
  }

  const rootNodes = Array.isArray(parsed?.content) ? parsed.content : [];
  const toc: TocItem[] = [];
  const idCounts = new Map<string, number>();
  const blocks = parseNodeList(rootNodes, toc, idCounts);

  return { blocks, toc };
}

function normalizeTags(tags?: ArticleDetail["tags"]): NormalizedTag[] {
  if (!tags) {
    return [];
  }

  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => {
      if (typeof tag === "string") {
        const value = tag.trim();
        if (!value) {
          return null;
        }

        return {
          name: value,
          slug: value,
        };
      }

      if (tag && typeof tag === "object" && typeof tag.name === "string") {
        const name = tag.name.trim();
        if (!name) {
          return null;
        }

        return {
          name,
          slug: tag.slug || name,
          color: typeof tag.color === "string" ? tag.color : undefined,
        };
      }

      return null;
    })
    .filter((value): value is NormalizedTag => Boolean(value));
}

function normalizeRelated(related?: ArticleDetail["related"]): RelatedArticle[] {
  if (!Array.isArray(related)) {
    return [];
  }

  return related.filter((item): item is RelatedArticle => {
    return Boolean(item && item.slug && item.title);
  });
}

async function tryDetailEndpoint(path: string): Promise<ArticleDetail | null> {
  try {
    const response = await cmsApi.get<ArticleDetailResponse>(path, {
      next: { revalidate: 900 },
    } as Parameters<typeof cmsApi.get>[1] & { next?: { revalidate: number } });

    if (response?.data && !Array.isArray(response.data)) {
      return response.data;
    }

    return null;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }

    throw err;
  }
}

async function fetchArticleBySlugRaw(slug: string): Promise<ArticleDetail | null> {
  const candidates = [
    `/articles/${slug}`,
    `/articles/slug/${slug}`,
  ];

  for (const path of candidates) {
    const article = await tryDetailEndpoint(path);
    if (article) {
      return article;
    }
  }

  const listResponse = await cmsApi.get<ArticleListResponse>("/articles", {
    query: { slug, limit: 1, page: 1 },
    next: { revalidate: 900 },
  } as Parameters<typeof cmsApi.get>[1] & { next?: { revalidate: number } });

  const first = Array.isArray(listResponse?.data)
    ? listResponse.data[0]
    : undefined;

  return first ?? null;
}

export const getArticleBySlug = cache(async (slug: string) => {
  const trimmedSlug = slug.trim();
  if (!trimmedSlug) {
    return null;
  }

  try {
    const article = await fetchArticleBySlugRaw(trimmedSlug);
    if (!article) {
      return null;
    }

    return {
      ...article,
      tagsData: normalizeTags(article.tags),
      tagsText: normalizeTags(article.tags).map((tag) => tag.name),
      relatedItems: normalizeRelated(article.related),
      parsedContent: parseArticleContent(article.content),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
});

export type ArticleAsset = {
  id: string;
  mediaId?: string;
  type?: string;
  url: string;
  mimeType?: string;
  alt?: string;
  caption?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
};

type ArticleAssetsResponse = {
  success?: boolean;
  data?: {
    article?: { id: string; slug: string; title: string };
    assets?: ArticleAsset[];
  };
};

export const getArticleAssets = cache(async (slug: string): Promise<ArticleAsset[]> => {
  const trimmedSlug = slug.trim();
  if (!trimmedSlug) {
    return [];
  }

  try {
    const response = await cmsApi.get<ArticleAssetsResponse>(
      `/articles/${trimmedSlug}/assets`,
      {
        next: { revalidate: 900 },
      } as Parameters<typeof cmsApi.get>[1] & { next?: { revalidate: number } },
    );

    const assets = Array.isArray(response?.data?.assets) ? response.data.assets : [];

    return assets
      .filter((asset) => Boolean(asset?.url))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    // The gallery is an enhancement; hide it rather than failing the page.
    return [];
  }
});

export const getProjectBySlug = cache(async (slug: string) => {
  const article = await getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  if (article.type && article.type !== "project") {
    return null;
  }

  return article;
});

export const getBlogBySlug = cache(async (slug: string) => {
  const article = await getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  if (article.type && article.type !== "blog") {
    return null;
  }

  return article;
});

export type ArticleWithContent = NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>;

type GetArticlesParams = {
  type?: "blog" | "project";
  page?: number;
  limit?: number;
  tag?: string;
  category?: string;
  revalidate?: number;
};

export async function getArticlesList({
  type = "blog",
  page = 1,
  limit = 10,
  tag,
  category,
  revalidate = 3600,
}: GetArticlesParams = {}): Promise<{
  articles: ArticlesResponse["data"];
  meta?: ArticlesResponse["meta"];
  error?: string;
}> {
  try {
    const res = await cmsApi.get<ArticlesResponse>("/articles", {
      query: { type, sort: "latest", page, limit, tag, category },
      next: { revalidate },
    } as Parameters<typeof cmsApi.get>[1] & { next?: { revalidate: number } });

    return { articles: res.data ?? [], meta: res.meta };
  } catch (err) {
    const message =
      err instanceof ApiError
        ? `Failed to load posts (${err.status})`
        : "Something went wrong while loading posts.";

    return { articles: [], error: message };
  }
}