import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";
import { scooters } from "@/content/scooters";

const BRANDS = ["xypro", "jett", "4all"] as const;

export function GET(): Response {
  const lastmod = new Date().toISOString();
  const brandEntries = BRANDS.map((b) => ({
    path: `/ev/${b}`,
    priority: 0.8,
    changefreq: "weekly" as const,
    lastmod,
  }));
  const variantEntries = scooters.map((s) => ({
    path: `/ev/${s.brand}/${s.variantSlug}`,
    priority: 0.8,
    changefreq: "weekly" as const,
    lastmod,
  }));
  return xmlResponse(buildUrlSet([...brandEntries, ...variantEntries]));
}
