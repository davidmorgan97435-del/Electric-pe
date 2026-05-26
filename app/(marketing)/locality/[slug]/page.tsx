import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StoreCard } from "@/components/locator/store-card";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { localities, getLocality, localitySlugs } from "@/content/localities";
import { getCity } from "@/content/cities";
import { getStoresByCity } from "@/content/stores";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return localitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locality = getLocality(slug);
  if (!locality) return {};
  const city = getCity(locality.parentCitySlug);
  const cityName = city?.name ?? locality.parentCitySlug;
  const title = `Electric Scooter Showroom in ${locality.name}, ${cityName} | ElectricPe`;
  const description = `Buy an electric scooter near ${locality.name}, ${cityName}. No licence, 25 km/h, low running cost. Free test rides from your nearest ElectricPe Mobility Center.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/locality/${slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/locality/${slug}`),
      type: "website",
    },
  };
}

export default async function LocalityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const locality = getLocality(slug);
  if (!locality) notFound();

  const city = getCity(locality.parentCitySlug);
  const cityName = city?.name ?? locality.parentCitySlug;
  const cityStores = city ? getStoresByCity(city.slug) : [];
  const isActive = locality.active && cityStores.length > 0;

  const placeSchema = city
    ? {
        "@context": "https://schema.org",
        "@type": "Place",
        name: `${locality.name}, ${cityName}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: locality.name,
          addressRegion: city.state,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.lat,
          longitude: city.lng,
        },
        containedInPlace: {
          "@type": "City",
          name: cityName,
        },
      }
    : null;

  const otherLocalitiesInCity = localities.filter(
    (l) => l.parentCitySlug === locality.parentCitySlug && l.slug !== locality.slug,
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Stores", href: "/stores" },
            ...(city
              ? [{ name: cityName, href: `/stores/${city.slug}` }]
              : []),
            { name: locality.name, href: `/locality/${slug}` },
          ]),
          ...(placeSchema ? [placeSchema] : []),
        ]}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "Stores", href: "/stores" },
              ...(city
                ? [{ label: cityName, href: `/stores/${city.slug}` }]
                : []),
              { label: locality.name },
            ]}
          />
        </Container>
      </div>

      <section className="relative py-16 md:py-20 bg-[var(--color-surface-muted)]">
        <Container>
          <p className="text-eyebrow mb-3 inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> {cityName}
            {city ? `, ${city.state}` : ""}
          </p>
          <h1 className="text-display-xl max-w-3xl">
            Electric scooters in {locality.name}, {cityName}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            {locality.introCopy}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href={`/book-test-ride?locality=${slug}`}>
                Book Test Ride
              </Link>
            </Button>
            {city ? (
              <Button asChild size="lg" variant="outline">
                <Link href={`/stores/${city.slug}`}>
                  Find stores in {cityName}
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline">
                <Link href="/stores">Find your nearest store</Link>
              </Button>
            )}
          </div>
        </Container>
      </section>

      {isActive ? (
        <Section id="stores">
          <SectionHeader
            eyebrow="Nearest Mobility Centers"
            title={`${cityStores.length} ElectricPe store${cityStores.length === 1 ? "" : "s"} serving ${locality.name}`}
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {cityStores.map((s) => (
              <StoreCard key={s.slug} store={s} />
            ))}
          </div>
        </Section>
      ) : (
        <Section id="coming-soon">
          <SectionHeader
            eyebrow="Coming soon"
            title={`ElectricPe is expanding to ${locality.name}`}
            description={`We do not have a Mobility Center in ${cityName} yet. Until then, explore our nearest served cities or order through the ElectricPe app for delivery-ready stock.`}
            align="left"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href="/stores">See all served cities</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ev">Browse the scooter range</Link>
            </Button>
          </div>
        </Section>
      )}

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Why electric"
          title={`Electric vs petrol in ${locality.name}`}
          description="Short trips, predictable distances and home charging are exactly the conditions our 25 km/h licence-free scooters were built for. Compare running cost over five years before you commit."
          align="left"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href="/savings">Run the savings calculator</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/book-test-ride?locality=${slug}`}>
              Book a free test ride
            </Link>
          </Button>
        </div>
      </Section>

      {otherLocalitiesInCity.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Nearby localities"
            title={`Also serving in ${cityName}`}
            align="left"
          />
          <div className="flex flex-wrap gap-3">
            {otherLocalitiesInCity.map((l) => (
              <Link
                key={l.slug}
                href={`/locality/${l.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
              >
                {l.name}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
