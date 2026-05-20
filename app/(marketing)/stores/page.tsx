import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StoreCard } from "@/components/locator/store-card";
import { JsonLd, itemListSchema, autoDealerSchema } from "@/lib/seo/jsonld";
import { cities } from "@/content/cities";
import { stores } from "@/content/stores";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: { absolute: "ElectricPe Mobility Centers | 30+ EV Stores Across India" },
  description:
    "Find your nearest ElectricPe Mobility Center. 30+ branded EV stores with test rides, service, and genuine parts. Walk in and meet your store executive.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  const storeSchemas = stores.map((s) =>
    autoDealerSchema({
      name: s.name,
      url: `/stores/${s.cityId}/${s.slug}`,
      telephone: s.phone,
      image: s.photos[0] ?? "/img/home_hero_section_2.webp",
      address: {
        streetAddress: s.address,
        addressLocality: s.cityId,
        addressRegion: s.state,
        postalCode: s.pincode,
        addressCountry: "IN",
      },
      geo: { latitude: s.lat, longitude: s.lng },
    }),
  );
  const storesList = itemListSchema(
    stores.map((s) => ({
      name: s.name,
      url: `/stores/${s.cityId}/${s.slug}`,
    })),
  );

  return (
    <>
      <JsonLd data={[storesList, ...storeSchemas]} />

      <section className="relative pt-16 md:pt-24 pb-10 md:pb-14 bg-[var(--color-surface-muted)] overflow-hidden">
        <Container>
          <Breadcrumb
            items={[{ label: "Stores", href: "/stores" }]}
            className="mb-6"
          />
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Mobility Centers</p>
            <h1 className="text-display-xl">
              {globals.stats.storesOpen} Mobility Centers across India.
              Growing to 50+.
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Walk in, ride a scooter, ask any question. Each store is staffed with
              a trained executive and an in-house technician, not a franchise agent
              who pushes paperwork.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/book-test-ride">Book Free Test Ride</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${globals.supportPhone}`}>Call {globals.supportPhone}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Find your city"
          title="Pick a city to see stores"
          align="left"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/stores/${c.slug}`}
              className="group rounded-xl border border-[var(--color-border)] bg-white p-4 text-center hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-sm)] transition-all"
            >
              <MapPin className="h-5 w-5 mx-auto text-[var(--color-brand)] mb-1.5" aria-hidden />
              <p className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-brand)]">
                {c.name}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {c.servedStoreSlugs.length} store
                {c.servedStoreSlugs.length === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>

        <SectionHeader
          eyebrow="All stores"
          title="Every ElectricPe Mobility Center in India"
          align="left"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {stores.map((s) => (
            <StoreCard key={s.slug} store={s} />
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg">Partner with us to open a store.</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Seasoned automotive entrepreneurs, fleet operators, and multi-brand retailers:
            ElectricPe's service-first model is built for long-term partners.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6"
            trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <Link href="/partnerships">Explore partnerships</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
