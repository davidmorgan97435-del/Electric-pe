import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/marketing/product-card";
import { ScooterFilters } from "@/components/product/scooter-filters";
import { scooters } from "@/content/scooters";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";
import { JsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import type { BrandSlug, Scooter, UseCase } from "@/content/types";

export const metadata: Metadata = {
  title: "Electric Scooters in India — Xypro, Jett, 4ALL | ElectricPe",
  description:
    "Affordable low-speed electric scooters from Xypro, Jett and 4ALL. No licence required, low running cost, component-level warranty, 30+ service centres across India.",
  alternates: { canonical: "/ev" },
};

type SortKey = "price-asc" | "price-desc" | "range-desc";

function filterScooters(
  list: Scooter[],
  brand: string,
  useCase: string,
  sort: string,
): Scooter[] {
  let out = list.slice();
  const validBrands: BrandSlug[] = ["xypro", "jett", "ep", "4all"];
  if (brand && (validBrands as string[]).includes(brand)) {
    out = out.filter((s) => s.brand === brand);
  }
  const validUse: UseCase[] = ["commute", "delivery", "student", "family"];
  if (useCase && (validUse as string[]).includes(useCase)) {
    out = out.filter((s) => s.useCases.includes(useCase as UseCase));
  }
  switch (sort as SortKey) {
    case "price-asc":
      out.sort((a, b) => a.priceOnRoad - b.priceOnRoad);
      break;
    case "price-desc":
      out.sort((a, b) => b.priceOnRoad - a.priceOnRoad);
      break;
    case "range-desc":
      out.sort((a, b) => b.specs.rangeKm - a.specs.rangeKm);
      break;
    default:
      break;
  }
  return out;
}

export default async function EvListingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const brand = typeof sp.brand === "string" ? sp.brand : "";
  const useCase = typeof sp.use === "string" ? sp.use : "";
  const sort = typeof sp.sort === "string" ? sp.sort : "";

  const filtered = filterScooters(scooters, brand, useCase, sort);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ElectricPe electric scooters",
    itemListElement: scooters.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/ev/${s.brand}/${s.variantSlug}`),
      name: s.name,
    })),
  };

  const whatsappHref = buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "Scooters listing");

  return (
    <>
      <JsonLd data={itemListJsonLd} />

      {/* Page intro */}
      <section className="pt-14 md:pt-20 pb-6">
        <Container>
          <p className="text-eyebrow mb-3">Our scooters</p>
          <h1 className="text-display-lg max-w-3xl">
            Electric scooters for every Indian ride
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--color-text-muted)]">
            Xypro, Jett and 4ALL — affordable, low-speed, no-licence EVs tuned
            to how Indians actually commute. Backed by a real store network and
            component-level warranty in writing.
          </p>

          {/* Licence not required info strip */}
          <div
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-border)] bg-[var(--color-brand-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-pressed)]"
            role="note"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Licence not required — every scooter here is speed-limited to 25 km/h
          </div>
        </Container>
      </section>

      {/* Grid + filters */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Suspense
                fallback={
                  <div
                    className="h-64 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] animate-pulse"
                    aria-hidden
                  />
                }
              >
                <ScooterFilters />
              </Suspense>
            </aside>

            <div>
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Showing{" "}
                  <span className="font-semibold text-[var(--color-text)]">
                    {filtered.length}
                  </span>{" "}
                  of {scooters.length} scooters
                </p>
                <Link
                  href="/ev/compare"
                  className="text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] inline-flex items-center gap-1"
                >
                  Compare scooters
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              {filtered.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                  {filtered.map((s) => (
                    <ProductCard
                      key={`${s.brand}-${s.variantSlug}`}
                      scooter={s}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Not sure which one fits? */}
      <Section className="bg-[var(--color-surface-muted)]">
        <Card className="overflow-hidden">
          <div className="p-8 md:p-12 grid md:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <p className="text-eyebrow mb-3">Need a hand?</p>
              <h2 className="text-h1">Not sure which one fits?</h2>
              <p className="mt-3 text-[var(--color-text-muted)] max-w-xl leading-relaxed">
                Tell us your daily distance and budget — our product team will
                recommend the right model and arrange a free test ride.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="whatsapp"
                size="lg"
                leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                leadingIcon={<Phone className="h-4 w-4" aria-hidden />}
              >
                <a href={`tel:${globals.supportPhone}`}>Call an expert</a>
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}

function EmptyState() {
  return (
    <Card className="p-10 text-center">
      <h2 className="text-h3 mb-2">No scooters match these filters</h2>
      <p className="text-[var(--color-text-muted)] mb-6">
        Try removing a filter or resetting to see all eight models.
      </p>
      <Button asChild variant="outline">
        <Link href="/ev">Reset filters</Link>
      </Button>
    </Card>
  );
}
