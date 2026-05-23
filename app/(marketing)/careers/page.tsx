import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, BookOpen, Heart, Gift } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jobPostings } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers | Build India's Most-Trusted EV Network",
  description:
    "Join ElectricPe. We're hiring store executives, technicians, engineers, and operations folks across India. Real roles, real impact.",
  alternates: { canonical: "/careers" },
};

const WHY = [
  { icon: Target, title: "Impact", text: "Build a business Indian cities actually need." },
  { icon: BookOpen, title: "Learning", text: "Retail, ops, tech, service, all under one roof." },
  { icon: Heart, title: "Ownership", text: "Your work reaches owners in 15+ cities every day." },
  { icon: Gift, title: "Benefits", text: "ESOPs, insurance, a service plan for your EV." },
];

const DEPT_LABEL: Record<string, string> = {
  retail: "Retail",
  service: "Service",
  tech: "Tech",
  marketing: "Marketing",
  operations: "Operations",
  hr: "People",
};

export default function CareersPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-10 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Careers</p>
            <h1 className="text-display-xl">
              Build India's most-trusted EV network.
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              We're hiring across retail, service, engineering, marketing, and
              operations. Come help us go from 30 stores to 126+ in the next 12 months.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="#roles">See open roles</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="Why ElectricPe" title="Why this place is different" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {WHY.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display font-bold text-[var(--color-text)] mb-1">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="roles" className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Open roles"
          title={`${jobPostings.length} open positions`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {jobPostings.map((j) => (
            <Card key={j.slug} interactive>
              <Link href={`/careers/${j.slug}`} className="block p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="brand">{DEPT_LABEL[j.department] ?? j.department}</Badge>
                  <Badge variant="neutral">{j.city}</Badge>
                  <Badge variant="neutral">{j.type === "FT" ? "Full-time" : j.type}</Badge>
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                  {j.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                  {j.descriptionMdx}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)]">
                  View role <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
