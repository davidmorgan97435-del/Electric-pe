import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
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
import { faqs, getFaqsByCategory } from "@/content/faqs";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Buying, Financing, Service",
  description:
    "Everything you need to know about buying an ElectricPe scooter — licence, battery, financing, service, warranty, and more. Searchable FAQ library.",
  alternates: { canonical: "/faqs" },
};

const CATEGORIES = [
  { id: "buying", label: "Buying" },
  { id: "financing", label: "Financing" },
  { id: "service", label: "Service & warranty" },
  { id: "battery", label: "Battery" },
  { id: "charging", label: "Charging" },
  { id: "legal", label: "Licence & legal" },
  { id: "app", label: "App" },
  { id: "store", label: "Store visit" },
] as const;

export default function FaqsPage() {
  const schema = {
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
      <JsonLd data={schema} />

      <section className="pt-16 md:pt-24 pb-10 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">FAQs</p>
            <h1 className="text-display-xl">Everything, answered honestly.</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Jump to a category below, or message us on WhatsApp if you can't find
              what you need.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-24">
            <ul className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 flex-wrap lg:flex-nowrap">
              {CATEGORIES.map((c) => (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#${c.id}`}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            {CATEGORIES.map((cat) => {
              const items = getFaqsByCategory(cat.id);
              if (items.length === 0) return null;
              return (
                <section key={cat.id} id={cat.id} aria-label={cat.label}>
                  <h2 className="text-h2 mb-4">{cat.label}</h2>
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden">
                    <Accordion type="single" collapsible className="px-5 md:px-6">
                      {items.map((f) => (
                        <AccordionItem key={f.id} value={f.id}>
                          <AccordionTrigger>{f.question}</AccordionTrigger>
                          <AccordionContent>{f.answerMdx}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <Card className="p-8 md:p-10 max-w-3xl mx-auto text-center">
          <h2 className="text-h2 mb-2">Still have a question?</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Our team answers on WhatsApp in under 10 minutes during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              variant="whatsapp"
              leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
            >
              <a
                href={buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "/faqs")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              leadingIcon={<Phone className="h-4 w-4" aria-hidden />}
            >
              <a href={`tel:${globals.supportPhone}`}>{globals.supportPhone}</a>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact-us">Send a message</Link>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
