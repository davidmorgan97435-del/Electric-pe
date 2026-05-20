import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ShieldCheck, Wrench, Store, Phone, MessageCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/lib/seo/jsonld";
import { globals } from "@/content/globals";
import { getFaqsByCategory } from "@/content/faqs";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "Service Promise | 24-Hour SLA, Component-Level Warranty, Genuine Parts",
  description:
    "Service within 24 hours at any ElectricPe Mobility Center. In-house technicians, genuine parts always in stock. Warranty coverage varies by component, full terms shared on inquiry.",
  alternates: { canonical: "/service" },
};

const PILLARS = [
  {
    icon: Clock,
    title: "24 hours, not 24 days",
    stat: `${globals.slaThisMonthPct}%`,
    statLabel: "SLA hit this month",
    text: "Bring your scooter to any Mobility Center. We commit to closing every service request within 24 hours and publish our actual hit-rate monthly.",
  },
  {
    icon: ShieldCheck,
    title: "Component-level warranty",
    stat: "Varies",
    statLabel: "By component",
    text: "Motor and controller are covered for one year; the lithium-ion battery for three years or 10,000 km; the charger for one year. Coverage varies, exact terms shared on inquiry.",
  },
  {
    icon: Wrench,
    title: "Genuine parts, in stock",
    stat: "30+",
    statLabel: "Parts depots",
    text: "We stock our own parts across every Mobility Center. No three-week waits for a component to arrive from a warehouse in another city.",
  },
  {
    icon: Store,
    title: "In-house technicians",
    stat: "6+",
    statLabel: "Trained per store",
    text: "Every technician is trained by us, not outsourced. They know your scooter by model, by year, and by quirks.",
  },
];

const HOW_IT_WORKS = [
  { n: 1, title: "Raise a request", text: "WhatsApp us, walk in, or call your store directly." },
  { n: 2, title: "Technician assigned", text: "We route it to the technician trained on your model." },
  { n: 3, title: "Diagnosis + quote", text: "We explain the issue honestly before touching anything." },
  { n: 4, title: "Fix within 24h", text: "Same-day or next-day completion. Updates via WhatsApp." },
];

const WARRANTY_COVERED = [
  "Motor: 1 year",
  "Controller: 1 year",
  "Lithium-Ion battery: 3 years or 10,000 km (whichever is earlier)",
  "Lead-acid battery: 12 months, pro-rated replacement after 6 months",
  "Charger: 1 year",
];

const WARRANTY_NOT_COVERED = [
  "Wear-and-tear (tyres, brake pads, clutch cables)",
  "Damage from accidents or misuse",
  "Water damage from submersion",
  "Unauthorised modifications",
  "Cosmetic wear on paint or upholstery",
];

export default function ServicePage() {
  const faqs = getFaqsByCategory("service");
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
      <JsonLd data={faqSchema} />

      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Our promise</p>
            <h1 className="text-display-xl">
              Service that shows up. Within 24 hours.
            </h1>
            <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Most EV brands sell you a scooter and wish you luck. We stay with you.
              Real stores, in-house technicians, and a service SLA we publish every month.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}>
                <a
                  href={buildWhatsAppLink(WHATSAPP_DEFAULTS.service, "/service")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Raise a service request
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/stores">Find nearest service center</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="The four pillars"
          title="What our service promise actually means"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PILLARS.map(({ icon: Icon, title, stat, statLabel, text }) => (
            <Card key={title} className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="text-right">
                  <p className="text-number-stat text-[var(--color-brand)] leading-none">
                    {stat}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                    {statLabel}
                  </p>
                </div>
              </div>
              <h3 className="text-h3 mb-2">{title}</h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="How it works"
          title="From request to resolved in four steps"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {HOW_IT_WORKS.map((step) => (
            <Card key={step.n} className="p-6">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[var(--color-brand)] text-white font-display font-bold mb-3">
                {step.n}
              </div>
              <h3 className="font-display font-bold text-[var(--color-text)] mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{step.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Warranty"
          title="Component-level coverage, in plain language"
          description="Warranty coverage varies by component. Below is the standard cover; exact terms for your scooter are shared at handover or on inquiry at any Mobility Center."
          align="left"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-[var(--color-brand-pressed)] mb-4">
              ✓ Covered
            </h3>
            <ul className="space-y-2.5">
              {WARRANTY_COVERED.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-[var(--color-text)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 md:p-8 bg-[var(--color-surface-muted)]">
            <h3 className="font-display text-lg font-bold text-[var(--color-text-muted)] mb-4">
              Not covered
            </h3>
            <ul className="space-y-2.5">
              {WARRANTY_NOT_COVERED.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-[var(--color-text-muted)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-text-subtle)] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/warranty">Read full warranty terms</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="This month"
          title="Our public SLA dashboard"
        />
        <Card className="p-8 md:p-12 max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 text-center">
            Requests closed within 24 hours
          </p>
          <p className="text-number-display text-[var(--color-brand)] text-center leading-none">
            {globals.slaThisMonthPct}%
          </p>
          <div className="mt-6 h-2 rounded-full bg-[var(--color-surface-sunken)] overflow-hidden">
            <div
              className="h-full bg-[var(--color-brand)]"
              style={{ width: `${globals.slaThisMonthPct}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-muted)] text-center">
            Measured across all ElectricPe Mobility Centers this month. Updated weekly.
          </p>
        </Card>
      </Section>

      {faqs.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader eyebrow="FAQs" title="Service questions, answered" />
          <div className="rounded-2xl border border-[var(--color-border)] bg-white max-w-3xl mx-auto overflow-hidden">
            <Accordion type="single" collapsible className="px-5 md:px-6">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answerMdx}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      )}

      <section id="request" className="bg-gradient-brand text-white py-16 md:py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display-lg text-white">Need service right now?</h2>
            <p className="mt-4 text-white/90">
              Our team responds on WhatsApp in under 10 minutes during business hours.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[var(--color-brand)] hover:bg-white/90"
                leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
              >
                <a
                  href={buildWhatsAppLink(WHATSAPP_DEFAULTS.service, "/service")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white/60 text-white hover:bg-white/10"
                leadingIcon={<Phone className="h-4 w-4" aria-hidden />}
              >
                <a href={`tel:${globals.supportPhone}`}>{globals.supportPhone}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
