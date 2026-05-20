import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plug, ShieldCheck, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChargerCard } from "@/components/product/charger-card";
import { chargers } from "@/content/chargers";

export const metadata: Metadata = {
  title: "EV Chargers for Home & Business | Oakter, RIOD, Teltonika",
  description:
    "Buy EV chargers for home or fleet use. Oakter 3.3 kW starter, RIOD Powerpod 7.4/22 kW, Teltonika TeltoCharge with OCPP. Certified installation in 30+ cities.",
  alternates: { canonical: "/charger" },
};

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "OCPP-compliant",
    text: "Future-proof with OCPP 1.6J and 2.0.1 across our smart range.",
  },
  {
    icon: Plug,
    title: "Bharat-ready connectors",
    text: "Bharat AC-001 and Type-2 depending on the use case and scooter.",
  },
  {
    icon: MapPin,
    title: "Certified installation",
    text: "Licensed electricians across 30+ cities. Warranty starts on install day.",
  },
];

export default function ChargersPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-10 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Chargers</p>
            <h1 className="text-display-xl">Chargers for home and business.</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              From a ₹4,999 home charger that runs on any 5A socket to 22 kW
              commercial units with OCPP 2.0.1, pick the charger that fits your
              space, scooter, and scale.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="All chargers" title="Our charger range" align="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {chargers.map((c) => (
            <ChargerCard key={c.slug} charger={c} />
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Promises"
          title="What you get with every charger"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Card className="p-8">
            <p className="text-eyebrow mb-2">For charger manufacturers</p>
            <h3 className="font-display text-2xl font-bold text-[var(--color-text)] mb-3">
              List your charger on ElectricPe
            </h3>
            <p className="text-[var(--color-text-muted)] mb-5">
              Our B2C retail + service network stocks certified chargers from the world's
              best OEMs. If you build one, we want to carry it.
            </p>
            <Button
              asChild
              variant="outline"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/partnerships/charger-oem">Partner with us</Link>
            </Button>
          </Card>
          <Card className="p-8">
            <p className="text-eyebrow mb-2">For fleet operators</p>
            <h3 className="font-display text-2xl font-bold text-[var(--color-text)] mb-3">
              Charger Management System
            </h3>
            <p className="text-[var(--color-text-muted)] mb-5">
              If you run 10+ chargers, our OCPP-compliant CMS handles pricing, billing,
              user management, and analytics for you.
            </p>
            <Button
              asChild
              variant="outline"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/cms">See the CMS</Link>
            </Button>
          </Card>
        </div>
      </Section>
    </>
  );
}
