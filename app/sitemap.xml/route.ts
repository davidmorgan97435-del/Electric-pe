import { absoluteUrl } from "@/lib/utils/site";

const SUB_SITEMAPS = [
  "/sitemap-static.xml",
  "/sitemap-scooters.xml",
  "/sitemap-cities.xml",
  "/sitemap-stores.xml",
  "/sitemap-blog.xml",
  "/sitemap-localities.xml",
];

export function GET(): Response {
  const lastmod = new Date().toISOString();
  const entries = SUB_SITEMAPS.map(
    (path) =>
      `  <sitemap>\n    <loc>${absoluteUrl(path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
