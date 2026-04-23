import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle, Phone, Plug, Zap } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { chargers, getCharger } from "@/content/chargers";
import { formatInr } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { globals } from "@/content/globals";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return chargers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharger(slug);
  if (!c) return {};
  return {
    title: c.seo.title,
    description: c.seo.description,
    alternates: { canonical: `/charger/${slug}` },
  };
}

export default async function ChargerDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getCharger(slug);
  if (!c) notFound();

  const wa = buildWhatsAppLink(
    `Hi! I'd like a callback about the ${c.name}.`,
    `charger ${slug}`,
  );

  return (
    <>
      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "Chargers", href: "/charger" },
              { label: c.name },
            ]}
          />
        </Container>
      </div>

      <section className="py-12 md:py-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-[var(--shadow-lg)]">
              <Image
                src={c.image}
                alt={`${c.name} EV charger`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10"
              />
            </div>
            <div>
              <Badge variant="brand" className="capitalize mb-3">
                {c.brand}
              </Badge>
              <h1 className="text-display-lg">{c.name}</h1>
              <div className="mt-6 flex items-end gap-4 flex-wrap">
                {c.priceInr ? (
                  <p className="text-number-stat text-[var(--color-text)]">
                    {formatInr(c.priceInr)}
                  </p>
                ) : (
                  <p className="text-number-stat text-[var(--color-text)]">
                    Request quote
                  </p>
                )}
              </div>
              {c.installationIncluded && (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Installation included with a certified electrician
                </p>
              )}
              <ul className="mt-6 grid grid-cols-3 gap-3">
                <Pill
                  icon={<Zap className="h-4 w-4" aria-hidden />}
                  label="Power"
                  value={`${c.powerKw} kW`}
                />
                <Pill
                  icon={<Plug className="h-4 w-4" aria-hidden />}
                  label="Type"
                  value={c.currentType}
                />
                <Pill
                  icon={<span className="text-xs font-bold">OCPP</span>}
                  label="Protocol"
                  value={c.ocppCompatible ? "Yes" : "No"}
                />
              </ul>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}>
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    Request callback
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" leadingIcon={<Phone className="h-4 w-4" aria-hidden />}>
                  <a href={`tel:${globals.supportPhone}`}>
                    {globals.supportPhone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Specifications"
          title="What's inside the box"
          align="left"
        />
        <div className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden">
          <dl className="divide-y divide-[var(--color-border)]">
            {Object.entries(c.specs).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-4 p-4 md:p-5"
              >
                <dt className="text-sm text-[var(--color-text-muted)]">{k}</dt>
                <dd className="text-sm font-semibold text-[var(--color-text)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {c.recommendedForBrands.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader
            eyebrow="Compatibility"
            title="Recommended for these scooters"
            align="left"
          />
          <div className="flex flex-wrap gap-3">
            {c.recommendedForBrands.map((b) => (
              <Link
                key={b}
                href={`/ev/${b}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors capitalize"
              >
                {b}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function Pill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-3 text-center">
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-white text-[var(--color-brand)] mb-1">
        {icon}
      </span>
      <p className="font-display font-bold text-[var(--color-text)]">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-subtle)]">
        {label}
      </p>
    </li>
  );
}
