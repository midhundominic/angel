import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { coffinRanges } from "@/data/coffins";
import { galleryImages, siteConfig } from "@/data/site";

/**
 * Serves /sitemap.xml. Submit this URL in Google Search Console once deployed.
 *
 * The homepage is a single page with in-page anchors, and Google discards URL
 * fragments in sitemaps, so `#services` and friends would add nothing. What it
 * does carry is every gallery image, which makes the showroom, coffin, freezer
 * and hearse photographs eligible for Google Images.
 *
 * /coffin-boxes and every article under /blogs are real routes and get their own
 * entries, each with the photographs that appear on it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => `${siteConfig.url}${path}`;
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: galleryImages.map((image) => absolute(image.src)),
    },
    {
      url: absolute("/coffin-boxes"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: coffinRanges.map((range) => absolute(range.image)),
    },
    {
      url: absolute("/blogs"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: blogPosts.map((post) => absolute(post.cover.src)),
    },
    ...blogPosts.map((post) => ({
      url: absolute(`/blogs/${post.slug}`),
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absolute(post.cover.src)],
    })),
  ];
}
