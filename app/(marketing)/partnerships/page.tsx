import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, Plug, Battery, Cog } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnershipHero } from "@/components/marketing/partnership-hero";

export const metadata: Metadata = {
  title: "Partnerships | Grow with India's EV Retail Network",
  description:
    "Partner with ElectricPe: EV OEMs, charger manufacturers, CPOs, and CMS adopters. Tap into 126+ Mobility Centers and 25,000+ charging stations.",
  alternates: { canonical: "/partnerships" },
};

const TRACKS = [
  {
    icon: Battery,
    title: "EV OEM",
    text: "List your scooter at 126+ branded Mobility Centers. We handle retail, finance, and service.",
    href: "/partnerships/ev-oem",
  },
  {
    icon: Plug,
    title: "Charger OEM",
    text: "Distribute your charger nationally through our retail + installation network.",
    href: "/partnerships/charger-oem",
  },
  {
    icon: Factory,
    title: "CPO",
    text: "Get listed on our aggregator app (25,000+ stations). Use our CMS to manage yours.",
    href: "/partnerships/cpo",
  },
  {
    icon: Cog,
    title: "CMS",
    text: "Our OCPP 1.6J + 2.0.1 charger-management software, white-labelable.",
    href: "/cms",
  },
];

const STEPS = [
  { n: 1, title: "Enquiry", text: "Short form or a direct conversation" },
  { n: 2, title: "Fit & commercials", text: "We scope volumes, SLAs, margins" },
  { n: 3, title: "Contract + pilot", text: "Start with 2–3 cities" },
  { n: 4, title: "Scale", text: "Roll out nationally" },
];

export default function PartnershipsPage() {
  return (
    <>
      <PartnershipHero
        eyebrow="Partnerships"
        title="Grow with India's EV retail network."
        description="Whether you're an OEM, charger maker, CPO, or fleet operator, ElectricPe's service-first retail network is built for long-term partnerships."
      />

      <Section>
        <SectionHeader eyebrow="Four tracks" title="Pick the track that fits you" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TRACKS.map(({ icon: Icon, title, text, href }) => (
            <Link key={title} href={href} className="group">
              <Card interactive className="p-6 h-full">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-4 group-hover:bg-[var(--color-brand)] group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                  {text}
                </p>
                <p className="text-sm font-semibold text-[var(--color-brand)] inline-flex items-center gap-1">
                  Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader eyebrow="How it works" title="From enquiry to national scale" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STEPS.map((s) => (
            <Card key={s.n} className="p-5">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[var(--color-brand)] text-white font-semibold mb-3">
                {s.n}
              </div>
              <p className="font-semibold text-[var(--color-text)]">{s.title}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{s.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Ready to talk?</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Tell us about your company and how you'd like to partner. We usually
            reply within one business day.
          </p>
          <Button asChild size="lg" className="mt-6" trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            <Link href="/contact-us?topic=partnership">Start a conversation</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
