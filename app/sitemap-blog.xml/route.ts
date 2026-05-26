import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";
import { blogPosts } from "@/content/blog/posts";

export function GET(): Response {
  return xmlResponse(
    buildUrlSet(
      blogPosts.map((p) => ({
        path: `/blog/${p.slug}`,
        priority: 0.6,
        changefreq: "monthly" as const,
        lastmod: new Date(p.updatedAt ?? p.publishedAt).toISOString(),
      })),
    ),
  );
}
