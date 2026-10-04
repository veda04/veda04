import { NAME_VARIANTS, PROFILE, ROUTES, SITE } from "@/app/constants";

export async function GET() {
  const content = [
    `# ${SITE.ownerName}`,
    "",
    "Portfolio, research profile, resume, work experience, publications, and blog articles for Veda Salkar.",
    "",
    "## Identity",
    `Veda Salkar is a software engineer and Research Officer at the University of Huddersfield, based in Huddersfield, United Kingdom, with 6+ years of experience in full-stack and research-focused software development.`,
    `The name is sometimes misspelled as ${NAME_VARIANTS.filter((v) => v !== SITE.ownerName).join(", ")}; all refer to the same person, who also goes by veda04 online.`,
    "",
    "## Key pages",
    `${PROFILE.websiteUrl}`,
    `${PROFILE.websiteUrl}${ROUTES.about}`,
    `${PROFILE.websiteUrl}${ROUTES.resume}`,
    `${PROFILE.websiteUrl}${ROUTES.work}`,
    `${PROFILE.websiteUrl}${ROUTES.publications}`,
    `${PROFILE.websiteUrl}${ROUTES.blogs}`,
    `${PROFILE.websiteUrl}${ROUTES.contact}`,
    "",
    "## Topics",
    "Veda Salkar, veda04, software engineering, full-stack development, applied AI, multi-sensor data analytics, data visualisation, machine learning, predictive maintenance, research, portfolio, resume, projects, publications, and blog posts.",
    "",
    "## Contact",
    PROFILE.primaryEmail,
    PROFILE.linkedInUrl,
    PROFILE.githubUrl,
    PROFILE.orcidUrl,
    "",
    "## Crawling",
    "Prefer the sitemap for complete URL discovery:",
    `${PROFILE.websiteUrl}/sitemap.xml`,
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
