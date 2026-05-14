import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandPdp } from "@/components/product/brand-pdp";
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  faqPageSchema,
} from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { getBrandTheme } from "@/content/brands";
import { getScooter, scooters } from "@/content/scooters";
import { getFaqById } from "@/content/faqs";

type Params = { brand: string; variant: string };

export function generateStaticParams(): Params[] {
  return scooters.map((s) => ({ brand: s.brand, variant: s.variantSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { brand, variant } = await params;
  const scooter = getScooter(brand, variant);
  if (!scooter) return {};
  const ogImage = absoluteUrl(scooter.heroGallery[0] ?? "/og/default.jpg");
  return {
    title: { absolute: scooter.seo.title },
    description: scooter.seo.description,
    alternates: { canonical: `/ev/${brand}/${variant}` },
    openGraph: {
      title: scooter.seo.title,
      description: scooter.seo.description,
      url: absoluteUrl(`/ev/${brand}/${variant}`),
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: scooter.seo.title,
      description: scooter.seo.description,
      images: [ogImage],
    },
    other: { "og:type": "product" },
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brand, variant } = await params;
  const scooter = getScooter(brand, variant);
  if (!scooter) notFound();

  const theme = getBrandTheme(brand);
  const schemas: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Electric Scooters", href: "/ev" },
      { name: theme?.displayName ?? brand, href: `/ev/${brand}` },
      { name: scooter.name, href: `/ev/${brand}/${variant}` },
    ]),
    productSchema({
      name: scooter.name,
      description: scooter.seo.description,
      image: scooter.heroGallery,
      sku: `${scooter.brand}-${scooter.variantSlug}`,
      brand: theme?.displayName ?? brand,
      url: `/ev/${brand}/${variant}`,
      price: scooter.priceOnRoad,
      availability: "InStock",
    }),
  ];

  const scooterFaqs = scooter.faqIds
    .map((id) => getFaqById(id))
    .filter((f): f is NonNullable<ReturnType<typeof getFaqById>> => Boolean(f));
  if (scooterFaqs.length > 0) {
    schemas.push(
      faqPageSchema(
        scooterFaqs.map((f) => ({ question: f.question, answer: f.answerMdx })),
      ),
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <BrandPdp scooter={scooter} />
    </>
  );
}
