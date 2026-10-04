import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, EyeIcon } from "@hugeicons/core-free-icons";

import { ROUTES } from "@/app/constants";
import type { Article } from "@/types/blogs";
import { getTagColorClass } from "@/lib/tag-colors";

function formatPublishedDate(dateString: string): string | null {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function BlogPostItem({ post }: { post: Article }) {
  const publishedDate = formatPublishedDate(post.publishedAt);

  return (
    <Link
      href={`${ROUTES.blogs}/${post.slug}`}
      className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0 sm:gap-6"
    >
      <div className="relative h-15 w-15 shrink-0 overflow-hidden rounded-lg bg-surface sm:h-30 sm:w-30">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            sizes="(min-width: 640px) 160px, 112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getTagColorClass(tag)} capitalize`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <h3 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground sm:text-base">{post.excerpt}</p>
        ) : null}

        {publishedDate || post.readCount != null ? (
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            {publishedDate ? (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon icon={Calendar03Icon} className="h-3.5 w-3.5" aria-hidden="true" />
                {publishedDate}
              </span>
            ) : null}
            {post.readCount != null ? (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon icon={EyeIcon} className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readCount}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
