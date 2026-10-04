import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/app/constants";
import type { Article } from "@/types/blogs";

export function ProjectCard({ project, index }: { project: Article; index: number }) {
  return (
    <Link href={`${ROUTES.work}/${project.slug}`} className="group block">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-6 text-xs text-muted-foreground sm:line-clamp-3">
            {project.excerpt}
          </p>
        </div>
      </div>

      <span className="mt-3 block h-0.5 w-8 bg-accent" aria-hidden="true" />

      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl bg-surface">
        {project.featuredImage ? (
          <Image
            src={project.featuredImage}
            alt={project.featuredImageAlt || project.title}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
    </Link>
  );
}

export function ProjectGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{children}</div>;
}

export function ProjectGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-4 w-24 rounded bg-border" />
          <div className="mt-3 h-0.5 w-8 bg-border" />
          <div className="mt-4 aspect-[4/3] rounded-xl bg-surface" />
        </div>
      ))}
    </div>
  );
}
