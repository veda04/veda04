import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import { getTagColorClass } from "@/lib/tag-colors";

export type Publication = {
  title: string;
  abstract: string;
  image: string | null;
  doi: string | null;
  status: string;
  authors?: string[];
  domains: string[];
};

export default function PublicationCard({ publication }: { publication: Publication }) {
  const { title, abstract, image, doi, status, authors, domains } = publication;
  const isPublished = status.toLowerCase() === "published";

  return (
    <article className="border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap gap-2">
        {domains.map((domain) => (
          <span
            key={domain}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTagColorClass(domain)}`}
          >
            {domain}
          </span>
        ))}
      </div>

      {authors?.length ? (
        <p className="mt-4 text-sm text-muted-foreground">{authors.join(", ")}</p>
      ) : null}

      <h3 className="mt-2 text-lg font-bold text-foreground sm:text-xl">
        {doi ? (
          <a
            href={doi}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground sm:text-base">{abstract}</p>

      {image ? (
        <div className="relative mt-4 aspect-video w-full max-w-md overflow-hidden rounded-lg bg-surface">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 640px) 448px, 90vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
            isPublished
              ? "border-accent/30 bg-accent-subtle text-accent"
              : "border-border bg-surface text-muted-foreground"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-accent" : "bg-muted-foreground"}`}
            aria-hidden="true"
          />
          {status}
        </span>

        {doi ? (
          <a
            href={doi}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent px-4 py-2 text-xs font-semibold tracking-wide text-accent uppercase transition-colors hover:bg-accent-subtle"
          >
            Read
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
