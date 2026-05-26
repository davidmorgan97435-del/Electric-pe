import { absoluteUrl } from "@/lib/utils/site";

export type SitemapEntry = {
  path: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export function buildUrlSet(entries: SitemapEntry[]): string {
  const body = entries
    .map((e) => {
      const parts = [
        `    <loc>${absoluteUrl(e.path)}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        typeof e.priority === "number"
          ? `    <priority>${e.priority.toFixed(1)}</priority>`
          : null,
      ]
        .filter(Boolean)
        .join("\n");
      return `  <url>\n${parts}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
