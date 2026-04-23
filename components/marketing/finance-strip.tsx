import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { financePartners } from "@/content/finance-partners";

/**
 * HP-08 — EMI & Finance.
 *
 * Replaces the earlier 3-card steps with a single horizontal numbered
 * timeline (Apply → Approve in 15 min → Ride home same day). The partner
 * ecosystem becomes an inline logo row, not a grid of logo tiles.
 *
 * Result: one coherent flow instead of stacked card chrome.
 */

const STEPS = [
  { n: 1, title: "Apply", text: "Aadhaar + PAN" },
  { n: 2, title: "Approval in 15 minutes", text: "At any ElectricPe store" },
  { n: 3, title: "Ride home same day", text: "No paperwork chase" },
];

export function FinanceStrip() {
  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow="EMI starting ₹1,499"
          title="Own an ElectricPe starting at ₹1,999 per month."
          description="Six finance partners. Zero down payment at select stores. Instant approval for salaried individuals."
        />
      </Reveal>

      <div className="max-w-5xl mx-auto">
        {/* Horizontal timeline — numbered steps connected by a rule */}
        <Reveal>
          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 md:gap-x-6">
            {/* Connecting line (desktop only) */}
            <span
              aria-hidden
              className="hidden md:block absolute left-0 right-0 top-5 h-px bg-[var(--color-border)]"
            />
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="relative flex flex-col items-center text-center"
              >
                <span
                  aria-hidden
                  className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-[var(--color-brand)] text-[var(--color-brand-pressed)] font-display font-bold"
                >
                  {s.n}
                </span>
                <p className="mt-4 font-display text-lg md:text-xl font-bold text-[var(--color-text)]">
                  {s.title}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Partner row + CTA */}
        <Reveal delay={120}>
          <div className="mt-14 md:mt-16 border-t border-[var(--color-border)] pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)] text-center mb-6">
              Our finance partners
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4 mb-10">
              {financePartners.map((p) => (
                <span
                  key={p.id}
                  title={`${p.name} — ${p.usp}`}
                  className="font-display font-bold text-base md:text-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {p.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4 pt-4 border-t border-dashed border-[var(--color-border)]">
              <p className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <CheckCircle2
                  className="h-4 w-4 text-[var(--color-brand)]"
                  aria-hidden
                />
                Zero down payment at select stores
              </p>
              <Button
                asChild
                size="lg"
                trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
              >
                <Link href="/emi">Calculate My EMI</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
