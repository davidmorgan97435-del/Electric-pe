import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandLanding } from "@/components/product/brand-landing";
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  faqPageSchema,
} from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { BRAND_ORDER, getBrandTheme } from "@/content/brands";
import { scootersByBrand } from "@/content/scooters";
import { getFaqById, getFaqsByBrand } from "@/content/faqs";

type Params = { brand: string };

export function generateStaticParams(): Params[] {
  return BRAND_ORDER.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { brand } = await params;
  const theme = getBrandTheme(brand);
  if (!theme) return {};

  const variants = scootersByBrand[theme.slug] ?? [];
  const minPrice = variants.reduce(
    (min, v) => Math.min(min, v.priceOnRoad),
    Number.POSITIVE_INFINITY,
  );
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(minPrice);

  const title = `${theme.displayName} Electric Scooter — From ${formattedPrice} | ElectricPe`;
  const description = `${theme.positioning} Starting from ${formattedPrice}. ARAI-approved, no licence required, component-level warranty. Book a free test ride.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/ev/${theme.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/ev/${theme.slug}`),
      images: [{ url: absoluteUrl(theme.cutout) }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(theme.cutout)],
    },
    other: { "og:type": "product" },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brand } = await params;
  const theme = getBrandTheme(brand);
  if (!theme) notFound();

  const variants = scootersByBrand[theme.slug] ?? [];
  const cheapest = variants.reduce<typeof variants[number] | null>(
    (best, v) => (best === null || v.priceOnRoad < best.priceOnRoad ? v : best),
    null,
  );

  const schemas: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Electric Scooters", href: "/ev" },
      { name: theme.displayName, href: `/ev/${theme.slug}` },
    ]),
  ];

  if (cheapest) {
    schemas.push(
      productSchema({
        name: `${theme.displayName} Electric Scooter`,
        description: cheapest.seo.description,
        image: cheapest.heroGallery.length > 0 ? cheapest.heroGallery : [theme.cutout],
        sku: `${cheapest.brand}-${cheapest.variantSlug}`,
        brand: theme.displayName,
        url: `/ev/${theme.slug}`,
        price: cheapest.priceOnRoad,
        availability: "InStock",
      }),
    );
  }

  const brandFaqs = [
    ...getFaqsByBrand(theme.slug),
    ...variants.flatMap((v) =>
      v.faqIds.map((id) => getFaqById(id)).filter((f): f is NonNullable<typeof f> => Boolean(f)),
    ),
  ];
  const uniqueBrandFaqs = Array.from(new Map(brandFaqs.map((f) => [f.id, f])).values());
  if (uniqueBrandFaqs.length > 0) {
    schemas.push(
      faqPageSchema(
        uniqueBrandFaqs.map((f) => ({ question: f.question, answer: f.answerMdx })),
      ),
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <BrandLanding brand={theme} />
    </>
  );
}
