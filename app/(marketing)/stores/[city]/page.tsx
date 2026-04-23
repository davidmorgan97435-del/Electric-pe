import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StoreCard } from "@/components/locator/store-card";
import { ProductCard } from "@/components/marketing/product-card";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { cities, getCity, allCitySlugs } from "@/content/cities";
import { getStoresByCity } from "@/content/stores";
import { scooters } from "@/content/scooters";
import { getTestimonialsByCity } from "@/content/testimonials";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return allCitySlugs.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  return {
    title: `Electric Scooter Showroom in ${c.name} — ElectricPe`,
    description: `Visit your ElectricPe Mobility Center in ${c.name}, ${c.state}. Test-ride any scooter, no licence required, EMI from ₹1,499/month. ${getStoresByCity(city).length} store${getStoresByCity(city).length === 1 ? "" : "s"}.`,
    alternates: { canonical: `/stores/${city}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const cityStores = getStoresByCity(city);
  const bestsellers = c.bestsellerScooterVariantSlugs
    .map((slug) => scooters.find((s) => `${s.brand}-${s.variantSlug}` === slug))
    .filter((s): s is typeof scooters[number] => Boolean(s));
  const cityTestimonials = getTestimonialsByCity(city);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Stores", href: "/stores" },
          { name: c.name, href: `/stores/${city}` },
        ])}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "Stores", href: "/stores" },
              { label: c.name },
            ]}
          />
        </Container>
      </div>

      <section className="relative py-16 md:py-20 bg-[var(--color-surface-muted)]">
        <Container>
          <p className="text-eyebrow mb-3">{c.state}</p>
          <h1 className="text-display-xl max-w-3xl">
            Electric scooters in {c.name} — visit our Mobility Centers.
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            {c.introCopy}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href={`/book-test-ride?city=${c.slug}`}>
                Book Test Ride in {c.name}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#stores">See all stores in {c.name}</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value={c.customerCount} label="Happy owners" />
            <Stat value={c.scootersSoldCount} label="Scooters sold" />
            <Stat value={`${cityStores.length}`} label="Mobility Centers" />
            <Stat value="24h" label="Service SLA" />
          </div>
        </Container>
      </section>

      <Section id="stores">
        <SectionHeader
          eyebrow="Mobility Centers"
          title={`${cityStores.length} store${cityStores.length === 1 ? "" : "s"} in ${c.name}`}
          align="left"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cityStores.map((s) => (
            <StoreCard key={s.slug} store={s} />
          ))}
        </div>
      </Section>

      {bestsellers.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader
            eyebrow="Bestsellers"
            title={`${c.name} riders love these`}
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {bestsellers.map((s) => (
              <ProductCard key={`${s.brand}-${s.variantSlug}`} scooter={s} />
            ))}
          </div>
        </Section>
      )}

      {cityTestimonials.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Real riders"
            title={`Stories from ${c.name}`}
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cityTestimonials.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-white border border-[var(--color-border)] p-6"
              >
                <p className="text-[var(--color-text)] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text)]">{t.customerName}</span>
                  {" · "}
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.nearbyCitySlugs.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader
            eyebrow="Nearby"
            title="Also serving"
            align="left"
          />
          <div className="flex flex-wrap gap-3">
            {c.nearbyCitySlugs
              .map((slug) => cities.find((x) => x.slug === slug))
              .filter((x): x is typeof cities[number] => Boolean(x))
              .map((n) => (
                <Link
                  key={n.slug}
                  href={`/stores/${n.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                >
                  {n.name}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
          </div>
        </Section>
      )}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-number-stat text-[var(--color-text)]">{value}</p>
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}
