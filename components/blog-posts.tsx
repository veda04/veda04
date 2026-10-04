import { ROUTES } from "@/app/constants";
import { getArticlesList } from "@/services/articles";
import BlogList from "@/components/blog-list";
import SectionHeaderRow from "@/components/section-header-row";

const POST_LIMIT = 4;

export default async function BlogPosts() {
  const { articles, meta } = await getArticlesList({ type: "blog", limit: POST_LIMIT });
  const hasMore = meta ? meta.page < meta.totalPages : articles.length === POST_LIMIT;

  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeaderRow title="Posts" viewAllHref={ROUTES.blogs} />

        <div className="mt-8 sm:mt-10">
          <BlogList limit={POST_LIMIT} initialItems={articles} initialHasMore={hasMore} />
        </div>
      </div>
    </section>
  );
}
