import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Navigation2,
  CreditCard,
  History,
  Users,
  MapPin,
  Star,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { globals } from "@/content/globals";
import { getFaqsByCategory } from "@/content/faqs";

export const metadata: Metadata = {
  title: "ElectricPe App — 25,000+ Charging Stations, One App",
  description:
    "Find, navigate, and pay at 25,000+ EV charging stations across 60+ networks in India. Download the ElectricPe app free. Rated 4.4★ with 200K+ downloads.",
  alternates: { canonical: "/app" },
};

const FEATURES = [
  {
    icon: MapPin,
    title: "Find stations",
    text: "25,000+ stations across 15+ cities, filterable by connector and power.",
  },
  {
    icon: Zap,
    title: "Live availability",
    text: "See which stations are free right now, not which were free yesterday.",
  },
  {
    icon: Navigation2,
    title: "Turn-by-turn navigation",
    text: "Open the station in your map of choice — Google, Apple, or in-app.",
  },
  {
    icon: CreditCard,
    title: "Unified payments",
    text: "One wallet across 60+ networks. No more juggling apps.",
  },
  {
    icon: History,
    title: "Charging history",
    text: "Every kWh, every rupee — automatic log for tax and business use.",
  },
  {
    icon: Users,
    title: "Owner community",
    text: "80,000+ members by city and model — help, tips, meetups.",
  },
];

const HOW = [
  { n: 1, title: "Download", text: "Free on Play Store + App Store" },
  { n: 2, title: "Locate", text: "Find a station with availability you need" },
  { n: 3, title: "Charge", text: "Pay in-app and track your session" },
];

const QUOTES = [
  {
    text: "Finally an app that actually shows live availability. Saved me a 40-minute detour.",
    name: "Nikhil D., Pune",
  },
  {
    text: "One wallet for Tata, Shell, Adani stations. No more topping up five apps.",
    name: "Meera T., Gurugram",
  },
  {
    text: "The route planner factors in my scooter's range. Underrated feature.",
    name: "Arjun S., Bengaluru",
  },
];

export default function AppPage() {
  const faqs = getFaqsByCategory("app");

  return (
    <>
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-eyebrow mb-3">ElectricPe App</p>
              <h1 className="text-display-xl">
                {globals.stats.stationsCount} charging stations in your pocket.
              </h1>
              <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
                Find, navigate, and pay at every major EV charging network in India —
                in one app. Rated {globals.stats.rating} on Play Store and App Store.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <a
                    href={globals.appLinks.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get on Play Store
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={globals.appLinks.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download on App Store
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-1 text-[var(--color-highlight)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {globals.stats.rating} · {globals.stats.appDownloads} downloads
                </p>
              </div>
            </div>
            <div className="relative max-w-md mx-auto w-full">
              <div className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-2xl)] border-8 border-[var(--color-neutral-900)] bg-[var(--color-surface-muted)]">
                <Image
                  src="/img/home_hero_section_2.webp"
                  alt="ElectricPe mobile app interface showing charging station map"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-[var(--shadow-xl)] border border-[var(--color-border)] p-4 flex items-center gap-3">
                <Image
                  src="/img/footer-qr.svg"
                  alt="Scan to download ElectricPe app"
                  width={56}
                  height={56}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Scan to download
                  </p>
                  <p className="text-sm font-semibold">electricpe.com/app</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Features"
          title="What you actually use, every day"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map(({ icon: Icon, title, text }) => (
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

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="User reviews"
          title="What app store reviewers say"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q) => (
            <Card key={q.name} className="p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[var(--color-highlight)] text-[var(--color-highlight)]"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-[var(--color-text)] mb-3 leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="text-sm text-[var(--color-text-muted)] font-medium">
                {q.name}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Get started"
          title="Three steps to your first charge"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW.map((s) => (
            <Card key={s.n} className="p-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--color-brand)] text-white text-lg font-display font-bold mb-3">
                {s.n}
              </div>
              <p className="font-display font-bold">{s.title}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{s.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {faqs.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader eyebrow="FAQs" title="App questions, answered" />
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
          <h2 className="text-display-lg">Download it free.</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Even if you don't own an ElectricPe scooter, the app is free to use.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a href={globals.appLinks.playStore} target="_blank" rel="noopener noreferrer">
                Play Store
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={globals.appLinks.appStore} target="_blank" rel="noopener noreferrer">
                App Store
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
