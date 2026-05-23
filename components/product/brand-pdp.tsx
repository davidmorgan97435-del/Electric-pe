import { Store, Clock, ShieldCheck, Wrench } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/marketing/product-card";
import { PdpHero } from "./pdp-hero";
import { FeatureHighlights } from "./feature-highlights";
import { VariantSelector } from "./variant-selector";
import { SpecTable } from "./spec-table";
import { EmiWidget } from "./emi-widget";
import { PdpSavingsMini } from "./pdp-savings-mini";
import { StickyPdpBar } from "./sticky-pdp-bar";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { scooters, scootersByBrand } from "@/content/scooters";
import { getFaqsByBrand } from "@/content/faqs";
import { getTestimonialsByBrand, testimonials } from "@/content/testimonials";
import { getCity } from "@/content/cities";
import type { Scooter } from "@/content/types";

const BRAND_NAMES: Record<string, string> = {
  xypro: "Xypro",
  jett: "Jett",
  "4all": "4ALL",
};

const SERVICE_PILLARS = [
  { icon: Store, title: "Real stores", text: "126+ Mobility Centers across India" },
  { icon: Clock, title: "24h service", text: "SLA, not a promise" },
  { icon: ShieldCheck, title: "Component warranty", text: "Motor · Controller · Battery (details on inquiry)" },
  { icon: Wrench, title: "Genuine parts", text: "In stock, always" },
];

export function BrandPdp({ scooter }: { scooter: Scooter }) {
  const brandName = BRAND_NAMES[scooter.brand] ?? scooter.brand;
  const variantsOfBrand = scootersByBrand[scooter.brand] ?? [];
  const faqs = getFaqsByBrand(scooter.brand);
  const brandTestimonials = getTestimonialsByBrand(scooter.brand);
  const visibleTestimonials =
    brandTestimonials.length >= 3 ? brandTestimonials : testimonials.slice(0, 4);

  const related = scooters
    .filter((s) => s.brand !== scooter.brand && s.variantSlug !== "swap")
    .slice(0, 3);

  const crumbs = [
    { label: "Scooters", href: "/ev" },
    { label: brandName, href: `/ev/${scooter.brand}` },
    ...(scooter.variantSlug !== "lithium-ion"
      ? [{ label: scooter.name }]
      : []),
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: scooter.name,
    brand: { "@type": "Brand", name: brandName },
    image: absoluteUrl(scooter.heroGallery[0] ?? "/img/home_hero_section_2.webp"),
    description: scooter.tagline,
    sku: `${scooter.brand}-${scooter.variantSlug}`,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/ev/${scooter.brand}/${scooter.variantSlug}`),
      priceCurrency: "INR",
      price: scooter.priceOnRoad,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "250",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answerMdx },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          productSchema,
          faqSchema,
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Scooters", href: "/ev" },
            { name: brandName, href: `/ev/${scooter.brand}` },
          ]),
        ]}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={crumbs} />
        </Container>
      </div>

      <PdpHero scooter={scooter} />

      {variantsOfBrand.length > 1 && (
        <VariantSelector
          variants={variantsOfBrand}
          activeVariantSlug={scooter.variantSlug}
        />
      )}

      <FeatureHighlights scooter={scooter} />

      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <SectionHeader
            eyebrow="Specifications"
            title="Every number, in plain language"
            align="left"
          />
        </Reveal>
        <Reveal delay={80}>
          <SpecTable scooter={scooter} />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="EMI"
            title={`Own it from ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(scooter.emiFrom)}/month`}
            description="Slide the down-payment, pick a tenure, and we'll show the monthly EMI in plain rupees."
          />
        </Reveal>
        <Reveal delay={80}>
          <EmiWidget scooter={scooter} />
        </Reveal>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <PdpSavingsMini scooter={scooter} />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Every scooter, every store"
            title="Backed by 126+ ElectricPe Mobility Centers"
          />
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICE_PILLARS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <Card className="p-5 h-full transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="font-display font-bold text-[var(--color-text)]">{title}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <SectionHeader
            eyebrow="Real owners"
            title={`${brandName} owners talk to you`}
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleTestimonials.slice(0, 3).map((t, i) => {
            const city = getCity(t.cityId);
            return (
              <Reveal key={t.id} delay={i * 80}>
                <Card className="p-6 flex flex-col gap-3 h-full transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <p className="text-[var(--color-text)] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-auto">
                    <span className="font-semibold text-[var(--color-text)]">{t.customerName}</span>
                    {city ? ` · ${city.name}` : ""}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {faqs.length > 0 && (
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow="FAQs"
              title={`${brandName}: honest answers`}
              align="left"
            />
          </Reveal>
          <Reveal delay={60}>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden">
              <Accordion type="single" collapsible className="px-5 md:px-6">
                {faqs.map((f) => (
                  <AccordionItem key={f.id} value={f.id}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>{f.answerMdx}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </Section>
      )}

      <Section className="bg-[var(--color-surface-muted)]">
        <Reveal>
          <SectionHeader eyebrow="You might also like" title="Other ElectricPe models" />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {related.map((s, i) => (
            <Reveal key={`${s.brand}-${s.variantSlug}`} delay={i * 80}>
              <ProductCard scooter={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <StickyPdpBar scooter={scooter} />
    </>
  );
}
