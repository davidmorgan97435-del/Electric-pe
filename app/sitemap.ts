import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils/site";
import { scooters } from "@/content/scooters";
import { cities } from "@/content/cities";
import { stores } from "@/content/stores";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${SITE.url}/ev`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE.url}/ev-charging-stations`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${SITE.url}/stores`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE.url}/book-test-ride`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    { url: `${SITE.url}/service`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE.url}/emi`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE.url}/savings`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE.url}/app`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE.url}/reviews`, changeFrequency: "weekly", priority: 0.6, lastModified: now },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${SITE.url}/faqs`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE.url}/about-us`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${SITE.url}/careers`, changeFrequency: "weekly", priority: 0.4, lastModified: now },
    { url: `${SITE.url}/press`, changeFrequency: "monthly", priority: 0.3, lastModified: now },
    { url: `${SITE.url}/contact-us`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${SITE.url}/partnerships`, changeFrequency: "monthly", priority: 0.4, lastModified: now },
    { url: `${SITE.url}/partnerships/ev-oem`, changeFrequency: "monthly", priority: 0.3, lastModified: now },
    { url: `${SITE.url}/partnerships/charger-oem`, changeFrequency: "monthly", priority: 0.3, lastModified: now },
    { url: `${SITE.url}/partnerships/cpo`, changeFrequency: "monthly", priority: 0.3, lastModified: now },
    { url: `${SITE.url}/cms`, changeFrequency: "monthly", priority: 0.4, lastModified: now },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.1, lastModified: now },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.1, lastModified: now },
    { url: `${SITE.url}/returns`, changeFrequency: "yearly", priority: 0.1, lastModified: now },
    { url: `${SITE.url}/warranty`, changeFrequency: "yearly", priority: 0.1, lastModified: now },
  ];

  const brands = ["xypro", "jett", "4all"] as const;
  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${SITE.url}/ev/${b}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: now,
  }));

  const variantRoutes: MetadataRoute.Sitemap = scooters.map((s) => ({
    url: `${SITE.url}/ev/${s.brand}/${s.variantSlug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: now,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE.url}/stores/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: now,
  }));

  const storeRoutes: MetadataRoute.Sitemap = stores.map((s) => ({
    url: `${SITE.url}/stores/${s.cityId}/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...brandRoutes,
    ...variantRoutes,
    ...cityRoutes,
    ...storeRoutes,
  ];
}
