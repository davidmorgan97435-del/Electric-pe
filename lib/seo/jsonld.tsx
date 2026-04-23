import { SITE, absoluteUrl } from "@/lib/utils/site";
import { globals } from "@/content/globals";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Inject a <script type="application/ld+json"> blob.
 * Use this component in any server component via <JsonLd data={...} />.
 *
 * We stringify with a minor escape for `</` inside strings — this is
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
