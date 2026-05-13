import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandLanding } from "@/components/product/brand-landing";
import { BRAND_ORDER, getBrandTheme } from "@/content/brands";
import { scootersByBrand } from "@/content/scooters";

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

  const title = `${theme.displayName} Electric Scooter — ${theme.tagline} | ElectricPe`;
  const description = `${theme.positioning} Starting from ${formattedPrice}. ARAI-approved, no licence required, component-level warranty. Book a free test ride.`;

  return {
    title,
    description,
    alternates: { canonical: `/ev/${theme.slug}` },
    openGraph: {
      title,
      description,
      url: `/ev/${theme.slug}`,
      images: [{ url: theme.cutout }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [theme.cutout],
    },
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
  return <BrandLanding brand={theme} />;
}
