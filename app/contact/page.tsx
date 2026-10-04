import type { Metadata } from "next";

import { ROUTES } from "@/app/constants";
import { buildWebPageJsonLd, createPageMetadata, sanitizeJsonLd } from "@/app/seo";
import ContactForm from "@/components/contact-form";
import PageHeader from "@/components/page-header";

const DESCRIPTION =
  "Tell me a little about what you need and I'll get back to you within a couple of days.";
const PAGE_TITLE = "Get in Touch with Veda Salkar";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Get in touch to start a project, request a quote, or ask a question.",
  path: ROUTES.contact,
});

const contactJsonLd = buildWebPageJsonLd({
  title: PAGE_TITLE,
  description: DESCRIPTION,
  path: ROUTES.contact,
});

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { type } = await searchParams;

  return (
    <section className="relative w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(contactJsonLd) }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute top-6 left-4 h-6 w-6 border-t border-l border-border sm:top-8 sm:left-6 lg:left-8" />
        <span className="absolute top-6 right-4 h-6 w-6 border-t border-r border-border sm:top-8 sm:right-6 lg:right-8" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageHeader kicker="Get In Touch" title="Let's Get Started" description={DESCRIPTION} />

        <div className="mt-12 rounded-2xl border border-border bg-background-secondary p-6 sm:mt-16 sm:p-10 lg:p-12">
          <ContactForm defaultService={type} />
        </div>
      </div>
    </section>
  );
}
