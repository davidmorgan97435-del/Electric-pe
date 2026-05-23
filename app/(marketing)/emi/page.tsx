import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, ArrowRight, Percent, Clock } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EmiFullCalculator } from "@/components/marketing/emi-full-calculator";
import { financePartners } from "@/content/finance-partners";
import { getFaqsByCategory } from "@/content/faqs";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "EMI Calculator + Finance Partners",
  description:
    "Own an ElectricPe from ₹1,999/month. Calculate your EMI, pick a finance partner, get approved in 15 minutes with just Aadhaar + PAN.",
  alternates: { canonical: "/emi" },
};

const ELIGIBILITY = [
  {
    title: "Salaried",
    income: "Monthly income ₹15,000+",
    notes: [
      "Aadhaar + PAN",
      "3 months of bank statements or salary slips",
      "12+ months in current job (preferred)",
    ],
  },
  {
    title: "Self-employed",
    income: "Annual turnover ₹3L+",
    notes: [
      "Aadhaar + PAN",
      "1 year of income proof (ITR or business bank statement)",
      "GST or Udyam registration (if applicable)",
    ],
  },
  {
    title: "Student / first-time",
    income: "Co-applicant (parent/guardian)",
    notes: [
      "Your Aadhaar + PAN",
      "Guardian's income proof",
      "College ID or first-job offer letter",
    ],
  },
];

const STEPS = [
  { n: 1, title: "Select", text: "Your scooter and variant" },
  { n: 2, title: "Apply", text: "Aadhaar + PAN at the store or online" },
  { n: 3, title: "Verify", text: "KYC check with your partner bank" },
  { n: 4, title: "Approve", text: "Typically in under 15 minutes" },
  { n: 5, title: "Ride", text: "Take your scooter home the same day" },
];

const OFFERS = [
  {
    partner: "HDFC Bank",
    offer: "9.9% APR for customers with existing HDFC salary accounts",
    until: "Valid till 30 April 2026",
  },
  {
    partner: "Bajaj Finserv",
    offer: "Zero processing fee on all EV loans",
    until: "Ongoing",
  },
  {
    partner: "IDFC First Bank",
    offer: "₹2,500 cashback on your first EMI",
    until: "First-time borrowers only",
  },
];

export default function EmiPage() {
  const faqs = getFaqsByCategory("financing");

  return (
    <>
      <section className="pt-16 md:pt-24 pb-10 md:pb-14 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[{ label: "EMI Calculator", href: "/emi" }]}
            className="mb-6"
          />
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">EMI + Finance</p>
            <h1 className="text-display-xl">
              Own an ElectricPe from ₹1,999/month.
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Backed by Bajaj Finserv. Zero down payment at select stores. One
              honest calculator. No hidden fees: what you see is what you pay.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Try the numbers"
          title="Calculate your monthly EMI"
        />
        <EmiFullCalculator />
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Finance partner"
          title="Backed by Bajaj Finserv"
          description="Fastest approval in the country, 15 minutes at any ElectricPe Mobility Center. More partners coming as we onboard them."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {financePartners.map((p) => (
            <Card key={p.id} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                {p.type === "bank" ? "Bank" : "NBFC"}
              </p>
              <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                {p.usp}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-[var(--color-brand)]" aria-hidden />
                  <span className="font-semibold">From {p.minInterestAnnualPct}%</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Up to {p.maxTenureMonths} mo
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Eligibility"
          title="Three common paths to approval"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {ELIGIBILITY.map((e) => (
            <Card key={e.title} className="p-6">
              <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                {e.title}
              </h3>
              <p className="text-sm text-[var(--color-brand)] font-semibold mb-4">{e.income}</p>
              <ul className="space-y-2">
                {e.notes.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="How it flows"
          title="Approval in 15 minutes"
        />
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <Card className="p-5 h-full">
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[var(--color-brand)] text-white font-semibold mb-3">
                  {s.n}
                </div>
                <p className="font-semibold text-[var(--color-text)]">{s.title}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{s.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader eyebrow="Current offers" title="What's active right now" align="left" />
        <div className="grid md:grid-cols-3 gap-4">
          {OFFERS.map((o) => (
            <Card key={o.partner} className="p-6">
              <p className="text-sm font-semibold text-[var(--color-brand)] mb-2">
                {o.partner}
              </p>
              <p className="text-[var(--color-text)]">{o.offer}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-3">{o.until}</p>
            </Card>
          ))}
        </div>
      </Section>

      {faqs.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader eyebrow="FAQs" title="EMI questions, answered" />
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

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <FileText className="h-10 w-10 text-[var(--color-brand)] mx-auto mb-3" aria-hidden />
          <h2 className="text-display-lg">Apply in 15 minutes.</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Walk in to any Mobility Center with Aadhaar + PAN, and we'll handle the rest.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/book-test-ride">Book test ride</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a
                href={buildWhatsAppLink(WHATSAPP_DEFAULTS.emi, "/emi")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
