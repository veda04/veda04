import type { MetadataRoute } from "next";

import { PROFILE } from "@/app/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${PROFILE.websiteUrl}/sitemap.xml`,
    host: PROFILE.websiteUrl,
  };
}
