import type { Metadata } from "next";
import Link from "next/link";
import {
  Grid3x3,
  IndianRupee,
  Users,
  Radio,
  Receipt,
  BarChart3,
  Globe,
  Smartphone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "ElectricPe CMS — OCPP Charger Management Software" },
  description:
    "Manage your EV charging network with ElectricPe CMS. OCPP 1.6J + 2.0.1, pricing, billing, analytics, white-label app. Used by Statiq and more.",
  alternates: { canonical: "/cms" },
  robots: { index: false, follow: true },
};

const CAPABILITIES = [
  { icon: Grid3x3, title: "Station management", text: "Onboard, monitor, and control every charger from one console." },
  { icon: IndianRupee, title: "Pricing & tariffs", text: "Time-of-day, user tier, bulk rates. Promo codes supported." },
  { icon: Users, title: "RFID & user mgmt", text: "Cards, tokens, mobile numbers. Fleet accounts with limits." },
  { icon: Radio, title: "OCPP 1.6J + 2.0.1", text: "Standard compliant. Works with every major hardware vendor." },
  { icon: Receipt, title: "Billing & settlement", text: "Automated invoices, tax filings, payout to operators." },
  { icon: BarChart3, title: "Analytics", text: "Utilization, revenue, peak hours — daily, weekly, monthly." },
  { icon: Globe, title: "Roaming", text: "Cross-network access via OCPI. One user, many CPOs." },
  { icon: Smartphone, title: "White-label app", text: "Your brand, our infrastructure. Android + iOS ready." },
];

const PERSONAS = [
  {
    title: "CPO",
    text: "Run a public network of 50–5,000 stations without building software in-house.",
  },
  {
    title: "Fleet operator",
    text: "Manage in-house charging for delivery, taxi, or logistics fleets.",
  },
  {
    title: "Charger OEM",
    text: "Bundle CMS with your hardware to offer customers a full solution.",
  },
];

const PRICING = [
  { tier: "Starter", range: "Up to 50 stations", note: "For first-time deployments" },
  { tier: "Pro", range: "50–500 stations", note: "For growing networks" },
  { tier: "Enterprise", range: "500+ stations", note: "Custom SLAs + roaming" },
];

export default function CmsPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Charger Management System</p>
            <h1 className="text-display-xl">
              Manage your charging network with ElectricPe CMS.
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              OCPP-native software for CPOs, fleets, and charger OEMs. Used to manage
              thousands of stations across India.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/contact-us?topic=partnership">Request demo</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="Console preview" title="A single place to run everything" align="left" />
        <Card className="p-6 md:p-10">
          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-5">
            <MiniStat label="Stations online" value="2,138" />
            <MiniStat label="Sessions today" value="14,402" />
            <MiniStat label="Revenue today" value="₹8.4L" />
          </div>
          <div className="grid md:grid-cols-2 gap-3 md:gap-5">
            <div className="h-40 rounded-xl bg-gradient-to-br from-[var(--color-brand-soft)] to-[var(--color-surface-muted)] border border-[var(--color-border)] p-4 flex flex-col justify-between">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                Hourly utilization
              </p>
              <svg viewBox="0 0 200 60" className="w-full h-16" aria-hidden>
                <polyline
                  points="0,55 20,45 40,40 60,35 80,30 100,25 120,20 140,22 160,27 180,35 200,45"
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="h-40 rounded-xl bg-gradient-to-br from-[var(--color-brand-soft)] to-[var(--color-surface-muted)] border border-[var(--color-border)] p-4 flex flex-col justify-between">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                Revenue by city
              </p>
              <div className="flex items-end gap-1.5 h-16">
                {[40, 62, 48, 80, 35, 55, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[var(--color-brand)] rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader eyebrow="Capabilities" title="Everything a network operator needs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <h3 className="font-display text-base font-bold text-[var(--color-text)]">
                {title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Who it's for" title="Three common profiles" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PERSONAS.map((p) => (
            <Card key={p.title} className="p-6">
              <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {p.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader eyebrow="Pricing" title="Transparent tiers" align="left" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING.map((p) => (
            <Card key={p.tier} className="p-6">
              <p className="text-eyebrow mb-2">{p.range}</p>
              <h3 className="font-display text-2xl font-bold text-[var(--color-text)] mb-1">
                {p.tier}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{p.note}</p>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Pricing depends on station count, features, and support tier. Talk to us for a
          scoped quote.
        </p>
      </Section>

      <Section>
        <Card className="p-8 md:p-10 max-w-3xl mx-auto">
          <ShieldCheck
            className="h-8 w-8 text-[var(--color-brand)] mb-3"
            aria-hidden
          />
          <h2 className="text-h2 mb-2">Security & compliance</h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li>ISO 27001 in progress — targeted Q3 2026</li>
            <li>Data residency in India (AWS Mumbai primary, DR in Hyderabad)</li>
            <li>OCPI 2.2.1 for roaming interoperability</li>
            <li>Signed webhook payloads and mTLS for station backhaul</li>
          </ul>
        </Card>
      </Section>

      <Section className="bg-gradient-brand text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg text-white">Request a live demo.</h2>
          <p className="mt-3 text-white/90">
            We'll walk you through a real network dashboard — yours if you choose to
            go with us.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-white text-[var(--color-brand)] hover:bg-white/90"
          >
            <Link href="/contact-us?topic=partnership">Talk to sales</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-4">
      <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      <p className="font-display text-xl md:text-2xl font-bold text-[var(--color-text)]">
        {value}
      </p>
    </div>
  );
}
