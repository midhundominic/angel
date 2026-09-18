import type { MetadataRoute } from "next";
import { galleryImages, siteConfig } from "@/data/site";

/**
 * Serves /sitemap.xml — also a 404 on the live site until now, which is part of
 * why nothing has been indexed. Submit this URL in Google Search Console once
 * deployed.
 *
 * The site is a single page with in-page anchors; Google discards URL fragments
 * in sitemaps, so listing `#services` and friends would add nothing. Instead the
 * one entry carries every gallery image, which makes the showroom and hearse
 * photos eligible for Google Images.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: galleryImages.map((image) => `${siteConfig.url}${image.src}`),
    },
  ];
}
