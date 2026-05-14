import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Shield, Handshake } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: { absolute: "About ElectricPe — India's Trusted EV Retail Network" },
  description:
    "We're building the EV retail network India deserves: 30+ real stores, 24-hour service, component-level warranty, and a promise to stay with you after the sale.",
  alternates: { canonical: "/about-us" },
};

const MILESTONES = [
  {
    year: "2021",
    title: "Wattapp Technologies founded",
    text: "Started as an EV charging-station aggregator in Bengaluru.",
  },
  {
    year: "2022",
    title: "$3M seed round",
    text: "Led by Blume Ventures, 8i Ventures, and angels from the EV space.",
  },
  {
    year: "2023",
    title: "$5M Pre-Series A",
    text: "Scaled to 10 Mobility Centers across South India.",
  },
  {
    year: "2024",
    title: "30+ stores live",
    text: "2,500+ scooters sold, 200,000+ app downloads, 4.4★ average rating.",
  },
  {
    year: "2026",
    title: "Expanding to 50+ stores",
    text: "Growing into Delhi NCR, West India, and Tier-2 city clusters.",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Trust over hype",
    text: "Numbers we can defend, photos of real owners, commitments in writing.",
  },
  {
    icon: Heart,
    title: "Service before sale",
    text: "The first test ride is not the end — it's the start of a long relationship.",
  },
  {
    icon: Target,
    title: "Accessibility",
    text: "Low-speed EVs that don't need a licence. EMIs that don't need perfect credit.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    text: "Real prices. Real warranty terms. Real service SLAs published monthly.",
  },
];

const LEADERSHIP = [
  { name: "Raghav Rohila", role: "Founder & CEO", initials: "RR" },
  { name: "Avinash Sharma", role: "Co-founder & COO", initials: "AS" },
  { name: "Nimesh Jha", role: "Head of Retail", initials: "NJ" },
  { name: "Priyanka Dhingra", role: "Head of Customer Experience", initials: "PD" },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">About us</p>
            <h1 className="text-display-xl">
              We're building the EV retail network India deserves.
            </h1>
            <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Most EV brands will sell you a scooter and wish you luck. ElectricPe
              is different. We have stores you can walk into, technicians who know
              your vehicle, and a service promise we put in writing.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Our story"
          title="From a charging app to India's EV retail network"
          align="left"
        />
        <ol className="relative border-l-2 border-[var(--color-border-brand)] pl-6 md:pl-10 space-y-8 max-w-3xl">
          {MILESTONES.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[37px] md:-left-[45px] top-1 inline-flex items-center justify-center h-9 w-9 rounded-full bg-[var(--color-brand)] text-white text-xs font-semibold">
                {m.year.slice(-2)}
              </span>
              <p className="text-eyebrow mb-1">{m.year}</p>
              <h3 className="font-display text-xl font-bold text-[var(--color-text)]">
                {m.title}
              </h3>
              <p className="text-[var(--color-text-muted)] mt-1">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader eyebrow="By the numbers" title="What we've built so far" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { v: globals.stats.storesOpen, l: "Mobility Centers" },
            { v: globals.stats.vehiclesSold, l: "Scooters sold" },
            { v: globals.stats.appDownloads, l: "App downloads" },
            { v: globals.stats.stationsCount, l: "Charging stations in app" },
            { v: globals.stats.networksCount, l: "Partner networks" },
            { v: globals.stats.communityMembers, l: "Community members" },
            { v: `${globals.slaThisMonthPct}%`, l: "24h service SLA hit" },
            { v: globals.stats.rating, l: "App Store / Play rating" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl bg-white border border-[var(--color-border)] p-5 text-center"
            >
              <p className="text-number-stat text-[var(--color-text)]">{s.v}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{s.l}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="How we work" title="Four values that shape everything" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader eyebrow="Leadership" title="Meet the team" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {LEADERSHIP.map((p) => (
            <Card key={p.name} className="p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-brand)] text-white text-lg font-display font-bold mb-3">
                {p.initials}
              </div>
              <p className="font-display font-bold text-[var(--color-text)]">{p.name}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{p.role}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Want to work with us?</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            We're hiring store executives, technicians, engineers, and operations folks
            across India. Come build with us.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/careers">See open roles</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-us">Get in touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
