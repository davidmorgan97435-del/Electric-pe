import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  Check,
  Wallet,
  ShieldCheck,
  Store,
  Clock,
  Zap,
  Gauge,
  Heart,
  Users,
  Package,
  Sparkles,
  MapPin,
  Wrench,
  BookOpen,
  Phone,
  Truck,
  Fuel,
  Leaf,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/marketing/product-card";
import { BrandVariantTabs } from "./brand-variant-tabs";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { formatInr } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { scootersByBrand } from "@/content/scooters";
import { getFaqsByBrand } from "@/content/faqs";
import { getTestimonialsByBrand, testimonials } from "@/content/testimonials";
import { getCity } from "@/content/cities";
import type { BrandTheme, BrandPillarIcon } from "@/content/brands";
import type { Scooter } from "@/content/types";

const ICON_MAP: Record<BrandPillarIcon, LucideIcon> = {
  Wallet,
  ShieldCheck,
  Store,
  Clock,
  Zap,
  Gauge,
  Heart,
  Users,
  Package,
  Sparkles,
  MapPin,
  Wrench,
};

export function BrandLanding({ brand }: { brand: BrandTheme }) {
  const variants = [...(scootersByBrand[brand.slug] ?? [])].sort(
    (a, b) => a.priceOnRoad - b.priceOnRoad,
  );
  const flagship =
    variants.find((v) => v.variantSlug === "lithium-ion") ?? variants[0];
  if (!flagship) return null;

  const startingPrice = Math.min(...variants.map((v) => v.priceOnRoad));
  const maxRange = Math.max(...variants.map((v) => v.specs.rangeKm));

  const faqs = getFaqsByBrand(brand.slug);
  const brandTestimonials = getTestimonialsByBrand(brand.slug);
  const visibleTestimonials =
    brandTestimonials.length >= 3
      ? brandTestimonials.slice(0, 3)
      : testimonials.slice(0, 3);

  const whatsappHref = buildWhatsAppLink(
    `Hi! I'd like to know more about ${brand.displayName} scooters.`,
    `BRAND_LANDING ${brand.slug}`,
  );

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.displayName,
    description: brand.positioning,
    logo: "/img/eplogo-horiz.webp",
    parentOrganization: {
      "@type": "Organization",
      name: "ElectricPe",
    },
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answerMdx },
          })),
        }
      : null;

  return (
    <>
      <JsonLd
        data={[
          brandSchema,
          ...(faqSchema ? [faqSchema] : []),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Scooters", href: "/ev" },
            { name: brand.displayName, href: `/ev/${brand.slug}` },
          ]),
        ]}
      />

      {/* ─── Breadcrumb ─── */}
      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "Scooters", href: "/ev" },
              { label: brand.displayName },
            ]}
          />
        </Container>
      </div>

      {/* ─── Hero ─── */}
      <section
        className={cn(
          "relative overflow-hidden",
          brand.tint,
          brand.onTint,
        )}
        aria-label={`${brand.displayName} overview`}
      >
        {/* Ambient radial glow behind scooter — subtle depth, no motion. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[680px] w-[680px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.22), rgba(255,255,255,0) 70%)",
          }}
        />
        <Container>
          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center py-14 md:py-20 lg:py-24">
            {/* Left — copy */}
            <Reveal>
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] opacity-80">
                ElectricPe · {brand.displayName}
              </p>
              <h1 className="mt-4 md:mt-5 font-display font-black text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em]">
                {brand.tagline}
              </h1>
              <p className="mt-5 text-base md:text-lg leading-relaxed opacity-90 max-w-xl">
                {brand.positioning}
              </p>

              {/* Stat row — numbers, not claims */}
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                <HeroStat label="Starting from" value={formatInr(startingPrice)} />
                <HeroStat label="Max range" value={`${maxRange} km`} />
                <HeroStat label="Top speed" value="25 km/h" />
                <HeroStat
                  label="Models"
                  value={`${variants.length} variant${variants.length === 1 ? "" : "s"}`}
                />
              </dl>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link
                    href={`/book-test-ride?model=${brand.slug}-${flagship.variantSlug}`}
                  >
                    Book a free test ride
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="whatsapp"
                  leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Request callback
                  </a>
                </Button>
              </div>

              {/* Trust chips */}
              <ul className="mt-7 flex flex-wrap gap-2">
                {brand.trustChips.map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                  >
                    <Check className="h-3 w-3 opacity-80" aria-hidden />
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right — cutout */}
            <Reveal delay={120}>
              <figure className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-[560px] mx-auto">
                <Image
                  src={brand.cutout}
                  alt={`${brand.displayName} electric scooter`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 45vw"
                  className="object-contain object-center drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── Variant selection — tabs + dynamic spec panel (feedback #12) ─── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={`${brand.displayName} models`}
            title={
              variants.length === 1
                ? "One model, one promise."
                : `Pick your ${brand.displayName}.`
            }
            description={
              variants.length === 1
                ? "A single, well-specced variant — no bewildering trim-level matrix."
                : "Switch between chemistries to see the exact range, charge time and price for each."
            }
          />
        </Reveal>
        <Reveal delay={80}>
          {variants.length >= 2 ? (
            <BrandVariantTabs variants={variants} />
          ) : (
            <div className="grid md:grid-cols-[1fr_1fr] gap-5 md:gap-6 max-w-4xl mx-auto">
              <ProductCard scooter={variants[0]!} />
              <div className="h-full rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 flex flex-col justify-center text-center">
                <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
                  Looking for a different range or battery?
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mb-5">
                  {brand.displayName} keeps one model on purpose. Our other
                  brands cover long-range lithium, dual-battery swap, and
                  family configurations.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/ev">Explore all ElectricPe models</Link>
                </Button>
              </div>
            </div>
          )}
        </Reveal>
      </Section>

      {/* ─── Why this brand ─── */}
      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <SectionHeader
            eyebrow={`Why ${brand.displayName}`}
            title={brand.storyTitle}
            description={brand.storyBody}
            align="left"
          />
        </Reveal>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {brand.pillars.map((p, i) => {
            const Icon = ICON_MAP[p.iconName];
            return (
              <Reveal as="li" key={p.title} delay={i * 80}>
                <div>
                  <span
                    aria-hidden
                    className="font-display font-black text-5xl md:text-6xl text-[var(--color-brand)] tabular-nums leading-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-5 inline-flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg md:text-xl font-display font-bold text-[var(--color-text)] leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed">
                    {p.proof}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* Best-for chips */}
        <Reveal delay={120}>
          <div className="mt-14 pt-10 border-t border-[var(--color-border)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-subtle)] mb-3">
              Best for
            </p>
            <ul className="flex flex-wrap gap-2">
              {brand.bestFor.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white border border-[var(--color-border)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-text)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ─── Compare (only when 2+ variants) ─── */}
      {variants.length >= 2 && (
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow="Compare"
              title={`Which ${brand.displayName} is right for you?`}
              description="Same chassis, same service network. The difference is chemistry, range, and price."
              align="left"
            />
          </Reveal>
          <Reveal delay={80}>
            <VariantCompareTable variants={variants} />
          </Reveal>
        </Section>
      )}

      {/* ─── What's included ─── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="What's included"
            title="Everything you need to ride home today."
            description="No hidden accessories, no optional-at-extra-cost basics. Every new ElectricPe scooter ships with the same kit."
            align="left"
          />
        </Reveal>
        <ol className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {INCLUDED_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} delay={i * 40}>
                <Card className="p-5 md:p-6 h-full flex flex-col gap-3 transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display font-bold text-base md:text-lg text-[var(--color-text)] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.detail}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      {/* ─── Ownership economics ─── */}
      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <SectionHeader
            eyebrow="Ownership economics"
            title="Three years on, you save ₹1,05,000 vs a petrol scooter."
            description="Real numbers, honest assumptions — see the full working below. Switch calculations in our savings tool to match your own commute."
            align="left"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {OWNERSHIP_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 70}>
                <Card className="p-6 md:p-7 h-full bg-white border-l-4 border-l-[var(--color-primary-500)] transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] font-semibold pt-2">
                      Over 3 years
                    </span>
                  </div>
                  <p className="font-display font-black text-3xl md:text-4xl text-[var(--color-text)] tabular-nums leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-semibold text-[var(--color-text)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {stat.detail}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 md:p-6 rounded-2xl border border-dashed border-[var(--color-border)] bg-white">
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
              <span className="font-semibold text-[var(--color-text)]">Assumptions:</span>{" "}
              30 km/day commute · petrol ₹105/L · Honda Activa at 45 km/L · grid
              electricity ₹6/kWh · 3-year horizon. Your mileage will differ —
              change the inputs in our savings calculator.
            </p>
            <Button asChild variant="outline" trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              <Link href="/savings">Open savings calculator</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ─── Testimonials ─── */}
      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <SectionHeader
            eyebrow="Real owners"
            title={`${brand.displayName} owners talk to you`}
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {visibleTestimonials.map((t, i) => {
            const city = getCity(t.cityId);
            return (
              <Reveal key={t.id} delay={i * 70}>
                <Card className="p-6 flex flex-col gap-4 h-full transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <div
                    aria-hidden
                    className="font-display text-4xl leading-none text-[var(--color-brand)] opacity-40"
                  >
                    &ldquo;
                  </div>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    {t.quote}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-auto pt-2 border-t border-[var(--color-border)]">
                    <span className="font-semibold text-[var(--color-text)]">
                      {t.customerName}
                    </span>
                    {city ? ` · ${city.name}` : ""}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ─── FAQs ─── */}
      {faqs.length > 0 && (
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow="FAQs"
              title={`${brand.displayName} — honest answers`}
              align="left"
            />
          </Reveal>
          <Reveal delay={60}>
            <div className="max-w-4xl rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden">
              <Accordion
                type="single"
                collapsible
                className="px-6 md:px-8 divide-y divide-[var(--color-border)]"
              >
                {faqs.map((f) => (
                  <AccordionItem key={f.id} value={f.id} className="py-1">
                    <AccordionTrigger className="text-left">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--color-text-muted)] leading-relaxed pr-4">
                      {f.answerMdx}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </Section>
      )}

      {/* ─── Final CTA ─── */}
      <section
        className={cn("relative overflow-hidden", brand.tint, brand.onTint)}
      >
        <Container>
          <Reveal>
            <div className="py-16 md:py-20 text-center max-w-3xl mx-auto">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] opacity-80">
                {brand.displayName} · Ride home today
              </p>
              <h2 className="mt-4 font-display font-black text-[clamp(2rem,4vw,3rem)] leading-tight tracking-[-0.02em]">
                Book a free test ride. No licence, no RTO, no pressure.
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed opacity-90">
                ARAI-approved. Warrantied in writing. Serviced at 30+ ElectricPe
                Mobility Centres across India.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link
                    href={`/book-test-ride?model=${brand.slug}-${flagship.variantSlug}`}
                  >
                    Book free test ride
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
                >
                  <Link href="/ev">Compare all ElectricPe brands</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

// ─── Local data ─────────────────────────────────────────────

const INCLUDED_ITEMS: {
  icon: LucideIcon;
  title: string;
  detail: string;
}[] = [
  {
    icon: Zap,
    title: "Battery + AC charger",
    detail: "Detachable battery pack and a regular 5A home charger. No special wall-socket, no installer visit.",
  },
  {
    icon: FileCheck,
    title: "ARAI compliance certificate",
    detail: "Physical certificate of homologation with every scooter — the only paperwork you'll ever need.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty card",
    detail: "Motor, controller and battery covered — coverage period varies by component. Full terms shared at handover.",
  },
  {
    icon: Wrench,
    title: "Tool kit + spare fuse",
    detail: "Basic roadside tool kit, spare fuse and a tyre-pressure gauge — inside the under-seat compartment.",
  },
  {
    icon: BookOpen,
    title: "Owner's manual",
    detail: "Printed in English + Hindi. Also available as a PDF inside the ElectricPe app.",
  },
  {
    icon: Phone,
    title: "24/7 roadside assistance",
    detail: "First 12 months free across all 30+ service cities. Dial one number, a technician rides to you.",
  },
];

const OWNERSHIP_STATS: {
  icon: LucideIcon;
  value: string;
  label: string;
  detail: string;
}[] = [
  {
    icon: Fuel,
    value: "₹86,400",
    label: "Fuel cost saved",
    detail: "Petrol at ₹105/L vs grid electricity at ₹6/kWh — over 30 km/day for 3 years.",
  },
  {
    icon: Wrench,
    value: "₹9,000",
    label: "Service cost saved",
    detail: "Fewer moving parts, no oil changes, no spark plugs, no clutch replacement.",
  },
  {
    icon: Leaf,
    value: "1.8 tonnes",
    label: "CO₂ emissions avoided",
    detail: "Equivalent to planting 30 trees. No tailpipe, nothing burned, nothing emitted.",
  },
];

// ─── Local helpers ──────────────────────────────────────────

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
        {label}
      </dt>
      <dd className="mt-1 font-display font-bold text-xl md:text-2xl tabular-nums">
        {value}
      </dd>
    </div>
  );
}

function VariantCompareTable({ variants }: { variants: Scooter[] }) {
  const rows: { label: string; get: (s: Scooter) => string }[] = [
    { label: "On-road price", get: (s) => formatInr(s.priceOnRoad) },
    { label: "EMI from", get: (s) => `${formatInr(s.emiFrom)}/mo` },
    { label: "Range (real-world)", get: (s) => `${s.specs.rangeKm} km` },
    { label: "Top speed", get: (s) => `${s.specs.topSpeedKmh} km/h` },
    {
      label: "Charge time",
      get: (s) => (s.specs.chargeTimeHours > 0 ? `${s.specs.chargeTimeHours}h` : "Swap"),
    },
    { label: "Battery", get: (s) => s.specs.batteryType },
    { label: "Wheel size", get: (s) => s.specs.wheelSize },
    { label: "Warranty", get: (s) => s.specs.warranty },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
            <th
              scope="col"
              className="text-left font-display font-semibold text-[var(--color-text-subtle)] px-5 py-4 uppercase text-[11px] tracking-[0.18em]"
            >
              Spec
            </th>
            {variants.map((v) => (
              <th
                key={v.variantSlug}
                scope="col"
                className="text-left font-display font-bold text-[var(--color-text)] px-5 py-4"
              >
                {v.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={cn(
                "border-b border-[var(--color-border)] last:border-b-0",
                i % 2 === 1 && "bg-[var(--color-surface-muted)]/40",
              )}
            >
              <th
                scope="row"
                className="text-left font-medium text-[var(--color-text-muted)] px-5 py-3.5"
              >
                {row.label}
              </th>
              {variants.map((v) => (
                <td
                  key={v.variantSlug}
                  className="px-5 py-3.5 tabular-nums text-[var(--color-text)] font-medium"
                >
                  {row.get(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
