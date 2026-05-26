import { SITE, absoluteUrl } from "@/lib/utils/site";
import { globals } from "@/content/globals";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Inject a <script type="application/ld+json"> blob.
 * Use this component in any server component via <JsonLd data={...} />.
 *
 * We stringify with a minor escape for `</` inside strings - this is
 * the documented safe pattern recommended by Google's JSON-LD guide
 * because browsers end <script> tags on any </ sequence.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: absoluteUrl("/img/eplogo-horiz.webp"),
  sameAs: [
    globals.social.instagram,
    globals.social.youtube,
    globals.social.facebook,
    globals.social.linkedin,
    globals.social.twitter,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Hanto Orion, 14th Main Street, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: globals.supportPhone,
      email: globals.supportEmail,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
};

/**
 * Homepage-level LocalBusiness schema. Distinct from per-store AutoDealer
 * schemas: this represents the brand as a multi-location retail business,
 * which Google uses for Knowledge Panel and local pack eligibility on the
 * brand-name SERP. NAP matches the HQ address.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${SITE.url}#localbusiness`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: absoluteUrl("/img/eplogo-horiz.webp"),
  image: absoluteUrl("/img/eplogo-horiz.webp"),
  telephone: globals.supportPhone,
  email: globals.supportEmail,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Hanto Orion, 14th Main Street, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9116,
    longitude: 77.6446,
  },
  areaServed: "IN",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  sameAs: [
    globals.social.instagram,
    globals.social.youtube,
    globals.social.facebook,
    globals.social.linkedin,
    globals.social.twitter,
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbSchema(
  items: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function productSchema(args: {
  name: string;
  description: string;
  image: string | string[];
  sku?: string;
  brand?: string;
  url: string;
  price: number;
  priceCurrency?: "INR";
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  aggregateRating?: { ratingValue: number; reviewCount: number };
}): Record<string, unknown> {
  const images = (Array.isArray(args.image) ? args.image : [args.image]).map((src) =>
    absoluteUrl(src),
  );
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    image: images,
    url: absoluteUrl(args.url),
    offers: {
      "@type": "Offer",
      price: args.price,
      priceCurrency: args.priceCurrency ?? "INR",
      availability: `https://schema.org/${args.availability ?? "InStock"}`,
      url: absoluteUrl(args.url),
    },
  };
  if (args.sku) schema.sku = args.sku;
  if (args.brand) schema.brand = { "@type": "Brand", name: args.brand };
  if (args.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: args.aggregateRating.ratingValue,
      reviewCount: args.aggregateRating.reviewCount,
    };
  }
  return schema;
}

export function faqPageSchema(
  items: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function autoDealerSchema(store: {
  name: string;
  url: string;
  telephone: string;
  image?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: "IN";
  };
  geo?: { latitude: number; longitude: number };
  openingHoursSpecification?: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  areaServed?: string;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: store.name,
    url: absoluteUrl(store.url),
    "@id": absoluteUrl(store.url),
    telephone: store.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address.streetAddress,
      addressLocality: store.address.addressLocality,
      addressRegion: store.address.addressRegion,
      postalCode: store.address.postalCode,
      addressCountry: store.address.addressCountry,
    },
  };
  if (store.image) schema.image = absoluteUrl(store.image);
  if (store.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: store.geo.latitude,
      longitude: store.geo.longitude,
    };
  }
  if (store.openingHoursSpecification && store.openingHoursSpecification.length > 0) {
    schema.openingHoursSpecification = store.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    }));
  }
  if (store.areaServed) schema.areaServed = store.areaServed;
  return schema;
}

export function articleSchema(article: {
  headline: string;
  description?: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    image: absoluteUrl(article.image),
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: { "@type": "Person", name: article.authorName },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/img/eplogo-horiz.webp"),
      },
    },
    mainEntityOfPage: absoluteUrl(article.url),
    url: absoluteUrl(article.url),
  };
}

export function itemListSchema(
  items: { url: string; name: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}
