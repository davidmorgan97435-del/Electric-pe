import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, Navigation2, Clock, User, Store as StoreIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd, breadcrumbSchema, autoDealerSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { stores, getStore } from "@/content/stores";
import { getCity } from "@/content/cities";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

type Params = { city: string; store: string };

export function generateStaticParams(): Params[] {
  return stores.map((s) => ({ city: s.cityId, store: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city, store } = await params;
  const s = getStore(store);
  if (!s || s.cityId !== city) return {};
  const c = getCity(city);
  const title = `${s.name} | Address, Hours, Test Ride`;
  const description = `Visit ${s.name} at ${s.address}, ${c?.name}. Book a test ride, service your scooter, and meet your store executive.`;
  return {
    title,
    description,
    alternates: { canonical: `/stores/${city}/${store}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/stores/${city}/${store}`),
      images: [{ url: absoluteUrl(s.photos[0] ?? "/img/home_hero_section_2.webp") }],
      type: "website",
    },
  };
}

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const DAY_LABEL: Record<(typeof DAYS)[number], string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city, store } = await params;
  const s = getStore(store);
  if (!s || s.cityId !== city) notFound();
  const c = getCity(city);
  if (!c) notFound();

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
  const wa = buildWhatsAppLink(
    `Hi! I'd like to visit the ${s.name}.`,
    `store ${s.slug}`,
  );

  const openingHours = DAYS.flatMap((d) => {
    const h = s.hours[d];
    return h === "closed"
      ? []
      : [{ dayOfWeek: [DAY_LABEL[d]], opens: h.open, closes: h.close }];
  });
  const schema = autoDealerSchema({
    name: s.name,
    url: `/stores/${city}/${s.slug}`,
    telephone: s.phone,
    image: s.photos[0] ?? "/img/home_hero_section_2.webp",
    address: {
      streetAddress: s.address,
      addressLocality: c.name,
      addressRegion: s.state,
      postalCode: s.pincode,
      addressCountry: "IN",
    },
    geo: { latitude: s.lat, longitude: s.lng },
    openingHoursSpecification: openingHours,
    areaServed: c.name,
  });

  return (
    <>
      <JsonLd
        data={[
          schema,
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Stores", href: "/stores" },
            { name: c.name, href: `/stores/${city}` },
            { name: s.name, href: `/stores/${city}/${s.slug}` },
          ]),
        ]}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "Stores", href: "/stores" },
              { label: c.name, href: `/stores/${city}` },
              { label: s.name },
            ]}
          />
        </Container>
      </div>

      <section className="py-12 md:py-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-white shadow-[var(--shadow-lg)]">
              <Image
                src={s.photos[0] ?? "/img/home_hero_section_2.webp"}
                alt={`${s.name} exterior`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div>
              <Badge variant="brand" className="mb-3">
                {c.name}
              </Badge>
              <h1 className="text-display-lg">{s.name}</h1>
              <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed">
                {s.address}, {s.pincode}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {s.services.map((svc) => (
                  <Badge key={svc} variant="success">
                    {svc === "testRides" ? "Test Rides" : svc.charAt(0).toUpperCase() + svc.slice(1)}
                  </Badge>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2">
                <Button asChild size="lg">
                  <Link href={`/book-test-ride?store=${s.slug}`}>
                    Book Test Ride
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  leadingIcon={<Navigation2 className="h-4 w-4" aria-hidden />}
                >
                  <a href={directions} target="_blank" rel="noopener noreferrer">
                    Directions
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  leadingIcon={<Phone className="h-4 w-4" aria-hidden />}
                >
                  <a href={`tel:${s.phone}`}>{s.phone}</a>
                </Button>
                <Button
                  asChild
                  variant="whatsapp"
                  size="lg"
                  leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
                >
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
          <div>
            <SectionHeader
              eyebrow="Opening hours"
              title="When to visit"
              align="left"
            />
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <ul className="divide-y divide-[var(--color-border)]">
                {DAYS.map((d) => {
                  const h = s.hours[d];
                  return (
                    <li
                      key={d}
                      className="flex items-center justify-between py-2.5"
                    >
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {DAY_LABEL[d]}
                      </span>
                      <span className="text-sm font-medium text-[var(--color-text)]">
                        {h === "closed" ? "Closed" : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Brands on offer"
              title="Scooters at this store"
              align="left"
            />
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <div className="grid grid-cols-2 gap-3">
                {s.brandsAvailable.map((b) => (
                  <Link
                    key={b}
                    href={`/ev/${b}`}
                    className="group rounded-xl bg-[var(--color-surface-muted)] p-4 hover:bg-[var(--color-brand-soft)] transition-colors"
                  >
                    <StoreIcon className="h-4 w-4 text-[var(--color-brand)] mb-1.5" aria-hidden />
                    <p className="font-display font-bold text-[var(--color-text)] capitalize group-hover:text-[var(--color-brand-pressed)]">
                      {b}
                    </p>
                  </Link>
                ))}
              </div>
              {s.managerName && (
                <div className="mt-5 pt-5 border-t border-[var(--color-border)] flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] inline-flex items-center justify-center">
                    <User className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Store manager
                    </p>
                    <p className="font-semibold text-[var(--color-text)]">
                      {s.managerName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
