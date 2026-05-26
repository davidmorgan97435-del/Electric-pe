import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";
import { stores } from "@/content/stores";

export function GET(): Response {
  const lastmod = new Date().toISOString();
  return xmlResponse(
    buildUrlSet(
      stores.map((s) => ({
        path: `/stores/${s.cityId}/${s.slug}`,
        priority: 0.6,
        changefreq: "monthly" as const,
        lastmod,
      })),
    ),
  );
}
