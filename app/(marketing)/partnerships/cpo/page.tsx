import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radio, Users, BarChart3 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnershipHero } from "@/components/marketing/partnership-hero";

export const metadata: Metadata = {
  title: "CPO Partnership — Get on India's EV Aggregator",
  description:
    "Charge Point Operators: list your stations on the ElectricPe app, manage them with our CMS, and access 200K+ EV riders across India.",
  alternates: { canonical: "/partnerships/cpo" },
};

const PILLARS = [
  {
    icon: Radio,
    title: "OCPP-native",
    text: "Standard OCPP 1.6J and 2.0.1 — if your stations speak it, you're live in days.",
  },
  {
    icon: Users,
    title: "200K+ riders",
    text: "Your stations reach ElectricPe's aggregator audience instantly.",
  },
  {
    icon: BarChart3,
    title: "Shared analytics",
    text: "Utilization, revenue, peak hours — we report, you decide.",
  },
];

export default function CpoPartnershipPage() {
  return (
    <>
      <PartnershipHero
        eyebrow="CPO Partnership"
        title="Get your stations in front of 200K+ riders."
        description="ElectricPe is India's largest independent EV charging aggregator. Partner with us to get listed, accept unified payments, and manage your network with our CMS."
      />

      <Section>
        <SectionHeader eyebrow="Why CPOs choose us" title="What the partnership unlocks" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6 h-full">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-4">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold mb-1">{title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <Card className="p-8 md:p-10 max-w-3xl mx-auto">
          <h2 className="text-h2 mb-3">Use our CMS. Run your network.</h2>
          <p className="text-[var(--color-text-muted)] mb-5">
            If you already operate chargers, our Charger Management System (CMS) can
            replace or augment your stack — OCPP 1.6J and 2.0.1, pricing, billing,
            user management, and analytics, all in one console.
          </p>
          <Button
            asChild
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <Link href="/cms">See the CMS</Link>
          </Button>
        </Card>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Let's list you.</h2>
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
