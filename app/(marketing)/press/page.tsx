import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pressItems } from "@/content/press";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: "Press & Media — ElectricPe in the news",
  description:
    "ElectricPe in the news — coverage, press releases, and brand assets for journalists and partners. Press contact: press@electricpe.com.",
  alternates: { canonical: "/press" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const BRAND_SWATCHES = [
  { name: "Primary 600", hex: "#039855" },
  { name: "Primary 700", hex: "#027A48" },
  { name: "Primary 100", hex: "#D1FADF" },
  { name: "Neutral 900", hex: "#101828" },
  { name: "Neutral 500", hex: "#667085" },
];

export default function PressPage() {
  const coverage = pressItems.filter((p) => p.type === "coverage");
  const releases = pressItems.filter((p) => p.type === "release");

  return (
    <>
      <section className="pt-16 md:pt-24 pb-10 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Press & media</p>
            <h1 className="text-display-xl">ElectricPe in the news.</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Coverage, press releases, brand assets, and direct contact for media.
              We respond to journalist requests within one business day.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="Coverage" title="Recent media coverage" align="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {coverage.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card interactive className="p-6 h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Badge variant="neutral">{p.outlet}</Badge>
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)]" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">
                  {p.headline}
                </h3>
                {p.summary && (
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    {p.summary}
                  </p>
                )}
                <p className="mt-3 text-xs text-[var(--color-text-subtle)]">
                  {formatDate(p.publishedAt)}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {releases.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader eyebrow="Press releases" title="Official statements" align="left" />
          <div className="grid gap-3 max-w-3xl">
            {releases.map((r) => (
              <Card key={r.id} className="p-5">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">
                  {formatDate(r.publishedAt)}
                </p>
                <h3 className="font-display font-bold text-[var(--color-text)]">
                  {r.headline}
                </h3>
                {r.summary && (
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {r.summary}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <SectionHeader eyebrow="Brand assets" title="Download what you need" align="left" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-4">
              Logos
            </h3>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" leadingIcon={<Download className="h-4 w-4" aria-hidden />}>
                <a href="/img/eplogo-horiz.webp" download>
                  Horizontal logo (WebP)
                </a>
              </Button>
              <Button asChild variant="outline" leadingIcon={<Download className="h-4 w-4" aria-hidden />}>
                <a href="/img/eplogo-horiz.png" download>
                  Horizontal logo (PNG)
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-4">
              Brand colours
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {BRAND_SWATCHES.map((s) => (
                <div key={s.hex} className="text-center">
                  <div
                    className="h-12 rounded-lg border border-[var(--color-border)] mb-1"
                    style={{ backgroundColor: s.hex }}
                    aria-label={`${s.name} swatch`}
                  />
                  <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
                    {s.hex}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <Card className="p-8 md:p-10 max-w-2xl mx-auto">
          <Mail className="h-8 w-8 text-[var(--color-brand)] mb-3" aria-hidden />
          <h2 className="text-h2 mb-2">Press contact</h2>
          <p className="text-[var(--color-text-muted)] mb-5">
            Interviews, quotes, deep-dives, and verified fact checks.
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:press@electricpe.com"
                className="text-[var(--color-brand)] hover:underline"
              >
                press@electricpe.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a href={`tel:${globals.supportPhone}`} className="text-[var(--color-brand)] hover:underline">
                {globals.supportPhone}
              </a>
            </p>
          </div>
        </Card>
      </Section>
    </>
  );
}
