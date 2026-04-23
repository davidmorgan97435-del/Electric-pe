import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Wrench, Handshake } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnershipHero } from "@/components/marketing/partnership-hero";

export const metadata: Metadata = {
  title: "EV OEM Partnership — Distribute via ElectricPe",
  description:
    "Scale distribution for your electric scooter brand through ElectricPe's 30+ Mobility Centers. Retail, financing, service — all bundled.",
  alternates: { canonical: "/partnerships/ev-oem" },
};

const PILLARS = [
  {
    icon: Users,
    title: "Real customer reach",
    text: "30+ Mobility Centers generating 1,000+ test rides per month across Tier 1–2 cities.",
  },
  {
    icon: Wrench,
    title: "Service you don't build",
    text: "Our in-house technicians service your scooters. Fewer warranty headaches, happier owners.",
  },
  {
    icon: TrendingUp,
    title: "Financing at the door",
    text: "6 partner banks and NBFCs with 15-minute approvals. 40%+ of our sales are EMI-financed.",
  },
  {
    icon: Handshake,
    title: "Transparent commercials",
    text: "Flat margin structure, no hidden fees. Monthly settlement within 7 days.",
  },
];

export default function EvOemPage() {
  return (
    <>
      <PartnershipHero
        eyebrow="EV OEM Partnership"
        title="Stop building showrooms. Start selling."
        description="ElectricPe's store network sold 2,500+ scooters last year across 15+ cities. If you're an electric-scooter OEM, our retail + service infrastructure replaces years of distribution cost."
      />

      <Section>
        <SectionHeader
          eyebrow="Why this works"
          title="Distribution as a service, not as a cost"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6 md:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-4">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-h3 mb-2">{title}</h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Case study"
          title="Xypro at ElectricPe"
          align="left"
        />
        <Card className="p-8 md:p-10 max-w-3xl">
          <p className="text-[var(--color-text)] leading-relaxed">
            Xypro partnered with ElectricPe in 2023 and now sells 400+ units per
            quarter through our network. Their scooters are stocked at every ElectricPe
            Mobility Center, serviced by our technicians, and financed by our partner
            banks.
          </p>
          <p className="mt-4 text-[var(--color-text)] leading-relaxed">
            The partnership lets Xypro focus on product and manufacturing while we
            handle retail, service, and financing — the parts most OEMs try (and
            struggle) to build in-house.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-number-stat text-[var(--color-brand)]">400+</p>
              <p className="text-xs text-[var(--color-text-muted)]">Units/quarter</p>
            </div>
            <div>
              <p className="text-number-stat text-[var(--color-brand)]">15</p>
              <p className="text-xs text-[var(--color-text-muted)]">Cities</p>
            </div>
            <div>
              <p className="text-number-stat text-[var(--color-brand)]">4.6★</p>
              <p className="text-xs text-[var(--color-text-muted)]">Owner rating</p>
            </div>
          </div>
        </Card>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Let's talk.</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Share your pitch deck + volume projections. We'll respond with a
            commercial framework in one week.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6"
            trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <Link href="/contact-us?topic=partnership">Start a conversation</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
