import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plug, Truck, ClipboardList } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnershipHero } from "@/components/marketing/partnership-hero";

export const metadata: Metadata = {
  title: "Charger OEM Partnership | Distribute Nationally",
  description:
    "Your charger, our network. ElectricPe distributes and installs chargers across 30+ cities. Currently working with Oakter, RIOD, and Teltonika.",
  alternates: { canonical: "/partnerships/charger-oem" },
};

const PILLARS = [
  {
    icon: Plug,
    title: "Retail + installation",
    text: "We sell AND install with licensed electricians across 30+ Indian cities.",
  },
  {
    icon: Truck,
    title: "National logistics",
    text: "Last-mile delivery plus warranty replacement, handled end-to-end by our ops team.",
  },
  {
    icon: ClipboardList,
    title: "Certification-ready",
    text: "We help with BIS, CE, ARAI paperwork for the Indian market if you're entering new.",
  },
];

const CURRENT = ["Oakter", "RIOD", "Teltonika"];

export default function ChargerOemPage() {
  return (
    <>
      <PartnershipHero
        eyebrow="Charger OEM Partnership"
        title="Your charger. Our national network."
        description="We carry certified chargers from the world's best OEMs and install them at residences, workplaces, and commercial sites across India."
      />

      <Section>
        <SectionHeader
          eyebrow="What we bring"
          title="A turnkey go-to-market for your charger"
        />
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
        <SectionHeader eyebrow="Who we work with" title="Current charger partners" />
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {CURRENT.map((c) => (
            <div
              key={c}
              className="px-6 py-3 rounded-xl bg-white border border-[var(--color-border)] font-display font-bold text-[var(--color-text)]"
            >
              {c}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Want to be next? We're actively evaluating 3-phase AC (11–22 kW) and DC
          fast-charging partners for the commercial segment.
        </p>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Talk to our partnerships team.</h2>
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
