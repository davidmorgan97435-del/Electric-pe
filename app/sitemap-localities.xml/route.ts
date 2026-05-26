import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";
import { localities } from "@/content/localities";

export function GET(): Response {
  const lastmod = new Date().toISOString();
  return xmlResponse(
    buildUrlSet(
      localities.map((l) => ({
        path: `/locality/${l.slug}`,
        priority: 0.6,
        changefreq: "monthly" as const,
        lastmod,
      })),
    ),
  );
}
