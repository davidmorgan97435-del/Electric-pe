import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandPdp } from "@/components/product/brand-pdp";
import { getScooter, scooters } from "@/content/scooters";

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
  return {
    title: scooter.seo.title,
    description: scooter.seo.description,
    alternates: { canonical: `/ev/${brand}/${variant}` },
    openGraph: {
      title: scooter.seo.title,
      description: scooter.seo.description,
      images: [{ url: scooter.heroGallery[0] ?? "/og/default.jpg" }],
    },
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
  return <BrandPdp scooter={scooter} />;
}
