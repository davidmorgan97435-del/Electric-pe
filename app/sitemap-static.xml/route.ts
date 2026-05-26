import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";

const STATIC_PATHS: { path: string; priority: number; changefreq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/ev", priority: 0.9, changefreq: "weekly" },
  { path: "/stores", priority: 0.9, changefreq: "weekly" },
  { path: "/service", priority: 0.8, changefreq: "monthly" },
  { path: "/emi", priority: 0.7, changefreq: "monthly" },
  { path: "/savings", priority: 0.7, changefreq: "monthly" },
  { path: "/app", priority: 0.6, changefreq: "monthly" },
  { path: "/reviews", priority: 0.6, changefreq: "weekly" },
  { path: "/faqs", priority: 0.6, changefreq: "monthly" },
  { path: "/about-us", priority: 0.5, changefreq: "monthly" },
  { path: "/contact-us", priority: 0.5, changefreq: "monthly" },
  { path: "/blog", priority: 0.7, changefreq: "weekly" },
  { path: "/careers", priority: 0.4, changefreq: "weekly" },
  { path: "/press", priority: 0.3, changefreq: "monthly" },
  { path: "/partnerships", priority: 0.4, changefreq: "monthly" },
  { path: "/partnerships/ev-oem", priority: 0.3, changefreq: "monthly" },
  { path: "/partnerships/charger-oem", priority: 0.3, changefreq: "monthly" },
  { path: "/partnerships/cpo", priority: 0.3, changefreq: "monthly" },
  { path: "/cms", priority: 0.4, changefreq: "monthly" },
  { path: "/privacy", priority: 0.1, changefreq: "yearly" },
  { path: "/terms", priority: 0.1, changefreq: "yearly" },
  { path: "/returns", priority: 0.1, changefreq: "yearly" },
  { path: "/warranty", priority: 0.1, changefreq: "yearly" },
  { path: "/book-test-ride", priority: 0.9, changefreq: "monthly" },
  { path: "/ev-charging-stations", priority: 0.7, changefreq: "weekly" },
];

export function GET(): Response {
  const lastmod = new Date().toISOString();
  return xmlResponse(
    buildUrlSet(
      STATIC_PATHS.map((p) => ({
        path: p.path,
        priority: p.priority,
        changefreq: p.changefreq,
        lastmod,
      })),
    ),
  );
}
