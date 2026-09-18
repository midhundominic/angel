import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * Serves /robots.txt. The live site returned a 404 here before this file
 * existed, which meant crawlers had no pointer to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing user-facing lives under /api — keep it out of the index.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
