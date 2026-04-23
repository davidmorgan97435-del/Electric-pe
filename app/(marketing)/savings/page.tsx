import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SavingsFullCalculator } from "@/components/marketing/savings-full-calculator";

export const metadata: Metadata = {
  title: "EV Savings Calculator — How Much You'll Save",
  description:
    "Find out exactly how much you'll save switching to an ElectricPe electric scooter. Monthly, annual, 5-year, and payback numbers based on your real usage.",
  alternates: { canonical: "/savings" },
};

export default function SavingsPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-10 md:pb-14 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Savings calculator</p>
            <h1 className="text-display-xl">
              Find out exactly how much you'll save.
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Tell us how you ride today. We'll do the math in real rupees — not
              vague percentages or "up-to" claims.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <SavingsFullCalculator />
      </Section>
    </>
  );
}
