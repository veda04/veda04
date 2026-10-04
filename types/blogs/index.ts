export type ArticleCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  categories?: ArticleCategory[] | null;
  tags?: string[] | null;
  publishedAt: string;
  updatedAt: string;
  readCount?: number | null;
};

export type ArticlesResponse = {
  success?: boolean;
  data: Article[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};