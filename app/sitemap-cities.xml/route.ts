import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";
import { cities } from "@/content/cities";

export function GET(): Response {
  const lastmod = new Date().toISOString();
  return xmlResponse(
    buildUrlSet(
      cities.map((c) => ({
        path: `/stores/${c.slug}`,
        priority: 0.7,
        changefreq: "weekly" as const,
        lastmod,
      })),
    ),
  );
}
